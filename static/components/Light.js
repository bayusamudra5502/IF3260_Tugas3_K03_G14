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
var __values = (this && this.__values) || function(o) {
    var s = typeof Symbol === "function" && Symbol.iterator, m = s && o[s], i = 0;
    if (m) return m.call(o);
    if (o && typeof o.length === "number") return {
        next: function () {
            if (o && i >= o.length) o = void 0;
            return { value: o && o[i++], done: !o };
        }
    };
    throw new TypeError(s ? "Object is not iterable." : "Symbol.iterator is not defined.");
};
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
        var e_1, _a;
        try {
            for (var _b = __values(object.faces), _c = _b.next(); !_c.done; _c = _b.next()) {
                var face = _c.value;
                this.normals = this.normals.concat(face.normals);
            }
        }
        catch (e_1_1) { e_1 = { error: e_1_1 }; }
        finally {
            try {
                if (_c && !_c.done && (_a = _b.return)) _a.call(_b);
            }
            finally { if (e_1) throw e_1.error; }
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