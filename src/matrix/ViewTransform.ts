import { Geometry } from "../object/Geometry";
import { m4 } from "../util/camHelper";
import { Matrix } from "./Matrix";
import { Transform } from "./Transform";

export class ViewTransform extends Transform {
  constructor() {
    super();
    this.setupCamera();
  }

  update(cameraTransform: Matrix) {
    super.update(Matrix.inverse(cameraTransform));
    super.notify();
    return this;
  }

  notify() {
    const radius = parseFloat(
      (document.getElementById("camera-radius") as HTMLInputElement).value
    );
    const xAngle = parseInt(
      (document.getElementById("camera-xangle") as HTMLInputElement).value
    );
    const yAngle = parseInt(
      (document.getElementById("camera-yangle") as HTMLInputElement).value
    );
    // const zAngle = parseInt(
    //   (document.getElementById("camera-zangle") as HTMLInputElement).value
    // );

    // console.log(radius, xAngle, yAngle);

    let viewMatrix = m4.identity();
    viewMatrix = m4.rotate(
      viewMatrix,
      Geometry.angleDegToRad(xAngle),
      Geometry.angleDegToRad(yAngle),
      Geometry.angleDegToRad(0)
    );
    viewMatrix = m4.translate(viewMatrix, 0, 0, radius);
    // viewMatrix = m4.lookAt(
    //   [viewMatrix[12], viewMatrix[13], viewMatrix[14]],
    //   [0, 0, 0],
    //   [0, 1, 0]
    // );
    viewMatrix = m4.toMatrix(viewMatrix);
    this.update(viewMatrix);
  }

  setupCamera() {
    console.log("setupCamera");

    const radius = document.getElementById("camera-radius") as HTMLInputElement;
    const xAngle = document.getElementById("camera-xangle") as HTMLInputElement;
    const yAngle = document.getElementById("camera-yangle") as HTMLInputElement;
    // const zAngle = document.getElementById("camera-zangle") as HTMLInputElement;

    let radiusValue = document.getElementById(
      "camera-radius-value"
    ) as HTMLInputElement;
    let xAngleValue = document.getElementById(
      "camera-xangle-value"
    ) as HTMLInputElement;
    let yAngleValue = document.getElementById(
      "camera-yangle-value"
    ) as HTMLInputElement;
    // let zAngleValue = document.getElementById(
    //   "camera-zangle-value"
    // ) as HTMLInputElement;

    radius.oninput = () => {
      radiusValue.innerText = radius.value;
      this.notify();
    };
    xAngle.oninput = () => {
      xAngleValue.innerText = xAngle.value;
      this.notify();
    };
    yAngle.oninput = () => {
      yAngleValue.innerText = yAngle.value;
      this.notify();
    };
    // zAngle.oninput = () => {
    //   zAngleValue.innerText = zAngle.value;
    //   this.notify();
    // };
  }
}
