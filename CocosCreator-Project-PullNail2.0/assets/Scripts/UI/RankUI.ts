import GameData from "../Crl/GameData";
import PlayerDataMgr from "../Mod/PlayerDataMgr";
import SoundMgr from "../Mod/SoundMgr";
import Utility from "../Mod/Utility";

const { ccclass, property } = cc._decorator;

@ccclass
export default class RankUI extends cc.Component {
    @property(cc.Node)
    authorizeNode: cc.Node = null
    @property(cc.Node)
    tips: cc.Node = null

    protected onEnable(): void {
        let cb = () => {
            this.tips.active = true
            cc.find('Canvas/rankSP').active = true

            this.authorizeNode.active = false
            if (cc.sys.platform == cc.sys.WECHAT_GAME && PlayerDataMgr.getPlayerData().hadAuthorize) {
                window['wx'].getSetting({
                    success: (res) => {
                        if (!res.authSetting['scope.WxFriendInteraction']) {
                            this.authorizeNode.active = true
                        } else {
                            window['wx'].postMessage({
                                event: 'showHomeRank',
                                score: PlayerDataMgr.getPlayerData().score
                            });
                        }
                        this.tips.active = false
                    },
                    fail: () => {
                        this.authorizeNode.active = true
                    }
                })
            } else if (cc.sys.platform == cc.sys.WECHAT_GAME && !PlayerDataMgr.getPlayerData().hadAuthorize) {
                this.scheduleOnce(this.checkAuthorize)
            }

            PlayerDataMgr.getPlayerData().hadAuthorize = true
            PlayerDataMgr.setPlayerData()
        }
        if (cc.sys.platform == cc.sys.WECHAT_GAME && window['wx'].requirePrivacyAuthorize) {
            this.tips.active = true
            window['wx'].requirePrivacyAuthorize({
                success: () => {
                    cb()
                }
            })
        } else if (cc.sys.platform == cc.sys.WECHAT_GAME && !window['wx'].requirePrivacyAuthorize) {
            cb()
        }

    }
    protected onDisable(): void {

        this.unscheduleAllCallbacks()
    }

    checkAuthorize() {
        if (cc.sys.platform == cc.sys.WECHAT_GAME) {
            window['wx'].getSetting({
                success: (res) => {
                    if (!res.authSetting['scope.WxFriendInteraction']) {
                        this.tips.active = true
                        this.scheduleOnce(this.checkAuthorize)
                    } else {
                        this.tips.active = false
                        window['wx'].postMessage({
                            event: 'showHomeRank',
                            score: PlayerDataMgr.getPlayerData().score
                        });
                    }
                }
            })
        }
    }

    authorizeCB() {
        SoundMgr._ins.PlaySound('Click')
        if (cc.sys.platform == cc.sys.WECHAT_GAME) {
            Utility.openAppAuthorizeSetting(() => {
                window['wx'].postMessage({
                    event: 'showHomeRank',
                    score: PlayerDataMgr.getPlayerData().score
                });

                window['wx'].getSetting({
                    success: (res) => {
                        this.authorizeNode.active = !res.authSetting['scope.WxFriendInteraction']
                    },
                    fail: () => {
                        this.authorizeNode.active = true
                    }
                })
                window['wx'].offShow(Utility.AuthorizeSettingCB)
                Utility.AuthorizeSettingCB = null
            })
        }
    }

    closeCB() {
        SoundMgr._ins.PlaySound('Click')
        if (cc.sys.platform == cc.sys.WECHAT_GAME && cc.find('Canvas/rankSP').active) {
            window['wx'].postMessage({
                event: 'hideHomeRank',
                score: PlayerDataMgr.getPlayerData().score
            });
        }
        this.node.active = false
    }

    update(deltaTime: number) {
        if (this.authorizeNode.active) {
            this.tips.active = false
        }
    }
}
