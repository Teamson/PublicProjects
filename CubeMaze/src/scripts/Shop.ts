
import PlatformApi from "./PlatformApi";
import BaseUI from "./mods/BaseUI";
import PlayerData from "./mods/PlayerData";
import Tools from "./mods/Tools";
import Data, { SceneUrl } from "./tools/Data";

export default class Shop extends BaseUI {
    //单体
    item1: Laya.Image;
    item2: Laya.Image;
    item3: Laya.Image;
    item4: Laya.Image;
    item5: Laya.Image;
    item6: Laya.Image;
    item7: Laya.Image;
    item8: Laya.Image;
    item9: Laya.Image;
    //按钮ui
    // coinButton: Laya.Image;
    backButton: Laya.Image;
    videoButton: Laya.Image;
    coinValue: Laya.FontClip;
    //公共参数
    data: any;
    init() {
        this.init1();
    }
    init1() {
        this.data = PlayerData.GetPlayerData();
        console.log("玩家存档信息：", this.data);
        this.initAllItem();
        this.initButtonEvent();
        this.coinValue.value = this.data.coin;
    }
    initButtonEvent() {
        Tools.imageButtonInit(this.item1, this, this.itemEvent, 1);
        Tools.imageButtonInit(this.item2, this, this.itemEvent, 2);
        Tools.imageButtonInit(this.item3, this, this.itemEvent, 3);
        Tools.imageButtonInit(this.item4, this, this.itemEvent, 4);
        Tools.imageButtonInit(this.item5, this, this.itemEvent, 5);
        Tools.imageButtonInit(this.item6, this, this.itemEvent, 6);
        Tools.imageButtonInit(this.item7, this, this.itemEvent, 7);
        Tools.imageButtonInit(this.item8, this, this.itemEvent, 8);
        Tools.imageButtonInit(this.item9, this, this.itemEvent, 9);
        // Tools.imageButtonInit(this.coinButton, this, this.coinEvent);
        Tools.imageButtonInit(this.videoButton, this, this.videoEvent);
        Tools.imageButtonInit(this.backButton, this, this.backEvent);
    }
    closeAllShowCar() {
        let show = this.getChildAt(1);
        for (let i = 0; i < show.numChildren; i++) {
            let image = show.getChildAt(i) as Laya.Image;
            image.visible = false;
        }
    }
    initAllItem() {
        let list = [this.item1, this.item2, this.item3, this.item4, this.item5, this.item6, this.item7, this.item8, this.item9]
        for (let i = 0; i < 9; i++) {
            let item = list[i]
            let choose = item.getChildByName("choose") as Laya.Image;
            let lock = item.getChildByName("lock") as Laya.Image;
            let tips = item.getChildByName("tips") as Laya.Image;
            let showOpen = item.getChildByName("showOpen") as Laya.Image;
            let showClose = item.getChildByName("showClose") as Laya.Image;
            choose.set_visible((i == this.data.nowPeople));
            lock.set_visible(!this.data.peopleActive[i]);
            tips.set_visible(!this.data.peopleActive[i]);
            showOpen.set_visible(true);
            showClose.set_visible(false);
        }
    }
    itemEvent(id) {
        let index = id - 1;
        if (this.data.peopleActive[index]) {
            Data.choose(index);
            this.init1();
        } else {
            if (index == 1 || index == 2) {
                console.log("请打过更多关卡解锁")
            } else {
                switch (index) {
                    case 3:
                        this.coinLock(3, 288);
                        break;
                    case 4:
                        this.coinLock(4, 388);
                        break;
                    case 5:
                        this.coinLock(5, 488);
                        break;
                    case 6:
                        this.coinLock(6, 588);
                        break;
                    case 7:
                        this.coinLock(7, 688);
                        break;
                    case 8:
                        this.coinLock(8, 888);
                        break;
                }
            }
        }
    }
    coinLock(index, coin) {
        if (Data.readCoin() >= coin) {
            Data.AddCoin(-coin);
            Data.unlock(index);
            Data.choose(index);
            this.init1();
        } else {
            console.log("金币不足")
        }
    }
    videoEvent() {
        PlatformApi.showVideoAd(() => {
            Data.AddCoin(200)
            this.init1();
        })
    }
    // Unlock() {
    //     this.init1();
    // }
    backEvent() {
        this.close()
        Laya.Scene.open(SceneUrl.STARTMENU);
    }
}