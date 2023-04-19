export class Point {
    constructor(
      public x: number = 0,
      public y: number = 0
    ) {}
  
    getArray() {
      return [this.x, this.y];
    }
  
    static load(array: number[]) {
      return new Point(array[0], array[1]);
    }
  }
  