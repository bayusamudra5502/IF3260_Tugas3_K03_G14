var Point = /** @class */ (function () {
    function Point(x, y) {
        if (x === void 0) { x = 0; }
        if (y === void 0) { y = 0; }
        this.x = x;
        this.y = y;
    }
    Point.prototype.getArray = function () {
        return [this.x, this.y];
    };
    Point.load = function (array) {
        return new Point(array[0], array[1]);
    };
    return Point;
}());
export { Point };
//# sourceMappingURL=Point.js.map