import { Transform } from "../matrix/Transform.js";
import { increaseArray } from "../util/util.js";
import { Color } from "./Color.js";
import { Vector } from "./Vector.js";
import { Vertex } from "./Vertices.js";
var ObjectOld3D = /** @class */ (function () {
    function ObjectOld3D(options) {
        this.options = options;
    }
    ObjectOld3D.load = function (json) {
        var _a;
        var data = JSON.parse(json);
        var options = {
            colors: [],
            vertices: [],
            normal: [],
            transform: new Transform(),
            indicies: [],
            center: new Vertex(0, 0, 0),
        };
        var length = 0;
        var faceIdx = 0;
        for (var _i = 0, _b = (_a = data.vertices) !== null && _a !== void 0 ? _a : []; _i < _b.length; _i++) {
            var face = _b[_i];
            for (var _c = 0, face_1 = face; _c < face_1.length; _c++) {
                var vertex = face_1[_c];
                var vert = Vertex.load(vertex);
                options.vertices.push(vert);
                options.center.x += vert.x;
                options.center.y += vert.y;
                options.center.z += vert.z;
                length++;
            }
            for (var i = 0; i < length; i++) {
                options.normal.push(Vector.load(data.normal[faceIdx]));
            }
            for (var i = 0; i < length; i++) {
                if (data.colors instanceof Array) {
                    if (data.colors[faceIdx] instanceof Array) {
                        if (data.colors[faceIdx][i] instanceof Array) {
                            options.colors.push(Color.load(data.colors[faceIdx][i]));
                        }
                        else if (typeof data.colors[faceIdx][i] === "string") {
                            options.colors.push(Color.hex(data.colors[faceIdx][i]));
                        }
                        else if (typeof data.colors[faceIdx][0] === "number") {
                            options.colors.push(Color.load(data.colors[faceIdx]));
                        }
                        else {
                            new Error("unknown color type");
                        }
                    }
                    else if (typeof data.colors[faceIdx] === "string") {
                        options.colors.push(Color.hex(data.colors[faceIdx]));
                    }
                    else {
                        new Error("unknown color type");
                    }
                }
                else if (typeof data.colors === "string") {
                    options.colors.push(Color.hex(data.colors));
                }
                else {
                    new Error("unknown color type");
                }
            }
            length = 0;
            faceIdx++;
        }
        options.center.x /= options.vertices.length;
        options.center.y /= options.vertices.length;
        options.center.z /= options.vertices.length;
        options.indicies = increaseArray(options.vertices.length);
        return new ObjectOld3D(options);
    };
    ObjectOld3D.prototype.reset = function () {
        this.options.transform = new Transform();
    };
    Object.defineProperty(ObjectOld3D.prototype, "colors", {
        get: function () {
            return this.options.colors;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(ObjectOld3D.prototype, "vertices", {
        get: function () {
            return this.options.vertices;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(ObjectOld3D.prototype, "center", {
        get: function () {
            return this.options.center;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(ObjectOld3D.prototype, "normal", {
        get: function () {
            return this.options.normal;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(ObjectOld3D.prototype, "indicies", {
        get: function () {
            return this.options.indicies;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(ObjectOld3D.prototype, "transform", {
        get: function () {
            return this.options.transform;
        },
        enumerable: false,
        configurable: true
    });
    return ObjectOld3D;
}());
export { ObjectOld3D };
//# sourceMappingURL=ObjectOld3D.js.map