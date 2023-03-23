import { Color } from "./Color";
import { Matrix } from "../matrix/Matrix";
import { Vertex } from "./Vertices";
import { Vector } from "./Vector";

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
    view: Matrix;
  };
  indices: number[];
  normals: Vector[];
  mode: DrawMode;
  lightSource: Vertex;
  useShading: boolean;
}
