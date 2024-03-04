
import FxController from "./FxController";
import Stage from "../Stage";
import Data from "../tools/Data";

export default class ColliderController {
    constructor() {
        this.ColliderInit();
    }
    enable = false;
    rubbishPos: Laya.Vector3 = new Laya.Vector3(-1000, -1000, -1000);
    ColliderInit() {
        this.enable = true;
    }
    ColliderUpdate() {
        if (this.enable) {
          
        }
    }
    NormalBoxCheck_2D(aPos, aDirX, aDirZ, bPos, bDirX, bDirZ): boolean {
        let dirX = Math.abs(bPos.x - aPos.x);
        let dirZ = Math.abs(bPos.z - aPos.z);
        let hitX = aDirX + bDirX;
        let hitZ = aDirZ + bDirZ;
        return dirX < hitX && dirZ < hitZ;
    }
  
}