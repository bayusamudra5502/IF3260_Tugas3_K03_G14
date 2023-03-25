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
  center: Vertex;
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
      center: new Vertex(0,0,0)
    };

    let length = 0;
    let faceIdx = 0;

    for (const face of data.vertices ?? []) {
      for (const vertex of face) {
        options.vertices.push(Vertex.load(vertex));
        options.center.x += vertex.x;
        options.center.y += vertex.y;
        options.center.z += vertex.z;

        length++;
      }

      for (let i = 0; i < length; i++) {
        options.normal.push(Vector.load(data.normal[faceIdx]));
      }

      for (let i = 0; i < length; i++) {
        if (data.colors instanceof Array) {
          if (data.colors[faceIdx] instanceof Array) {
            if (data.colors[faceIdx][i] instanceof Array) {
              options.colors.push(Color.load(data.colors[faceIdx][i]));
            } else if (typeof data.colors[faceIdx][i] === "string") {
              options.colors.push(Color.hex(data.colors[faceIdx][i]));
            } else if (typeof data.colors[faceIdx][0] === "number") {
              options.colors.push(Color.load(data.colors[faceIdx]));
            } else {
              new Error("unknown color type");
            }
          } else if (typeof data.colors[faceIdx] === "string") {
            options.colors.push(Color.hex(data.colors[faceIdx]));
          } else {
            new Error("unknown color type");
          }
        } else if (typeof data.colors === "string") {
          options.colors.push(Color.hex(data.colors));
        } else {
          new Error("unknown color type");
        }
      }

      length = 0;
      faceIdx++;
    }

    options.center.x /= options.vertices.length;
    options.center.y /= options.vertices.length;
    options.center.z /= options.vertices.length;

    options.indicies = increaseArray(options.vertices.length);

    return new Object3D(options);
  }

  get colors() {
    return this.options.colors;
  }

  get vertices() {
    return this.options.vertices;
  }

  get center(){
    return this.options.center;
  }

  get normal() {
    return this.options.normal;
  }

  get indicies() {
    return this.options.indicies;
  }

  get transform() {
    return this.options.transform;
  }
}
