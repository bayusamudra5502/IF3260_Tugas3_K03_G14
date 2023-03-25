import { Matrix } from "../matrix/Matrix";
import { Transformable } from "./Transformable";

export interface ScalingOptions {
    sx?: number;
    sy?: number;
    sz?: number;
}

export class Scaling extends Transformable {
    private sx = 1;
    private sy = 1;
    private sz = 1;

    configure(option: ScalingOptions) {
        option.sx && (this.sx = option.sx);
        option.sy && (this.sy = option.sy);
        option.sz && (this.sz = option.sz);

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