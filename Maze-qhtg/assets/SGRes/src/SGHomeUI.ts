
import { _decorator, Component, Node } from 'cc';
import SGConfig from './SGConfig';
import SGMgr from './SGMgr';
const { ccclass, property } = _decorator;

@ccclass('SGHomeUI')
export class SGHomeUI extends Component {
    @property(Node)
    remenBtn: Node = null
    @property(Node)
    drawBtn: Node = null

    start() {
        this.remenBtn.active = SGConfig.data.front_moreGame_switch && (SGConfig.homeMoreGameType == 1 || SGConfig.homeMoreGameType == 2)
        this.drawBtn.active = SGConfig.data.front_moreGame_switch && (SGConfig.homeMoreGameType == 0 || SGConfig.homeMoreGameType == 2)
    }

    remenCB() {
        SGMgr.moreGame()
    }

}