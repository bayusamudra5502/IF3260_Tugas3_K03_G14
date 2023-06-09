import { Transform } from "../matrix/Transform";
import { Color } from "./Color";
import { Vector } from "./Vector";
import { Vertex } from "./Vertices";

export interface FaceOptions {
  vertices: Vertex[];
  color: Color[] | Color;
  isInverted: boolean;
}

export class Face {
  private verticesData: Vertex[];
  private colorsData: Color[];
  private indiciesData: number[];

  private normalData: Vector[] = [];
  private tangentData: Vector[] = [];

  constructor(options: FaceOptions) {
    this.verticesData = options.isInverted
      ? options.vertices.reverse()
      : options.vertices;

    if (options.color instanceof Array) {
      this.colorsData = options.color;
    } else {
      this.colorsData = [];

      for (let i = 0; i < this.verticesData.length; i++) {
        this.colorsData.push(options.color);
      }
    }

    this.makeTriangle();
    this.calculateNormal();
    this.calculateTangent();
  }

  get vertices() {
    return this.verticesData;
  }

  get colors() {
    return this.colorsData;
  }

  get indicies() {
    return this.indiciesData;
  }

  get normals() {
    return this.normalData;
  }
  
  get tangents(){
    return this.tangentData;
  }

  private makeTriangle() {
    const newIndicies = [];

    for (let i = 1; i < this.vertices.length - 1; i++) {
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

  private calculateTangent(){
    if (this.indiciesData.length < 2) {
      throw new Error("vertices length at least 2");
    }

    const v1 = Vector.fromVertex(this.verticesData[0], this.verticesData[1]);
    for (let i = 0; i < this.indiciesData.length; i++) {
      this.tangentData.push(v1);
    }
  }
}
