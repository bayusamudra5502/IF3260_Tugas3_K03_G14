import { Canvas } from "./Canvas";

export interface ShaderAttribute {
  matrix: {
    transform: string;
    camera: string;
    projection: string;
  };
  position: string;
  color: string;
  resolution: string;
  normal: string;

  lightSource: string;
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
  normal: "normal",
  lightSource: "lightSource",
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
  color: number;
  normal: number;

  lightSource: WebGLUniformLocation;
}

export class ShaderProgram {
  private vertexCode: string;
  private fragmentCode: string;
  private gl: WebGLRenderingContext;

  private isLoaded: boolean = false;

  private program: WebGLProgram;

  constructor(
    private vertexShaderId: string,
    private fragmentShaderId: string,
    canvas: Canvas,
    private shaderAttribute: ShaderAttribute = SHADER_ATTR_DEFAULT
  ) {
    this.gl = canvas.getContext();
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

    this.program = program;

    return this;
  }

  public load(): ShaderVariableLocation {
    this.gl.useProgram(this.program);

    const transformMatrix = this.gl.getUniformLocation(
      this.program,
      this.shaderAttribute.matrix.transform
    );
    const cameraMatrix = this.gl.getUniformLocation(
      this.program,
      this.shaderAttribute.matrix.camera
    );
    const projectionMatrix = this.gl.getUniformLocation(
      this.program,
      this.shaderAttribute.matrix.projection
    );

    const position = this.gl.getAttribLocation(
      this.program,
      this.shaderAttribute.position
    );
    const color = this.gl.getAttribLocation(
      this.program,
      this.shaderAttribute.color
    );
    const resolution = this.gl.getUniformLocation(
      this.program,
      this.shaderAttribute.resolution
    );
    const lightSource = this.gl.getUniformLocation(
      this.program,
      this.shaderAttribute.lightSource
    );
    const normal = this.gl.getAttribLocation(
      this.program,
      this.shaderAttribute.normal
    );

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
      color,
      normal,
      lightSource,
    };
  }
}
