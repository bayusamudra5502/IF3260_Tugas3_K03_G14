import { Vertex } from "../../../object/Vertices";
import { Buffer } from "../../Buffer";
import { RenderExtension } from "../../RenderExtension";
import { ShaderProgram } from "../../Shader";

export interface FaceTexture {
  target: GLenum;
  url: string;
}

export interface EnvRenderOption {
  texture: WebGLTexture;
  cameraPosition: Vertex;
  renderAttribute?: EnvRenderShaderAttribute;
}

export interface EnvRenderShaderLocation {
  textureLocation: WebGLUniformLocation;
  cameraLocation: WebGLUniformLocation;
  textureMode: WebGLUniformLocation;
}

export interface EnvRenderShaderAttribute {
  texCube: string;
  cameraPosition: string;
  textureMode: string;
}

export const ENV_RENDER_EXTENSION_ATTRIBUTE_DEFAULT: EnvRenderShaderAttribute =
  {
    texCube: "texCube",
    cameraPosition: "cameraPosition",
    textureMode: "textureMode",
  };

export class EnvRenderExtension extends RenderExtension {
  private shaderLocation: EnvRenderShaderLocation;
  private cameraPosition: Vertex;

  constructor(program: ShaderProgram, options: EnvRenderOption) {
    super(program, options);

    this.cameraPosition = options.cameraPosition;

    this.initShaderLocation(
      this.program,
      options.renderAttribute ?? ENV_RENDER_EXTENSION_ATTRIBUTE_DEFAULT
    );
  }

  private initShaderLocation(
    program: ShaderProgram,
    renderAttribute: EnvRenderShaderAttribute
  ) {
    this.shaderLocation = {
      textureLocation: program.getUniformLocation(renderAttribute.texCube),
      cameraLocation: program.getUniformLocation(
        renderAttribute.cameraPosition
      ),
      textureMode: program.getUniformLocation(renderAttribute.textureMode),
    };
  }

  run(gl: WebGLRenderingContext, buffer: Buffer) {
    gl.uniform3fv(
      this.shaderLocation.cameraLocation,
      this.cameraPosition.getArray().slice(0, 3)
    );
    gl.uniform1i(this.shaderLocation.textureLocation, 1);
    gl.uniform1i(this.shaderLocation.textureMode, 1);
  }

}
