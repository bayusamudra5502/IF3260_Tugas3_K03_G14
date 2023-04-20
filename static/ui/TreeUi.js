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
import { Listenable } from "../util/Listenable.js";
var TreeUi = /** @class */ (function (_super) {
    __extends(TreeUi, _super);
    function TreeUi(options) {
        if (options === void 0) { options = TREE_UI_CONFIG_DEFAULT; }
        var _this = _super.call(this) || this;
        _this.objectSelector = document.getElementById(options.objectSelectId);
        _this.componentTree = document.getElementById(options.componentTreeId);
        _this.treeIndent = options.treeIndent;
        var callback = _this.notify.bind(_this, "select-root");
        _this.objectSelector.onchange = function () {
            callback();
        };
        return _this;
    }
    TreeUi.prototype.updateNotifier = function () {
        var callback = this.notify.bind(this, "select-object");
        document
            .querySelectorAll("input[name=\"object-id\"]")
            .forEach(function (el) {
            el.onchange = function () {
                console.log("Mbee");
                callback();
            };
        });
    };
    Object.defineProperty(TreeUi.prototype, "selectedRootIdx", {
        get: function () {
            return parseInt(this.objectSelector.value);
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(TreeUi.prototype, "selectedObjectIdx", {
        get: function () {
            var _a;
            var selected = document.querySelector('input[name="object-id"]:checked');
            return (_a = selected === null || selected === void 0 ? void 0 : selected.value) !== null && _a !== void 0 ? _a : null;
        },
        enumerable: false,
        configurable: true
    });
    TreeUi.prototype.updateRootLists = function (objectList) {
        this.objectSelector.innerHTML = "\n    <option disabled selected value=\"-1\">Select Object</option>\n    ";
        for (var i = 0; i < objectList.length; i++) {
            this.objectSelector.innerHTML += "<option value=\"".concat(i, "\">Object #").concat(i, "</option>");
        }
    };
    TreeUi.prototype.updateComponent = function (_a) {
        var e_1, _b;
        var _c = __read(_a, 2), root = _c[0], _ = _c[1];
        var queue = [[root, 0]];
        this.componentTree.innerHTML = "";
        while (queue.length > 0) {
            var _d = __read(queue.shift(), 2), current = _d[0], level = _d[1];
            this.componentTree.innerHTML += "<div><label style=\"margin-left: ".concat(this.treeIndent * level, "rem;\"><input type=\"radio\" name=\"object-id\" value=\"").concat(current.id, "\">").concat(current.id, "</label></div>");
            try {
                for (var _e = (e_1 = void 0, __values(current.childs)), _f = _e.next(); !_f.done; _f = _e.next()) {
                    var child = _f.value;
                    queue.push([child, level + 1]);
                }
            }
            catch (e_1_1) { e_1 = { error: e_1_1 }; }
            finally {
                try {
                    if (_f && !_f.done && (_b = _e.return)) _b.call(_e);
                }
                finally { if (e_1) throw e_1.error; }
            }
        }
        this.updateNotifier();
    };
    return TreeUi;
}(Listenable));
export { TreeUi };
export var TREE_UI_CONFIG_DEFAULT = {
    objectSelectId: "object-select",
    componentTreeId: "component-tree",
    treeIndent: 1.5,
};
//# sourceMappingURL=TreeUi.js.map