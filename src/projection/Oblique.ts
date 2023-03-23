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
  private xAngle: number = Geometry.angleDegToRad(90);
  private yAngle: number = Geometry.angleDegToRad(90);
  private zProjection: number = 0;

  configure(config: ObliqueOptions) {
    config.xAngle && (this.xAngle = Geometry.angleDegToRad(config.xAngle));
    config.yAngle && (this.yAngle = Geometry.angleDegToRad(config.yAngle));
    config.zProjection && (this.zProjection = config.zProjection);
  }

  transform(matrix: Matrix): Matrix {
    const cotX = Math.tan(0.5 * Math.PI - this.xAngle);
    const cotY = Math.tan(0.5 * Math.PI - this.yAngle);

    const obliqueMatrix = [
      [1, 0, cotX, -this.zProjection * cotX],
      [0, 1, cotY, -this.zProjection * cotY],
      [0, 0, 1, 0],
      [0, 0, 0, 1],
    ];

    return Matrix.multiply(obliqueMatrix, matrix);
  }
}
