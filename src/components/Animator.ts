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

  static fromConfig(config: AnimatorConfig) {
    if (config.max_degree < config.min_degree) {
      throw new Error("max degree must be greater or equal to min degree");
    }
    if (config.start_degree > config.max_degree) {
      throw new Error("max degree must be greater or equal to start degree");
    }
    if (config.min_degree > config.start_degree) {
      throw new Error("star degree must be greater or equal to min degree");
    }

    const framesDegree: number[] = [config.start_degree];
    const loopSize =
      Math.abs(config.max_degree - config.min_degree) +
      Math.abs(config.start_degree - config.max_degree) +
      Math.abs(config.max_degree - config.start_degree);

    const deltaSize = loopSize / config.frame_count;
    let currentDegree = config.start_degree;

    // From start to max
    while (currentDegree < config.max_degree) {
      currentDegree += deltaSize;
      framesDegree.push(currentDegree);
    }

    // From max to min
    currentDegree = 2 * config.max_degree - currentDegree;
    framesDegree.push(currentDegree);

    while (currentDegree > config.min_degree) {
      currentDegree -= deltaSize;
      framesDegree.push(currentDegree);
    }

    // From min to start
    currentDegree = 2 * config.min_degree + currentDegree;
    framesDegree.push(currentDegree);

    while (currentDegree < config.start_degree) {
      currentDegree += deltaSize;
      framesDegree.push(currentDegree);
    }

    const frames = config.clockwise ? framesDegree : framesDegree.reverse();
    return new RotationAnimator({
      axis: config.start_degree,
      degreeFrames: frames,
      transform: config.transform,
    });
  }
}

export interface AnimatorConfig {
  rotation_axis: RotationAxis;
  max_degree: number;
  min_degree: number;
  start_degree: number;
  clockwise: number;
  frame_count: number;
  transform: Transform;
}
