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
import { Geometry } from "../object/Geometry.js";
import { Vertex } from "../object/Vertices.js";
import { Transformable } from "./Transformable.js";
import { Translation } from "./Translation.js";
export var RotationAxis;
(function (RotationAxis) {
    //Rotation axis (X, Y, Z)
    RotationAxis["X"] = "x";
    RotationAxis["Y"] = "y";
    RotationAxis["Z"] = "z";
})(RotationAxis || (RotationAxis = {}));
var Rotation = /** @class */ (function (_super) {
    __extends(Rotation, _super);
    function Rotation() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.angleX = 0;
        _this.angleY = 0;
        _this.angleZ = 0;
        _this.center = new Vertex(0, 0, 0);
        return _this;
    }
    Object.defineProperty(Rotation.prototype, "rotationAngleX", {
        get: function () {
            return this.angleX;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Rotation.prototype, "rotationAngleY", {
        get: function () {
            return this.angleY;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Rotation.prototype, "rotationAngleZ", {
        get: function () {
            return this.angleZ;
        },
        enumerable: false,
        configurable: true
    });
    Rotation.prototype.configure = function (config) {
        config.angleX && (this.angleX = config.angleX);
        config.angleY && (this.angleY = config.angleY);
        config.angleZ && (this.angleZ = config.angleZ);
        config.center && (this.center = config.center);
        this.notify();
    };
    Rotation.prototype.generateXRotation = function (angleRad) {
        var cos = Math.cos(angleRad);
        var sin = Math.sin(angleRad);
        return [
            [1, 0, 0, 0],
            [0, cos, -sin, 0],
            [0, sin, cos, 0],
            [0, 0, 0, 1],
        ];
    };
    Rotation.prototype.generateYRotation = function (angleRad) {
        var cos = Math.cos(angleRad);
        var sin = Math.sin(angleRad);
        return [
            [cos, 0, sin, 0],
            [0, 1, 0, 0],
            [-sin, 0, cos, 0],
            [0, 0, 0, 1],
        ];
    };
    Rotation.prototype.generateZRotation = function (angleRad) {
        var cos = Math.cos(angleRad);
        var sin = Math.sin(angleRad);
        return [
            [cos, -sin, 0, 0],
            [sin, cos, 0, 0],
            [0, 0, 1, 0],
            [0, 0, 0, 1],
        ];
    };
    Object.defineProperty(Rotation.prototype, "matrix", {
        get: function () {
            var XMatrix = this.generateXRotation(Geometry.angleDegToRad(this.angleX));
            var YMatrix = this.generateYRotation(Geometry.angleDegToRad(this.angleY));
            var ZMatrix = this.generateZRotation(Geometry.angleDegToRad(this.angleZ));
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
            return Matrix.multiply(moveBack.matrix, Matrix.multiply(ZMatrix, Matrix.multiply(YMatrix, Matrix.multiply(XMatrix, moveToOrigin.matrix))));
        },
        enumerable: false,
        configurable: true
    });
    return Rotation;
}(Transformable));
export { Rotation };
//# sourceMappingURL=Rotation.js.map