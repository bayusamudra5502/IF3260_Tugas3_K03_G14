import { Buffer } from "./engine/Buffer";
import { Canvas } from "./engine/Canvas";
import RenderEngine from "./engine/RenderEngine";
import { ShaderProgram } from "./engine/Shader";
import { Color } from "./object/Color";
import { IDENTITY_MATRIX } from "./matrix/Matrix";
import { Vertex } from "./object/Vertices";
import { Vector } from "./object/Vector";

function main() {
  const canvas = new Canvas("drawing-canvas");
  const buffer = new Buffer(canvas);
  const shader = new ShaderProgram("vertex-shader", "fragment-shader", canvas);

  shader.compile();

  const engine = new RenderEngine(
    canvas,
    buffer,
    shader,
    new Color(0.5, 0.5, 0.5, 1)
  );

  engine.clear();

  const biru1 = Color.hex("#6096B4");
  const biru2 = Color.hex("#93BFCF");

  engine.render({
    colors: [biru1, biru1, biru2, biru1, biru1, biru2],
    matrix: {
      transform: IDENTITY_MATRIX,
      view: IDENTITY_MATRIX,
      projection: IDENTITY_MATRIX,
    },
    indices: [0, 1, 2, 0, 2, 3],
    mode: "triangle-strip",
    vertices: [
      new Vertex(-0.3, 0, 0), // A
      new Vertex(-0.3, 0.3, 0), // B
      new Vertex(0.3, 0.3, 0), // C
      new Vertex(0.3, 0, 0), // D

      new Vertex(-0.3, 0, -0.3), // E
      new Vertex(-0.3, 0.3, -0.3), // F
      new Vertex(0.3, 0.3, -0.3), // G
      new Vertex(0.3, 0, -0.3), // H
    ],
    normals: [
      new Vector(0, 0, 1),
      new Vector(0, 0, 1),
      new Vector(0, 0, 1),
      new Vector(0, 0, 1),

      new Vector(0, 0, 1),
      new Vector(0, 0, 1),
      new Vector(0, 0, 1),
      new Vector(0, 0, 1),
    ],
    lightSource: new Vertex(0, 0, 1),
  });
}

main();
