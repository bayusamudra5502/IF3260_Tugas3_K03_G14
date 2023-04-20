import { Point } from "../../../object/Point";
import { Buffer } from "../../Buffer";
import { RenderExtension } from "../../RenderExtension";
import { ShaderProgram } from "../../Shader";
import { Vertex } from "../../../object/Vertices";

export interface TextureRenderOption{
    texture: WebGLTexture;
    textureCoordinates: Point[];
    textureCube: WebGLTexture;
    textureBump: WebGLTexture;
    textureCustom: WebGLTexture;
    cameraPosition: Vertex;
    mode: TEXTURE_MODE;
    renderAttribute?: TextureRenderShaderAttribute
}

export interface TextureRenderShaderLocation {
    texture: number;
    sampler: WebGLUniformLocation;
    textureCubeLocation: WebGLUniformLocation;
    cameraLocation: WebGLUniformLocation;
    textureMode: WebGLUniformLocation;
}
  
export interface TextureRenderShaderAttribute {
    texture: string;
    sampler: string;
    texCube: string;
    textureMode: string;
    cameraPosition: string;
}

export const TEXTURE_RENDER_EXTENSION_ATTRIBUT_DEFAULT: TextureRenderShaderAttribute =
{
    texture: "aTextureCoord",
    sampler: "uSampler",
    texCube: "texCube",
    cameraPosition: "cameraPosition",
    textureMode: "textureMode",
};

export class TextureRenderExtension extends RenderExtension{

    private shaderLocation: TextureRenderShaderLocation;
    private texture: WebGLTexture;
    private textureBump: WebGLTexture;
    private textureCustom: WebGLTexture;
    private textureCoordinates: Point[];
    private mode: TEXTURE_MODE;
    private cameraPosition: Vertex;

    constructor(program: ShaderProgram, options: TextureRenderOption) {
        super(program, options);
        this.texture = options.texture;
        this.textureBump = options.textureBump;
        this.textureCustom = options.textureCustom;
        this.cameraPosition = options.cameraPosition;
        this.textureCoordinates = options.textureCoordinates;
        this.mode = options.mode;
        this.initShaderLocation(
            this.program,
            options.renderAttribute ?? TEXTURE_RENDER_EXTENSION_ATTRIBUT_DEFAULT
        );
    }

    public initTextureBuffer(gl: WebGLRenderingContext, buffer: Buffer) {
        let coordinates = [];
        this.textureCoordinates.forEach(element => {
          coordinates = coordinates.concat(element.getArray())
        });
        const texCoordinates = new Float32Array(coordinates);
        buffer.fillFloat("texture", texCoordinates);
      }

    public initTextureBumpBuffer(gl: WebGLRenderingContext, buffer: Buffer) {
        let coordinates = [];
        this.textureCoordinates.forEach(element => {
          coordinates = coordinates.concat(element.getArray())
        });
        const texCoordinates = new Float32Array(coordinates);
        buffer.fillFloat("textureBump", texCoordinates);
      }

    private initShaderLocation(
        program: ShaderProgram,
        renderAttribute: TextureRenderShaderAttribute
      ) {
        const sampler = program.getUniformLocation(renderAttribute.sampler);
        const texture = program.getAttributeLocation(renderAttribute.texture);
    
        this.shaderLocation = {
            texture: texture,
            sampler: sampler,
            textureCubeLocation: program.getUniformLocation(renderAttribute.texCube),
            cameraLocation: program.getUniformLocation(
              renderAttribute.cameraPosition
            ),
            textureMode: program.getUniformLocation(renderAttribute.textureMode),
        };
      }

    run(gl: WebGLRenderingContext, buffer: Buffer) {
        this.initTextureBuffer(gl, buffer);
        const textureCoordinateBuffer = buffer.get("texture");
        
        gl.pixelStorei(gl.UNPACK_FLIP_Y_WEBGL, true);

        const num = 2; // every coordinate composed of 2 values
        const type = gl.FLOAT; // the data in the buffer is 32-bit float
        const normalize = false; // don't normalize
        const stride = 0; // how many bytes to get from one set to the next
        const offset = 0; // how many bytes inside the buffer to start from
        gl.bindBuffer(gl.ARRAY_BUFFER, textureCoordinateBuffer);
        gl.vertexAttribPointer(
          this.shaderLocation.texture,
          num,
          type,
          normalize,
          stride,
          offset
        );
        gl.enableVertexAttribArray(this.shaderLocation.texture);

        gl.activeTexture(gl.TEXTURE0);
        
        // Bind the texture to texture unit 0
        if (this.mode == TEXTURE_MODE.BUMP_MAPPING)
          gl.bindTexture(gl.TEXTURE_2D, this.textureBump);
        else if (this.mode == TEXTURE_MODE.CUSTOM_MAPPING)
          gl.bindTexture(gl.TEXTURE_2D, this.textureCustom);
        else
          gl.bindTexture(gl.TEXTURE_2D, this.texture);

        // Tell the shader we bound the texture to texture unit 0
        gl.uniform1i(this.shaderLocation.sampler, 0);

        
        gl.pixelStorei(gl.UNPACK_FLIP_Y_WEBGL, true);

        gl.uniform3fv(
          this.shaderLocation.cameraLocation,
          this.cameraPosition.getArray().slice(0, 3)
        );
        gl.uniform1i(this.shaderLocation.textureCubeLocation, 1);
        gl.uniform1i(this.shaderLocation.textureMode, this.mode);
      }
}

export enum TEXTURE_MODE {
  TEXTURE_MAPPING = 0,
  ENVIRONMENT_MAPPING = 1,
  BUMP_MAPPING = 2,
  CUSTOM_MAPPING = 3
}