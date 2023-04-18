var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
import { Buffer } from "./engine/Buffer.js";
import { Canvas } from "./engine/Canvas.js";
import RenderEngine from "./engine/RenderEngine.js";
import { ShaderProgram } from "./engine/Shader.js";
import { EnvironmentManager } from "./manager/EnvironmentManager.js";
import { ObjectManagerOld } from "./manager/ObjectManagerOld.js";
import { ProjectionManager } from "./manager/ProjectionManager.js";
import { TransformManager } from "./manager/TransformManager.js";
import { CameraManager } from "./manager/CameraManager.js";
import { Color } from "./object/Color.js";
import { Rotation } from "./transform/Rotation.js";
import { Scaling } from "./transform/Scaling.js";
import { Translation } from "./transform/Translation.js";
import { LightUi } from "./ui/LightUi.js";
import { ProjectionUi } from "./ui/ProjectionUi.js";
import { TransformUi } from "./ui/TransformUi.js";
import { Importer } from "./util/Importer.js";
import { reset } from "./util/reset.js";
import { CameraUi } from "./ui/CameraUi.js";
import { ExtensionBuilder } from "./engine/ExtensionBuilder.js";
import { LightRenderExtension } from "./engine/extensions/object/LightRender.js";
import { RenderModeExtension } from "./engine/extensions/initial/RenderMode.js";
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
    /* Setup manager */
    var rerender = function () {
        setTimeout(function () {
            var objs = objManager.generateDrawInfo();
            for (var _i = 0, objs_1 = objs; _i < objs_1.length; _i++) {
                var obj = objs_1[_i];
                var extension = extensionBuilder.build(LightRenderExtension, {
                    lightColor: envManager.lightColor,
                    lightSource: envManager.lightPosition,
                    normals: obj.normals,
                    useShading: envManager.useShading,
                });
                engine.render(__assign(__assign({}, obj), { extensions: [extension] }));
            }
        }, 0);
    };
    var projManager = new ProjectionManager();
    var cameraManager = new CameraManager();
    var envManager = new EnvironmentManager();
    envManager.update({
        cameraManager: cameraManager,
        projection: projManager,
        useShading: true,
    });
    var objManager = new ObjectManagerOld(envManager, "triangle");
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
            sourceLightColor: lightUi.lightColor,
        });
    });
    transformUi.subscribe(function () {
        var transformManager = new TransformManager();
        var idx = transformUi.transformIndex;
        var obj = objManager.get(idx);
        if (!obj)
            return;
        var translation = new Translation();
        var rotation = new Rotation();
        var scaling = new Scaling();
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
    cameraUi.subscribe(function () {
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
        requestAnimationFrame(loop);
    });
    var angleX = 0;
    var angleY = 0;
    var angleZ = 0;
    var rotationX = document.querySelector("#rotation-x");
    var rotationY = document.querySelector("#rotation-y");
    var rotationZ = document.querySelector("#rotation-z");
    var isRotationX = document.querySelector("#check-rotate-x");
    var isRotationY = document.querySelector("#check-rotate-y");
    var isRotationZ = document.querySelector("#check-rotate-z");
    var loop = function () {
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
//# sourceMappingURL=index.js.map