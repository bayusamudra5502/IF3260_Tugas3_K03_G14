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
import { Oblique } from "../projection/Oblique.js";
import { Ortographic } from "../projection/Orthographic.js";
import { Perspective } from "../projection/Perspective.js";
import { Listenable } from "../util/Listenable.js";
var ProjectionUi = /** @class */ (function (_super) {
    __extends(ProjectionUi, _super);
    function ProjectionUi(aspectRatio, defaultProj, option) {
        if (aspectRatio === void 0) { aspectRatio = 1; }
        if (defaultProj === void 0) { defaultProj = "orthographic"; }
        if (option === void 0) { option = PROJECTION_UI_DEFAULT_OPTIONS; }
        var _this = _super.call(this) || this;
        _this.aspectRatio = aspectRatio;
        _this.option = option;
        _this.projType = document.getElementById(option.idProjectionType);
        _this.setType(defaultProj);
        _this.projType.addEventListener("change", function (e) {
            _this.setType(_this.projType.value);
        });
        return _this;
    }
    Object.defineProperty(ProjectionUi.prototype, "currentProjector", {
        get: function () {
            return this.projector;
        },
        enumerable: false,
        configurable: true
    });
    ProjectionUi.prototype.setType = function (type) {
        switch (type) {
            case "oblique":
                this.useOblique();
                break;
            case "orthographic":
                this.useOrtho();
                break;
            case "perspective":
                this.usePerspective();
                break;
        }
        this.projType.value = type;
        this.notify();
    };
    ProjectionUi.prototype.changeOption = function (optionId) {
        var pers = document.getElementById(this.option.idPerspectiveOption);
        var orth = document.getElementById(this.option.idOrthoOption);
        var obliq = document.getElementById(this.option.idObliqueOption);
        if (optionId == this.option.idPerspectiveOption) {
            pers.classList.remove("hide");
        }
        else {
            pers.classList.add("hide");
        }
        if (optionId == this.option.idOrthoOption) {
            orth.classList.remove("hide");
        }
        else {
            orth.classList.add("hide");
        }
        if (optionId == this.option.idObliqueOption) {
            obliq.classList.remove("hide");
        }
        else {
            obliq.classList.add("hide");
        }
    };
    ProjectionUi.prototype.usePerspective = function () {
        this.changeOption(this.option.idPerspectiveOption);
        var proj = new Perspective();
        proj.configure({
            aspectRatio: this.aspectRatio,
        });
        this.projector = proj;
        var near = document.getElementById(this.option.idPerspectiveNear);
        var far = document.getElementById(this.option.idPerspectiveFar);
        var aov = document.getElementById(this.option.idPerspectiveAngleOfView);
        var aovText = document.getElementById(this.option.idPerspectiveAngleOfViewText);
        /* Setup value */
        near.value = "".concat(proj.near);
        far.value = "".concat(proj.far);
        aov.value = "".concat(proj.fieldOfView);
        aovText.innerText = "".concat(proj.fieldOfView);
        /* Event handler */
        near.onchange = function (e) {
            var newValue = parseInt(near.value);
            !Number.isNaN(newValue) &&
                proj.configure({
                    zNear: newValue,
                });
        };
        far.onchange = function (e) {
            var newValue = parseInt(far.value);
            !Number.isNaN(newValue) &&
                proj.configure({
                    zFar: newValue,
                });
        };
        aov.onmousemove = function (e) {
            var newValue = parseInt(aov.value);
            !Number.isNaN(newValue) &&
                proj.configure({
                    fieldOfView: newValue,
                });
            aovText.innerText = aov.value;
        };
        aov.onchange = aov.onmousemove;
    };
    ProjectionUi.prototype.useOblique = function () {
        this.changeOption(this.option.idObliqueOption);
        var obl = new Oblique();
        this.projector = obl;
        var xangle = document.getElementById(this.option.idObliqueXAngle);
        var xangleText = document.getElementById(this.option.idObliqueXAngleText);
        var yangle = document.getElementById(this.option.idObliqueYAngle);
        var yangleText = document.getElementById(this.option.idObliqueYAngleText);
        var zproj = document.getElementById(this.option.idObliqueZProjection);
        /* Setup value */
        xangle.value = "".concat(obl.xAngle);
        xangleText.innerText = "".concat(obl.xAngle);
        yangle.value = "".concat(obl.yAngle);
        yangleText.innerText = "".concat(obl.yAngle);
        zproj.value = "".concat(obl.zProjection);
        /* Setup handler */
        xangle.onmousemove = function () {
            var newValue = parseInt(xangle.value);
            !Number.isNaN(newValue) &&
                obl.configure({
                    xAngle: newValue,
                });
            xangleText.innerText = xangle.value;
        };
        xangle.onchange = xangle.onmousemove;
        yangle.onmousemove = function () {
            var newValue = parseInt(yangle.value);
            !Number.isNaN(newValue) &&
                obl.configure({
                    yAngle: newValue,
                });
            yangleText.innerText = yangle.value;
        };
        yangle.onchange = yangle.onmousemove;
        zproj.onchange = function () {
            var newValue = parseInt(zproj.value);
            !Number.isNaN(newValue) &&
                obl.configure({
                    zProjection: newValue,
                });
        };
    };
    ProjectionUi.prototype.useOrtho = function () {
        this.changeOption(this.option.idOrthoOption);
        var orth = new Ortographic();
        this.projector = orth;
        var left = document.getElementById(this.option.idOrthoLeft);
        var right = document.getElementById(this.option.idOrthoRight);
        var top = document.getElementById(this.option.idOrthoTop);
        var bottom = document.getElementById(this.option.idOrthoBottom);
        var near = document.getElementById(this.option.idOrthoNear);
        var far = document.getElementById(this.option.idOrthoFar);
        /* Setup value */
        left.value = "".concat(orth.xLeft);
        right.value = "".concat(orth.xRight);
        top.value = "".concat(orth.yTop);
        bottom.value = "".concat(orth.yBottom);
        far.value = "".concat(orth.zFar);
        near.value = "".concat(orth.zNear);
        /* Setup handler */
        left.onchange = function () {
            var newValue = parseInt(left.value);
            !Number.isNaN(newValue) &&
                orth.configure({
                    left: newValue,
                });
        };
        right.onchange = function () {
            var newValue = parseInt(right.value);
            !Number.isNaN(newValue) &&
                orth.configure({
                    right: newValue,
                });
        };
        bottom.onchange = function () {
            var newValue = parseInt(bottom.value);
            !Number.isNaN(newValue) &&
                orth.configure({
                    bottom: newValue,
                });
        };
        top.onchange = function () {
            var newValue = parseInt(top.value);
            !Number.isNaN(newValue) &&
                orth.configure({
                    top: newValue,
                });
        };
        near.onchange = function () {
            var newValue = parseInt(near.value);
            !Number.isNaN(newValue) &&
                orth.configure({
                    near: newValue,
                });
        };
        far.onchange = function () {
            var newValue = parseInt(far.value);
            !Number.isNaN(newValue) &&
                orth.configure({
                    far: newValue,
                });
        };
    };
    return ProjectionUi;
}(Listenable));
export { ProjectionUi };
export var PROJECTION_UI_DEFAULT_OPTIONS = {
    idProjectionType: "projection-type",
    idPerspectiveOption: "perspective-option",
    idPerspectiveNear: "perspective-znear",
    idPerspectiveFar: "perspective-zfar",
    idPerspectiveAngleOfView: "perspective-aov",
    idPerspectiveAngleOfViewText: "perspective-aov-value",
    idOrthoOption: "ortho-option",
    idOrthoNear: "ortho-znear",
    idOrthoFar: "ortho-zfar",
    idOrthoLeft: "ortho-xleft",
    idOrthoRight: "ortho-xright",
    idOrthoBottom: "ortho-ybottom",
    idOrthoTop: "ortho-ytop",
    idObliqueOption: "oblique-option",
    idObliqueXAngle: "oblique-xangle",
    idObliqueXAngleText: "oblique-xangle-value",
    idObliqueYAngle: "oblique-yangle",
    idObliqueYAngleText: "oblique-yangle-value",
    idObliqueZProjection: "oblique-zproj",
};
//# sourceMappingURL=ProjectionUi.js.map