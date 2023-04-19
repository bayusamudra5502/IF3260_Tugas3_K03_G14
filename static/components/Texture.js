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
import { Vertex } from "../object/Vertices.js";
var TextureComponent = /** @class */ (function (_super) {
    __extends(TextureComponent, _super);
    function TextureComponent(texture, textureCube, mode, camera, coords) {
        if (camera === void 0) { camera = DEFAULT_CAMERA; }
        if (coords === void 0) { coords = DEFAULT_COORDS; }
        var _this = _super.call(this) || this;
        _this.texture = texture;
        _this.textureCube = textureCube;
        _this.mode = mode;
        _this.camera = camera;
        _this.coords = coords;
        return _this;
    }
    TextureComponent.prototype.run = function () {
        return {
            class: TextureRenderExtension,
            options: {
                texture: this.texture,
                textureCoordinates: this.coords,
                cameraPosition: this.camera,
                textureCube: this.textureCube,
                mode: this.mode,
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
// TODO: delete this
export var DEFAULT_CAMERA = new Vertex(0, 0, 2);
//# sourceMappingURL=Texture.js.map