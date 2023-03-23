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
var ObjectManager = /** @class */ (function (_super) {
    __extends(ObjectManager, _super);
    function ObjectManager(env, mode) {
        if (mode === void 0) { mode = "triangle"; }
        var _this = _super.call(this) || this;
        _this.env = env;
        _this.mode = mode;
        _this.objects = [];
        return _this;
    }
    ObjectManager.prototype.add = function (object) {
        this.objects.push(object);
        this.notify();
    };
    ObjectManager.prototype.get = function (idx) {
        return this.objects[idx];
    };
    ObjectManager.prototype.delete = function (idx) {
        this.objects.splice(idx, 1);
        this.notify();
    };
    ObjectManager.prototype.deleteAll = function () {
        this.objects = [];
        this.notify();
    };
    ObjectManager.prototype.generateDrawInfo = function () {
        var result = [];
        for (var _i = 0, _a = this.objects; _i < _a.length; _i++) {
            var obj = _a[_i];
            var info = {
                colors: obj.colors,
                indices: obj.indicies,
                lightSource: this.env.sourceLight,
                mode: this.mode,
                matrix: {
                    projection: this.env.projectionMatrix,
                    transform: obj.transform.matrix,
                    view: this.env.viewMatrix,
                },
                normals: obj.normal,
                vertices: obj.vertices,
                useShading: this.env.useShading,
            };
            result.push(info);
        }
        return result;
    };
    return ObjectManager;
}(Listenable));
export { ObjectManager };
//# sourceMappingURL=ObjectManager.js.map