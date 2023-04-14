import DrawInfo, { DrawMode } from "../object/DrawInfo";
import { Object3D } from "../object/Object3D";
import { Listenable } from "../util/Listenable";
import { EnvironmentManager } from "./EnvironmentManager";

export class ObjectManager extends Listenable {
  private objects: Object3D[] = [];

  constructor(
    private env: EnvironmentManager,
    private mode: DrawMode = "triangle"
  ) {
    super();
  }

  add(object: Object3D) {
    this.objects.push(object);
    this.notify();
  }

  get(idx: number): Object3D {
    return this.objects[idx];
  }

  delete(idx: number) {
    this.objects.splice(idx, 1);
    this.notify();
  }

  deleteAll() {
    this.objects = [];
    this.notify();
  }

  generateDrawInfo(): DrawInfo[] {
    const result: DrawInfo[] = [];

    for (const obj of this.objects) {
      const info: DrawInfo = {
        colors: obj.colors,
        indices: obj.indicies,
        lightSource: this.env.lightPosition,
        mode: this.mode,
        matrix: {
          projection: this.env.projectionMatrix,
          transform: obj.transform.matrix,
          view: this.env.viewMatrix,
        },
        normals: obj.normal,
        vertices: obj.vertices,
        useShading: this.env.useShading,
        lightColor: this.env.lightColor,
        extensions: [],
      };
      result.push(info);
    }

    return result;
  }
}
