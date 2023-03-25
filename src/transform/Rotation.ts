import { Matrix } from "../matrix/Matrix";
import { Geometry } from "../object/Geometry";
import { Vertex } from "../object/Vertices";
import { Transformable } from "./Transformable";
import { Translation } from "./Translation";

export enum RotationAxis {
    //Rotation axis (X, Y, Z)
    X = "x",
    Y = "y",
    Z = "z"
}

export interface RotationOptions {
    //Rotation axis
    axis?: RotationAxis;
    //Rotation angle in degree
    angle?: number;
    center?: Vertex;
}

export class Rotation extends Transformable {
    private axis: RotationAxis = RotationAxis.X;
    private angle: number = 0;
    private center: Vertex = new Vertex(0, 0, 0);

    get rotationAxis() {
        return this.axis;
    }

    get rotationAngle() {
        return this.angle;
    }

    configure(config: RotationOptions) {
        config.axis && (this.axis = config.axis);
        config.angle && (this.angle = config.angle);
        config.center && (this.center = config.center);
        this.notify();
    }

    get matrix(): Matrix {
        const angleRad = Geometry.angleDegToRad(this.angle);
        const cos = Math.cos(angleRad);
        const sin = Math.sin(angleRad);

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

        switch (this.axis) {
            case RotationAxis.X:
                const matrixRotationX = [
                    [1, 0, 0, 0],
                    [0, cos, -sin, 0],
                    [0, sin, cos, 0],
                    [0, 0, 0, 1],
                ]
                return Matrix.multiply(
                    moveBack.matrix,
                    Matrix.multiply(
                        matrixRotationX, moveToOrigin.matrix
                ));
            case RotationAxis.Y:
                const matrixRotationY = [
                    [cos, 0, sin, 0],
                    [0, 1, 0, 0],
                    [-sin, 0, cos, 0],
                    [0, 0, 0, 1],
                ]
                return Matrix.multiply(
                    moveBack.matrix,
                    Matrix.multiply(
                        matrixRotationY, moveToOrigin.matrix
                    )
                );
            case RotationAxis.Z:
                const matrixRotationZ = [
                    [cos, -sin, 0, 0],
                    [sin, cos, 0, 0],
                    [0, 0, 1, 0],
                    [0, 0, 0, 1],
                ]
                return Matrix.multiply(
                    moveBack.matrix,
                    Matrix.multiply(
                        matrixRotationZ, moveToOrigin.matrix
                    )
                );
        }
    }
}