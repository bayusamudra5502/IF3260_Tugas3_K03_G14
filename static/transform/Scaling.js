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
import { Vertex } from "../object/Vertices.js";
import { Transformable } from "./Transformable.js";
import { Translation } from "./Translation.js";
var Scaling = /** @class */ (function (_super) {
    __extends(Scaling, _super);
    function Scaling() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.sx = 1;
        _this.sy = 1;
        _this.sz = 1;
        _this.center = new Vertex(0, 0, 0);
        return _this;
    }
    Scaling.prototype.configure = function (option) {
        option.sx && (this.sx = option.sx);
        option.sy && (this.sy = option.sy);
        option.sz && (this.sz = option.sz);
        option.center && (this.center = option.center);
        return this;
    };
    Object.defineProperty(Scaling.prototype, "Sx", {
        get: function () {
            return this.sx;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Scaling.prototype, "Sy", {
        get: function () {
            return this.sy;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Scaling.prototype, "Sz", {
        get: function () {
            return this.sz;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Scaling.prototype, "matrix", {
        get: function () {
            var moveToOrigin = new Translation();
            var moveBack = new Translation();
            moveToOrigin.configure({
                x: -this.center.x,
                y: -this.center.y,
                z: -this.center.z,
            });
            moveBack.configure({
                x: this.center.x,
                y: this.center.y,
                z: this.center.z,
            });
            var matrixScaling = [
                [this.sx, 0, 0, 0],
                [0, this.sy, 0, 0],
                [0, 0, this.sz, 0],
                [0, 0, 0, 1],
            ];
            return Matrix.multiply(moveBack.matrix, Matrix.multiply(matrixScaling, moveToOrigin.matrix));
        },
        enumerable: false,
        configurable: true
    });
    return Scaling;
}(Transformable));
export { Scaling };
//# sourceMappingURL=Scaling.js.map