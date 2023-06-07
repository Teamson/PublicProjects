import GameLogic from "../GameLogic"
import GameUI from "../../View/GameUI"
import SoundMgr from "../../Mod/SoundMgr"
import WxApi from "../../Libs/WxApi"

export default class Diamond extends Laya.Script {
    constructor() {
        super()
    }
    myOwner: Laya.Sprite3D

    onAwake() {
        this.myOwner = this.owner as Laya.Sprite3D
    }

    onUpdate() {
        this.myOwner.transform.rotate(new Laya.Vector3(0, 1, 0), true, false)
        let myPos: Laya.Vector3 = this.myOwner.transform.position.clone()
        let pPos: Laya.Vector3 = GameLogic.Share._playerCrl.myPos
        if (Laya.Vector3.distance(myPos, pPos) <= 1) {
            WxApi.DoVibrate()
            SoundMgr.instance.playSoundEffect('Diamond.mp3')
            GameUI.Share.getDiamond(myPos)
            GameLogic.Share.createDiamondFX(myPos)
            this.myOwner.destroy()
        }
    }
}