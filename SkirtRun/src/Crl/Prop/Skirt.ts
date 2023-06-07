import Utility from "../../Mod/Utility"
import GameLogic from "../GameLogic"
import SoundMgr from "../../Mod/SoundMgr"
import WxApi from "../../Libs/WxApi"

export default class Skirt extends Laya.Script {
    constructor() {
        super()
    }

    myOwner: Laya.Sprite3D = null

    myColor: string = ''

    onAwake() {
        this.myOwner = this.owner as Laya.Sprite3D
    }

    initColor(color: string) {
        this.myColor = color
        let ms: Laya.MeshSprite3D = this.myOwner as Laya.MeshSprite3D
        let mat: Laya.BlinnPhongMaterial = ms.meshRenderer.material as Laya.BlinnPhongMaterial
        mat.albedoColor = Utility.d3_getRgbByHex(color)
    }

    onUpdate() {
        let myPos: Laya.Vector3 = this.myOwner.transform.position.clone()
        let pPos: Laya.Vector3 = GameLogic.Share._player.transform.position.clone()
        if (Laya.Vector3.distance(myPos, pPos) <= 1) {
            WxApi.DoVibrate()
            SoundMgr.instance.playSoundEffect('Collect.mp3')
            GameLogic.Share._playerCrl.addSkirt(this.myColor)
            GameLogic.Share.createCollectFX(myPos)
            this.myOwner.destroy()
            return
        }

        this.myOwner.transform.rotate(new Laya.Vector3(0, 1, 0), true, false)
    }
}