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
import { Animator } from "../components/Animator.js";
import { Color } from "./Color.js";
import { Face } from "./Face.js";
import { Object3D } from "./Object3D.js";
import { Vertex } from "./Vertices.js";
var Object3DBuilder = /** @class */ (function () {
    function Object3DBuilder(templateComponent) {
        this.templateComponents = [];
        this.templateComponents = templateComponent;
    }
    Object3DBuilder.prototype.fromJson = function (json) {
        var e_1, _a, e_2, _b, e_3, _c, e_4, _d;
        var _e, _f, _g, _h;
        var root;
        var jsonObject = JSON.parse(json);
        var points = jsonObject.pts;
        var objects = jsonObject.edge;
        var objectConfigMap = jsonObject.vertices;
        var map = new Map();
        /* Creating without child */
        var idx = 0;
        try {
            for (var objects_1 = __values(objects), objects_1_1 = objects_1.next(); !objects_1_1.done; objects_1_1 = objects_1.next()) {
                var obj = objects_1_1.value;
                var faceList = [];
                var config = objectConfigMap[obj.name];
                var topology = obj.topology;
                if (config.inverted && config.inverted.length < obj.num_face) {
                    throw new Error("inverted data is not equal");
                }
                var colorFace = Object3DBuilder.makeColorObject((_e = config.colors) !== null && _e !== void 0 ? _e : "#ffffff", obj.num_face);
                /* Build faces */
                for (var i = 0; i < obj.num_face; i++) {
                    var vertices = [];
                    try {
                        for (var _j = (e_2 = void 0, __values(topology[i])), _k = _j.next(); !_k.done; _k = _j.next()) {
                            var vIdx = _k.value;
                            vertices.push(Vertex.load(points[vIdx]));
                        }
                    }
                    catch (e_2_1) { e_2 = { error: e_2_1 }; }
                    finally {
                        try {
                            if (_k && !_k.done && (_b = _j.return)) _b.call(_j);
                        }
                        finally { if (e_2) throw e_2.error; }
                    }
                    var face = new Face({
                        color: colorFace[i],
                        vertices: vertices,
                        isInverted: config.inverted ? config.inverted[i] : false,
                    });
                    faceList.push(face);
                }
                var name_1 = (_f = obj.name) !== null && _f !== void 0 ? _f : idx.toString();
                var object = new Object3D(name_1, faceList, Vertex.load(config["joint_point"]));
                /* Animator Components */
                var animator = Animator.fromConfig({
                    animations: (_g = config.animations) !== null && _g !== void 0 ? _g : [],
                    centerMass: Vertex.load(config.joint_point),
                    cache: (_h = jsonObject.cache) !== null && _h !== void 0 ? _h : true,
                });
                object.addComponent(animator);
                try {
                    for (var _l = (e_3 = void 0, __values(this.templateComponents)), _m = _l.next(); !_m.done; _m = _l.next()) {
                        var i = _m.value;
                        object.addComponent(i);
                    }
                }
                catch (e_3_1) { e_3 = { error: e_3_1 }; }
                finally {
                    try {
                        if (_m && !_m.done && (_c = _l.return)) _c.call(_l);
                    }
                    finally { if (e_3) throw e_3.error; }
                }
                map.set(name_1, object);
                if (idx == 0) {
                    root = object;
                }
                idx++;
            }
        }
        catch (e_1_1) { e_1 = { error: e_1_1 }; }
        finally {
            try {
                if (objects_1_1 && !objects_1_1.done && (_a = objects_1.return)) _a.call(objects_1);
            }
            finally { if (e_1) throw e_1.error; }
        }
        /* Child assignment */
        for (var key in objectConfigMap) {
            var currentObj = map.get(key);
            if (!currentObj)
                throw new Error("Object '".concat(key, "' is not found in edges"));
            var childs = objectConfigMap[key].child;
            if (childs) {
                try {
                    for (var childs_1 = (e_4 = void 0, __values(childs)), childs_1_1 = childs_1.next(); !childs_1_1.done; childs_1_1 = childs_1.next()) {
                        var childId = childs_1_1.value;
                        var child = map.get(childId);
                        if (!child)
                            throw new Error("Child object '".concat(childId, "' is not found in edges"));
                        currentObj.addChild(child);
                    }
                }
                catch (e_4_1) { e_4 = { error: e_4_1 }; }
                finally {
                    try {
                        if (childs_1_1 && !childs_1_1.done && (_d = childs_1.return)) _d.call(childs_1);
                    }
                    finally { if (e_4) throw e_4.error; }
                }
            }
        }
        if (jsonObject.root_id) {
            var rootObj = map.get(jsonObject.root_id);
            if (!rootObj)
                throw new Error("Root object '".concat(jsonObject.root_id, "' is not exist"));
            root = rootObj;
        }
        return [root, map];
    };
    Object3DBuilder.makeColorObject = function (colors, faceCnt) {
        var result = [];
        if (colors instanceof Array) {
            if (colors.length != faceCnt) {
                throw new Error("color size is different");
            }
            for (var i = 0; i < faceCnt; i++) {
                var colorItem = colors[i];
                if (colorItem instanceof Array) {
                    result.push(Color.load(colorItem));
                }
                else if (typeof colorItem === "string") {
                    result.push(Color.hex(colorItem));
                }
                else {
                    new Error("unknown color type");
                }
            }
        }
        else if (typeof colors === "string") {
            for (var i = 0; i < faceCnt; i++) {
                result.push(Color.hex(colors));
            }
        }
        else {
            new Error("unknown color type");
        }
        return result;
    };
    return Object3DBuilder;
}());
export { Object3DBuilder };
//# sourceMappingURL=Object3DBuilder.js.map