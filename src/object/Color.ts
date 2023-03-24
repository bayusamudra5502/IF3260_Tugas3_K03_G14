import { padding } from "../util/util";

export class Color {
  constructor(
    public r: number = 0,
    public g: number = 0,
    public b: number = 0,
    public a: number = 0
  ) {}

  static hex(color: string) {
    var result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(
      color.toLowerCase()
    );
    return result
      ? new Color(
          parseInt(result[1], 16) / 255,
          parseInt(result[2], 16) / 255,
          parseInt(result[3], 16) / 255,
          1
        )
      : null;
  }

  static load(colors: number[]) {
    return new Color(colors[0], colors[1], colors[2], 1);
  }

  public getArray(): number[] {
    return [this.r, this.g, this.b, this.a];
  }

  public getHex() {
    const r = padding((this.r * 255).toString(16));
    const g = padding((this.g * 255).toString(16));
    const b = padding((this.b * 255).toString(16));

    return `#${r}${g}${b}`;
  }
}
