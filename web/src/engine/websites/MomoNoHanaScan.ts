import { Tags } from './../Tags';
import icon from './MomoNoHanaScan.webp';
import { DecoratableMangaScraper } from './../providers/MangaPlugin';
import * as Madara from './decorators/WordPressMadara';
import * as Common from './decorators/Common';

@Madara.MangaCSS(/^https?:\/\/momonohanascan\.com\/manga\//, 'div.post-title')
@Madara.MangasMultiPageAJAX()
@Madara.ChaptersSinglePageCSS()
@Madara.PagesSinglePageCSS()
@Common.ImageDirect()

export default class extends DecoratableMangaScraper {

    public constructor() {
        super('momonohanascan', `Momo no Hana Scan`, 'https://momonohanascan.com', Tags.Language.Portuguese, Tags.Media.Manga, Tags.Media.Manhua, Tags.Media.Manhwa, Tags.Source.Scanlator);
    }

    public override get Icon() {
        return icon;
    }
}