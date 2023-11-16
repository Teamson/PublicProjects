import GameData from "../Crl/GameData";
import GameLogic from "../Crl/GameLogic";
import LevelCrl from "../Crl/LevelCrl";
import UINode from "../Crl/UINode";
import { UIType } from "../Mod/Entity";
import PlatformApi from "../Mod/PlatformApi";
import SGAD from "../Mod/SGAD";
import ScaleLoop1 from "../Mod/ScaleLoop1";
import SoundMgr from "../Mod/SoundMgr";

const { ccclass, property } = cc._decorator;

@ccclass
export default class GameUI extends cc.Component {

    public static _ins: GameUI

    @property(cc.Label)
    timeStr: cc.Label = null

    @property(cc.Label)
    gradeNum: cc.Label = null

    @property(cc.Node)
    tips: cc.Node = null

    @property(cc.Node)
    hardTips: cc.Node = null

    @property(cc.Node)
    bottomNode: cc.Node = null
    @property(cc.Node)
    answerAd: cc.Node = null
    @property(cc.Node)
    answerAdPause: cc.Node = null
    @property(cc.Node)
    btnOpenHole: cc.Node = null

    protected onLoad(): void {
        GameUI._ins = this
    }

    protected onEnable(): void {
        this.calculateTime()
        this.schedule(this.calculateTime, 1)
        this.gradeNum.string = GameData.gameIndex + '/2'
        this.tips.active = GameData.gameIndex == 1
        this.bottomNode.active = GameData.gameIndex == 2


        this.hardTips.active = GameData.gameIndex == 2
        this.hardTips.getComponent(cc.Animation).play()
        this.scheduleOnce(() => {
            this.hardTips.active = false
        }, 1.5)

        this.scheduleOnce(this.scaleAnswer, 5)

        if (GameData.gameIndex == 1) {
            SGAD.showBannerAd()
        } else {
            SGAD.hideBannerAd()
        }
    }

    protected onDisable(): void {
        this.stopCalculateTime()
        this.unscheduleAllCallbacks()
        SGAD.hideBannerAd()
    }

    pauseCB() {
        SoundMgr._ins.PlaySound('Click')
        this.stopCalculateTime()
        UINode.Share.showUI(UIType.UI_PAUSE, false, () => {
            this.schedule(this.calculateTime, 1)
        })
    }

    calculateTime() {
        GameData.gameTime--
        let m = Math.floor(GameData.gameTime / 60)
        let s = Math.floor(GameData.gameTime - m * 60)
        let mStr = m.toString()
        let sStr = s.toString()
        if (s < 10) sStr = '0' + s.toString()
        this.timeStr.string = '0' + mStr + ',' + sStr

        if (GameData.gameTime <= 0) {
            this.unschedule(this.calculateTime)
            GameLogic._ins.gameOver(false)
        }
    }

    stopCalculateTime() {
        this.unschedule(this.calculateTime)
    }

    resetCB() {
        SoundMgr._ins.PlaySound('Click')
        this.stopCalculateTime()
        PlatformApi.showVideoAd(() => {
            GameLogic._ins.restart()
        }, () => {
            this.schedule(this.calculateTime, 1)
        })
    }

    answerCB() {
        SoundMgr._ins.PlaySound('Click')
        this.stopCalculateTime()

        if (GameData.hadGotAnswer) {
            UINode.Share.closeUI(UIType.UI_PAUSE)
            UINode.Share.showUI(UIType.UI_ANSWER, false, () => {
                this.schedule(this.calculateTime, 1)
            })
            return
        }

        PlatformApi.showVideoAd(() => {
            GameData.hadGotAnswer = true
            UINode.Share.closeUI(UIType.UI_PAUSE)
            UINode.Share.showUI(UIType.UI_ANSWER, false, () => {
                this.schedule(this.calculateTime, 1)
            })
        }, () => {
            this.schedule(this.calculateTime, 1)
        })
    }

    openHoleCB() {
        SoundMgr._ins.PlaySound('Click')
        this.stopCalculateTime()
        PlatformApi.showVideoAd(() => {
            GameData.hadOpenHole = true
            cc.find('Canvas/LevelNode/' + GameData.curGradeName).getComponent(LevelCrl).destroyHoleLock()
            UINode.Share.closeUI(UIType.UI_OPENHOLE)
        }, () => {
            this.schedule(this.calculateTime, 1)
        })
    }

    scaleAnswer() {
        this.answerAd.parent.getComponent(ScaleLoop1).startAni()
    }
    stopScaleAnswer() {
        this.unschedule(this.scaleAnswer)
        this.answerAd.parent.getComponent(ScaleLoop1).stopAni()
        this.scheduleOnce(this.scaleAnswer, 5)
    }

    protected update(dt: number): void {

        this.answerAd.active = !GameData.hadGotAnswer
        this.answerAdPause.active = !GameData.hadGotAnswer
        this.btnOpenHole.active = GameData.gameIndex == 2 && !GameData.hadOpenHole
    }
}
