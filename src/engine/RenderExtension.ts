import { Buffer } from "./Buffer";
import { ShaderProgram } from "./Shader";

export abstract class RenderExtension {
  constructor(protected program: ShaderProgram, options: any) {}

  abstract run(webgl: WebGLRenderingContext, buffer: Buffer);

  protected bind(
    webglContext: WebGLRenderingContext,
    pointer: number,
    buffer: WebGLBuffer,
    size: number,
    type: number = webglContext.FLOAT
  ) {
    webglContext.bindBuffer(webglContext.ARRAY_BUFFER, buffer);
    webglContext.vertexAttribPointer(pointer, size, type, false, 0, 0);
    webglContext.enableVertexAttribArray(pointer);
  }
}
