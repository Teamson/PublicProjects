
const { ccclass, property } = cc._decorator;
@ccclass
export default class ScaleLoop1 extends cc.Component {

    time: number = 0.4
    @property
    rate: number = 1.1

    @property
    isAutoStart: boolean = true

    start() {
        if (this.isAutoStart) {
            this.startAni()
        }
    }

    stopAni() {
        cc.Tween.stopAllByTarget(this.node)
    }

    startAni() {
        cc.tween(this.node)
            .to(this.time, { scale: this.rate })
            .to(this.time, { scale: 1 })
            .union()
            .repeatForever()
            .start()
    }

    // update (deltaTime: number) {
    //     // [4]
    // }
}