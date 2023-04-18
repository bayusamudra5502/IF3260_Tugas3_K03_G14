import {
  LightRenderExtension,
  LightRenderOption,
} from "../engine/extensions/object/LightRender";
import { EnvironmentManager } from "../manager/EnvironmentManager";
import { Component, ComponentPrototype } from "../object/Component";
import { Vector } from "../object/Vector";

export class LightComponent extends Component {
  constructor(private env: EnvironmentManager, private normals: Vector[]) {
    super();
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
