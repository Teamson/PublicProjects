import { UIType } from "../Mod/Entity";
import PlatformApi from "../Mod/PlatformApi";
import GameUI from "../UI/GameUI";
import GameData from "./GameData";
import GameLogic from "./GameLogic";
import Hole from "./Hole";
import Nail from "./Nail";
import UINode from "./UINode";
import Wood from "./Wood";

const { ccclass, property } = cc._decorator;

@ccclass
export default class LevelCrl extends cc.Component {
    HoleNode: cc.Node = null
    WoodNode: cc.Node = null
    NailNode: cc.Node = null

    preHole: cc.Node = null
    upingNail: cc.Node = null

    fingerNode: cc.Node = null

    protected onLoad(): void {
        this.HoleNode = this.node.getChildByName('HoleNode')
        this.WoodNode = this.node.getChildByName('WoodNode')
        this.NailNode = this.node.getChildByName('NailNode')
        this.fingerNode = this.node.getChildByName('Finger')
        if (this.fingerNode) {
            this.fingerNode.y = -114
        }
    }

    protected start(): void {
        for (let i = 0; i < this.HoleNode.children.length; i++) {
            let hole = this.HoleNode.children[i]
            let holeCrl = hole.addComponent(Hole)
            hole.on(cc.Node.EventType.TOUCH_START, this.onClickHole, this)
        }

        for (let i = 0; i < this.NailNode.children.length; i++) {
            let nail = this.NailNode.children[i]
            let nailCrl = nail.addComponent(Nail)
            nail.on(cc.Node.EventType.TOUCH_START, this.onClickNail, this)
            let nailAni = nail.addComponent(cc.Animation)
            nailAni.addClip(GameLogic._ins.nailUp)
            nailAni.addClip(GameLogic._ins.nailDown)
            nailAni.play('NailDown')
        }

        for (let i = 0; i < this.WoodNode.children.length; i++) {
            let wood = this.WoodNode.children[i]
            let woodCrl = wood.addComponent(Wood)
        }

        this.checkHoleWithNail()
        this.checkNailHingleJoint()

    }

    onClickNail(evt: cc.Event) {
        PlatformApi.DoVibrate()
        GameUI._ins.stopScaleAnswer()

        let nail: cc.Node = evt.target
        for (let i = 0; i < this.NailNode.children.length; i++) {
            this.NailNode.children[i].zIndex = 0
        }
        nail.zIndex = 999
        if (this.upingNail && this.upingNail != nail) {
            this.upingNail.getComponent(Nail).downCB()
        }
        let nailCrl = nail.getComponent(Nail)
        if (nailCrl.isDown) {
            nailCrl.upCB()
            this.upingNail = nail
            this.preHole = this.getHoleByNail(nail)
        } else {
            nailCrl.downCB()
            this.upingNail = null
            this.preHole = null
        }

        if (this.fingerNode) {
            this.fingerNode.y = 255
        }
    }

    onClickHole(evt: cc.Event) {
        GameUI._ins.stopScaleAnswer()

        if (this.fingerNode) {
            this.fingerNode.active = false
        }
        let curHole = evt.target
        if (curHole.getChildByName('lock')) {
            UINode.Share.showUI(UIType.UI_OPENHOLE, false, () => {
                GameData.hadOpenHole = true
                curHole.getChildByName('lock').destroy()
            })
            return
        }
        if (!this.upingNail) return
        if (!this.isHoleCanPutNail(curHole)) {
            return
        }
        PlatformApi.DoVibrate()
        this.upingNail.getComponents(cc.RevoluteJoint).forEach((rj) => {
            rj.destroy()
        })
        let nailCrl = this.upingNail.getComponent(Nail)
        nailCrl.circleCollider.sensor = true
        nailCrl.circleCollider.apply()
        this.preHole.getComponent(Hole).haveNail = false
        curHole.getComponent(Hole).haveNail = true

        this.upingNail.position = curHole.position
        nailCrl.downCB()
        this.upingNail = null
        this.preHole = null
        this.checkNailHingleJoint()
        nailCrl.circleCollider.sensor = false
        this.scheduleOnce(() => {
            nailCrl.circleCollider.apply()
        })
    }

    getHoleByNail(nail: cc.Node) {
        for (let i = 0; i < this.HoleNode.children.length; i++) {
            let hole = this.HoleNode.children[i]
            if (cc.Vec3.distance(hole.position, nail.position) <= 32) {
                return hole
            }
        }
        return null
    }

    isHoleCanPutNail(hole: cc.Node) {
        if (this.isHoleWithNail(hole)) {
            return false
        }
        let holeWpos = hole.convertToWorldSpaceAR(cc.v2())
        for (let i = 0; i < this.WoodNode.children.length; i++) {
            let wood = this.WoodNode.children[i]
            let points = wood.getComponent(cc.PhysicsPolygonCollider).points
            let ps = []
            for (let k = 0; k < points.length; k++) {
                ps.push(wood.convertToWorldSpaceAR(cc.v2(points[k].x, points[k].y)))
            }
            if (cc.Intersection.polygonCircle(ps, { position: holeWpos, radius: 30 })) {
                let haveHole = false
                for (let j = 0; j < wood.children.length; j++) {
                    let woodHole = wood.children[j]
                    if (cc.Vec2.distance(woodHole.convertToWorldSpaceAR(cc.v2()), holeWpos) <= 5) {
                        haveHole = true
                        break
                    }
                }
                if (!haveHole) return false
            }
        }
        return true
    }

    isHoleWithNail(hole: cc.Node) {
        for (let j = 0; j < this.NailNode.children.length; j++) {
            if (cc.Vec3.distance(hole.position, this.NailNode.children[j].position) <= 32) {
                return true
            }
        }
        return false
    }

    checkHoleWithNail() {
        //检查所有洞有没有钉子
        for (let i = 0; i < this.HoleNode.children.length; i++) {
            let hole = this.HoleNode.children[i]
            hole.getComponent(Hole).haveNail = false
            for (let j = 0; j < this.NailNode.children.length; j++) {
                if (cc.Vec3.distance(hole.position, this.NailNode.children[j].position) <= 32) {
                    hole.getComponent(Hole).haveNail = true
                    break
                }
            }
        }
    }

    checkNailHingleJoint() {
        //处理木块的关节点
        for (let i = 0; i < this.NailNode.children.length; i++) {
            let nail = this.NailNode.children[i]
            let p1 = nail.convertToWorldSpaceAR(cc.v2())
            let woodHoleArr = []
            for (let j = 0; j < this.WoodNode.children.length; j++) {
                let wood = this.WoodNode.children[j]
                wood.children.forEach(h => {
                    let p2 = h.convertToWorldSpaceAR(cc.v2())
                    if (cc.Vec2.distance(p1, p2) <= 10) {
                        woodHoleArr.push(h)
                    }
                });
            }
            nail.getComponent(Nail).checkConnect(woodHoleArr)
        }
    }

    destroyHoleLock() {
        for (let i = 0; i < this.HoleNode.children.length; i++) {
            let hole = this.HoleNode.children[i]
            if (hole.children.length > 0) {
                hole.destroyAllChildren()
                return
            }
        }
    }

    update(deltaTime: number) {
        if (GameData.isGameOver) return
        if (this.WoodNode.children.length <= 0) {
            GameLogic._ins.gameOver(true)
            //this.destroy()
        }
    }
}


