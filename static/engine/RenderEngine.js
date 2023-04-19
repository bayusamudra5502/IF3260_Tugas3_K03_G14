import { Color } from "../object/Color.js";
import { drawableToPrimitive } from "../util/util.js";
import { isPowerOf2 } from "../util/util.js";
var RenderEngine = /** @class */ (function () {
    function RenderEngine(renderCanvas, buffer, shader, backColor) {
        if (backColor === void 0) { backColor = new Color(0, 0, 0, 0); }
        this.renderCanvas = renderCanvas;
        this.buffer = buffer;
        this.backColor = backColor;
        this.initialExtensions = [];
        this.webglContext = renderCanvas.getContext();
        this.shaderLocation = shader.load();
        this.texture = this.loadTexture(); // TODO: move this (?)
        renderCanvas.bindResolution(this.shaderLocation.options.resolution);
        this.typeMap = {
            line: this.webglContext.LINES,
            "line-loop": this.webglContext.LINE_LOOP,
            point: this.webglContext.POINTS,
            triangle: this.webglContext.TRIANGLES,
            "triangle-strip": this.webglContext.TRIANGLE_STRIP,
            "triangle-fan": this.webglContext.TRIANGLE_FAN,
        };
    }
    RenderEngine.prototype.addInitialExtension = function () {
        var extensions = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            extensions[_i] = arguments[_i];
        }
        this.initialExtensions = this.initialExtensions.concat(extensions);
        return this;
    };
    RenderEngine.prototype.clear = function () {
        this.webglContext.clearColor(this.backColor.r, this.backColor.g, this.backColor.b, this.backColor.a);
        this.renderCanvas.setViewPort();
        /* Run all global extensions */
        for (var _i = 0, _a = this.initialExtensions; _i < _a.length; _i++) {
            var extension = _a[_i];
            extension.run(this.webglContext, this.buffer);
        }
    };
    // TODO: refactor this, move it somewhere else
    RenderEngine.prototype.loadTexture = function (path) {
        if (path === void 0) { path = "/assets/logo.png"; }
        var gl = this.webglContext;
        var texture = gl.createTexture();
        gl.bindTexture(gl.TEXTURE_2D, texture);
        var level = 0;
        var internalFormat = gl.RGBA;
        var width = 1;
        var height = 1;
        var border = 0;
        var srcFormat = gl.RGBA;
        var srcType = gl.UNSIGNED_BYTE;
        var pixel = new Uint8Array([0, 255, 255, 255]); // opaque blue
        gl.texImage2D(gl.TEXTURE_2D, level, internalFormat, width, height, border, srcFormat, srcType, pixel);
        var image = new Image();
        image.onload = function () {
            console.log("loaded image");
            gl.bindTexture(gl.TEXTURE_2D, texture);
            gl.texImage2D(gl.TEXTURE_2D, level, internalFormat, srcFormat, srcType, image);
            // WebGL1 has different requirements for power of 2 images
            // vs. non power of 2 images so check if the image is a
            // power of 2 in both dimensions.
            if (isPowerOf2(image.width) && isPowerOf2(image.height)) {
                // Yes, it's a power of 2. Generate mips.
                gl.generateMipmap(gl.TEXTURE_2D);
                // gl.NEAREST is also allowed, instead of gl.LINEAR, as neither mipmap.
                gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR_MIPMAP_LINEAR);
                // Prevents s-coordinate wrapping (repeating).
                gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.REPEAT);
                // Prevents t-coordinate wrapping (repeating).
                gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.REPEAT);
            }
            else {
                // No, it's not a power of 2. Turn off mips and set
                // wrapping to clamp to edge
                gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.REPEAT);
                gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.REPEAT);
                gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR);
            }
        };
        image.src = path;
        return texture;
    };
    RenderEngine.prototype.bind = function (pointer, buffer, size, type) {
        if (type === void 0) { type = this.webglContext.FLOAT; }
        this.webglContext.bindBuffer(this.webglContext.ARRAY_BUFFER, buffer);
        this.webglContext.vertexAttribPointer(pointer, size, type, false, 0, 0);
        this.webglContext.enableVertexAttribArray(pointer);
    };
    RenderEngine.prototype.prepareBuffer = function (object) {
        var primitive = drawableToPrimitive(object);
        // Buffer data
        this.buffer.fillFloat("vertices", primitive.vertices);
        this.buffer.fillFloat("colors", primitive.color);
        this.buffer.fillUint("indices", primitive.indices);
        // Data binding
        this.bind(this.shaderLocation.vertices, this.buffer.get("vertices"), 4);
        this.bind(this.shaderLocation.color, this.buffer.get("colors"), 4);
        // Transformation Matrix
        this.webglContext.uniformMatrix4fv(this.shaderLocation.matrix.transform, false, primitive.matrix.transform);
        this.webglContext.uniformMatrix4fv(this.shaderLocation.matrix.view, false, primitive.matrix.view);
        this.webglContext.uniformMatrix4fv(this.shaderLocation.matrix.projection, false, primitive.matrix.projection);
        return primitive;
    };
    RenderEngine.prototype.render = function (object) {
        /* Run all local extension */
        for (var _i = 0, _a = object.extensions; _i < _a.length; _i++) {
            var renderExtension = _a[_i];
            renderExtension.run(this.webglContext, this.buffer);
        }
        /* Bind all object to buffer */
        var primitive = this.prepareBuffer(object);
        this.webglContext.bindBuffer(this.webglContext.ELEMENT_ARRAY_BUFFER, this.buffer.get("indices"));
        var type = this.typeMap[object.mode];
        if (type === undefined) {
            throw new Error("unknown draw mode");
        }
        this.webglContext.drawElements(type, primitive.size, this.webglContext.UNSIGNED_SHORT, 0);
        var err = this.webglContext.getError();
        if (err != 0) {
            throw new Error("something happened when rendering: error code ".concat(err));
        }
    };
    return RenderEngine;
}());
export default RenderEngine;
//# sourceMappingURL=RenderEngine.js.map