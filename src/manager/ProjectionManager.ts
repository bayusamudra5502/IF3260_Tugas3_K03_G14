import { IDENTITY_MATRIX, Matrix } from "../matrix/Matrix";
import { Projector } from "../matrix/Projector";
import { Listenable } from "./Listenable";

export class ProjectionManager extends Listenable {
  private projectors: Projector[] = [];
  private calculatedMatrix: Matrix = IDENTITY_MATRIX;

  constructor() {
    super();
    this.subscribe(this.recalculate);
  }

  get matrix(): Matrix {
    return this.calculatedMatrix;
  }

  addProjector(projector: Projector) {
    this.projectors.push(projector);
    this.notify();
  }

  recalculate() {
    let result = IDENTITY_MATRIX;

    for (const p of this.projectors) {
      result = p.transform(result);
    }

    this.calculatedMatrix = result;
  }
}
