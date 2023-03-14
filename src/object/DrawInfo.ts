import { Color } from "./Color";
import { TransformMatrix } from "./Transform";
import { Vertices } from "./Vertices";

export type DrawMode =
  | "line"
  | "point"
  | "line-loop"
  | "triangle"
  | "triangle-strip"
  | "triangle-fan";

export default interface DrawInfo {
  vertices: Vertices[];
  colors: Color[];
  matrix: {
    transformation: TransformMatrix;
  };
  mode: DrawMode;
}
