var Vertices = /** @class */ (function () {
    function Vertices(x, y, z) {
        if (x === void 0) { x = 0; }
        if (y === void 0) { y = 0; }
        if (z === void 0) { z = 0; }
        this.x = x;
        this.y = y;
        this.z = z;
    }
    Vertices.prototype.getVector = function () {
        return [this.x, this.y, this.z, 1.0];
    };
    return Vertices;
}());
export { Vertices };
//# sourceMappingURL=Vertices.js.map