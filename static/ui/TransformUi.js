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
        var anglex = document.getElementById(this.options.idRotationValueX);
        var angley = document.getElementById(this.options.idRotationValueY);
        var anglez = document.getElementById(this.options.idRotationValueZ);
        var scaleX = document.getElementById(this.options.idScaleX);
        var scaleY = document.getElementById(this.options.idScaleY);
        var scaleZ = document.getElementById(this.options.idScaleZ);
        transformIndex.oninput = function () {
            var value = parseInt(transformIndex.value);
            !Number.isNaN(value) && (_this.currentTransformIndex = value);
            _this.update();
        };
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
    idTransformIndex: "transform-index",
    idTranslationX: "translation-x",
    idTranslationY: "translation-y",
    idTranslationZ: "translation-z",
    idRotationValueX: "rotation-x",
    idRotationValueY: "rotation-y",
    idRotationValueZ: "rotation-z",
    idScaleX: "scale-x",
    idScaleY: "scale-y",
    idScaleZ: "scale-z",
};
function changeInnerText(id, amount) {
    var element = document.getElementById(id);
    element.innerText = amount;
}
//# sourceMappingURL=TransformUi.js.map