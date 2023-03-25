import { Vertex } from "../object/Vertices";
import { Listenable } from "../util/Listenable";

export class TransformUi extends Listenable {
    private currentTransformIndex: number;
    private currentTranslation: Vertex;
    private currentRotation: string;
    private currentRotationValue: Vertex;
    private currentScale: Vertex;

    constructor(
        defaultRotation: "z" | "y" | "x" = "x",
        private options: TransformUiOptions = TRANSFORM_UI_DEFAULT_OPTIONS
        ) {
        super();

        this.currentTransformIndex = 0;
        this.currentTranslation = Vertex.load([0, 0, 0]);
        this.currentRotation = defaultRotation;
        this.currentRotationValue = Vertex.load([0, 0, 0]);
        this.currentScale = Vertex.load([1, 1, 1]);

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

        const rotationType = document.getElementById(
            this.options.idRotationType
        ) as HTMLSelectElement;
        const rotationValue = document.getElementById(
            this.options.idRotationValue
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

        translationX.value = `${this.currentTranslation.x}`;
        translationY.value = `${this.currentTranslation.y}`;
        translationZ.value = `${this.currentTranslation.z}`;

        rotationType.value = this.currentRotation;
        rotationValue.value = `${this.currentRotation}`;

        scaleX.value = `${this.currentScale.x}`;
        scaleY.value = `${this.currentScale.y}`;
        scaleZ.value = `${this.currentScale.z}`;
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

        const rotationType = document.getElementById(
            this.options.idRotationType
        ) as HTMLSelectElement;
        const rotationValue = document.getElementById(
            this.options.idRotationValue
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
            this.notify();
        }

        translationX.onchange = () => {
            const value = parseFloat(translationX.value);
            !Number.isNaN(value) && (this.currentTranslation.x = value);
            this.update();
            this.notify();
        }

        translationY.onchange = () => {
            const value = parseFloat(translationY.value);
            !Number.isNaN(value) && (this.currentTranslation.y = value);
            this.update();
            this.notify();
        }

        translationZ.onchange = () => {
            const value = parseFloat(translationZ.value);
            !Number.isNaN(value) && (this.currentTranslation.z = value);
            this.update();
            this.notify();
        }

        rotationType.onchange = () => {
            const value = rotationType.value;
            this.currentRotation = value;
            this.update();
            this.notify();
        }

        rotationValue.onchange = () => {
            const value = parseFloat(rotationValue.value);
            if (!Number.isNaN(value)) {
                if (this.currentRotation === "x") {
                    this.currentRotationValue.x = value;
                } else if (this.currentRotation === "y") {
                    this.currentRotationValue.y = value;
                } else if (this.currentRotation === "z") {
                    this.currentRotationValue.z = value;
                }
            }
            this.update();
            this.notify();
        }

        scaleX.onchange = () => {
            const value = parseFloat(scaleX.value);
            !Number.isNaN(value) && (this.currentScale.x = value);
            this.update();
            this.notify();
        }

        scaleY.onchange = () => {
            const value = parseFloat(scaleY.value);
            !Number.isNaN(value) && (this.currentScale.y = value);
            this.update();
            this.notify();
        }

        scaleZ.onchange = () => {
            const value = parseFloat(scaleZ.value);
            !Number.isNaN(value) && (this.currentScale.z = value);
            this.update();
            this.notify();
        }
    }
}

export interface TransformUiOptions {
    idTransformIndex: string;

    idTranslationX: string;
    idTranslationY: string;
    idTranslationZ: string;

    idRotationType: string;
    idRotationValue: string;

    idScaleX: string;
    idScaleY: string;
    idScaleZ: string;
}

export const TRANSFORM_UI_DEFAULT_OPTIONS: TransformUiOptions = {
    idTransformIndex: "transform-index",

    idTranslationX: "translation-x",
    idTranslationY: "translation-y",
    idTranslationZ: "translation-z",

    idRotationType: "rotation-type",
    idRotationValue: "rotation-value",

    idScaleX: "scale-x",
    idScaleY: "scale-y",
    idScaleZ: "scale-z"
};