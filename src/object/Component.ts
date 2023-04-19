import { RenderExtension } from "../engine/RenderExtension";
import { ShaderProgram } from "../engine/Shader";
import { Object3D } from "./Object3D";

export interface ComponentPrototype<T, U extends RenderExtension> {
  class: new (program: ShaderProgram, option: T) => U;
  options: T;
}

export abstract class Component {
  abstract run(): ComponentPrototype<any, any> | null;
  abstract fit(object: Object3D);
}

export abstract class StateComponent extends Component {
  abstract run(): null;
}
