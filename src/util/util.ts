import DrawInfo from "../object/DrawInfo";

interface EnginePrimitive {
  vertices: Float32Array;
  color: Float32Array;
  indices: Uint16Array;
  matrix: {
    transform: number[];
    camera: number[];
    projection: number[];
  };
  size: number;
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

  if (indices.length != colors.length) {
    throw new Error("color and index count is not equal");
  }

  const flatVertices = [];
  for (let i of vertices) {
    const vector = i.getVector();
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

  return {
    vertices: new Float32Array(flatVertices),
    color: new Float32Array(flatColor),
    indices: new Uint16Array(indices),
    matrix: {
      transform: flatten(draw.matrix.transform),
      projection: flatten(draw.matrix.projection),
      camera: flatten(draw.matrix.camera),
    },
    size: indices.length,
  };
}
