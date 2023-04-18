var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
import { Vertex } from "./Vertices.js";
var Vector = /** @class */ (function (_super) {
    __extends(Vector, _super);
    function Vector() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Object.defineProperty(Vector.prototype, "length", {
        get: function () {
            return Math.sqrt(this.x * this.x + this.y * this.y + this.z * this.z);
        },
        enumerable: false,
        configurable: true
    });
    Vector.prototype.cross = function (b) {
        return Vector.cross(this, b);
    };
    Vector.prototype.multiply = function (multiply) {
        return new Vector(this.x * multiply, this.y * multiply, this.z * multiply);
    };
    Vector.normal = function (a, b) {
        var cross = Vector.cross(b, a);
        var length = cross.length;
        return cross.multiply(1 / length);
    };
    Vector.load = function (array) {
        return new Vector(array[0], array[1], array[2]);
    };
    Vector.fromVertex = function (a, b) {
        return new Vector(b.x - a.x, b.y - a.y, b.z - a.z);
    };
    Vector.cross = function (a, b) {
        var result = new Vector();
        result.x = a.y * b.z - a.z * b.y;
        result.y = a.z * b.x - a.x * b.z;
        result.z = a.x * b.y - a.y * b.x;
        return result;
    };
    return Vector;
}(Vertex));
export { Vector };
//# sourceMappingURL=Vector.js.map