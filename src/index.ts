import { Buffer } from "./engine/Buffer";
import { Canvas } from "./engine/Canvas";
import RenderEngine from "./engine/RenderEngine";
import { ShaderProgram } from "./engine/Shader";
import { CameraManager } from "./manager/CameraManager";
import { EnvironmentManager } from "./manager/EnvironmentManager";
import { ProjectionManager } from "./manager/ProjectionManager";
import { Color } from "./object/Color";
import { CameraUi } from "./ui/CameraUi";
import { LightUi } from "./ui/LightUi";
import { ProjectionUi } from "./ui/ProjectionUi";
import { TransformUi } from "./ui/TransformUi";
import { TextureUi } from "./ui/TextureUI";
import { Importer } from "./util/Importer";
import { reset } from "./util/reset";
import { ExtensionBuilder } from "./engine/ExtensionBuilder";
import { RenderModeExtension } from "./engine/extensions/initial/RenderMode";
import { Object3DBuilder } from "./object/Object3DBuilder";
import { LightComponent } from "./components/Light";
import { ObjectManager } from "./manager/ObjectManager";
import { ObjectRenderer } from "./manager/ObjectRenderer";
import { TextureComponent } from "./components/Texture";
import { AnimationRunner, Animator } from "./components/Animator";
import { TextureManager } from "./manager/TextureManager";
import { TreeUi } from "./ui/TreeUi";
import { AnimationUi } from "./ui/AnimationUi";

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
    engine.customMap,
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

  objManager.subscribe(() => {
    treeUi.updateRootLists(objManager.getList());
  });

  treeUi.subscribeType("select-root", () => {
    treeUi.updateComponent(objManager.get(treeUi.selectedRootIdx));
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
