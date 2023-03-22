import { Buffer } from "./engine/Buffer.js";
import { Canvas } from "./engine/Canvas.js";
import RenderEngine from "./engine/RenderEngine.js";
import { ShaderProgram } from "./engine/Shader.js";
import { Color } from "./object/Color.js";
import { IDENTITY_MATRIX } from "./matrix/Matrix.js";
import { Vertex } from "./object/Vertices.js";
import { Vector } from "./object/Vector.js";
function main() {
    var canvas = new Canvas("drawing-canvas");
    var buffer = new Buffer(canvas);
    var shader = new ShaderProgram("vertex-shader", "fragment-shader", canvas);
    shader.compile();
    var engine = new RenderEngine(canvas, buffer, shader, new Color(0.5, 0.5, 0.5, 1));
    engine.clear();
    var cosVal = Math.cos((Math.PI * 45) / 180);
    var sinVal = Math.sin((Math.PI * 45) / 180);
    var biru1 = Color.hex("#6096B4");
    var biru2 = Color.hex("#93BFCF");
    var biru3 = Color.hex("#BDCDD6");
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
            new Vertex(-0.3, 0, 0),
            new Vertex(-0.3, 0.3, 0),
            new Vertex(0.3, 0.3, 0),
            new Vertex(0.3, 0, 0),
            new Vertex(-0.3, 0, -0.3),
            new Vertex(-0.3, 0.3, -0.3),
            new Vertex(0.3, 0.3, -0.3),
            new Vertex(0.3, 0, -0.3), // H
        ],
        normals: [
            new Vector(1, 1, 1),
            new Vector(1, 1, 1),
            new Vector(1, 1, 1),
            new Vector(1, 1, 1),
            new Vector(1, 1, 1),
            new Vector(1, 1, 1),
            new Vector(1, 1, 1),
            new Vector(1, 1, 1),
        ],
        lightSource: new Vertex(0, 0, 0),
    });
}
main();
//# sourceMappingURL=index.js.map