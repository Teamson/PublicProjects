import PlayerDataMgr from "../Mod/PlayerDataMgr";
import SoundMgr from "../Mod/SoundMgr";

const { ccclass, property } = cc._decorator;

@ccclass
export default class Nail extends cc.Component {

    circleCollider: cc.PhysicsCircleCollider = null

    downSp: cc.Node = null
    upSp: cc.Node = null

    isDown: boolean = true

    protected onLoad(): void {
        this.downSp = this.node.getChildByName('down')
        this.upSp = this.node.getChildByName('up')
        this.circleCollider = this.getComponent(cc.PhysicsCircleCollider)
        this.circleCollider.sensor = false
        this.circleCollider.apply()

        let skinId = PlayerDataMgr.getPlayerData().skinId
        cc.resources.load('Texture/GameUI/yxz_dz' + (skinId + 1) + '_1', cc.SpriteFrame, (err, res) => {
            this.downSp.getComponent(cc.Sprite).spriteFrame = res
        })
        cc.resources.load('Texture/GameUI/yxz_dz' + (skinId + 1) + '_2', cc.SpriteFrame, (err, res) => {
            this.upSp.getComponent(cc.Sprite).spriteFrame = res
        })
    }

    upCB() {
        SoundMgr._ins.PlaySound('Up')
        this.isDown = false
        this.downSp.active = false
        this.upSp.active = true
        this.getComponent(cc.Animation).play('NailUp')
    }

    downCB() {
        SoundMgr._ins.PlaySound('Up')
        this.isDown = true
        this.downSp.active = true
        this.upSp.active = false
        this.getComponent(cc.Animation).play('NailDown')
    }

    checkInWood(woodArr: cc.Node[]) {
        for (let i = 0; i < woodArr.length; i++) {
            let wood = woodArr[i]
            if (wood.getBoundingBoxToWorld().contains(this.node.convertToWorldSpaceAR(cc.v2()))) {
                return true
            }
        }
    }

    checkConnect(woodHoleArr: cc.Node[]) {
        let hingleJointArr = this.getComponents(cc.RevoluteJoint)
        for (let i = hingleJointArr.length - 1; i >= 0; i--)hingleJointArr[i].destroy()
        if (woodHoleArr.length <= 0) return

        for (let i = 0; i < woodHoleArr.length; i++) {
            let woodHole = woodHoleArr[i]
            let wood = woodHole.parent
            let hj = this.addComponent(cc.RevoluteJoint)
            hj.connectedBody = wood.getComponent(cc.RigidBody)
            hj.connectedAnchor = cc.v2(woodHole.position.x, woodHole.position.y)
            hj.collideConnected = false
            hj.apply()
            this.circleCollider.apply()
        }
    }
}

