import { Matrix } from "../matrix/Matrix";
import { Vector } from "../object/Vector";
import { Vertex } from "../object/Vertices";
import { Transformable } from "./Transformable";
import { Translation } from "./Translation";

export interface ScalingOptions {
    sx?: number;
    sy?: number;
    sz?: number;
    
    center?: Vertex;
}

export class Scaling extends Transformable {
    private sx = 1;
    private sy = 1;
    private sz = 1;
    private center: Vertex = new Vertex(0,0,0);

    configure(option: ScalingOptions) {
        option.sx && (this.sx = option.sx);
        option.sy && (this.sy = option.sy);
        option.sz && (this.sz = option.sz);
        option.center && (this.center = option.center);

        return this;
    }

    get Sx() {
        return this.sx;
    }

    get Sy() {
        return this.sy;
    }

    get Sz() {
        return this.sz;
    }

    get matrix(): Matrix {
        const moveToOrigin = new Translation();
        const moveBack = new Translation();

        moveToOrigin.configure({
            x: -this.center.x,
            y: -this.center.y,
            z: -this.center.z,
        })
        
        moveBack.configure({
            x: this.center.x,
            y: this.center.y,
            z: this.center.z,
        })

        const matrixScaling: Matrix = [
            [this.sx, 0, 0, 0],
            [0, this.sy, 0, 0],
            [0, 0, this.sz, 0],
            [0, 0, 0, 1],
        ];

        return Matrix.multiply(
            moveBack.matrix,
            Matrix.multiply(
                matrixScaling, moveToOrigin.matrix
            )
        );
    }

}