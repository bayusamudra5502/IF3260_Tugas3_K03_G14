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
import { IDENTITY_MATRIX } from "../matrix/Matrix.js";
import { Listenable } from "../util/Listenable.js";
var ProjectionManager = /** @class */ (function (_super) {
    __extends(ProjectionManager, _super);
    function ProjectionManager() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.projectors = [];
        _this.calculatedMatrix = IDENTITY_MATRIX;
        return _this;
    }
    Object.defineProperty(ProjectionManager.prototype, "matrix", {
        get: function () {
            return this.calculatedMatrix;
        },
        enumerable: false,
        configurable: true
    });
    ProjectionManager.prototype.add = function (projector) {
        this.projectors.push(projector);
        projector.subscribe(function () {
            this.recalculate();
            this.notify();
        }.bind(this));
        this.recalculate();
        this.notify();
    };
    ProjectionManager.prototype.delete = function (idx) {
        this.projectors.splice(idx, 1);
        this.recalculate();
        this.notify();
    };
    ProjectionManager.prototype.reset = function () {
        this.projectors = [];
        this.recalculate();
        this.notify();
    };
    ProjectionManager.prototype.recalculate = function () {
        var result = IDENTITY_MATRIX;
        for (var _i = 0, _a = this.projectors; _i < _a.length; _i++) {
            var p = _a[_i];
            result = p.transform(result);
        }
        this.calculatedMatrix = result;
    };
    return ProjectionManager;
}(Listenable));
export { ProjectionManager };
//# sourceMappingURL=ProjectionManager.js.map