import { _decorator, Component, Node, game } from 'cc';
const { ccclass, property } = _decorator;

@ccclass('SGNode')
export class SGNode extends Component {
    static Share: SGNode

    onLoad() {
        SGNode.Share = this
        game.addPersistRootNode(this.node)
        this.node.setSiblingIndex(999)
    }

    start() {

    }

    getUI(name: string): Node {
        return this.node.getChildByName('SGNode').getChildByName(name)
    }

    update(deltaTime: number) {

    }
}

