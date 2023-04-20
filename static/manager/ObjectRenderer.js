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
var ObjectRenderer = /** @class */ (function () {
    function ObjectRenderer(env, extBuild, drawMode) {
        if (drawMode === void 0) { drawMode = "triangle"; }
        this.env = env;
        this.extBuild = extBuild;
        this.drawMode = drawMode;
    }
    ObjectRenderer.prototype.generateDrawInfo = function (root) {
        var e_1, _a, e_2, _b;
        var objectQueue = [root];
        var matrixQueue = [IDENTITY_MATRIX];
        var result = [];
        while (objectQueue.length > 0) {
            var currentObject = objectQueue.shift();
            var matrix = matrixQueue.shift();
            var objectInfo = this.buildObjectInfo(currentObject);
            var newMatrix = Matrix.multiply(matrix, currentObject.matrix);
            try {
                for (var objectInfo_1 = (e_1 = void 0, __values(objectInfo)), objectInfo_1_1 = objectInfo_1.next(); !objectInfo_1_1.done; objectInfo_1_1 = objectInfo_1.next()) {
                    var info = objectInfo_1_1.value;
                    info.matrix.transform = newMatrix;
                }
            }
            catch (e_1_1) { e_1 = { error: e_1_1 }; }
            finally {
                try {
                    if (objectInfo_1_1 && !objectInfo_1_1.done && (_a = objectInfo_1.return)) _a.call(objectInfo_1);
                }
                finally { if (e_1) throw e_1.error; }
            }
            result = result.concat(objectInfo);
            try {
                for (var _c = (e_2 = void 0, __values(currentObject.childs)), _d = _c.next(); !_d.done; _d = _c.next()) {
                    var object = _d.value;
                    objectQueue.push(object);
                    matrixQueue.push(newMatrix);
                }
            }
            catch (e_2_1) { e_2 = { error: e_2_1 }; }
            finally {
                try {
                    if (_d && !_d.done && (_b = _c.return)) _b.call(_c);
                }
                finally { if (e_2) throw e_2.error; }
            }
        }
        return result;
    };
    ObjectRenderer.prototype.buildObjectInfo = function (object) {
        var e_3, _a, e_4, _b;
        var result = [];
        var extensions = [];
        try {
            for (var _c = __values(object.components), _d = _c.next(); !_d.done; _d = _c.next()) {
                var component = _d.value;
                component.fit(object);
                var res = component.run();
                if (res) {
                    extensions.push(this.extBuild.build(res.class, res.options));
                }
            }
        }
        catch (e_3_1) { e_3 = { error: e_3_1 }; }
        finally {
            try {
                if (_d && !_d.done && (_a = _c.return)) _a.call(_c);
            }
            finally { if (e_3) throw e_3.error; }
        }
        try {
            for (var _e = __values(object.faces), _f = _e.next(); !_f.done; _f = _e.next()) {
                var face = _f.value;
                result.push({
                    colors: face.colors,
                    indices: face.indicies,
                    matrix: {
                        projection: this.env.projectionMatrix,
                        transform: IDENTITY_MATRIX,
                        view: this.env.viewMatrix,
                    },
                    normals: face.normals,
                    tangents: face.tangents,
                    extensions: extensions,
                    vertices: face.vertices,
                    mode: this.drawMode,
                });
            }
        }
        catch (e_4_1) { e_4 = { error: e_4_1 }; }
        finally {
            try {
                if (_f && !_f.done && (_b = _e.return)) _b.call(_e);
            }
            finally { if (e_4) throw e_4.error; }
        }
        return result;
    };
    return ObjectRenderer;
}());
export { ObjectRenderer };
//# sourceMappingURL=ObjectRenderer.js.map