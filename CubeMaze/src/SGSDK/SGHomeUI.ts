import SGConfig from "./SGConfig"
import SGMgr from "./SGMgr"
import SGUtils from "./SGUtils"

export default class SGHomeUI extends Laya.Scene {
    constructor() {
        super()
    }

    remenBtn: Laya.Image
    drawBtn: Laya.Image

    onOpened(param?: any) {
        this.size(Laya.stage.displayWidth, Laya.stage.displayHeight)
        SGUtils.addClickEvent(this.remenBtn, this, this.remenCB)
        SGUtils.addClickEvent(this.drawBtn, this, this.remenCB)
        this.remenBtn.visible = SGConfig.data.front_moreGame_switch && (SGConfig.homeMoreGameType == 1 || SGConfig.homeMoreGameType == 2)
        this.drawBtn.visible = SGConfig.data.front_moreGame_switch && (SGConfig.homeMoreGameType == 0 || SGConfig.homeMoreGameType == 2)
    }

    onClosed() {

    }

    remenCB() {
        SGMgr.moreGame()

    }
}