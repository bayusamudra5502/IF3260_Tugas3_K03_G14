import {
  EnvRenderExtension,
  EnvRenderOption
} from "../engine/extensions/object/EnvRender";
import { Component, ComponentPrototype } from "../object/Component";
import { Object3D } from "../object/Object3D";
import { Point } from "../object/Point";
import { Vertex } from "../object/Vertices";

export class EnvironmentComponent extends Component {
  constructor(
    private texture: WebGLTexture,
    private camera: Vertex  = DEFAULT_CAMERA
  ) {
    super();
  }

  run(): ComponentPrototype<EnvRenderOption, EnvRenderExtension> {
    return {
      class: EnvRenderExtension,
      options: {
        texture: this.texture,
        cameraPosition: this.camera
      },
    };
  }

  fit(object: Object3D) {
    // Nothing
  }
}

export const DEFAULT_CAMERA = new Vertex(0, 0, 2);