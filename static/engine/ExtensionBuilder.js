var ExtensionBuilder = /** @class */ (function () {
    function ExtensionBuilder(program) {
        this.program = program;
    }
    ExtensionBuilder.prototype.build = function (extensionConstructor, options) {
        return new extensionConstructor(this.program, options);
    };
    return ExtensionBuilder;
}());
export { ExtensionBuilder };
//# sourceMappingURL=ExtensionBuilder.js.map