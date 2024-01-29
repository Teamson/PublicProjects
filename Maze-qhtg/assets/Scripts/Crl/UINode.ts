
import { _decorator, Component, Node } from 'cc';
import { UIType } from '../Mod/Entity';
const { ccclass, property } = _decorator;

@ccclass('UINode')
export class UINode extends Component {

    public static Share: UINode

    onLoad() {
        UINode.Share = this
    }
    start() {
        // [3]
    }

    showUI(type: UIType) {
        this.node.children.forEach(n => { n.active = n.name == type })
    }

    closeUI(type: UIType) {
        this.node.getChildByName(type).active = false
    }

    closeAllUI() {
        this.node.children.forEach(n => { n.active = false })
    }

    // update (deltaTime: number) {
    //     // [4]
    // }
}
