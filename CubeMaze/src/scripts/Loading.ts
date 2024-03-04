import ColliderController from "./stage/ColliderController";
import Data, { SceneUrl } from "./tools/Data";
import Tools from "./mods/Tools";
import PlayerData from "./mods/PlayerData";
import BaseUI from "./mods/BaseUI";
import camShake from "./mods/camShake";
import FxController from "./stage/FxController";
import StageController from "./stage/StageController";
import PlatformApi from "./PlatformApi";
import SoundManager from "../JJExport/managers/SoundManager";
import SGMgr from "../SGSDK/SGMgr";


export default class Loading extends BaseUI {
    //素材加载完信息
    SceneDone: boolean = false;
    FxDone: boolean = false;
    bar: Laya.ProgressBar;
    head: Laya.Image;

    //第一，加分包
    init() {
        this.initLoading();
        this.updateLoading(0);
        if (Laya.Browser.onWeiXin) {
            let names = ["res"];
            PlatformApi.loadSubpackage(names[0], () => {
                this.init1()
            })
        } else {
            // PlayerData.clearPlayerData();
            this.init1();
        }
    }
    //第二，加配置
    init1() {
        this.updateLoading(0.25)
        let isPure = Data.isPure;
        //读存档
        // PlayerData.clearPlayerData();
        let data = PlayerData.GetPlayerData();
        PlayerData.CheckPlayerData();
        console.log("玩家存档信息：", data);
        //音乐声音调至0
        // Laya.SoundManager.setMusicVolume(0);
        this.initGame();
    }
    //第三，加载场景
    initGame() {
        this.updateLoading(0.5)
        console.log("加载声音")
        Data.soundController = new SoundManager();
        Data.camShake = new camShake();
        console.log('进入Loading界面')
        console.log("开始加载场景")
        let sceneName = 'main'
        let url = 'res/LayaScene_' + sceneName + "/Conventional/" + sceneName + '.ls'
        let purl = 'res/LayaScene_' + sceneName + "/Conventional/" + sceneName + '.lh'
        Laya.Scene3D.load(url, Laya.Handler.create(this, this.onComplete))
        Laya.Sprite3D.load(purl, Laya.Handler.create(this, this.onFxComplete))

    }
    //第四，正式进入游戏
    StartGame() {
        if (this.SceneDone && this.FxDone) {
            this.updateLoading(1);
            // Laya.timer.clear(this, this.checkLoad);
            let cb = () => {
                console.log("打开游戏场景")
                Laya.stage.addChild(Data.scene3D);
                Laya.stage.setChildIndex(Data.scene3D, 0)
                console.log("初始化场景信息")
                this.SceneInit();
                StageController.Init();
                Laya.Scene.open(SceneUrl.STARTMENU)
            }
            SGMgr.init(() => {
                cb()
            })
        }
    }

    //场景初始化
    SceneInit() {
        //全局变量
        Data.player = Data.scene3D.getChildByName("Player") as Laya.Sprite3D;
        Data.mainCam = Data.scene3D.getChildByName("Main Camera") as Laya.Camera;
        Data.anim = Data.player.getChildByName("Model").getComponent(Laya.Animator);
        Data.collider = new ColliderController();
        Data.fxController = new FxController();
        let scene = Data.scene3D
        //阴影
        let light: Laya.DirectionLight = scene.getChildByName("Directional Light") as Laya.DirectionLight;
        light.shadowMode = Laya.ShadowMode.SoftLow;
        light.shadowDistance = 50;
        light.shadowResolution = 2048;
        light.shadowCascadesMode = Laya.ShadowCascadesMode.NoCascades;
        //水波纹动画
        Laya.timer.frameLoop(1, Data.scene3D, () => {
            let water = Data.scene3D.getChildByName("Water") as Laya.MeshSprite3D;
            for (let i = 0; i < water.numChildren; i++) {
                let model = water.getChildAt(i) as Laya.MeshSprite3D;
                var mat: any = model.meshRenderer.material;
                mat.tilingOffsetW += 0.002;
                mat.tilingOffsetZ += 0.002;
            }
        })
        //抗锯齿
        Data.mainCam.enableHDR = false;
        Laya.stage.useRetinalCanvas = true;
        //场景雾
        // scene.enableFog = true;
        // scene.fogColor = new Laya.Vector3(0.8, 0.8, 0.8); //00FFD6
        // scene.fogStart = 50;
        // scene.fogRange = 100;

    }
    //更新loading显示
    isLoading = true;
    tween;
    initLoading() {
        // this.head.rotation = -10;
        // let cb1 = () => {
        //     this.tween = Laya.Tween.to(this.head, { rotation: 10 }, 500, null, Laya.Handler.create(this, () => {
        //         cb2();
        //     }))
        // }
        // let cb2 = () => {
        //     this.tween = Laya.Tween.to(this.head, { rotation: -10 }, 500, null, Laya.Handler.create(this, () => {
        //         cb1();
        //     }))
        // }
        // cb1();
    }
    updateLoading(axis) {
        this.bar.value = axis;
        // this.head.left = -50 + 500 * axis;
    }
    exitLoading() {
        Laya.Tween.clearTween(this.tween);
        this.isLoading = false;
    }

    //加载完回调
    private onComplete(scene: Laya.Scene3D): void {
        this.updateLoading(0.75);
        Data.scene3D = scene;
        Data.prefabs = Data.scene3D.getChildByName("Prefabs") as Laya.Sprite3D;
        this.SceneDone = true;
        console.log("场景加载完成");
        this.StartGame();
    }
    private onFxComplete(prefabs: Laya.Sprite3D): void {
        this.updateLoading(0.75);
        Data.fxs = prefabs.getChildByName("Fx") as Laya.Sprite3D;
        this.FxDone = true;
        console.log("额外道具加载完成")
        this.StartGame();
    }
}