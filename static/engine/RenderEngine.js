var __values = (this && this.__values) || function(o) {
    var s = typeof Symbol === "function" && Symbol.iterator, m = s && o[s], i = 0;
    if (m) return m.call(o);
    if (o && typeof o.length === "number") return {
        next: function () {
            if (o && i >= o.length) o = void 0;
            return { value: o && o[i++], done: !o };
        }
    };
    throw new TypeError(s ? "Object is not iterable." : "Symbol.iterator is not defined.");
};
import { Color } from "../object/Color.js";
import { drawableToPrimitive, isPowerOf2 } from "../util/util.js";
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
        this.envMap = this.loadEnvMap(); // TODO: move this (?)
        this.bumpMap = this.loadTexture("/assets/bump.jpg");
        this.customMap = this.loadTexture("/assets/yuru.jpg");
        this.applyFaceTexture();
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
        var e_1, _a;
        this.webglContext.clearColor(this.backColor.r, this.backColor.g, this.backColor.b, this.backColor.a);
        this.renderCanvas.setViewPort();
        try {
            /* Run all global extensions */
            for (var _b = __values(this.initialExtensions), _c = _b.next(); !_c.done; _c = _b.next()) {
                var extension = _c.value;
                extension.run(this.webglContext, this.buffer);
            }
        }
        catch (e_1_1) { e_1 = { error: e_1_1 }; }
        finally {
            try {
                if (_c && !_c.done && (_a = _b.return)) _a.call(_b);
            }
            finally { if (e_1) throw e_1.error; }
        }
    };
    RenderEngine.prototype.loadEnvMap = function () {
        var gl = this.webglContext;
        var envMap = gl.createTexture();
        gl.activeTexture(gl.TEXTURE1);
        gl.bindTexture(gl.TEXTURE_CUBE_MAP, envMap);
        return envMap;
    };
    RenderEngine.prototype.applyFaceTexture = function () {
        var gl = this.webglContext;
        var faces = this.loadDefaultFaceTexture(gl);
        var tex = this.envMap;
        faces.forEach(function (face) {
            var target = face.target, url = face.url;
            // Upload the canvas to the cubemap face.
            var level = 0;
            var internalFormat = gl.RGBA;
            var width = 512;
            var height = 512;
            var format = gl.RGBA;
            var type = gl.UNSIGNED_BYTE;
            // setup each face so it's immediately renderable
            gl.texImage2D(target, level, internalFormat, width, height, 0, format, type, null);
            // Asynchronously load an image
            var image = new Image();
            image.src = url;
            image.addEventListener("load", function () {
                gl.bindTexture(gl.TEXTURE_CUBE_MAP, tex);
                gl.texImage2D(target, level, internalFormat, format, type, image);
                gl.generateMipmap(gl.TEXTURE_CUBE_MAP);
            });
        });
        gl.generateMipmap(gl.TEXTURE_CUBE_MAP);
        gl.texParameteri(gl.TEXTURE_CUBE_MAP, gl.TEXTURE_MIN_FILTER, gl.LINEAR_MIPMAP_LINEAR);
    };
    RenderEngine.prototype.loadDefaultFaceTexture = function (gl) {
        return [
            {
                target: gl.TEXTURE_CUBE_MAP_POSITIVE_X,
                url: "/assets/pos-x.jpg",
            },
            {
                target: gl.TEXTURE_CUBE_MAP_NEGATIVE_X,
                url: "/assets/neg-x.jpg",
            },
            {
                target: gl.TEXTURE_CUBE_MAP_POSITIVE_Y,
                url: "/assets/pos-y.jpg",
            },
            {
                target: gl.TEXTURE_CUBE_MAP_NEGATIVE_Y,
                url: "/assets/neg-y.jpg",
            },
            {
                target: gl.TEXTURE_CUBE_MAP_POSITIVE_Z,
                url: "/assets/pos-z.jpg",
            },
            {
                target: gl.TEXTURE_CUBE_MAP_NEGATIVE_Z,
                url: "/assets/neg-z.jpg",
            },
        ];
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
        this.buffer.fillFloat("tangents", primitive.tangents);
        // Data binding
        this.bind(this.shaderLocation.vertices, this.buffer.get("vertices"), 4);
        this.bind(this.shaderLocation.color, this.buffer.get("colors"), 4);
        this.bind(this.shaderLocation.tangents, this.buffer.get("tangents"), 4);
        // Transformation Matrix
        this.webglContext.uniformMatrix4fv(this.shaderLocation.matrix.transform, false, primitive.matrix.transform);
        this.webglContext.uniformMatrix4fv(this.shaderLocation.matrix.view, false, primitive.matrix.view);
        this.webglContext.uniformMatrix4fv(this.shaderLocation.matrix.projection, false, primitive.matrix.projection);
        return primitive;
    };
    RenderEngine.prototype.render = function (object) {
        var e_2, _a;
        try {
            /* Run all local extension */
            for (var _b = __values(object.extensions), _c = _b.next(); !_c.done; _c = _b.next()) {
                var renderExtension = _c.value;
                renderExtension.run(this.webglContext, this.buffer);
            }
        }
        catch (e_2_1) { e_2 = { error: e_2_1 }; }
        finally {
            try {
                if (_c && !_c.done && (_a = _b.return)) _a.call(_b);
            }
            finally { if (e_2) throw e_2.error; }
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