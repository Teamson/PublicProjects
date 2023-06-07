import PlayerDataMgr from "../Libs/PlayerDataMgr"
import WxApi from "../Libs/WxApi"
import SoundMgr from "../Mod/SoundMgr"
import Utility from "../Mod/Utility"
import CameraCrl from "./CameraCrl"
import PlayerCrl from "./PlayerCrl"
import { PlayerAni } from "../Mod/Entity"
import Road from "./Prop/Road"
import Cylinder from "./Prop/Cylinder"
import Diamond from "./Prop/Diamond"
import Skirt from "./Prop/Skirt"
import Door from "./Prop/Door"
import Scissors from "./Prop/Scissors"
import Gear from "./Prop/Gear"
import Fan from "./Prop/Fan"
import SGMgr from "../SGSDK/SGMgr"

export default class GameLogic {
    public static Share: GameLogic

    public _scene: Laya.Scene3D
    public _camera: Laya.Camera
    public _light: Laya.DirectionLight

    public camStartPos: Laya.Vector3 = new Laya.Vector3(0, 0, 0)
    public camStartRotation: Laya.Quaternion = null
    public _cameraCrl: CameraCrl = null
    public startCamField: number = 60

    public isStartGame: boolean = false
    public isGameOver: boolean = false
    public isWin: boolean = false
    public isPause: boolean = false
    public isFinish: boolean = false
    public isMeet: boolean = false
    public isSelectingSkin: boolean = false

    public _levelNode: Laya.Sprite3D = null
    public _player: Laya.Sprite3D = null
    public _playerCrl: PlayerCrl = null
    public _roadArr: Laya.Sprite3D[] = []
    public _cylinderArr: Laya.Sprite3D[] = []

    public roadIndex: number = 1

    constructor() {
        if (!Laya.Browser.onWeiXin)
            localStorage.clear()
        GameLogic.Share = this
        PlayerDataMgr.getPlayerData()

        if (Laya.Browser.onWeiXin) {
            Laya.Browser.window.wx.showShareMenu({
                withShareTicket: true,
                menus: ['shareAppMessage', 'shareTimeline']
            });
            Laya.Browser.window.wx.onShareAppMessage(() => {
                return {
                    title: '裙子快跑',
                    imageUrl: '' // 图片 URL
                }
            })
        }

        Laya.Scene.open('MyScenes/LoadingUI.scene')

    }

    initScene() {
        Laya.Scene3D.load(WxApi.UnityPath + 'SampleScene.ls', Laya.Handler.create(this, this.onLoadScene));
    }
    onLoadScene(scene) {
        Laya.Scene.open('MyScenes/StartUI.scene')

        this._scene = Laya.stage.addChild(scene) as Laya.Scene3D
        Laya.stage.setChildIndex(this._scene, 0)
        this._camera = this._scene.getChildByName('Main Camera') as Laya.Camera
        this._light = this._scene.getChildByName('Directional Light') as Laya.DirectionLight
        // Use soft shadow.
        this._light.shadowMode = Laya.ShadowMode.SoftHigh;
        // Set shadow max distance from camera.
        this._light.shadowDistance = 10;
        // Set shadow resolution.
        this._light.shadowResolution = 1024;
        // Set shadow cascade mode.
        this._light.shadowCascadesMode = Laya.ShadowCascadesMode.NoCascades;

        //雾化代码
        this._scene.enableFog = true;
        //设置雾化的颜色
        this._scene.fogColor = new Laya.Vector3(1, 112 / 255, 221 / 255);
        //设置雾化的起始位置，相对于相机的距离
        this._scene.fogStart = 20;
        //设置雾化最浓处的距离。
        this._scene.fogRange = 30;

        //this.fixCameraField()

        this.camStartPos = this._camera.transform.position.clone()
        this.camStartRotation = this._camera.transform.rotation.clone()
        this._camera.fieldOfView = this.startCamField
        this._cameraCrl = this._camera.addComponent(CameraCrl)

        this._levelNode = this._scene.addChild(new Laya.Sprite3D()) as Laya.Sprite3D

        this.createLevel()
    }

    gameStart() {
        this.isStartGame = true
        this._playerCrl.playAni(PlayerAni.Ani_Walk)
    }

    createLevel() {
        let g: number = PlayerDataMgr.getPlayerData().grade
        g = Math.floor((g - 1) % 5)
        let dataArr: any[] = PlayerDataMgr.levelDataArr[g]
        for (let i = 0; i < dataArr.length; i++) {
            let data: any = dataArr[i]
            let name: string = data.name
            let pos: Laya.Vector3 = new Laya.Vector3(Number(data.position.x), Number(data.position.y), Number(data.position.z))
            let rotate: Laya.Vector3 = new Laya.Vector3(Number(data.rotation.x), Number(data.rotation.y), Number(data.rotation.z))
            let scale: Laya.Vector3 = new Laya.Vector3(Number(data.scale.x), Number(data.scale.y), Number(data.scale.z))
            this.createItem(name, pos, rotate, scale)
        }
    }
    createItem(name: string, pos: Laya.Vector3, rot: Laya.Vector3, scale: Laya.Vector3) {
        let doorId: number = 0
        if (name.search('Door') != -1) {
            let arr = name.split('-')
            name = arr[0]
            doorId = parseInt(arr[1])
        }
        let res = Laya.loader.getRes(WxApi.UnityPath + 'PropNode.lh') as Laya.Sprite3D
        let sp: Laya.Sprite3D = Laya.Sprite3D.instantiate(res.getChildByName(name) as Laya.Sprite3D, this._levelNode, false)
        sp.active = true
        sp.transform.position = pos
        sp.transform.rotationEuler = rot
        sp.transform.setWorldLossyScale(scale)
        if (name.search('Player') != -1) {
            this._player = sp
            this._playerCrl = sp.addComponent(PlayerCrl)
        } else if (name.search('Road') != -1) {
            sp.addComponent(Road)
            this._roadArr.push(sp)
        } else if (name.search('Cylinder') != -1) {
            let crl: Cylinder = sp.addComponent(Cylinder)
            crl.initData(this._cylinderArr.length)
            this._cylinderArr.push(sp)
        } else if (name.search('Diamond') != -1) {
            sp.addComponent(Diamond)
        } else if (name.search('Skirt_Short') != -1) {
            let crl: Skirt = sp.addComponent(Skirt)
            crl.initColor(PlayerDataMgr.getRandColor())
        } else if (name.search('Door') != -1) {
            let crl: Door = sp.addComponent(Door)
            crl.initData(doorId)
        } else if (name.search('Scissors_lowpoly') != -1) {
            sp.addComponent(Scissors)
        } else if (name.search('Gear') != -1) {
            sp.addComponent(Gear)
        } else if (name.search('Fan') != -1) {
            sp.addComponent(Fan)
        }
    }

    createDiamondFX(pos: Laya.Vector3) {
        let name = 'Diamonds_FX'
        let res = Laya.loader.getRes(WxApi.UnityPath + 'PropNode.lh') as Laya.Sprite3D
        let sp: Laya.Sprite3D = Laya.Sprite3D.instantiate(res.getChildByName(name) as Laya.Sprite3D, this._levelNode, false)
        sp.transform.position = pos
        Laya.timer.once(1000, this, () => { sp.destroy() })
    }

    createCollectFX(pos: Laya.Vector3) {
        let name = 'Collect_FX'
        let res = Laya.loader.getRes(WxApi.UnityPath + 'PropNode.lh') as Laya.Sprite3D
        let sp: Laya.Sprite3D = Laya.Sprite3D.instantiate(res.getChildByName(name) as Laya.Sprite3D, this._levelNode, false)
        sp.transform.position = pos
        Laya.timer.once(1000, this, () => { sp.destroy() })
    }

    gameOver(isWin: boolean) {
        if (this.isGameOver) return
        //Laya.timer.clearAll(this)
        if (isWin) {
            SoundMgr.instance.playSoundEffect('Win.mp3')
        } else {
            SoundMgr.instance.playSoundEffect('Lose.mp3')
        }
        WxApi.DoVibrate(false)
        this.isWin = isWin
        this.isGameOver = true
        this.isStartGame = false
        Laya.Scene.close('MyScenes/GameUI.scene')
        Laya.timer.once(2000, this, () => {
            SGMgr.gameOver(()=>{
                Laya.Scene.open('MyScenes/FinishUI.scene')
            })
        })
    }

    restartGame() {
        this.isStartGame = false
        this.isGameOver = false
        this.isWin = false
        this.isPause = false
        this._camera.fieldOfView = this.startCamField
        this.isFinish = false
        this.isMeet = false

        this._camera.transform.position = this.camStartPos
        this._camera.transform.rotation = this.camStartRotation

        this._roadArr = []
        this._cylinderArr = []
        this.roadIndex = 1

        this._levelNode.destroyChildren()
        this.createLevel()
    }
}