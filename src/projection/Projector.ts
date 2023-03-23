import { Matrix } from "../matrix/Matrix";
import { Listenable } from "../util/Listenable";

export abstract class Projector extends Listenable {
  abstract transform(matrix: Matrix): Matrix;
}
