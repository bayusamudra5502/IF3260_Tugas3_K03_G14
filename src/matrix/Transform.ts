import { Listenable } from "../util/Listenable";
import { IDENTITY_MATRIX, Matrix } from "./Matrix";

export class Transform extends Listenable {
  private matrixData: Matrix = IDENTITY_MATRIX;

  updateMatrix(matrix: Matrix) {
    this.matrixData = matrix;
    return this;
  }

  get matrix() {
    return this.getMatrix();
  }

  getMatrix() {
    return this.matrixData;
  }
}
