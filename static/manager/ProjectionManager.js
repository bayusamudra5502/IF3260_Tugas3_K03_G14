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
import { Listenable } from "./Listenable.js";
var ProjectionManager = /** @class */ (function (_super) {
    __extends(ProjectionManager, _super);
    function ProjectionManager() {
        var _this = _super.call(this) || this;
        _this.projectors = [];
        _this.calculatedMatrix = IDENTITY_MATRIX;
        _this.subscribe(_this.recalculate);
        return _this;
    }
    Object.defineProperty(ProjectionManager.prototype, "matrix", {
        get: function () {
            return this.calculatedMatrix;
        },
        enumerable: false,
        configurable: true
    });
    ProjectionManager.prototype.addProjector = function (projector) {
        this.projectors.push(projector);
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