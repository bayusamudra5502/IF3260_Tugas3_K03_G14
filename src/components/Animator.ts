import { Transform } from "../matrix/Transform";
import { StateComponent } from "../object/Component";
import { Geometry } from "../object/Geometry";
import { Rotation } from "../transform/Rotation";

export enum RotationAxis {
  x,
  y,
  z,
}

export interface RotationAnimatorOption {
  axis: RotationAxis;
  degreeFrames: number[];
  transform: Transform;
}

export class RotationAnimator extends StateComponent {
  private frames: number[];
  private transform: Transform;
  private axis: RotationAxis;
  private currentFrame: number = 0;

  constructor(options: RotationAnimatorOption) {
    super();

    this.frames = options.degreeFrames.map((el) => Geometry.angleDegToRad(el));
    this.transform = options.transform;
    this.axis = options.axis;
  }

  run(): null {
    const currentRad = this.frames[this.currentFrame];
    const rotation = new Rotation();

    rotation.configure({
      angleX: this.axis == RotationAxis.x ? currentRad : 0,
      angleY: this.axis == RotationAxis.y ? currentRad : 0,
      angleZ: this.axis == RotationAxis.z ? currentRad : 0,
    });

    this.currentFrame += 1;
    this.currentFrame %= this.frames.length;

    this.transform.updateMatrix(rotation.matrix);

    return null;
  }
}
