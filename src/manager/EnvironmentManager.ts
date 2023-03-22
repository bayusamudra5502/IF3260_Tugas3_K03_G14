import { Transform } from "../matrix/Transform";
import { ViewTransform } from "../matrix/ViewTransform";
import { Vector } from "../object/Vector";
import { Vertex } from "../object/Vertices";
import { Listenable } from "./Listenable";
import { ProjectionManager } from "./ProjectionManager";

export interface EnvironmentOptions {
  sourceLight?: Vertex;
  cameraTransform?: Transform;
  projection?: ProjectionManager;
}

export class EnvironmentManager extends Listenable {
  private sourceLightData: Vertex;
  private viewTransformData: ViewTransform = new ViewTransform();
  private projectionData: ProjectionManager = new ProjectionManager();

  update(options: EnvironmentOptions) {
    options.projection && (this.projectionData = options.projection);
    options.cameraTransform &&
      this.viewTransformData.update(options.cameraTransform.matrix);
    options.sourceLight && (this.sourceLightData = options.sourceLight);
    this.notify();
  }

  get sourceLight() {
    return this.sourceLightData;
  }

  get viewMatrix() {
    return this.viewTransformData.matrix;
  }

  get projectionMatrix() {
    return this.projectionData.matrix;
  }
}
