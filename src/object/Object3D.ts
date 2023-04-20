import { IDENTITY_MATRIX, Matrix } from "../matrix/Matrix";
import { Transform } from "../matrix/Transform";
import { Color } from "./Color";
import { Component } from "./Component";
import { Face } from "./Face";
import { Vertex } from "./Vertices";

const TRANSFORM_IDX = 0;

export class Object3D {
  private childList: Object3D[] = [];
  private transformMapData: Map<number, Transform> = new Map();
  private componentList: Component[] = [];
  private isTransformChange = false;
  private transformCache = IDENTITY_MATRIX;

  constructor(
    private name: string,
    private facesList: Face[],
    private joinPointvert: Vertex
  ) {
    this.transformMapData.set(TRANSFORM_IDX, new Transform());
  }

  get id() {
    return this.name;
  }

  getTransform(key: number) {
    let result = this.transformMapData.get(key);

    if (!result) {
      result = new Transform();
      this.transformMapData.set(key, result);
    }

    return result;
  }

  setTransform(key: number, matrix: Matrix) {
    if (!this.transformMapData.has(key)) {
      this.transformMapData.set(key, new Transform());
    }

    this.transformMapData.get(key).updateMatrix(matrix);
    this.isTransformChange = true;
  }

  get matrix() {
    if (this.isTransformChange) {
      let total = IDENTITY_MATRIX;
      const keys = [...this.transformMapData.keys()].sort((a, b) => a - b);

      for (const transformKey of keys) {
        const transform = this.transformMapData.get(transformKey);
        total = Matrix.multiply(total, transform.matrix);
      }

      this.transformCache = total;
    }

    return this.transformCache;
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
