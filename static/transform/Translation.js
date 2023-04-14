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
var Translation = /** @class */ (function (_super) {
    __extends(Translation, _super);
    function Translation() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.x = 0;
        _this.y = 0;
        _this.z = 0;
        return _this;
    }
    Translation.prototype.configure = function (option) {
        option.x && (this.x = option.x);
        option.y && (this.y = option.y);
        option.z && (this.z = option.z);
        return this;
    };
    Object.defineProperty(Translation.prototype, "X", {
        get: function () {
            return this.x;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Translation.prototype, "Y", {
        get: function () {
            return this.y;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Translation.prototype, "Z", {
        get: function () {
            return this.z;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Translation.prototype, "matrix", {
        get: function () {
            return [
                [1, 0, 0, this.x],
                [0, 1, 0, this.y],
                [0, 0, 1, this.z],
                [0, 0, 0, 1],
            ];
        },
        enumerable: false,
        configurable: true
    });
    return Translation;
}(Transformable));
export { Translation };
//# sourceMappingURL=Translation.js.map