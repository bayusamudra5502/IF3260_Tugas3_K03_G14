export function increaseArray(count, start) {
    if (start === void 0) { start = 0; }
    var result = [];
    for (var i = 0; i < count; i++) {
        result.push(start + i);
    }
    return result;
}
export function flatten(array) {
    var result = [];
    for (var _i = 0, array_1 = array; _i < array_1.length; _i++) {
        var value = array_1[_i];
        if (value instanceof Array) {
            var flat = flatten(value);
            for (var _a = 0, flat_1 = flat; _a < flat_1.length; _a++) {
                var j = flat_1[_a];
                result.push(j);
            }
        }
        else {
            result.push(value);
        }
    }
    return result;
}
export function drawableToPrimitive(draw) {
    var vertices = draw.vertices;
    var colors = draw.colors;
    var indices = draw.indices ? draw.indices : increaseArray(vertices.length);
    if (indices.length != colors.length) {
        throw new Error("color and index count is not equal");
    }
    var flatVertices = [];
    for (var _i = 0, vertices_1 = vertices; _i < vertices_1.length; _i++) {
        var i = vertices_1[_i];
        var vector = i.getVector();
        for (var _a = 0, vector_1 = vector; _a < vector_1.length; _a++) {
            var j = vector_1[_a];
            flatVertices.push(j);
        }
    }
    var flatColor = [];
    for (var _b = 0, colors_1 = colors; _b < colors_1.length; _b++) {
        var i = colors_1[_b];
        var vector = i.getArray();
        for (var _c = 0, vector_2 = vector; _c < vector_2.length; _c++) {
            var j = vector_2[_c];
            flatColor.push(j);
        }
    }
    return {
        vertices: new Float32Array(flatVertices),
        color: new Float32Array(flatColor),
        indices: new Uint16Array(indices),
        matrix: {
            transform: flatten(draw.matrix.transform),
            projection: flatten(draw.matrix.projection),
            camera: flatten(draw.matrix.camera),
        },
        size: indices.length,
    };
}
//# sourceMappingURL=util.js.map