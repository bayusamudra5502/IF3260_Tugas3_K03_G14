import { TEXTURE_MODE } from "../engine/extensions/object/TextureRender";
import { Listenable } from "../util/Listenable";

export class TextureManager extends Listenable{
    mode: TEXTURE_MODE

    update(mode: TEXTURE_MODE){
        this.mode = mode;
    }
}