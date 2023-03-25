import { Color } from "../object/Color";
import { Vertex } from "../object/Vertices";
import { Listenable } from "../util/Listenable";

export class LightUi extends Listenable {
  private currentUseShading: boolean;
  private currentLightPosition: Vertex;
  private currentLightColor: Color;

  constructor(private options: LightUiOptions = DEFAULT_LIGHTUI_OPTIONS) {
    super();

    this.currentUseShading = options.defaultUseShading;
    this.currentLightPosition = Vertex.load(options.defaultPosition.getArray());
    this.currentLightColor = Color.load(options.defaultColor.getArray());

    this.bind();
    this.update();
  }

  get useShading() {
    return this.currentUseShading;
  }

  get lightPosition() {
    return this.currentLightPosition;
  }

  get lightColor() {
    return this.currentLightColor;
  }

  private update() {
    this.setValue();
    this.setLocationState();
  }

  private setValue() {
    const lightX = document.getElementById(
      this.options.idLightX
    ) as HTMLInputElement;
    const lightY = document.getElementById(
      this.options.idLightY
    ) as HTMLInputElement;
    const lightZ = document.getElementById(
      this.options.idLightZ
    ) as HTMLInputElement;
    const lightColor = document.getElementById(
      this.options.idLightColor
    ) as HTMLInputElement;

    lightX.value = `${this.currentLightPosition.x}`;
    lightY.value = `${this.currentLightPosition.y}`;
    lightZ.value = `${this.currentLightPosition.z}`;
    lightColor.value = this.currentLightColor.getHex();
  }

  private setLocationState() {
    const lightX = document.getElementById(
      this.options.idLightX
    ) as HTMLInputElement;
    const lightY = document.getElementById(
      this.options.idLightY
    ) as HTMLInputElement;
    const lightZ = document.getElementById(
      this.options.idLightZ
    ) as HTMLInputElement;
    const lightColor = document.getElementById(
      this.options.idLightColor
    ) as HTMLInputElement;

    lightX.disabled = !this.currentUseShading;
    lightY.disabled = !this.currentUseShading;
    lightZ.disabled = !this.currentUseShading;
    lightColor.disabled = !this.currentUseShading;
  }

  private bind() {
    const checkbox = document.getElementById(
      this.options.idUseShadingCheckbox
    ) as HTMLInputElement;
    const lightX = document.getElementById(
      this.options.idLightX
    ) as HTMLInputElement;
    const lightY = document.getElementById(
      this.options.idLightY
    ) as HTMLInputElement;
    const lightZ = document.getElementById(
      this.options.idLightZ
    ) as HTMLInputElement;
    const lightColor = document.getElementById(
      this.options.idLightColor
    ) as HTMLInputElement;

    checkbox.onchange = () => {
      this.currentUseShading = checkbox.checked;
      this.update();
      this.notify();
    };

    lightX.onchange = () => {
      const value = parseFloat(lightX.value);
      !Number.isNaN(value) && (this.currentLightPosition.x = value);
      this.notify();
    };

    lightY.onchange = () => {
      const value = parseFloat(lightY.value);
      !Number.isNaN(value) && (this.currentLightPosition.y = value);
      this.notify();
    };

    lightZ.onchange = () => {
      const value = parseFloat(lightZ.value);
      !Number.isNaN(value) && (this.currentLightPosition.z = value);
      this.notify();
    };

    lightColor.onchange = () => {
      const value = lightColor.value;
      this.currentLightColor = Color.hex(value);
      this.notify();
    };
  }
}

export interface LightUiOptions {
  idUseShadingCheckbox: string;
  idLightX: string;
  idLightY: string;
  idLightZ: string;
  idLightColor: string;

  defaultUseShading: boolean;
  defaultPosition: Vertex;
  defaultColor: Color;
}

export const DEFAULT_LIGHTUI_OPTIONS: LightUiOptions = {
  idUseShadingCheckbox: "use-shading-check",
  idLightX: "light-x",
  idLightY: "light-y",
  idLightZ: "light-z",
  idLightColor: "light-color",

  defaultUseShading: true,
  defaultPosition: new Vertex(0, 0, 1),
  defaultColor: Color.hex("#FFFFFF"),
};
