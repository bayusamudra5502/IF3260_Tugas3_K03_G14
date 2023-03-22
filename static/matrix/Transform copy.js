import { IDENTITY_MATRIX } from "./Matrix.js.js.js.js.js.js.js.js.js.js.js.js.js.js.js.js.js.js.js.js.js.js.js.js.js.js.js.js.js.js.js.js.js.js.js.js.js.js.js.js.js.js.js.js.js.js.js.js.js.js.js.js.js.js.js.js.js.js.js.js.js.js.js.js.js.js.js.js.js.js.js.js.js.js";
var Transform = /** @class */ (function () {
    function Transform() {
        this.matrixData = IDENTITY_MATRIX;
    }
    Transform.prototype.update = function (matrix) {
        this.matrixData = matrix;
        return this;
    };
    Object.defineProperty(Transform.prototype, "matrix", {
        get: function () {
            return this.matrixData;
        },
        enumerable: false,
        configurable: true
    });
    return Transform;
}());
export { Transform };
//# sourceMappingURL=Transform%20copy.js.map