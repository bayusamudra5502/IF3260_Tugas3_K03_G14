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

  private update() {
    this.setValue();
    this.notify();
  }

  private setValue() {
    const transformIndex = document.getElementById(
      this.options.idTransformIndex
    ) as HTMLSelectElement;

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

    transformIndex.value = `${this.currentTransformIndex}`;

    translationX.value = `${this.currentTranslation.X}`;
    translationY.value = `${this.currentTranslation.Y}`;
    translationZ.value = `${this.currentTranslation.Z}`;

    anglex.value = `${this.currentRotation.rotationAngleX}`;
    angley.value = `${this.currentRotation.rotationAngleY}`;
    anglez.value = `${this.currentRotation.rotationAngleZ}`;

    scaleX.value = `${this.currentScale.Sx}`;
    scaleY.value = `${this.currentScale.Sy}`;
    scaleZ.value = `${this.currentScale.Sz}`;
  }

  private bind() {
    const transformIndex = document.getElementById(
      this.options.idTransformIndex
    ) as HTMLSelectElement;

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

    transformIndex.oninput = () => {
      const value = parseInt(transformIndex.value);
      !Number.isNaN(value) && (this.currentTransformIndex = value);
      this.update();
    };

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
  idTransformIndex: string;

  idTranslationX: string;
  idTranslationY: string;
  idTranslationZ: string;

  idRotationValueX: string;
  idRotationValueY: string;
  idRotationValueZ: string;

  idScaleX: string;
  idScaleY: string;
  idScaleZ: string;
}

export const TRANSFORM_UI_DEFAULT_OPTIONS: TransformUiOptions = {
  idTransformIndex: "transform-index",

  idTranslationX: "translation-x",
  idTranslationY: "translation-y",
  idTranslationZ: "translation-z",

  idRotationValueX: "rotation-x",
  idRotationValueY: "rotation-y",
  idRotationValueZ: "rotation-z",

  idScaleX: "scale-x",
  idScaleY: "scale-y",
  idScaleZ: "scale-z",
};

function changeInnerText(id: string, amount: string) {
  const element = document.getElementById(id) as HTMLInputElement;
  element.innerText = amount;
}
