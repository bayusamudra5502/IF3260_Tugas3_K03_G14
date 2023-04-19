import { Canvas } from "./Canvas";

export interface ShaderAttribute {
  matrix: {
    transform: string;
    camera: string;
    projection: string;
  };
  position: string;
  color: string;
  tangent: string;
  resolution: string;
}

export const SHADER_ATTR_DEFAULT: ShaderAttribute = {
  color: "color",
  matrix: {
    transform: "Mmatrix",
    camera: "Vmatrix",
    projection: "Pmatrix",
  },
  position: "position",
  tangent: "tangent",
  resolution: "resolution",
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
  tangents: number;
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
    const tangent = this.getAttributeLocation(this.shaderAttribute.tangent);
    

    return {
      matrix: {
        transform: transformMatrix,
        view: cameraMatrix,
        projection: projectionMatrix,
      },
      options: {
        resolution,
      },
      tangents: tangent,
      vertices: position,
      color: color,
    };
  }
}
