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
import { Matrix } from "../matrix/Matrix.js";
export function isPowerOf2(num) {
    return (num & (num - 1)) === 0;
}
export function padding(str, length, pad) {
    if (length === void 0) { length = 2; }
    if (pad === void 0) { pad = "0"; }
    return pad.repeat(length - str.length) + str;
}
export function increaseArray(count, start) {
    if (start === void 0) { start = 0; }
    var result = [];
    for (var i = 0; i < count; i++) {
        result.push(start + i);
    }
    return result;
}
export function flatten(array) {
    var e_1, _a, e_2, _b;
    var result = [];
    try {
        for (var array_1 = __values(array), array_1_1 = array_1.next(); !array_1_1.done; array_1_1 = array_1.next()) {
            var value = array_1_1.value;
            if (value instanceof Array) {
                var flat = flatten(value);
                try {
                    for (var flat_1 = (e_2 = void 0, __values(flat)), flat_1_1 = flat_1.next(); !flat_1_1.done; flat_1_1 = flat_1.next()) {
                        var j = flat_1_1.value;
                        result.push(j);
                    }
                }
                catch (e_2_1) { e_2 = { error: e_2_1 }; }
                finally {
                    try {
                        if (flat_1_1 && !flat_1_1.done && (_b = flat_1.return)) _b.call(flat_1);
                    }
                    finally { if (e_2) throw e_2.error; }
                }
            }
            else {
                result.push(value);
            }
        }
    }
    catch (e_1_1) { e_1 = { error: e_1_1 }; }
    finally {
        try {
            if (array_1_1 && !array_1_1.done && (_a = array_1.return)) _a.call(array_1);
        }
        finally { if (e_1) throw e_1.error; }
    }
    return result;
}
export function drawableToPrimitive(draw) {
    var e_3, _a, e_4, _b, e_5, _c, e_6, _d;
    var vertices = draw.vertices;
    var colors = draw.colors;
    var indices = draw.indices ? draw.indices : increaseArray(vertices.length);
    var tangents = draw.tangents;
    if (vertices.length != colors.length) {
        throw new Error("color and vertices count is not equal");
    }
    var flatVertices = [];
    try {
        for (var vertices_1 = __values(vertices), vertices_1_1 = vertices_1.next(); !vertices_1_1.done; vertices_1_1 = vertices_1.next()) {
            var i = vertices_1_1.value;
            var vector = i.getArray();
            try {
                for (var vector_1 = (e_4 = void 0, __values(vector)), vector_1_1 = vector_1.next(); !vector_1_1.done; vector_1_1 = vector_1.next()) {
                    var j = vector_1_1.value;
                    flatVertices.push(j);
                }
            }
            catch (e_4_1) { e_4 = { error: e_4_1 }; }
            finally {
                try {
                    if (vector_1_1 && !vector_1_1.done && (_b = vector_1.return)) _b.call(vector_1);
                }
                finally { if (e_4) throw e_4.error; }
            }
        }
    }
    catch (e_3_1) { e_3 = { error: e_3_1 }; }
    finally {
        try {
            if (vertices_1_1 && !vertices_1_1.done && (_a = vertices_1.return)) _a.call(vertices_1);
        }
        finally { if (e_3) throw e_3.error; }
    }
    var flatColor = [];
    try {
        for (var colors_1 = __values(colors), colors_1_1 = colors_1.next(); !colors_1_1.done; colors_1_1 = colors_1.next()) {
            var i = colors_1_1.value;
            var vector = i.getArray();
            try {
                for (var vector_2 = (e_6 = void 0, __values(vector)), vector_2_1 = vector_2.next(); !vector_2_1.done; vector_2_1 = vector_2.next()) {
                    var j = vector_2_1.value;
                    flatColor.push(j);
                }
            }
            catch (e_6_1) { e_6 = { error: e_6_1 }; }
            finally {
                try {
                    if (vector_2_1 && !vector_2_1.done && (_d = vector_2.return)) _d.call(vector_2);
                }
                finally { if (e_6) throw e_6.error; }
            }
        }
    }
    catch (e_5_1) { e_5 = { error: e_5_1 }; }
    finally {
        try {
            if (colors_1_1 && !colors_1_1.done && (_c = colors_1.return)) _c.call(colors_1);
        }
        finally { if (e_5) throw e_5.error; }
    }
    var flatTangent = [];
    tangents.forEach(function (e) {
        e.getArray().forEach(function (el) {
            flatTangent.push(el);
        });
    });
    var tMatrix = Matrix.transpose(draw.matrix.transform);
    var pMatrix = Matrix.transpose(draw.matrix.projection);
    //   const vMatrix = Matrix.transpose(draw.matrix.view);
    var vMatrix = draw.matrix.view;
    return {
        vertices: new Float32Array(flatVertices),
        color: new Float32Array(flatColor),
        indices: new Uint16Array(indices),
        matrix: {
            transform: flatten(tMatrix),
            projection: flatten(pMatrix),
            view: flatten(vMatrix),
        },
        tangents: new Float32Array(flatTangent),
        size: indices.length,
    };
}
//# sourceMappingURL=util.js.map