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
var __values = (this && this.__values) || function(o) {
    var s = typeof Symbol === "function" && Symbol.iterator, m = s && o[s], i = 0;
    if (m) return m.call(o);
    if (o && typeof o.length === "number") return {
        next: function () {
            if (o && i >= o.length) o = void 0;
            return { value: o && o[i++], done: !o };
        }
    };
    throw new TypeError(s ? "Object is not iterable." : "Symbol.iterator is not defined.");
};
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
        var e_1, _a;
        var result = IDENTITY_MATRIX;
        try {
            for (var _b = __values(this.projectors), _c = _b.next(); !_c.done; _c = _b.next()) {
                var p = _c.value;
                result = p.transform(result);
            }
        }
        catch (e_1_1) { e_1 = { error: e_1_1 }; }
        finally {
            try {
                if (_c && !_c.done && (_a = _b.return)) _a.call(_b);
            }
            finally { if (e_1) throw e_1.error; }
        }
        this.calculatedMatrix = result;
    };
    return ProjectionManager;
}(Listenable));
export { ProjectionManager };
//# sourceMappingURL=ProjectionManager.js.map