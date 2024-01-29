import { _decorator, Component, Node, Label } from 'cc';
import PlayerDataMgr from '../Mod/PlayerDataMgr';
const { ccclass, property } = _decorator;

@ccclass('UpdateCoin')
export class UpdateCoin extends Component {
    start() {

    }

    update(deltaTime: number) {
        this.node.getComponent(Label).string = PlayerDataMgr.getPlayerData().coin.toString()
    }
}

