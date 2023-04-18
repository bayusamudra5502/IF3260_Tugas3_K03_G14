import { RenderExtension } from "../engine/RenderExtension";
import { ShaderProgram } from "../engine/Shader";

export interface ComponentPrototype<T, U extends RenderExtension> {
  class: new (program: ShaderProgram, option: T) => U;
  options: T;
}

export abstract class Component {
  abstract run(): ComponentPrototype<any, any> | null;
}

export abstract class StateComponent extends Component {
  abstract run(): null;
}
