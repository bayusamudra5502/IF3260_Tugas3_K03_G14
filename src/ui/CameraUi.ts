import { Listenable } from "../util/Listenable";

export class CameraUi extends Listenable {
  private radiusValue: number;

  private xAngleValue: number;
  private yAngleValue: number;

  constructor(config: CameraUiOptions = DEFAULT_CAMERAUI_OPTIONS) {
    super();
    this.bind(config);
  }

  get radius() {
    return this.radiusValue;
  }

  get xAngle() {
    return this.xAngleValue;
  }

  get yAngle() {
    return this.yAngleValue;
  }

  private bind(cameraOption: CameraUiOptions) {
    const radius = document.getElementById(
      cameraOption.idCameraRadius
    ) as HTMLInputElement;
    const xAngle = document.getElementById(
      cameraOption.idCameraXAngle
    ) as HTMLInputElement;
    const yAngle = document.getElementById(
      cameraOption.idCameraYAngle
    ) as HTMLInputElement;

    let radiusValue = document.getElementById(
      cameraOption.idCameraRadiusValue
    ) as HTMLInputElement;
    let xAngleValue = document.getElementById(
      cameraOption.idCameraXAngleValue
    ) as HTMLInputElement;
    let yAngleValue = document.getElementById(
      cameraOption.idCameraYAngleValue
    ) as HTMLInputElement;

    radius.oninput = () => {
      radiusValue.innerText = radius.value;
      this.radiusValue = parseFloat(radius.value);
      this.notify();
    };
    xAngle.oninput = () => {
      xAngleValue.innerText = xAngle.value;
      this.xAngleValue = parseFloat(xAngle.value);
      this.notify();
    };
    yAngle.oninput = () => {
      yAngleValue.innerText = yAngle.value;
      this.yAngleValue = parseFloat(yAngle.value);
      this.notify();
    };
  }
}

export interface CameraUiOptions {
  idCameraRadius: string;
  idCameraXAngle: string;
  idCameraYAngle: string;
  idCameraRadiusValue: string;
  idCameraXAngleValue: string;
  idCameraYAngleValue: string;
}

export const DEFAULT_CAMERAUI_OPTIONS: CameraUiOptions = {
  idCameraRadius: "camera-radius",
  idCameraXAngle: "camera-xangle",
  idCameraYAngle: "camera-yangle",
  idCameraRadiusValue: "camera-radius-value",
  idCameraXAngleValue: "camera-xangle-value",
  idCameraYAngleValue: "camera-yangle-value",
};
