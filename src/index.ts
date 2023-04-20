import { AnimationRunner, Animator } from "./components/Animator";
import { LightComponent } from "./components/Light";
import { TextureComponent } from "./components/Texture";
import { Buffer } from "./engine/Buffer";
import { Canvas } from "./engine/Canvas";
import { ExtensionBuilder } from "./engine/ExtensionBuilder";
import RenderEngine from "./engine/RenderEngine";
import { ShaderProgram } from "./engine/Shader";
import { RenderModeExtension } from "./engine/extensions/initial/RenderMode";
import { CameraManager } from "./manager/CameraManager";
import { EnvironmentManager } from "./manager/EnvironmentManager";
import { ObjectManager } from "./manager/ObjectManager";
import { ObjectRenderer } from "./manager/ObjectRenderer";
import { ProjectionManager } from "./manager/ProjectionManager";
import { TextureManager } from "./manager/TextureManager";
import { TransformManager } from "./manager/TransformManager";
import { Color } from "./object/Color";
import { TRANSFORM_IDX } from "./object/Object3D";
import { Object3DBuilder } from "./object/Object3DBuilder";
import { Rotation } from "./transform/Rotation";
import { Scaling } from "./transform/Scaling";
import { Translation } from "./transform/Translation";
import { AnimationUi } from "./ui/AnimationUi";
import { CameraUi } from "./ui/CameraUi";
import { LightUi } from "./ui/LightUi";
import { ProjectionUi } from "./ui/ProjectionUi";
import { TextureUi } from "./ui/TextureUI";
import { TransformUi } from "./ui/TransformUi";
import { TreeUi } from "./ui/TreeUi";
import { Importer } from "./util/Importer";
import { reset, resetTransformation } from "./util/reset";

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
  const textureUi = new TextureUi();
  const treeUi = new TreeUi();
  const animationUi = new AnimationUi();

  /* Setup manager */
  const projManager = new ProjectionManager();
  const cameraManager = new CameraManager();
  const envManager = new EnvironmentManager();
  const textureManager = new TextureManager();

  /* Animation */
  const animationRunner = new AnimationRunner(20);

  envManager.update({
    cameraManager: cameraManager,
    projection: projManager,
    useShading: true,
  });

  /* Component */
  const lightComponent = new LightComponent(envManager);

  const textureComponent = new TextureComponent(
    engine.texture,
    engine.envMap,
    engine.bumpMap,
    textureManager,
    cameraManager
  );

  const object3DBuilder = new Object3DBuilder([
    lightComponent,
    textureComponent,
  ]);

  /* Object Manager */
  const objManager = new ObjectManager();

  /* Setup importer */
  const importer = new Importer(objManager, object3DBuilder, "loadfile-input");

  /* Renderer */
  const objectRenderer = new ObjectRenderer(envManager, extensionBuilder);

  /* Setup manager */
  const rerender = () => {
    setTimeout(() => {
      const objs = objManager.getList();
      for (const obj of objs) {
        const infos = objectRenderer.generateDrawInfo(obj[0]);
        infos.forEach((info) => engine.render(info));
      }
    }, 0);
  };

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

  textureUi.subscribe(() => {
    textureManager.update(textureUi.mode);
    rerender();
  });

  cameraUi.subscribe(() => {
    cameraManager.update({
      radius: cameraUi.radius,
      xAngle: cameraUi.xAngle,
      yAngle: cameraUi.yAngle,
    });
    rerender();
  });

  treeUi.subscribeType("select-root", () => {
    treeUi.updateComponent(objManager.get(treeUi.selectedRootIdx));
  });

  treeUi.subscribeType("select-object", () => {
    transformUi.translation = new Translation();
    transformUi.rotation = new Rotation();
    transformUi.scale = new Scaling();
    resetTransformation();
  });

  transformUi.subscribe(() => {
    const idx = treeUi.selectedRootIdx;
    const [_, map] = objManager.get(idx);

    const obj = map.get(treeUi.selectedObjectIdx);
    const transformManager = new TransformManager();

    const translation = new Translation();
    const rotation = new Rotation();
    const scaling = new Scaling();

    // Rotation
    rotation.configure({
      angleX: transformUi.rotation.rotationAngleX,
      angleY: transformUi.rotation.rotationAngleY,
      angleZ: transformUi.rotation.rotationAngleZ,
      center: obj.joinPoint,
    });
    transformManager.add(rotation);

    // Scaling
    scaling.configure({
      sx: transformUi.scale.Sx,
      sy: transformUi.scale.Sy,
      sz: transformUi.scale.Sz,
      center: obj.joinPoint,
    });
    transformManager.add(scaling);

    // Translation
    translation.configure({
      x: transformUi.translation.X,
      y: transformUi.translation.Y,
      z: transformUi.translation.Z,
    });
    transformManager.add(translation);

    const wMatrix = transformManager.matrix;

    obj.setTransform(TRANSFORM_IDX, wMatrix);
    rerender();
  });

  objManager.subscribe(() => {
    treeUi.updateRootLists(objManager.getList());
  });

  objManager.subscribe(rerender);
  projManager.subscribe(rerender);
  cameraManager.subscribe(rerender);
  envManager.subscribe(rerender);
  lightUi.subscribe(rerender);

  animationRunner.subscribe(rerender);

  const startAnimation = () => {
    const list = objManager.getList();
    const objList = list.map(([el, _]) => el);
    animationRunner.run(...objList);
  };

  const stopAnimation = () => {
    animationRunner.stop();
  };

  animationUi.subscribeType("run-animation", () => {
    if (animationUi.started) {
      startAnimation();
    } else {
      stopAnimation();
    }
  });

  animationUi.subscribeType("fps-rate", () => {
    animationRunner.updateFps(animationUi.fps);
  });

  animationUi.subscribeType("inverted", () => {
    const isRun = animationRunner.isRun;
    let objects;

    if (isRun) {
      objects = animationRunner.animatedObjects;
      animationRunner.stop();
    }

    const data = objManager.getList();

    for (const [_, map] of data) {
      for (const key of map.keys()) {
        const anim = map.get(key).findComponent(Animator);
        anim.setInverted(animationUi.inverted);
      }
    }

    if (isRun) {
      animationRunner.run(...objects);
    }
  });

  animationUi.subscribeType("next-frame", () => {
    const list = objManager.getList();
    const objList = list.reduce(
      (prev, [_, data]) => [...prev, ...data.values()],
      []
    );
    animationRunner.nextFrame(...objList);
  });

  animationUi.subscribeType("prev-frame", () => {
    const list = objManager.getList();
    const objList = list.reduce(
      (prev, [_, data]) => [...prev, ...data.values()],
      []
    );
    animationRunner.previousFrame(...objList);
  });

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
  });
}

main();
