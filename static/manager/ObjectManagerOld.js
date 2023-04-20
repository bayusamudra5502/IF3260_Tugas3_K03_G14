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
import { Listenable } from "../util/Listenable.js";
var ObjectManagerOld = /** @class */ (function (_super) {
    __extends(ObjectManagerOld, _super);
    function ObjectManagerOld(env, mode) {
        if (mode === void 0) { mode = "triangle"; }
        var _this = _super.call(this) || this;
        _this.env = env;
        _this.mode = mode;
        _this.objects = [];
        return _this;
    }
    ObjectManagerOld.prototype.add = function (object) {
        this.objects.push(object);
        this.notify();
    };
    ObjectManagerOld.prototype.get = function (idx) {
        return this.objects[idx];
    };
    ObjectManagerOld.prototype.delete = function (idx) {
        this.objects.splice(idx, 1);
        this.notify();
    };
    ObjectManagerOld.prototype.deleteAll = function () {
        this.objects = [];
        this.notify();
    };
    ObjectManagerOld.prototype.generateDrawInfo = function () {
        var e_1, _a;
        var result = [];
        try {
            for (var _b = __values(this.objects), _c = _b.next(); !_c.done; _c = _b.next()) {
                var obj = _c.value;
                var info = {
                    colors: obj.colors,
                    indices: obj.indicies,
                    mode: this.mode,
                    matrix: {
                        projection: this.env.projectionMatrix,
                        transform: obj.transform.matrix,
                        view: this.env.viewMatrix,
                    },
                    tangents: [],
                    vertices: obj.vertices,
                    normals: obj.normal,
                    extensions: [],
                };
                result.push(info);
            }
        }
        catch (e_1_1) { e_1 = { error: e_1_1 }; }
        finally {
            try {
                if (_c && !_c.done && (_a = _b.return)) _a.call(_b);
            }
            finally { if (e_1) throw e_1.error; }
        }
        return result;
    };
    return ObjectManagerOld;
}(Listenable));
export { ObjectManagerOld };
//# sourceMappingURL=ObjectManagerOld.js.map