import { DeferredTask, Priority } from './DeferredTask';
export { Priority } from './DeferredTask';
import { Unlimited } from './RateLimit';

export class TaskPool<T> {

    private running = false;
    private activeWorkersCount = 0;
    private delay = Promise.resolve();
    private queueTransactionLock = false;
    private readonly queue: DeferredTask<T>[] = [];

    /**
     * Create a new task pool.
     * @param Workers The number of workers for processing tasks (maximum number of tasks processed at the same time). Default: 4
     * @param RateLimit The maximum throughput for processing tasks. Default: infinite
     */
    constructor(public Workers: number = 4, public RateLimit = Unlimited) {
        //setInterval(this.Process.bind(this), 750);
    }

    /**
     * Add a new (awaitable) {@link action} to this task pool and start processing the task pool (if not already started).
     * @returns A promise that will be completed with the final result of the {@link action} after it was processed.
     */
    public Add(action: () => Promise<T>, priority: Priority): Promise<T> {
        const task = new DeferredTask<T>(action, priority);
        this.AddTask(task);
        return task.Promise;
    }

    private async AddTask(task: DeferredTask<T>) {
        await this.InvokeQueueTransaction(queue => queue.push(task));
        this.Process();
    }

    /**
     * Perform a thread/concurrency safe operation on {@link queue}
     */
    private async InvokeQueueTransaction<R>(transaction: (queue: typeof this.queue) => R): Promise<R> {
        try {
            // TODO: Use a better locking mechanism?
            while(this.queueTransactionLock) {
                await new Promise(resolve => setTimeout(resolve, 5));
            }
            this.queueTransactionLock = true;
            return transaction(this.queue);
        } finally {
            this.queueTransactionLock = false;
        }
    }

    /**
     * Find and return the next task with highest priority in the {@link queue} and removes it.
     * @returns The found task, or `undefined` in case the {@link queue} is empty or an internal error occured.
     */
    private async TakeNextTask(): Promise<DeferredTask<T>> {
        return await this.InvokeQueueTransaction(queue => {
            try {
                let index = 0;
                for(let i = 0; i < queue.length; i++) {
                    if(queue[index].Priority < queue[i].Priority) {
                        index = i;
                    }
                }
                // NOTE: Will return undefined in case the queue is empty
                return queue.splice(index, 1)[0];
            } catch {
                return undefined;
            }
        });
    }

    private async ConcurrencySlotAvailable() {
        while(this.activeWorkersCount >= this.Workers) {
            await new Promise(resolve => setTimeout(resolve, 50));
        }
    }

    private async Process() {
        if(this.running) {
            return;
        }
        this.running = true;
        try {
            let task: DeferredTask<T>;
            while((task = await this.TakeNextTask()) !== undefined) {
                await this.delay;
                this.delay = new Promise(resolve => setTimeout(resolve, this.RateLimit.Throttle));
                await this.ConcurrencySlotAvailable();
                this.Run(task);
            }
        } finally {
            this.running = false;
        }
    }

    private async Run(task: DeferredTask<T>) {
        try {
            this.activeWorkersCount++;
            await task.Run();
        } finally {
            this.activeWorkersCount--;
        }
    }
}