import { Transform } from "../matrix/Transform";
import { Color } from "./Color";
import { Component } from "./Component";
import { Face } from "./Face";
import { Vertex } from "./Vertices";

export class Object3D {
  private childList: Object3D[] = [];
  private transformData: Transform = new Transform();
  private componentList: Component[] = [];

  constructor(
    private name: string,
    private facesList: Face[],
    private joinPointvert: Vertex
  ) {}

  get id() {
    return this.name;
  }

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

  findComponent<T extends Component>(
    classConstructor: new (...any) => T
  ): T | null {
    for (const component of this.componentList) {
      if (component instanceof classConstructor) {
        return component;
      }
    }

    return null;
  }

  addChild(child: Object3D) {
    this.childList.push(child);
  }

  addComponent(component: Component) {
    this.componentList.push(component);
  }
}
