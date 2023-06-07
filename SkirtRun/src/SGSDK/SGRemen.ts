import SGAD from "./SGAD";
import SGConfig from "./SGConfig";
import SGMgr, { RemenIndex } from "./SGMgr";
import SGUtils from "./SGUtils";

export default class SGRemen extends Laya.Scene {
    constructor() {
        super()
    }
    btnContinue: Laya.Image
    bg: Laya.Panel

    ccb: Function = null;
    onShowCB: Function = null
    clickCount: number = 0
    index: RemenIndex = RemenIndex.Remen_Loading

    isWuchu: number = 0

    onAwake(): void {
        this.size(Laya.stage.displayWidth, Laya.stage.displayHeight)
        this.bg.size(Laya.stage.displayWidth, Laya.stage.displayHeight)
    }
    onOpened(param?: any) {
        if (param && param.ccb) this.ccb = param.ccb;
        if (param && param.index != undefined) this.index = param.index;
        this.clickCount = 0

        SGUtils.addClickEvent(this.btnContinue, this, this.btnContinueCB);

        SGAD.visibleFullGridAd(true)

        if (SGConfig.data.front_remen_banner_switch) {
            this.showHide()
        }

        this.onShowCB = () => {
            this.close()
        }
        if (Laya.Browser.onWeiXin) {
            Laya.Browser.window['wx'].onShow(this.onShowCB)
        }
    }
    onClosed() {
        if (Laya.Browser.onWeiXin) {
            Laya.Browser.window['wx'].offShow(this.onShowCB)
        }
        Laya.timer.clearAll(this)
        SGAD.hideBannerAd()
        SGAD.visibleFullGridAd(false)
        Laya.timer.once(100, this, () => {
            this.ccb && this.ccb()
            if (SGConfig.data.front_interstitial_afterRemen_switch) {
                if (this.index == RemenIndex.Remen_Loading || this.index == RemenIndex.Remen_Over || this.index == RemenIndex.Remen_Finish) {
                    SGAD.showInterstitialAd();
                }
            }
        })
    }

    showHide() {
        SGAD.hideBannerAd();
        Laya.timer.once(SGConfig.data.front_remen_banner_showHide_time * 1000, this, () => {
            SGAD.showBannerAd();
            Laya.timer.once(SGConfig.data.front_remen_banner_showHide_time * 1000, this, this.showHide)
        })
    }

    btnContinueCB() {
        this.clickCount++
        if (this.clickCount >= SGConfig.data.front_remen_click_count) {
            this.close()
        }
    }
}
