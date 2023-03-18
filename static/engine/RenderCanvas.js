var RenderCanvas = /** @class */ (function () {
    function RenderCanvas(canvasId, box) {
        if (box === void 0) { box = {
            maxZ: 1,
        }; }
        this.fillContext(canvasId, box);
    }
    RenderCanvas.prototype.fillContext = function (canvasId, _a) {
        var maxX = _a.maxX, maxY = _a.maxY, maxZ = _a.maxZ;
        var canvas = document.querySelector("#".concat(canvasId));
        this.webglContext = canvas.getContext("webgl");
        if (!this.webglContext) {
            throw new Error("browser doesn't support webgl");
        }
        this.webglContext.viewport(0.0, 0.0, canvas.width, canvas.height);
        this.maxX = maxX !== null && maxX !== void 0 ? maxX : canvas.width;
        this.maxY = maxY !== null && maxY !== void 0 ? maxY : canvas.height;
        this.maxZ = maxZ;
        this.setViewPort();
    };
    RenderCanvas.prototype.setViewPort = function () {
        this.webglContext.viewport(0.0, 0.0, this.boxX, this.boxY);
    };
    RenderCanvas.prototype.getContext = function () {
        return this.webglContext;
    };
    RenderCanvas.prototype.bindResolution = function (resolutionId) {
        this.webglContext.uniform3f(resolutionId, this.boxX, this.boxY, this.boxZ);
    };
    Object.defineProperty(RenderCanvas.prototype, "boxX", {
        get: function () {
            return this.maxX;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(RenderCanvas.prototype, "boxY", {
        get: function () {
            return this.maxY;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(RenderCanvas.prototype, "boxZ", {
        get: function () {
            return this.maxZ;
        },
        enumerable: false,
        configurable: true
    });
    return RenderCanvas;
}());
export { RenderCanvas };
//# sourceMappingURL=RenderCanvas.js.map