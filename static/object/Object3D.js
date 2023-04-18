import { Transform } from "../matrix/Transform.js";
var Object3D = /** @class */ (function () {
    function Object3D(facesList, joinPointvert) {
        this.facesList = facesList;
        this.joinPointvert = joinPointvert;
        this.childList = [];
        this.transformData = new Transform();
        this.componentList = [];
    }
    Object.defineProperty(Object3D.prototype, "transform", {
        get: function () {
            return this.transformData;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Object3D.prototype, "childs", {
        get: function () {
            return this.childList;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Object3D.prototype, "joinPoint", {
        get: function () {
            return this.joinPointvert;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Object3D.prototype, "faces", {
        get: function () {
            return this.facesList;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Object3D.prototype, "components", {
        get: function () {
            return this.componentList;
        },
        enumerable: false,
        configurable: true
    });
    Object3D.prototype.addChild = function (child) {
        this.childList.push(child);
    };
    Object3D.prototype.addComponent = function (component) {
        this.componentList.push(component);
    };
    return Object3D;
}());
export { Object3D };
//# sourceMappingURL=Object3D.js.map