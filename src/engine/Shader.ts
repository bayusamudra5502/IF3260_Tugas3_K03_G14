import { Canvas } from "./Canvas";
import { isPowerOf2 } from "../util/util";

export interface ShaderAttribute {
  matrix: {
    transform: string;
    camera: string;
    projection: string;
  };
  position: string;
  color: string;
  resolution: string;
  texture: string;
  sampler: string;
}

export const SHADER_ATTR_DEFAULT: ShaderAttribute = {
  color: "color",
  matrix: {
    transform: "Mmatrix",
    camera: "Vmatrix",
    projection: "Pmatrix",
  },
  position: "position",
  resolution: "resolution",
  texture: "aTextureCoord",
  sampler: "uSampler"
};

export interface ShaderVariableLocation {
  matrix: {
    transform: WebGLUniformLocation;
    view: WebGLUniformLocation;
    projection: WebGLUniformLocation;
  };
  options: {
    resolution: WebGLUniformLocation;
  };
  vertices: number;
  texture: number;
  sampler: WebGLUniformLocation;
  color: number;
}

export class ShaderProgram {
  private vertexCode: string;
  private fragmentCode: string;
  private gl: WebGLRenderingContext;

  private isLoaded: boolean = false;

  private webglProgram: WebGLProgram;

  constructor(
    private vertexShaderId: string,
    private fragmentShaderId: string,
    canvas: Canvas,
    private shaderAttribute: ShaderAttribute = SHADER_ATTR_DEFAULT
  ) {
    this.gl = canvas.getContext();
  }

  public getAttributeLocation(variableName: string) {
    return this.gl.getAttribLocation(this.webglProgram, variableName);
  }

  public getUniformLocation(variableName: string) {
    return this.gl.getUniformLocation(this.webglProgram, variableName);
  }

  public loadCode() {
    const vertexElmn = document.querySelector(`#${this.vertexShaderId}`);
    const fragmentElmn = document.querySelector(`#${this.fragmentShaderId}`);

    if (!vertexElmn) {
      throw new Error("vertex shader element is not found");
    }

    if (!fragmentElmn) {
      throw new Error("fragment shader element is not found");
    }

    this.vertexCode = vertexElmn.textContent;
    this.fragmentCode = fragmentElmn.textContent;
    this.isLoaded = true;

    return this;
  }

  public compileCode(type: number, code: string) {
    const shader = this.gl.createShader(type);
    this.gl.shaderSource(shader, code);
    this.gl.compileShader(shader);
    var compilationLog = this.gl.getShaderInfoLog(shader);
    console.log('Shader compiler log: ' + compilationLog);

    return shader;
  }

  /* Compile all vertex */
  public compile() {
    if (!this.isLoaded) {
      this.loadCode();
    }

    const vertexShader = this.compileCode(
      this.gl.VERTEX_SHADER,
      this.vertexCode
    );
    const fragmentShader = this.compileCode(
      this.gl.FRAGMENT_SHADER,
      this.fragmentCode
    );

    const program = this.gl.createProgram();
    this.gl.attachShader(program, vertexShader);
    this.gl.attachShader(program, fragmentShader);
    this.gl.linkProgram(program);

    this.webglProgram = program;

    return this;
  }

  public initTextureBuffer() {
    const gl = this.gl;
    const textureCoordBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, textureCoordBuffer);
  
    const textureCoordinates = [
      // Front
      0.0, 0.0, 1.0, 0.0, 1.0, 1.0, 0.0, 1.0,
      // Back
      0.0, 0.0, 1.0, 0.0, 1.0, 1.0, 0.0, 1.0,
      // Top
      0.0, 0.0, 1.0, 0.0, 1.0, 1.0, 0.0, 1.0,
      // Bottom
      0.0, 0.0, 1.0, 0.0, 1.0, 1.0, 0.0, 1.0,
      // Right
      0.0, 0.0, 1.0, 0.0, 1.0, 1.0, 0.0, 1.0,
      // Left
      0.0, 0.0, 1.0, 0.0, 1.0, 1.0, 0.0, 1.0,
    ];
  
    gl.bufferData(
      gl.ARRAY_BUFFER,
      new Float32Array(textureCoordinates),
      gl.STATIC_DRAW
    );
  
    return textureCoordBuffer;
  }

  public loadTexture(path: string = "/assets/logo.png") {
    const gl = this.gl;
    const texture = gl.createTexture();
    gl.bindTexture(gl.TEXTURE_2D, texture);
  
    const level = 0;
    const internalFormat = gl.RGBA;
    const width = 1;
    const height = 1;
    const border = 0;
    const srcFormat = gl.RGBA;
    const srcType = gl.UNSIGNED_BYTE;
    const pixel = new Uint8Array([0, 0, 255, 255]); // opaque blue
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
        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR_MIPMAP_LINEAR);
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

  public load(): ShaderVariableLocation {
    this.gl.useProgram(this.webglProgram);

    const transformMatrix = this.getUniformLocation(
      this.shaderAttribute.matrix.transform
    );
    const cameraMatrix = this.getUniformLocation(
      this.shaderAttribute.matrix.camera
    );
    const projectionMatrix = this.getUniformLocation(
      this.shaderAttribute.matrix.projection
    );
    const position = this.getAttributeLocation(this.shaderAttribute.position);
    const color = this.getAttributeLocation(this.shaderAttribute.color);
    const resolution = this.getUniformLocation(this.shaderAttribute.resolution);
    const texture = this.getAttributeLocation(this.shaderAttribute.texture);
    const sampler = this.getUniformLocation(this.shaderAttribute.sampler);

    return {
      matrix: {
        transform: transformMatrix,
        view: cameraMatrix,
        projection: projectionMatrix,
      },
      options: {
        resolution,
      },
      vertices: position,
      texture: texture,
      sampler: sampler,
      color: color,
    };
  }
}
