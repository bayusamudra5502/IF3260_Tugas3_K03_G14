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
import { RotationAnimator } from "../components/Animator.js";
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
        var _a;
        var root;
        var jsonObject = JSON.parse(json);
        var points = jsonObject.pts;
        var objects = jsonObject.edge;
        var objectConfigMap = jsonObject.vertices;
        var map = new Map();
        /* Creating without child */
        var idx = 0;
        for (var _i = 0, objects_1 = objects; _i < objects_1.length; _i++) {
            var obj = objects_1[_i];
            var faceList = [];
            var config = objectConfigMap[obj.name];
            var topology = obj.topology;
            var colorFace = Object3DBuilder.makeColorObject(obj !== null && obj !== void 0 ? obj : "#ffffff", obj.num_face);
            /* Build faces */
            for (var i = 0; i < obj.num_face; i++) {
                var vertices = [];
                for (var _b = 0, _c = topology[i]; _b < _c.length; _b++) {
                    var vIdx = _c[_b];
                    vertices.push(Vertex.load(points[vIdx]));
                }
                faceList.push(new Face({
                    color: colorFace[i],
                    vertices: vertices,
                    isInverted: !!config.inverted,
                }));
            }
            var object = new Object3D(faceList, Vertex.load(config["joint_point"]));
            /* Animator Components */
            var animator = RotationAnimator.fromConfig(__assign(__assign({}, config), { transform: object.transform }));
            object.addComponent(animator);
            for (var _d = 0, _e = this.templateComponents; _d < _e.length; _d++) {
                var i = _e[_d];
                object.addComponent(i);
            }
            map.set((_a = obj.name) !== null && _a !== void 0 ? _a : idx.toString(), object);
            if (idx == 0) {
                root = object;
            }
            idx++;
        }
        /* Child assignment */
        for (var key in objectConfigMap) {
            var currentObj = map.get(key);
            if (!currentObj)
                throw new Error("Object '".concat(key, "' is not found in edges"));
            var childs = objectConfigMap[key];
            if (childs) {
                for (var _f = 0, childs_1 = childs; _f < childs_1.length; _f++) {
                    var childId = childs_1[_f];
                    var child = map.get(childId);
                    if (!child)
                        throw new Error("Child object '".concat(childId, "' is not found in edges"));
                    currentObj.addChild(child);
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