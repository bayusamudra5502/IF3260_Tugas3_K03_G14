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
var CameraManager = /** @class */ (function (_super) {
    __extends(CameraManager, _super);
    function CameraManager() {
        return _super.call(this) || this;
    }
    CameraManager.prototype.update = function (transformValue) {
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