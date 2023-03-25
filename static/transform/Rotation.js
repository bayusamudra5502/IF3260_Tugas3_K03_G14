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
import { Geometry } from "../object/Geometry.js";
import { Transformable } from "./Transformable.js";
var RotationAxis;
(function (RotationAxis) {
    //Rotation axis (X, Y, Z)
    RotationAxis[RotationAxis["X"] = 0] = "X";
    RotationAxis[RotationAxis["Y"] = 1] = "Y";
    RotationAxis[RotationAxis["Z"] = 2] = "Z";
})(RotationAxis || (RotationAxis = {}));
var Rotation = /** @class */ (function (_super) {
    __extends(Rotation, _super);
    function Rotation() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.axis = RotationAxis.X;
        _this.angle = 0;
        return _this;
    }
    Object.defineProperty(Rotation.prototype, "rotationAxis", {
        get: function () {
            return this.axis;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Rotation.prototype, "rotationAngle", {
        get: function () {
            return this.angle;
        },
        enumerable: false,
        configurable: true
    });
    Rotation.prototype.configure = function (config) {
        config.axis && (this.axis = config.axis);
        config.angle && (this.angle = config.angle);
        this.notify();
    };
    Object.defineProperty(Rotation.prototype, "matrix", {
        get: function () {
            var angleRad = Geometry.angleDegToRad(this.angle);
            var cos = Math.cos(angleRad);
            var sin = Math.sin(angleRad);
            switch (this.axis) {
                case RotationAxis.X:
                    return [
                        [1, 0, 0, 0],
                        [0, cos, -sin, 0],
                        [0, sin, cos, 0],
                        [0, 0, 0, 1],
                    ];
                case RotationAxis.Y:
                    return [
                        [cos, 0, sin, 0],
                        [0, 1, 0, 0],
                        [-sin, 0, cos, 0],
                        [0, 0, 0, 1],
                    ];
                case RotationAxis.Z:
                    return [
                        [cos, -sin, 0, 0],
                        [sin, cos, 0, 0],
                        [0, 0, 1, 0],
                        [0, 0, 0, 1],
                    ];
            }
        },
        enumerable: false,
        configurable: true
    });
    return Rotation;
}(Transformable));
export { Rotation };
//# sourceMappingURL=Rotation.js.map