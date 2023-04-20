import { ExtensionBuilder } from "../engine/ExtensionBuilder";
import { RenderExtension } from "../engine/RenderExtension";
import { IDENTITY_MATRIX, Matrix } from "../matrix/Matrix";
import { Color } from "../object/Color";
import DrawInfo, { DrawMode } from "../object/DrawInfo";
import { Object3D } from "../object/Object3D";
import { EnvironmentManager } from "./EnvironmentManager";

export class ObjectRenderer {
  constructor(
    private env: EnvironmentManager,
    private extBuild: ExtensionBuilder,
    private drawMode: DrawMode = "triangle"
  ) {}
  generateDrawInfo(root: Object3D): DrawInfo[] {
    const objectQueue = [root];
    const matrixQueue = [IDENTITY_MATRIX];

    let result: DrawInfo[] = [];

    while (objectQueue.length > 0) {
      const currentObject = objectQueue.shift();
      const matrix = matrixQueue.shift();
      const objectInfo = this.buildObjectInfo(currentObject);
      const newMatrix = Matrix.multiply(matrix, currentObject.matrix);

      for (const info of objectInfo) {
        info.matrix.transform = newMatrix;
      }

      result = result.concat(objectInfo);

      for (const object of currentObject.childs) {
        objectQueue.push(object);
        matrixQueue.push(newMatrix);
      }
    }

    return result;
  }

  private buildObjectInfo(object: Object3D): DrawInfo[] {
    const result: DrawInfo[] = [];
    const extensions: RenderExtension[] = [];

    for (const component of object.components) {
      component.fit(object);
      const res = component.run();

      if (res) {
        extensions.push(this.extBuild.build(res.class, res.options));
      }
    }

    for (const face of object.faces) {
      result.push({
        colors: face.colors,
        indices: face.indicies,
        matrix: {
          projection: this.env.projectionMatrix,
          transform: IDENTITY_MATRIX,
          view: this.env.viewMatrix,
        },
        normals: face.normals,
        tangents: face.tangents,
        extensions: extensions,
        vertices: face.vertices,
        mode: this.drawMode,
      });
    }

    return result;
  }
}
