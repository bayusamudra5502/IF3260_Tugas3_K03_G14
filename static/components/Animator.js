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
        _this.frameRenderer();
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
    Animator.prototype.increaseFrame = function () {
        this.currentFrame = (this.currentFrame + 1) % this.maxFrame;
        var matrix = this.matrixCache[this.currentFrame];
        this.object.setTransform(ANIMATOR_TRANSFORM, matrix);
    };
    Animator.prototype.decreaseFrame = function () {
        this.currentFrame = (this.currentFrame - 1 + this.maxFrame) % this.maxFrame;
        var matrix = this.matrixCache[this.currentFrame];
        this.object.setTransform(ANIMATOR_TRANSFORM, matrix);
    };
    Animator.prototype.run = function () {
        if (!this.isActive || this.framePoints.length == 0)
            return;
        var matrix = this.matrixCache[this.currentFrame];
        this.object.setTransform(ANIMATOR_TRANSFORM, matrix);
        this.updateFrame();
        return null;
    };
    Animator.prototype.frameRenderer = function () {
        var currentFrameStatus = new Map();
        var nextFrameIdx = 0;
        var lastFramePointNumber = 0;
        for (var i = 0; i < this.maxFrame; i++) {
            var nextFrame = this.framePoints[nextFrameIdx];
            var matrix = void 0;
            var progress = (this.currentFrame - lastFramePointNumber) /
                (nextFrame.frame_number - lastFramePointNumber);
            matrix = this.doTransform(nextFrame, progress, currentFrameStatus);
            this.matrixCache[this.currentFrame] = matrix;
            if (nextFrame.frame_number == this.currentFrame) {
                currentFrameStatus.set(nextFrame.transform.type, nextFrame);
                lastFramePointNumber = this.currentFrame;
                nextFrameIdx = (nextFrameIdx + 1) % this.framePoints.length;
            }
            this.currentFrame = (this.currentFrame + 1) % this.maxFrame;
        }
    };
    Animator.prototype.updateFrame = function () {
        if (this.isInverted) {
            this.currentFrame =
                (this.currentFrame - 1 + this.maxFrame) % this.maxFrame;
        }
        else {
            this.currentFrame = (this.currentFrame + 1) % this.maxFrame;
        }
    };
    Animator.prototype.doTransform = function (nextFrame, progress, frameStatus) {
        var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k, _l, _m, _o, _p, _q, _r, _s, _t, _u, _v, _w, _x, _y, _z, _0, _1, _2, _3, _4, _5, _6, _7, _8, _9, _10, _11;
        var status = frameStatus.get(nextFrame.transform.type);
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
        _this.objectList = null;
        return _this;
    }
    Object.defineProperty(AnimationRunner.prototype, "isRun", {
        get: function () {
            return !!this.objectList;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(AnimationRunner.prototype, "animatedObjects", {
        get: function () {
            return this.objectList;
        },
        enumerable: false,
        configurable: true
    });
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
    AnimationRunner.prototype.nextFrame = function () {
        var e_3, _a;
        var objects = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            objects[_i] = arguments[_i];
        }
        try {
            for (var objects_1 = __values(objects), objects_1_1 = objects_1.next(); !objects_1_1.done; objects_1_1 = objects_1.next()) {
                var obj = objects_1_1.value;
                var animator = obj.findComponent(Animator);
                animator.increaseFrame();
            }
        }
        catch (e_3_1) { e_3 = { error: e_3_1 }; }
        finally {
            try {
                if (objects_1_1 && !objects_1_1.done && (_a = objects_1.return)) _a.call(objects_1);
            }
            finally { if (e_3) throw e_3.error; }
        }
        this.notify();
    };
    AnimationRunner.prototype.previousFrame = function () {
        var e_4, _a;
        var objects = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            objects[_i] = arguments[_i];
        }
        try {
            for (var objects_2 = __values(objects), objects_2_1 = objects_2.next(); !objects_2_1.done; objects_2_1 = objects_2.next()) {
                var obj = objects_2_1.value;
                var animator = obj.findComponent(Animator);
                animator.decreaseFrame();
            }
        }
        catch (e_4_1) { e_4 = { error: e_4_1 }; }
        finally {
            try {
                if (objects_2_1 && !objects_2_1.done && (_a = objects_2.return)) _a.call(objects_2);
            }
            finally { if (e_4) throw e_4.error; }
        }
        this.notify();
    };
    AnimationRunner.prototype.updateFps = function (fps) {
        var objList = null;
        if (this.objectList) {
            objList = this.objectList;
            this.stop();
        }
        this.fps = fps;
        if (objList) {
            this.run.apply(this, __spreadArray([], __read(objList), false));
        }
    };
    AnimationRunner.prototype.run = function () {
        var e_5, _a;
        var objects = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            objects[_i] = arguments[_i];
        }
        if (this.objectList) {
            this.stop();
        }
        this.objectList = objects;
        try {
            for (var objects_3 = __values(objects), objects_3_1 = objects_3.next(); !objects_3_1.done; objects_3_1 = objects_3.next()) {
                var object = objects_3_1.value;
                this.setActivate(object, true);
            }
        }
        catch (e_5_1) { e_5 = { error: e_5_1 }; }
        finally {
            try {
                if (objects_3_1 && !objects_3_1.done && (_a = objects_3.return)) _a.call(objects_3);
            }
            finally { if (e_5) throw e_5.error; }
        }
        this.rerenderFrame();
    };
    AnimationRunner.prototype.stop = function () {
        var e_6, _a;
        clearInterval(this.intervalId);
        try {
            for (var _b = __values(this.objectList), _c = _b.next(); !_c.done; _c = _b.next()) {
                var object = _c.value;
                this.setActivate(object, false);
            }
        }
        catch (e_6_1) { e_6 = { error: e_6_1 }; }
        finally {
            try {
                if (_c && !_c.done && (_a = _b.return)) _a.call(_b);
            }
            finally { if (e_6) throw e_6.error; }
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