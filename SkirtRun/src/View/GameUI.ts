import GameLogic from "../Crl/GameLogic"
import PlayerDataMgr from "../Libs/PlayerDataMgr"
import Utility from "../Mod/Utility"
import SGMgr from "../SGSDK/SGMgr"

export default class GameUI extends Laya.Scene {
    constructor() {
        super()
    }
    static Share: GameUI

    gradeNum: Laya.FontClip
    coinNum: Laya.FontClip
    guideAni: Laya.Animation
    touchBtn: Laya.Image

    touchStartPosX: number = 0

    onOpened() {
        GameUI.Share = this
        this.size(Laya.stage.displayWidth, Laya.stage.displayHeight)
        Laya.timer.frameLoop(1, this, this.myUpdate)
        this.gradeNum.value = PlayerDataMgr.getPlayerData().grade.toString()
        this.touchBtn.on(Laya.Event.MOUSE_DOWN, this, this.touchStart)
        this.touchBtn.on(Laya.Event.MOUSE_MOVE, this, this.touchMove)
        this.touchBtn.on(Laya.Event.MOUSE_UP, this, this.touchEnd)

        SGMgr.inGame()
    }
    onClosed() {
        Laya.timer.clearAll(this)
    }

    touchStart(evt: Laya.Event) {
        if (GameLogic.Share.isGameOver) return
        if (!GameLogic.Share.isStartGame) {
            this.guideAni.visible = false
            GameLogic.Share.gameStart()
        }
        let x = evt.stageX
        GameLogic.Share._playerCrl.touchX = x
        GameLogic.Share._playerCrl.resumeWalk()
    }
    touchMove(evt: Laya.Event) {
        if (GameLogic.Share.isGameOver) return
        let x = evt.stageX
        GameLogic.Share._playerCrl.touchX = x
    }
    touchEnd(evt: Laya.Event) {
        if (GameLogic.Share.isGameOver) return
        GameLogic.Share._playerCrl.stopWalk()
    }

    getDiamond(pos: Laya.Vector3) {
        let diamond: Laya.Image = new Laya.Image('startUI/ksy_zs_1.png')
        diamond.anchorX = 0.5
        diamond.anchorY = 0.5
        this.addChild(diamond)

        let op: Laya.Vector4 = new Laya.Vector4(0, 0, 0)
        GameLogic.Share._camera.viewport.project(pos, GameLogic.Share._camera.projectionViewMatrix, op)
        diamond.pos(op.x / Laya.stage.clientScaleX, op.y / Laya.stage.clientScaleY)

        let toPos: Laya.Point = new Laya.Point(-100, 0)
        this.coinNum.localToGlobal(toPos)
        Utility.tMove2D(diamond, toPos.x, toPos.y, 1000, () => {
            PlayerDataMgr.getPlayerData().coin += 5
            PlayerDataMgr.setPlayerData()
            diamond.destroy();
        })
    }

    myUpdate() {
        this.coinNum.value = PlayerDataMgr.getPlayerData().coin.toString()
    }
}
