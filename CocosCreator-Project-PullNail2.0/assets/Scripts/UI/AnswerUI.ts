import UINode from "../Crl/UINode";
import { UIType } from "../Mod/Entity";
import PlayerDataMgr from "../Mod/PlayerDataMgr";
import SGAD from "../Mod/SGAD";
import SoundMgr from "../Mod/SoundMgr";
import Utility from "../Mod/Utility";
import GameUI from "./GameUI";

const { ccclass, property } = cc._decorator;

@ccclass
export default class AnswerUI extends cc.Component {

    @property(cc.Sprite)
    tipsPic: cc.Sprite = null

    protected onEnable(): void {
        Utility.zoomUI(this.node.getChildByName('root'))
        this.scheduleOnce(() => {
            GameUI._ins.stopCalculateTime()
        }, 0.5)

        this.tipsPic.spriteFrame = null
        let g = PlayerDataMgr.getPlayerData().grade
        let gStr = g.toString()
        if (g < 10) gStr = '0' + g.toString()
        cc.resources.load('Texture/AnswerPic/gqts_da_' + gStr, cc.SpriteFrame, (err, res) => {
            this.tipsPic.spriteFrame = res
        })

        SGAD.showBannerAd()
    }

    protected onDisable(): void {
        SGAD.hideBannerAd()
    }

    closeCB() {
        SoundMgr._ins.PlaySound('Click')
        Utility.zoomUI(this.node.getChildByName('root'), 0, () => {
            UINode.Share.closeUI(UIType.UI_ANSWER)
        })
    }
}
