import SGAD from "./SGAD"
import SGConfig from "./SGConfig"

export default class SGMgr {
    private static gameCount: number = 1

    private static adLoaded: boolean = false
    private static sdkLoaded: boolean = false

    static init(cb: Function) {
        if (!Laya.Browser.onWeiXin) {
            cb && cb()
            return
        }
        SGConfig.initConfigData(() => {
            SGAD.initAd(() => {
                this.adLoaded = true
            })
            this.sdkLoaded = true
            if (SGConfig.data.front_interstitial_onHide_switch) {
                Laya.Browser.window.wx.onShow(() => { SGAD.showInterstitialAd() })
            }
        })

        let fun = () => {
            if (this.adLoaded && this.sdkLoaded) {
                Laya.timer.clear(this, fun)
                this.showLoading(cb)
            }
        }
        Laya.timer.loop(100, this, fun)
    }

    static showLoading(cb?: Function) {
        if (!Laya.Browser.onWeiXin) {
            cb && cb()
            return
        }
        this.showRemen(RemenIndex.Remen_Loading, cb)
    }
    static inHome() {
        if (!Laya.Browser.onWeiXin) { return }
        if (SGConfig.isShowHomeBanner) SGAD.showBannerAd()
        if (SGConfig.isShowHomeSideGrid) SGAD.visibleSideGridAd(true)
        this.visibleHomeUI(true)
    }
    static inShop() {
        if (!Laya.Browser.onWeiXin) { return }
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
        if (!Laya.Browser.onWeiXin) {
            cb && cb()
            return
        }
        SGAD.hideBannerAd()
        SGAD.visibleSideGridAd(false)
        this.visibleHomeUI(false)
        this.showRemen(RemenIndex.Remen_Start, cb)
    }
    static inGame() {
        if (!Laya.Browser.onWeiXin) { return }
        SGAD.hideBannerAd()
        if (SGConfig.isShowGameBanner) SGAD.showBannerAd()
        if (SGConfig.isShowGameSingleGrid) SGAD.visibleGameGridAd(true);
    }
    static gameOver(cb?: Function) {
        if (!Laya.Browser.onWeiXin) {
            cb && cb()
            return
        }
        SGAD.hideBannerAd()
        SGAD.visibleGameGridAd(false);
        this.showRemen(RemenIndex.Remen_Over, cb)
    }
    static inFinish() {
        if (!Laya.Browser.onWeiXin) { return }
        SGAD.hideBannerAd()
        if (SGConfig.isShowFinishBanner) SGAD.showBannerAd()
        if (SGConfig.isShowFinishSideGrid) SGAD.visibleSideGridAd(true)
    }
    static backToHome(cb?: Function) {
        if (!Laya.Browser.onWeiXin) {
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
            Laya.Scene.open(SceneType.SGRemen, false, { ccb: cb, index: index })
        } else {
            cb && cb()
        }
    }

    //首页
    private static visibleHomeUI(v = true) {
        if (v)
            Laya.Scene.open(SceneType.SGHomeUI, false)
        else
            Laya.Scene.close(SceneType.SGHomeUI)
    }
}

export enum SceneType {
    SGRemen = "SGScene/SGRemen.scene",
    SGHomeUI = "SGScene/SGHomeUI.scene"
}

export enum RemenIndex {
    Remen_Loading,
    Remen_Start,
    Remen_Over,
    Remen_Finish
}