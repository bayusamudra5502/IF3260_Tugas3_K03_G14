var Listenable = /** @class */ (function () {
    function Listenable() {
        this.eventTarget = new EventTarget();
    }
    Listenable.prototype.subscribe = function (func) {
        this.eventTarget.addEventListener("update", func);
    };
    Listenable.prototype.unsubscribe = function (func) {
        this.eventTarget.removeEventListener("update", func);
    };
    Listenable.prototype.subscribeType = function (type, func) {
        this.eventTarget.addEventListener(type, func);
    };
    Listenable.prototype.unsubscribeType = function (type, func) {
        this.eventTarget.removeEventListener(type, func);
    };
    Listenable.prototype.notify = function (type) {
        if (type === void 0) { type = "update"; }
        this.eventTarget.dispatchEvent(new Event(type));
    };
    return Listenable;
}());
export { Listenable };
//# sourceMappingURL=Listenable.js.map