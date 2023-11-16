import SGAD from "./SGAD";
import SoundMgr from "./SoundMgr";

const { ccclass, property } = cc._decorator;

@ccclass
export default class PlatformApi {
    public static isDovibrate: boolean = true;

    public static visibleBanner(v: boolean) {

    }

    public static showVideoAd(cb: Function, completeCB?: Function) {
        if (cc.sys.platform != cc.sys.WECHAT_GAME) {
            cb && cb()
            completeCB && completeCB()
            return
        }
        SGAD.showVideoAd(cb, null, () => {
            completeCB && completeCB()
            SoundMgr._ins.PlayMusic('Bgm')
        })
    }

    public static showToast(str: string) {
        if (cc.sys.platform != cc.sys.WECHAT_GAME) return
        window['wx'].showToast({
            title: str,//提示文字
            duration: 2000,//显示时长
            mask: false,//是否显示透明蒙层，防止触摸穿透，默认：false  
            icon: 'none', //图标，支持"success"、"loading"  
        })
    }

    //震动
    public static DoVibrate(isShort: boolean = true) {
        if (cc.sys.platform == cc.sys.WECHAT_GAME && this.isDovibrate) {
            if (isShort) {
                window['wx'].vibrateShort()
            } else {
                window['wx'].vibrateLong()
            }
        }
    }
}
