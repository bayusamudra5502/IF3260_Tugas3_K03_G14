import { IDENTITY_MATRIX, Matrix } from "../matrix/Matrix.js";
var ObjectRenderer = /** @class */ (function () {
    function ObjectRenderer(env, extBuild, drawMode) {
        if (drawMode === void 0) { drawMode = "triangle"; }
        this.env = env;
        this.extBuild = extBuild;
        this.drawMode = drawMode;
    }
    ObjectRenderer.prototype.generateDrawInfo = function (root) {
        var objectQueue = [root];
        var matrixQueue = [IDENTITY_MATRIX];
        var result = [];
        while (objectQueue.length > 0) {
            var currentObject = objectQueue.shift();
            var matrix = matrixQueue.shift();
            var objectInfo = this.buildObjectInfo(currentObject);
            var newMatrix = Matrix.multiply(matrix, currentObject.transform.matrix);
            for (var _i = 0, objectInfo_1 = objectInfo; _i < objectInfo_1.length; _i++) {
                var info = objectInfo_1[_i];
                info.matrix.transform = newMatrix;
            }
            result = result.concat(objectInfo);
            for (var _a = 0, _b = currentObject.childs; _a < _b.length; _a++) {
                var object = _b[_a];
                objectQueue.push(object);
                matrixQueue.push(newMatrix);
            }
        }
        return result;
    };
    ObjectRenderer.prototype.buildObjectInfo = function (object) {
        var result = [];
        var extensions = [];
        for (var _i = 0, _a = object.components; _i < _a.length; _i++) {
            var component = _a[_i];
            var res = component.run();
            if (res != null) {
                extensions.push(this.extBuild.build(res.class, res.options));
            }
        }
        for (var _b = 0, _c = object.faces; _b < _c.length; _b++) {
            var face = _c[_b];
            result.push({
                colors: face.colors,
                indices: face.indicies,
                matrix: {
                    projection: this.env.projectionMatrix,
                    transform: IDENTITY_MATRIX,
                    view: this.env.viewMatrix,
                },
                extensions: extensions,
                vertices: face.vertices,
                mode: this.drawMode,
            });
        }
        return result;
    };
    return ObjectRenderer;
}());
export { ObjectRenderer };
//# sourceMappingURL=ObjectRenderer.js.map