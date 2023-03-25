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
  private fieldOfViewAngle: number = 90;

  configure(option: PerspectiveOption) {
    option.zNear && (this.zNear = option.zNear);
    option.zFar && (this.zNear = option.zFar);
    option.fieldOfView &&
      (this.f = Math.tan(
        Math.PI * 0.5 - 0.5 * Geometry.angleDegToRad(option.fieldOfView)
      ));
    option.fieldOfView && (this.fieldOfViewAngle = option.fieldOfView);
    option.aspectRatio && (this.aspectRatio = option.aspectRatio);

    this.notify();
  }

  get near() {
    return this.zNear;
  }

  get far() {
    return this.zFar;
  }

  get fieldOfView() {
    return this.fieldOfViewAngle;
  }

  transform(matrix: Matrix): Matrix {
    const near = this.zNear;
    const far = this.zFar;

    const rangeInverse = 1 / (near - far);

    const perspectiveMatrix = [
      [this.f / this.aspectRatio, 0, 0, 0],
      [0, this.f, 0, 0],
      [0, 0, (near + far) * rangeInverse, 2 * (near * far) * rangeInverse],
      [0, 0, -1, 0],
    ];

    return Matrix.multiply(perspectiveMatrix, matrix);
  }
}
