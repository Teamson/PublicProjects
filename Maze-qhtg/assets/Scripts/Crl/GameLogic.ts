import { _decorator, Component, Node, Vec2, Vec3, v3, tween, UITransform, view, Tween } from 'cc';
import { UIType } from '../Mod/Entity';
import PlayerDataMgr from '../Mod/PlayerDataMgr';
import { SoundMgr } from '../Mod/SoundMgr';
import { UINode } from './UINode';
import SGMgr from '../../SGRes/src/SGMgr';
import SGConfig from '../../SGRes/src/SGConfig';
const { ccclass, property } = _decorator;

@ccclass('GameLogic')
export class GameLogic extends Component {
    public static Share: GameLogic

    leveNode: Node = null

    curIndex: number = 0
    playerBasePos: Vec3 = v3()

    isStart: boolean = false
    isWin: boolean = false
    isPause: boolean = false
    isGameOver: boolean = false

    onLoad() {
        GameLogic.Share = this
        this.leveNode = this.node.getChildByName('LevelNode')
    }

    start() {
        if (!SGConfig.isVersionValid) {
            this.node.getChildByName('bg').active = false
            this.node.getChildByName('bg1').active = true
        }
    }

    gameStart() {
        this.curIndex = Math.floor((PlayerDataMgr.getPlayerData().grade - 1) % 10)
        if (!SGConfig.isVersionValid && this.curIndex == 0) {
            this.curIndex = 3
        }
        if (!SGConfig.isVersionValid && this.curIndex == 1) {
            this.curIndex = 4
        }
        this.leveNode.children[this.curIndex].active = true
        this.playerBasePos = this.leveNode.children[this.curIndex].getChildByName('playerPos').position.clone()
        if (this.curIndex == 0) {
            this.leveNode.children[this.curIndex].getChildByName('guide').active = true
            this.scheduleOnce(() => {
                this.leveNode.children[this.curIndex].getChildByName('guide').active = false
            }, 2.5)
        }
    }

    playerMove(pArr: Vec2[], resetCB: Function) {
        let lv = this.leveNode.children[this.curIndex]
        let playerPos = lv.getChildByName('playerPos')
        let propPos = lv.getChildByName('propPos')
        let endPos = lv.getChildByName('endPos')

        let finishCB = (isDes) => {
            if (isDes) {
                SoundMgr.Share.PlaySound('correct')
                switch (this.curIndex) {
                    case 0:
                        SoundMgr.Share.PlaySound('water')
                        break
                    case 1:
                        SoundMgr.Share.PlaySound('pig')
                        break
                    case 2:
                        SoundMgr.Share.PlaySound('girl')
                        break
                    case 3:
                        SoundMgr.Share.PlaySound('child')
                        break
                    case 4:
                        SoundMgr.Share.PlaySound('phone')
                        break
                    case 5:
                        SoundMgr.Share.PlaySound('cat')
                        break
                    case 6:
                        SoundMgr.Share.PlaySound('catch')
                        break
                    case 7:
                        SoundMgr.Share.PlaySound('water')
                        break
                    case 8:
                        SoundMgr.Share.PlaySound('child')
                        break
                    case 9:
                        SoundMgr.Share.PlaySound('phone')
                        break
                }
                this.gameOver(true)
            } else {
                SoundMgr.Share.PlaySound('wrong')
                let xx = lv.getChildByName('xx')
                xx.active = true
                xx.setPosition(playerPos.position)
                this.scheduleOnce(() => {
                    xx.active = false
                    playerPos.setPosition(this.playerBasePos)
                    if (propPos) propPos.active = true
                    resetCB()
                }, 1)
            }
        }

        //检测捡道具
        let checkCollProp = () => {
            if (propPos) {
                if (Vec3.distance(playerPos.position, propPos.position) <= 20) {
                    SoundMgr.Share.PlaySound('no')
                    propPos.active = false
                    this.unschedule(checkCollProp)
                }
            } else
                this.unschedule(checkCollProp)
        }
        this.schedule(checkCollProp)

        //检测到终点
        let checkEnd = () => {
            if (Vec3.distance(playerPos.position, endPos.position) <= 40) {
                Tween.stopAllByTarget(playerPos)
                endPos.active = false
                if (playerPos.getChildByName('sp2')) {
                    playerPos.getChildByName('sp1').active = false
                    playerPos.getChildByName('sp2').active = true
                }
                this.unschedule(checkEnd)
                finishCB(true)
            }
        }
        this.schedule(checkEnd)

        let index: number = 0
        let cb = () => {
            let desPos = v3(pArr[index].x, pArr[index].y, 0)
            desPos = lv.getComponent(UITransform).convertToNodeSpaceAR(v3(pArr[index].x, pArr[index].y, 0))
            desPos.x += view.getVisibleSize().width / 2
            desPos.y += view.getVisibleSize().height / 2
            tween(playerPos).to(0.03, { position: desPos }).call(() => {
                index++
                if (index >= pArr.length) {
                    this.unschedule(checkCollProp)
                    this.unschedule(checkEnd)
                    finishCB(false)
                } else {
                    cb()
                }
            }).start()
        }
        cb()
    }

    gameOver(isWin: boolean) {
        if (this.isGameOver) return

        if (isWin) this.node.getChildByName('tick').active = true
        this.isWin = isWin
        this.isStart = false
        this.isGameOver = true
        this.isPause = true

        UINode.Share.closeUI(UIType.UI_GAME)
        this.scheduleOnce(() => {
            this.showFinishUI()
        }, 1)
    }

    showFinishUI() {
        SGMgr.gameOver(()=>{
            UINode.Share.showUI(UIType.UI_FINISH)
        })
    }

    update(deltaTime: number) {

    }
}

