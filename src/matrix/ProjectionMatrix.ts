import { IDENTITY_MATRIX, Matrix } from "./Matrix";
import { Projector } from "./Projector";

export class ProjectionMatrix {
  private projectors: Projector[] = [];
  private calculatedMatrix: Matrix = IDENTITY_MATRIX;

  get matrix(): Matrix {
    return this.calculatedMatrix;
  }

  addProjector(projector: Projector) {
    this.projectors.push(projector);
    this.recalculate();
  }

  recalculate() {
    let result = IDENTITY_MATRIX;

    for (const p of this.projectors) {
      result = p.transform(result);
    }

    this.calculatedMatrix = result;
  }
}
