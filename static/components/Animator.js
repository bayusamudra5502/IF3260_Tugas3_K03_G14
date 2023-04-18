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
import { StateComponent } from "../object/Component.js";
import { Geometry } from "../object/Geometry.js";
import { Rotation } from "../transform/Rotation.js";
export var RotationAxis;
(function (RotationAxis) {
    RotationAxis[RotationAxis["x"] = 0] = "x";
    RotationAxis[RotationAxis["y"] = 1] = "y";
    RotationAxis[RotationAxis["z"] = 2] = "z";
})(RotationAxis || (RotationAxis = {}));
var RotationAnimator = /** @class */ (function (_super) {
    __extends(RotationAnimator, _super);
    function RotationAnimator(options) {
        var _this = _super.call(this) || this;
        _this.currentFrame = 0;
        _this.frames = options.degreeFrames.map(function (el) { return Geometry.angleDegToRad(el); });
        _this.transform = options.transform;
        _this.axis = options.axis;
        return _this;
    }
    RotationAnimator.prototype.run = function () {
        var currentRad = this.frames[this.currentFrame];
        var rotation = new Rotation();
        rotation.configure({
            angleX: this.axis == RotationAxis.x ? currentRad : 0,
            angleY: this.axis == RotationAxis.y ? currentRad : 0,
            angleZ: this.axis == RotationAxis.z ? currentRad : 0,
        });
        this.currentFrame += 1;
        this.currentFrame %= this.frames.length;
        this.transform.updateMatrix(rotation.matrix);
        return null;
    };
    return RotationAnimator;
}(StateComponent));
export { RotationAnimator };
//# sourceMappingURL=Animator.js.map