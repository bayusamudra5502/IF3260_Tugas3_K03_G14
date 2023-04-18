import { RotationAnimator } from "../components/Animator";
import { Color } from "./Color";
import { Component } from "./Component";
import { Face } from "./Face";
import { Object3D } from "./Object3D";
import { ObjectMap } from "./ObjectMap";
import { Vertex } from "./Vertices";

export class Object3DBuilder {
  private templateComponents: Component[] = [];

  constructor(templateComponent: Component[]) {
    this.templateComponents = templateComponent;
  }

  fromJson(json: string): [Object3D, ObjectMap] {
    let root: Object3D;

    const jsonObject = JSON.parse(json);

    const points: number[][] = jsonObject.pts;
    const objects: any[] = jsonObject.edge;
    const objectConfigMap = jsonObject.vertices;
    const map: ObjectMap = new Map<string, Object3D>();

    /* Creating without child */
    let idx = 0;
    for (const obj of objects) {
      const faceList: Face[] = [];

      const config = objectConfigMap[obj.name];
      const topology = obj.topology;

      const colorFace = Object3DBuilder.makeColorObject(
        obj ?? "#ffffff",
        obj.num_face
      );

      /* Build faces */
      for (let i = 0; i < obj.num_face; i++) {
        const vertices: Vertex[] = [];

        for (const vIdx of topology[i]) {
          vertices.push(Vertex.load(points[vIdx]));
        }

        faceList.push(
          new Face({
            color: colorFace[i],
            vertices: vertices,
            isInverted: !!config.inverted,
          })
        );
      }

      const object = new Object3D(faceList, Vertex.load(config["joint_point"]));

      /* Animator Components */
      const animator = RotationAnimator.fromConfig({
        ...config,
        transform: object.transform,
      });

      object.addComponent(animator);
      for (const i of this.templateComponents) {
        object.addComponent(i);
      }

      map.set(obj.name ?? idx.toString(), object);

      if (idx == 0) {
        root = object;
      }

      idx++;
    }

    /* Child assignment */
    for (const key in objectConfigMap) {
      const currentObj = map.get(key);
      if (!currentObj) throw new Error(`Object '${key}' is not found in edges`);

      const childs = objectConfigMap[key] as string[];

      if (childs) {
        for (const childId of childs) {
          const child = map.get(childId);
          if (!child)
            throw new Error(`Child object '${childId}' is not found in edges`);

          currentObj.addChild(child);
        }
      }
    }

    if (jsonObject.root_id) {
      const rootObj = map.get(jsonObject.root_id);
      if (!rootObj)
        throw new Error(`Root object '${jsonObject.root_id}' is not exist`);

      root = rootObj;
    }

    return [root, map];
  }

  static makeColorObject(
    colors: number[][] | string[] | string,
    faceCnt: number
  ): Color[] {
    const result: Color[] = [];

    if (colors instanceof Array) {
      if (colors.length != faceCnt) {
        throw new Error("color size is different");
      }

      for (let i = 0; i < faceCnt; i++) {
        const colorItem = colors[i];

        if (colorItem instanceof Array) {
          result.push(Color.load(colorItem));
        } else if (typeof colorItem === "string") {
          result.push(Color.hex(colorItem));
        } else {
          new Error("unknown color type");
        }
      }
    } else if (typeof colors === "string") {
      for (let i = 0; i < faceCnt; i++) {
        result.push(Color.hex(colors));
      }
    } else {
      new Error("unknown color type");
    }

    return result;
  }
}
