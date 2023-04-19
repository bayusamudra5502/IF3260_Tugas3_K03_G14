import { Buffer } from "./engine/Buffer.js";
import { Canvas } from "./engine/Canvas.js";
import RenderEngine from "./engine/RenderEngine.js";
import { ShaderProgram } from "./engine/Shader.js";
import { CameraManager } from "./manager/CameraManager.js";
import { EnvironmentManager } from "./manager/EnvironmentManager.js";
import { ProjectionManager } from "./manager/ProjectionManager.js";
import { Color } from "./object/Color.js";
import { CameraUi } from "./ui/CameraUi.js";
import { LightUi } from "./ui/LightUi.js";
import { ProjectionUi } from "./ui/ProjectionUi.js";
import { TransformUi } from "./ui/TransformUi.js";
import { TextureUi } from "./ui/TextureUI.js";
import { Importer } from "./util/Importer.js";
import { reset } from "./util/reset.js";
import { ExtensionBuilder } from "./engine/ExtensionBuilder.js";
import { RenderModeExtension } from "./engine/extensions/initial/RenderMode.js";
import { Object3DBuilder } from "./object/Object3DBuilder.js";
import { LightComponent } from "./components/Light.js";
import { ObjectManager } from "./manager/ObjectManager.js";
import { ObjectRenderer } from "./manager/ObjectRenderer.js";
import { TextureComponent } from "./components/Texture.js";
import { AnimationRunner } from "./components/Animator.js";
import { TextureManager } from "./manager/TextureManager.js";
function main() {
    var canvas = new Canvas("drawing-canvas");
    var buffer = new Buffer(canvas);
    var shader = new ShaderProgram("vertex-shader", "fragment-shader", canvas);
    shader.compile();
    var extensionBuilder = new ExtensionBuilder(shader);
    var engine = new RenderEngine(canvas, buffer, shader, new Color(0.5, 0.5, 0.5, 1));
    /* Setup global extension */
    engine.addInitialExtension(extensionBuilder.build(RenderModeExtension, {}));
    /* */
    engine.clear();
    /* UI Setup */
    var projectionUi = new ProjectionUi(canvas.aspectRatio);
    var lightUi = new LightUi();
    var transformUi = new TransformUi();
    var cameraUi = new CameraUi();
    var textureUi = new TextureUi();
    /* Setup manager */
    var projManager = new ProjectionManager();
    var cameraManager = new CameraManager();
    var envManager = new EnvironmentManager();
    var textureManager = new TextureManager();
    envManager.update({
        cameraManager: cameraManager,
        projection: projManager,
        useShading: true,
    });
    /* Component */
    var lightComponent = new LightComponent(envManager);
    var textureComponent = new TextureComponent(engine.texture, engine.envMap, engine.bumpMap, textureManager, cameraManager);
    var object3DBuilder = new Object3DBuilder([
        lightComponent,
        textureComponent,
    ]);
    /* Object Manager */
    var objManager = new ObjectManager();
    /* Setup importer */
    var importer = new Importer(objManager, object3DBuilder, "loadfile-input");
    /* Renderer */
    var objectRenderer = new ObjectRenderer(envManager, extensionBuilder);
    /* Setup manager */
    var rerender = function () {
        setTimeout(function () {
            var objs = objManager.getList();
            for (var _i = 0, objs_1 = objs; _i < objs_1.length; _i++) {
                var obj = objs_1[_i];
                var infos = objectRenderer.generateDrawInfo(obj[0]);
                infos.forEach(function (info) { return engine.render(info); });
            }
        }, 0);
    };
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
            sourceLightColor: lightUi.lightColor,
        });
    });
    textureUi.subscribe(function () {
        textureManager.update(textureUi.mode);
        rerender();
    });
    // Transform UI harus berubah
    // transformUi.subscribe(() => {
    //   const transformManager = new TransformManager();
    //   const idx = transformUi.transformIndex;
    //   const obj = objManager.get(idx);
    //   if (!obj) return;
    //   const translation = new Translation();
    //   const rotation = new Rotation();
    //   const scaling = new Scaling();
    //   // Rotation
    //   rotation.configure({
    //     angleX: transformUi.rotation.rotationAngleX,
    //     angleY: transformUi.rotation.rotationAngleY,
    //     angleZ: transformUi.rotation.rotationAngleZ,
    //     center: obj.center,
    //   });
    //   transformManager.add(rotation);
    //   // Scaling
    //   scaling.configure({
    //     sx: transformUi.scale.Sx,
    //     sy: transformUi.scale.Sy,
    //     sz: transformUi.scale.Sz,
    //     center: obj.center,
    //   });
    //   transformManager.add(scaling);
    //   // Translation
    //   translation.configure({
    //     x: transformUi.translation.X,
    //     y: transformUi.translation.Y,
    //     z: transformUi.translation.Z,
    //   });
    //   transformManager.add(translation);
    //   obj.transform.updateMatrix(transformManager.matrix);
    //   rerender();
    // });
    cameraUi.subscribe(function () {
        cameraManager.update({
            radius: cameraUi.radius,
            xAngle: cameraUi.xAngle,
            yAngle: cameraUi.yAngle,
        });
        rerender();
    });
    objManager.subscribe(rerender);
    projManager.subscribe(rerender);
    cameraManager.subscribe(rerender);
    envManager.subscribe(rerender);
    lightUi.subscribe(rerender);
    /* Animation */
    var animationRunner = new AnimationRunner(20);
    animationRunner.subscribe(rerender);
    var check = document.querySelector("#check-run-animation");
    check.onchange = function () {
        if (check.checked) {
            var _a = objManager.get(0), obj = _a[0], _ = _a[1];
            animationRunner.run(obj);
        }
        else {
            animationRunner.stop();
        }
    };
    /* Event listeners */
    var resetButton = document.querySelector("#reset-button");
    var rerenderButton = document.querySelector("#rerender-button");
    resetButton.addEventListener("click", function () {
        reset(rerender);
    });
    rerenderButton.addEventListener("click", function () {
        rerender();
    });
    document.querySelector("#loadfile-submit").addEventListener("click", function () {
        importer.import();
        resetButton.removeAttribute("disabled");
        rerenderButton.removeAttribute("disabled");
        // requestAnimationFrame(loop);
    });
    // const loop = () => {
    //   if (isRotationX.checked) {
    //     angleX = (angleX + 0.25) % 360;
    //     rotationX.value = angleX.toString();
    //     rotationX.dispatchEvent(new Event("change"));
    //   }
    //   if (isRotationY.checked) {
    //     angleY = (angleY + 0.25) % 360;
    //     rotationY.value = angleY.toString();
    //     rotationY.dispatchEvent(new Event("change"));
    //   }
    //   if (isRotationZ.checked) {
    //     angleZ = (angleZ + 0.25) % 360;
    //     rotationZ.value = angleZ.toString();
    //     rotationZ.dispatchEvent(new Event("change"));
    //   }
    //   requestAnimationFrame(loop);
    // };
}
main();
//# sourceMappingURL=index.js.map