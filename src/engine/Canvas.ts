type RenderBox = { maxX?: number; maxY?: number; maxZ: number };

export class Canvas {
  private webglContext: WebGLRenderingContext;
  private maxX: number;
  private maxY: number;
  private maxZ: number;

  constructor(
    canvasId: string,
    box: RenderBox = {
      maxZ: 1,
    }
  ) {
    this.fillContext(canvasId, box);
  }

  private fillContext(canvasId: string, { maxX, maxY, maxZ }: RenderBox) {
    const canvas = document.querySelector(`#${canvasId}`) as HTMLCanvasElement;
    this.webglContext = canvas.getContext("webgl");

    if (!this.webglContext) {
      throw new Error("browser doesn't support webgl");
    }

    this.webglContext.viewport(0.0, 0.0, canvas.width, canvas.height);

    this.maxX = maxX ?? canvas.width;
    this.maxY = maxY ?? canvas.height;
    this.maxZ = maxZ;

    this.setViewPort();
  }

  public setViewPort() {
    this.webglContext.viewport(0.0, 0.0, this.boxX, this.boxY);
  }

  public getContext() {
    return this.webglContext;
  }

  public bindResolution(resolutionId: WebGLUniformLocation) {
    this.webglContext.uniform3f(resolutionId, this.boxX, this.boxY, this.boxZ);
  }

  get boxX(): number {
    return this.maxX;
  }

  get boxY(): number {
    return this.maxY;
  }

  get boxZ(): number {
    return this.maxZ;
  }
}
