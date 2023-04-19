import DrawInfo, { DrawMode } from "../object/DrawInfo";
import { ObjectOld3D } from "../object/ObjectOld3D";
import { Listenable } from "../util/Listenable";
import { EnvironmentManager } from "./EnvironmentManager";

export class ObjectManagerOld extends Listenable {
  private objects: ObjectOld3D[] = [];

  constructor(
    private env: EnvironmentManager,
    private mode: DrawMode = "triangle"
  ) {
    super();
  }

  add(object: ObjectOld3D) {
    this.objects.push(object);
    this.notify();
  }

  get(idx: number): ObjectOld3D {
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
        mode: this.mode,
        matrix: {
          projection: this.env.projectionMatrix,
          transform: obj.transform.matrix,
          view: this.env.viewMatrix,
        },
        tangents: [],
        vertices: obj.vertices,
        normals: obj.normal,
        extensions: [],
      };
      result.push(info);
    }

    return result;
  }
}
