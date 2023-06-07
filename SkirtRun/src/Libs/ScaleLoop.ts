export default class ScaleLoop extends Laya.Script {
    constructor() {
        super()
    }

    myOwnwer: any

    onAwake() {
        this.myOwnwer = this.owner
        this.scaleLoop(this.myOwnwer, 1.1, 400)
    }

    scaleLoop(node, rate, t) {
        var tw = Laya.Tween.to(node, { scaleX: rate, scaleY: rate }, t, null, new Laya.Handler(this, () => {
            Laya.Tween.to(node, { scaleX: 1, scaleY: 1 }, t, null, new Laya.Handler(this, () => {
                this.scaleLoop(node, rate, t)
            }))
        }))
    }
}