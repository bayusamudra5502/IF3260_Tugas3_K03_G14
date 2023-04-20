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
    function TransformUi(options) {
        if (options === void 0) { options = TRANSFORM_UI_DEFAULT_OPTIONS; }
        var _this = _super.call(this) || this;
        _this.options = options;
        _this.currentTransformIndex = 0;
        _this.currentTranslation = new Translation();
        _this.currentRotation = new Rotation();
        _this.currentScale = new Scaling();
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
        set: function (trans) {
            this.currentTranslation = trans;
            this.setValue();
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(TransformUi.prototype, "rotation", {
        get: function () {
            return this.currentRotation;
        },
        set: function (rot) {
            this.currentRotation = rot;
            this.setValue();
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(TransformUi.prototype, "scale", {
        get: function () {
            return this.currentScale;
        },
        set: function (size) {
            this.currentScale = size;
            this.setValue();
        },
        enumerable: false,
        configurable: true
    });
    TransformUi.prototype.reset = function () {
        this.currentTranslation = new Translation();
        this.currentScale = new Scaling();
        this.currentRotation = new Rotation();
        this.setValue();
    };
    TransformUi.prototype.update = function () {
        this.setValue();
        this.notify();
    };
    TransformUi.prototype.setValue = function () {
        var translationX = document.getElementById(this.options.idTranslationX);
        var translationY = document.getElementById(this.options.idTranslationY);
        var translationZ = document.getElementById(this.options.idTranslationZ);
        var anglex = document.getElementById(this.options.idRotationValueX);
        var angley = document.getElementById(this.options.idRotationValueY);
        var anglez = document.getElementById(this.options.idRotationValueZ);
        var scaleX = document.getElementById(this.options.idScaleX);
        var scaleY = document.getElementById(this.options.idScaleY);
        var scaleZ = document.getElementById(this.options.idScaleZ);
        var translationXValue = document.getElementById(this.options.idTranslationXValue);
        var translationYValue = document.getElementById(this.options.idTranslationYValue);
        var translationZValue = document.getElementById(this.options.idTranslationZValue);
        var anglexVal = document.getElementById(this.options.idRotationValueXValue);
        var angleyVal = document.getElementById(this.options.idRotationValueYValue);
        var anglezVal = document.getElementById(this.options.idRotationValueZValue);
        var scaleXVal = document.getElementById(this.options.idScaleXValue);
        var scaleYVal = document.getElementById(this.options.idScaleYValue);
        var scaleZVal = document.getElementById(this.options.idScaleZValue);
        translationX.value = "".concat(this.currentTranslation.X);
        translationY.value = "".concat(this.currentTranslation.Y);
        translationZ.value = "".concat(this.currentTranslation.Z);
        anglex.value = "".concat(this.currentRotation.rotationAngleX);
        angley.value = "".concat(this.currentRotation.rotationAngleY);
        anglez.value = "".concat(this.currentRotation.rotationAngleZ);
        scaleX.value = "".concat(this.currentScale.Sx);
        scaleY.value = "".concat(this.currentScale.Sy);
        scaleZ.value = "".concat(this.currentScale.Sz);
        translationXValue.innerText = "".concat(this.currentTranslation.X);
        translationYValue.innerText = "".concat(this.currentTranslation.Y);
        translationZValue.innerText = "".concat(this.currentTranslation.Z);
        anglexVal.innerText = "".concat(this.currentRotation.rotationAngleX);
        angleyVal.innerText = "".concat(this.currentRotation.rotationAngleY);
        anglezVal.innerText = "".concat(this.currentRotation.rotationAngleZ);
        scaleXVal.innerText = "".concat(this.currentScale.Sx);
        scaleYVal.innerText = "".concat(this.currentScale.Sy);
        scaleZVal.innerText = "".concat(this.currentScale.Sz);
    };
    TransformUi.prototype.bind = function () {
        var _this = this;
        var translationX = document.getElementById(this.options.idTranslationX);
        var translationY = document.getElementById(this.options.idTranslationY);
        var translationZ = document.getElementById(this.options.idTranslationZ);
        var anglex = document.getElementById(this.options.idRotationValueX);
        var angley = document.getElementById(this.options.idRotationValueY);
        var anglez = document.getElementById(this.options.idRotationValueZ);
        var scaleX = document.getElementById(this.options.idScaleX);
        var scaleY = document.getElementById(this.options.idScaleY);
        var scaleZ = document.getElementById(this.options.idScaleZ);
        translationX.oninput = function () {
            var value = parseFloat(translationX.value);
            !Number.isNaN(value) &&
                _this.currentTranslation.configure({
                    x: value,
                });
            _this.update();
            changeInnerText("".concat(_this.options.idTranslationX, "-value"), value.toString());
        };
        translationY.oninput = function () {
            var value = parseFloat(translationY.value);
            !Number.isNaN(value) &&
                _this.currentTranslation.configure({
                    y: value,
                });
            _this.update();
            changeInnerText("".concat(_this.options.idTranslationY, "-value"), value.toString());
        };
        translationZ.oninput = function () {
            var value = parseFloat(translationZ.value);
            !Number.isNaN(value) &&
                _this.currentTranslation.configure({
                    z: value,
                });
            _this.update();
            changeInnerText("".concat(_this.options.idTranslationZ, "-value"), value.toString());
        };
        anglex.oninput = function () {
            var value = parseFloat(anglex.value);
            !Number.isNaN(value) &&
                _this.currentRotation.configure({
                    axis: RotationAxis.X,
                    angleX: value,
                });
            _this.update();
            changeInnerText("".concat(_this.options.idRotationValueX, "-value"), value.toString());
        };
        angley.oninput = function () {
            var value = parseFloat(angley.value);
            !Number.isNaN(value) &&
                _this.currentRotation.configure({
                    axis: RotationAxis.Y,
                    angleY: value,
                });
            _this.update();
            changeInnerText("".concat(_this.options.idRotationValueY, "-value"), value.toString());
        };
        anglez.oninput = function () {
            var value = parseFloat(anglez.value);
            !Number.isNaN(value) &&
                _this.currentRotation.configure({
                    axis: RotationAxis.Z,
                    angleZ: value,
                });
            _this.update();
            changeInnerText("".concat(_this.options.idRotationValueZ, "-value"), value.toString());
        };
        scaleX.oninput = function () {
            var value = parseFloat(scaleX.value);
            !Number.isNaN(value) &&
                _this.currentScale.configure({
                    sx: value,
                });
            _this.update();
            changeInnerText("".concat(_this.options.idScaleX, "-value"), value.toString());
        };
        scaleY.oninput = function () {
            var value = parseFloat(scaleY.value);
            !Number.isNaN(value) &&
                _this.currentScale.configure({
                    sy: value,
                });
            _this.update();
            changeInnerText("".concat(_this.options.idScaleY, "-value"), value.toString());
        };
        scaleZ.oninput = function () {
            var value = parseFloat(scaleZ.value);
            !Number.isNaN(value) &&
                _this.currentScale.configure({
                    sz: value,
                });
            _this.update();
            changeInnerText("".concat(_this.options.idScaleZ, "-value"), value.toString());
        };
    };
    return TransformUi;
}(Listenable));
export { TransformUi };
export var TRANSFORM_UI_DEFAULT_OPTIONS = {
    idTranslationX: "translation-x",
    idTranslationY: "translation-y",
    idTranslationZ: "translation-z",
    idRotationValueX: "rotation-x",
    idRotationValueY: "rotation-y",
    idRotationValueZ: "rotation-z",
    idScaleX: "scale-x",
    idScaleY: "scale-y",
    idScaleZ: "scale-z",
    idTranslationXValue: "translation-x-value",
    idTranslationYValue: "translation-y-value",
    idTranslationZValue: "translation-z-value",
    idRotationValueXValue: "rotation-x-value",
    idRotationValueYValue: "rotation-y-value",
    idRotationValueZValue: "rotation-z-value",
    idScaleXValue: "scale-x-value",
    idScaleYValue: "scale-y-value",
    idScaleZValue: "scale-z-value",
};
function changeInnerText(id, amount) {
    var element = document.getElementById(id);
    element.innerText = amount;
}
//# sourceMappingURL=TransformUi.js.map