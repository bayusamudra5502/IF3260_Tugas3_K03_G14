var Color = /** @class */ (function () {
    function Color(r, g, b, a) {
        if (r === void 0) { r = 0; }
        if (g === void 0) { g = 0; }
        if (b === void 0) { b = 0; }
        if (a === void 0) { a = 0; }
        this.r = r;
        this.g = g;
        this.b = b;
        this.a = a;
    }
    Color.hex = function (color) {
        var result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(color.toLowerCase());
        return result
            ? new Color(parseInt(result[1], 16) / 255, parseInt(result[2], 16) / 255, parseInt(result[3], 16) / 255, 1)
            : null;
    };
    Color.load = function (colors) {
        return new Color(colors[0], colors[1], colors[2], 1);
    };
    Color.prototype.getArray = function () {
        return [this.r, this.g, this.b, this.a];
    };
    return Color;
}());
export { Color };
//# sourceMappingURL=Color.js.map