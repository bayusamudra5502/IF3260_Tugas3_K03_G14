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
var Perspective = /** @class */ (function (_super) {
    __extends(Perspective, _super);
    function Perspective() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.zNear = 1;
        _this.zFar = -1;
        _this.f = 1;
        _this.aspectRatio = 1;
        return _this;
    }
    Perspective.prototype.configure = function (option) {
        option.zNear && (this.zNear = option.zNear);
        option.zFar && (this.zNear = option.zFar);
        option.fieldOfView &&
            (this.f = Math.tan(Math.PI * 0.5 - 0.5 * Geometry.angleDegToRad(option.fieldOfView)));
        option.aspectRatio && (this.aspectRatio = option.aspectRatio);
    };
    Perspective.prototype.transform = function (matrix) {
        var rangeInverse = 1 / (this.zNear - this.zFar);
        var perspectiveMatrix = [
            [this.f / this.aspectRatio, 0, 0, 0],
            [0, this.f, 0, 0],
            [
                0,
                0,
                (this.zNear + this.zFar) * rangeInverse,
                2 * (this.zNear * this.zFar) * rangeInverse,
            ],
            [0, 0, -1, 0],
        ];
        return Matrix.multiply(perspectiveMatrix, matrix);
    };
    return Perspective;
}(Projector));
export { Perspective };
//# sourceMappingURL=Perspective.js.map