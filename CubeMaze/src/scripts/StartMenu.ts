
import BaseUI from "./mods/BaseUI";
import Data, { SceneUrl } from "./tools/Data";
import Tools from "./mods/Tools";
import PlayerData from "./mods/PlayerData";
import SGMgr from "../SGSDK/SGMgr";

export default class StartMenu extends BaseUI {
    startButton: Laya.Button;
    shopButton: Laya.Button;
    coinValue: Laya.FontClip;
    gradeValue: Laya.FontClip;
    // iconBox: Laya.Box;
    // scrollList: Laya.Box;
    finger: Laya.Image;
    fingerScale: number = 1;
    fingerAxis: number = 1;
    fingerTimer: any;

    onEnable(): void {
        SGMgr.inHome()
    }

    init() {
        Data.nowScene = 1;
        console.log("初始化游戏开始界面按钮")
        Data.fxController.cleanFxs();
        this.ButtonInit();
        this.coinValue.value = Data.readCoin().toString();
        // let box = this.scrollList.getChildAt(0) as Laya.Box;
        this.gradeValue.value = Data.readGrade().toString();
        this.ShakeShop();
        console.log(PlayerData.GetPlayerData());
        console.log('stage:',Laya.stage)
    }
    ButtonInit() {
        Tools.buttonInit(this.startButton, this, this.StartGame)
        Tools.buttonInit(this.shopButton, this, this.OpenShop);
    }
    StartGame() {
        console.log("点击开始游戏")
        this.close()
        SGMgr.startGame(()=>{
            this.ShakeShopEnd();
            Data.collider.enable = true;
            Laya.Scene.open(SceneUrl.STAGEUI)
        })
    }

    //结尾动画事件
    EndAnimInit() {

    }
    OpenShop() {
        console.log("打开商店")
        SGMgr.inShop()
        this.ShakeShopEnd();
        Laya.Scene.open(SceneUrl.SHOP)
    }

    shopTween: Laya.Tween;
    shopTimer;
    cb1: Function;
    cb2: Function;
    cb3: Function;
    cb4: Function;
    //商店抖动
    ShakeShop() {
        this.cb1 = () => {
            this.shopButton.rotation = 0;
            this.shopTween = Laya.Tween.to(this.shopButton, { rotation: -10 }, 250);
            this.shopTimer = setTimeout(() => {
                this.cb2();
            }, 250);
        }
        this.cb2 = () => {
            this.shopButton.rotation = -10;
            this.shopTween = Laya.Tween.to(this.shopButton, { rotation: 10 }, 500)
            this.shopTimer = setTimeout(() => {
                this.cb3();
            }, 500);
        }
        this.cb3 = () => {
            this.shopButton.rotation = 10;
            this.shopTween = Laya.Tween.to(this.shopButton, { rotation: 0 }, 250)
            this.shopTimer = setTimeout(() => {
                this.cb4();
            }, 250);
        }
        this.cb4 = () => {
            this.shopButton.rotation = 0;
            this.shopTimer = setTimeout(() => {
                this.cb1();
            }, 1000);
        }
        this.cb1();
    }
    ShakeShopEnd() {
        this.shopTween.clear();
        clearTimeout(this.shopTimer);
    }

}