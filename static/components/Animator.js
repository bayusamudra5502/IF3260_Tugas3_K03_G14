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
        _this.isActive = false;
        _this.frames = options.degreeFrames.map(function (el) { return Geometry.angleDegToRad(el); });
        _this.axis = options.axis;
        return _this;
    }
    RotationAnimator.prototype.fit = function (object) {
        this.transform = object.transform;
    };
    RotationAnimator.prototype.setActive = function (active) {
        this.isActive = active;
    };
    RotationAnimator.prototype.run = function () {
        if (!this.isActive)
            return;
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
    RotationAnimator.fromConfig = function (config) {
        if (config.max_degree < config.min_degree) {
            throw new Error("max degree must be greater or equal to min degree");
        }
        if (config.start_degree > config.max_degree) {
            throw new Error("max degree must be greater or equal to start degree");
        }
        if (config.min_degree > config.start_degree) {
            throw new Error("star degree must be greater or equal to min degree");
        }
        var framesDegree = [config.start_degree];
        var loopSize = Math.abs(config.max_degree - config.min_degree) +
            Math.abs(config.start_degree - config.max_degree) +
            Math.abs(config.max_degree - config.start_degree);
        var deltaSize = loopSize / config.frame_count;
        var currentDegree = config.start_degree;
        // From start to max
        while (currentDegree < config.max_degree) {
            currentDegree += deltaSize;
            framesDegree.push(currentDegree);
        }
        // From max to min
        currentDegree = 2 * config.max_degree - currentDegree;
        framesDegree.push(currentDegree);
        while (currentDegree > config.min_degree) {
            currentDegree -= deltaSize;
            framesDegree.push(currentDegree);
        }
        // From min to start
        currentDegree = 2 * config.min_degree + currentDegree;
        framesDegree.push(currentDegree);
        while (currentDegree < config.start_degree) {
            currentDegree += deltaSize;
            framesDegree.push(currentDegree);
        }
        var frames = config.clockwise ? framesDegree : framesDegree.reverse();
        return new RotationAnimator({
            axis: config.start_degree,
            degreeFrames: frames,
        });
    };
    return RotationAnimator;
}(StateComponent));
export { RotationAnimator };
//# sourceMappingURL=Animator.js.map