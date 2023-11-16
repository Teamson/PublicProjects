import UINode from "../Crl/UINode";
import { UIType } from "../Mod/Entity";
import PlatformApi from "../Mod/PlatformApi";
import PlayerDataMgr from "../Mod/PlayerDataMgr";
import SoundMgr from "../Mod/SoundMgr";
import Utility from "../Mod/Utility";

const { ccclass, property } = cc._decorator;

@ccclass
export default class SignUI extends cc.Component {

    @property(cc.Node)
    itemNode: cc.Node = null

    @property(cc.Node)
    getBtn: cc.Node = null

    @property(cc.Node)
    doubleBtn: cc.Node = null
    @property(cc.Node)
    redPoint: cc.Node = null

    isDouble: boolean = false

    protected onEnable(): void {
        Utility.zoomUI(this.node.getChildByName('root'))
        this.initData()
    }

    initData() {
        if (!localStorage.getItem('signCount')) {
            localStorage.setItem('signCount', '0')
        }
        let signCount: number = parseInt(localStorage.getItem('signCount'))

        let sameDay = false
        let curDate = new Date().getDate().toString()
        if (localStorage.getItem('signDate') && localStorage.getItem('signDate') == curDate) {
            sameDay = true
        }

        if (signCount >= 7 && !sameDay) {
            localStorage.setItem('signCount', '0')
            signCount = 0
        }

        if (signCount >= 7 || sameDay) {
            this.getBtn.active = false
            this.doubleBtn.active = false
        }

        for (let i = 0; i < this.itemNode.children.length; i++) {
            let item = this.itemNode.children[i]
            item.getChildByName('got').active = i < signCount
        }
    }

    getCB() {
        SoundMgr._ins.PlaySound('Click')
        if (!localStorage.getItem('signCount')) {
            localStorage.setItem('signCount', '0')
        }
        let signCount: number = parseInt(localStorage.getItem('signCount'))

        let sameDay = false
        let curDate = new Date().getDate().toString()
        if (localStorage.getItem('signDate') && localStorage.getItem('signDate') == curDate) {
            sameDay = true
        }

        if (signCount >= 7 && !sameDay) {
            localStorage.setItem('signCount', '0')
            signCount = 0
        }

        let cb = () => {
            let coinNum = 0
            switch (signCount) {
                case 0:
                    coinNum = this.isDouble ? 2000 : 1000
                    PlatformApi.showToast('恭喜获得' + coinNum + '金币')
                    break
                case 1:
                    PlayerDataMgr.getPlayerData().skinArr[3] = 1
                    PlayerDataMgr.getPlayerData().skinId = 3
                    PlatformApi.showToast('恭喜获得新皮肤')
                    break
                case 2:
                    PlayerDataMgr.getPlayerData().skinArr[4] = 1
                    PlayerDataMgr.getPlayerData().skinId = 4
                    PlatformApi.showToast('恭喜获得新皮肤')
                    break
                case 3:
                    PlayerDataMgr.getPlayerData().skinArr[5] = 1
                    PlayerDataMgr.getPlayerData().skinId = 5
                    PlatformApi.showToast('恭喜获得新皮肤')
                    break
                case 4:
                    PlayerDataMgr.getPlayerData().skinArr[6] = 1
                    PlayerDataMgr.getPlayerData().skinId = 6
                    PlatformApi.showToast('恭喜获得新皮肤')
                    break
                case 5:
                    PlayerDataMgr.getPlayerData().skinArr[7] = 1
                    PlayerDataMgr.getPlayerData().skinId = 7
                    PlatformApi.showToast('恭喜获得新皮肤')
                    break
                case 6:
                    PlayerDataMgr.getPlayerData().skinArr[8] = 1
                    PlayerDataMgr.getPlayerData().skinId = 8
                    coinNum = this.isDouble ? 6000 : 3000
                    PlatformApi.showToast('恭喜获得新皮肤')
                    break
            }
            localStorage.setItem('signCount', (signCount + 1).toString())
            localStorage.setItem('signDate', new Date().getDate().toString())
            PlayerDataMgr.getPlayerData().coin += coinNum
            PlayerDataMgr.setPlayerData()
            this.redPoint.active = false
            this.initData()
            this.closeCB()
        }

        cb()
    }

    doubleCB() {
        SoundMgr._ins.PlaySound('Click')
        PlatformApi.showVideoAd(() => {
            this.isDouble = true
            this.getCB()
        })
    }

    closeCB() {
        SoundMgr._ins.PlaySound('Click')
        Utility.zoomUI(this.node.getChildByName('root'), 0, () => {
            UINode.Share.closeUI(UIType.UI_SIGN)
        })
    }
}
