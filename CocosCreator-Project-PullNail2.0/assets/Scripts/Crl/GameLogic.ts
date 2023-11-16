import { UIType } from "../Mod/Entity";
import PlayerDataMgr from "../Mod/PlayerDataMgr";
import SGAD from "../Mod/SGAD";
import SoundMgr from "../Mod/SoundMgr";
import GameUI from "../UI/GameUI";
import GameData from "./GameData";
import UINode from "./UINode";

const { ccclass, property } = cc._decorator;

@ccclass
export default class GameLogic extends cc.Component {

    public static _ins: GameLogic

    @property(cc.Node)
    LevelNode: cc.Node = null

    @property(cc.AnimationClip)
    nailUp: cc.AnimationClip = null
    @property(cc.AnimationClip)
    nailDown: cc.AnimationClip = null

    protected onLoad(): void {
        GameLogic._ins = this
        SoundMgr._ins.PlayMusic('Bgm')
    }

    gameStart(gameIndex: number = 1) {
        GameData.isStart = true
        GameData.isGameOver = false
        GameData.isWin = false
        GameData.gameTime = 181
        GameData.hadOpenHole = false

        GameData.hadGotAnswer = GameData.hadAnswerRevive || false

        let g = PlayerDataMgr.getPlayerData().grade
        let index = gameIndex
        GameData.gameIndex = gameIndex

        let name = 'Level' + g + '_' + index
        GameData.curGradeName = name

        for (let i = 0; i < this.LevelNode.children.length; i++) {
            this.LevelNode.children[i].active = false
        }
        this.LevelNode.getChildByName(name).active = true

        UINode.Share.showUI(UIType.UI_GAME)
    }

    gameOver(isWin: boolean) {
        if (GameData.isGameOver) {
            return
        }
        GameUI._ins.stopCalculateTime()

        if (isWin && GameData.gameIndex == 1) {
            UINode.Share.closeAllUI()
            this.scheduleOnce(() => {
                GameData.gameTime = 180
                this.gameStart(2)
            }, 1)
            return
        }

        GameData.isGameOver = true
        GameData.isWin = isWin
        GameData.isStart = false

        UINode.Share.closeAllUI()
        if (isWin) {
            SoundMgr._ins.PlaySound('Win')
            this.scheduleOnce(() => {
                UINode.Share.showUI(UIType.UI_WIN)
            }, 2)
        } else {
            SoundMgr._ins.PlaySound('Lose')
            UINode.Share.showUI(UIType.UI_LOSE)
        }
    }

    restart() {
        cc.director.loadScene('Game', () => {
            GameLogic._ins.gameStart(GameData.gameIndex)
        })
    }

    backToHome() {
        cc.director.loadScene('Game', () => {
            UINode.Share.showUI(UIType.UI_START)
        })
    }
}


