import { WECHAT } from "cc/env";
import SGAD from "./SGAD";
import { SGNode } from "./SGNode";
import { SGRemen } from "./SGRemen";
import SGConfig from "./SGConfig";

export default class SGMgr {
    private static gameCount: number = 1

    private static adLoaded: boolean = false
    private static sdkLoaded: boolean = false

    static init(cb: Function) {
        if (!WECHAT) {
            cb && cb()
            return
        }
        SGConfig.initConfigData(() => {
            SGAD.initAd(() => {
                this.adLoaded = true
            })
            this.sdkLoaded = true
            if (SGConfig.data.front_interstitial_onHide_switch) {
                window['wx'].onShow(() => { SGAD.showInterstitialAd() })
            }
        })

        let fun = () => {
            if (this.adLoaded && this.sdkLoaded) {
                SGNode.Share.unschedule(fun)
                this.showLoading(cb)
            }
        }
        SGNode.Share.schedule(fun, 0.1)
    }

    static showLoading(cb?: Function) {
        if (!WECHAT) {
            cb && cb()
            return
        }
        this.showRemen(RemenIndex.Remen_Loading, cb)
    }
    static inHome() {
        if (!WECHAT) { return }
        if (SGConfig.isShowHomeBanner) SGAD.showBannerAd()
        if (SGConfig.isShowHomeSideGrid) SGAD.visibleSideGridAd(true)
        this.visibleHomeUI(true)
    }
    static inShop() {
        if (!WECHAT) { return }
        SGAD.hideBannerAd()
        if (SGConfig.isShowShopBanner) SGAD.showBannerAd()
        SGAD.visibleSideGridAd(false)
        this.visibleHomeUI(false)
    }
    static moreGame() {
        SGAD.hideBannerAd()
        SGAD.visibleSideGridAd(false)
        this.showRemen(RemenIndex.Remen_Start, () => {
            if (SGConfig.isShowHomeBanner) SGAD.showBannerAd()
            if (SGConfig.isShowHomeSideGrid) SGAD.visibleSideGridAd(true)
        }, true)
    }
    static startGame(cb?: Function) {
        if (!WECHAT) {
            cb && cb()
            return
        }
        SGAD.hideBannerAd()
        SGAD.visibleSideGridAd(false)
        this.visibleHomeUI(false)
        this.showRemen(RemenIndex.Remen_Start, cb)
    }
    static inGame() {
        if (!WECHAT) { return }
        SGAD.hideBannerAd()
        if (SGConfig.isShowGameBanner) SGAD.showBannerAd()
        if (SGConfig.isShowGameSingleGrid) SGAD.visibleGameGridAd(true);
    }
    static gameOver(cb?: Function) {
        if (!WECHAT) {
            cb && cb()
            return
        }
        SGAD.hideBannerAd()
        SGAD.visibleGameGridAd(false);
        this.showRemen(RemenIndex.Remen_Over, cb)
    }
    static inFinish() {
        if (!WECHAT) { return }
        SGAD.hideBannerAd()
        if (SGConfig.isShowFinishBanner) SGAD.showBannerAd()
        if (SGConfig.isShowFinishSideGrid) SGAD.visibleSideGridAd(true)
    }
    static backToHome(cb?: Function) {
        if (!WECHAT) {
            cb && cb()
            return
        }
        SGAD.hideBannerAd()
        SGAD.visibleSideGridAd(false)
        this.showRemen(RemenIndex.Remen_Finish, () => {
            cb && cb()
            this.gameCount++
        })
    }

    //热门页
    private static showRemen(index: RemenIndex, cb?: Function, isMust: boolean = false) {
        let v = false
        switch (index) {
            case RemenIndex.Remen_Loading:
                v = SGConfig.data.front_remen_loading_switch
                break
            case RemenIndex.Remen_Start:
                v = SGConfig.data.front_remen_start_switch && this.gameCount >= SGConfig.data.front_remen_start_gameCount
                break
            case RemenIndex.Remen_Over:
                v = SGConfig.data.front_remen_over_switch && this.gameCount >= SGConfig.data.front_remen_over_gameCount
                break
            case RemenIndex.Remen_Finish:
                v = SGConfig.data.front_remen_finish_switch && this.gameCount >= SGConfig.data.front_remen_finish_gameCount
                break
        }
        if (v || isMust) {
            SGNode.Share.getUI(SGUIType.SGRemen).getComponent(SGRemen).showUI(index, cb)
        } else {
            cb && cb()
        }
    }

    //首页
    private static visibleHomeUI(v = true) {
        SGNode.Share.getUI(SGUIType.SGHomeUI).active = v
    }
}

export enum SGUIType {
    SGRemen = "SGRemen",
    SGHomeUI = "SGHomeUI"
}

export enum RemenIndex {
    Remen_Loading,
    Remen_Start,
    Remen_Over,
    Remen_Finish
}