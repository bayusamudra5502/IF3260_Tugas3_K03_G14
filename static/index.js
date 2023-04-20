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
var __spreadArray = (this && this.__spreadArray) || function (to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
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
import { AnimationRunner, Animator } from "./components/Animator.js";
import { TextureManager } from "./manager/TextureManager.js";
import { TreeUi } from "./ui/TreeUi.js";
import { AnimationUi } from "./ui/AnimationUi.js";
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
    var animationUi = new AnimationUi();
    /* Setup manager */
    var projManager = new ProjectionManager();
    var cameraManager = new CameraManager();
    var envManager = new EnvironmentManager();
    var textureManager = new TextureManager();
    /* Animation */
    var animationRunner = new AnimationRunner(20);
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
        treeUi.updateComponent(objManager.get(treeUi.selectedRootIdx));
    });
    objManager.subscribe(rerender);
    projManager.subscribe(rerender);
    cameraManager.subscribe(rerender);
    envManager.subscribe(rerender);
    lightUi.subscribe(rerender);
    animationRunner.subscribe(rerender);
    var startAnimation = function () {
        var list = objManager.getList();
        var objList = list.map(function (_a) {
            var _b = __read(_a, 2), el = _b[0], _ = _b[1];
            return el;
        });
        animationRunner.run.apply(animationRunner, __spreadArray([], __read(objList), false));
    };
    var stopAnimation = function () {
        animationRunner.stop();
    };
    animationUi.subscribeType("run-animation", function () {
        if (animationUi.started) {
            startAnimation();
        }
        else {
            stopAnimation();
        }
    });
    animationUi.subscribeType("fps-rate", function () {
        animationRunner.updateFps(animationUi.fps);
    });
    animationUi.subscribeType("inverted", function () {
        var e_2, _a, e_3, _b;
        var isRun = animationRunner.isRun;
        var objects;
        if (isRun) {
            objects = animationRunner.animatedObjects;
            animationRunner.stop();
        }
        var data = objManager.getList();
        try {
            for (var data_1 = __values(data), data_1_1 = data_1.next(); !data_1_1.done; data_1_1 = data_1.next()) {
                var _c = __read(data_1_1.value, 2), _ = _c[0], map = _c[1];
                try {
                    for (var _d = (e_3 = void 0, __values(map.keys())), _e = _d.next(); !_e.done; _e = _d.next()) {
                        var key = _e.value;
                        var anim = map.get(key).findComponent(Animator);
                        anim.setInverted(animationUi.inverted);
                    }
                }
                catch (e_3_1) { e_3 = { error: e_3_1 }; }
                finally {
                    try {
                        if (_e && !_e.done && (_b = _d.return)) _b.call(_d);
                    }
                    finally { if (e_3) throw e_3.error; }
                }
            }
        }
        catch (e_2_1) { e_2 = { error: e_2_1 }; }
        finally {
            try {
                if (data_1_1 && !data_1_1.done && (_a = data_1.return)) _a.call(data_1);
            }
            finally { if (e_2) throw e_2.error; }
        }
        if (isRun) {
            animationRunner.run.apply(animationRunner, __spreadArray([], __read(objects), false));
        }
    });
    animationUi.subscribeType("next-frame", function () {
        var list = objManager.getList();
        var objList = list.reduce(function (prev, _a) {
            var _b = __read(_a, 2), _ = _b[0], data = _b[1];
            return __spreadArray(__spreadArray([], __read(prev), false), __read(data.values()), false);
        }, []);
        animationRunner.nextFrame.apply(animationRunner, __spreadArray([], __read(objList), false));
    });
    animationUi.subscribeType("prev-frame", function () {
        var list = objManager.getList();
        var objList = list.reduce(function (prev, _a) {
            var _b = __read(_a, 2), _ = _b[0], data = _b[1];
            return __spreadArray(__spreadArray([], __read(prev), false), __read(data.values()), false);
        }, []);
        animationRunner.previousFrame.apply(animationRunner, __spreadArray([], __read(objList), false));
    });
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
    });
}
main();
//# sourceMappingURL=index.js.map