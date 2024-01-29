
import { _decorator, Component, Node, tween, v3, easing } from 'cc';
const { ccclass, property } = _decorator;

@ccclass('UpDownLoop')
export class UpDownLoop extends Component {

    @property
    rate: number = 30
    @property
    time: number = 1

    start() {
        // [3]

        tween(this.node)
            .by(this.time, { position: v3(0, -this.rate, 0) }, { easing: "smooth" })
            .by(this.time, { position: v3(0, this.rate, 0) }, { easing: "smooth" })
            .union()
            .repeatForever()
            .start()
    }

    // update (deltaTime: number) {
    //     // [4]
    // }
}