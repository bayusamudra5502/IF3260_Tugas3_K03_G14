import DrawInfo from "../object/DrawInfo";
import { Matrix } from "../matrix/Matrix";

interface EnginePrimitive {
  vertices: Float32Array;
  normals: Float32Array;
  color: Float32Array;
  indices: Uint16Array;
  matrix: {
    transform: number[];
    view: number[];
    projection: number[];
  };
  size: number;
  lightSource: Float32Array;
  useShading: number;
}

export function increaseArray(count: number, start: number = 0): number[] {
  const result = [];

  for (let i = 0; i < count; i++) {
    result.push(start + i);
  }

  return result;
}

export function flatten(array: Array<any>) {
  const result = [];

  for (let value of array) {
    if (value instanceof Array) {
      const flat = flatten(value);
      for (let j of flat) {
        result.push(j);
      }
    } else {
      result.push(value);
    }
  }

  return result;
}

export function drawableToPrimitive(draw: DrawInfo): EnginePrimitive {
  const vertices = draw.vertices;
  const colors = draw.colors;
  const indices = draw.indices ? draw.indices : increaseArray(vertices.length);

  if (vertices.length != colors.length) {
    throw new Error("color and vertices count is not equal");
  }

  if (draw.normals.length != vertices.length) {
    throw new Error("normal and vertices count is not equal");
  }

  const flatVertices = [];
  for (let i of vertices) {
    const vector = i.getArray();
    for (let j of vector) {
      flatVertices.push(j);
    }
  }

  const flatColor = [];
  for (let i of colors) {
    const vector = i.getArray();
    for (let j of vector) {
      flatColor.push(j);
    }
  }

  const flatNormal = [];
  for (let i of draw.normals) {
    const value = i.getArray();
    for (let j of value) {
      flatNormal.push(j);
    }
  }

  const tMatrix = Matrix.transpose(draw.matrix.transform);
  const pMatrix = Matrix.transpose(draw.matrix.projection);
  const vMatrix = Matrix.transpose(draw.matrix.view);

  return {
    vertices: new Float32Array(flatVertices),
    color: new Float32Array(flatColor),
    indices: new Uint16Array(indices),
    matrix: {
      transform: flatten(tMatrix),
      projection: flatten(pMatrix),
      view: flatten(vMatrix),
    },
    size: indices.length,
    normals: new Float32Array(flatNormal),
    lightSource: new Float32Array(draw.lightSource.getArray()),
    useShading: draw.useShading ? 1 : 0,
  };
}
