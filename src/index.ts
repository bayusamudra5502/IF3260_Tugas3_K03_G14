import { Buffer } from "./engine/Buffer";
import { Canvas } from "./engine/Canvas";
import RenderEngine from "./engine/RenderEngine";
import { ShaderProgram } from "./engine/Shader";
import { Color } from "./object/Color";
import { DEFAULT_TRANSFORM } from "./object/Transform";
import { Vertices } from "./object/Vertices";

function main() {
  const canvas = new Canvas("drawing-canvas", {
    maxX: 1000,
    maxY: 1000,
    maxZ: 1000,
  });
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

  const cosVal = Math.cos((Math.PI * 45) / 180);
  const sinVal = Math.sin((Math.PI * 45) / 180);

  const biru1 = Color.hex("#6096B4");
  const biru2 = Color.hex("#93BFCF");
  const biru3 = Color.hex("#BDCDD6");

  engine.render({
    colors: [biru1, biru1, biru2, biru1, biru1, biru2],
    matrix: {
      transform: DEFAULT_TRANSFORM,
      camera: DEFAULT_TRANSFORM,
      projection: DEFAULT_TRANSFORM,
    },
    indices: [0, 1, 2, 0, 2, 3],
    mode: "triangle-strip",
    vertices: [
      new Vertices(-300, 0, 0), // A
      new Vertices(-300, 300, 0), // B
      new Vertices(300, 300, 0), // C
      new Vertices(300, 0, 0), // D

      new Vertices(-300, 0, -300), // E
      new Vertices(-300, 300, -300), // F
      new Vertices(300, 300, -300), // G
      new Vertices(300, 0, -300), // H
    ],
  });
}

main();
