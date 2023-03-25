import { IDENTITY_MATRIX, Matrix } from "../matrix/Matrix";
import { Transformable } from "../transform/Transformable";
import { Listenable } from "../util/Listenable";

export class TransformManager extends Listenable {
  private transforms: Transformable[] = [];
  private calculatedMatrix: Matrix = IDENTITY_MATRIX;

  constructor() {
    super();
  }

  get matrix(): Matrix {
    return this.calculatedMatrix;
  }

  add(transform: Transformable) {
    this.transforms.push(transform);
    transform.subscribe(
      function () {
        this.recalculate();
        this.notify();
      }.bind(this)
    );

    this.recalculate();
    this.notify();
  }

  delete(idx: number) {
    this.transforms.splice(idx, 1);
    this.recalculate();
    this.notify();
  }

  reset() {
    this.transforms = [];
    this.recalculate();
    this.notify();
  }

  recalculate() {
    let result = IDENTITY_MATRIX;

    for (const p of this.transforms) {
      result = Matrix.multiply(p.matrix, result);
    }

    this.calculatedMatrix = result;
  }
}
