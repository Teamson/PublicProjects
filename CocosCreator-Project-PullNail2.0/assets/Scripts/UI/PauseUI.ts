import GameData from "../Crl/GameData";
import GameLogic from "../Crl/GameLogic";
import UINode from "../Crl/UINode";
import { UIType } from "../Mod/Entity";
import SGAD from "../Mod/SGAD";
import SoundMgr from "../Mod/SoundMgr";
import Utility from "../Mod/Utility";
import GameUI from "./GameUI";

const { ccclass, property } = cc._decorator;

@ccclass
export default class PauseUI extends cc.Component {

    @property(cc.Node)
    answerBtn: cc.Node = null

    protected onEnable(): void {
        Utility.zoomUI(this.node.getChildByName('root'))

        this.answerBtn.active = GameData.gameIndex == 2
        SGAD.showBannerAd()
    }

    protected onDisable(): void {
        if (GameData.gameIndex == 2)
            SGAD.hideBannerAd()
    }

    answerCB() {
        SoundMgr._ins.PlaySound('Click')
        GameUI._ins.answerCB()
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

    backCB() {
        SoundMgr._ins.PlaySound('Click')
        GameLogic._ins.backToHome()
    }

    closeCB() {
        SoundMgr._ins.PlaySound('Click')
        Utility.zoomUI(this.node.getChildByName('root'), 0, () => {
            UINode.Share.closeUI(UIType.UI_PAUSE)
        })
    }

}
