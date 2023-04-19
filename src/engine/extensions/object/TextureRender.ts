import { Buffer } from "../../Buffer";
import { RenderExtension } from "../../RenderExtension";
import { ShaderProgram } from "../../Shader";
import { isPowerOf2 } from "../../../util/util";

export interface TextureRenderOption{
    texture: WebGLTexture;
    renderAttribute?: TextureRenderShaderAttribute
}

export interface TextureRenderShaderLocation {
    texture: number;
    sampler: WebGLUniformLocation;
}
  
export interface TextureRenderShaderAttribute {
    texture: string;
    sampler: string;
}

export const LIGHT_RENDER_EXTENSION_ATTRIBUT_DEFAULT: TextureRenderShaderAttribute =
{
    texture: "aTextureCoord",
    sampler: "uSampler"
};

export class TextureRenderExtension extends RenderExtension{

    private shaderLocation: TextureRenderShaderLocation;
    private texture: WebGLTexture;

    constructor(program: ShaderProgram, options: TextureRenderOption) {
        super(program, options);
        this.texture = options.texture;

        this.initShaderLocation(
            this.program,
            options.renderAttribute ?? LIGHT_RENDER_EXTENSION_ATTRIBUT_DEFAULT
        );
    }

    public initTextureBuffer(gl: WebGLRenderingContext, buffer: Buffer) {
      
        const textureCoordinates = new Float32Array( [
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
        ]);
        buffer.fillFloat("texture", textureCoordinates);
      }

    private initShaderLocation(
        program: ShaderProgram,
        renderAttribute: TextureRenderShaderAttribute
      ) {
        const sampler = program.getUniformLocation(renderAttribute.sampler);
        const texture = program.getAttributeLocation(renderAttribute.texture);
    
        this.shaderLocation = {
            texture: texture,
            sampler: sampler
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
        gl.bindTexture(gl.TEXTURE_2D, this.texture);

        // Tell the shader we bound the texture to texture unit 0
        gl.uniform1i(this.shaderLocation.sampler, 0);
      }
}

