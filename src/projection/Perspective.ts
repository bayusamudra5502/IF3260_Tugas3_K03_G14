import { Geometry } from "../object/Geometry";
import { Matrix } from "../matrix/Matrix";
import { Projector } from "./Projector";

export interface PerspectiveOption {
  zNear?: number;
  zFar?: number;

  /** Field of view angle in degree */
  fieldOfView?: number;

  /** Aspect ratio of canvas : width/height */
  aspectRatio?: number;
}

export class Perspective extends Projector {
  private zNear: number = 1;
  private zFar: number = -1;
  private f: number = 1;
  private aspectRatio: number = 1;

  configure(option: PerspectiveOption) {
    option.zNear && (this.zNear = option.zNear);
    option.zFar && (this.zNear = option.zFar);
    option.fieldOfView &&
      (this.f = Math.tan(
        Math.PI * 0.5 - 0.5 * Geometry.angleDegToRad(option.fieldOfView)
      ));
    option.aspectRatio && (this.aspectRatio = option.aspectRatio);
  }

  transform(matrix: Matrix): Matrix {
    const rangeInverse = 1 / (this.zNear - this.zFar);

    const perspectiveMatrix = [
      [this.f / this.aspectRatio, 0, 0, 0],
      [0, this.f, 0, 0],
      [
        0,
        0,
        (this.zNear + this.zFar) * rangeInverse,
        2 * (this.zNear * this.zFar) * rangeInverse,
      ],
      [0, 0, -1, 0],
    ];

    return Matrix.multiply(perspectiveMatrix, matrix);
  }
}
