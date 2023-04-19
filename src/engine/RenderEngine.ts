import { Color } from "../object/Color";
import DrawInfo, { DrawMode } from "../object/DrawInfo";
import { drawableToPrimitive, isPowerOf2 } from "../util/util";
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
  private initialExtensions: RenderExtension[] = [];
  public texture: WebGLTexture; // TODO: move this (?)
  public envMap: WebGLTexture; // TODO: move this (?)

  constructor(
    private renderCanvas: Canvas,
    private buffer: Buffer,
    shader: ShaderProgram,
    private backColor: Color = new Color(0, 0, 0, 0)
  ) {
    this.webglContext = renderCanvas.getContext();
    this.shaderLocation = shader.load();
    this.texture = this.loadTexture(); // TODO: move this (?)
    this.envMap = this.loadEnvMap(); // TODO: move this (?)
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

  addInitialExtension(...extensions: RenderExtension[]) {
    this.initialExtensions = this.initialExtensions.concat(extensions);
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
    for (const extension of this.initialExtensions) {
      extension.run(this.webglContext, this.buffer);
    }
  }

  public loadEnvMap() {
    const gl = this.webglContext;
    const envMap = gl.createTexture();
    gl.activeTexture(gl.TEXTURE1);
    gl.bindTexture(gl.TEXTURE_CUBE_MAP, envMap);
    return envMap;
  }

  // TODO: refactor this, move it somewhere else
  public loadTexture(path: string = "/assets/logo.png") {
    const gl = this.webglContext;
    const texture = gl.createTexture();
    gl.bindTexture(gl.TEXTURE_2D, texture);

    const level = 0;
    const internalFormat = gl.RGBA;
    const width = 1;
    const height = 1;
    const border = 0;
    const srcFormat = gl.RGBA;
    const srcType = gl.UNSIGNED_BYTE;
    const pixel = new Uint8Array([0, 255, 255, 255]); // opaque blue
    gl.texImage2D(
      gl.TEXTURE_2D,
      level,
      internalFormat,
      width,
      height,
      border,
      srcFormat,
      srcType,
      pixel
    );

    const image = new Image();
    image.onload = () => {
      console.log("loaded image");
      gl.bindTexture(gl.TEXTURE_2D, texture);
      gl.texImage2D(
        gl.TEXTURE_2D,
        level,
        internalFormat,
        srcFormat,
        srcType,
        image
      );

      // WebGL1 has different requirements for power of 2 images
      // vs. non power of 2 images so check if the image is a
      // power of 2 in both dimensions.
      if (isPowerOf2(image.width) && isPowerOf2(image.height)) {
        // Yes, it's a power of 2. Generate mips.
        gl.generateMipmap(gl.TEXTURE_2D);
        // gl.NEAREST is also allowed, instead of gl.LINEAR, as neither mipmap.
        gl.texParameteri(
          gl.TEXTURE_2D,
          gl.TEXTURE_MIN_FILTER,
          gl.LINEAR_MIPMAP_LINEAR
        );
        // Prevents s-coordinate wrapping (repeating).
        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.REPEAT);
        // Prevents t-coordinate wrapping (repeating).
        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.REPEAT);
      } else {
        // No, it's not a power of 2. Turn off mips and set
        // wrapping to clamp to edge
        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.REPEAT);
        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.REPEAT);
        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR);
      }
    };
    image.src = path;

    return texture;
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
