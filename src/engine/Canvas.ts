type RenderBox = { maxX?: number; maxY?: number; maxZ: number };

export class Canvas {
  private webglContext: WebGLRenderingContext;
  private maxX: number;
  private maxY: number;
  private maxZ: number;
  private canvas: HTMLCanvasElement;

  constructor(
    canvasId: string,
    box: RenderBox = {
      maxX: 1,
      maxY: 1,
      maxZ: 1,
    }
  ) {
    this.fillContext(canvasId, box);
  }

  private fillContext(canvasId: string, { maxX, maxY, maxZ }: RenderBox) {
    const canvas = document.querySelector(`#${canvasId}`) as HTMLCanvasElement;
    this.webglContext = canvas.getContext("webgl2");

    this.canvas = canvas;

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
    this.webglContext.viewport(0.0, 0.0, this.canvas.width, this.canvas.height);
  }

  public getContext() {
    return this.webglContext;
  }

  public bindResolution(resolutionId: WebGLUniformLocation) {
    this.webglContext.uniform3f(resolutionId, this.boxX, this.boxY, this.boxZ);
  }

  get aspectRatio() {
    return this.canvas.width / this.canvas.height;
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
