import GameLogic from "./GameLogic"

export default class CameraCrl extends Laya.Script {
    constructor() {
        super()
    }

    myOwner: Laya.Camera

    onAwake() {
        this.myOwner = this.owner as Laya.Camera
    }

    onDisable() {

    }

    selectSkirt() {
        GameLogic.Share.isSelectingSkin = true
        let myPos = this.myOwner.transform.position.clone()
        myPos.y = 2
        myPos.z = 5
        this.myOwner.transform.position = myPos

        this.myOwner.transform.rotate(new Laya.Vector3(0, 180, 0), false, false)
    }

    resetCamera() {
        GameLogic.Share.isSelectingSkin = false
        this.myOwner.transform.position = GameLogic.Share.camStartPos
        this.myOwner.transform.rotation = GameLogic.Share.camStartRotation
    }

    onUpdate() {
        if (!GameLogic.Share._player || GameLogic.Share._playerCrl.isDied || GameLogic.Share.isSelectingSkin) {
            return
        }

        let pos = GameLogic.Share._player.transform.position.clone()
        let myPos = this.myOwner.transform.position.clone()
        myPos.x = pos.x
        myPos.y = pos.y + 4.5
        myPos.z = pos.z - 5
        Laya.Vector3.lerp(this.myOwner.transform.position.clone(), myPos, 0.2, myPos)
        this.myOwner.transform.position = myPos
    }
}