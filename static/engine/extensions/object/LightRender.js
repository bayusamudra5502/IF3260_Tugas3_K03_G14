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
import { RenderExtension } from "../../RenderExtension.js";
var LightRenderExtension = /** @class */ (function (_super) {
    __extends(LightRenderExtension, _super);
    function LightRenderExtension(program, options) {
        var _this = this;
        var _a;
        _this = _super.call(this, program, options) || this;
        _this.lightColor = options.lightColor;
        _this.lightSource = options.lightSource;
        _this.normals = options.normals;
        _this.useShading = options.useShading;
        _this.initShaderLocation(_this.program, (_a = options.renderAttribute) !== null && _a !== void 0 ? _a : LIGHT_RENDER_EXTENSION_ATTRIBUT_DEFAULT);
        return _this;
    }
    LightRenderExtension.prototype.initShaderLocation = function (program, renderAttribute) {
        var lightSource = program.getUniformLocation(renderAttribute.lightSource);
        var lightColor = program.getUniformLocation(renderAttribute.lightColor);
        var useShading = program.getUniformLocation(renderAttribute.useShading);
        var normal = program.getAttributeLocation(renderAttribute.normal);
        this.shaderLocation = {
            lightColor: lightColor,
            lightSource: lightSource,
            useShading: useShading,
            normal: normal,
        };
    };
    LightRenderExtension.prototype.primitiveData = function () {
        var e_1, _a, e_2, _b;
        var flatNormal = [];
        try {
            for (var _c = __values(this.normals), _d = _c.next(); !_d.done; _d = _c.next()) {
                var i = _d.value;
                var value = i.getArray();
                try {
                    for (var value_1 = (e_2 = void 0, __values(value)), value_1_1 = value_1.next(); !value_1_1.done; value_1_1 = value_1.next()) {
                        var j = value_1_1.value;
                        flatNormal.push(j);
                    }
                }
                catch (e_2_1) { e_2 = { error: e_2_1 }; }
                finally {
                    try {
                        if (value_1_1 && !value_1_1.done && (_b = value_1.return)) _b.call(value_1);
                    }
                    finally { if (e_2) throw e_2.error; }
                }
            }
        }
        catch (e_1_1) { e_1 = { error: e_1_1 }; }
        finally {
            try {
                if (_d && !_d.done && (_a = _c.return)) _a.call(_c);
            }
            finally { if (e_1) throw e_1.error; }
        }
        return {
            normals: new Float32Array(flatNormal),
            lightSource: new Float32Array(this.lightSource.getArray()),
            lightColor: new Float32Array(this.lightColor.getArray()),
            useShading: this.useShading ? 1 : 0,
        };
    };
    LightRenderExtension.prototype.run = function (webgl, buffer) {
        var primitive = this.primitiveData();
        buffer.fillFloat("normal", primitive.normals);
        buffer.fillFloat("lightSource", primitive.lightSource);
        this.bind(webgl, this.shaderLocation.normal, buffer.get("normal"), 4);
        webgl.uniform4fv(this.shaderLocation.lightSource, primitive.lightSource);
        webgl.uniform4fv(this.shaderLocation.lightColor, primitive.lightColor);
        webgl.uniform1i(this.shaderLocation.useShading, primitive.useShading);
    };
    return LightRenderExtension;
}(RenderExtension));
export { LightRenderExtension };
export var LIGHT_RENDER_EXTENSION_ATTRIBUT_DEFAULT = {
    normal: "normal",
    lightSource: "lightSource",
    lightColor: "lightColor",
    useShading: "useShading",
};
//# sourceMappingURL=LightRender.js.map