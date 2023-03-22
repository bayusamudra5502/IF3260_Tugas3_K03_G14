import { Color } from "./Color.js.js.js.js.js.js.js.js.js.js.js.js.js.js.js.js.js.js.js.js.js.js.js.js.js.js.js.js.js.js.js.js.js.js.js.js.js.js.js.js.js.js.js.js.js.js.js.js.js.js.js.js.js.js.js.js.js.js.js.js.js.js.js.js.js.js.js.js.js.js.js.js.js.js.js.js.js.js.js.js.js.js.js.js.js.js.js.js.js.js.js.js.js.js.js.js.js.js.js.js.js.js.js.js.js.js.js.js.js.js.js.js.js.js.js.js.js.js.js.js.js.js.js.js.js.js.js.js.js.js.js.js.js.js.js.js.js.js.js.js.js.js.js.js.js.js.js.js.js.js.js.js.js.js.js.js.js.js.js.js.js.js.js.js.js.js.js.js.js.js.js.js.js.js.js.js.js.js.js.js.js.js.js.js.js.js.js.js.js.js.js.js.js.js.js.js.js.js.js.js.js.js.js.js.js.js.js.js.js.js.js.js.js.js.js.js.js.js.js.js.js.js.js.js.js.js.js.js.js.js.js.js.js.js.js.js.js.js";
import { Vector } from "./Vector.js.js.js.js.js.js.js.js.js.js.js.js.js.js.js.js.js.js.js.js.js.js.js.js.js.js.js.js.js.js.js.js.js.js.js.js.js.js.js.js.js.js.js.js.js.js.js.js.js.js.js.js.js.js.js.js.js.js.js.js.js.js.js.js.js.js.js.js.js.js.js.js.js.js.js.js.js.js.js.js.js.js.js.js.js.js.js.js.js.js.js.js.js.js.js.js.js.js.js.js.js.js.js.js.js.js.js.js.js.js.js.js.js.js.js.js.js.js.js.js.js.js.js.js.js.js.js.js.js.js.js.js.js.js.js.js.js.js.js.js.js.js.js.js.js.js.js.js.js.js.js.js.js.js.js.js.js.js.js.js.js.js.js.js.js.js.js.js.js.js.js.js.js.js.js.js.js.js.js.js.js.js.js.js.js.js.js.js.js.js.js.js.js.js.js.js.js.js.js.js.js.js.js.js.js.js.js.js.js.js.js.js.js.js.js.js.js.js.js.js.js.js.js.js.js.js.js.js.js.js.js.js.js.js.js.js.js.js";
import { Vertex } from "./Vertices.js.js.js.js.js.js.js.js.js.js.js.js.js.js.js.js.js.js.js.js.js.js.js.js.js.js.js.js.js.js.js.js.js.js.js.js.js.js.js.js.js.js.js.js.js.js.js.js.js.js.js.js.js.js.js.js.js.js.js.js.js.js.js.js.js.js.js.js.js.js.js.js.js.js.js.js.js.js.js.js.js.js.js.js.js.js.js.js.js.js.js.js.js.js.js.js.js.js.js.js.js.js.js.js.js.js.js.js.js.js.js.js.js.js.js.js.js.js.js.js.js.js.js.js.js.js.js.js.js.js.js.js.js.js.js.js.js.js.js.js.js.js.js.js.js.js.js.js.js.js.js.js.js.js.js.js.js.js.js.js.js.js.js.js.js.js.js.js.js.js.js.js.js.js.js.js.js.js.js.js.js.js.js.js.js.js.js.js.js.js.js.js.js.js.js.js.js.js.js.js.js.js.js.js.js.js.js.js.js.js.js.js.js.js.js.js.js.js.js.js.js.js.js.js.js.js.js.js.js.js.js.js.js.js.js.js.js.js";
var Object3D = /** @class */ (function () {
    function Object3D(options) {
        this.options = options;
    }
    Object3D.load = function (json, matrix) {
        var _a, _b, _c;
        var data = JSON.parse(json);
        var options = {
            colors: [],
            vertices: [],
            normal: [],
            matrix: matrix,
        };
        for (var _i = 0, _d = (_a = data.vertices) !== null && _a !== void 0 ? _a : []; _i < _d.length; _i++) {
            var vertex = _d[_i];
            options.vertices.push(Vertex.load(vertex));
        }
        for (var _e = 0, _f = (_b = data.colors) !== null && _b !== void 0 ? _b : []; _e < _f.length; _e++) {
            var color = _f[_e];
            options.colors.push(Color.load(color));
        }
        for (var _g = 0, _h = (_c = data.normal) !== null && _c !== void 0 ? _c : []; _g < _h.length; _g++) {
            var normal = _h[_g];
            options.normal.push(Vector.load(normal));
        }
        return new Object3D(data);
    };
    Object.defineProperty(Object3D.prototype, "colors", {
        get: function () {
            return this.options.colors;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Object3D.prototype, "vertices", {
        get: function () {
            return this.options.vertices;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Object3D.prototype, "normals", {
        get: function () {
            return this.options.normal;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Object3D.prototype, "transformMatrix", {
        get: function () {
            return this.options.matrix.transform;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Object3D.prototype, "viewMatrix", {
        get: function () {
            return this.options.matrix.view;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Object3D.prototype, "projectionMatrix", {
        get: function () {
            return this.options.matrix.projection;
        },
        enumerable: false,
        configurable: true
    });
    return Object3D;
}());
export { Object3D };
//# sourceMappingURL=Object.js.map