import { UIType } from "../Mod/Entity";

const { ccclass, property } = cc._decorator;

@ccclass
export default class UINode extends cc.Component {
    public static Share: UINode

    ccb: Function = null

    onLoad() {
        UINode.Share = this
    }
    start() {
        // [3]
    }

    showUI(type: UIType, closeOther: boolean = true, ccb?: Function) {
        this.ccb = ccb
        this.node.children.forEach(n => {
            if (n.name == type) {
                n.active = true
            } else {
                if (closeOther) n.active = false
            }
        })
    }

    closeUI(type: UIType) {
        this.node.getChildByName(type).active = false
        this.ccb && this.ccb()
        this.ccb = null
    }

    closeAllUI() {
        this.node.children.forEach(n => { n.active = false })
    }
}
