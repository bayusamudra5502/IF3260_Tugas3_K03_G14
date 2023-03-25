import { Vertex } from "../object/Vertices";
import { Rotation, RotationAxis } from "../transform/Rotation";
import { Scaling } from "../transform/Scaling";
import { Transformable } from "../transform/Transformable";
import { Translation } from "../transform/Translation";
import { Listenable } from "../util/Listenable";

export class TransformUi extends Listenable {
  private currentTransformIndex: number;
  private currentTranslation: Translation;
  private currentRotation: Rotation;
  private currentScale: Scaling;
//   private currentRotationAxis: RotationAxis;

  constructor(
    private options: TransformUiOptions = TRANSFORM_UI_DEFAULT_OPTIONS
  ) {
    super();

    this.currentTransformIndex = 0;
    this.currentTranslation = new Translation();
    this.currentRotation = new Rotation();
    this.currentScale = new Scaling();
    // this.currentRotationAxis = RotationAxis.X;

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

    // const rotationType = document.getElementById(
    //   this.options.idRotationType
    // ) as HTMLSelectElement;
    // const rotationValue = document.getElementById(
    //   this.options.idRotationValue
    // ) as HTMLInputElement;
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

    // rotationType.value = `${this.currentRotation.rotationAxis}`;
    // if (this.currentRotation.rotationAxis === RotationAxis.X) {
    //     rotationValue.value = `${this.currentRotation.rotationAngleX}`;
    // } else if (this.currentRotation.rotationAxis === RotationAxis.Y) {
    //     rotationValue.value = `${this.currentRotation.rotationAngleY}`;
    // } else if (this.currentRotation.rotationAxis === RotationAxis.Z) {
    //     rotationValue.value = `${this.currentRotation.rotationAngleZ}`;
    // }
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

    // const rotationType = document.getElementById(
    //   this.options.idRotationType
    // ) as HTMLSelectElement;
    // const rotationValue = document.getElementById(
    //   this.options.idRotationValue
    // ) as HTMLInputElement;

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

    transformIndex.onchange = () => {
      const value = parseInt(transformIndex.value);
      !Number.isNaN(value) && (this.currentTransformIndex = value);
      this.update();
    };

    translationX.onchange = () => {
      const value = parseFloat(translationX.value);
      !Number.isNaN(value) &&
        // this.currentTranslation.X = value
        this.currentTranslation.configure({
          x: value,
        });
      this.update();
    };

    translationY.onchange = () => {
      const value = parseFloat(translationY.value);
      !Number.isNaN(value) &&
        // this.currentTranslation.y = value
        this.currentTranslation.configure({
          y: value,
        });
      this.update();
    };

    translationZ.onchange = () => {
      const value = parseFloat(translationZ.value);
      !Number.isNaN(value) &&
        // this.currentTranslation.z = value
        this.currentTranslation.configure({
          z: value,
        });
      this.update();
    };

    // rotationType.onchange = () => {
    //   const value = rotationType.value as RotationAxis;
    //   this.currentRotation.configure({
    //     axis: value,
    //   });
    //   this.update();
    // };

    // rotationValue.onchange = () => {
    //   const value = parseFloat(rotationValue.value);
    //   !Number.isNaN(value) &&
    //     (this.currentRotation.rotationAxis === RotationAxis.X
    //         ? this.currentRotation.configure({
    //             angleX: value,
    //             })
    //         : this.currentRotation.rotationAxis === RotationAxis.Y
    //         ? this.currentRotation.configure({
    //             angleY: value,
    //             })
    //         : 
    //         this.currentRotation.configure({
    //             angleZ: value,
    //             })
    //     );
    //   this.update();
    // };

    anglex.onchange = () => {
        // this.currentRotationAxis = RotationAxis.X;
        const value = parseFloat(anglex.value);
        !Number.isNaN(value) &&
            this.currentRotation.configure({
                axis: RotationAxis.X,
                angleX: value,
            });
        this.update();
    };

    angley.onchange = () => {
        // this.currentRotationAxis = RotationAxis.Y;
        const value = parseFloat(angley.value);
        !Number.isNaN(value) &&
            this.currentRotation.configure({
                axis: RotationAxis.Y,
                angleY: value,
            });
        this.update();
    };

    anglez.onchange = () => {
        // this.currentRotationAxis = RotationAxis.Z;
        const value = parseFloat(anglez.value);
        !Number.isNaN(value) &&
            this.currentRotation.configure({
                axis: RotationAxis.Z,
                angleZ: value,
            });
        this.update();
    };

    scaleX.onchange = () => {
      const value = parseFloat(scaleX.value);
      !Number.isNaN(value) &&
        this.currentScale.configure({
          sx: value,
        });
      this.update();
    };

    scaleY.onchange = () => {
      const value = parseFloat(scaleY.value);
      !Number.isNaN(value) &&
        this.currentScale.configure({
          sy: value,
        });
      this.update();
    };

    scaleZ.onchange = () => {
      const value = parseFloat(scaleZ.value);
      !Number.isNaN(value) &&
        this.currentScale.configure({
          sz: value,
        });
      this.update();
    };
  }
}

export interface TransformUiOptions {
  idTransformIndex: string;

  idTranslationX: string;
  idTranslationY: string;
  idTranslationZ: string;

//   idRotationType: string;
//   idRotationValue: string;
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

//   idRotationType: "rotation-type",
//   idRotationValue: "rotation-value",
    idRotationValueX: "rotation-x",
    idRotationValueY: "rotation-y",
    idRotationValueZ: "rotation-z",

  idScaleX: "scale-x",
  idScaleY: "scale-y",
  idScaleZ: "scale-z",
};
