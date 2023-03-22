export var SHADER_ATTR_DEFAULT = {
    color: "color",
    matrix: {
        transform: "Mmatrix",
        camera: "Vmatrix",
        projection: "Pmatrix",
    },
    position: "position",
    resolution: "resolution",
    normal: "normal",
    lightSource: "lightSource",
};
var ShaderProgram = /** @class */ (function () {
    function ShaderProgram(vertexShaderId, fragmentShaderId, canvas, shaderAttribute) {
        if (shaderAttribute === void 0) { shaderAttribute = SHADER_ATTR_DEFAULT; }
        this.vertexShaderId = vertexShaderId;
        this.fragmentShaderId = fragmentShaderId;
        this.shaderAttribute = shaderAttribute;
        this.isLoaded = false;
        this.gl = canvas.getContext();
    }
    ShaderProgram.prototype.loadCode = function () {
        var vertexElmn = document.querySelector("#".concat(this.vertexShaderId));
        var fragmentElmn = document.querySelector("#".concat(this.fragmentShaderId));
        if (!vertexElmn) {
            throw new Error("vertex shader element is not found");
        }
        if (!fragmentElmn) {
            throw new Error("fragment shader element is not found");
        }
        this.vertexCode = vertexElmn.textContent;
        this.fragmentCode = fragmentElmn.textContent;
        this.isLoaded = true;
        return this;
    };
    ShaderProgram.prototype.compileCode = function (type, code) {
        var shader = this.gl.createShader(type);
        this.gl.shaderSource(shader, code);
        this.gl.compileShader(shader);
        return shader;
    };
    /* Compile all vertex */
    ShaderProgram.prototype.compile = function () {
        if (!this.isLoaded) {
            this.loadCode();
        }
        var vertexShader = this.compileCode(this.gl.VERTEX_SHADER, this.vertexCode);
        var fragmentShader = this.compileCode(this.gl.FRAGMENT_SHADER, this.fragmentCode);
        var program = this.gl.createProgram();
        this.gl.attachShader(program, vertexShader);
        this.gl.attachShader(program, fragmentShader);
        this.gl.linkProgram(program);
        this.program = program;
        return this;
    };
    ShaderProgram.prototype.load = function () {
        this.gl.useProgram(this.program);
        var transformMatrix = this.gl.getUniformLocation(this.program, this.shaderAttribute.matrix.transform);
        var cameraMatrix = this.gl.getUniformLocation(this.program, this.shaderAttribute.matrix.camera);
        var projectionMatrix = this.gl.getUniformLocation(this.program, this.shaderAttribute.matrix.projection);
        var position = this.gl.getAttribLocation(this.program, this.shaderAttribute.position);
        var color = this.gl.getAttribLocation(this.program, this.shaderAttribute.color);
        var resolution = this.gl.getUniformLocation(this.program, this.shaderAttribute.resolution);
        var lightSource = this.gl.getUniformLocation(this.program, this.shaderAttribute.lightSource);
        var normal = this.gl.getAttribLocation(this.program, this.shaderAttribute.normal);
        return {
            matrix: {
                transform: transformMatrix,
                view: cameraMatrix,
                projection: projectionMatrix,
            },
            options: {
                resolution: resolution,
            },
            vertices: position,
            color: color,
            normal: normal,
            lightSource: lightSource,
        };
    };
    return ShaderProgram;
}());
export { ShaderProgram };
//# sourceMappingURL=Shader.js.map