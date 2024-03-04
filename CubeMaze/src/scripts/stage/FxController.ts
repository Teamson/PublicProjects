
import Tools from "../mods/Tools";
import Data from "../tools/Data";

export default class FxController {

    constructor() {
        this.init();
    }

    chestLight: Laya.Sprite3D;
    fireWorkBoom: Laya.Sprite3D;
    fireWorkAlawys: Laya.Sprite3D;
    fireWokrRain: Laya.Sprite3D;
    moveSmokeFx: Laya.Sprite3D;
    finishFx: Laya.Sprite3D;

    fxs = []
    smokeFx: Laya.Sprite3D;
    rubbishPos: Laya.Vector3;
    fireWork = [];

    init() {
        this.chestLight = Data.fxs.getChildByName("ChestLightFX") as Laya.Sprite3D;
        this.fireWorkBoom = Data.fxs.getChildByName("FireworkFX") as Laya.Sprite3D;
        this.fireWorkAlawys = Data.fxs.getChildByName("ConfettiSplashFX") as Laya.Sprite3D;
        this.fireWokrRain = Data.fxs.getChildByName("ConfettiRainFX") as Laya.Sprite3D;
        this.moveSmokeFx = Data.fxs.getChildByName("MoveSmokeFX") as Laya.Sprite3D;
        this.finishFx = Data.fxs.getChildByName("FinishFX") as Laya.Sprite3D;
    }
    cleanFxs() {
        for (let i = 0; i < this.fxs.length; i++) {
            this.fxs[i].destroy();
        }
    }
    BornFireWorksAlways(pos) {
        this.fireWork.push(this.BornFx(pos, this.fireWorkAlawys));
    }
    clearFireWork() {
        for (let i = 0; i < this.fireWork.length; i++) {
            this.fireWork[i].destroy();
        }
    }
    BornChestAllFx(chestPos) {
        this.BornFx(Tools.Vector3Add(chestPos, new Laya.Vector3(0, 1, 6.5)), this.chestLight)

        // this.BornFx(Tools.Vector3Add(chestPos, new Laya.Vector3(0, 2, 6)), this.fireWorkBoom)
        // this.BornFx(Tools.Vector3Add(chestPos, new Laya.Vector3(0, 3, 10)), this.fireWokrRain)
    }
    BornMoveSmokeFx() {
        if (this.smokeFx)
            return;
        let obj = this.BornFxOnly(Data.player.transform.position.clone(), this.moveSmokeFx) as Laya.Sprite3D
        Data.player.addChild(obj);
        obj.transform.localPosition = new Laya.Vector3(0, -1000, 0);
        this.smokeFx = obj
    }
    BornFinishFx(pos) {
        this.BornFx(pos.clone(), this.finishFx);
    }

    BornFx(pos, prefab) {
        let obj = prefab.clone();
        Data.scene3D.addChild(obj);
        obj.transform.position = pos;
        this.fxs.push(obj);
        return obj;
    }
    BornFxOnly(pos, prefab) {
        let obj = prefab.clone();
        Data.scene3D.addChild(obj);
        obj.transform.position = pos;
        return obj;
    }

}