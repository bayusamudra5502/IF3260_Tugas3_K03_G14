import { ObjectManager } from "../manager/ObjectManager";
import { Object3DBuilder } from "../object/Object3DBuilder";

export class Importer {
  private fileObject: HTMLInputElement;
  private prevFile: string;

  constructor(
    private objectManager: ObjectManager,
    private objectLoader: Object3DBuilder,
    fileId: string
  ) {
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
    if (fileData === this.prevFile) {
      return;
    }
    this.prevFile = fileData;

    const object = this.objectLoader.fromJson(fileData);
    this.objectManager.add(object);
  }
}
