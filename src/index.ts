import { Buffer } from "./engine/Buffer";
import { Canvas } from "./engine/Canvas";
import RenderEngine from "./engine/RenderEngine";
import { ShaderProgram } from "./engine/Shader";
import { EnvironmentManager } from "./manager/EnvironmentManager";
import { ObjectManagerOld } from "./manager/ObjectManager";
import { ProjectionManager } from "./manager/ProjectionManager";
import { TransformManager } from "./manager/TransformManager";
import { CameraManager } from "./manager/CameraManager";
import { Color } from "./object/Color";
import { Rotation } from "./transform/Rotation";
import { Scaling } from "./transform/Scaling";
import { Translation } from "./transform/Translation";
import { LightUi } from "./ui/LightUi";
import { ProjectionUi } from "./ui/ProjectionUi";
import { TransformUi } from "./ui/TransformUi";
import { Importer } from "./util/Importer";
import { reset } from "./util/reset";
import { CameraUi } from "./ui/CameraUi";
import { ExtensionBuilder } from "./engine/ExtensionBuilder";
import { LightRenderExtension } from "./engine/extensions/object/LightRender";
import DrawInfo from "./object/DrawInfo";
import { RenderModeExtension } from "./engine/extensions/initial/RenderMode";

function main() {
  const canvas = new Canvas("drawing-canvas");
  const buffer = new Buffer(canvas);
  const shader = new ShaderProgram("vertex-shader", "fragment-shader", canvas);

  shader.compile();

  const extensionBuilder = new ExtensionBuilder(shader);

  const engine = new RenderEngine(
    canvas,
    buffer,
    shader,
    new Color(0.5, 0.5, 0.5, 1)
  );

  /* Setup global extension */
  engine.addInitialExtension(extensionBuilder.build(RenderModeExtension, {}));

  /* */
  engine.clear();

  /* UI Setup */
  const projectionUi = new ProjectionUi(canvas.aspectRatio);
  const lightUi = new LightUi();
  const transformUi = new TransformUi();
  const cameraUi = new CameraUi();

  /* Setup manager */
  const rerender = () => {
    setTimeout(() => {
      const objs = objManager.generateDrawInfo();
      for (const obj of objs) {
        const extension = extensionBuilder.build(LightRenderExtension, {
          lightColor: envManager.lightColor,
          lightSource: envManager.lightPosition,
          normals: obj.normals,
          useShading: envManager.useShading,
        });

        engine.render({
          ...obj,
          extensions: [extension],
        } as DrawInfo);
      }
    }, 0);
  };

  const projManager = new ProjectionManager();
  const cameraManager = new CameraManager();
  const envManager = new EnvironmentManager();
  envManager.update({
    cameraManager: cameraManager,
    projection: projManager,
    useShading: true,
  });

  const objManager = new ObjectManagerOld(envManager, "triangle");

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

    if (!obj) return;

    const translation = new Translation();
    const rotation = new Rotation();
    const scaling = new Scaling();

    // Rotation
    rotation.configure({
      angleX: transformUi.rotation.rotationAngleX,
      angleY: transformUi.rotation.rotationAngleY,
      angleZ: transformUi.rotation.rotationAngleZ,
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

    obj.transform.updateMatrix(transformManager.matrix);
    rerender();
  });
  cameraUi.subscribe(() => {
    cameraManager.update({
      radius: cameraUi.radius,
      xAngle: cameraUi.xAngle,
      yAngle: cameraUi.yAngle,
    });
  });

  objManager.subscribe(rerender);
  projManager.subscribe(rerender);
  cameraManager.subscribe(rerender);
  envManager.subscribe(rerender);
  lightUi.subscribe(rerender);

  /* Event listeners */
  const resetButton = document.querySelector("#reset-button");
  const rerenderButton = document.querySelector("#rerender-button");

  resetButton.addEventListener("click", () => {
    reset(rerender);
  });

  rerenderButton.addEventListener("click", () => {
    rerender();
  });

  document.querySelector("#loadfile-submit").addEventListener("click", () => {
    importer.import();
    resetButton.removeAttribute("disabled");
    rerenderButton.removeAttribute("disabled");
    requestAnimationFrame(loop);
  });

  let angleX = 0;
  let angleY = 0;
  let angleZ = 0;
  const rotationX = document.querySelector("#rotation-x") as HTMLInputElement;
  const rotationY = document.querySelector("#rotation-y") as HTMLInputElement;
  const rotationZ = document.querySelector("#rotation-z") as HTMLInputElement;

  const isRotationX = document.querySelector(
    "#check-rotate-x"
  ) as HTMLInputElement;
  const isRotationY = document.querySelector(
    "#check-rotate-y"
  ) as HTMLInputElement;
  const isRotationZ = document.querySelector(
    "#check-rotate-z"
  ) as HTMLInputElement;

  const loop = () => {
    if (isRotationX.checked) {
      angleX = (angleX + 0.25) % 360;
      rotationX.value = angleX.toString();
      rotationX.dispatchEvent(new Event("change"));
    }

    if (isRotationY.checked) {
      angleY = (angleY + 0.25) % 360;
      rotationY.value = angleY.toString();
      rotationY.dispatchEvent(new Event("change"));
    }

    if (isRotationZ.checked) {
      angleZ = (angleZ + 0.25) % 360;
      rotationZ.value = angleZ.toString();
      rotationZ.dispatchEvent(new Event("change"));
    }

    requestAnimationFrame(loop);
  };
}

main();
