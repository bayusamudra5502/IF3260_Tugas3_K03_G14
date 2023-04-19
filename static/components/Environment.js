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
import { EnvRenderExtension } from "../engine/extensions/object/EnvRender.js";
import { Component } from "../object/Component.js";
import { Vertex } from "../object/Vertices.js";
var EnvironmentComponent = /** @class */ (function (_super) {
    __extends(EnvironmentComponent, _super);
    function EnvironmentComponent(texture, camera) {
        if (camera === void 0) { camera = DEFAULT_CAMERA; }
        var _this = _super.call(this) || this;
        _this.texture = texture;
        _this.camera = camera;
        return _this;
    }
    EnvironmentComponent.prototype.run = function () {
        return {
            class: EnvRenderExtension,
            options: {
                texture: this.texture,
                cameraPosition: this.camera
            },
        };
    };
    EnvironmentComponent.prototype.fit = function (object) {
        // Nothing
    };
    return EnvironmentComponent;
}(Component));
export { EnvironmentComponent };
export var DEFAULT_CAMERA = new Vertex(0, 0, 2);
//# sourceMappingURL=Environment.js.map