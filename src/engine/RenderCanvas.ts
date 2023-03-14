export class RenderCanvas {
  private webglContext: WebGLRenderingContext;
  public canvasWidth: number;
  private canvasHeight: number;

  constructor(canvasId: string) {
    this.fillContext(canvasId);
  }

  private fillContext(canvasId: string) {
    const canvas = document.querySelector(`#${canvasId}`) as HTMLCanvasElement;
    this.webglContext = canvas.getContext("webgl");

    if (!this.webglContext) {
      throw new Error("browser doesn't support webgl");
    }

    this.webglContext.viewport(0.0, 0.0, canvas.width, canvas.height);

    this.canvasWidth = canvas.width;
    this.canvasHeight = canvas.height;

    this.setViewPort();
  }

  public setViewPort() {
    this.webglContext.viewport(0.0, 0.0, this.width, this.height);
  }

  public getContext() {
    return this.webglContext;
  }

  public bindResolution(resolutionId: WebGLUniformLocation) {
    this.webglContext.uniform3f(resolutionId, this.width, this.height, 1);
  }

  get width(): number {
    return this.canvasWidth;
  }

  get height(): number {
    return this.canvasHeight;
  }
}
