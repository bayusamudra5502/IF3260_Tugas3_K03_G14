import { Color } from "../object/Color";
import DrawInfo, { DrawMode } from "../object/DrawInfo";
import { drawableToPrimitive } from "../util/util";
import { EngineBuffer } from "./EngineBuffer";
import { RenderCanvas } from "./RenderCanvas";
import { Shader, ShaderVariableLocation } from "./Shader";

type DrawTypeMap = {
  [key in DrawMode]: number;
};

export default class RenderEngine {
  private webglContext: WebGLRenderingContext;
  private shaderLocation: ShaderVariableLocation;
  private typeMap: DrawTypeMap;

  constructor(
    private renderCanvas: RenderCanvas,
    private buffer: EngineBuffer,
    shader: Shader,
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

  public clear() {
    this.webglContext.enable(this.webglContext.DEPTH_TEST);

    this.webglContext.clearColor(
      this.backColor.r,
      this.backColor.g,
      this.backColor.b,
      this.backColor.a
    );

    this.renderCanvas.setViewPort();

    this.webglContext.clear(
      this.webglContext.COLOR_BUFFER_BIT | this.webglContext.DEPTH_BUFFER_BIT
    );
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
    this.bind(
      this.shaderLocation.vertices,
      this.buffer.get("vertices"),
      primitive.size
    );
    this.bind(
      this.shaderLocation.color,
      this.buffer.get("colors"),
      primitive.size
    );

    // Transformation Matrix
    this.webglContext.uniformMatrix4fv(
      this.shaderLocation.matrix.transform,
      false,
      primitive.matrix
    );

    return primitive;
  }

  public render(object: DrawInfo) {
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
  }
}
