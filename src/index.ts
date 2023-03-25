import { Buffer } from "./engine/Buffer";
import { Canvas } from "./engine/Canvas";
import RenderEngine from "./engine/RenderEngine";
import { ShaderProgram } from "./engine/Shader";
import { EnvironmentManager } from "./manager/EnvironmentManager";
import { ObjectManager } from "./manager/ObjectManager";
import { ProjectionManager } from "./manager/ProjectionManager";
import { TransformManager } from "./manager/TransformManager";
import { ViewTransform } from "./matrix/ViewTransform";
import { Color } from "./object/Color";
import { LightUi } from "./ui/LightUi";
import { ProjectionUi } from "./ui/ProjectionUi";
import { Importer } from "./util/Importer";
import { TransformUi } from "./ui/TransformUi";
import { Scaling } from "./transform/Scaling";
import { Translation } from "./transform/Translation";
import { Rotation } from "./transform/Rotation";

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
  const lightUi = new LightUi();
  const transformUi = new TransformUi();

  /* Setup manager */
  const rerender = () => {
    const objs = objManager.generateDrawInfo();
    for (const obj of objs) {
      engine.render(obj);
    }
  };

  const projManager = new ProjectionManager();
  const cameraManager = new TransformManager();
  const viewTransform = new ViewTransform();
  const envManager = new EnvironmentManager();
  envManager.update({
    cameraTransform: cameraManager,
    viewTransform: viewTransform,
    projection: projManager,
    useShading: true,
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
  lightUi.subscribe(() => {
    envManager.update({
      sourceLight: lightUi.lightPosition,
      useShading: lightUi.useShading,
      sourceLightColor: lightUi.lightColor,
    });
  });
  transformUi.subscribe(() => {
    const transformManager = new TransformManager();
    const idx = transformUi.transformIndex;

    const obj = objManager.get(idx);
    const translation = new Translation();
    const rotation = new Rotation();
    const scaling = new Scaling();

    // Rotation
    rotation.configure({
      axis: transformUi.rotation.rotationAxis,
      angle: transformUi.rotation.rotationAngle,
      center: obj.center,
    });
    transformManager.add(rotation);

    // Scaling
    scaling.configure({
      sx: transformUi.scale.Sx,
      sy: transformUi.scale.Sy,
      sz: transformUi.scale.Sz,
      center: obj.center,
    });
    transformManager.add(scaling);

    // Translation
    translation.configure({
      x: transformUi.translation.X,
      y: transformUi.translation.Y,
      z: transformUi.translation.Z,
    });
    transformManager.add(translation);

    obj.transform.update(transformManager.matrix);
    rerender();
  });

  /* Event listeners */
  document.querySelector("#loadfile-submit").addEventListener("click", () => {
    importer.import();
  });

  document.addEventListener("keypress", (event) => {
    if (event.key === "Enter") {
    }
  });

  objManager.subscribe(rerender);
  projManager.subscribe(rerender);
  cameraManager.subscribe(rerender);
  viewTransform.subscribe(rerender);
  envManager.subscribe(rerender);
  lightUi.subscribe(rerender);
}

main();
