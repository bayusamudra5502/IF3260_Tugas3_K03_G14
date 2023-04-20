import DrawInfo from "../object/DrawInfo";
import { Object3D } from "../object/Object3D";
import { ObjectMap } from "../object/ObjectMap";
import { Listenable } from "../util/Listenable";
import { ObjectRenderer } from "./ObjectRenderer";

export type Object3DTuple = [Object3D, ObjectMap];

export class ObjectManager extends Listenable {
  private objectsList: Object3DTuple[] = [];

  add(object: Object3DTuple) {
    this.objectsList.push(object);
    this.notify();
  }

  get(idx: number) {
    return this.objectsList[idx];
  }

  getObject3D(idx: number) {
    return this.objectsList[idx][0];
  }

  getList() {
    return this.objectsList;
  }

  delete(idx: number) {
    this.objectsList.splice(idx, 1);
    this.notify();
  }
}
