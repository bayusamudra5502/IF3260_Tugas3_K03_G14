import { IDENTITY_MATRIX, Matrix } from "../matrix/Matrix";
import { Geometry } from "../object/Geometry";
import { Vertex } from "../object/Vertices";
import { Rotation } from "../transform/Rotation";
import { Scaling } from "../transform/Scaling";
import { Transformable } from "../transform/Transformable";
import { Translation } from "../transform/Translation";

export interface Frame {
  frame_number: number;
  transform: FrameTransformationConfig;
}

export interface FrameTransformationConfig {
  type: "rotation" | "scaling" | "translation";
  options: any;
}
