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
var Listenable = /** @class */ (function (_super) {
    __extends(Listenable, _super);
    function Listenable() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Listenable.prototype.subscribe = function (func) {
        this.addEventListener("update", func);
    };
    Listenable.prototype.unsubscribe = function (func) {
        this.removeEventListener("update", func);
    };
    Listenable.prototype.notify = function () {
        this.dispatchEvent(new Event("update"));
    };
    return Listenable;
}(EventTarget));
export { Listenable };
//# sourceMappingURL=Listenable.js.map