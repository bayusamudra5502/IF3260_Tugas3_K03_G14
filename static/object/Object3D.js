var __read = (this && this.__read) || function (o, n) {
    var m = typeof Symbol === "function" && o[Symbol.iterator];
    if (!m) return o;
    var i = m.call(o), r, ar = [], e;
    try {
        while ((n === void 0 || n-- > 0) && !(r = i.next()).done) ar.push(r.value);
    }
    catch (error) { e = { error: error }; }
    finally {
        try {
            if (r && !r.done && (m = i["return"])) m.call(i);
        }
        finally { if (e) throw e.error; }
    }
    return ar;
};
var __spreadArray = (this && this.__spreadArray) || function (to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
};
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
import { IDENTITY_MATRIX, Matrix } from "../matrix/Matrix.js";
import { Transform } from "../matrix/Transform.js";
var TRANSFORM_IDX = 0;
var Object3D = /** @class */ (function () {
    function Object3D(name, facesList, joinPointvert) {
        this.name = name;
        this.facesList = facesList;
        this.joinPointvert = joinPointvert;
        this.childList = [];
        this.transformMapData = new Map();
        this.componentList = [];
        this.isTransformChange = false;
        this.transformCache = IDENTITY_MATRIX;
        this.transformMapData.set(TRANSFORM_IDX, new Transform());
    }
    Object.defineProperty(Object3D.prototype, "id", {
        get: function () {
            return this.name;
        },
        enumerable: false,
        configurable: true
    });
    Object3D.prototype.getTransform = function (key) {
        var result = this.transformMapData.get(key);
        if (!result) {
            result = new Transform();
            this.transformMapData.set(key, result);
        }
        return result;
    };
    Object3D.prototype.setTransform = function (key, matrix) {
        if (!this.transformMapData.has(key)) {
            this.transformMapData.set(key, new Transform());
        }
        this.transformMapData.get(key).updateMatrix(matrix);
        this.isTransformChange = true;
    };
    Object.defineProperty(Object3D.prototype, "matrix", {
        get: function () {
            var e_1, _a;
            if (this.isTransformChange) {
                var total = IDENTITY_MATRIX;
                var keys = __spreadArray([], __read(this.transformMapData.keys()), false).sort(function (a, b) { return a - b; });
                try {
                    for (var keys_1 = __values(keys), keys_1_1 = keys_1.next(); !keys_1_1.done; keys_1_1 = keys_1.next()) {
                        var transformKey = keys_1_1.value;
                        var transform = this.transformMapData.get(transformKey);
                        total = Matrix.multiply(total, transform.matrix);
                    }
                }
                catch (e_1_1) { e_1 = { error: e_1_1 }; }
                finally {
                    try {
                        if (keys_1_1 && !keys_1_1.done && (_a = keys_1.return)) _a.call(keys_1);
                    }
                    finally { if (e_1) throw e_1.error; }
                }
                this.transformCache = total;
            }
            return this.transformCache;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Object3D.prototype, "childs", {
        get: function () {
            return this.childList;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Object3D.prototype, "joinPoint", {
        get: function () {
            return this.joinPointvert;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Object3D.prototype, "faces", {
        get: function () {
            return this.facesList;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Object3D.prototype, "components", {
        get: function () {
            return this.componentList;
        },
        enumerable: false,
        configurable: true
    });
    Object3D.prototype.findComponent = function (classConstructor) {
        var e_2, _a;
        try {
            for (var _b = __values(this.componentList), _c = _b.next(); !_c.done; _c = _b.next()) {
                var component = _c.value;
                if (component instanceof classConstructor) {
                    return component;
                }
            }
        }
        catch (e_2_1) { e_2 = { error: e_2_1 }; }
        finally {
            try {
                if (_c && !_c.done && (_a = _b.return)) _a.call(_b);
            }
            finally { if (e_2) throw e_2.error; }
        }
        return null;
    };
    Object3D.prototype.addChild = function (child) {
        this.childList.push(child);
    };
    Object3D.prototype.addComponent = function (component) {
        this.componentList.push(component);
    };
    return Object3D;
}());
export { Object3D };
//# sourceMappingURL=Object3D.js.map