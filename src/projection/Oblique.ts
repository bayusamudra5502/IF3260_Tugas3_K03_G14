import { Geometry } from "../object/Geometry";
import { Matrix } from "../matrix/Matrix";
import { Ortographic } from "./Orthographic";
import { Projector } from "./Projector";

export interface ObliqueOptions {
  /** Angle of x in degree */
  xAngle?: number;

  /** Angle of y in degree */
  yAngle?: number;

  /** Z Projection */
  zProjection?: number;
}

export class Oblique extends Projector {
  private xAngleRad: number = Geometry.angleDegToRad(90);
  private yAngleRad: number = Geometry.angleDegToRad(90);
  private zProj: number = 0;

  get xAngle() {
    return Geometry.angleRadToDeg(this.xAngleRad);
  }

  get yAngle() {
    return Geometry.angleRadToDeg(this.xAngleRad);
  }

  get zProjection() {
    return this.zProj;
  }

  configure(config: ObliqueOptions) {
    config.xAngle && (this.xAngleRad = Geometry.angleDegToRad(config.xAngle));
    config.yAngle && (this.yAngleRad = Geometry.angleDegToRad(config.yAngle));
    config.zProjection && (this.zProj = config.zProjection);
    this.notify();
  }

  transform(matrix: Matrix): Matrix {
    const cotX = Math.tan(0.5 * Math.PI - this.xAngleRad);
    const cotY = Math.tan(0.5 * Math.PI - this.yAngleRad);

    const obliqueMatrix = [
      [1, 0, cotX, -this.zProj * cotX],
      [0, 1, cotY, -this.zProj * cotY],
      [0, 0, 1, 0],
      [0, 0, 0, 1],
    ];

    return Matrix.multiply(obliqueMatrix, matrix);
  }
}
