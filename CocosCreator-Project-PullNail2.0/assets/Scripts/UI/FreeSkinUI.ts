import UINode from "../Crl/UINode";
import { UIType } from "../Mod/Entity";
import PlatformApi from "../Mod/PlatformApi";
import PlayerDataMgr from "../Mod/PlayerDataMgr";
import SoundMgr from "../Mod/SoundMgr";
import Utility from "../Mod/Utility";

const { ccclass, property } = cc._decorator;

@ccclass
export default class FreeSkinUI extends cc.Component {

    @property(cc.Node)
    icon: cc.Node = null

    skinId: number = -1

    protected onEnable(): void {
        if (PlayerDataMgr.getSkinId().length <= 0) {
            this.node.active = false
            return
        }
        Utility.zoomUI(this.node.getChildByName('root'))
        this.skinId = Utility.getRandomItemInArr(PlayerDataMgr.getSkinId())
        for (let i = 0; i < this.icon.children.length; i++) {
            this.icon.children[i].active = i == this.skinId
        }
    }


    adCB() {
        SoundMgr._ins.PlaySound('Click')
        PlatformApi.showVideoAd(() => {
            PlayerDataMgr.getPlayerData().skinArr[this.skinId] = 1
            PlayerDataMgr.getPlayerData().skinId = this.skinId
            PlayerDataMgr.setPlayerData()
            PlatformApi.showToast('恭喜获得新皮肤')
            this.closeCB()
        })
    }

    closeCB() {
        SoundMgr._ins.PlaySound('Click')
        Utility.zoomUI(this.node.getChildByName('root'), 0, () => {
            UINode.Share.closeUI(UIType.UI_FreeSkin)
        })
    }
}
