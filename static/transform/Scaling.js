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
import { Transformable } from "./Transformable.js";
var Scaling = /** @class */ (function (_super) {
    __extends(Scaling, _super);
    function Scaling() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.sx = 1;
        _this.sy = 1;
        _this.sz = 1;
        return _this;
    }
    Scaling.prototype.configure = function (option) {
        option.s && (this.sx = this.sy = this.sz = option.s);
        return this;
    };
    Object.defineProperty(Scaling.prototype, "matrix", {
        get: function () {
            return [
                [this.sx, 0, 0, 0],
                [0, this.sy, 0, 0],
                [0, 0, this.sz, 0],
                [0, 0, 0, 1],
            ];
        },
        enumerable: false,
        configurable: true
    });
    return Scaling;
}(Transformable));
export { Scaling };
//# sourceMappingURL=Scaling.js.map