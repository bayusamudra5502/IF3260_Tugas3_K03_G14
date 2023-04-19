import { Frame } from "../animation/Frame";
import { IDENTITY_MATRIX, Matrix } from "../matrix/Matrix";
import { Transform } from "../matrix/Transform";
import { StateComponent } from "../object/Component";
import { Geometry } from "../object/Geometry";
import { Object3D } from "../object/Object3D";
import { Vertex } from "../object/Vertices";
import { Rotation } from "../transform/Rotation";
import { Scaling } from "../transform/Scaling";
import { Translation } from "../transform/Translation";
import { Listenable } from "../util/Listenable";

export class Animator extends StateComponent {
  private transform: Transform;
  private matrixCache: Matrix[] = [];

  private maxFrame: number;
  private currentFrame: number = 0;
  private isActive = false;

  private currentFrameStatus: Map<string, Frame> = new Map();
  private nextFrameIdx: number = 0;
  private lastFramePointNumber: number = 0;

  constructor(
    private framePoints: Frame[],
    private jointPoint: Vertex,
    private cacheFrame = true
  ) {
    super();

    /* Frame validation */
    if (framePoints.length == 0) {
      return;
    }

    for (let i = 1; i < framePoints.length; i++) {
      const first = framePoints[i - 1];
      const second = framePoints[i];

      if (first.frame_number >= second.frame_number) {
        throw new Error("frame must be increasing");
      }
    }

    this.maxFrame = framePoints[framePoints.length - 1].frame_number;
  }

  fit(object: Object3D) {
    this.transform = object.transform;
  }

  setActive(active: boolean) {
    this.isActive = active;
  }

  run(): null {
    if (!this.isActive || this.framePoints.length == 0) return;

    const nextFrame = this.framePoints[this.nextFrameIdx];

    let matrix: Matrix;
    if (this.matrixCache[this.currentFrame]) {
      matrix = this.matrixCache[this.currentFrame];
    } else {
      const progress =
        (this.currentFrame - this.lastFramePointNumber) /
        (nextFrame.frame_number - this.lastFramePointNumber);

      matrix = this.doTransform(nextFrame, progress);

      if (this.cacheFrame) {
        this.matrixCache.push(matrix);
      }
    }

    this.transform.updateMatrix(matrix);

    if (nextFrame.frame_number == this.currentFrame) {
      this.currentFrameStatus.set(nextFrame.transform.type, nextFrame);
      this.lastFramePointNumber = this.currentFrame;
      this.nextFrameIdx = (this.nextFrameIdx + 1) % this.framePoints.length;
    }

    this.currentFrame = (this.currentFrame + 1) % this.maxFrame;

    if (this.currentFrame == 0) {
      this.currentFrameStatus.clear();
    }

    return null;
  }

  private doTransform(nextFrame: Frame, progress: number) {
    const status = this.currentFrameStatus.get(nextFrame.transform.type);

    let matrix: Matrix;
    switch (nextFrame.transform.type) {
      case "rotation": {
        const rot = new Rotation();
        const lastX = status?.transform.options?.angle_x ?? 0;
        const lastY = status?.transform.options?.angle_y ?? 0;
        const lastZ = status?.transform.options?.angle_z ?? 0;

        const nextX = nextFrame.transform.options?.angle_x ?? 0;
        const nextY = nextFrame.transform.options?.angle_y ?? 0;
        const nextZ = nextFrame.transform.options?.angle_z ?? 0;

        rot.configure({
          center: this.jointPoint,
          angleX: lastX * (1 - progress) + nextX * progress,
          angleY: lastY * (1 - progress) + nextY * progress,
          angleZ: lastZ * (1 - progress) + nextZ * progress,
        });

        matrix = rot.matrix;
        break;
      }
      case "scaling": {
        const scl = new Scaling();

        const lastX = status?.transform.options?.scale_x ?? 0;
        const lastY = status?.transform.options?.scale_y ?? 0;
        const lastZ = status?.transform.options?.scale_z ?? 0;

        const nextX = nextFrame.transform.options?.scale_x ?? 0;
        const nextY = nextFrame.transform.options?.scale_y ?? 0;
        const nextZ = nextFrame.transform.options?.scale_z ?? 0;

        scl.configure({
          center: this.jointPoint,
          sx: lastX * (1 - progress) + nextX * progress,
          sy: lastY * (1 - progress) + nextY * progress,
          sz: lastZ * (1 - progress) + nextZ * progress,
        });

        matrix = scl.matrix;
        break;
      }
      case "translation": {
        const tr = new Translation();

        const lastX = status?.transform.options?.x ?? 0;
        const lastY = status?.transform.options?.y ?? 0;
        const lastZ = status?.transform.options?.z ?? 0;

        const nextX = nextFrame.transform.options?.x ?? 0;
        const nextY = nextFrame.transform.options?.y ?? 0;
        const nextZ = nextFrame.transform.options?.z ?? 0;

        tr.configure({
          x: lastX * (1 - progress) + nextX * progress,
          y: lastY * (1 - progress) + nextY * progress,
          z: lastZ * (1 - progress) + nextZ * progress,
        });

        matrix = tr.matrix;
        break;
      }
    }

    return matrix;
  }

  static fromConfig(config: AnimatorConfig): Animator {
    const frameList: Frame[] = [];

    for (const frameConfig of config.animations) {
      frameList.push(frameConfig);
    }

    return new Animator(frameList, config.centerMass, config.cache ?? true);
  }
}

export interface AnimatorConfig {
  animations: Frame[];
  centerMass: Vertex;
  cache?: boolean;
}

export class AnimationRunner extends Listenable {
  private root: Object3D;
  private intervalId: number;

  constructor(private fps: number) {
    super();
  }

  private setActivate(root: Object3D, activate: boolean) {
    const queue = [root];

    while (queue.length > 0) {
      const current = queue.shift();
      const animator = current.findComponent(Animator);
      animator.setActive(activate);

      for (const child of current.childs) {
        queue.push(child);
      }
    }
  }

  run(object: Object3D) {
    this.root = object;

    this.setActivate(object, true);
    this.rerenderFrame();
  }

  stop() {
    clearInterval(this.intervalId);
    this.setActivate(this.root, true);

    this.root = null;
  }

  private rerenderFrame() {
    this.intervalId = setInterval(() => {
      this.notify();
    }, (1 / this.fps) * 1000);
  }
}
