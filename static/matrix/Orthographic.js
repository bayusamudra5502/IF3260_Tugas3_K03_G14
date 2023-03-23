import { Matrix } from "./Matrix.js.js.js.js.js.js.js.js.js.js.js.js.js.js.js.js.js.js.js.js.js.js.js.js.js.js.js.js.js.js.js.js.js.js.js.js.js.js.js.js.js.js.js.js.js.js.js.js.js.js.js.js.js.js.js.js.js.js.js.js.js.js.js.js.js.js.js.js.js.js.js.js.js.js.js.js.js.js.js.js.js.js.js.js.js.js.js.js.js.js.js.js.js.js.js.js.js.js.js.js.js.js.js.js.js.js.js.js.js.js.js.js.js.js.js.js.js.js.js.js.js.js.js.js.js.js.js.js.js.js.js.js.js.js.js.js.js.js.js.js.js.js.js.js.js.js.js.js.js.js.js.js.js.js.js.js.js.js.js.js.js.js.js.js.js.js.js.js.js.js.js.js.js.js.js.js.js.js.js.js.js.js.js.js.js.js.js.js.js.js.js.js.js.js.js.js.js.js.js.js.js.js.js.js.js.js.js.js.js.js.js.js.js.js.js.js.js.js.js.js.js.js.js.js.js.js.js.js.js.js.js.js.js.js.js.js.js.js.js.js.js.js.js.js.js.js.js.js.js.js.js.js.js.js.js.js.js.js.js.js.js.js.js.js.js.js.js.js.js.js.js.js.js.js.js.js.js.js.js.js.js.js.js.js.js.js.js.js.js.js.js.js.js.js.js.js.js.js.js.js.js.js.js.js.js.js.js.js.js.js.js.js.js.js.js.js.js.js.js.js.js.js.js.js.js.js.js.js.js.js.js.js.js.js.js.js.js.js.js.js.js.js.js.js.js.js.js.js.js.js.js.js.js.js.js.js.js.js.js.js.js.js.js.js.js.js.js.js.js.js.js.js.js.js.js.js.js.js.js.js.js.js.js.js.js.js.js.js.js.js.js.js.js.js.js.js.js.js.js.js.js.js.js.js.js.js.js.js.js.js.js.js.js.js.js.js.js.js.js.js.js.js.js.js.js.js.js.js.js.js.js.js.js.js.js.js.js.js.js.js.js.js.js.js.js.js.js.js.js.js.js.js.js.js.js.js.js.js.js.js.js.js.js.js.js.js.js.js.js.js.js.js.js.js.js.js.js.js.js.js.js.js.js.js.js.js.js.js.js.js.js.js.js.js.js.js.js.js.js.js.js.js.js.js.js.js.js.js.js.js.js.js.js.js.js.js.js.js.js.js.js.js.js.js.js.js.js.js.js.js.js.js.js.js.js.js.js.js.js.js.js.js.js.js.js.js.js";
var Ortographic = /** @class */ (function () {
    function Ortographic() {
        this.left = -1;
        this.right = 1;
        this.bottom = -1;
        this.top = 1;
        this.near = 1;
        this.far = -1;
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
}());
export { Ortographic };
//# sourceMappingURL=Orthographic.js.map