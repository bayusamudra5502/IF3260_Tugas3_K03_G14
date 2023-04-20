var __values = (this && this.__values) || function(o) {
    var s = typeof Symbol === "function" && Symbol.iterator, m = s && o[s], i = 0;
    if (m) return m.call(o);
    if (o && typeof o.length === "number") return {
        next: function () {
            if (o && i >= o.length) o = void 0;
            return { value: o && o[i++], done: !o };
        }
    };
    throw new TypeError(s ? "Object is not iterable." : "Symbol.iterator is not defined.");
};
var __read = (this && this.__read) || function (o, n) {
    var m = typeof Symbol === "function" && o[Symbol.iterator];
    if (!m) return o;
    var i = m.call(o), r, ar = [], e;
    try {
        while ((n === void 0 || n-- > 0) && !(r = i.next()).done) ar.push(r.value);
    }
    catch (error) { e = { error: error }; }
    finally {
        try {
            if (r && !r.done && (m = i["return"])) m.call(i);
        }
        finally { if (e) throw e.error; }
    }
    return ar;
};
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
import { TreeUi } from "./ui/TreeUi.js";
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
    var treeUi = new TreeUi();
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
            var e_1, _a;
            var objs = objManager.getList();
            try {
                for (var objs_1 = __values(objs), objs_1_1 = objs_1.next(); !objs_1_1.done; objs_1_1 = objs_1.next()) {
                    var obj = objs_1_1.value;
                    var infos = objectRenderer.generateDrawInfo(obj[0]);
                    infos.forEach(function (info) { return engine.render(info); });
                }
            }
            catch (e_1_1) { e_1 = { error: e_1_1 }; }
            finally {
                try {
                    if (objs_1_1 && !objs_1_1.done && (_a = objs_1.return)) _a.call(objs_1);
                }
                finally { if (e_1) throw e_1.error; }
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
    cameraUi.subscribe(function () {
        cameraManager.update({
            radius: cameraUi.radius,
            xAngle: cameraUi.xAngle,
            yAngle: cameraUi.yAngle,
        });
        rerender();
    });
    objManager.subscribe(function () {
        treeUi.updateRootLists(objManager.getList());
    });
    treeUi.subscribeType("select-root", function () {
        console.log("MBEEK");
        treeUi.updateComponent(objManager.get(treeUi.selectedRootIdx));
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
            var _a = __read(objManager.get(0), 2), obj = _a[0], _ = _a[1];
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
}
main();
//# sourceMappingURL=index.js.map