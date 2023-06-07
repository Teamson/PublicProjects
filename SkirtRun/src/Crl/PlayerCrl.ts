
import GameLogic from "./GameLogic"
import { PlayerAni } from "../Mod/Entity"
import Utility from "../Mod/Utility"
import PlayerDataMgr from "../Libs/PlayerDataMgr"
import SoundMgr from "../Mod/SoundMgr"
import WxApi from "../Libs/WxApi"

export default class PlayerCrl extends Laya.Script {
    constructor() {
        super()
    }
    myOwner: Laya.Sprite3D = null

    _ani: Laya.Animator = null
    skirtArr: Laya.Sprite3D[] = []
    topArr: Laya.Sprite3D[] = []
    hairArr: Laya.Sprite3D[] = []
    hitFX: Laya.Sprite3D = null
    flyFX: Laya.Sprite3D = null

    baseSpeed: number = 0.065
    speed: number = 0
    fallSpeed: number = -0.055
    touchX: number = 375
    edgeMax: number = 1.8
    curAniName: PlayerAni = PlayerAni.Ani_Idle
    emptyMax: number = -0.17

    canMove: boolean = true
    hadLeg: boolean = false
    isJumping: boolean = false
    isFalling: boolean = false
    isHurt: boolean = false
    isDied: boolean = false

    onAwake(): void {
        this.myOwner = this.owner as Laya.Sprite3D
        this._ani = this.myOwner.getChildAt(0).getComponent(Laya.Animator)
        this.skirtArr = Utility.findNodeByNameArr(this.myOwner, 'Skirt')
        this.topArr = Utility.findNodeByNameArr(this.myOwner, 'Top')
        this.hairArr = Utility.findNodeByNameArr(this.myOwner, 'Hair')
        this.hitFX = this.myOwner.getChildByName('Hit_FX') as Laya.Sprite3D
        this.hitFX.active = false
        this.flyFX = this.myOwner.getChildByName('Fly_FX') as Laya.Sprite3D
        this.flyFX.active = false
        this.playAni(PlayerAni.Ani_Idle)
        this.initData()

        this.changeFirstSkirt(PlayerDataMgr.getPlayerData().skinId)
    }

    get myPos(): Laya.Vector3 {
        return this.myOwner.transform.position.clone()
    }

    initData() {
        for (let i = 0; i < this.hairArr.length; i++) {
            this.hairArr[i].active = i == 0
            let ms: Laya.MeshSprite3D = this.hairArr[i] as Laya.MeshSprite3D
            let mat: Laya.BlinnPhongMaterial = ms.meshRenderer.material as Laya.BlinnPhongMaterial
            mat.albedoColor = Utility.d3_getRgbByHex(PlayerDataMgr.getRandColor())
        }
        for (let i = 0; i < this.topArr.length; i++) {
            this.topArr[i].active = i == this.topArr.length - 1
            let ms: Laya.SkinnedMeshSprite3D = this.topArr[i] as Laya.SkinnedMeshSprite3D
            let mat: Laya.BlinnPhongMaterial = ms.skinnedMeshRenderer.material as Laya.BlinnPhongMaterial
            mat.albedoColor = Utility.d3_getRgbByHex(PlayerDataMgr.getRandColor())
        }
        for (let i = 1; i < this.skirtArr.length; i++) {
            let skirt = this.skirtArr[i]
            let ms: Laya.SkinnedMeshSprite3D = skirt as Laya.SkinnedMeshSprite3D
            let mat: Laya.BlinnPhongMaterial = ms.skinnedMeshRenderer.material as Laya.BlinnPhongMaterial
            mat.tilingOffset = new Laya.Vector4(1, 1, 0, this.emptyMax)
        }
    }

    playAni(name: PlayerAni, speed: number = 1, normalizedTime: number = 0) {
        if (name == this.curAniName) return
        if (name == PlayerAni.Ani_Fly_1) speed = 0.85
        if (name == PlayerAni.Ani_Walk) speed = 1.2
        this._ani.crossFade(name, 0.2, 0, normalizedTime)
        this._ani.speed = speed
        this.curAniName = name
    }

    changeFirstSkirt(id: number, isReset: boolean = false) {
        let dir: string = isReset ? "res/Texture/Skirt_Color_1.png" : "res/Texture/Skirt_" + (id + 1) + ".png"
        let ms: Laya.SkinnedMeshSprite3D = this.skirtArr[0] as Laya.SkinnedMeshSprite3D
        Laya.Texture2D.load(dir, Laya.Handler.create(this, (texture) => {
            (ms.skinnedMeshRenderer.material as Laya.BlinnPhongMaterial).albedoTexture = texture;
            (ms.skinnedMeshRenderer.material as Laya.BlinnPhongMaterial).albedoColor = new Laya.Vector4(1, 1, 1, 1);
        }));
    }

    changeHair(id: number, color: string) {
        for (let i = 0; i < this.hairArr.length; i++) {
            let hair: Laya.Sprite3D = this.hairArr[i]
            hair.active = i == id - 1
            if (hair.active) {
                let ms: Laya.MeshSprite3D = hair as Laya.MeshSprite3D
                let mat: Laya.BlinnPhongMaterial = ms.meshRenderer.material as Laya.BlinnPhongMaterial
                mat.albedoColor = Utility.d3_getRgbByHex(color)
            }
        }
    }

    changeTop(id: number, color: string) {
        for (let i = 0; i < this.topArr.length; i++) {
            let top: Laya.Sprite3D = this.topArr[i]
            top.active = i == id - 1
            if (top.active) {
                let ms: Laya.SkinnedMeshSprite3D = this.topArr[i] as Laya.SkinnedMeshSprite3D
                let mat: Laya.BlinnPhongMaterial = ms.skinnedMeshRenderer.material as Laya.BlinnPhongMaterial
                mat.albedoColor = Utility.d3_getRgbByHex(color)
            }
        }
    }

    decSkirt() {
        if (GameLogic.Share.isGameOver) return
        for (let i = this.skirtArr.length - 1; i >= 0; i--) {
            let skirt = this.skirtArr[i]
            let ms: Laya.SkinnedMeshSprite3D = skirt as Laya.SkinnedMeshSprite3D
            let mat: Laya.BlinnPhongMaterial = ms.skinnedMeshRenderer.material as Laya.BlinnPhongMaterial
            let os: Laya.Vector4 = mat.tilingOffset.clone()
            if (os.w <= this.emptyMax) continue

            os.w -= 0.17 / 50
            if (os.w < this.emptyMax) os.w = this.emptyMax
            mat.tilingOffset = os
            this.playFlySound()
            break
        }
    }

    isPlayingFlySound: boolean = false
    playFlySound() {
        if (this.isPlayingFlySound) return
        this.isPlayingFlySound = true
        SoundMgr.instance.playSoundEffect('Fly.mp3', 0)
        WxApi.loopVibrate()
    }
    stopFlySound() {
        this.isPlayingFlySound = false
        SoundMgr.instance.stopSound('Fly.mp3')
        WxApi.stopLoopVibrate()
    }

    addSkirt(color: string) {
        if (this.isFullSkirt) {
            for (let i = this.skirtArr.length - 1; i > 0; i--) {
                let skirt = this.skirtArr[i]
                let ms: Laya.SkinnedMeshSprite3D = skirt as Laya.SkinnedMeshSprite3D
                let mat: Laya.BlinnPhongMaterial = ms.skinnedMeshRenderer.material as Laya.BlinnPhongMaterial

                let skirt1 = this.skirtArr[i - 1]
                let ms1: Laya.SkinnedMeshSprite3D = skirt1 as Laya.SkinnedMeshSprite3D
                let mat1: Laya.BlinnPhongMaterial = ms1.skinnedMeshRenderer.material as Laya.BlinnPhongMaterial
                mat.albedoColor = mat1.albedoColor.clone()
            }
            let skirt = this.skirtArr[0]
            let ms: Laya.SkinnedMeshSprite3D = skirt as Laya.SkinnedMeshSprite3D
            let mat: Laya.BlinnPhongMaterial = ms.skinnedMeshRenderer.material as Laya.BlinnPhongMaterial
            mat.albedoColor = Utility.d3_getRgbByHex(color)
        } else {
            for (let i = 0; i < this.skirtArr.length; i++) {
                let skirt = this.skirtArr[i]
                let ms: Laya.SkinnedMeshSprite3D = skirt as Laya.SkinnedMeshSprite3D
                let mat: Laya.BlinnPhongMaterial = ms.skinnedMeshRenderer.material as Laya.BlinnPhongMaterial
                let os: Laya.Vector4 = mat.tilingOffset.clone()
                if (os.w > this.emptyMax && os.w < 0) {
                    os.w = 0
                    mat.tilingOffset = os
                    if (i < this.skirtArr.length - 1) {
                        let skirt1 = this.skirtArr[i + 1]
                        let ms1: Laya.SkinnedMeshSprite3D = skirt1 as Laya.SkinnedMeshSprite3D
                        let mat1: Laya.BlinnPhongMaterial = ms1.skinnedMeshRenderer.material as Laya.BlinnPhongMaterial
                        let os1: Laya.Vector4 = mat1.tilingOffset.clone()
                        os1.w = 0
                        mat1.tilingOffset = os
                    }
                    break
                }
                if (os.w <= this.emptyMax) {
                    os.w = 0
                    mat.albedoColor = Utility.d3_getRgbByHex(color)
                    mat.tilingOffset = os
                    break
                }
            }
        }
    }

    addLongSkirt(isRandom: boolean = false) {
        for (let i = 0; i < this.skirtArr.length; i++) {
            let skirt = this.skirtArr[i]
            let ms: Laya.SkinnedMeshSprite3D = skirt as Laya.SkinnedMeshSprite3D
            let mat: Laya.BlinnPhongMaterial = ms.skinnedMeshRenderer.material as Laya.BlinnPhongMaterial
            let os: Laya.Vector4 = mat.tilingOffset.clone()
            os.w = 0
            mat.tilingOffset = os
            if (!isRandom)
                mat.albedoColor = Utility.d3_getRgbByHex(PlayerDataMgr.colorArr[i])
            else
                mat.albedoColor = Utility.d3_getRgbByHex(Utility.getRandomItemInArr(PlayerDataMgr.colorArr))
        }
    }

    get isFullSkirt() {
        let skirt = this.skirtArr[this.skirtArr.length - 1]
        let ms: Laya.SkinnedMeshSprite3D = skirt as Laya.SkinnedMeshSprite3D
        let mat: Laya.BlinnPhongMaterial = ms.skinnedMeshRenderer.material as Laya.BlinnPhongMaterial
        let os: Laya.Vector4 = mat.tilingOffset.clone()
        return os.w >= 0
    }

    get isEmptySkirt() {
        let skirt = this.skirtArr[0]
        let ms: Laya.SkinnedMeshSprite3D = skirt as Laya.SkinnedMeshSprite3D
        let mat: Laya.BlinnPhongMaterial = ms.skinnedMeshRenderer.material as Laya.BlinnPhongMaterial
        let os: Laya.Vector4 = mat.tilingOffset.clone()
        return os.w <= this.emptyMax
    }

    showAllSkirt() {
        Laya.timer.frameLoop(1, this, () => {
            for (let i = 0; i < this.skirtArr.length; i++) {
                let skirt = this.skirtArr[i]
                let ms: Laya.SkinnedMeshSprite3D = skirt as Laya.SkinnedMeshSprite3D
                let mat: Laya.BlinnPhongMaterial = ms.skinnedMeshRenderer.material as Laya.BlinnPhongMaterial
                let os: Laya.Vector4 = mat.tilingOffset.clone()
                if (os.w >= 0) continue

                os.w += 0.17 / 15
                if (os.w > 0) os.w = 0
                mat.tilingOffset = os
                break
            }
        })
    }

    stopWalk() {
        this.speed = 0
        if (!this.isJumping && !this.isHurt) this.playAni(PlayerAni.Ani_Idle)
    }
    resumeWalk() {
        this.speed = this.baseSpeed
        if (!this.isJumping && !this.isHurt) this.playAni(PlayerAni.Ani_Walk)
    }

    moveX() {
        if (GameLogic.Share.isGameOver || !this.canMove) return

        let speed = this.speed
        if (this.isEmptySkirt && this.isFalling) {
            speed = 0
        }
        let pos = new Laya.Vector3(0, 0, speed)
        this.myOwner.transform.translate(pos, false)

        let x = this.touchX
        x -= Laya.stage.displayWidth / 2
        x = x / (Laya.stage.displayWidth / 2) * (this.edgeMax + 0.5)
        pos = this.myOwner.transform.position.clone()
        pos.x = -x
        Laya.Vector3.lerp(this.myOwner.transform.position.clone(), pos, 0.2, pos)
        this.myOwner.transform.position = pos
    }

    jumpCB() {
        this.isJumping = true
        this.playAni(PlayerAni.Ani_Jump, 0.8)
        let pos = this.myPos
        pos.y += 3
        pos.z += 2
        Utility.TmoveToYZ(this.myOwner, 500, pos, () => {
            this.isFalling = true
            if (GameLogic.Share.roadIndex >= GameLogic.Share._roadArr.length) {
                this.fallSpeed = -0.025
                this.baseSpeed = 0.07
                if (this.speed > 0) this.speed = this.baseSpeed
            }
            this.playAni(PlayerAni.Ani_Fly_1)
        })
    }

    fanJumpCB() {
        this.isJumping = true
        this.playAni(PlayerAni.Ani_Jump, 0.8)
        let pos = this.myPos
        pos.y += 7
        pos.z += 4
        Utility.TmoveToYZ(this.myOwner, 500, pos.clone(), () => {
            this.isFalling = true
            if (GameLogic.Share.roadIndex >= GameLogic.Share._roadArr.length) {
                this.fallSpeed = -0.025
                this.baseSpeed = 0.07
                if (this.speed > 0) this.speed = this.baseSpeed
            }
            this.playAni(PlayerAni.Ani_Fly_1)
        })
    }

    checkLand() {
        this.myOwner.transform.translate(new Laya.Vector3(0, this.fallSpeed, 0), false)
        let nextLoad: Laya.Sprite3D = GameLogic.Share._roadArr[GameLogic.Share.roadIndex]
        let loadPos: Laya.Vector3 = nextLoad.transform.position.clone()
        let myPos = this.myPos
        if (Math.abs(myPos.y - loadPos.y) <= 0.2 && myPos.z >= loadPos.z) {
            //着陆
            GameLogic.Share.roadIndex++
            this.isFalling = false
            this.isJumping = false
            myPos.y = loadPos.y
            this.myOwner.transform.position = myPos
            this.playAni(this.speed == 0 ? PlayerAni.Ani_Idle : PlayerAni.Ani_Walk)
        } else if (Math.abs(myPos.y - loadPos.y) <= 0.2 && myPos.z < loadPos.z) {
            //失败
            this.isDied = true
            this.playAni(PlayerAni.Ani_Fall)
            GameLogic.Share.gameOver(false)
        }
    }

    checkLandCylinder() {
        if (GameLogic.Share.isGameOver) return
        let disArr: number[] = []
        for (let i = 0; i < GameLogic.Share._cylinderArr.length; i++) {
            let cylinder: Laya.Sprite3D = GameLogic.Share._cylinderArr[i]
            let cPos: Laya.Vector3 = cylinder.transform.position.clone()
            let myPos: Laya.Vector3 = this.myPos
            disArr.push(Laya.Vector3.distance(cPos, myPos))
        }
        let tempArr: number[] = [].concat(disArr)
        disArr.sort((a, b) => { return a - b })
        let index: number = tempArr.indexOf(disArr[0])
        let closestCyl: Laya.Sprite3D = GameLogic.Share._cylinderArr[index]
        let ccPos: Laya.Vector3 = closestCyl.transform.position.clone()
        let lastCylinder: Laya.Sprite3D = GameLogic.Share._cylinderArr[GameLogic.Share._cylinderArr.length - 1]
        if (Laya.Vector3.distance(ccPos, this.myPos) <= 0.5 || this.myPos.y <= ccPos.y || this.myPos.z > lastCylinder.transform.position.z) {
            this.myOwner.transform.position = ccPos
            this.showAllSkirt()
            this.winCB()
            GameLogic.Share.gameOver(true)
            return
        }

        if (this.speed > 0 && !this.isEmptySkirt) {
            this.myOwner.transform.translate(new Laya.Vector3(0, this.fallSpeed, 0), false)
            return
        }
        let pos: Laya.Vector3 = new Laya.Vector3()
        let t = 0.1 / Math.abs(this.myPos.y - ccPos.y)
        if (t < 0) t = 0
        Laya.Vector3.lerp(this.myPos, ccPos, t, pos)
        this.myOwner.transform.position = pos
    }

    hurtCB() {
        if (this.isHurt) return
        SoundMgr.instance.playSoundEffect('Hurt.mp3')
        this.hitFX.active = true
        Laya.timer.once(1000, this, () => {
            this.hitFX.active = false
        })
        this.isHurt = true
        Laya.timer.once(500, this, () => { this.isHurt = false })
        this.playAni(PlayerAni.Ani_Hurt)
        Laya.timer.once(400, this, () => {
            if (this.speed > 0) this.playAni(PlayerAni.Ani_Walk)
            else this.playAni(PlayerAni.Ani_Idle)
        })
        let count: number = 0
        for (let i = this.skirtArr.length - 1; i >= 0; i--) {
            let skirt = this.skirtArr[i]
            let ms: Laya.SkinnedMeshSprite3D = skirt as Laya.SkinnedMeshSprite3D
            let mat: Laya.BlinnPhongMaterial = ms.skinnedMeshRenderer.material as Laya.BlinnPhongMaterial
            let os: Laya.Vector4 = mat.tilingOffset.clone()
            if (os.w <= this.emptyMax) continue

            os.w = this.emptyMax
            mat.tilingOffset = os
            count++
            if (count >= 3) break
        }
    }

    winCB() {
        this.playAni(PlayerAni.Ani_Dance)
        this.myOwner.transform.rotate(new Laya.Vector3(0, 180, 0), false, false)
    }

    onUpdate(): void {

        if (this.isFalling) {
            if (GameLogic.Share.roadIndex >= GameLogic.Share._roadArr.length) {
                this.checkLandCylinder()
            } else {
                this.checkLand()
            }

            if (this.speed > 0) {
                this.flyFX.active = true
                this.decSkirt()
            }
        }
        if (this.speed == 0 || !this.isFalling || this.isEmptySkirt) {
            this.flyFX.active = false;
            this.stopFlySound()
        }

        if (GameLogic.Share.isGameOver || !GameLogic.Share.isStartGame) {
            return
        }

        this.moveX()

        if (this.myOwner.transform.position.x < -this.edgeMax) {
            let pos = this.myOwner.transform.position.clone()
            pos.x = -this.edgeMax
            this.myOwner.transform.position = pos
        } else if (this.myOwner.transform.position.x > this.edgeMax) {
            let pos = this.myOwner.transform.position.clone()
            pos.x = this.edgeMax
            this.myOwner.transform.position = pos
        }
    }
}