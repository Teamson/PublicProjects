import GameLogic from "../Crl/GameLogic";
import UINode from "../Crl/UINode";
import { UIType } from "../Mod/Entity";
import SGAD from "../Mod/SGAD";
import SoundMgr from "../Mod/SoundMgr";

const { ccclass, property } = cc._decorator;

@ccclass
export default class StartUI extends cc.Component {

    @property(cc.Node)
    redPoint: cc.Node = null

    protected onEnable(): void {
        let sameDay = false
        let curDate = new Date().getDate().toString()
        if (localStorage.getItem('signDate') && localStorage.getItem('signDate') == curDate) {
            sameDay = true
        }
        this.redPoint.active = !sameDay
        if (!sameDay) {
            this.scheduleOnce(() => {
                UINode.Share.showUI(UIType.UI_SIGN, false)
            }, 0.2)
        }

        SGAD.showBannerAd()
        SGAD.showInterstitialAd()
    }

    protected onDisable(): void {
        SGAD.hideBannerAd()
    }

    startGame() {
        SoundMgr._ins.PlaySound('Click')
        UINode.Share.showUI(UIType.UI_FreeSkin, false, () => {
            GameLogic._ins.gameStart()
        })
    }

    settingCB() {
        SoundMgr._ins.PlaySound('Click')
        UINode.Share.showUI(UIType.UI_SETTING, false)
    }

    signCB() {
        SoundMgr._ins.PlaySound('Click')
        UINode.Share.showUI(UIType.UI_SIGN, false)
    }

    skinCB() {
        SoundMgr._ins.PlaySound('Click')
        UINode.Share.showUI(UIType.UI_SKIN, false)
    }

    rankUI() {
        SoundMgr._ins.PlaySound('Click')
        SGAD.hideBannerAd()
        UINode.Share.showUI(UIType.UI_Rank, false, () => {
            SGAD.showBannerAd()
        })
    }

    moreCB() {
        SoundMgr._ins.PlaySound('Click')
        SGAD.visibleFullGridAd(true)
        //UINode.Share.showUI(UIType.UI_FullGrid, false)
    }
}
