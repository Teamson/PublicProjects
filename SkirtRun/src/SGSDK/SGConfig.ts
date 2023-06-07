
export default class SGConfig {
    static version: string = '1.0.1'                             //游戏版本号  对应体验版
    static isPortrait: boolean = true                            //是否竖屏
    static homeMoreGameType: number = 0                           //首页更多游戏按钮类型  0：抽屉  1：更多好玩  2：抽屉&更多好玩
    static isShowHomeBanner: boolean = true                      //是否展示首页banner
    static isShowShopBanner: boolean = false                      //是否展示商店banner
    static isShowGameBanner: boolean = true                      //是否展示游戏中banner
    static isShowFinishBanner: boolean = true                    //是否展示结算页banner
    static isShowHomeSideGrid: boolean = true                    //是否展示首页对联
    static isShowGameSingleGrid: boolean = true                  //是否展示游戏中单格子
    static isShowFinishSideGrid: boolean = true                  //是否展示结算页对联
    static data: ConfigData = null
    static _wx: any = Laya.Browser.window.wx
    static isWechat: boolean = Laya.Browser.onWeiXin

    static getServerConfig(cb) {
        window['SGGameConfigs']().then((res: any) => {
            cb(res.data)
        })
    }

    static initConfigData(cb: Function) {
        this.version = window['SGSdkConf'].version
        if (this._wx.getLaunchOptionsSync().query.channel) {
            localStorage.setItem('channel', this._wx.getLaunchOptionsSync().query.channel)
        }
        this.getServerConfig((data: any) => {
            console.log('后台参数:', data)
            this.data = new ConfigData()
            var configs = data.configs;
            for (let key in configs) {
                this.data[key] = configs[key].config_val;
            }
            this.data.is_allow_area = data.is_allow_area
            this.data.front_wuchu_scene = data.front_wuchu_scene
            this.data.wuchu_version = data.wuchu_version
            let channel = this._wx.getLaunchOptionsSync().query.channel
            if (!this.isVersionValid) {
                for (let key in this.data) {
                    if (typeof (this.data[key]) == "boolean") this.data[key] = false
                }
                this.data.front_video_tips_switch = true;
            }
            else if (!this.data.is_allow_area || !this.allowScene || (this.data.channel_ditch && !channel)) {
                this.data.front_remen_banner_switch = false;
            }
            console.log('最终参数:', this.data)
            cb && cb()
        })
    }

    /**屏蔽场景值 */
    public static get allowScene() {
        if (this.isWechat && this.data.front_wuchu_scene) {
            var launchInfo = this._wx.getLaunchOptionsSync();
            let scene: string = launchInfo.scene.toString();
            console.log('当前场景值：', scene)
            let arr: string[] = this.data.front_wuchu_scene.split('|');
            return arr.indexOf(scene) != -1;
        }
        return false;
    }

    public static get isVersionValid() {
        if (!this._wx) return false
        let myV = this.version.split('.')
        let serverV = this.data.wuchu_version.split('.')
        return (parseInt(serverV[0]) + parseInt(serverV[1]) + parseInt(serverV[2])) >= (parseInt(myV[0]) + parseInt(myV[1]) + parseInt(myV[2]))
    }
}

class ConfigData {
    is_allow_area: boolean = false
    channel_ditch: boolean = false
    front_wuchu_scene: string = '1095|1058|1045|1046|1067|1084|1144|1091|1152|1089|1001|1007|1038|1037'
    wuchu_version: string = '1.0.1'

    front_banner_ids: string[] = []
    front_video_ids: string[] = []
    front_interstitial_ids: string[] = []
    front_custom_full_ids: string[] = []
    front_custom_side_ids: string[] = []
    front_custom_single_ids: string[] = []

    front_remen_click_count: number = 1
    front_banner_refresh_time: number = 5
    front_banner_show_count: number = 3
    front_remen_start_gameCount: number = 1
    front_remen_over_gameCount: number = 1
    front_remen_finish_gameCount: number = 1
    front_remen_banner_showHide_time: number = 0.6

    front_moreGame_switch: boolean = true
    front_video_tips_switch: boolean = true
    front_remen_loading_switch: boolean = true
    front_remen_start_switch: boolean = true
    front_remen_over_switch: boolean = true
    front_remen_finish_switch: boolean = true
    front_remen_banner_switch: boolean = false
    front_interstitial_onHide_switch: boolean = true
    front_interstitial_afterRemen_switch: boolean = true
}