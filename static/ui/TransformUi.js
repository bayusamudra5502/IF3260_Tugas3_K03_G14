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
import { Rotation, RotationAxis } from "../transform/Rotation.js";
import { Scaling } from "../transform/Scaling.js";
import { Translation } from "../transform/Translation.js";
import { Listenable } from "../util/Listenable.js";
var TransformUi = /** @class */ (function (_super) {
    __extends(TransformUi, _super);
    //   private currentRotationAxis: RotationAxis;
    function TransformUi(options) {
        if (options === void 0) { options = TRANSFORM_UI_DEFAULT_OPTIONS; }
        var _this = _super.call(this) || this;
        _this.options = options;
        _this.currentTransformIndex = 0;
        _this.currentTranslation = new Translation();
        _this.currentRotation = new Rotation();
        _this.currentScale = new Scaling();
        // this.currentRotationAxis = RotationAxis.X;
        _this.bind();
        _this.update();
        return _this;
    }
    Object.defineProperty(TransformUi.prototype, "transformIndex", {
        get: function () {
            return this.currentTransformIndex;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(TransformUi.prototype, "translation", {
        get: function () {
            return this.currentTranslation;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(TransformUi.prototype, "rotation", {
        get: function () {
            return this.currentRotation;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(TransformUi.prototype, "scale", {
        get: function () {
            return this.currentScale;
        },
        enumerable: false,
        configurable: true
    });
    TransformUi.prototype.update = function () {
        this.setValue();
        this.notify();
    };
    TransformUi.prototype.setValue = function () {
        var transformIndex = document.getElementById(this.options.idTransformIndex);
        var translationX = document.getElementById(this.options.idTranslationX);
        var translationY = document.getElementById(this.options.idTranslationY);
        var translationZ = document.getElementById(this.options.idTranslationZ);
        // const rotationType = document.getElementById(
        //   this.options.idRotationType
        // ) as HTMLSelectElement;
        // const rotationValue = document.getElementById(
        //   this.options.idRotationValue
        // ) as HTMLInputElement;
        var anglex = document.getElementById(this.options.idRotationValueX);
        var angley = document.getElementById(this.options.idRotationValueY);
        var anglez = document.getElementById(this.options.idRotationValueZ);
        var scaleX = document.getElementById(this.options.idScaleX);
        var scaleY = document.getElementById(this.options.idScaleY);
        var scaleZ = document.getElementById(this.options.idScaleZ);
        transformIndex.value = "".concat(this.currentTransformIndex);
        translationX.value = "".concat(this.currentTranslation.X);
        translationY.value = "".concat(this.currentTranslation.Y);
        translationZ.value = "".concat(this.currentTranslation.Z);
        // rotationType.value = `${this.currentRotation.rotationAxis}`;
        // if (this.currentRotation.rotationAxis === RotationAxis.X) {
        //     rotationValue.value = `${this.currentRotation.rotationAngleX}`;
        // } else if (this.currentRotation.rotationAxis === RotationAxis.Y) {
        //     rotationValue.value = `${this.currentRotation.rotationAngleY}`;
        // } else if (this.currentRotation.rotationAxis === RotationAxis.Z) {
        //     rotationValue.value = `${this.currentRotation.rotationAngleZ}`;
        // }
        anglex.value = "".concat(this.currentRotation.rotationAngleX);
        angley.value = "".concat(this.currentRotation.rotationAngleY);
        anglez.value = "".concat(this.currentRotation.rotationAngleZ);
        scaleX.value = "".concat(this.currentScale.Sx);
        scaleY.value = "".concat(this.currentScale.Sy);
        scaleZ.value = "".concat(this.currentScale.Sz);
    };
    TransformUi.prototype.bind = function () {
        var _this = this;
        var transformIndex = document.getElementById(this.options.idTransformIndex);
        var translationX = document.getElementById(this.options.idTranslationX);
        var translationY = document.getElementById(this.options.idTranslationY);
        var translationZ = document.getElementById(this.options.idTranslationZ);
        // const rotationType = document.getElementById(
        //   this.options.idRotationType
        // ) as HTMLSelectElement;
        // const rotationValue = document.getElementById(
        //   this.options.idRotationValue
        // ) as HTMLInputElement;
        var anglex = document.getElementById(this.options.idRotationValueX);
        var angley = document.getElementById(this.options.idRotationValueY);
        var anglez = document.getElementById(this.options.idRotationValueZ);
        var scaleX = document.getElementById(this.options.idScaleX);
        var scaleY = document.getElementById(this.options.idScaleY);
        var scaleZ = document.getElementById(this.options.idScaleZ);
        transformIndex.onchange = function () {
            var value = parseInt(transformIndex.value);
            !Number.isNaN(value) && (_this.currentTransformIndex = value);
            _this.update();
        };
        translationX.onchange = function () {
            var value = parseFloat(translationX.value);
            !Number.isNaN(value) &&
                // this.currentTranslation.X = value
                _this.currentTranslation.configure({
                    x: value,
                });
            _this.update();
        };
        translationY.onchange = function () {
            var value = parseFloat(translationY.value);
            !Number.isNaN(value) &&
                // this.currentTranslation.y = value
                _this.currentTranslation.configure({
                    y: value,
                });
            _this.update();
        };
        translationZ.onchange = function () {
            var value = parseFloat(translationZ.value);
            !Number.isNaN(value) &&
                // this.currentTranslation.z = value
                _this.currentTranslation.configure({
                    z: value,
                });
            _this.update();
        };
        // rotationType.onchange = () => {
        //   const value = rotationType.value as RotationAxis;
        //   this.currentRotation.configure({
        //     axis: value,
        //   });
        //   this.update();
        // };
        // rotationValue.onchange = () => {
        //   const value = parseFloat(rotationValue.value);
        //   !Number.isNaN(value) &&
        //     (this.currentRotation.rotationAxis === RotationAxis.X
        //         ? this.currentRotation.configure({
        //             angleX: value,
        //             })
        //         : this.currentRotation.rotationAxis === RotationAxis.Y
        //         ? this.currentRotation.configure({
        //             angleY: value,
        //             })
        //         : 
        //         this.currentRotation.configure({
        //             angleZ: value,
        //             })
        //     );
        //   this.update();
        // };
        anglex.onchange = function () {
            // this.currentRotationAxis = RotationAxis.X;
            var value = parseFloat(anglex.value);
            !Number.isNaN(value) &&
                _this.currentRotation.configure({
                    axis: RotationAxis.X,
                    angleX: value,
                });
            _this.update();
        };
        angley.onchange = function () {
            // this.currentRotationAxis = RotationAxis.Y;
            var value = parseFloat(angley.value);
            !Number.isNaN(value) &&
                _this.currentRotation.configure({
                    axis: RotationAxis.Y,
                    angleY: value,
                });
            _this.update();
        };
        anglez.onchange = function () {
            // this.currentRotationAxis = RotationAxis.Z;
            var value = parseFloat(anglez.value);
            !Number.isNaN(value) &&
                _this.currentRotation.configure({
                    axis: RotationAxis.Z,
                    angleZ: value,
                });
            _this.update();
        };
        scaleX.onchange = function () {
            var value = parseFloat(scaleX.value);
            !Number.isNaN(value) &&
                _this.currentScale.configure({
                    sx: value,
                });
            _this.update();
        };
        scaleY.onchange = function () {
            var value = parseFloat(scaleY.value);
            !Number.isNaN(value) &&
                _this.currentScale.configure({
                    sy: value,
                });
            _this.update();
        };
        scaleZ.onchange = function () {
            var value = parseFloat(scaleZ.value);
            !Number.isNaN(value) &&
                _this.currentScale.configure({
                    sz: value,
                });
            _this.update();
        };
    };
    return TransformUi;
}(Listenable));
export { TransformUi };
export var TRANSFORM_UI_DEFAULT_OPTIONS = {
    idTransformIndex: "transform-index",
    idTranslationX: "translation-x",
    idTranslationY: "translation-y",
    idTranslationZ: "translation-z",
    //   idRotationType: "rotation-type",
    //   idRotationValue: "rotation-value",
    idRotationValueX: "rotation-x",
    idRotationValueY: "rotation-y",
    idRotationValueZ: "rotation-z",
    idScaleX: "scale-x",
    idScaleY: "scale-y",
    idScaleZ: "scale-z",
};
//# sourceMappingURL=TransformUi.js.map