import { IDENTITY_MATRIX, Matrix } from "./Matrix";
import { Transform } from "./Transform";

export class ViewTransform extends Transform {
  update(cameraTransform: Matrix) {
    super.update(Matrix.inverse(cameraTransform));
    return this;
  }
}
