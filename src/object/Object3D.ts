import { Transform } from "../matrix/Transform";
import { Color } from "./Color";
import { Component } from "./Component";
import { Face } from "./Face";
import { Vertex } from "./Vertices";

export class Object3D {
  private childList: Object3D[] = [];
  private transformData: Transform = new Transform();
  private componentList: Component[] = [];

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

  get components() {
    return this.componentList;
  }

  addChild(child: Object3D) {
    this.childList.push(child);
  }

  addComponent(component: Component) {
    this.componentList.push(component);
  }
}
