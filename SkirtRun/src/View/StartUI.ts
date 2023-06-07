import Utility from "../Mod/Utility"
import PlayerDataMgr from "../Libs/PlayerDataMgr"
import GameLogic from "../Crl/GameLogic"
import SoundMgr from "../Mod/SoundMgr"
import SGMgr from "../SGSDK/SGMgr"

export default class StartUI extends Laya.Scene {
    constructor() {
        super()
    }

    startBtn: Laya.Image
    skinBtn: Laya.Image
    gradeNum: Laya.FontClip
    coinNum: Laya.FontClip

    onOpened() {
        this.gradeNum.value = PlayerDataMgr.getPlayerData().grade.toString()
        this.size(Laya.stage.displayWidth, Laya.stage.displayHeight)
        Utility.addClickEvent(this.startBtn, this, this.startBtnCB)
        Utility.addClickEvent(this.skinBtn, this, this.skinBtnCB)
        Laya.timer.frameLoop(1, this, this.myUpdate)

        SoundMgr.instance.playMusic('Bgm.mp3')

        SGMgr.inHome()
    }
    onClosed() {
    }

    startBtnCB() {
        SGMgr.startGame(() => {
            Laya.Scene.open('MyScenes/GameUI.scene')
        })
    }

    skinBtnCB() {
        SGMgr.inShop()
        GameLogic.Share._cameraCrl.selectSkirt()
        Laya.Scene.open('MyScenes/SkinUI.scene');
    }

    myUpdate() {
        this.coinNum.value = PlayerDataMgr.getPlayerData().coin.toString()
    }
}
