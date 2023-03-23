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
import { Matrix } from "../matrix/Matrix.js";
import { Projector } from "./Projector.js";
var Ortographic = /** @class */ (function (_super) {
    __extends(Ortographic, _super);
    function Ortographic() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.left = -1;
        _this.right = 1;
        _this.bottom = -1;
        _this.top = 1;
        _this.near = 1;
        _this.far = -1;
        return _this;
    }
    Ortographic.prototype.configure = function (options) {
        options.left && (this.left = options.left);
        options.right && (this.right = options.right);
        options.bottom && (this.right = options.bottom);
        options.up && (this.right = options.up);
        options.near && (this.right = options.near);
        options.far && (this.right = options.far);
        return this;
    };
    Ortographic.prototype.transform = function (matrix) {
        var orthoMatrix = [
            [
                2 / (this.right - this.left),
                0,
                0,
                (this.left + this.right) / (this.left - this.right),
            ],
            [
                0,
                2 / (this.top - this.bottom),
                0,
                (this.bottom + this.top) / (this.bottom - this.top),
            ],
            [
                0,
                0,
                2 / (this.near - this.far),
                (this.near + this.far) / (this.near - this.far),
            ],
            [0, 0, 0, 1],
        ];
        return Matrix.multiply(orthoMatrix, matrix);
    };
    return Ortographic;
}(Projector));
export { Ortographic };
//# sourceMappingURL=Orthographic.js.map