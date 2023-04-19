var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
import { RenderExtension } from "../../RenderExtension.js";
export var TEXTURE_RENDER_EXTENSION_ATTRIBUT_DEFAULT = {
    texture: "aTextureCoord",
    sampler: "uSampler",
    texCube: "texCube",
    cameraPosition: "cameraPosition",
    textureMode: "textureMode",
};
var TextureRenderExtension = /** @class */ (function (_super) {
    __extends(TextureRenderExtension, _super);
    function TextureRenderExtension(program, options) {
        var _this = this;
        var _a;
        _this = _super.call(this, program, options) || this;
        _this.texture = options.texture;
        _this.cameraPosition = options.cameraPosition;
        _this.textureCoordinates = options.textureCoordinates;
        _this.mode = options.mode;
        _this.initShaderLocation(_this.program, (_a = options.renderAttribute) !== null && _a !== void 0 ? _a : TEXTURE_RENDER_EXTENSION_ATTRIBUT_DEFAULT);
        return _this;
    }
    TextureRenderExtension.prototype.initTextureBuffer = function (gl, buffer) {
        var coordinates = [];
        this.textureCoordinates.forEach(function (element) {
            coordinates = coordinates.concat(element.getArray());
        });
        var texCoordinates = new Float32Array(coordinates);
        buffer.fillFloat("texture", texCoordinates);
    };
    TextureRenderExtension.prototype.initShaderLocation = function (program, renderAttribute) {
        var sampler = program.getUniformLocation(renderAttribute.sampler);
        var texture = program.getAttributeLocation(renderAttribute.texture);
        this.shaderLocation = {
            texture: texture,
            sampler: sampler,
            textureCubeLocation: program.getUniformLocation(renderAttribute.texCube),
            cameraLocation: program.getUniformLocation(renderAttribute.cameraPosition),
            textureMode: program.getUniformLocation(renderAttribute.textureMode),
        };
    };
    TextureRenderExtension.prototype.run = function (gl, buffer) {
        this.initTextureBuffer(gl, buffer);
        var textureCoordinateBuffer = buffer.get("texture");
        gl.pixelStorei(gl.UNPACK_FLIP_Y_WEBGL, true);
        var num = 2; // every coordinate composed of 2 values
        var type = gl.FLOAT; // the data in the buffer is 32-bit float
        var normalize = false; // don't normalize
        var stride = 0; // how many bytes to get from one set to the next
        var offset = 0; // how many bytes inside the buffer to start from
        gl.bindBuffer(gl.ARRAY_BUFFER, textureCoordinateBuffer);
        gl.vertexAttribPointer(this.shaderLocation.texture, num, type, normalize, stride, offset);
        gl.enableVertexAttribArray(this.shaderLocation.texture);
        gl.activeTexture(gl.TEXTURE0);
        // Bind the texture to texture unit 0
        gl.bindTexture(gl.TEXTURE_2D, this.texture);
        // Tell the shader we bound the texture to texture unit 0
        gl.uniform1i(this.shaderLocation.sampler, 0);
        gl.uniform3fv(this.shaderLocation.cameraLocation, this.cameraPosition.getArray().slice(0, 3));
        gl.uniform1i(this.shaderLocation.textureCubeLocation, 1);
        gl.uniform1i(this.shaderLocation.textureMode, this.mode);
    };
    return TextureRenderExtension;
}(RenderExtension));
export { TextureRenderExtension };
export var TEXTURE_MODE;
(function (TEXTURE_MODE) {
    TEXTURE_MODE[TEXTURE_MODE["TEXTURE_MAPPING"] = 0] = "TEXTURE_MAPPING";
    TEXTURE_MODE[TEXTURE_MODE["ENVIRONMENT_MAPPING"] = 1] = "ENVIRONMENT_MAPPING";
    TEXTURE_MODE[TEXTURE_MODE["BUMP_MAPPING"] = 2] = "BUMP_MAPPING";
})(TEXTURE_MODE || (TEXTURE_MODE = {}));
//# sourceMappingURL=TextureRender.js.map