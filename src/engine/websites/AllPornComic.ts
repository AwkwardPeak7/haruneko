import { Tags } from '../Tags';
import icon from './AllPornComic.webp';
import { DecoratableMangaScraper } from '../providers/MangaPlugin';
import * as Madara from './decorators/WordPressMadara';
import { ImageDirect } from './decorators/Common';

@Madara.MangaCSS(/^https?:\/\/allporncomic.com\/porncomic\/[^/]+\/$/)
@Madara.MangasMultiPageAJAX()
@Madara.ChaptersSinglePageCSS()
@Madara.PagesSinglePageCSS()
@ImageDirect()
export default class extends DecoratableMangaScraper {

    public constructor() {
        super('allporncomic', 'AllPornComic', 'https://allporncomic.com', Tags.Media.Comic, Tags.Source.Aggregator, Tags.Language.English, Tags.Rating.Pornographic);
    }

    public override get Icon() {
        return icon;
    }
}