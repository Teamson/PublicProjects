export default class SGRotate extends Laya.Script {
    constructor() {
        super()
    }
    myOwnwer: Laya.Sprite = null

    onAwake() {
        this.myOwnwer = this.owner as Laya.Sprite
    }

    onUpdate() {
        this.myOwnwer.rotation += 1
    }
}