import BaseUI from "./mods/BaseUI";
import Data, { SceneUrl } from "./tools/Data";
import Tools from "./mods/Tools";
import StageController from "./stage/StageController";
import PlayerData from "./mods/PlayerData";
import SGMgr from "../SGSDK/SGMgr";

export default class EndMenu extends BaseUI {

    restartButton: Laya.Button;
    videoButton: Laya.Button
    coinValue: Laya.FontClip;
    nowCoinValue: Laya.FontClip;
    gradeValue: Laya.FontClip;
    combeAxis: Laya.FontClip;
    scrollList: Laya.Box;
    init() {
        Data.nowScene = 3;
        Tools.buttonInit(this.restartButton, this, this.restartGame)
        Tools.buttonInit(this.videoButton, this, this.videoAward);
        let data = PlayerData.GetPlayerData();
        this.nowCoinValue.value = Data.endCoin.toFixed(0)
        this.gradeValue.value = data.grade.toString();
        this.combeAxis.value = Data.endAxis.toFixed(1) + "*";
        Data.AddCoin(Data.endCoin);
        this.coinValue.value = Data.readCoin().toString();
        SGMgr.inFinish()
    }
    restartGame() {
        Data.AddGrade();
        this.close()
        SGMgr.backToHome(()=>{
            StageController.Init();
            Laya.Scene.open(SceneUrl.STARTMENU);
        })
    }
    videoAward() {
        Data.AddCoin(Data.endCoin);
        this.coinValue.value = Data.readCoin().toString();
        this.nowCoinValue.value = (Data.endCoin * 2).toFixed(0);
        this.combeAxis.value = (Data.endAxis * 2).toFixed(1) + "*";
        this.videoButton.set_visible(false);
    }
}