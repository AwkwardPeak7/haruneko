import { Tags } from '../Tags';
import icon from './NiveraFansub.webp';
import { DecoratableMangaScraper } from '../providers/MangaPlugin';
import * as Madara from './decorators/WordPressMadara';
import * as Common from './decorators/Common';

@Madara.MangaCSS(/^{origin}\/manga\/[^/]+\/$/)
@Madara.MangasMultiPageAJAX()
@Madara.ChaptersSinglePageAJAXv2()
@Madara.PagesSinglePageCSS()
@Common.ImageAjax()
export default class extends DecoratableMangaScraper {

    public constructor() {
        super('niverafansub', 'Nivera Fansub', 'https://niverafansub.net', Tags.Media.Manhua, Tags.Media.Manhua, Tags.Language.Turkish, Tags.Source.Scanlator);
    }

    public override get Icon() {
        return icon;
    }
}