import { ObjectManager } from "../manager/ObjectManager";
import { Object3D } from "../object/Object3D";

export class Importer {
  private fileObject: HTMLInputElement;

  constructor(private objectManager: ObjectManager, fileId: string) {
    const obj = document.getElementById(fileId);
    if (obj instanceof HTMLInputElement) {
      this.fileObject = obj;
    } else {
      throw new Error("file id must be html input type");
    }
  }

  private async getFileData() {
    const file = this.fileObject.files[0];
    return file.text();
  }

  async import() {
    const fileData = await this.getFileData();
    const object = Object3D.load(fileData);

    this.objectManager.add(object);
  }
}
