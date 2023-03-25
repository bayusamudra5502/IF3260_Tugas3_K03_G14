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
    private angleX: number = 0;
    private angleY: number = 0;
    private angleZ: number = 0;
    private center: Vertex = new Vertex(0, 0, 0);

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
        config.angleX && (this.angleX = config.angleX);
        config.angleY && (this.angleY = config.angleY);
        config.angleZ && (this.angleZ = config.angleZ);
        config.center && (this.center = config.center);
        this.notify();
    }

    private generateXRotation(angleRad: number) {
        const cos = Math.cos(angleRad);
        const sin = Math.sin(angleRad);
        
        return [
            [1, 0, 0, 0],
            [0, cos, -sin, 0],
            [0, sin, cos, 0],
            [0, 0, 0, 1],
        ];
    }
    
    private generateYRotation(angleRad: number) {
        const cos = Math.cos(angleRad);
        const sin = Math.sin(angleRad);
        return [
            [cos, 0, sin, 0],
            [0, 1, 0, 0],
            [-sin, 0, cos, 0],
            [0, 0, 0, 1],
        ]
    }
    
    private generateZRotation(angleRad: number) {
        const cos = Math.cos(angleRad);
        const sin = Math.sin(angleRad);
        return  [
            [cos, -sin, 0, 0],
            [sin, cos, 0, 0],
            [0, 0, 1, 0],
            [0, 0, 0, 1],
        ]
    }

    get matrix(): Matrix {
        const XMatrix = this.generateXRotation(Geometry.angleDegToRad(this.angleX));
        const YMatrix = this.generateYRotation(Geometry.angleDegToRad(this.angleY));
        const ZMatrix = this.generateZRotation(Geometry.angleDegToRad(this.angleZ));

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

        return Matrix.multiply(
            moveBack.matrix,
            Matrix.multiply(
                ZMatrix,
                Matrix.multiply(
                    YMatrix,
                    Matrix.multiply(
                        XMatrix,
                        moveToOrigin.matrix
                    )
                )
            )
        )
    }
}