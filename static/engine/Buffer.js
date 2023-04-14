var Buffer = /** @class */ (function () {
    function Buffer(canvas) {
        this.bufferData = {};
        this.webglContext = canvas.getContext();
    }
    Buffer.prototype.get = function (key) {
        if (this.bufferData[key]) {
            return this.bufferData[key];
        }
        this.bufferData[key] = this.webglContext.createBuffer();
        return this.bufferData[key];
    };
    Buffer.prototype.fillFloat = function (key, data) {
        var buffer = this.get(key);
        this.webglContext.bindBuffer(this.webglContext.ARRAY_BUFFER, buffer);
        this.webglContext.bufferData(this.webglContext.ARRAY_BUFFER, data, this.webglContext.STATIC_DRAW);
    };
    Buffer.prototype.fillUint = function (key, data) {
        var buffer = this.get(key);
        this.webglContext.bindBuffer(this.webglContext.ELEMENT_ARRAY_BUFFER, buffer);
        this.webglContext.bufferData(this.webglContext.ELEMENT_ARRAY_BUFFER, data, this.webglContext.STATIC_DRAW);
    };
    return Buffer;
}());
export { Buffer };
//# sourceMappingURL=Buffer.js.map