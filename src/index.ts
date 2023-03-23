import { Buffer } from "./engine/Buffer";
import { Canvas } from "./engine/Canvas";
import RenderEngine from "./engine/RenderEngine";
import { ShaderProgram } from "./engine/Shader";
import { Color } from "./object/Color";
import { EnvironmentManager } from "./manager/EnvironmentManager";
import { ProjectionManager } from "./manager/ProjectionManager";
import { TransformManager } from "./manager/TransformManager";
import { ObjectManager } from "./manager/ObjectManager";
import { Importer } from "./util/Importer";
import { Oblique } from "./projection/Oblique";
import { ProjectionUi } from "./ui/ProjectionUi";

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

  /* UI Setup */
  const projectionUi = new ProjectionUi(canvas.aspectRatio);

  /* Setup manager */
  const rerender = () => {
    const objs = objManager.generateDrawInfo();
    for (const obj of objs) {
      engine.render(obj);
    }
  };

  const projManager = new ProjectionManager();
  const cameraManager = new TransformManager();
  const envManager = new EnvironmentManager();
  envManager.update({
    cameraTransform: cameraManager,
    projection: projManager,
  });

  const objManager = new ObjectManager(envManager, "triangle");

  /* Setup importer */
  const importer = new Importer(objManager, "loadfile-input");

  /* Bind Configuration */
  projectionUi.subscribe(() => {
    projManager.reset();
    projManager.add(projectionUi.currentProjector);
    rerender();
  });

  /* Event listeners */
  document.querySelector("#loadfile-submit").addEventListener("click", () => {
    importer.import();
  });
  objManager.subscribe(rerender);

  projManager.subscribe(rerender);
  cameraManager.subscribe(rerender);
  envManager.subscribe(rerender);
}

main();
