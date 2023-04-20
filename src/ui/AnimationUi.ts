import { Listenable } from "../util/Listenable";

export class AnimationUi extends Listenable {
  private checkRun: HTMLInputElement;
  private checkInverted: HTMLInputElement;
  private nextButton: HTMLButtonElement;
  private prevButton: HTMLButtonElement;
  private fpsInput: HTMLInputElement;
  private fpsTextValue: HTMLSpanElement;

  constructor(option: AnimationUiOptions = ANIMATION_UI_OPTION_DEFAULT) {
    super();
    this.bind(option);
  }

  private bind(option: AnimationUiOptions) {
    this.checkRun = document.getElementById(
      option.checkRunAnimationUi
    ) as HTMLInputElement;
    this.checkInverted = document.getElementById(
      option.checkInvertedAnimationUi
    ) as HTMLInputElement;
    this.nextButton = document.getElementById(
      option.buttonNext
    ) as HTMLButtonElement;
    this.prevButton = document.getElementById(
      option.buttonPrev
    ) as HTMLButtonElement;
    this.fpsInput = document.getElementById(
      option.fpsInput
    ) as HTMLInputElement;
    this.fpsTextValue = document.getElementById(option.fpsTextValue);

    this.fpsInput.oninput = () => {
      this.fpsTextValue.innerText = `${this.fpsInput.value}`;
      this.notify("fps-rate");
    };

    this.checkRun.oninput = () => {
      this.notify("run-animation");
    };

    this.checkInverted.oninput = () => this.notify("inverted");

    this.nextButton.onclick = () => {
      this.notify("next-frame");
    };

    this.prevButton.onclick = () => {
      this.notify("prev-frame");
    };
  }

  get inverted() {
    return this.checkInverted.checked;
  }

  get started() {
    return this.checkRun.checked;
  }

  get fps() {
    return parseInt(this.fpsInput.value);
  }
}

export interface AnimationUiOptions {
  checkRunAnimationUi: string;
  checkInvertedAnimationUi: string;
  buttonPrev: string;
  buttonNext: string;
  fpsInput: string;
  fpsTextValue: string;
}

export const ANIMATION_UI_OPTION_DEFAULT: AnimationUiOptions = {
  checkRunAnimationUi: "check-run-animation",
  checkInvertedAnimationUi: "check-inverted-animation",
  buttonPrev: "animation-prev",
  buttonNext: "animation-next",
  fpsInput: "frame-fps",
  fpsTextValue: "frame-fps-value",
};
