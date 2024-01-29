import { _decorator, Component, Node } from 'cc';
import { WECHAT } from 'cc/env';
import SGAD from './SGAD';
import { SGNode } from './SGNode';
import { RemenIndex } from './SGMgr';
import SGConfig from './SGConfig';
const { ccclass, property } = _decorator;

@ccclass('SGRemen')
export class SGRemen extends Component {
    @property(Node)
    btnContinue: Node = null

    ccb: Function = null;
    onShowCB: Function = null
    clickCount: number = 0
    index: RemenIndex = RemenIndex.Remen_Loading

    isWuchu: boolean = false

    onDisable() {
        if (WECHAT) {
            window['wx'].offShow(this.onShowCB)
        }
        this.unscheduleAllCallbacks()
        SGAD.hideBannerAd()
        SGAD.visibleFullGridAd(false)
        SGNode.Share.scheduleOnce(() => {
            this.ccb && this.ccb()
            if (SGConfig.data.front_interstitial_afterRemen_switch) {
                if (this.index == RemenIndex.Remen_Loading || this.index == RemenIndex.Remen_Over || this.index == RemenIndex.Remen_Finish) {
                    SGAD.showInterstitialAd();
                }
            }
        }, 0.1)
    }

    showUI(index: RemenIndex, ccb?: Function) {
        this.node.active = true
        this.index = index;
        this.ccb = ccb;
        this.clickCount = 0

        SGAD.visibleFullGridAd(true)
        if (SGConfig.data.front_remen_banner_switch) {
            this.showHide()
        }

        this.onShowCB = () => {
            this.close()
        }
        if (WECHAT) {
            window['wx'].onShow(this.onShowCB)
        }
    }

    showHide() {
        SGAD.hideBannerAd();
        this.scheduleOnce(() => {
            SGAD.showBannerAd();
            this.scheduleOnce(this.showHide, SGConfig.data.front_remen_banner_showHide_time)
        }, SGConfig.data.front_remen_banner_showHide_time)
    }

    btnContinueCB() {
        this.clickCount++
        if (this.clickCount >= SGConfig.data.front_remen_click_count) {
            this.close()
        }
    }

    close() {
        this.node.active = false
    }
}