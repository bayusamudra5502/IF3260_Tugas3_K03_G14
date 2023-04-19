import {
  LightRenderExtension,
  LightRenderOption,
} from "../engine/extensions/object/LightRender";
import { EnvironmentManager } from "../manager/EnvironmentManager";
import { Component, ComponentPrototype } from "../object/Component";
import { Object3D } from "../object/Object3D";
import { Vector } from "../object/Vector";

export class LightComponent extends Component {
  private normals: Vector[] = [];

  constructor(private env: EnvironmentManager) {
    super();
  }

  fit(object: Object3D) {
    for (const face of object.faces) {
      this.normals = this.normals.concat(face.normals);
    }
  }

  run(): ComponentPrototype<LightRenderOption, LightRenderExtension> {
    return {
      class: LightRenderExtension,
      options: {
        lightColor: this.env.lightColor,
        lightSource: this.env.lightPosition,
        normals: this.normals,
        useShading: this.env.useShading,
      },
    };
  }
}
