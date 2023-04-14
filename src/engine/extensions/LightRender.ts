import { Color } from "../../object/Color";
import { Vertex } from "../../object/Vertices";
import { Buffer } from "../Buffer";
import { RenderExtension } from "../RenderExtension";
import { ShaderProgram } from "../Shader";

export interface LightRenderOption {
  lightColor: Color;
  lightSource: Vertex;
  normals: Vertex[];
  useShading: boolean;
  renderAttribute?: LightRenderShaderAttribute;
}

export class LightRender extends RenderExtension {
  private shaderLocation: LightRenderShaderLocation;
  private lightColor: Color;
  private lightSource: Vertex;
  private normals: Vertex[];
  private useShading: boolean;

  constructor(program: ShaderProgram, options: LightRenderOption) {
    super(program, options);

    this.lightColor = options.lightColor;
    this.lightSource = options.lightSource;
    this.normals = options.normals;
    this.useShading = options.useShading;

    this.initShaderLocation(
      this.program,
      options.renderAttribute ?? LIGHT_RENDER_EXTENSION_ATTRIBUT_DEFAULT
    );
  }

  private initShaderLocation(
    program: ShaderProgram,
    renderAttribute: LightRenderShaderAttribute
  ) {
    const lightSource = program.getUniformLocation(renderAttribute.lightSource);
    const lightColor = program.getUniformLocation(renderAttribute.lightColor);
    const useShading = program.getUniformLocation(renderAttribute.useShading);
    const normal = program.getAttributeLocation(renderAttribute.normal);

    this.shaderLocation = {
      lightColor,
      lightSource,
      useShading,
      normal,
    };
  }

  private primitiveData() {
    const flatNormal = [];
    for (let i of this.normals) {
      const value = i.getArray();
      for (let j of value) {
        flatNormal.push(j);
      }
    }

    return {
      normals: new Float32Array(flatNormal),
      lightSource: new Float32Array(this.lightSource.getArray()),
      lightColor: new Float32Array(this.lightColor.getArray()),
      useShading: this.useShading ? 1 : 0,
    };
  }

  run(webgl: WebGLRenderingContext, buffer: Buffer) {
    const primitive = this.primitiveData();

    buffer.fillFloat("normal", primitive.normals);
    buffer.fillFloat("lightSource", primitive.lightSource);

    this.bind(webgl, this.shaderLocation.normal, buffer.get("normal"), 4);

    webgl.uniform4fv(this.shaderLocation.lightSource, primitive.lightSource);
    webgl.uniform4fv(this.shaderLocation.lightColor, primitive.lightColor);
    webgl.uniform1i(this.shaderLocation.useShading, primitive.useShading);
  }
}

export interface LightRenderShaderLocation {
  normal: number;
  lightSource: WebGLUniformLocation;
  lightColor: WebGLUniformLocation;
  useShading: WebGLUniformLocation;
}

export interface LightRenderShaderAttribute {
  lightSource: string;
  lightColor: string;
  normal: string;
  useShading: string;
}

export const LIGHT_RENDER_EXTENSION_ATTRIBUT_DEFAULT: LightRenderShaderAttribute =
  {
    normal: "normal",
    lightSource: "lightSource",
    lightColor: "lightColor",
    useShading: "useShading",
  };
