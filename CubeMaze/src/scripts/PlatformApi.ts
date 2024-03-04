import SGAD from "../SGSDK/SGAD"

export default class PlatformApi {

    public static showVideoAd(cb?: Function) {
        if (!Laya.Browser.onWeiXin) {
            cb && cb()
        }

        SGAD.showVideoAd(cb)
    }

    public static loadSubpackage(name: string, cb?: Function) {
        Laya.Browser.window.wx.loadSubpackage({
            name: name, // name 可以填 name 或者 root
            success: (res) => {
                cb && cb()
            }
        })
    }
}