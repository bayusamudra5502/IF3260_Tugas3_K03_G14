var RenderExtension = /** @class */ (function () {
    function RenderExtension(program, options) {
        this.program = program;
    }
    RenderExtension.prototype.bind = function (webglContext, pointer, buffer, size, type) {
        if (type === void 0) { type = webglContext.FLOAT; }
        webglContext.bindBuffer(webglContext.ARRAY_BUFFER, buffer);
        webglContext.vertexAttribPointer(pointer, size, type, false, 0, 0);
        webglContext.enableVertexAttribArray(pointer);
    };
    return RenderExtension;
}());
export { RenderExtension };
//# sourceMappingURL=RenderExtension.js.map