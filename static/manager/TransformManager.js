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
import { IDENTITY_MATRIX, Matrix } from "../matrix/Matrix.js";
import { Listenable } from "../util/Listenable.js";
var TransformManager = /** @class */ (function (_super) {
    __extends(TransformManager, _super);
    function TransformManager() {
        var _this = _super.call(this) || this;
        _this.transforms = [];
        _this.calculatedMatrix = IDENTITY_MATRIX;
        return _this;
    }
    Object.defineProperty(TransformManager.prototype, "matrix", {
        get: function () {
            return this.calculatedMatrix;
        },
        enumerable: false,
        configurable: true
    });
    TransformManager.prototype.add = function (transform) {
        this.transforms.push(transform);
        transform.subscribe(function () {
            this.recalculate();
            this.notify();
        }.bind(this));
        this.recalculate();
        this.notify();
    };
    TransformManager.prototype.delete = function (idx) {
        this.transforms.splice(idx, 1);
        this.recalculate();
        this.notify();
    };
    TransformManager.prototype.reset = function () {
        this.transforms = [];
        this.recalculate();
        this.notify();
    };
    TransformManager.prototype.recalculate = function () {
        var result = IDENTITY_MATRIX;
        for (var _i = 0, _a = this.transforms; _i < _a.length; _i++) {
            var p = _a[_i];
            result = Matrix.multiply(p.matrix, result);
        }
        this.calculatedMatrix = result;
    };
    return TransformManager;
}(Listenable));
export { TransformManager };
//# sourceMappingURL=TransformManager.js.map