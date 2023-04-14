export var SHADER_ATTR_DEFAULT = {
    color: "color",
    matrix: {
        transform: "Mmatrix",
        camera: "Vmatrix",
        projection: "Pmatrix",
    },
    position: "position",
    resolution: "resolution",
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
    ShaderProgram.prototype.getAttributeLocation = function (variableName) {
        return this.gl.getAttribLocation(this.webglProgram, variableName);
    };
    ShaderProgram.prototype.getUniformLocation = function (variableName) {
        return this.gl.getUniformLocation(this.webglProgram, variableName);
    };
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
        this.webglProgram = program;
        return this;
    };
    ShaderProgram.prototype.load = function () {
        this.gl.useProgram(this.webglProgram);
        var transformMatrix = this.getUniformLocation(this.shaderAttribute.matrix.transform);
        var cameraMatrix = this.getUniformLocation(this.shaderAttribute.matrix.camera);
        var projectionMatrix = this.getUniformLocation(this.shaderAttribute.matrix.projection);
        var position = this.getAttributeLocation(this.shaderAttribute.position);
        var color = this.getAttributeLocation(this.shaderAttribute.color);
        var resolution = this.getUniformLocation(this.shaderAttribute.resolution);
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
        };
    };
    return ShaderProgram;
}());
export { ShaderProgram };
//# sourceMappingURL=Shader.js.map