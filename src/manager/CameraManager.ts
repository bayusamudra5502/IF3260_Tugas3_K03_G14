import { TransformManager } from "./TransformManager";
import { Rotation } from "../transform/Rotation";
import { Translation } from "../transform/Translation";
import { Matrix } from "../matrix/Matrix";
import { Transform } from "../matrix/Transform";

export class CameraManager extends Transform {
  constructor() {
    super();
  }

  update(transformValue: CameraManagerOptions) {
    const transformCalc = new TransformManager();

    const rotation = new Rotation();

    const translation = new Translation();
    translation.configure({
      z: transformValue.radius,
    });
    transformCalc.add(translation);

    rotation.configure({
      angleX: transformValue.xAngle,
      angleY: transformValue.yAngle,
    });
    transformCalc.add(rotation);

    const newMatrix = Matrix.inverse(Matrix.transpose(transformCalc.matrix));
    super.updateMatrix(newMatrix);

    this.notify();
  }
}

export interface CameraManagerOptions {
  xAngle: number;
  yAngle: number;
  radius: number;
}
