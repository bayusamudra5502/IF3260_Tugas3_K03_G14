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
export var ENV_RENDER_EXTENSION_ATTRIBUTE_DEFAULT = {
    texCube: "texCube",
    cameraPosition: "cameraPosition",
    textureMode: "textureMode",
};
var EnvRenderExtension = /** @class */ (function (_super) {
    __extends(EnvRenderExtension, _super);
    function EnvRenderExtension(program, options) {
        var _this = this;
        var _a;
        _this = _super.call(this, program, options) || this;
        _this.cameraPosition = options.cameraPosition;
        _this.initShaderLocation(_this.program, (_a = options.renderAttribute) !== null && _a !== void 0 ? _a : ENV_RENDER_EXTENSION_ATTRIBUTE_DEFAULT);
        return _this;
    }
    EnvRenderExtension.prototype.initShaderLocation = function (program, renderAttribute) {
        this.shaderLocation = {
            textureLocation: program.getUniformLocation(renderAttribute.texCube),
            cameraLocation: program.getUniformLocation(renderAttribute.cameraPosition),
            textureMode: program.getUniformLocation(renderAttribute.textureMode),
        };
    };
    EnvRenderExtension.prototype.run = function (gl, buffer) {
        gl.uniform3fv(this.shaderLocation.cameraLocation, this.cameraPosition.getArray().slice(0, 3));
        gl.uniform1i(this.shaderLocation.textureLocation, 1);
        gl.uniform1i(this.shaderLocation.textureMode, 1);
    };
    return EnvRenderExtension;
}(RenderExtension));
export { EnvRenderExtension };
//# sourceMappingURL=EnvRender.js.map