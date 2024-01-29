
import { _decorator, Component, Node, EventTouch, view, Intersection2D, Vec2, Graphics, v2, UITransform } from 'cc';
import { GameLogic } from '../Crl/GameLogic';
import { SoundMgr } from '../Mod/SoundMgr';
import Utility from '../Mod/Utility';
import SGMgr from '../../SGRes/src/SGMgr';
import SGAD from '../../SGRes/src/SGAD';
const { ccclass, property } = _decorator;

@ccclass('GameUI')
export class GameUI extends Component {

    static Share: GameUI

    touchNode: Node = null
    touchStartPos: Vec2 = v2()
    myGraphics: Graphics = null
    lineArr: Vec2[] = []
    canTouch: boolean = true
    hadTouch: boolean = false

    onLoad() {
        this.myGraphics = this.getComponent(Graphics)
        this.touchNode = this.node.getChildByName('touchNode')
        this.touchNode.on(Node.EventType.TOUCH_START, this.touchStart, this)
        this.touchNode.on(Node.EventType.TOUCH_MOVE, this.touchMove, this)
        this.touchNode.on(Node.EventType.TOUCH_END, this.touchEnd, this)
        this.touchNode.on(Node.EventType.TOUCH_CANCEL, this.touchEnd, this)
    }

    start() {
        GameUI.Share = this
        this.showLabelTips()
        // [3]
        SGMgr.inGame()
    }

    touchStart(event: EventTouch) {
        if (GameLogic.Share.isGameOver || !this.canTouch) return
        //if (!this.canTouch) return
        this.lineArr = []
        let pos = event.getUILocation()
        let playerPos = Utility.getWorldPos(GameLogic.Share.node.getChildByName('LevelNode').getChildByName('Level_' + (GameLogic.Share.curIndex + 1)).getChildByName('playerPos'))
        if (Vec2.distance(pos, v2(playerPos.x, playerPos.y)) <= 50) {
            this.touchStartPos = pos.clone()
            this.pushInLineArr(pos)
            this.myGraphics.clear()
            this.hadTouch = true
        }
    }
    touchMove(event: EventTouch) {
        if (GameLogic.Share.isGameOver || !this.canTouch || !this.hadTouch) return
        let pos = event.getUILocation()
        if (Vec2.distance(pos.clone(), this.touchStartPos) > 10 && !this.checkColl(this.touchStartPos, pos)) {
            this.pushInLineArr(pos.clone())
            this.drawLine()
            this.touchStartPos = pos.clone()
        }
    }
    touchEnd(event: EventTouch) {
        if (GameLogic.Share.isGameOver || !this.canTouch || this.lineArr.length < 5 || !this.hadTouch) return
        this.canTouch = false
        this.hadTouch = false
        GameLogic.Share.playerMove(this.lineArr, () => {
            this.myGraphics.clear()
            this.canTouch = true
        })
    }

    pushInLineArr(pos: Vec2) {
        pos.x -= view.getVisibleSize().width / 2
        pos.y -= view.getVisibleSize().height / 2
        this.lineArr.push(pos)
    }

    drawLine() {
        //if (this.lineArr.length < 2 || this.lineArr.length > 200) return
        this.myGraphics.clear()
        this.myGraphics.moveTo(this.lineArr[0].x, this.lineArr[0].y);
        for (let i = 0; i < this.lineArr.length; i++) {
            let p = this.lineArr[i]
            this.myGraphics.lineTo(p.x, p.y)
        }
        this.myGraphics.stroke();
    }

    checkColl(l1: Vec2, l2: Vec2) {
        let lvNode = GameLogic.Share.node.getChildByName('LevelNode').getChildByName('Level_' + (GameLogic.Share.curIndex + 1)).getChildByName('polyNode')
        for (let i = 0; i < lvNode.children.length; i++) {
            let p = lvNode.children[i]
            if (Intersection2D.lineRect(l1, l2, p.getComponent(UITransform).getBoundingBoxToWorld())) {
                return true
            }
        }
        return false
    }

    showLabelTips() {
        let tipSp = this.node.getChildByName('tipSp')
        let id = GameLogic.Share.curIndex
        let index = id
        if (id == 7) {
            index = 0
        } else if (id == 8) {
            index = 3
        } else if (id == 9) {
            index = 4
        }
        for (let i = 0; i < tipSp.children.length; i++) {
            tipSp.children[i].active = i == index
        }
    }

    tipsBtnCB() {
        SoundMgr.Share.PlaySound('click')
        let cb = () => {
            let tipNode = this.node.getChildByName('tipNode')
            tipNode.active = true
            for (let i = 0; i < tipNode.getChildByName('root').children.length; i++) {
                tipNode.getChildByName('root').children[i].active = i == GameLogic.Share.curIndex
            }
        }
        SGAD.showVideoAd(cb)
    }

    closeTipBtnCB() {
        SoundMgr.Share.PlaySound('click')
        let tipNode = this.node.getChildByName('tipNode')
        tipNode.active = false
    }

    skipBtnCB() {
        SoundMgr.Share.PlaySound('click')
        let cb = () => {
            GameLogic.Share.gameOver(true)
        }
        SGAD.showVideoAd(cb)
    }

    update(deltaTime: number) {
        // [4]
    }
}