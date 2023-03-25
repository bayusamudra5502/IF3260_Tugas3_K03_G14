import { Matrix } from "../matrix/Matrix";
import { Transformable } from "./Transformable";

export interface TranslationOptions {
  x?: number;
  y?: number;
  z?: number;
}

export class Translation extends Transformable {
  private x = 0;
  private y = 0;
  private z = 0;

  configure(option: TranslationOptions) {
    option.x && (this.x = option.x);
    option.y && (this.y = option.y);
    option.z && (this.z = option.z);

    return this;
  }

  get X() {
    return this.x;
  }

  get Y() {
    return this.y;
  }
  
  get Z() {
    return this.z;
  }
  
  get matrix(): Matrix {
    return [
      [1, 0, 0, this.x],
      [0, 1, 0, this.y],
      [0, 0, 1, this.z],
      [0, 0, 0, 1],
    ];
  }
}
