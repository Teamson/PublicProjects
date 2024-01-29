
import { _decorator, Component, Node, tween, v3, Vec3 } from 'cc';
const { ccclass, property } = _decorator;

@ccclass('ScaleLoop1')
export class ScaleLoop1 extends Component {

    time: number = 0.4
    @property
    rate: Vec3 = v3(1.2, 1.2, 1)

    start() {
        tween(this.node)
            .to(this.time, { scale: this.rate })
            .to(this.time, { scale: v3(1, 1, 1) })
            .union()
            .repeatForever()
            .start()
    }

    // update (deltaTime: number) {
    //     // [4]
    // }
}