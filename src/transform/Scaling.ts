import { Matrix } from "../matrix/Matrix";
import { Transformable } from "./Transformable";

export interface ScalingOptions {
    s?: number;
}

export class Scaling extends Transformable {
    private sx = 1;
    private sy = 1;
    private sz = 1;

    configure(option: ScalingOptions) {
        option.s && (this.sx = this.sy = this.sz = option.s);

        return this;
    }

    get matrix(): Matrix {
        return [
            [this.sx, 0, 0, 0],
            [0, this.sy, 0, 0],
            [0, 0, this.sz, 0],
            [0, 0, 0, 1],
        ];
    }

}