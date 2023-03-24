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
import { ViewTransform } from "../matrix/ViewTransform.js";
import { Color } from "../object/Color.js";
import { Vertex } from "../object/Vertices.js";
import { Listenable } from "../util/Listenable.js";
import { ProjectionManager } from "./ProjectionManager.js";
var EnvironmentManager = /** @class */ (function (_super) {
    __extends(EnvironmentManager, _super);
    function EnvironmentManager() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.sourceLightData = new Vertex(0, 0, 1);
        _this.projectionData = new ProjectionManager();
        _this.viewTransform = new ViewTransform();
        _this.useShadingData = true;
        _this.sourceLightColor = Color.hex("#FFFFFF");
        return _this;
    }
    EnvironmentManager.prototype.configureCamera = function (camera) {
        var _this = this;
        this.viewTransform.update(camera.matrix);
        camera.subscribe(function () {
            _this.viewTransform.update(camera.matrix);
        });
    };
    EnvironmentManager.prototype.update = function (options) {
        options.projection && (this.projectionData = options.projection);
        options.cameraTransform && this.configureCamera(options.cameraTransform);
        options.sourceLight && (this.sourceLightData = options.sourceLight);
        options.useShading != undefined &&
            (this.useShadingData = options.useShading);
        options.sourceLightColor &&
            (this.sourceLightColor = options.sourceLightColor);
        this.notify();
    };
    Object.defineProperty(EnvironmentManager.prototype, "lightColor", {
        get: function () {
            return this.sourceLightColor;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(EnvironmentManager.prototype, "lightPosition", {
        get: function () {
            return this.sourceLightData;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(EnvironmentManager.prototype, "viewMatrix", {
        get: function () {
            return this.viewTransform.matrix;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(EnvironmentManager.prototype, "projectionMatrix", {
        get: function () {
            return this.projectionData.matrix;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(EnvironmentManager.prototype, "useShading", {
        get: function () {
            return this.useShadingData;
        },
        enumerable: false,
        configurable: true
    });
    return EnvironmentManager;
}(Listenable));
export { EnvironmentManager };
//# sourceMappingURL=EnvironmentManager.js.map