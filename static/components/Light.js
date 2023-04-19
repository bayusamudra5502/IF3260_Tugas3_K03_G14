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
import { LightRenderExtension, } from "../engine/extensions/object/LightRender.js";
import { Component } from "../object/Component.js";
var LightComponent = /** @class */ (function (_super) {
    __extends(LightComponent, _super);
    function LightComponent(env) {
        var _this = _super.call(this) || this;
        _this.env = env;
        _this.normals = [];
        return _this;
    }
    LightComponent.prototype.fit = function (object) {
        for (var _i = 0, _a = object.faces; _i < _a.length; _i++) {
            var face = _a[_i];
            this.normals = this.normals.concat(face.normals);
        }
    };
    LightComponent.prototype.run = function () {
        return {
            class: LightRenderExtension,
            options: {
                lightColor: this.env.lightColor,
                lightSource: this.env.lightPosition,
                normals: this.normals,
                useShading: this.env.useShading,
            },
        };
    };
    return LightComponent;
}(Component));
export { LightComponent };
//# sourceMappingURL=Light.js.map