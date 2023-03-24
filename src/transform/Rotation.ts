import { Matrix } from "../matrix/Matrix";
import { Geometry } from "../object/Geometry";
import { Transformable } from "./Transformable";

enum RotationAxis {
    //Rotation axis (X, Y, Z)
    X = 0,
    Y = 1,
    Z = 2
}

export interface RotationOptions {
    //Rotation axis
    axis?: RotationAxis;
    //Rotation angle in degree
    angle?: number;
}

export class Rotation extends Transformable {
    private axis: RotationAxis = RotationAxis.X;
    private angle: number = 0;

    get rotationAxis() {
        return this.axis;
    }

    get rotationAngle() {
        return this.angle;
    }

    configure(config: RotationOptions) {
        config.axis && (this.axis = config.axis);
        config.angle && (this.angle = config.angle);
        this.notify();
    }

    get matrix(): Matrix {
        const angleRad = Geometry.angleDegToRad(this.angle);
        const cos = Math.cos(angleRad);
        const sin = Math.sin(angleRad);

        switch (this.axis) {
            case RotationAxis.X:
                return [
                    [1, 0, 0, 0],
                    [0, cos, -sin, 0],
                    [0, sin, cos, 0],
                    [0, 0, 0, 1],
                ];
            case RotationAxis.Y:
                return [
                    [cos, 0, sin, 0],
                    [0, 1, 0, 0],
                    [-sin, 0, cos, 0],
                    [0, 0, 0, 1],
                ];
            case RotationAxis.Z:
                return [
                    [cos, -sin, 0, 0],
                    [sin, cos, 0, 0],
                    [0, 0, 1, 0],
                    [0, 0, 0, 1],
                ];
        }
    }
}