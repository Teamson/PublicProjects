import GameData from "../Crl/GameData";
import GameLogic from "../Crl/GameLogic";
import PlatformApi from "../Mod/PlatformApi";
import PlayerDataMgr from "../Mod/PlayerDataMgr";
import SGAD from "../Mod/SGAD";
import SoundMgr from "../Mod/SoundMgr";
import Utility from "../Mod/Utility";

const { ccclass, property } = cc._decorator;

@ccclass
export default class WinUI extends cc.Component {

    protected onEnable(): void {
        
        SGAD.showBannerAd()
    }

    protected onDisable(): void {
        
        SGAD.hideBannerAd()
    }
    start() {

        PlayerDataMgr.getPlayerData().coin += 200
        PlayerDataMgr.setPlayerData()
    }

    adCB() {
        SoundMgr._ins.PlaySound('Click')
        PlatformApi.showVideoAd(() => {
            PlayerDataMgr.getPlayerData().coin += 800
            PlayerDataMgr.setPlayerData()
            PlatformApi.showToast('恭喜获得1000金币')
            this.backCB()
        })
    }

    backCB() {
        SoundMgr._ins.PlaySound('Click')
        if (GameData.isWin) {
            PlayerDataMgr.getPlayerData().grade++
            PlayerDataMgr.getPlayerData().score++
            if (PlayerDataMgr.getPlayerData().grade > PlayerDataMgr.maxGrade)
                PlayerDataMgr.getPlayerData().grade = 1
            PlayerDataMgr.setPlayerData()
        }
        GameLogic._ins.backToHome()
    }

}
