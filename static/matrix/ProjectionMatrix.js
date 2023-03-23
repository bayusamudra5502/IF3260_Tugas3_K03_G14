import { IDENTITY_MATRIX } from "./Matrix.js.js.js.js.js.js.js.js.js.js.js.js.js.js.js.js.js.js.js.js.js.js.js.js.js.js.js.js.js.js.js.js.js.js.js.js.js.js.js.js.js.js.js.js.js.js.js.js.js.js.js.js.js.js.js.js.js.js.js.js.js.js.js.js.js.js.js.js.js.js.js.js";
var ProjectionMatrix = /** @class */ (function () {
    function ProjectionMatrix() {
        this.projectors = [];
        this.calculatedMatrix = IDENTITY_MATRIX;
    }
    Object.defineProperty(ProjectionMatrix.prototype, "matrix", {
        get: function () {
            return this.calculatedMatrix;
        },
        enumerable: false,
        configurable: true
    });
    ProjectionMatrix.prototype.addProjector = function (projector) {
        this.projectors.push(projector);
        this.recalculate();
    };
    ProjectionMatrix.prototype.recalculate = function () {
        var result = IDENTITY_MATRIX;
        for (var _i = 0, _a = this.projectors; _i < _a.length; _i++) {
            var p = _a[_i];
            result = p.transform(result);
        }
        this.calculatedMatrix = result;
    };
    return ProjectionMatrix;
}());
export { ProjectionMatrix };
//# sourceMappingURL=ProjectionMatrix.js.map