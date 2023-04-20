var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
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
import { StateComponent } from "../object/Component.js";
import { Rotation } from "../transform/Rotation.js";
import { Scaling } from "../transform/Scaling.js";
import { Translation } from "../transform/Translation.js";
import { Listenable } from "../util/Listenable.js";
var ANIMATOR_TRANSFORM = 10;
var Animator = /** @class */ (function (_super) {
    __extends(Animator, _super);
    function Animator(framePoints, jointPoint, cacheFrame) {
        if (cacheFrame === void 0) { cacheFrame = true; }
        var _this = _super.call(this) || this;
        _this.framePoints = framePoints;
        _this.jointPoint = jointPoint;
        _this.cacheFrame = cacheFrame;
        _this.matrixCache = [];
        _this.currentFrame = 0;
        _this.isActive = false;
        _this.currentFrameStatus = new Map();
        _this.nextFrameIdx = 0;
        _this.lastFramePointNumber = 0;
        _this.isInverted = false;
        /* Frame validation */
        if (framePoints.length == 0) {
            return _this;
        }
        for (var i = 1; i < framePoints.length; i++) {
            var first = framePoints[i - 1];
            var second = framePoints[i];
            if (first.frame_number >= second.frame_number) {
                throw new Error("frame must be increasing");
            }
        }
        _this.maxFrame = framePoints[framePoints.length - 1].frame_number;
        _this.matrixCache = Array(_this.maxFrame).fill(null);
        return _this;
    }
    Animator.prototype.setInverted = function (inverted) {
        this.isInverted = inverted;
    };
    Animator.prototype.fit = function (object) {
        this.object = object;
    };
    Animator.prototype.setActive = function (active) {
        this.isActive = active;
    };
    Animator.prototype.run = function () {
        if (!this.isActive || this.framePoints.length == 0)
            return;
        var nextFrame = this.framePoints[this.nextFrameIdx];
        console.log("FRAME #".concat(this.currentFrame));
        var matrix;
        if (this.matrixCache[this.currentFrame]) {
            matrix = this.matrixCache[this.currentFrame];
        }
        else {
            var progress = (this.currentFrame - this.lastFramePointNumber) /
                (nextFrame.frame_number - this.lastFramePointNumber);
            matrix = this.doTransform(nextFrame, progress);
            if (this.cacheFrame) {
                this.matrixCache[this.currentFrame] = matrix;
            }
        }
        this.object.setTransform(ANIMATOR_TRANSFORM, matrix);
        this.updateFrame();
        return null;
    };
    Animator.prototype.updateFrame = function () {
        if (this.isInverted) {
            var lastFrameIdx = this.nextFrameIdx - 1;
            lastFrameIdx =
                lastFrameIdx < 0
                    ? lastFrameIdx + this.framePoints.length
                    : lastFrameIdx;
            var lastFrame = this.framePoints[lastFrameIdx];
            if (lastFrame.frame_number == this.currentFrame) {
                this.currentFrameStatus.set(lastFrame.transform.type, lastFrame);
                this.lastFramePointNumber = lastFrameIdx;
                this.nextFrameIdx = this.currentFrame;
            }
            this.currentFrame =
                (this.currentFrame - 1 + this.maxFrame) % this.maxFrame;
        }
        else {
            var nextFrame = this.framePoints[this.nextFrameIdx];
            if (nextFrame.frame_number == this.currentFrame) {
                this.currentFrameStatus.set(nextFrame.transform.type, nextFrame);
                this.lastFramePointNumber = this.currentFrame;
                this.nextFrameIdx = (this.nextFrameIdx + 1) % this.framePoints.length;
            }
            this.currentFrame = (this.currentFrame + 1) % this.maxFrame;
        }
        if (this.currentFrame == 0) {
            this.currentFrameStatus.clear();
        }
    };
    Animator.prototype.doTransform = function (nextFrame, progress) {
        var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k, _l, _m, _o, _p, _q, _r, _s, _t, _u, _v, _w, _x, _y, _z, _0, _1, _2, _3, _4, _5, _6, _7, _8, _9, _10, _11;
        var status = this.currentFrameStatus.get(nextFrame.transform.type);
        var matrix;
        switch (nextFrame.transform.type) {
            case "rotation": {
                var rot = new Rotation();
                var lastX = (_b = (_a = status === null || status === void 0 ? void 0 : status.transform.options) === null || _a === void 0 ? void 0 : _a.angle_x) !== null && _b !== void 0 ? _b : 0;
                var lastY = (_d = (_c = status === null || status === void 0 ? void 0 : status.transform.options) === null || _c === void 0 ? void 0 : _c.angle_y) !== null && _d !== void 0 ? _d : 0;
                var lastZ = (_f = (_e = status === null || status === void 0 ? void 0 : status.transform.options) === null || _e === void 0 ? void 0 : _e.angle_z) !== null && _f !== void 0 ? _f : 0;
                var nextX = (_h = (_g = nextFrame.transform.options) === null || _g === void 0 ? void 0 : _g.angle_x) !== null && _h !== void 0 ? _h : 0;
                var nextY = (_k = (_j = nextFrame.transform.options) === null || _j === void 0 ? void 0 : _j.angle_y) !== null && _k !== void 0 ? _k : 0;
                var nextZ = (_m = (_l = nextFrame.transform.options) === null || _l === void 0 ? void 0 : _l.angle_z) !== null && _m !== void 0 ? _m : 0;
                rot.configure({
                    center: this.jointPoint,
                    angleX: lastX * (1 - progress) + nextX * progress,
                    angleY: lastY * (1 - progress) + nextY * progress,
                    angleZ: lastZ * (1 - progress) + nextZ * progress,
                });
                matrix = rot.matrix;
                break;
            }
            case "scaling": {
                var scl = new Scaling();
                var lastX = (_p = (_o = status === null || status === void 0 ? void 0 : status.transform.options) === null || _o === void 0 ? void 0 : _o.scale_x) !== null && _p !== void 0 ? _p : 0;
                var lastY = (_r = (_q = status === null || status === void 0 ? void 0 : status.transform.options) === null || _q === void 0 ? void 0 : _q.scale_y) !== null && _r !== void 0 ? _r : 0;
                var lastZ = (_t = (_s = status === null || status === void 0 ? void 0 : status.transform.options) === null || _s === void 0 ? void 0 : _s.scale_z) !== null && _t !== void 0 ? _t : 0;
                var nextX = (_v = (_u = nextFrame.transform.options) === null || _u === void 0 ? void 0 : _u.scale_x) !== null && _v !== void 0 ? _v : 0;
                var nextY = (_x = (_w = nextFrame.transform.options) === null || _w === void 0 ? void 0 : _w.scale_y) !== null && _x !== void 0 ? _x : 0;
                var nextZ = (_z = (_y = nextFrame.transform.options) === null || _y === void 0 ? void 0 : _y.scale_z) !== null && _z !== void 0 ? _z : 0;
                scl.configure({
                    center: this.jointPoint,
                    sx: lastX * (1 - progress) + nextX * progress,
                    sy: lastY * (1 - progress) + nextY * progress,
                    sz: lastZ * (1 - progress) + nextZ * progress,
                });
                matrix = scl.matrix;
                break;
            }
            case "translation": {
                var tr = new Translation();
                var lastX = (_1 = (_0 = status === null || status === void 0 ? void 0 : status.transform.options) === null || _0 === void 0 ? void 0 : _0.x) !== null && _1 !== void 0 ? _1 : 0;
                var lastY = (_3 = (_2 = status === null || status === void 0 ? void 0 : status.transform.options) === null || _2 === void 0 ? void 0 : _2.y) !== null && _3 !== void 0 ? _3 : 0;
                var lastZ = (_5 = (_4 = status === null || status === void 0 ? void 0 : status.transform.options) === null || _4 === void 0 ? void 0 : _4.z) !== null && _5 !== void 0 ? _5 : 0;
                var nextX = (_7 = (_6 = nextFrame.transform.options) === null || _6 === void 0 ? void 0 : _6.x) !== null && _7 !== void 0 ? _7 : 0;
                var nextY = (_9 = (_8 = nextFrame.transform.options) === null || _8 === void 0 ? void 0 : _8.y) !== null && _9 !== void 0 ? _9 : 0;
                var nextZ = (_11 = (_10 = nextFrame.transform.options) === null || _10 === void 0 ? void 0 : _10.z) !== null && _11 !== void 0 ? _11 : 0;
                tr.configure({
                    x: lastX * (1 - progress) + nextX * progress,
                    y: lastY * (1 - progress) + nextY * progress,
                    z: lastZ * (1 - progress) + nextZ * progress,
                });
                matrix = tr.matrix;
                break;
            }
        }
        return matrix;
    };
    Animator.fromConfig = function (config) {
        var e_1, _a;
        var _b;
        var frameList = [];
        try {
            for (var _c = __values(config.animations), _d = _c.next(); !_d.done; _d = _c.next()) {
                var frameConfig = _d.value;
                frameList.push(frameConfig);
            }
        }
        catch (e_1_1) { e_1 = { error: e_1_1 }; }
        finally {
            try {
                if (_d && !_d.done && (_a = _c.return)) _a.call(_c);
            }
            finally { if (e_1) throw e_1.error; }
        }
        return new Animator(frameList, config.centerMass, (_b = config.cache) !== null && _b !== void 0 ? _b : true);
    };
    return Animator;
}(StateComponent));
export { Animator };
var AnimationRunner = /** @class */ (function (_super) {
    __extends(AnimationRunner, _super);
    function AnimationRunner(fps) {
        var _this = _super.call(this) || this;
        _this.fps = fps;
        _this.objectList = [];
        return _this;
    }
    AnimationRunner.prototype.setActivate = function (root, activate) {
        var e_2, _a;
        var queue = [root];
        while (queue.length > 0) {
            var current = queue.shift();
            var animator = current.findComponent(Animator);
            animator.setActive(activate);
            try {
                for (var _b = (e_2 = void 0, __values(current.childs)), _c = _b.next(); !_c.done; _c = _b.next()) {
                    var child = _c.value;
                    queue.push(child);
                }
            }
            catch (e_2_1) { e_2 = { error: e_2_1 }; }
            finally {
                try {
                    if (_c && !_c.done && (_a = _b.return)) _a.call(_b);
                }
                finally { if (e_2) throw e_2.error; }
            }
        }
    };
    AnimationRunner.prototype.updateFps = function (fps) {
        var objList = null;
        if (this.objectList) {
            objList = this.objectList;
            this.stop();
        }
        this.fps = fps;
        if (objList) {
            this.run(objList);
        }
    };
    AnimationRunner.prototype.run = function () {
        var e_3, _a;
        var objects = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            objects[_i] = arguments[_i];
        }
        if (this.objectList) {
            this.stop();
        }
        this.objectList = objects;
        try {
            for (var objects_1 = __values(objects), objects_1_1 = objects_1.next(); !objects_1_1.done; objects_1_1 = objects_1.next()) {
                var object = objects_1_1.value;
                this.setActivate(object, true);
            }
        }
        catch (e_3_1) { e_3 = { error: e_3_1 }; }
        finally {
            try {
                if (objects_1_1 && !objects_1_1.done && (_a = objects_1.return)) _a.call(objects_1);
            }
            finally { if (e_3) throw e_3.error; }
        }
        this.rerenderFrame();
    };
    AnimationRunner.prototype.stop = function () {
        var e_4, _a;
        clearInterval(this.intervalId);
        try {
            for (var _b = __values(this.objectList), _c = _b.next(); !_c.done; _c = _b.next()) {
                var object = _c.value;
                this.setActivate(object, false);
            }
        }
        catch (e_4_1) { e_4 = { error: e_4_1 }; }
        finally {
            try {
                if (_c && !_c.done && (_a = _b.return)) _a.call(_b);
            }
            finally { if (e_4) throw e_4.error; }
        }
        this.objectList = null;
    };
    AnimationRunner.prototype.rerenderFrame = function () {
        var _this = this;
        this.intervalId = setInterval(function () {
            _this.notify();
        }, (1 / this.fps) * 1000);
    };
    return AnimationRunner;
}(Listenable));
export { AnimationRunner };
//# sourceMappingURL=Animator.js.map