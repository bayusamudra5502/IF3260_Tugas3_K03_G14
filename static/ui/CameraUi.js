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
import { Listenable } from "../util/Listenable.js";
var CameraUi = /** @class */ (function (_super) {
    __extends(CameraUi, _super);
    function CameraUi(config) {
        if (config === void 0) { config = DEFAULT_CAMERAUI_OPTIONS; }
        var _this = _super.call(this) || this;
        _this.bind(config);
        return _this;
    }
    Object.defineProperty(CameraUi.prototype, "radius", {
        get: function () {
            return this.radiusValue;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(CameraUi.prototype, "xAngle", {
        get: function () {
            return this.xAngleValue;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(CameraUi.prototype, "yAngle", {
        get: function () {
            return this.yAngleValue;
        },
        enumerable: false,
        configurable: true
    });
    CameraUi.prototype.bind = function (cameraOption) {
        var _this = this;
        var radius = document.getElementById(cameraOption.idCameraRadius);
        var xAngle = document.getElementById(cameraOption.idCameraXAngle);
        var yAngle = document.getElementById(cameraOption.idCameraYAngle);
        var radiusValue = document.getElementById(cameraOption.idCameraRadiusValue);
        var xAngleValue = document.getElementById(cameraOption.idCameraXAngleValue);
        var yAngleValue = document.getElementById(cameraOption.idCameraYAngleValue);
        radius.oninput = function () {
            radiusValue.innerText = radius.value;
            _this.radiusValue = parseFloat(radius.value);
            _this.notify();
        };
        xAngle.oninput = function () {
            xAngleValue.innerText = xAngle.value;
            _this.xAngleValue = parseFloat(xAngle.value);
            _this.notify();
        };
        yAngle.oninput = function () {
            yAngleValue.innerText = yAngle.value;
            _this.yAngleValue = parseFloat(yAngle.value);
            _this.notify();
        };
    };
    return CameraUi;
}(Listenable));
export { CameraUi };
export var DEFAULT_CAMERAUI_OPTIONS = {
    idCameraRadius: "camera-radius",
    idCameraXAngle: "camera-xangle",
    idCameraYAngle: "camera-yangle",
    idCameraRadiusValue: "camera-radius-value",
    idCameraXAngleValue: "camera-xangle-value",
    idCameraYAngleValue: "camera-yangle-value",
};
//# sourceMappingURL=CameraUi.js.map