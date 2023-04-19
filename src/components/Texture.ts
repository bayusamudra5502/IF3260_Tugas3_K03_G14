import {
  TextureRenderExtension,
  TextureRenderOption,
} from "../engine/extensions/object/TextureRender";
import { Component, ComponentPrototype } from "../object/Component";
import { Object3D } from "../object/Object3D";
import { Point } from "../object/Point";
import { TextureManager } from "../manager/TextureManager";
import { CameraManager } from "../manager/CameraManager";

export class TextureComponent extends Component {
  constructor(
    private texture: WebGLTexture,
    private textureCube: WebGLTexture,
    private textureBump: WebGLTexture,
    private textureManager: TextureManager,
    private cameraManager: CameraManager,
    private coords: Point[] = DEFAULT_COORDS,
  ) {
    super();
  }

  run(): ComponentPrototype<TextureRenderOption, TextureRenderExtension> {
    console.log(this.textureManager.mode);
    return {
      class: TextureRenderExtension,
      options: {
        texture: this.texture,
        textureCoordinates: this.coords,
        cameraPosition: this.cameraManager.position,
        textureCube: this.textureCube,
        textureBump: this.textureBump,
        mode: this.textureManager.mode,
      },
    };
  }

  fit(object: Object3D) {
    // Nothing
  }
}

export const DEFAULT_COORDS = [
  new Point(0, 0),
  new Point(0, 1),
  new Point(1, 1),
  new Point(1, 0),
];