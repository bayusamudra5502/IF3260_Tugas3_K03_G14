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
import { Listenable } from "../util/Listenable.js";
import { IDENTITY_MATRIX } from "./Matrix.js";
var Transform = /** @class */ (function (_super) {
    __extends(Transform, _super);
    function Transform() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.matrixData = IDENTITY_MATRIX;
        return _this;
    }
    Transform.prototype.updateMatrix = function (matrix) {
        this.matrixData = matrix;
        return this;
    };
    Object.defineProperty(Transform.prototype, "matrix", {
        get: function () {
            return this.getMatrix();
        },
        enumerable: false,
        configurable: true
    });
    Transform.prototype.getMatrix = function () {
        return this.matrixData;
    };
    return Transform;
}(Listenable));
export { Transform };
//# sourceMappingURL=Transform.js.map