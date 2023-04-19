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
  normals: Vertex[];
  cameraPosition: Vertex;
  faceTextures?: FaceTexture[];
  renderAttribute?: EnvRenderShaderAttribute;
}

export interface EnvRenderShaderLocation {
  normalLocation: number;
  textureLocation: WebGLUniformLocation;
  cameraLocation: WebGLUniformLocation;
  textureMode: WebGLUniformLocation;
}

export interface EnvRenderShaderAttribute {
  normal: string;
  texCube: string;
  cameraPosition: string;
  textureMode: string;
}

export const ENV_RENDER_EXTENSION_ATTRIBUTE_DEFAULT: EnvRenderShaderAttribute =
  {
    normal: "normal",
    texCube: "texCube",
    cameraPosition: "cameraPosition",
    textureMode: "textureMode",
  };

export class EnvRenderExtension extends RenderExtension {
  private shaderLocation: EnvRenderShaderLocation;
  private texture: WebGLTexture;
  private normals: Vertex[];
  private faceTextures: FaceTexture[];
  private cameraPosition: Vertex;

  constructor(program: ShaderProgram, options: EnvRenderOption) {
    super(program, options);

    this.texture = options.texture;
    this.normals = options.normals;
    this.cameraPosition = options.cameraPosition;
    this.faceTextures = options.faceTextures;

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
      normalLocation: program.getAttributeLocation(renderAttribute.normal),
      textureLocation: program.getUniformLocation(renderAttribute.texCube),
      cameraLocation: program.getUniformLocation(
        renderAttribute.cameraPosition
      ),
      textureMode: program.getUniformLocation(renderAttribute.textureMode),
    };
  }

  run(gl: WebGLRenderingContext, buffer: Buffer) {
    this.applyFaceTexture(gl);
    this.prepareNormal(buffer);
    this.bind(gl, this.shaderLocation.normalLocation, buffer.get("normal"), 4);

    gl.uniform3fv(
      this.shaderLocation.cameraLocation,
      this.cameraPosition.getArray().slice(0, 3)
    );
    gl.uniform1i(this.shaderLocation.textureLocation, 1);
    gl.uniform1i(this.shaderLocation.textureMode, 1);
  }

  private prepareNormal(buffer: Buffer) {
    let flatNormal = [];
    this.normals.forEach((element) => {
      flatNormal = flatNormal.concat(element.getArray());
    });
    buffer.fillFloat("normal", new Float32Array(flatNormal));
  }

  private applyFaceTexture(gl: WebGLRenderingContext) {
    this.faceTextures ?? this.loadDefaultFaceTexture(gl);
    const tex = this.texture;
    this.faceTextures.forEach((face) => {
      const { target, url } = face;

      // Upload the canvas to the cubemap face.
      const level = 0;
      const internalFormat = gl.RGBA;
      const width = 512;
      const height = 512;
      const format = gl.RGBA;
      const type = gl.UNSIGNED_BYTE;

      // setup each face so it's immediately renderable
      gl.texImage2D(
        target,
        level,
        internalFormat,
        width,
        height,
        0,
        format,
        type,
        null
      );

      // Asynchronously load an image
      const image = new Image();
      image.src = url;
      image.addEventListener("load", function () {
        gl.bindTexture(gl.TEXTURE_CUBE_MAP, tex);
        gl.texImage2D(target, level, internalFormat, format, type, image);
        gl.generateMipmap(gl.TEXTURE_CUBE_MAP);
      });
    });
    gl.generateMipmap(gl.TEXTURE_CUBE_MAP);
    gl.texParameteri(
      gl.TEXTURE_CUBE_MAP,
      gl.TEXTURE_MIN_FILTER,
      gl.LINEAR_MIPMAP_LINEAR
    );
  }

  private loadDefaultFaceTexture(gl: WebGLRenderingContext) {
    this.faceTextures = [
      {
        target: gl.TEXTURE_CUBE_MAP_POSITIVE_X,
        url: "/assets/pos-x.jpg",
      },
      {
        target: gl.TEXTURE_CUBE_MAP_NEGATIVE_X,
        url: "/assets/neg-x.jpg",
      },
      {
        target: gl.TEXTURE_CUBE_MAP_POSITIVE_Y,
        url: "/assets/pos-y.jpg",
      },
      {
        target: gl.TEXTURE_CUBE_MAP_NEGATIVE_Y,
        url: "/assets/neg-y.jpg",
      },
      {
        target: gl.TEXTURE_CUBE_MAP_POSITIVE_Z,
        url: "/assets/pos-z.jpg",
      },
      {
        target: gl.TEXTURE_CUBE_MAP_NEGATIVE_Z,
        url: "/assets/neg-z.jpg",
      },
    ];
  }
}
