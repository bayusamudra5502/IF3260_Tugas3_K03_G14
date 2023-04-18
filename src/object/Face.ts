import { Transform } from "../matrix/Transform";
import { Color } from "./Color";
import { Vector } from "./Vector";
import { Vertex } from "./Vertices";

export interface FaceOptions {
  vertices: Vertex[];
  colors: Color[];
  isInverted: boolean;
}

export class Face {
  private verticesData: Vertex[];
  private colorsData: Color[];
  private indiciesData: number[];

  private normalData: Vector[];

  constructor(options: FaceOptions) {
    this.verticesData = options.isInverted
      ? options.vertices.reverse()
      : options.vertices;

    this.colorsData = options.colors;

    this.makeTriangle();
    this.calculateNormal();
  }

  get vertices() {
    return this.indiciesData;
  }

  get colors() {
    return this.colorsData;
  }

  get indicies() {
    return this.indiciesData;
  }

  get normals() {
    return this.normals;
  }

  private makeTriangle() {
    const newIndicies = [];

    for (let i = 1; i < this.indiciesData.length - 1; i++) {
      newIndicies.push(0);
      newIndicies.push(i);
      newIndicies.push(i + 1);
    }

    this.indiciesData = newIndicies;
  }

  /* This function assumes that face is flat  */
  private calculateNormal() {
    if (this.indiciesData.length < 3) {
      throw new Error("vertices length at least 3");
    }

    const v1 = Vector.fromVertex(this.verticesData[0], this.verticesData[1]);
    const v2 = Vector.fromVertex(this.verticesData[1], this.verticesData[2]);

    const normal = Vector.normal(v1, v2);

    for (let i = 0; i < this.indiciesData.length; i++) {
      this.normalData.push(normal);
    }
  }
}
