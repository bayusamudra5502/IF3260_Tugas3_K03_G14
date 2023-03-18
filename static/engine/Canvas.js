var Canvas = /** @class */ (function () {
    function Canvas(canvasId, box) {
        if (box === void 0) { box = {
            maxX: 1,
            maxY: 1,
            maxZ: 1,
        }; }
        this.fillContext(canvasId, box);
    }
    Canvas.prototype.fillContext = function (canvasId, _a) {
        var maxX = _a.maxX, maxY = _a.maxY, maxZ = _a.maxZ;
        var canvas = document.querySelector("#".concat(canvasId));
        this.webglContext = canvas.getContext("webgl");
        this.canvas = canvas;
        if (!this.webglContext) {
            throw new Error("browser doesn't support webgl");
        }
        this.webglContext.viewport(0.0, 0.0, canvas.width, canvas.height);
        this.maxX = maxX !== null && maxX !== void 0 ? maxX : canvas.width;
        this.maxY = maxY !== null && maxY !== void 0 ? maxY : canvas.height;
        this.maxZ = maxZ;
        this.setViewPort();
    };
    Canvas.prototype.setViewPort = function () {
        this.webglContext.viewport(0.0, 0.0, this.canvas.width, this.canvas.height);
    };
    Canvas.prototype.getContext = function () {
        return this.webglContext;
    };
    Canvas.prototype.bindResolution = function (resolutionId) {
        this.webglContext.uniform3f(resolutionId, this.boxX, this.boxY, this.boxZ);
    };
    Object.defineProperty(Canvas.prototype, "boxX", {
        get: function () {
            return this.maxX;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Canvas.prototype, "boxY", {
        get: function () {
            return this.maxY;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Canvas.prototype, "boxZ", {
        get: function () {
            return this.maxZ;
        },
        enumerable: false,
        configurable: true
    });
    return Canvas;
}());
export { Canvas };
//# sourceMappingURL=Canvas.js.map