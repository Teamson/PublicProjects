export default class SGScale extends Laya.Script {
    constructor() {
        super()
    }

    myOwnwer: any
    myScale: Laya.Vector2 = null

    onAwake() {
        this.myOwnwer = this.owner
        this.myScale = new Laya.Vector2(this.myOwnwer.scaleX, this.myOwnwer.scaleY)
        this.scaleLoop(this.myOwnwer, 0.1, 400)
    }

    scaleLoop(node, rate, t) {
        var tw = Laya.Tween.to(node, { scaleX: this.myScale.x + rate, scaleY: this.myScale.y + rate }, t, null, new Laya.Handler(this, () => {
            Laya.Tween.to(node, { scaleX: this.myScale.x, scaleY: this.myScale.y }, t, null, new Laya.Handler(this, () => {
                this.scaleLoop(node, rate, t)
            }))
        }))
    }
}