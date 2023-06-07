import GameLogic from "../GameLogic"

export default class Road extends Laya.Script {
    constructor() {
        super()
    }
    myOwner: Laya.Sprite3D
    jumpArea: Laya.Sprite3D

    hadJump: boolean = false

    onAwake() {
        this.myOwner = this.owner as Laya.Sprite3D
        this.jumpArea = this.myOwner.getChildAt(0) as Laya.Sprite3D
    }

    onUpdate() {
        if (!this.hadJump) {
            let pPos: Laya.Vector3 = GameLogic.Share._player.transform.position.clone()
            let jPos: Laya.Vector3 = this.jumpArea.transform.position.clone()
            if (Math.abs(pPos.z - jPos.z) <= 0.5 && Math.abs(pPos.y - jPos.y) <= 0.1) {
                this.hadJump = true
                this.jumpArea.destroy()
                GameLogic.Share._playerCrl.jumpCB()
            }
        }
    }
}