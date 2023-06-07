import GameLogic from "../GameLogic"
import WxApi from "../../Libs/WxApi"

export default class Scissors extends Laya.Script {
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
        if (Math.abs(myPos.z - pPos.z) <= 0.2 && Math.abs(myPos.x - pPos.x) <= 1 && Math.abs(myPos.y - pPos.y) <= 1 && !this.isDied) {
            WxApi.DoVibrate()
            GameLogic.Share._playerCrl.hurtCB()
            this.isDied = true
        }
    }
}