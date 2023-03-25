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
    angleX?: number;
    angleY?: number;
    angleZ?: number;
    center?: Vertex;
}

export class Rotation extends Transformable {
    private axis: RotationAxis = RotationAxis.X;
    private angleX: number = 0;
    private angleY: number = 0;
    private angleZ: number = 0;
    private center: Vertex = new Vertex(0, 0, 0);

    get rotationAxis() {
        return this.axis;
    }

    get rotationAngleX() {
        return this.angleX;
    }

    get rotationAngleY() {
        return this.angleY;
    }

    get rotationAngleZ() {
        return this.angleZ;
    }   

    configure(config: RotationOptions) {
        config.axis && (this.axis = config.axis);
        config.angleX && (this.angleX = config.angleX);
        config.angleY && (this.angleY = config.angleY);
        config.angleZ && (this.angleZ = config.angleZ);
        config.center && (this.center = config.center);
        this.notify();
    }

    get matrix(): Matrix {
        let angleRad = 0;
        if (this.axis === RotationAxis.X) {
            angleRad = Geometry.angleDegToRad(this.angleX);
        } else if (this.axis === RotationAxis.Y) {
            angleRad = Geometry.angleDegToRad(this.angleY);
        } else if (this.axis === RotationAxis.Z) {
            angleRad = Geometry.angleDegToRad(this.angleZ);
        }
        const cos = Math.cos(angleRad);
        const sin = Math.sin(angleRad);

        // const cosX = Math.cos(Geometry.angleDegToRad(this.angleX));
        // const sinX = Math.sin(Geometry.angleDegToRad(this.angleX));

        // const cosY = Math.cos(Geometry.angleDegToRad(this.angleY));
        // const sinY = Math.sin(Geometry.angleDegToRad(this.angleY));

        // const cosZ = Math.cos(Geometry.angleDegToRad(this.angleZ));
        // const sinZ = Math.sin(Geometry.angleDegToRad(this.angleZ));

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