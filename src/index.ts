import { Initialize as InitBlacklist } from './engine/Blacklist';
import { Initialize as InitFetchProvider } from './engine/FetchProvider';
import { HakuNeko } from './engine/HakuNeko';
import { FrontendController } from './frontend/FrontendController';

//const gui = require('nw.gui');
//gui.Window.get().
const win = nw.Window.get();
win.showDevTools();

InitBlacklist();
InitFetchProvider();
window.HakuNeko = new HakuNeko();
window.Frontend = new FrontendController();