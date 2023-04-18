import { Vertex } from "./Vertices";

export class Vector extends Vertex {
  get length() {
    return Math.sqrt(this.x * this.x + this.y * this.y + this.z * this.z);
  }

  cross(b: Vector) {
    return Vector.cross(this, b);
  }

  multiply(multiply: number) {
    return new Vector(this.x * multiply, this.y * multiply, this.z * multiply);
  }

  static normal(a: Vector, b: Vector) {
    const cross = Vector.cross(b, a);
    const length = cross.length;

    return cross.multiply(1 / length);
  }

  static load(array: number[]) {
    return new Vector(array[0], array[1], array[2]);
  }

  static fromVertex(a: Vertex, b: Vertex) {
    return new Vector(b.x - a.x, b.y - a.y, b.z - a.z);
  }

  static cross(a: Vector, b: Vector) {
    const result = new Vector();
    result.x = a.y * b.z - a.z * b.y;
    result.y = a.z * b.x - a.x * b.z;
    result.z = a.x * b.y - a.y * b.x;

    return result;
  }
}
