
import { _decorator, Component, Node, v3, tween, director } from 'cc';
import { GameLogic } from '../Crl/GameLogic';
import PlayerDataMgr from '../Mod/PlayerDataMgr';
import { SoundMgr } from '../Mod/SoundMgr';
import SGAD from '../../SGRes/src/SGAD';
import SGMgr from '../../SGRes/src/SGMgr';
const { ccclass, property } = _decorator;

@ccclass('FinishUI')
export class FinishUI extends Component {

    @property(Node)
    nextBtn: Node = null

    start() {
        // [3]
        this.nextBtn.active = GameLogic.Share.isWin

        if (GameLogic.Share.isWin) {
            PlayerDataMgr.getPlayerData().coin += 200
            PlayerDataMgr.setPlayerData()
        }
        SGMgr.inFinish()
    }

    adBtnCB() {
        SoundMgr.Share.PlaySound('click')
        let cb = () => {
            PlayerDataMgr.getPlayerData().coin += 800
            PlayerDataMgr.setPlayerData()
            this.nextBtnCB()
        }
        SGAD.showVideoAd(cb)
    }

    nextBtnCB() {
        SoundMgr.Share.PlaySound('click')
        SGMgr.backToHome(()=>{
            if (GameLogic.Share.isWin) {
                PlayerDataMgr.changeGrade(1)
            }
            director.loadScene('Game')
        })
    }

    // update (deltaTime: number) {
    //     // [4]
    // }
}