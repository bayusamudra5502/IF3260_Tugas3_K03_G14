import { Transform } from "../matrix/Transform.js";
import { increaseArray } from "../util/util.js";
import { Color } from "./Color.js";
import { Vertex } from "./Vertices.js";
var Object3D = /** @class */ (function () {
    function Object3D(options) {
        this.options = options;
    }
    Object3D.load = function (json) {
        var _a, _b;
        var data = JSON.parse(json);
        var options = {
            colors: [],
            vertices: [],
            normal: [],
            transform: new Transform(),
            indicies: [],
        };
        var length = 0;
        var faceIdx = 0;
        for (var _i = 0, _c = (_a = data.vertices) !== null && _a !== void 0 ? _a : []; _i < _c.length; _i++) {
            var face = _c[_i];
            for (var _d = 0, face_1 = face; _d < face_1.length; _d++) {
                var vertex = face_1[_d];
                options.vertices.push(Vertex.load(vertex));
                length++;
            }
            for (var i = 0; i < length; i++) {
                options.normal.push(data.normal[faceIdx]);
            }
            length = 0;
            faceIdx++;
        }
        options.indicies = increaseArray(options.vertices.length);
        for (var _e = 0, _f = (_b = data.colors) !== null && _b !== void 0 ? _b : []; _e < _f.length; _e++) {
            var color = _f[_e];
            options.colors.push(Color.load(color));
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
    Object.defineProperty(Object3D.prototype, "normal", {
        get: function () {
            return this.options.normal;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Object3D.prototype, "indicies", {
        get: function () {
            return this.indicies;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Object3D.prototype, "transform", {
        get: function () {
            return this.options.transform;
        },
        enumerable: false,
        configurable: true
    });
    return Object3D;
}());
export { Object3D };
//# sourceMappingURL=Object3D.js.map