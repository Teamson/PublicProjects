import WxApi from "../../Libs/WxApi"
import Utility from "../../Mod/Utility"
import PlayerDataMgr from "../../Libs/PlayerDataMgr"
import GameLogic from "../GameLogic"
import SoundMgr from "../../Mod/SoundMgr"

export default class Door extends Laya.Script {
    constructor() {
        super()
    }
    myOwner: Laya.Sprite3D
    tips: Laya.Sprite3D
    propNode: Laya.Sprite3D
    prop: Laya.Sprite3D

    skirtColor: string = ''
    hairColor: string = ''
    topColor: string = ''
    hairId: number = 0
    topId: number = 0

    index: number = 0

    onAwake() {
        this.myOwner = this.owner as Laya.Sprite3D
        this.tips = this.myOwner.getChildAt(0) as Laya.Sprite3D
        this.propNode = this.myOwner.getChildAt(1) as Laya.Sprite3D
    }

    initData(id: number) {
        this.index = id
        this.createProp()
    }

    createProp() {
        let name = ''
        switch (this.index) {
            case 0:
                name = 'Skirt_Short'
                break
            case 1:
                name = 'Skirt_Long'
                break
            case 2:
                this.hairId = Utility.GetRandom(2, 8)
                name = 'Hair_' + this.hairId
                break
            case 3:
                this.topId = Utility.GetRandom(1, 6)
                name = 'Top_' + this.topId
                break
            case 4:
                name = 'Scissors'
                break
            case 5:
                name = 'Needle'
                break
        }
        let res = Laya.loader.getRes(WxApi.UnityPath + 'PropNode.lh') as Laya.Sprite3D
        this.prop = Laya.Sprite3D.instantiate(res.getChildByName(name) as Laya.Sprite3D, this.propNode, false)
        this.prop.transform.localPosition = new Laya.Vector3()

        let ms: Laya.MeshSprite3D = this.tips as Laya.MeshSprite3D
        Laya.Texture2D.load("res/Texture/Wz_" + (this.index + 1) + '.png', Laya.Handler.create(this, (texture) => {
            (ms.meshRenderer.material as Laya.BlinnPhongMaterial).albedoTexture = texture;
        }));

        if (this.index == 0) this.initSkirtColor()
        if (this.index == 2) this.initHairColor()
        if (this.index == 3) this.initTopColor()
    }

    initSkirtColor() {
        this.skirtColor = PlayerDataMgr.getRandColor()
        let ms: Laya.MeshSprite3D = this.prop as Laya.MeshSprite3D
        let mat: Laya.BlinnPhongMaterial = ms.meshRenderer.material as Laya.BlinnPhongMaterial
        mat.albedoColor = Utility.d3_getRgbByHex(this.skirtColor)
    }
    initHairColor() {
        this.hairColor = PlayerDataMgr.getRandColor()
        let ms: Laya.MeshSprite3D = this.prop as Laya.MeshSprite3D
        let mat: Laya.BlinnPhongMaterial = ms.meshRenderer.material as Laya.BlinnPhongMaterial
        mat.albedoColor = Utility.d3_getRgbByHex(this.hairColor)
    }
    initTopColor() {
        this.topColor = PlayerDataMgr.getRandColor()
        let ms: Laya.MeshSprite3D = this.prop as Laya.MeshSprite3D
        let mat: Laya.BlinnPhongMaterial = ms.meshRenderer.material as Laya.BlinnPhongMaterial
        mat.albedoColor = Utility.d3_getRgbByHex(this.topColor)
    }

    onUpdate() {
        this.propNode.transform.rotate(new Laya.Vector3(0, 1, 0), true, false)

        let myPos: Laya.Vector3 = this.myOwner.transform.position.clone()
        let pPos: Laya.Vector3 = GameLogic.Share._playerCrl.myPos
        if (Math.abs(myPos.z - pPos.z) <= 0.2 && Math.abs(myPos.x - pPos.x) <= 0.5 && Math.abs(myPos.y - pPos.y) <= 0.1) {
            switch (this.index) {
                case 0:
                    GameLogic.Share._playerCrl.addSkirt(this.skirtColor)
                    break
                case 1:
                    GameLogic.Share._playerCrl.addLongSkirt()
                    break
                case 2:
                    GameLogic.Share._playerCrl.changeHair(this.hairId, this.hairColor)
                    break
                case 3:
                    GameLogic.Share._playerCrl.changeTop(this.topId, this.topColor)
                    break
                case 4:
                    GameLogic.Share._playerCrl.hurtCB()
                    break
                case 5:
                    GameLogic.Share._playerCrl.addLongSkirt(true)
                    break
            }
            WxApi.DoVibrate()
            SoundMgr.instance.playSoundEffect('Door.mp3')
            GameLogic.Share.createCollectFX(myPos)
            this.myOwner.destroy()
        }
    }
}