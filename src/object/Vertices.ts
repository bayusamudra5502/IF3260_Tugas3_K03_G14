export class Vertices {
  constructor(
    public x: number = 0,
    public y: number = 0,
    public z: number = 0
  ) {}

  getVector() {
    return [this.x, this.y, this.z, 1.0];
  }

  static load(array: number[]) {
    return new Vertices(array[0], array[1], array[2]);
  }
}
