import GameData from "../Crl/GameData";
import UINode from "../Crl/UINode";
import { UIType } from "../Mod/Entity";
import PlayerDataMgr from "../Mod/PlayerDataMgr";
import SGAD from "../Mod/SGAD";
import SoundMgr from "../Mod/SoundMgr";

const { ccclass, property } = cc._decorator;

@ccclass
export default class LoadingUI extends cc.Component {

    @property(cc.ProgressBar)
    bar: cc.ProgressBar = null

    start() {
        cc.director.getPhysicsManager().enabled = true

        PlayerDataMgr.getPlayerData()
        SGAD.initAd()

        if (cc.sys.platform != cc.sys.WECHAT_GAME) {
            localStorage.clear()

            this.scheduleOnce(() => {
                SoundMgr._ins.loadSounds(() => {
                    cc.director.loadScene('Game', () => {
                        UINode.Share.showUI(UIType.UI_START)
                    })
                })
            }, 1)
        } else {
            //开启右上角的分享
            window['wx'].showShareMenu({
                withShareTicket: true,
                menus: ['shareAppMessage', 'shareTimeline']
            });
            window['wx'].onShareAppMessage(function (res) {
                return {
                    title: '玩了个钉子',
                    imageUrl: '',
                }
            })

            window['wx'].loadSubpackage({
                name: 'Res',
                success: () => {
                    SoundMgr._ins.loadSounds(() => {
                        cc.director.loadScene('Game', () => {
                            UINode.Share.showUI(UIType.UI_START)
                        })
                    })
                }
            })
        }
    }

    protected update(dt: number): void {
        this.bar.progress += 0.005
    }

}
