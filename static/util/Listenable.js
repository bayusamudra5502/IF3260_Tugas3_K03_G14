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
    Listenable.prototype.notify = function () {
        this.eventTarget.dispatchEvent(new Event("update"));
    };
    return Listenable;
}());
export { Listenable };
//# sourceMappingURL=Listenable.js.map