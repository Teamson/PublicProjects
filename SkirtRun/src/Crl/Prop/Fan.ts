import GameLogic from "../GameLogic"
import SoundMgr from "../../Mod/SoundMgr"
import WxApi from "../../Libs/WxApi"

export default class Fan extends Laya.Script {
    constructor() {
        super()
    }
    myOwner: Laya.Sprite3D
    
    isDied: boolean = false

    onAwake() {
        this.myOwner = this.owner as Laya.Sprite3D
    }

    onUpdate() {
        let myPos: Laya.Vector3 = this.myOwner.transform.position.clone()
        let pPos: Laya.Vector3 = GameLogic.Share._playerCrl.myPos
        if (Math.abs(myPos.z - pPos.z) <= 1.5 && Math.abs(myPos.x - pPos.x) <= 2 && Math.abs(myPos.y - pPos.y) <= 0.2 && !this.isDied) {
            WxApi.DoVibrate()
            SoundMgr.instance.playSoundEffect('Jump.mp3')
            GameLogic.Share._playerCrl.fanJumpCB()
            this.isDied = true
        }
    }
}