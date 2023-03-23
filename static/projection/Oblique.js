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
import { Geometry } from "../object/Geometry.js";
import { Matrix } from "../matrix/Matrix.js";
import { Projector } from "./Projector.js";
var Oblique = /** @class */ (function (_super) {
    __extends(Oblique, _super);
    function Oblique() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.xAngleRad = Geometry.angleDegToRad(90);
        _this.yAngleRad = Geometry.angleDegToRad(90);
        _this.zProj = 0;
        return _this;
    }
    Object.defineProperty(Oblique.prototype, "xAngle", {
        get: function () {
            return Geometry.angleRadToDeg(this.xAngleRad);
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Oblique.prototype, "yAngle", {
        get: function () {
            return Geometry.angleRadToDeg(this.xAngleRad);
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Oblique.prototype, "zProjection", {
        get: function () {
            return this.zProj;
        },
        enumerable: false,
        configurable: true
    });
    Oblique.prototype.configure = function (config) {
        config.xAngle && (this.xAngleRad = Geometry.angleDegToRad(config.xAngle));
        config.yAngle && (this.yAngleRad = Geometry.angleDegToRad(config.yAngle));
        config.zProjection && (this.zProj = config.zProjection);
        this.notify();
    };
    Oblique.prototype.transform = function (matrix) {
        var cotX = Math.tan(0.5 * Math.PI - this.xAngleRad);
        var cotY = Math.tan(0.5 * Math.PI - this.yAngleRad);
        var obliqueMatrix = [
            [1, 0, cotX, -this.zProj * cotX],
            [0, 1, cotY, -this.zProj * cotY],
            [0, 0, 1, 0],
            [0, 0, 0, 1],
        ];
        return Matrix.multiply(obliqueMatrix, matrix);
    };
    return Oblique;
}(Projector));
export { Oblique };
//# sourceMappingURL=Oblique.js.map