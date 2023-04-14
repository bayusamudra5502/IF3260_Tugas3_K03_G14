import { Color } from "../object/Color";
import DrawInfo, { DrawMode } from "../object/DrawInfo";
import { drawableToPrimitive } from "../util/util";
import { Buffer } from "./Buffer";
import { Canvas } from "./Canvas";
import { RenderExtension } from "./RenderExtension";
import { ShaderProgram, ShaderVariableLocation } from "./Shader";

type DrawTypeMap = {
  [key in DrawMode]: number;
};

export default class RenderEngine {
  private webglContext: WebGLRenderingContext;
  private shaderLocation: ShaderVariableLocation;
  private typeMap: DrawTypeMap;
  private globalExtensions: RenderExtension[] = [];

  constructor(
    private renderCanvas: Canvas,
    private buffer: Buffer,
    shader: ShaderProgram,
    private backColor: Color = new Color(0, 0, 0, 0)
  ) {
    this.webglContext = renderCanvas.getContext();
    this.shaderLocation = shader.load();
    renderCanvas.bindResolution(this.shaderLocation.options.resolution);

    this.typeMap = {
      line: this.webglContext.LINES,
      "line-loop": this.webglContext.LINE_LOOP,
      point: this.webglContext.POINTS,
      triangle: this.webglContext.TRIANGLES,
      "triangle-strip": this.webglContext.TRIANGLE_STRIP,
      "triangle-fan": this.webglContext.TRIANGLE_FAN,
    };
  }

  addGlobalExtension(...extensions: RenderExtension[]) {
    this.globalExtensions = this.globalExtensions.concat(extensions);
    return this;
  }

  public clear() {
    this.webglContext.clearColor(
      this.backColor.r,
      this.backColor.g,
      this.backColor.b,
      this.backColor.a
    );

    this.renderCanvas.setViewPort();

    /* Run all global extensions */
    for (const extension of this.globalExtensions) {
      extension.run(this.webglContext, this.buffer);
    }
  }

  private bind(
    pointer: number,
    buffer: WebGLBuffer,
    size: number,
    type: number = this.webglContext.FLOAT
  ) {
    this.webglContext.bindBuffer(this.webglContext.ARRAY_BUFFER, buffer);
    this.webglContext.vertexAttribPointer(pointer, size, type, false, 0, 0);
    this.webglContext.enableVertexAttribArray(pointer);
  }

  public prepareBuffer(object: DrawInfo) {
    const primitive = drawableToPrimitive(object);

    // Buffer data
    this.buffer.fillFloat("vertices", primitive.vertices);
    this.buffer.fillFloat("colors", primitive.color);
    this.buffer.fillUint("indices", primitive.indices);

    // Data binding
    this.bind(this.shaderLocation.vertices, this.buffer.get("vertices"), 4);
    this.bind(this.shaderLocation.color, this.buffer.get("colors"), 4);

    // Transformation Matrix
    this.webglContext.uniformMatrix4fv(
      this.shaderLocation.matrix.transform,
      false,
      primitive.matrix.transform
    );

    this.webglContext.uniformMatrix4fv(
      this.shaderLocation.matrix.view,
      false,
      primitive.matrix.view
    );

    this.webglContext.uniformMatrix4fv(
      this.shaderLocation.matrix.projection,
      false,
      primitive.matrix.projection
    );

    return primitive;
  }

  public render(object: DrawInfo) {
    /* Run all local extension */
    for (const renderExtension of object.extensions) {
      renderExtension.run(this.webglContext, this.buffer);
    }

    /* Bind all object to buffer */
    const primitive = this.prepareBuffer(object);

    this.webglContext.bindBuffer(
      this.webglContext.ELEMENT_ARRAY_BUFFER,
      this.buffer.get("indices")
    );

    const type = this.typeMap[object.mode];

    if (type === undefined) {
      throw new Error("unknown draw mode");
    }

    this.webglContext.drawElements(
      type,
      primitive.size,
      this.webglContext.UNSIGNED_SHORT,
      0
    );

    const err = this.webglContext.getError();
    if (err != 0) {
      throw new Error(`something happened when rendering: error code ${err}`);
    }
  }
}
