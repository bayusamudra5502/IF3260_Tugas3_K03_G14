export class Vertices {
  constructor(
    public x: number = 0,
    public y: number = 0,
    public z: number = 0
  ) {}

  getVector() {
    return [this.x, this.y, this.z, 1.0];
  }
}
