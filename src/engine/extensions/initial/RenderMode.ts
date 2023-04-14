import { Buffer } from "../../Buffer";
import { RenderExtension } from "../../RenderExtension";

export class RenderModeExtension extends RenderExtension {
  run(webgl: WebGLRenderingContext, buffer: Buffer) {
    webgl.enable(webgl.DEPTH_TEST);
    webgl.enable(webgl.CULL_FACE);

    webgl.clear(webgl.COLOR_BUFFER_BIT | webgl.DEPTH_BUFFER_BIT);
  }
}
