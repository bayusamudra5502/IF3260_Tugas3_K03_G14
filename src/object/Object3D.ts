import { Transform } from "../matrix/Transform";
import { increaseArray } from "../util/util";
import { Color } from "./Color";
import { Vector } from "./Vector";
import { Vertex } from "./Vertices";

export interface ObjectOptions {
  vertices: Vertex[];
  normal: Vector[];
  colors: Color[];
  indicies: number[];
  transform: Transform;
}

export class Object3D {
  constructor(private options: ObjectOptions) {}

  static load(json: string) {
    const data = JSON.parse(json);
    const options: ObjectOptions = {
      colors: [],
      vertices: [],
      normal: [],
      transform: new Transform(),
      indicies: [],
    };

    let length = 0;
    let faceIdx = 0;

    for (const face of data.vertices ?? []) {
      for (const vertex of face) {
        options.vertices.push(Vertex.load(vertex));
        length++;
      }

      for (let i = 0; i < length; i++) {
        options.normal.push(data.normal[faceIdx]);
      }

      length = 0;
      faceIdx++;
    }

    options.indicies = increaseArray(options.vertices.length);

    for (const color of data.colors ?? []) {
      options.colors.push(Color.load(color));
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

  get indicies() {
    return this.indicies;
  }

  get transform() {
    return this.options.transform;
  }
}
