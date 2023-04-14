import { CameraManager } from "./CameraManager";
import { Color } from "../object/Color";
import { Vertex } from "../object/Vertices";
import { Listenable } from "../util/Listenable";
import { ProjectionManager } from "./ProjectionManager";
import { TransformManager } from "./TransformManager";

export interface EnvironmentOptions {
  sourceLight?: Vertex;
  sourceLightColor?: Color;
  projection?: ProjectionManager;

  cameraManager?: CameraManager;
  useShading?: boolean;
}

export class EnvironmentManager extends Listenable {
  private sourceLightData: Vertex = new Vertex(0, 0, 1);
  private projectionData: ProjectionManager = new ProjectionManager();
  private cameraManager: CameraManager;
  private useShadingData: boolean = true;
  private sourceLightColor: Color = Color.hex("#FFFFFF");

  update(options: EnvironmentOptions) {
    options.projection && (this.projectionData = options.projection);
    options.cameraManager && (this.cameraManager = options.cameraManager);
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
    return this.cameraManager.matrix;
  }

  get projectionMatrix() {
    return this.projectionData.matrix;
  }

  get useShading() {
    return this.useShadingData;
  }
}
