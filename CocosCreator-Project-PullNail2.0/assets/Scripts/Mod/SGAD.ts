
export default class SGAD {
    static front_banner_ids: string[] = ['adunit-bb91443d508cf266', 'adunit-fec20c5522e3c5cf'];
    static front_video_ids: string[] = ['adunit-fd02ab282560fe09'];
    static front_chaping_ids: string[] = ['adunit-502b298ed6782344'];
    static front_dangezi_ids: string[] = ['adunit-79e01a15d98a7361', 'adunit-ec8575b629182783'];
    static front_full_ids: string[] = ['adunit-3ab00ec490b87eff'] //JM
    
    /* static front_banner_ids: string[] = ['adunit-bb91443d508cf266', 'adunit-fec20c5522e3c5cf'];
    static front_video_ids: string[] = ['adunit-ac70ca600fbb6bb5'];
    static front_chaping_ids: string[] = ['adunit-502b298ed6782344'];
    static front_dangezi_ids: string[] = ['adunit-79e01a15d98a7361', 'adunit-ec8575b629182783'];
    static front_full_ids: string[] = ['adunit-3ab00ec490b87eff'] */

    static initAd(cb?: Function) {
        if (cc.sys.platform != cc.sys.WECHAT_GAME) { cb && cb(); return };

        this.front_banner_ids = this.shuffleArr(this.front_banner_ids)
        this.front_video_ids = this.shuffleArr(this.front_video_ids)
        this.front_chaping_ids = this.shuffleArr(this.front_chaping_ids)
        this.front_dangezi_ids = this.shuffleArr(this.front_dangezi_ids)

        this.initGridAD()
        this.initBanner();
        this.createVideoAd();
        this.createInterstitialAd()

        //cb && cb()
    }

    static sysInfo: any;
    static getSystemInfoSync() {
        if (cc.sys.platform != cc.sys.WECHAT_GAME) return;
        if (!this.sysInfo) {
            this.sysInfo = window['wx'].getSystemInfoSync();
        }
        return this.sysInfo;
    }

    //#region Banner广告
    static bannerAd: any = null;
    static bannerErrorArr: boolean = false
    static initBanner() {
        if (cc.sys.platform != cc.sys.WECHAT_GAME) return;

        this.bannerAd = null;
        this.bannerErrorArr = false;
        this.bannerAd = this.createBannerAd(0)
    }

    static get isAllBannerError(): boolean {
        return this.bannerErrorArr
    }

    static showBannerAd() {
        if (cc.sys.platform != cc.sys.WECHAT_GAME) return;
        /* if (this.isAllBannerError) {
            this.initBanner();
            return;
        } */

        this.bannerAd && this.bannerAd.show()
    }

    static hideBannerAd() {
        if (cc.sys.platform != cc.sys.WECHAT_GAME) return
        this.bannerAd && this.bannerAd.hide()
    }

    static createBannerAd(index: number) {
        if (cc.sys.platform != cc.sys.WECHAT_GAME) return;

        let sysInfo = this.getSystemInfoSync();
        let bannerAd = window['wx'].createBannerAd({
            adUnitId: this.front_banner_ids[index],
            style: {
                top: sysInfo.screenHeight * 0.8,
                width: 10,
                left: sysInfo.screenWidth / 2 - 150
            },
            adIntervals: 30
        });
        bannerAd.onLoad(() => {
            this.bannerErrorArr = false
            bannerAd.show()
            console.log("Banner广告加载成功");

        });
        bannerAd.onError(err => {
            this.bannerErrorArr = true
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
    static createVideoAd(autoShow: boolean = false) {
        if (cc.sys.platform == cc.sys.WECHAT_GAME) {
            var self = this;
            var videoAd = this.videoAd;
            if (videoAd != null) {
                videoAd.offLoad(onLoadVideo);
                videoAd.offError(onErrorVideo);
                videoAd.offClose(onCloseVideo);
            }

            var videoAd = window['wx'].createRewardedVideoAd({ adUnitId: self.front_video_ids[0] });
            videoAd.onLoad(onLoadVideo);
            videoAd.onError(onErrorVideo);
            videoAd.onClose(onCloseVideo);
            this.videoAd = videoAd;
        }

        function onLoadVideo() {
            console.log('video 加载成功');
            self.isExistVideoAd = true;
            if (autoShow) {
                videoAd.show();
            }
        }

        function onErrorVideo(err) {
            console.error('video 加载错误', err);
            self.isExistVideoAd = false;
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
        if (cc.sys.platform != cc.sys.WECHAT_GAME) {
            finishCB && finishCB();
            cancelCB && cancelCB();
            completeCB && completeCB();
            return;
        }

        if (cc.sys.platform != cc.sys.WECHAT_GAME) return;
        let self = this
        this.videoFinishCallback = finishCB;
        this.videoCancelCallback = cancelCB;
        this.videoCompleteCallback = completeCB;
        if (!this.isExistVideoAd) {
            this.createVideoAd()
        }
        if (cc.sys.platform == cc.sys.WECHAT_GAME) {
            if (!this.videoAd) {
                window['wx'].showToast({
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
                        window['wx'].showToast({
                            title: '暂无视频',
                            duration: 2000
                        })
                    }
                    if (errorFinish && this.videoFinishCallback) {
                        this.videoFinishCallback && this.videoFinishCallback()
                        this.videoFinishCallback = null
                        window['wx'].showToast({
                            title: '已获得奖励',
                            duration: 2000
                        })
                    }
                    this.destroyVideoAd()
                });
            });
        }
    }

    static destroyVideoAd() {
        if (!this.videoAd) return;
        this.videoAd.destroy();
        this.videoAd = null;
        this.createVideoAd()
    }
    //#endregion

    //#region 格子广告
    static initGridAD() {
        if (cc.sys.platform != cc.sys.WECHAT_GAME) {
            return;
        }
        //this.createGameGrid()
        this.createFullGrid()
    }

    //游戏中单格子
    static gameGridAd: any[] = []
    private static createGameGrid() {
        if (cc.sys.platform != cc.sys.WECHAT_GAME) return
        for (let i = 0; i < 2; i++) {
            let id = i < this.front_dangezi_ids.length ? i : this.front_dangezi_ids.length - 1
            let grid = window['wx'].createCustomAd({
                adUnitId: this.front_dangezi_ids[id],
                adIntervals: 30,
                style: {
                    left: i == 0 ? 0 : this.getSystemInfoSync().screenWidth - 70,
                    top: this.getSystemInfoSync().screenHeight * 0.1
                }
            });
            grid.onError((err) => { ; console.log('游戏中单格子加载失败:', JSON.stringify(err)) })
            grid.onLoad(() => {
                grid.show()
                this.gameGridAd.push(grid)
            })
        }
    }
    static visibleGameGridAd(v: boolean = true) {
        if (cc.sys.platform != cc.sys.WECHAT_GAME) return
        for (let i = 0; i < this.gameGridAd.length; i++) {
            v ? this.gameGridAd[i].show() : this.gameGridAd[i].hide()
        }
    }
    //全屏格子
    static fullGridAd: any[] = []
    private static createFullGrid() {
        if (cc.sys.platform != cc.sys.WECHAT_GAME) return
        for (let i = 0; i < 1; i++) {
            let grid = window['wx'].createCustomAd({
                adUnitId: this.front_full_ids[0],
                adIntervals: 30,
                style: {
                    left: i == 0,
                    top: this.getSystemInfoSync().screenHeight * 0.15
                }
            });
            grid.onError((err) => { ; console.log('全屏格子加载失败:', JSON.stringify(err)) })
            grid.onLoad(() => {
                //grid.show()
                this.fullGridAd.push(grid)
            })
        }
    }
    static visibleFullGridAd(v: boolean = true) {
        if (cc.sys.platform != cc.sys.WECHAT_GAME) return
        for (let i = 0; i < this.fullGridAd.length; i++) {
            v ? this.fullGridAd[i].show() : this.fullGridAd[i].hide()
        }
    }

    //插屏广告
    private static intersititialAd: any = null
    private static intersititialCB: Function = null
    private static intersititialError: boolean = false
    private static createInterstitialAd() {
        if (cc.sys.platform != cc.sys.WECHAT_GAME) return
        if (this.intersititialAd) {
            this.intersititialAd.offError()
            this.intersititialAd.offLoad()
            this.intersititialAd.offClose()
            this.intersititialAd.destroy();
            this.intersititialAd = null
        }
        this.intersititialAd = window['wx'].createInterstitialAd({
            adUnitId: this.front_chaping_ids[0]
        })
        this.intersititialAd.onError((err) => { this.intersititialError = true; console.log('插屏广告加载失败:', JSON.stringify(err)) })
        this.intersititialAd.onLoad(() => { this.intersititialError = false })
        this.intersititialAd.onClose(() => { this.intersititialCB && this.intersititialCB() })
        this.intersititialAd.load()
    }
    static showInterstitialAd(cb?: Function) {
        if (cc.sys.platform != cc.sys.WECHAT_GAME || !this.intersititialAd || this.intersititialError) {
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