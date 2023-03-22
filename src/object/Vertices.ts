export class Vertex {
  constructor(
    public x: number = 0,
    public y: number = 0,
    public z: number = 0
  ) {}

  getArray() {
    return [this.x, this.y, this.z, 1.0];
  }

  static load(array: number[]) {
    return new Vertex(array[0], array[1], array[2]);
  }
}
