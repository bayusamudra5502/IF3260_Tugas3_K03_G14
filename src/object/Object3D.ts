import { Matrix } from "../matrix/Matrix";
import { Transform } from "../matrix/Transform";
import { Color } from "./Color";
import { Vector } from "./Vector";
import { Vertex } from "./Vertices";

export interface ObjectGlobal {
  transform: Transform;
  view: Transform;
  projection: Transform;
  light: Vector;
}

export interface ObjectOptions {
  vertices: Vertex[];
  normal: Vector[];
  colors: Color[];
  matrix: {
    transform: Transform;
    view: Transform;
    projection: Transform;
  };
  light: Vector;
}

export class Object3D {
  constructor(private options: ObjectOptions) {}

  static load(json: string, global: ObjectGlobal) {
    const data = JSON.parse(json);
    const options: ObjectOptions = {
      colors: [],
      vertices: [],
      normal: [],
      matrix: global,
      light: global.light,
    };

    for (const vertex of data.vertices ?? []) {
      options.vertices.push(Vertex.load(vertex));
    }

    for (const color of data.colors ?? []) {
      options.colors.push(Color.load(color));
    }

    for (const normal of data.normal ?? []) {
      options.normal.push(Vector.load(normal));
    }

    return new Object3D(data);
  }

  get colors() {
    return this.options.colors;
  }

  get vertices() {
    return this.options.vertices;
  }

  get normal() {
    return this.options.normal;
  }

  get transformMatrix() {
    return this.options.matrix.transform;
  }

  get viewMatrix() {
    return this.options.matrix.view;
  }

  get projectionMatrix() {
    return this.options.matrix.projection;
  }
}
