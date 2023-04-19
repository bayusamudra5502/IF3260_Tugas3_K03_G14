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
        var _a, _b, _c, _d;
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
            if (config.inverted && config.inverted.length < obj.num_face) {
                throw new Error("inverted data is not equal");
            }
            var colorFace = Object3DBuilder.makeColorObject((_a = config.colors) !== null && _a !== void 0 ? _a : "#ffffff", obj.num_face);
            /* Build faces */
            for (var i = 0; i < obj.num_face; i++) {
                var vertices = [];
                for (var _e = 0, _f = topology[i]; _e < _f.length; _e++) {
                    var vIdx = _f[_e];
                    vertices.push(Vertex.load(points[vIdx]));
                }
                var face = new Face({
                    color: colorFace[i],
                    vertices: vertices,
                    isInverted: config.inverted ? config.inverted[i] : false,
                });
                faceList.push(face);
            }
            var name_1 = (_b = obj.name) !== null && _b !== void 0 ? _b : idx.toString();
            var object = new Object3D(name_1, faceList, Vertex.load(config["joint_point"]));
            /* Animator Components */
            var animator = Animator.fromConfig({
                animations: (_c = config.animations) !== null && _c !== void 0 ? _c : [],
                centerMass: Vertex.load(config.joint_point),
                cache: (_d = jsonObject.cache) !== null && _d !== void 0 ? _d : true,
            });
            object.addComponent(animator);
            for (var _g = 0, _h = this.templateComponents; _g < _h.length; _g++) {
                var i = _h[_g];
                object.addComponent(i);
            }
            map.set(name_1, object);
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
            var childs = objectConfigMap[key].child;
            if (childs) {
                for (var _j = 0, childs_1 = childs; _j < childs_1.length; _j++) {
                    var childId = childs_1[_j];
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