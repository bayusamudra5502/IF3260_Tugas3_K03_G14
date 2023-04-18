import { Vector } from "../object/Vector";
import { Vertex } from "../object/Vertices";

/* Calculate b x a / || b x a || */
export function getNormal(a: Vector, b: Vector) {
  const cross = crossProduct(b, a);
  const length = vectorLength(cross);

  return multiply(cross, 1 / length);
}

export function crossProduct(a: Vector, b: Vector) {
  const result = new Vector();
  result.x = a.y * b.z - a.z * b.y;
  result.y = a.z * b.x - a.x * b.z;
  result.z = a.x * b.y - a.y * b.x;

  return result;
}

export function vectorLength(v: Vector) {
  return Math.sqrt(v.x * v.x + v.y * v.y + v.z * v.z);
}

export function multiply(a: Vector, multiply: number) {
  return new Vector(a.x * multiply, a.y * multiply, a.z * multiply);
}

export function vectorFromVertex(a: Vertex, b: Vertex) {
  return new Vector(b.x - a.x, b.y - a.y, b.z - a.z);
}
