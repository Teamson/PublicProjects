import GameData from "../Crl/GameData";
import GameLogic from "../Crl/GameLogic";
import LevelCrl from "../Crl/LevelCrl";
import UINode from "../Crl/UINode";
import { UIType } from "../Mod/Entity";
import PlatformApi from "../Mod/PlatformApi";
import SGAD from "../Mod/SGAD";
import SoundMgr from "../Mod/SoundMgr";

const { ccclass, property } = cc._decorator;

@ccclass
export default class LoseUI extends cc.Component {

    @property(cc.Node)
    btnAnswerAd: cc.Node = null

    protected onEnable(): void {
        this.btnAnswerAd.active = !GameData.hadGotAnswer
        GameData.hadAnswerRevive = false
        SGAD.showBannerAd()
    }
    protected onDisable(): void {

        SGAD.hideBannerAd()
    }

    backCB() {
        SoundMgr._ins.PlaySound('Click')
        GameLogic._ins.backToHome()
    }

    answerCB() {
        if (GameData.hadGotAnswer) {
            UINode.Share.showUI(UIType.UI_ANSWER, false, () => {
                SGAD.showBannerAd()
            })
        } else {
            PlatformApi.showVideoAd(() => {
                GameData.hadAnswerRevive = true
                GameLogic._ins.restart()
            })
        }
    }

    addTimeCB() {
        SoundMgr._ins.PlaySound('Click')
        PlatformApi.showVideoAd(() => {
            if (cc.find('Canvas/LevelNode/' + GameData.curGradeName).getComponent(LevelCrl).WoodNode.children.length <= 0) {
                GameData.isGameOver = false
                GameLogic._ins.gameOver(true)
                return
            }
            GameData.gameTime += 60
            GameData.isGameOver = false
            UINode.Share.showUI(UIType.UI_GAME)
        })
    }

    restartCB() {
        SoundMgr._ins.PlaySound('Click')
        UINode.Share.closeAllUI()
        GameLogic._ins.restart()
    }

    shareCB() {
        SoundMgr._ins.PlaySound('Click')
        if (cc.sys.platform == cc.sys.WECHAT_GAME) {
            window['wx'].shareAppMessage(function (res) {
                return {
                    title: '',
                    imageUrl: '',
                }
            })
        }
    }
}
