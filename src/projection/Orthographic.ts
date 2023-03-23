import { Matrix } from "../matrix/Matrix";
import { Projector } from "./Projector";

export interface OrtographicOptions {
  left?: number;
  right?: number;
  bottom?: number;
  up?: number;
  near?: number;
  far?: number;
}

export class Ortographic extends Projector {
  private left = -1;
  private right = 1;
  private bottom = -1;
  private top = 1;
  private near = 1;
  private far = -1;

  configure(options: OrtographicOptions) {
    options.left && (this.left = options.left);
    options.right && (this.right = options.right);
    options.bottom && (this.right = options.bottom);
    options.up && (this.right = options.up);
    options.near && (this.right = options.near);
    options.far && (this.right = options.far);

    return this;
  }

  transform(matrix: Matrix): Matrix {
    const orthoMatrix = [
      [
        2 / (this.right - this.left),
        0,
        0,
        (this.left + this.right) / (this.left - this.right),
      ],
      [
        0,
        2 / (this.top - this.bottom),
        0,
        (this.bottom + this.top) / (this.bottom - this.top),
      ],
      [
        0,
        0,
        2 / (this.near - this.far),
        (this.near + this.far) / (this.near - this.far),
      ],
      [0, 0, 0, 1],
    ];

    return Matrix.multiply(orthoMatrix, matrix);
  }
}
