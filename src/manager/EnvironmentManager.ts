import { ViewTransform } from "../matrix/ViewTransform";
import { Color } from "../object/Color";
import { Vertex } from "../object/Vertices";
import { Listenable } from "../util/Listenable";
import { ProjectionManager } from "./ProjectionManager";
import { TransformManager } from "./TransformManager";

export interface EnvironmentOptions {
  sourceLight?: Vertex;
  sourceLightColor?: Color;
  cameraTransform?: TransformManager;
  projection?: ProjectionManager;

  viewTransform?: ViewTransform;
  useShading?: boolean;
}

export class EnvironmentManager extends Listenable {
  private sourceLightData: Vertex = new Vertex(0, 0, 1);
  private projectionData: ProjectionManager = new ProjectionManager();
  private viewTransform: ViewTransform;
  private useShadingData: boolean = true;
  private sourceLightColor: Color = Color.hex("#FFFFFF");

  reset() {
    this.sourceLightData = new Vertex(0, 0, 1);
    this.projectionData = new ProjectionManager();
    // LANJUTIN
  }

  update(options: EnvironmentOptions) {
    options.projection && (this.projectionData = options.projection);
    // options.cameraTransform && this.configureCamera(options.cameraTransform);
    options.viewTransform && (this.viewTransform = options.viewTransform);
    options.sourceLight && (this.sourceLightData = options.sourceLight);
    options.useShading != undefined &&
      (this.useShadingData = options.useShading);
    options.sourceLightColor &&
      (this.sourceLightColor = options.sourceLightColor);

    this.notify();
  }

  get lightColor() {
    return this.sourceLightColor;
  }

  get lightPosition() {
    return this.sourceLightData;
  }

  get viewMatrix() {
    return this.viewTransform.matrix;
  }

  get projectionMatrix() {
    return this.projectionData.matrix;
  }

  get useShading() {
    return this.useShadingData;
  }
}
