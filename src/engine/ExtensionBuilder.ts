import { RenderExtension } from "./RenderExtension";
import { ShaderProgram } from "./Shader";

export class ExtensionBuilder {
  constructor(private program: ShaderProgram) {}

  build<T, U>(
    extensionConstructor: new (program: ShaderProgram, option: T) => U,
    options: T
  ): U {
    return new extensionConstructor(this.program, options);
  }
}
