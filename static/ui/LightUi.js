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
import { Color } from "../object/Color.js";
import { Vertex } from "../object/Vertices.js";
import { Listenable } from "../util/Listenable.js";
var LightUi = /** @class */ (function (_super) {
    __extends(LightUi, _super);
    function LightUi(options) {
        if (options === void 0) { options = DEFAULT_LIGHTUI_OPTIONS; }
        var _this = _super.call(this) || this;
        _this.options = options;
        _this.currentUseShading = options.defaultUseShading;
        _this.currentLightPosition = Vertex.load(options.defaultPosition.getArray());
        _this.currentLightColor = Color.load(options.defaultColor.getArray());
        _this.bind();
        _this.update();
        return _this;
    }
    Object.defineProperty(LightUi.prototype, "useShading", {
        get: function () {
            return this.currentUseShading;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(LightUi.prototype, "lightPosition", {
        get: function () {
            return this.currentLightPosition;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(LightUi.prototype, "lightColor", {
        get: function () {
            return this.currentLightColor;
        },
        enumerable: false,
        configurable: true
    });
    LightUi.prototype.update = function () {
        this.setValue();
        this.setLocationState();
    };
    LightUi.prototype.setValue = function () {
        var lightX = document.getElementById(this.options.idLightX);
        var lightY = document.getElementById(this.options.idLightY);
        var lightZ = document.getElementById(this.options.idLightZ);
        var lightColor = document.getElementById(this.options.idLightColor);
        lightX.value = "".concat(this.currentLightPosition.x);
        lightY.value = "".concat(this.currentLightPosition.y);
        lightZ.value = "".concat(this.currentLightPosition.z);
        lightColor.value = this.currentLightColor.getHex();
    };
    LightUi.prototype.setLocationState = function () {
        var lightX = document.getElementById(this.options.idLightX);
        var lightY = document.getElementById(this.options.idLightY);
        var lightZ = document.getElementById(this.options.idLightZ);
        var lightColor = document.getElementById(this.options.idLightColor);
        lightX.disabled = !this.currentUseShading;
        lightY.disabled = !this.currentUseShading;
        lightZ.disabled = !this.currentUseShading;
        lightColor.disabled = !this.currentUseShading;
    };
    LightUi.prototype.bind = function () {
        var _this = this;
        var checkbox = document.getElementById(this.options.idUseShadingCheckbox);
        var lightX = document.getElementById(this.options.idLightX);
        var lightY = document.getElementById(this.options.idLightY);
        var lightZ = document.getElementById(this.options.idLightZ);
        var lightColor = document.getElementById(this.options.idLightColor);
        checkbox.onchange = function () {
            _this.currentUseShading = checkbox.checked;
            _this.update();
            _this.notify();
        };
        lightX.onchange = function () {
            var value = parseFloat(lightX.value);
            !Number.isNaN(value) && (_this.currentLightPosition.x = value);
            _this.notify();
        };
        lightY.onchange = function () {
            var value = parseFloat(lightY.value);
            !Number.isNaN(value) && (_this.currentLightPosition.y = value);
            _this.notify();
        };
        lightZ.onchange = function () {
            var value = parseFloat(lightZ.value);
            !Number.isNaN(value) && (_this.currentLightPosition.z = value);
            _this.notify();
        };
        lightColor.onchange = function () {
            var value = lightColor.value;
            _this.currentLightColor = Color.hex(value);
            _this.notify();
        };
    };
    return LightUi;
}(Listenable));
export { LightUi };
export var DEFAULT_LIGHTUI_OPTIONS = {
    idUseShadingCheckbox: "use-shading-check",
    idLightX: "light-x",
    idLightY: "light-y",
    idLightZ: "light-z",
    idLightColor: "light-color",
    defaultUseShading: true,
    defaultPosition: new Vertex(0, 0, 1),
    defaultColor: Color.hex("#FFFFFF"),
};
//# sourceMappingURL=LightUi.js.map