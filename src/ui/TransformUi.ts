import { Rotation, RotationAxis } from "../transform/Rotation";
import { Scaling } from "../transform/Scaling";
import { Translation } from "../transform/Translation";
import { Listenable } from "../util/Listenable";

export class TransformUi extends Listenable {
  private currentTransformIndex: number;
  private currentTranslation: Translation;
  private currentRotation: Rotation;
  private currentScale: Scaling;

  constructor(
    private options: TransformUiOptions = TRANSFORM_UI_DEFAULT_OPTIONS
  ) {
    super();

    this.currentTransformIndex = 0;
    this.currentTranslation = new Translation();
    this.currentRotation = new Rotation();
    this.currentScale = new Scaling();

    this.bind();
    this.update();
  }

  get transformIndex() {
    return this.currentTransformIndex;
  }

  get translation() {
    return this.currentTranslation;
  }

  get rotation() {
    return this.currentRotation;
  }

  get scale() {
    return this.currentScale;
  }

  set translation(trans) {
    this.currentTranslation = trans;
    this.setValue();
  }

  set rotation(rot) {
    this.currentRotation = rot;
    this.setValue();
  }

  set scale(size) {
    this.currentScale = size;
    this.setValue();
  }

  reset() {
    this.currentTranslation = new Translation();
    this.currentScale = new Scaling();
    this.currentRotation = new Rotation();
    this.setValue();
  }

  private update() {
    this.setValue();
    this.notify();
  }

  private setValue() {
    const translationX = document.getElementById(
      this.options.idTranslationX
    ) as HTMLInputElement;
    const translationY = document.getElementById(
      this.options.idTranslationY
    ) as HTMLInputElement;
    const translationZ = document.getElementById(
      this.options.idTranslationZ
    ) as HTMLInputElement;

    const anglex = document.getElementById(
      this.options.idRotationValueX
    ) as HTMLInputElement;
    const angley = document.getElementById(
      this.options.idRotationValueY
    ) as HTMLInputElement;
    const anglez = document.getElementById(
      this.options.idRotationValueZ
    ) as HTMLInputElement;

    const scaleX = document.getElementById(
      this.options.idScaleX
    ) as HTMLInputElement;
    const scaleY = document.getElementById(
      this.options.idScaleY
    ) as HTMLInputElement;
    const scaleZ = document.getElementById(
      this.options.idScaleZ
    ) as HTMLInputElement;

    const translationXValue = document.getElementById(
      this.options.idTranslationXValue
    ) as HTMLInputElement;
    const translationYValue = document.getElementById(
      this.options.idTranslationYValue
    ) as HTMLInputElement;
    const translationZValue = document.getElementById(
      this.options.idTranslationZValue
    ) as HTMLInputElement;

    const anglexVal = document.getElementById(
      this.options.idRotationValueXValue
    ) as HTMLInputElement;
    const angleyVal = document.getElementById(
      this.options.idRotationValueYValue
    ) as HTMLInputElement;
    const anglezVal = document.getElementById(
      this.options.idRotationValueZValue
    ) as HTMLInputElement;

    const scaleXVal = document.getElementById(
      this.options.idScaleXValue
    ) as HTMLInputElement;
    const scaleYVal = document.getElementById(
      this.options.idScaleYValue
    ) as HTMLInputElement;
    const scaleZVal = document.getElementById(
      this.options.idScaleZValue
    ) as HTMLInputElement;

    translationX.value = `${this.currentTranslation.X}`;
    translationY.value = `${this.currentTranslation.Y}`;
    translationZ.value = `${this.currentTranslation.Z}`;

    anglex.value = `${this.currentRotation.rotationAngleX}`;
    angley.value = `${this.currentRotation.rotationAngleY}`;
    anglez.value = `${this.currentRotation.rotationAngleZ}`;

    scaleX.value = `${this.currentScale.Sx}`;
    scaleY.value = `${this.currentScale.Sy}`;
    scaleZ.value = `${this.currentScale.Sz}`;

    translationXValue.innerText = `${this.currentTranslation.X}`;
    translationYValue.innerText = `${this.currentTranslation.Y}`;
    translationZValue.innerText = `${this.currentTranslation.Z}`;

    anglexVal.innerText = `${this.currentRotation.rotationAngleX}`;
    angleyVal.innerText = `${this.currentRotation.rotationAngleY}`;
    anglezVal.innerText = `${this.currentRotation.rotationAngleZ}`;

    scaleXVal.innerText = `${this.currentScale.Sx}`;
    scaleYVal.innerText = `${this.currentScale.Sy}`;
    scaleZVal.innerText = `${this.currentScale.Sz}`;
  }

  private bind() {
    const translationX = document.getElementById(
      this.options.idTranslationX
    ) as HTMLInputElement;
    const translationY = document.getElementById(
      this.options.idTranslationY
    ) as HTMLInputElement;
    const translationZ = document.getElementById(
      this.options.idTranslationZ
    ) as HTMLInputElement;

    const anglex = document.getElementById(
      this.options.idRotationValueX
    ) as HTMLInputElement;
    const angley = document.getElementById(
      this.options.idRotationValueY
    ) as HTMLInputElement;
    const anglez = document.getElementById(
      this.options.idRotationValueZ
    ) as HTMLInputElement;

    const scaleX = document.getElementById(
      this.options.idScaleX
    ) as HTMLInputElement;
    const scaleY = document.getElementById(
      this.options.idScaleY
    ) as HTMLInputElement;
    const scaleZ = document.getElementById(
      this.options.idScaleZ
    ) as HTMLInputElement;

    translationX.oninput = () => {
      const value = parseFloat(translationX.value);
      !Number.isNaN(value) &&
        this.currentTranslation.configure({
          x: value,
        });
      this.update();

      changeInnerText(`${this.options.idTranslationX}-value`, value.toString());
    };

    translationY.oninput = () => {
      const value = parseFloat(translationY.value);
      !Number.isNaN(value) &&
        this.currentTranslation.configure({
          y: value,
        });
      this.update();

      changeInnerText(`${this.options.idTranslationY}-value`, value.toString());
    };

    translationZ.oninput = () => {
      const value = parseFloat(translationZ.value);
      !Number.isNaN(value) &&
        this.currentTranslation.configure({
          z: value,
        });
      this.update();

      changeInnerText(`${this.options.idTranslationZ}-value`, value.toString());
    };

    anglex.oninput = () => {
      const value = parseFloat(anglex.value);
      !Number.isNaN(value) &&
        this.currentRotation.configure({
          axis: RotationAxis.X,
          angleX: value,
        });
      this.update();

      changeInnerText(
        `${this.options.idRotationValueX}-value`,
        value.toString()
      );
    };

    angley.oninput = () => {
      const value = parseFloat(angley.value);
      !Number.isNaN(value) &&
        this.currentRotation.configure({
          axis: RotationAxis.Y,
          angleY: value,
        });
      this.update();

      changeInnerText(
        `${this.options.idRotationValueY}-value`,
        value.toString()
      );
    };

    anglez.oninput = () => {
      const value = parseFloat(anglez.value);
      !Number.isNaN(value) &&
        this.currentRotation.configure({
          axis: RotationAxis.Z,
          angleZ: value,
        });
      this.update();

      changeInnerText(
        `${this.options.idRotationValueZ}-value`,
        value.toString()
      );
    };

    scaleX.oninput = () => {
      const value = parseFloat(scaleX.value);
      !Number.isNaN(value) &&
        this.currentScale.configure({
          sx: value,
        });
      this.update();

      changeInnerText(`${this.options.idScaleX}-value`, value.toString());
    };

    scaleY.oninput = () => {
      const value = parseFloat(scaleY.value);
      !Number.isNaN(value) &&
        this.currentScale.configure({
          sy: value,
        });
      this.update();

      changeInnerText(`${this.options.idScaleY}-value`, value.toString());
    };

    scaleZ.oninput = () => {
      const value = parseFloat(scaleZ.value);
      !Number.isNaN(value) &&
        this.currentScale.configure({
          sz: value,
        });
      this.update();

      changeInnerText(`${this.options.idScaleZ}-value`, value.toString());
    };
  }
}

export interface TransformUiOptions {
  idTranslationX: string;
  idTranslationY: string;
  idTranslationZ: string;

  idRotationValueX: string;
  idRotationValueY: string;
  idRotationValueZ: string;

  idScaleX: string;
  idScaleY: string;
  idScaleZ: string;

  idTranslationXValue: string;
  idTranslationYValue: string;
  idTranslationZValue: string;

  idRotationValueXValue: string;
  idRotationValueYValue: string;
  idRotationValueZValue: string;

  idScaleXValue: string;
  idScaleYValue: string;
  idScaleZValue: string;
}

export const TRANSFORM_UI_DEFAULT_OPTIONS: TransformUiOptions = {
  idTranslationX: "translation-x",
  idTranslationY: "translation-y",
  idTranslationZ: "translation-z",

  idRotationValueX: "rotation-x",
  idRotationValueY: "rotation-y",
  idRotationValueZ: "rotation-z",

  idScaleX: "scale-x",
  idScaleY: "scale-y",
  idScaleZ: "scale-z",

  idTranslationXValue: "translation-x-value",
  idTranslationYValue: "translation-y-value",
  idTranslationZValue: "translation-z-value",

  idRotationValueXValue: "rotation-x-value",
  idRotationValueYValue: "rotation-y-value",
  idRotationValueZValue: "rotation-z-value",

  idScaleXValue: "scale-x-value",
  idScaleYValue: "scale-y-value",
  idScaleZValue: "scale-z-value",
};

function changeInnerText(id: string, amount: string) {
  const element = document.getElementById(id) as HTMLInputElement;
  element.innerText = amount;
}
