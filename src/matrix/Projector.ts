import { Matrix } from "./Matrix";

export interface Projector {
  transform(matrix: Matrix): Matrix;
}
