var Listenable = /** @class */ (function () {
    function Listenable() {
        this.listener = [];
    }
    Listenable.prototype.subscribe = function (func) {
        var idx = this.listener.length;
        this.listener.push(func);
        return idx;
    };
    Listenable.prototype.unsubscribe = function (idx) {
        this.listener.splice(idx, 1);
    };
    Listenable.prototype.notify = function () {
        for (var _i = 0, _a = this.listener; _i < _a.length; _i++) {
            var fn = _a[_i];
            fn();
        }
    };
    return Listenable;
}());
export { Listenable };
//# sourceMappingURL=Listenable.js.map