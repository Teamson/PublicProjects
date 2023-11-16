import UINode from "../Crl/UINode";
import { UIType } from "../Mod/Entity";
import PlatformApi from "../Mod/PlatformApi";
import SGAD from "../Mod/SGAD";
import SoundMgr from "../Mod/SoundMgr";
import Utility from "../Mod/Utility";
import GameUI from "./GameUI";

const { ccclass, property } = cc._decorator;

@ccclass
export default class OpenHoleUI extends cc.Component {

    hadWatchVideo: boolean = false

    protected onEnable(): void {
        Utility.zoomUI(this.node.getChildByName('root'))
        this.hadWatchVideo = false
        SGAD.showBannerAd()
    }
    protected onDisable(): void {
        
        SGAD.hideBannerAd()
    }

    openCB() {
        SoundMgr._ins.PlaySound('Click')
        /* PlatformApi.showVideoAd(() => {
            PlatformApi.showToast('成功打开新的孔位')
            this.hadWatchVideo = true
            this.closeCB()
        }) */
        GameUI._ins.openHoleCB()
    }

    closeCB() {
        SoundMgr._ins.PlaySound('Click')
        if (!this.hadWatchVideo) {
            UINode.Share.ccb = null
        }
        Utility.zoomUI(this.node.getChildByName('root'), 0, () => {
            UINode.Share.closeUI(UIType.UI_OPENHOLE)
        })
    }
}
