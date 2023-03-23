import { Listenable } from "../manager/Listenable";
import { Matrix } from "../matrix/Matrix";

export abstract class Transformable extends Listenable {
  abstract get matrix(): Matrix;
}
