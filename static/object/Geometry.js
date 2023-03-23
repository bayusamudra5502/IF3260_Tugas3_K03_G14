var Geometry = /** @class */ (function () {
    function Geometry() {
    }
    Geometry.angleDegToRad = function (degree) {
        return (degree / 180) * Math.PI;
    };
    Geometry.angleRadToDeg = function (rads) {
        return (rads / Math.PI) * 180;
    };
    return Geometry;
}());
export { Geometry };
//# sourceMappingURL=Geometry.js.map