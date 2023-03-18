var Vertex = /** @class */ (function () {
    function Vertex(x, y, z) {
        if (x === void 0) { x = 0; }
        if (y === void 0) { y = 0; }
        if (z === void 0) { z = 0; }
        this.x = x;
        this.y = y;
        this.z = z;
    }
    Vertex.prototype.getVector = function () {
        return [this.x, this.y, this.z, 1.0];
    };
    Vertex.load = function (array) {
        return new Vertex(array[0], array[1], array[2]);
    };
    return Vertex;
}());
export { Vertex };
//# sourceMappingURL=Vertices.js.map