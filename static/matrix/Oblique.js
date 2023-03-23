import { Geometry } from "../object/Geometry.js.js";
import { Matrix } from "./Matrix.js.js";
var Oblique = /** @class */ (function () {
    function Oblique() {
        this.xAngle = Geometry.angleDegToRad(90);
        this.yAngle = Geometry.angleDegToRad(90);
        this.zProjection = 0;
    }
    Oblique.prototype.configure = function (config) {
        config.xAngle && (this.xAngle = Geometry.angleDegToRad(config.xAngle));
        config.yAngle && (this.yAngle = Geometry.angleDegToRad(config.yAngle));
        config.zProjection && (this.zProjection = config.zProjection);
    };
    Oblique.prototype.transform = function (matrix) {
        var cotX = Math.tan(0.5 * Math.PI - this.xAngle);
        var cotY = Math.tan(0.5 * Math.PI - this.yAngle);
        var obliqueMatrix = [
            [1, 0, cotX, -this.zProjection * cotX],
            [0, 1, cotY, -this.zProjection * cotY],
            [0, 0, 1, 0],
            [0, 0, 0, 1],
        ];
        return Matrix.multiply(obliqueMatrix, matrix);
    };
    return Oblique;
}());
export { Oblique };
//# sourceMappingURL=Oblique.js.map