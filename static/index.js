import { EngineBuffer } from "./engine/EngineBuffer.js";
import { RenderCanvas } from "./engine/RenderCanvas.js";
import RenderEngine from "./engine/RenderEngine.js";
import { Shader } from "./engine/Shader.js";
import { Color } from "./object/Color.js";
import { DEFAULT_TRANSFORM } from "./object/Transform.js";
import { Vertices } from "./object/Vertices.js";
function main() {
    var canvas = new RenderCanvas("drawing-canvas");
    var buffer = new EngineBuffer(canvas);
    var shader = new Shader("vertex-shader", "fragment-shader", canvas);
    shader.compile();
    var engine = new RenderEngine(canvas, buffer, shader, new Color(0.5, 0.5, 0.5, 1));
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
    var cosVal = Math.cos((Math.PI * 45) / 180);
    var sinVal = Math.sin((Math.PI * 45) / 180);
    var biru1 = Color.hex("#6096B4");
    var biru2 = Color.hex("#93BFCF");
    var biru3 = Color.hex("#BDCDD6");
    var biru4 = Color.hex("#EEE9DA");
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
//# sourceMappingURL=index.js.map