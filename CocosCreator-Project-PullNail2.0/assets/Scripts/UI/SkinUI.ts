import UINode from "../Crl/UINode";
import { UIType } from "../Mod/Entity";
import PlatformApi from "../Mod/PlatformApi";
import PlayerDataMgr from "../Mod/PlayerDataMgr";
import SoundMgr from "../Mod/SoundMgr";
import Utility from "../Mod/Utility";

const { ccclass, property } = cc._decorator;

@ccclass
export default class SkinUI extends cc.Component {

    @property(cc.Node)
    itemNode: cc.Node = null

    protected onEnable(): void {
        Utility.zoomUI(this.node.getChildByName('root'))
        this.initItem()
    }

    initItem() {
        for (let i = 0; i < this.itemNode.children.length; i++) {
            let item = this.itemNode.children[i]
            let lock = item.getChildByName('lock')
            let tick = item.getChildByName('tick')
            lock.active = PlayerDataMgr.getPlayerData().skinArr[i] == 0
            tick.active = PlayerDataMgr.getPlayerData().skinId == i

            item.off(cc.Node.EventType.TOUCH_START)
            item.on(cc.Node.EventType.TOUCH_START, () => {
                this.clickCB(i)
            }, this)
        }
    }

    clickCB(id: number) {
        SoundMgr._ins.PlaySound('Click')
        if (PlayerDataMgr.getPlayerData().skinArr[id] == 0) {
            return
        }

        PlayerDataMgr.getPlayerData().skinId = id
        PlayerDataMgr.setPlayerData()
        this.initItem()
    }

    buySkin() {
        SoundMgr._ins.PlaySound('Click')
        if (PlayerDataMgr.getPlayerData().coin < 1000) {
            PlatformApi.showToast('金币不足')
            return
        }
        PlayerDataMgr.getPlayerData().coin -= 1000
        let arr = PlayerDataMgr.getSkinId()
        let id = Utility.getRandomItemInArr(arr)
        if (id == undefined) return
        PlayerDataMgr.getPlayerData().skinArr[id] = 1
        PlayerDataMgr.getPlayerData().skinId = id
        PlayerDataMgr.setPlayerData()
        PlatformApi.showToast('恭喜获得新的钉子')
        this.initItem()
    }

    adCB() {
        SoundMgr._ins.PlaySound('Click')
        PlatformApi.showVideoAd(() => {
            let arr = PlayerDataMgr.getSkinId()
            let id = Utility.getRandomItemInArr(arr)
            if (id == undefined) return
            PlayerDataMgr.getPlayerData().skinArr[id] = 1
            PlayerDataMgr.getPlayerData().skinId = id
            PlayerDataMgr.setPlayerData()
            PlatformApi.showToast('恭喜获得新的钉子')
            this.initItem()
        })
    }

    closeCB() {
        SoundMgr._ins.PlaySound('Click')
        Utility.zoomUI(this.node.getChildByName('root'), 0, () => {
            UINode.Share.closeUI(UIType.UI_SKIN)
        })
    }
}
