import GameLogic from "../GameLogic"
import WxApi from "../../Libs/WxApi"

export default class Gear extends Laya.Script {
    constructor() {
        super()
    }
    myOwner: Laya.Sprite3D
    gear: Laya.Sprite3D

    isDied: boolean = false

    onAwake() {
        this.myOwner = this.owner as Laya.Sprite3D
        this.gear = this.myOwner.getChildAt(0) as Laya.Sprite3D
        let ani: Laya.Animator = this.myOwner.getComponent(Laya.Animator)
        ani.speed = 0.3
    }

    onUpdate() {
        let myPos: Laya.Vector3 = this.gear.transform.position.clone()
        let pPos: Laya.Vector3 = GameLogic.Share._playerCrl.myPos
        if (Math.abs(myPos.z - pPos.z) <= 0.1 && Math.abs(myPos.x - pPos.x) <= 0.3 && Math.abs(myPos.y - pPos.y) <= 0.3 && !this.isDied) {
            WxApi.DoVibrate()
            GameLogic.Share._playerCrl.hurtCB()
            this.isDied = true
        }
    }
}