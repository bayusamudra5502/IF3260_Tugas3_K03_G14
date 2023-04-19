import { Object3DTuple, ObjectManager } from "../manager/ObjectManager";
import { Object3D } from "../object/Object3D";
import { Listenable } from "../util/Listenable";

export class TreeUi extends Listenable {
  private objectSelector: HTMLSelectElement;
  private componentTree: HTMLElement;

  private treeIndent: number;

  constructor(options: TreeUiConfig = TREE_UI_CONFIG_DEFAULT) {
    super();
    this.objectSelector = document.getElementById(
      options.objectSelectId
    ) as HTMLSelectElement;
    this.componentTree = document.getElementById(options.componentTreeId);
    this.treeIndent = options.treeIndent;

    const callback = this.notify.bind(this);
    this.objectSelector.onchange = callback;
  }

  private updateNotifier() {
    const callback = this.notify.bind(this);
    document
      .querySelectorAll(`input[name="object-id"]`)
      .forEach((el: HTMLInputElement) => {
        el.onclick = callback;
      });
  }

  get selectedRootIdx() {
    return parseInt(this.objectSelector.value);
  }

  get selectedObjectIdx() {
    const selected = document.querySelector(
      'input[name="object-id"]:checked'
    ) as HTMLInputElement;
    return selected?.value ?? null;
  }

  updateRootLists(objectList: Object3DTuple[]) {
    this.objectSelector.innerHTML = `
    <option disabled selected value="-1">Select Object</option>
    `;

    for (let i = 0; i < objectList.length; i++) {
      this.objectSelector.innerHTML += `<option disabled selected value="${i}">Object #${i}</option>`;
    }
  }

  updateComponent([root, _]: Object3DTuple) {
    const queue: [Object3D, number][] = [[root, 0]];

    this.componentTree.innerHTML = "";

    while (queue.length > 0) {
      const [current, level] = queue.shift();

      this.componentTree.innerHTML += `<label style="margin-left: ${
        this.treeIndent * level
      }rem;"><input type="radio" name="object-id" value="${current.id}">${
        current.id
      }</label>`;

      for (const child of current.childs) {
        queue.push([child, level + 1]);
      }
    }

    this.updateNotifier();
  }

  get currentObject() {
    return null;
  }
}

export interface TreeUiConfig {
  objectSelectId: string;
  componentTreeId: string;
  treeIndent: number;
}

export const TREE_UI_CONFIG_DEFAULT: TreeUiConfig = {
  objectSelectId: "object-select",
  componentTreeId: "component-tree",
  treeIndent: 1.5,
};
