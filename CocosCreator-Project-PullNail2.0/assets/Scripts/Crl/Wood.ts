import Hole from "./Hole";

const { ccclass, property } = cc._decorator;

@ccclass
export default class Wood extends cc.Component {
    body: cc.RigidBody = null
    polygonColider: cc.PhysicsPolygonCollider = null
    hingleJointArr: cc.RevoluteJoint[] = []

    protected onLoad(): void {
        this.body = this.getComponent(cc.RigidBody)
        this.polygonColider = this.getComponent(cc.PhysicsPolygonCollider)
        this.hingleJointArr = this.getComponents(cc.RevoluteJoint)
    }

    dealWithConnect(hole: cc.Node) {
        for (let i = 0; i < this.hingleJointArr.length; i++) {
            let hingleJoint = this.hingleJointArr[i]
            let hinglePos = cc.v3(this.node.position.x + hingleJoint.anchor.x, this.node.position.y + hingleJoint.anchor.y)
            if (cc.Vec3.distance(hole.position, hinglePos) <= 32) {
                if (hole.getComponent(Hole).haveNail) {
                    //有钉子
                    if (!hingleJoint.connectedBody) {
                        hingleJoint.connectedBody = hole.getComponent(cc.RigidBody)
                        hingleJoint.enabled = true
                    }
                } else {
                    //没有钉子
                    hingleJoint.connectedBody = null
                    hingleJoint.enabled = false
                }
            }
        }
    }

    protected update(dt: number): void {
        if (this.node.convertToWorldSpaceAR(cc.v2()).y <= -1000) {
            this.node.destroy()
        }
    }
}


