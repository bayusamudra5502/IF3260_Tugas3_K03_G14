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
import { Listenable } from "../util/Listenable.js";
var TextureUi = /** @class */ (function (_super) {
    __extends(TextureUi, _super);
    function TextureUi(config) {
        if (config === void 0) { config = DEFAULT_TEXTUREUI_OPTIONS; }
        var _this = _super.call(this) || this;
        _this.bind(config);
        return _this;
    }
    Object.defineProperty(TextureUi.prototype, "mode", {
        get: function () {
            return this.modeValue;
        },
        enumerable: false,
        configurable: true
    });
    TextureUi.prototype.bind = function (textureOption) {
        var _this = this;
        var choice = document.getElementById(textureOption.idTextureMode);
        choice.oninput = function () {
            _this.modeValue = parseInt(choice.value);
            _this.notify();
        };
    };
    return TextureUi;
}(Listenable));
export { TextureUi };
export var DEFAULT_TEXTUREUI_OPTIONS = {
    idTextureMode: "texture-mode"
};
//# sourceMappingURL=TextureUI.js.map