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
import { TransformManager } from "./TransformManager.js";
import { Rotation } from "../transform/Rotation.js";
import { Translation } from "../transform/Translation.js";
import { Matrix } from "../matrix/Matrix.js";
import { Transform } from "../matrix/Transform.js";
import { Vertex } from "../object/Vertices.js";
var CameraManager = /** @class */ (function (_super) {
    __extends(CameraManager, _super);
    function CameraManager() {
        var _this = _super.call(this) || this;
        _this.position = new Vertex(0, 0, 2);
        return _this;
    }
    CameraManager.prototype.calcPosition = function (transformValue) {
        var radius = transformValue.radius;
        var yAxis = transformValue.yAngle;
        var xAxis = transformValue.xAngle;
        this.position = new Vertex(radius * Math.sin(yAxis / 180 * Math.PI), radius * Math.sin(xAxis / 180 * Math.PI), radius * Math.cos(yAxis / 180 * Math.PI));
    };
    CameraManager.prototype.update = function (transformValue) {
        this.calcPosition(transformValue);
        var transformCalc = new TransformManager();
        var rotation = new Rotation();
        var translation = new Translation();
        translation.configure({
            z: transformValue.radius,
        });
        transformCalc.add(translation);
        rotation.configure({
            angleX: transformValue.xAngle,
            angleY: transformValue.yAngle,
        });
        transformCalc.add(rotation);
        var newMatrix = Matrix.inverse(Matrix.transpose(transformCalc.matrix));
        _super.prototype.updateMatrix.call(this, newMatrix);
        this.notify();
    };
    return CameraManager;
}(Transform));
export { CameraManager };
//# sourceMappingURL=CameraManager.js.map