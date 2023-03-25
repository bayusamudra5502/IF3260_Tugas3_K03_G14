import { ViewTransform } from "../matrix/ViewTransform";
import { Vertex } from "../object/Vertices";
import { Listenable } from "../util/Listenable";
import { ProjectionManager } from "./ProjectionManager";
import { TransformManager } from "./TransformManager";

export interface EnvironmentOptions {
  sourceLight?: Vertex;
  cameraTransform?: TransformManager;
  projection?: ProjectionManager;

  viewTransform?: ViewTransform;
}

export class EnvironmentManager extends Listenable {
  private sourceLightData: Vertex = new Vertex(0, 0, 1);
  private projectionData: ProjectionManager = new ProjectionManager();
  private viewTransform: ViewTransform;

  update(options: EnvironmentOptions) {
    options.projection && (this.projectionData = options.projection);
    // options.cameraTransform && this.configureCamera(options.cameraTransform);
    options.viewTransform && (this.viewTransform = options.viewTransform);
    options.sourceLight && (this.sourceLightData = options.sourceLight);

    this.notify();
  }

  get sourceLight() {
    return this.sourceLightData;
  }

  get viewMatrix() {
    return this.viewTransform.matrix;
  }

  get projectionMatrix() {
    return this.projectionData.matrix;
  }
}
