import { Listenable } from "../util/Listenable";
import { TEXTURE_MODE } from "../engine/extensions/object/TextureRender";

export class TextureUi extends Listenable {
  private modeValue: TEXTURE_MODE

  constructor(config: TextureUiOptions = DEFAULT_TEXTUREUI_OPTIONS) {
    super();
    this.bind(config);
  }

  get mode() {
    return this.modeValue;
  }

  private bind(textureOption: TextureUiOptions) {
    const choice = document.getElementById(
      textureOption.idTextureMode
    ) as HTMLInputElement;

    choice.oninput = () => {
        this.modeValue = parseInt(choice.value);
        this.notify();
    };
  }
}

export interface TextureUiOptions {
  idTextureMode: string;
}

export const DEFAULT_TEXTUREUI_OPTIONS: TextureUiOptions = {
  idTextureMode: "texture-mode"
};
