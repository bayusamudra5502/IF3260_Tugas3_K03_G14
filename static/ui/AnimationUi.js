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
var AnimationUi = /** @class */ (function (_super) {
    __extends(AnimationUi, _super);
    function AnimationUi(option) {
        if (option === void 0) { option = ANIMATION_UI_OPTION_DEFAULT; }
        var _this = _super.call(this) || this;
        _this.bind(option);
        return _this;
    }
    AnimationUi.prototype.bind = function (option) {
        var _this = this;
        this.checkRun = document.getElementById(option.checkRunAnimationUi);
        this.checkInverted = document.getElementById(option.checkInvertedAnimationUi);
        this.nextButton = document.getElementById(option.buttonNext);
        this.prevButton = document.getElementById(option.buttonPrev);
        this.fpsInput = document.getElementById(option.fpsInput);
        this.fpsTextValue = document.getElementById(option.fpsTextValue);
        this.fpsInput.oninput = function () {
            _this.fpsTextValue.innerText = "".concat(_this.fpsInput.value);
            _this.notify("fps-rate");
        };
        this.checkRun.oninput = function () {
            _this.notify("run-animation");
        };
        this.checkInverted.oninput = function () { return _this.notify("inverted"); };
        this.nextButton.onclick = function () {
            _this.notify("next-frame");
        };
        this.prevButton.onclick = function () {
            _this.notify("prev-frame");
        };
    };
    Object.defineProperty(AnimationUi.prototype, "inverted", {
        get: function () {
            return this.checkInverted.checked;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(AnimationUi.prototype, "started", {
        get: function () {
            return this.checkRun.checked;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(AnimationUi.prototype, "fps", {
        get: function () {
            return parseInt(this.fpsInput.value);
        },
        enumerable: false,
        configurable: true
    });
    return AnimationUi;
}(Listenable));
export { AnimationUi };
export var ANIMATION_UI_OPTION_DEFAULT = {
    checkRunAnimationUi: "check-run-animation",
    checkInvertedAnimationUi: "check-inverted-animation",
    buttonPrev: "animation-prev",
    buttonNext: "animation-next",
    fpsInput: "frame-fps",
    fpsTextValue: "frame-fps-value",
};
//# sourceMappingURL=AnimationUi.js.map