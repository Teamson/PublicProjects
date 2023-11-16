import PlayerDataMgr from "../Mod/PlayerDataMgr";

const { ccclass, property } = cc._decorator;

@ccclass
export default class UpdateCoin extends cc.Component {

    str: cc.Label = null

    protected onLoad(): void {
        this.str = this.getComponent(cc.Label)
    }

    update(dt) {
        this.str.string = PlayerDataMgr.getPlayerData().coin.toString()
    }
}
