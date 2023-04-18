import { IDENTITY_MATRIX, Matrix } from "../matrix/Matrix";
import { Transform } from "../matrix/Transform";
import DrawInfo from "./DrawInfo";
import { Face } from "./Face";
import { Vertex } from "./Vertices";

export class Object3D {
  private childList: Object3D[] = [];
  private transformData: Transform = new Transform();

  constructor(private facesList: Face[], private joinPointvert: Vertex) {}

  get transform() {
    return this.transformData;
  }

  get childs() {
    return this.childList;
  }

  get joinPoint() {
    return this.joinPointvert;
  }

  get faces() {
    return this.facesList;
  }

  addChild(child: Object3D) {
    this.childList.push(child);
  }
}
