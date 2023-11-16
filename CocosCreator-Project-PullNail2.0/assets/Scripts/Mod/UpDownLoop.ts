
const { ccclass, property } = cc._decorator;
@ccclass
export default class UpDownLoop extends cc.Component {

    @property
    rate: number = 30
    @property
    time: number = 1

    start() {
        // [3]

        cc.tween(this.node)
            .by(this.time, { position: cc.v3(0, -this.rate, 0) }, { easing: "smooth" })
            .by(this.time, { position: cc.v3(0, this.rate, 0) }, { easing: "smooth" })
            .union()
            .repeatForever()
            .start()
    }

    // update (deltaTime: number) {
    //     // [4]
    // }
}