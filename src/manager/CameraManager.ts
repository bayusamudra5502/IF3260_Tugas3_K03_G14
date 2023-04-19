import { TransformManager } from "./TransformManager";
import { Rotation } from "../transform/Rotation";
import { Translation } from "../transform/Translation";
import { Matrix } from "../matrix/Matrix";
import { Transform } from "../matrix/Transform";
import { Vertex } from "../object/Vertices";

export class CameraManager extends Transform {
  position: Vertex;
  constructor() {
    super();
    this.position = new Vertex(0, 0, 2);
  }

  calcPosition(transformValue: CameraManagerOptions){
    const radius = transformValue.radius;
    const yAxis = transformValue.yAngle;
    const xAxis = transformValue.xAngle;
    this.position = new Vertex(
      radius * Math.sin(yAxis / 180 * Math.PI),
      radius * Math.sin(xAxis / 180 * Math.PI),
      radius * Math.cos(yAxis / 180 * Math.PI)
    )
  }

  update(transformValue: CameraManagerOptions) {
    this.calcPosition(transformValue);
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
