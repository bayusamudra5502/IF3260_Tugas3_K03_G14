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
        _this.leftPos = -1;
        _this.rightPos = 1;
        _this.bottomPos = -1;
        _this.topPos = 1;
        _this.nearPos = 1;
        _this.farPos = -1;
        return _this;
    }
    Ortographic.prototype.configure = function (options) {
        options.left && (this.leftPos = options.left);
        options.right && (this.rightPos = options.right);
        options.bottom && (this.bottomPos = options.bottom);
        options.top && (this.topPos = options.top);
        options.near && (this.nearPos = options.near);
        options.far && (this.farPos = options.far);
        this.notify();
        return this;
    };
    Object.defineProperty(Ortographic.prototype, "xLeft", {
        get: function () {
            return this.leftPos;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Ortographic.prototype, "xRight", {
        get: function () {
            return this.rightPos;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Ortographic.prototype, "yBottom", {
        get: function () {
            return this.bottomPos;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Ortographic.prototype, "yTop", {
        get: function () {
            return this.topPos;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Ortographic.prototype, "zNear", {
        get: function () {
            return this.nearPos;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Ortographic.prototype, "zFar", {
        get: function () {
            return this.farPos;
        },
        enumerable: false,
        configurable: true
    });
    Ortographic.prototype.transform = function (matrix) {
        var orthoMatrix = [
            [
                2 / (this.rightPos - this.leftPos),
                0,
                0,
                (this.leftPos + this.rightPos) / (this.leftPos - this.rightPos),
            ],
            [
                0,
                2 / (this.topPos - this.bottomPos),
                0,
                (this.bottomPos + this.topPos) / (this.bottomPos - this.topPos),
            ],
            [
                0,
                0,
                2 / (this.nearPos - this.farPos),
                (this.nearPos + this.farPos) / (this.nearPos - this.farPos),
            ],
            [0, 0, 0, 1],
        ];
        return Matrix.multiply(orthoMatrix, matrix);
    };
    return Ortographic;
}(Projector));
export { Ortographic };
//# sourceMappingURL=Orthographic.js.map