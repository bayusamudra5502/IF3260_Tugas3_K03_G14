import { Buffer } from "./engine/Buffer.js";
import { Canvas } from "./engine/Canvas.js";
import RenderEngine from "./engine/RenderEngine.js";
import { ShaderProgram } from "./engine/Shader.js";
import { Color } from "./object/Color.js";
import { EnvironmentManager } from "./manager/EnvironmentManager.js";
import { ProjectionManager } from "./manager/ProjectionManager.js";
import { TransformManager } from "./manager/TransformManager.js";
import { ObjectManager } from "./manager/ObjectManager.js";
import { Importer } from "./util/Importer.js";
import { ProjectionUi } from "./ui/ProjectionUi.js";
import { LightUi } from "./ui/LightUi.js";
function main() {
    var canvas = new Canvas("drawing-canvas");
    var buffer = new Buffer(canvas);
    var shader = new ShaderProgram("vertex-shader", "fragment-shader", canvas);
    shader.compile();
    var engine = new RenderEngine(canvas, buffer, shader, new Color(0.5, 0.5, 0.5, 1));
    engine.clear();
    /* UI Setup */
    var projectionUi = new ProjectionUi(canvas.aspectRatio);
    var lightUi = new LightUi();
    /* Setup manager */
    var rerender = function () {
        var objs = objManager.generateDrawInfo();
        for (var _i = 0, objs_1 = objs; _i < objs_1.length; _i++) {
            var obj = objs_1[_i];
            engine.render(obj);
        }
    };
    var projManager = new ProjectionManager();
    var cameraManager = new TransformManager();
    var envManager = new EnvironmentManager();
    envManager.update({
        cameraTransform: cameraManager,
        projection: projManager,
        useShading: true,
    });
    var objManager = new ObjectManager(envManager, "triangle");
    /* Setup importer */
    var importer = new Importer(objManager, "loadfile-input");
    /* Bind Configuration */
    projectionUi.subscribe(function () {
        projManager.reset();
        projManager.add(projectionUi.currentProjector);
        rerender();
    });
    lightUi.subscribe(function () {
        envManager.update({
            sourceLight: lightUi.lightPosition,
            useShading: lightUi.useShading,
        });
    });
    /* Event listeners */
    document.querySelector("#loadfile-submit").addEventListener("click", function () {
        importer.import();
    });
    objManager.subscribe(rerender);
    projManager.subscribe(rerender);
    cameraManager.subscribe(rerender);
    envManager.subscribe(rerender);
    lightUi.subscribe(rerender);
}
main();
//# sourceMappingURL=index.js.map