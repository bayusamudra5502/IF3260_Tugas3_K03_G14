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
var RenderModeExtension = /** @class */ (function (_super) {
    __extends(RenderModeExtension, _super);
    function RenderModeExtension() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    RenderModeExtension.prototype.run = function (webgl, buffer) {
        // webgl.enable(webgl.CULL_FACE);
        webgl.enable(webgl.DEPTH_TEST);
        webgl.clear(webgl.COLOR_BUFFER_BIT | webgl.DEPTH_BUFFER_BIT);
    };
    return RenderModeExtension;
}(RenderExtension));
export { RenderModeExtension };
//# sourceMappingURL=RenderMode.js.map