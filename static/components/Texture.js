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
import { TextureRenderExtension, } from "../engine/extensions/object/TextureRender.js";
import { Component } from "../object/Component.js";
import { Point } from "../object/Point.js";
var TextureComponent = /** @class */ (function (_super) {
    __extends(TextureComponent, _super);
    function TextureComponent(texture, textureCube, textureBump, textureManager, cameraManager, coords) {
        if (coords === void 0) { coords = DEFAULT_COORDS; }
        var _this = _super.call(this) || this;
        _this.texture = texture;
        _this.textureCube = textureCube;
        _this.textureBump = textureBump;
        _this.textureManager = textureManager;
        _this.cameraManager = cameraManager;
        _this.coords = coords;
        return _this;
    }
    TextureComponent.prototype.run = function () {
        console.log(this.textureManager.mode);
        return {
            class: TextureRenderExtension,
            options: {
                texture: this.texture,
                textureCoordinates: this.coords,
                cameraPosition: this.cameraManager.position,
                textureCube: this.textureCube,
                textureBump: this.textureBump,
                mode: this.textureManager.mode,
            },
        };
    };
    TextureComponent.prototype.fit = function (object) {
        // Nothing
    };
    return TextureComponent;
}(Component));
export { TextureComponent };
export var DEFAULT_COORDS = [
    new Point(0, 0),
    new Point(0, 1),
    new Point(1, 1),
    new Point(1, 0),
];
//# sourceMappingURL=Texture.js.map