import { EngineBuffer } from "./engine/EngineBuffer";
import { RenderCanvas } from "./engine/RenderCanvas";
import RenderEngine from "./engine/RenderEngine";
import { Shader } from "./engine/Shader";
import { Color } from "./object/Color";
import { DEFAULT_TRANSFORM } from "./object/Transform";
import { Vertices } from "./object/Vertices";

function main() {
  const canvas = new RenderCanvas("drawing-canvas");
  const buffer = new EngineBuffer(canvas);
  const shader = new Shader("vertex-shader", "fragment-shader", canvas);

  shader.compile();

  const engine = new RenderEngine(
    canvas,
    buffer,
    shader,
    new Color(0.5, 0.5, 0.5, 1)
  );

  engine.clear();

  // testing
  engine.render({
    colors: [
      new Color(1, 1, 1, 1),
      new Color(1, 1, 1, 1),
      new Color(1, 1, 1, 1),
      new Color(1, 1, 1, 1),
    ],
    matrix: {
      transformation: DEFAULT_TRANSFORM,
    },
    mode: "line-loop",
    vertices: [
      new Vertices(10, 10, 0),
      new Vertices(10, 200, 0),
      new Vertices(200, 200, 0),
      new Vertices(200, 10, 0),
    ],
  });

  const cosVal = Math.cos((Math.PI * 45) / 180);
  const sinVal = Math.sin((Math.PI * 45) / 180);

  const biru1 = Color.hex("#6096B4");
  const biru2 = Color.hex("#93BFCF");
  const biru3 = Color.hex("#BDCDD6");
  const biru4 = Color.hex("#EEE9DA");

  engine.render({
    colors: [biru1, biru1, biru2, biru3],
    matrix: {
      transformation: [
        [cosVal, -sinVal, 0, 0],
        [sinVal, cosVal, 0, 0],
        [0, 0, 1, 0],
        [0, 0, 0, 1],
      ],
    },
    mode: "triangle-fan",
    vertices: [
      new Vertices(-100, -200, 0),
      new Vertices(-100, 200, 0),
      new Vertices(100, 200, 0),
      new Vertices(100, -200, 0),
    ],
  });
}

main();
