import { Color } from "./Color";
import { Matrix } from "./Transform";
import { Vertex } from "./Vertices";

export type DrawMode =
  | "line"
  | "point"
  | "line-loop"
  | "triangle"
  | "triangle-strip"
  | "triangle-fan";

export default interface DrawInfo {
  vertices: Vertex[];
  colors: Color[];
  matrix: {
    transform: Matrix;
    projection: Matrix;
    camera: Matrix;
  };
  indices: number[];
  mode: DrawMode;
}
