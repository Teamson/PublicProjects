import PlayerDataMgr from "../Libs/PlayerDataMgr"
import Utility from "../Mod/Utility"
import GameLogic from "../Crl/GameLogic"
import SoundMgr from "../Mod/SoundMgr"
import SGAD from "../SGSDK/SGAD"

export default class SkinUI extends Laya.Scene {
    constructor() {
        super()
    }

    myList: Laya.List
    closeBtn: Laya.Image
    coinNum: Laya.FontClip

    chooseId: number = 0

    onOpened() {
        this.size(Laya.stage.displayWidth, Laya.stage.displayHeight)
        Laya.timer.frameLoop(1, this, this.onMyUpdate)
        this.chooseId = PlayerDataMgr.getPlayerData().skinId
        Utility.addClickEvent(this.closeBtn, this, () => {
            GameLogic.Share._cameraCrl.resetCamera()
            Laya.Scene.open("MyScenes/StartUI.scene")
        })
        this.initList()
    }

    onClosed() {

    }

    initList() {
        let arr = [].concat(PlayerDataMgr.getPlayerData().skinArr)
        this.myList.vScrollBarSkin = '';
        this.myList.array = arr;
        this.myList.repeatX = 3;
        this.myList.repeatY = Math.floor(arr.length / 3);
        this.myList.renderHandler = Laya.Handler.create(this, this.onListRender, null, false);
    }
    onListRender(cell, index: number) {
        if (index >= this.myList.array.length) {
            return;
        }
        var item = cell.getChildByName('item') as Laya.Image
        let dk1 = item.getChildByName('dk1') as Laya.Image
        let dk2 = item.getChildByName('dk2') as Laya.Image
        let icon = item.getChildByName('icon') as Laya.Image
        let using = item.getChildByName('using') as Laya.Image
        let unlocked = item.getChildByName('unlocked') as Laya.Image
        let buyBtn = item.getChildByName('buyBtn') as Laya.Image
        let cost = buyBtn.getChildByName('cost') as Laya.FontClip
        let adBtn = item.getChildByName('adBtn') as Laya.Image

        dk2.visible = this.chooseId == index
        icon.skin = 'skinUI/Skirt/Skirt_' + (index + 1) + '.png'
        using.visible = PlayerDataMgr.getPlayerData().skinId == index
        unlocked.visible = PlayerDataMgr.getPlayerData().skinId != index && PlayerDataMgr.getPlayerData().skinArr[index] == 1
        buyBtn.visible = PlayerDataMgr.getPlayerData().skinArr[index] == 0
        cost.value = PlayerDataMgr.getCostById(index).toString()
        adBtn.visible = PlayerDataMgr.getPlayerData().skinArr[index] == 0

        icon.off(Laya.Event.CLICK, this, this.chooseCB)
        icon.on(Laya.Event.CLICK, this, this.chooseCB, [index])
        Utility.addClickEvent(buyBtn, this, this.buyBtnCB, [index])
        Utility.addClickEvent(adBtn, this, this.adBtnCB, [index])
    }

    chooseCB(id: number) {
        SoundMgr.instance.playSoundEffect('Click.mp3')
        if (this.chooseId == id) return
        this.chooseId = id
        GameLogic.Share._playerCrl.changeFirstSkirt(id)
        if (PlayerDataMgr.getPlayerData().skinArr[id] == 1) {
            PlayerDataMgr.getPlayerData().skinId = id
            PlayerDataMgr.setPlayerData()
        }
        this.myList.array = PlayerDataMgr.getPlayerData().skinArr;
    }

    buyBtnCB(arr: any[]) {
        let id: number = arr[0]
        if (PlayerDataMgr.getPlayerData().coin < PlayerDataMgr.getCostById(id)) {
            return
        }
        this.chooseId = id
        GameLogic.Share._playerCrl.changeFirstSkirt(id)
        PlayerDataMgr.getPlayerData().coin -= PlayerDataMgr.getCostById(id)
        PlayerDataMgr.getPlayerData().skinArr[id] = 1
        PlayerDataMgr.getPlayerData().skinId = id
        PlayerDataMgr.setPlayerData()
        this.myList.array = PlayerDataMgr.getPlayerData().skinArr;
    }

    adBtnCB(arr: any[]) {
        let id: number = arr[0]
        let cb = () => {
            this.chooseId = id
            GameLogic.Share._playerCrl.changeFirstSkirt(id)
            PlayerDataMgr.getPlayerData().skinArr[id] = 1
            PlayerDataMgr.getPlayerData().skinId = id
            PlayerDataMgr.setPlayerData()
            this.myList.array = PlayerDataMgr.getPlayerData().skinArr;
        }
        SGAD.showVideoAd(cb)
    }

    onMyUpdate() {
        this.coinNum.value = PlayerDataMgr.getPlayerData().coin.toString()
    }
}