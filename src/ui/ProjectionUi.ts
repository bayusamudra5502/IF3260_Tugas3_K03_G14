import { Oblique } from "../projection/Oblique";
import { Ortographic } from "../projection/Orthographic";
import { Perspective } from "../projection/Perspective";
import { Projector } from "../projection/Projector";
import { Listenable } from "../util/Listenable";

export class ProjectionUi extends Listenable {
  private projector: Projector;
  private projType: HTMLSelectElement;

  constructor(
    private aspectRatio: number = 1,
    defaultProj: "oblique" | "perspective" | "orthographic" = "orthographic",
    private option: ProjectionUiOptions = PROJECTION_UI_DEFAULT_OPTIONS
  ) {
    super();
    this.projType = document.getElementById(
      option.idProjectionType
    ) as HTMLSelectElement;
    this.setType(defaultProj);

    this.projType.addEventListener("change", (e) => {
      this.setType(this.projType.value);
    });
  }

  get currentProjector() {
    return this.projector;
  }

  private setType(type: string) {
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
  }

  private changeOption(optionId: string) {
    const pers = document.getElementById(this.option.idPerspectiveOption);
    const orth = document.getElementById(this.option.idOrthoOption);
    const obliq = document.getElementById(this.option.idObliqueOption);

    if (optionId == this.option.idPerspectiveOption) {
      pers.classList.remove("hide");
    } else {
      pers.classList.add("hide");
    }

    if (optionId == this.option.idOrthoOption) {
      orth.classList.remove("hide");
    } else {
      orth.classList.add("hide");
    }

    if (optionId == this.option.idObliqueOption) {
      obliq.classList.remove("hide");
    } else {
      obliq.classList.add("hide");
    }
  }

  private usePerspective() {
    this.changeOption(this.option.idPerspectiveOption);
    const proj = new Perspective();
    proj.configure({
      aspectRatio: this.aspectRatio,
    });
    this.projector = proj;

    const near = document.getElementById(
      this.option.idPerspectiveNear
    ) as HTMLInputElement;
    const far = document.getElementById(
      this.option.idPerspectiveFar
    ) as HTMLInputElement;
    const aov = document.getElementById(
      this.option.idPerspectiveAngleOfView
    ) as HTMLInputElement;
    const aovText = document.getElementById(
      this.option.idPerspectiveAngleOfViewText
    );

    /* Setup value */
    near.value = `${proj.near}`;
    far.value = `${proj.far}`;
    aov.value = `${proj.fieldOfView}`;
    aovText.innerText = `${proj.fieldOfView}`;

    /* Event handler */
    near.onchange = (e) => {
      const newValue = parseFloat(near.value);
      !Number.isNaN(newValue) &&
        proj.configure({
          zNear: newValue,
        });
    };

    far.onchange = (e) => {
      const newValue = parseFloat(far.value);
      !Number.isNaN(newValue) &&
        proj.configure({
          zFar: newValue,
        });
    };

    aov.onmousemove = (e) => {
      const newValue = parseFloat(aov.value);
      !Number.isNaN(newValue) &&
        proj.configure({
          fieldOfView: newValue,
        });
      aovText.innerText = aov.value;
    };

    aov.onchange = aov.onmousemove;
  }

  private useOblique() {
    this.changeOption(this.option.idObliqueOption);
    const obl = new Oblique();
    this.projector = obl;

    const xangle = document.getElementById(
      this.option.idObliqueXAngle
    ) as HTMLInputElement;
    const xangleText = document.getElementById(this.option.idObliqueXAngleText);

    const yangle = document.getElementById(
      this.option.idObliqueYAngle
    ) as HTMLInputElement;
    const yangleText = document.getElementById(this.option.idObliqueYAngleText);

    const zproj = document.getElementById(
      this.option.idObliqueZProjection
    ) as HTMLInputElement;

    /* Setup value */
    xangle.value = `${obl.xAngle}`;
    xangleText.innerText = `${obl.xAngle}`;

    yangle.value = `${obl.yAngle}`;
    yangleText.innerText = `${obl.yAngle}`;

    zproj.value = `${obl.zProjection}`;

    /* Setup handler */
    xangle.onmousemove = () => {
      const newValue = parseFloat(xangle.value);
      !Number.isNaN(newValue) &&
        obl.configure({
          xAngle: newValue,
        });
      xangleText.innerText = xangle.value;
    };
    xangle.onchange = xangle.onmousemove;

    yangle.onmousemove = () => {
      const newValue = parseFloat(yangle.value);
      !Number.isNaN(newValue) &&
        obl.configure({
          yAngle: newValue,
        });
      yangleText.innerText = yangle.value;
    };
    yangle.onchange = yangle.onmousemove;

    zproj.onchange = () => {
      const newValue = parseFloat(zproj.value);
      !Number.isNaN(newValue) &&
        obl.configure({
          zProjection: newValue,
        });
    };
  }

  private useOrtho() {
    this.changeOption(this.option.idOrthoOption);
    const orth = new Ortographic();
    this.projector = orth;

    const left = document.getElementById(
      this.option.idOrthoLeft
    ) as HTMLInputElement;
    const right = document.getElementById(
      this.option.idOrthoRight
    ) as HTMLInputElement;
    const top = document.getElementById(
      this.option.idOrthoTop
    ) as HTMLInputElement;
    const bottom = document.getElementById(
      this.option.idOrthoBottom
    ) as HTMLInputElement;
    const near = document.getElementById(
      this.option.idOrthoNear
    ) as HTMLInputElement;
    const far = document.getElementById(
      this.option.idOrthoFar
    ) as HTMLInputElement;

    /* Setup value */
    left.value = `${orth.xLeft}`;
    right.value = `${orth.xRight}`;
    top.value = `${orth.yTop}`;
    bottom.value = `${orth.yBottom}`;
    far.value = `${orth.zFar}`;
    near.value = `${orth.zNear}`;

    /* Setup handler */
    left.onchange = () => {
      const newValue = parseFloat(left.value);
      !Number.isNaN(newValue) &&
        orth.configure({
          left: newValue,
        });
    };

    right.onchange = () => {
      const newValue = parseFloat(right.value);
      !Number.isNaN(newValue) &&
        orth.configure({
          right: newValue,
        });
    };

    bottom.onchange = () => {
      const newValue = parseFloat(bottom.value);
      !Number.isNaN(newValue) &&
        orth.configure({
          bottom: newValue,
        });
    };

    top.onchange = () => {
      const newValue = parseFloat(top.value);
      !Number.isNaN(newValue) &&
        orth.configure({
          top: newValue,
        });
    };

    near.onchange = () => {
      const newValue = parseFloat(near.value);
      !Number.isNaN(newValue) &&
        orth.configure({
          near: newValue,
        });
    };

    far.onchange = () => {
      const newValue = parseFloat(far.value);
      !Number.isNaN(newValue) &&
        orth.configure({
          far: newValue,
        });
    };
  }
}

export interface ProjectionUiOptions {
  idProjectionType: string;

  idPerspectiveOption: string;
  idPerspectiveNear: string;
  idPerspectiveFar: string;
  idPerspectiveAngleOfView: string;
  idPerspectiveAngleOfViewText: string;

  idOrthoOption: string;
  idOrthoLeft: string;
  idOrthoRight: string;
  idOrthoTop: string;
  idOrthoBottom: string;
  idOrthoNear: string;
  idOrthoFar: string;

  idObliqueOption: string;
  idObliqueXAngle: string;
  idObliqueXAngleText: string;
  idObliqueYAngle: string;
  idObliqueYAngleText: string;
  idObliqueZProjection: string;
}

export const PROJECTION_UI_DEFAULT_OPTIONS: ProjectionUiOptions = {
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
