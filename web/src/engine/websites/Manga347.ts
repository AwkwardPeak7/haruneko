// Auto-Generated export from HakuNeko Legacy
import { Tags } from '../Tags';
import icon from './Manga347.webp';
import { DecoratableMangaScraper } from '../providers/MangaPlugin';
import * as Madara from './decorators/WordPressMadara';
import * as Common from './decorators/Common';

@Madara.MangaCSS(/^{origin}\/manga\/[^/]+\/$/)
@Madara.MangasMultiPageAJAX()
@Madara.ChaptersSinglePageAJAXv1()
@Madara.PagesSinglePageCSS()
@Common.ImageAjax()

//TODO : use mangareaderto Template, similar to MangaRaw1001
export default class extends DecoratableMangaScraper {

    public constructor() {
        super('manga347', 'Manga 347', 'https://manga347.com', Tags.Media.Manhwa, Tags.Language.English, Tags.Source.Aggregator);
    }

    public override get Icon() {
        return icon;
    }
}

// Original Source
/*
class Manga347 extends WordPressMadara {

    constructor() {
        super();
        super.id = 'manga347';
        super.label = 'Manga 347';
        this.tags = ['webtoon', 'english'];
        this.url = 'https://manga347.com';

        this.queryPages = 'figure source, div.page-break source';
    }
}
*/