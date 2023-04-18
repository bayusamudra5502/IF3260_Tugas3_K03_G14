import { Vector } from "../object/Vector.js";
/* Calculate b x a / || b x a || */
export function getNormal(a, b) {
    var cross = crossProduct(b, a);
    var length = vectorLength(cross);
    return multiply(cross, 1 / length);
}
export function crossProduct(a, b) {
    var result = new Vector();
    result.x = a.y * b.z - a.z * b.y;
    result.y = a.z * b.x - a.x * b.z;
    result.z = a.x * b.y - a.y * b.x;
    return result;
}
export function vectorLength(v) {
    return Math.sqrt(v.x * v.x + v.y * v.y + v.z * v.z);
}
export function multiply(a, multiply) {
    return new Vector(a.x * multiply, a.y * multiply, a.z * multiply);
}
export function vectorFromVertex(a, b) {
    return new Vector(b.x - a.x, b.y - a.y, b.z - a.z);
}
//# sourceMappingURL=vector.js.map