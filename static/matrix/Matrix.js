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
/* a 4x4 Matrix */
var Matrix = /** @class */ (function (_super) {
    __extends(Matrix, _super);
    function Matrix() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Matrix.inverse = function (matrix) {
        // TODO kawan
        return matrix;
    };
    Matrix.transpose = function (m) {
        return [
            [m[0][0], m[1][0], m[2][0], m[3][0]],
            [m[0][1], m[1][1], m[2][1], m[3][1]],
            [m[0][2], m[1][2], m[2][2], m[3][2]],
            [m[0][3], m[1][3], m[2][3], m[3][3]],
        ];
    };
    Matrix.multiply = function (m1, m2) {
        var result = [];
        for (var i = 0; i < m1.length; i++) {
            result.push([]);
            for (var j = 0; j < m2[0].length; j++) {
                result[i].push(0);
            }
        }
        for (var i = 0; i < m1.length; i++) {
            for (var j = 0; j < m2[0].length; j++) {
                for (var k = 0; k < m1[0].length; k++) {
                    result[i][j] += m1[i][k] * m2[k][j];
                }
            }
        }
        return result;
    };
    return Matrix;
}(Array));
export { Matrix };
export var IDENTITY_MATRIX = [
    [1, 0, 0, 0],
    [0, 1, 0, 0],
    [0, 0, 1, 0],
    [0, 0, 0, 1],
];
//# sourceMappingURL=Matrix.js.map