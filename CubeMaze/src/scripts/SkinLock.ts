
import BaseUI from "./mods/BaseUI";
import PlayerData from "./mods/PlayerData";
import Tools from "./mods/Tools";
import StageController from "./stage/StageController";
import Data, { SceneUrl } from "./tools/Data";

export default class SkinLock extends BaseUI {
    axis: number;
    restartButton: Laya.Button
    videoBtn: Laya.Image;
    bar: Laya.ProgressBar;
    barValue: Laya.FontClip;
    goLock = false;
    3: Laya.Image;
    4: Laya.Image;
    5: Laya.Image;
    6: Laya.Image;
    7: Laya.Image;
    8: Laya.Image;

    isDone = true;

    init() {
        this.ButtonInit();

        this[3].set_visible(false);
        this[4].set_visible(false);
        this[5].set_visible(false);
        this[6].set_visible(false);
        this[7].set_visible(false);
        this[8].set_visible(false);
        let data = PlayerData.GetPlayerData();
        let actives = data.peopleActive;
        let index = 3;
        for (let i = 3; i < actives.length; i++) {
            if (actives[i] == false) {
                index = i;
                this[index].set_visible(true);
                this.isDone = false;
                break;
            }
        }
        if (this.isDone) {
            setTimeout(() => {
                this.restartGame();
            }, 100);
            return;
        }
        this.axis = Number(data.lockAxis.toFixed(2));
        data.lockAxis = Number((this.axis + 0.2).toFixed(2));
        PlayerData.SavePlayerData(data);
        this.updateBar(this.axis, data.lockAxis);
        if (data.lockAxis >= 1) {
            data.lockAxis = 0;
            PlayerData.SavePlayerData(data);
            Data.unlock(index)
            Data.choose(index)
            console.log("成功解锁皮肤")
            this.videoBtn.set_visible(false);
        }
    }
    barTimer;
    updateBar(firstAxis, toAxis) {
        clearInterval(this.barTimer);
        this.bar.value = firstAxis;
        if (toAxis >= 1) {
            toAxis = 1;
        }
        let top = toAxis - firstAxis;
        let count = top / 0.01;
        this.barValue.value = (100 * firstAxis).toString();
        Laya.Tween.to(this.bar, { value: toAxis }, 50 * count);
        let addAxis = 1;
        let nowCount = 0;
        this.barTimer = setInterval(() => {
            this.barValue.value = (100 * firstAxis + addAxis * (nowCount + 1)).toFixed(0);
            nowCount++;
            if (nowCount >= count) {
                clearInterval(this.barTimer);
            }
        }, 50)
    }
    videoEvent() {
        this.isDone = true;
        let data = PlayerData.GetPlayerData();
        let actives = data.peopleActive;
        let index = 3;
        this[3].set_visible(false);
        this[4].set_visible(false);
        this[5].set_visible(false);
        this[6].set_visible(false);
        this[7].set_visible(false);
        this[8].set_visible(false);
        for (let i = 3; i < actives.length; i++) {
            if (actives[i] == false) {
                index = i;
                this[index].set_visible(true);
                this.isDone = false;
                break;
            }
        }
        if (this.isDone) {
            setTimeout(() => {
                this.restartGame();
            }, 100);
            return;
        }
        this.axis = Number(data.lockAxis);
        data.lockAxis = this.axis + 0.2;
        PlayerData.SavePlayerData(data);
        this.updateBar(this.axis, data.lockAxis);
        if (data.lockAxis >= 1) {
            data.lockAxis = 0;
            PlayerData.SavePlayerData(data);
            Data.unlock(index)
            Data.choose(index)
            console.log("成功解锁")
        }
    }
    restartGame() {
        StageController.Init();
        Laya.Scene.open(SceneUrl.STARTMENU);
    }
    //按钮初始化
    ButtonInit() {
        Tools.buttonInit(this.restartButton, this, this.restartGame)
        Tools.imageButtonInit(this.videoBtn, this, this.videoEvent)
    }
    //抽屉
    DrawUI() {
    }
    //返回导出按钮
    BackUI() {
    }

}