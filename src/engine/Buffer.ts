import { Canvas } from "./Canvas";

export class Buffer {
  private bufferData: StringMap<WebGLBuffer> = {};
  private webglContext: WebGLRenderingContext;

  constructor(canvas: Canvas) {
    this.webglContext = canvas.getContext();
  }

  public get(key: string) {
    if (this.bufferData[key]) {
      return this.bufferData[key];
    }

    this.bufferData[key] = this.webglContext.createBuffer();
    return this.bufferData[key];
  }

  public fillFloat(key: string, data: Float32Array) {
    const buffer = this.get(key);
    this.webglContext.bindBuffer(this.webglContext.ARRAY_BUFFER, buffer);
    this.webglContext.bufferData(
      this.webglContext.ARRAY_BUFFER,
      data,
      this.webglContext.STATIC_DRAW
    );
  }

  public fillUint(key: string, data: Uint16Array) {
    const buffer = this.get(key);
    this.webglContext.bindBuffer(
      this.webglContext.ELEMENT_ARRAY_BUFFER,
      buffer
    );
    this.webglContext.bufferData(
      this.webglContext.ELEMENT_ARRAY_BUFFER,
      data,
      this.webglContext.STATIC_DRAW
    );
  }
}
