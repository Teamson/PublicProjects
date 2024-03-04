import SGConfig from "./SGConfig";

export default class SGAD {
    static front_banner_ids: string[] = [];
    static front_video_ids: string[] = [];
    static front_interstitial_ids: string[] = [];
    static front_custom_full_ids: string[] = [];
    static front_custom_side_ids: string[] = [];
    static front_custom_single_ids: string[] = [];

    static initAd(cb?: Function) {
        if (!Laya.Browser.onWeiXin) { cb && cb(); return };
        this.front_banner_ids = SGConfig.data.front_banner_ids
        this.front_video_ids = SGConfig.data.front_video_ids
        this.front_interstitial_ids = SGConfig.data.front_interstitial_ids
        this.front_custom_full_ids = SGConfig.data.front_custom_full_ids
        this.front_custom_side_ids = SGConfig.data.front_custom_side_ids
        this.front_custom_single_ids = SGConfig.data.front_custom_single_ids

        this.front_banner_ids = this.shuffleArr(this.front_banner_ids)
        this.front_video_ids = this.shuffleArr(this.front_video_ids)
        this.front_interstitial_ids = this.shuffleArr(this.front_interstitial_ids)
        this.front_custom_full_ids = this.shuffleArr(this.front_custom_full_ids)
        this.front_custom_side_ids = this.shuffleArr(this.front_custom_side_ids)
        this.front_custom_single_ids = this.shuffleArr(this.front_custom_single_ids)

        this.initCustomAD()
        this.initBanner();
        this.createVideoAd();
        this.createInterstitialAd()

        let func = () => {
            if (this.isFullGridAdLoaded) {
                cb && cb()
                Laya.timer.clear(this, func)
            }
        }
        Laya.timer.loop(100, this, func)
    }

    static sysInfo: any;
    static getSystemInfoSync() {
        if (!Laya.Browser.onWeiXin) return;
        if (!this.sysInfo) {
            this.sysInfo = Laya.Browser.window.wx.getSystemInfoSync();
        }
        return this.sysInfo;
    }

    //#region Banner广告
    static bannerAds: any[] = [];
    static bannerIndex: number = 0;
    static bannerTimesArr: number[] = []
    static bannerShowCount: number[] = []
    static bannerErrorArr: boolean[] = []
    static initBanner() {
        if (!Laya.Browser.onWeiXin || this.front_banner_ids.length <= 0) return;

        this.bannerAds = [];
        this.bannerIndex = 0;
        this.bannerTimesArr = [];
        this.bannerShowCount = [];
        this.bannerErrorArr = [];
        for (let i = 0; i < this.front_banner_ids.length; i++) {
            this.bannerTimesArr.push(0)
            this.bannerShowCount.push(0)
            this.bannerErrorArr.push(false)
        }
        for (let i = 0; i < this.front_banner_ids.length; i++) {
            let bannerAd: any = this.createBannerAd(i)
            this.bannerAds.push(bannerAd)
        }
    }

    static get isAllBannerError(): boolean {
        let isAllError: boolean = true
        for (let i = 0; i < this.bannerErrorArr.length; i++) {
            if (!this.bannerErrorArr[i]) {
                isAllError = false
                break
            }
        }
        return isAllError
    }

    static showBannerAd() {
        if (!Laya.Browser.onWeiXin) return;
        if (this.isAllBannerError) {
            this.stopCountBannerTime();
            this.initBanner();
            return;
        }
        for (let i = 0; i < this.bannerErrorArr.length; i++) {
            if (this.bannerErrorArr[this.bannerIndex]) {
                this.bannerIndex++
                if (this.bannerIndex >= this.front_banner_ids.length) this.bannerIndex = 0
            } else {
                break
            }
        }

        this.bannerAds[this.bannerIndex] && this.bannerAds[this.bannerIndex].show()
        this.stopCountBannerTime()
        Laya.timer.loop(100, this, this.countBannerTime)
    }

    static hideBannerAd() {
        if (!Laya.Browser.onWeiXin) return
        if (this.isAllBannerError) {
            this.stopCountBannerTime()
            return;
        }
        for (let i = 0; i < this.bannerAds.length; i++) {
            this.bannerAds[i] && this.bannerAds[i].hide()
        }
        this.stopCountBannerTime()
    }

    static countBannerTime() {
        this.bannerTimesArr[this.bannerIndex] += 0.1
        if (this.bannerTimesArr[this.bannerIndex] >= SGConfig.data.front_banner_refresh_time) {
            this.bannerAds[this.bannerIndex] && this.bannerAds[this.bannerIndex].hide()
            this.bannerTimesArr[this.bannerIndex] = 0
            this.bannerShowCount[this.bannerIndex]++
            if (this.bannerShowCount[this.bannerIndex] >= SGConfig.data.front_banner_show_count) {
                this.bannerShowCount[this.bannerIndex] = 0
                this.bannerAds[this.bannerIndex] && this.bannerAds[this.bannerIndex].destroy()
                this.bannerAds[this.bannerIndex] = null
                this.bannerAds[this.bannerIndex] = this.createBannerAd(this.bannerIndex)
            }
            this.bannerIndex++
            if (this.bannerIndex >= this.front_banner_ids.length) this.bannerIndex = 0
            this.showBannerAd()
        }
    }

    static stopCountBannerTime() {
        Laya.timer.clear(this, this.countBannerTime)
    }

    static createBannerAd(index: number) {
        if (!Laya.Browser.onWeiXin) return;

        let sysInfo = this.getSystemInfoSync();
        let bannerAd = Laya.Browser.window.wx.createBannerAd({
            adUnitId: this.front_banner_ids[index],
            style: {
                top: sysInfo.screenHeight * 0.8,
                width: 10,
                left: sysInfo.screenWidth / 2 - 150
            },
            adIntervals: 30
        });
        bannerAd.onLoad(() => {
            this.bannerErrorArr[index] = false
            console.log("Banner广告加载成功");
        });
        bannerAd.onError(err => {
            this.bannerErrorArr[index] = true
            console.error("Banner广告加载失败", JSON.stringify(err));
        });
        bannerAd.onResize(res => {
            let realHeight = bannerAd.style.realHeight + 0.1;
            bannerAd.style.top = sysInfo.screenHeight - realHeight;
        });
        return bannerAd;
    }

    //#endregion

    //#region 激励视频广告
    static videoAd: any;
    static videoFinishCallback: Function;
    static videoCancelCallback: Function;
    static videoCompleteCallback: Function;

    static isExistVideoAd: boolean = false;
    static isVideoLoading: boolean = false;
    static createVideoAd() {
        if (!Laya.Browser.onWeiXin || this.front_video_ids.length <= 0) return
        if (this.isVideoLoading) {
            return
        }
        this.isVideoLoading = true;
        if (Laya.Browser.onWeiXin) {
            var self = this;
            var videoAd = this.videoAd;
            if (videoAd != null) {
                videoAd.offLoad(onLoadVideo);
                videoAd.offError(onErrorVideo);
                videoAd.offClose(onCloseVideo);
            }

            var videoAd = Laya.Browser.window.wx.createRewardedVideoAd({ adUnitId: self.front_video_ids[0] });
            videoAd.onLoad(onLoadVideo);
            videoAd.onError(onErrorVideo);
            videoAd.onClose(onCloseVideo);
            this.videoAd = videoAd;
        }

        function onLoadVideo() {
            console.log('video 加载成功');
            self.isExistVideoAd = true;
            this.isVideoLoading = false;
        }

        function onErrorVideo(err) {
            console.error('video 加载错误', err);
            self.isExistVideoAd = false;
            this.isVideoLoading = false;
        }

        function onCloseVideo(res) {
            // 小于 2.1.0 的基础库版本，res 是一个 undefined
            let isEnded = (res && res.isEnded || res === undefined) ? true : false;
            if (isEnded) {
                //观看视频成功次数埋点
                self.videoFinishCallback && self.videoFinishCallback()
                self.videoFinishCallback = null
            } else {
                self.videoCancelCallback && self.videoCancelCallback()
                self.videoCancelCallback = null
            }
            self.videoCompleteCallback && self.videoCompleteCallback()
            self.videoCompleteCallback = null
        }
    }

    static showVideoAd(finishCB?: Function, cancelCB?: Function, completeCB?: Function, errorFinish = false) {
        if (!Laya.Browser.onWeiXin || this.front_video_ids.length <= 0) {
            finishCB && finishCB();
            cancelCB && cancelCB();
            completeCB && completeCB();
            return;
        }

        if (!Laya.Browser.onWeiXin) return;
        let self = this
        this.videoFinishCallback = finishCB;
        this.videoCancelCallback = cancelCB;
        this.videoCompleteCallback = completeCB;
        if (!this.isExistVideoAd) {
            this.createVideoAd()
        }
        if (Laya.Browser.onWeiXin) {
            if(!this.videoAd){
                Laya.Browser.window.wx.showToast({
                    title: '暂无视频',
                    duration: 2000
                })
                completeCB && completeCB();
                return
            }
            var videoAd = this.videoAd;
            videoAd.show().then(() => { }).catch(err => {
                videoAd.load().then(() => videoAd.show()).catch(err => {
                    self.videoCompleteCallback && self.videoCompleteCallback()
                    self.videoCompleteCallback = null
                    if (!errorFinish && this.videoFinishCallback) {
                        Laya.Browser.window.wx.showToast({
                            title: '暂无视频',
                            duration: 2000
                        })
                    }
                    if (errorFinish && this.videoFinishCallback) {
                        this.videoFinishCallback && this.videoFinishCallback()
                        this.videoFinishCallback = null
                        Laya.Browser.window.wx.showToast({
                            title: '已获得奖励',
                            duration: 2000
                        })
                    }
                    this.destroyVideoAd();
                });
            });
        }
    }

    static destroyVideoAd() {
        if (!this.videoAd) return;
        this.videoAd.destroy();
        this.videoAd = null;
        this.createVideoAd();
    }
    //#endregion

    //#region 格子广告
    static initCustomAD() {
        if (!Laya.Browser.onWeiXin) {
            return;
        }
        this.createFullGrid()
        this.createSideGrid()
        this.createSingleGrid()
    }

    //全屏格子
    static fullGridAd: any[] = []
    static fullGridError: boolean = false
    static fullGridShowCount: number = 0
    static fullGridCurIndex: number = 0
    private static isFullGridAdLoaded: boolean = false
    private static createFullGrid() {
        if (!Laya.Browser.onWeiXin || this.front_custom_full_ids.length <= 0) { this.isFullGridAdLoaded = true; return }
        let loadCount = 0
        let count = SGConfig.isPortrait ? 1 : 2;
        let style = {};
        for (let i = 0; i < count; i++) {
            if (SGConfig.isPortrait) {
                style = {
                    left: 0,
                    top: this.getSystemInfoSync().screenHeight / 2 - this.getSystemInfoSync().screenWidth / 2 - 50,
                    width: this.getSystemInfoSync().screenWidth
                }
            } else {
                style = {
                    left: (this.getSystemInfoSync().screenWidth / 2 - 300) + Math.floor(i % 2) * 300,
                    top: 30,
                    width: 10,
                    height: 10
                }
            }
            let fullGridAd = Laya.Browser.window.wx.createCustomAd({
                adUnitId: this.front_custom_full_ids[i],
                adIntervals: 30,
                style: style
            });
            fullGridAd.onError((err) => {
                loadCount++
                if (loadCount >= count)
                    this.isFullGridAdLoaded = true;
                console.log('全屏格子加载失败:', JSON.stringify(err));
            })
            fullGridAd.onLoad(() => {
                loadCount++
                if (loadCount >= count)
                    this.isFullGridAdLoaded = true;
                this.fullGridAd.push(fullGridAd);
                console.log('全屏格子' + i.toString() + '加载成功:');
            })
        }
    }
    static visibleFullGridAd(v: boolean = true) {
        if (!Laya.Browser.onWeiXin || this.fullGridAd.length <= 0) return
        for (let i = 0; i < this.fullGridAd.length; i++) {
            v ? this.fullGridAd[i].show() : this.fullGridAd[i].hide();
        }
    }

    //屏幕侧格子
    static sideGridAd: any[] = []
    private static createSideGrid() {
        if (!Laya.Browser.onWeiXin || this.front_custom_side_ids.length <= 0) return
        for (let i = 0; i < 2; i++) {
            let id = i < this.front_custom_side_ids.length ? i : this.front_custom_side_ids.length - 1
            let grid = Laya.Browser.window.wx.createCustomAd({
                adUnitId: this.front_custom_side_ids[id],
                adIntervals: 30,
                style: {
                    left: i == 0 ? 0 : this.getSystemInfoSync().screenWidth - 65,
                    top: this.getSystemInfoSync().screenHeight * 0.1
                }
            });
            grid.onError((err) => { console.log('屏幕侧格子加载失败:', JSON.stringify(err)) })
            grid.onLoad(() => { console.log('屏幕侧格子' + i.toString() + '加载成功:'); this.sideGridAd.push(grid) })
        }
    }
    static visibleSideGridAd(v: boolean = true) {
        if (!Laya.Browser.onWeiXin) return
        for (let i = 0; i < this.sideGridAd.length; i++) {
            v ? this.sideGridAd[i].show() : this.sideGridAd[i].hide()
        }
    }

    //游戏中单格子
    static singleGridAd: any[] = []
    private static createSingleGrid() {
        if (!Laya.Browser.onWeiXin || this.front_custom_single_ids.length <= 0) return
        for (let i = 0; i < 2; i++) {
            let id = i < this.front_custom_single_ids.length ? i : this.front_custom_single_ids.length - 1
            let grid = Laya.Browser.window.wx.createCustomAd({
                adUnitId: this.front_custom_single_ids[id],
                adIntervals: 30,
                style: {
                    left: i == 0 ? 0 : this.getSystemInfoSync().screenWidth - 70,
                    top: this.getSystemInfoSync().screenHeight * 0.1
                }
            });
            grid.onError((err) => { ; console.log('单格子加载失败:', JSON.stringify(err)) })
            grid.onLoad(() => { console.log('单格子' + i.toString() + '加载成功:'); this.singleGridAd.push(grid) })
        }
    }
    static visibleGameGridAd(v: boolean = true) {
        if (!Laya.Browser.onWeiXin) return
        for (let i = 0; i < this.singleGridAd.length; i++) {
            v ? this.singleGridAd[i].show() : this.singleGridAd[i].hide()
        }
    }

    //插屏广告
    private static intersititialAd: any = null
    private static intersititialCB: Function = null
    private static intersititialError: boolean = false
    private static createInterstitialAd() {
        if (!Laya.Browser.onWeiXin || this.front_interstitial_ids.length <= 0) return
        if (this.intersititialAd) {
            this.intersititialAd.offError()
            this.intersititialAd.offLoad()
            this.intersititialAd.offClose()
            this.intersititialAd.destroy();
            this.intersititialAd = null
        }
        this.intersititialAd = Laya.Browser.window.wx.createInterstitialAd({
            adUnitId: this.front_interstitial_ids[0]
        })
        this.intersititialAd.onError((err) => { this.intersititialError = true; console.log('插屏广告加载失败:', JSON.stringify(err)) })
        this.intersititialAd.onLoad(() => { this.intersititialError = false })
        this.intersititialAd.onClose(() => { this.intersititialCB && this.intersititialCB() })
        this.intersititialAd.load()
    }
    static showInterstitialAd(cb?: Function) {
        if (!Laya.Browser.onWeiXin || !this.intersititialAd || this.intersititialError) {
            if (this.intersititialError) this.createInterstitialAd()
            cb && cb()
            return
        }
        this.intersititialCB = cb
        this.intersititialAd.show().then(() => { }).catch(err => {
            this.intersititialCB && this.intersititialCB()
        });
    }


    //打乱数组
    public static shuffleArr(arr: any[]) {
        let i = arr.length;
        while (i) {
            let j = Math.floor(Math.random() * i--);
            [arr[j], arr[i]] = [arr[i], arr[j]];
        }
        return arr;
    }
}