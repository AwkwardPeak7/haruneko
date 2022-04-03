// Auto-Generated export from HakuNeko Legacy
// See: https://gist.github.com/ronny1982/0c8d5d4f0bd9c1f1b21dbf9a2ffbfec9

//import { Tags } from '../../Tags';
import icon from './ArazNovel.webp';
import { DecoratableMangaScraper } from '../../providers/MangaPlugin';

export default class extends DecoratableMangaScraper {

    public constructor() {
        super('araznovel', `ArazNovel`, 'https://www.araznovel.com' /*, Tags.Language.English, Tags ... */);
    }

    public override get Icon() {
        return icon;
    }
}

// Original Source
/*
class ArazNovel extends WordPressMadara {

    constructor() {
        super();
        super.id = 'araznovel';
        super.label = 'ArazNovel';
        this.tags = [ 'webtoon', 'turkish' ];
        this.url = 'https://www.araznovel.com';
    }
}
*/