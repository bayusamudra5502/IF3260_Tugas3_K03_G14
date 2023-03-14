var EngineBuffer = /** @class */ (function () {
    function EngineBuffer(canvas) {
        this.bufferData = {};
        this.webglContext = canvas.getContext();
    }
    EngineBuffer.prototype.get = function (key) {
        if (this.bufferData[key]) {
            return this.bufferData[key];
        }
        this.bufferData[key] = this.webglContext.createBuffer();
        return this.bufferData[key];
    };
    EngineBuffer.prototype.fillFloat = function (key, data) {
        var buffer = this.get(key);
        this.webglContext.bindBuffer(this.webglContext.ARRAY_BUFFER, buffer);
        this.webglContext.bufferData(this.webglContext.ARRAY_BUFFER, data, this.webglContext.STATIC_DRAW);
    };
    EngineBuffer.prototype.fillUint = function (key, data) {
        var buffer = this.get(key);
        this.webglContext.bindBuffer(this.webglContext.ELEMENT_ARRAY_BUFFER, buffer);
        this.webglContext.bufferData(this.webglContext.ELEMENT_ARRAY_BUFFER, data, this.webglContext.STATIC_DRAW);
    };
    return EngineBuffer;
}());
export { EngineBuffer };
//# sourceMappingURL=EngineBuffer.js.map