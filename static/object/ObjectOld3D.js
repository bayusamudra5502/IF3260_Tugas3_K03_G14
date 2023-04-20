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
        var e_1, _a, e_2, _b;
        var _c;
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
        try {
            for (var _d = __values((_c = data.vertices) !== null && _c !== void 0 ? _c : []), _e = _d.next(); !_e.done; _e = _d.next()) {
                var face = _e.value;
                try {
                    for (var face_1 = (e_2 = void 0, __values(face)), face_1_1 = face_1.next(); !face_1_1.done; face_1_1 = face_1.next()) {
                        var vertex = face_1_1.value;
                        var vert = Vertex.load(vertex);
                        options.vertices.push(vert);
                        options.center.x += vert.x;
                        options.center.y += vert.y;
                        options.center.z += vert.z;
                        length++;
                    }
                }
                catch (e_2_1) { e_2 = { error: e_2_1 }; }
                finally {
                    try {
                        if (face_1_1 && !face_1_1.done && (_b = face_1.return)) _b.call(face_1);
                    }
                    finally { if (e_2) throw e_2.error; }
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
        }
        catch (e_1_1) { e_1 = { error: e_1_1 }; }
        finally {
            try {
                if (_e && !_e.done && (_a = _d.return)) _a.call(_d);
            }
            finally { if (e_1) throw e_1.error; }
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