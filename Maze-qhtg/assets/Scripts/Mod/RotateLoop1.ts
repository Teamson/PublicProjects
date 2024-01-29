
import { _decorator, Component, Node, tween, v3, Vec3 } from 'cc';
const { ccclass, property } = _decorator;

@ccclass('RotateLoop1')
export class RotateLoop1 extends Component {

    @property
    time: number = 3

    start() {
        tween(this.node)
            .by(this.time, { angle: 360 })
            .repeatForever()
            .start()
    }

    // update (deltaTime: number) {
    //     // [4]
    // }
}