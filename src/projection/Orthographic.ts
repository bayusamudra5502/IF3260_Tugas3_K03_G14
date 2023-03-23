import { Matrix } from "../matrix/Matrix";
import { Projector } from "./Projector";

export interface OrtographicOptions {
  left?: number;
  right?: number;
  bottom?: number;
  top?: number;
  near?: number;
  far?: number;
}

export class Ortographic extends Projector {
  private leftPos = -1;
  private rightPos = 1;
  private bottomPos = -1;
  private topPos = 1;
  private nearPos = 1;
  private farPos = -1;

  configure(options: OrtographicOptions) {
    options.left && (this.leftPos = options.left);
    options.right && (this.rightPos = options.right);
    options.bottom && (this.bottomPos = options.bottom);
    options.top && (this.topPos = options.top);
    options.near && (this.nearPos = options.near);
    options.far && (this.farPos = options.far);
    this.notify();
    return this;
  }

  get xLeft() {
    return this.leftPos;
  }

  get xRight() {
    return this.rightPos;
  }

  get yBottom() {
    return this.bottomPos;
  }

  get yTop() {
    return this.topPos;
  }

  get zNear() {
    return this.nearPos;
  }

  get zFar() {
    return this.farPos;
  }

  transform(matrix: Matrix): Matrix {
    const orthoMatrix = [
      [
        2 / (this.rightPos - this.leftPos),
        0,
        0,
        (this.leftPos + this.rightPos) / (this.leftPos - this.rightPos),
      ],
      [
        0,
        2 / (this.topPos - this.bottomPos),
        0,
        (this.bottomPos + this.topPos) / (this.bottomPos - this.topPos),
      ],
      [
        0,
        0,
        2 / (this.nearPos - this.farPos),
        (this.nearPos + this.farPos) / (this.nearPos - this.farPos),
      ],
      [0, 0, 0, 1],
    ];

    return Matrix.multiply(orthoMatrix, matrix);
  }
}
