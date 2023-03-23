import { ViewTransform } from "../matrix/ViewTransform";
import { Vertex } from "../object/Vertices";
import { Listenable } from "./Listenable";
import { ProjectionManager } from "./ProjectionManager";
import { TransformManager } from "./TransformManager";

export interface EnvironmentOptions {
  sourceLight?: Vertex;
  cameraTransform?: TransformManager;
  projection?: ProjectionManager;
}

export class EnvironmentManager extends Listenable {
  private sourceLightData: Vertex;
  private projectionData: ProjectionManager = new ProjectionManager();
  private cameraTransform: TransformManager = new TransformManager();

  update(options: EnvironmentOptions) {
    options.projection && (this.projectionData = options.projection);
    options.cameraTransform && (this.cameraTransform = options.cameraTransform);
    options.sourceLight && (this.sourceLightData = options.sourceLight);

    this.notify();
  }

  get sourceLight() {
    return this.sourceLightData;
  }

  get viewMatrix() {
    const viewMatrix = new ViewTransform();
    viewMatrix.update(this.cameraTransform.matrix);

    return viewMatrix.matrix;
  }

  get projectionMatrix() {
    return this.projectionData.matrix;
  }
}
