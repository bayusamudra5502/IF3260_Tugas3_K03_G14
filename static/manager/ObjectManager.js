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
import { Listenable } from "../util/Listenable.js";
var ObjectManager = /** @class */ (function (_super) {
    __extends(ObjectManager, _super);
    function ObjectManager() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.objectsList = [];
        return _this;
    }
    ObjectManager.prototype.add = function (object) {
        this.objectsList.push(object);
        this.notify();
    };
    ObjectManager.prototype.get = function (idx) {
        return this.objectsList[idx];
    };
    ObjectManager.prototype.getList = function () {
        return this.objectsList;
    };
    ObjectManager.prototype.delete = function (idx) {
        this.objectsList.splice(idx, 1);
        this.notify();
    };
    return ObjectManager;
}(Listenable));
export { ObjectManager };
//# sourceMappingURL=ObjectManager.js.map