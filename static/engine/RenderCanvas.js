var RenderCanvas = /** @class */ (function () {
    function RenderCanvas(canvasId) {
        this.fillContext(canvasId);
    }
    RenderCanvas.prototype.fillContext = function (canvasId) {
        var canvas = document.querySelector("#".concat(canvasId));
        this.webglContext = canvas.getContext("webgl");
        if (!this.webglContext) {
            throw new Error("browser doesn't support webgl");
        }
        this.webglContext.viewport(0.0, 0.0, canvas.width, canvas.height);
        this.canvasWidth = canvas.width;
        this.canvasHeight = canvas.height;
        this.setViewPort();
    };
    RenderCanvas.prototype.setViewPort = function () {
        this.webglContext.viewport(0.0, 0.0, this.width, this.height);
    };
    RenderCanvas.prototype.getContext = function () {
        return this.webglContext;
    };
    RenderCanvas.prototype.bindResolution = function (resolutionId) {
        this.webglContext.uniform3f(resolutionId, this.width, this.height, 1);
    };
    Object.defineProperty(RenderCanvas.prototype, "width", {
        get: function () {
            return this.canvasWidth;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(RenderCanvas.prototype, "height", {
        get: function () {
            return this.canvasHeight;
        },
        enumerable: false,
        configurable: true
    });
    return RenderCanvas;
}());
export { RenderCanvas };
//# sourceMappingURL=RenderCanvas.js.map