import GameLogic from "../Crl/GameLogic"
import WxApi from "../Libs/WxApi"
import Utility from "../Mod/Utility"
import PlayerDataMgr from "../Libs/PlayerDataMgr"
import SGMgr from "../SGSDK/SGMgr"

export default class LoadingUI extends Laya.Scene {
    constructor() {
        super()
    }

    bar: Laya.ProgressBar

    sdkInited: boolean = false
    resLoaded: boolean = false

    //perNum: Laya.Label

    onOpened() {
        this.size(Laya.stage.displayWidth, Laya.stage.displayHeight)
        if (!Laya.Browser.onWeiXin) {
            localStorage.clear()
        }
        this.loadJsonData(1)
        SGMgr.init(() => {
            this.sdkInited = true
        })

        Laya.timer.frameLoop(1, this, () => {
            this.bar.value += 0.01
            if (this.sdkInited && this.resLoaded) {
                GameLogic.Share.initScene()
                Laya.timer.clearAll(this)
            }
        })
    }

    onClosed() {

    }

    maxGrade: number = 5
    loadJsonData(index: number) {
        //加载JSON
        Utility.loadJson('res/configs/Level' + index + '.json', (data) => {
            PlayerDataMgr.levelDataArr.push(data)
            index++
            if (index > this.maxGrade) {
                if (Laya.Browser.onWeiXin)
                    this.loadSubpackage()
                else
                    this.loadRes()
                console.log('levelDataArr:', PlayerDataMgr.levelDataArr)
                return
            } else {
                this.loadJsonData(index)
            }
        })
    }

    loadSubpackage() {
        const loadTask = Laya.Browser.window.wx.loadSubpackage({
            name: 'unity', // name 可以填 name 或者 root
            success: (res) => {
                // 分包加载成功后通过 success 回调
                this.loadRes()
            },
            fail: (res) => {
                // 分包加载失败通过 fail 回调
                this.loadSubpackage()
            }
        })

        loadTask.onProgressUpdate(res => {
            console.log('下载进度', res.progress)
            console.log('已经下载的数据长度', res.totalBytesWritten)
            console.log('预期需要下载的数据总长度', res.totalBytesExpectedToWrite)
        })
    }

    loadRes() {
        //预加载3d资源
        var resUrl = [
            WxApi.UnityPath + 'PropNode.lh'
        ];
        Laya.loader.create(resUrl, Laya.Handler.create(this, this.onComplete), Laya.Handler.create(this, this.onProgress));
    }

    onComplete() {
        this.resLoaded = true
    }

    onProgress(value) {
        //this.bar.value = value
        //this.perNum.text = (50 + Math.floor(value * 50)).toString() + '%'
    }
}