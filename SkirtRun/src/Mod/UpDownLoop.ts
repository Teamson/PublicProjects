export default class UpDownLoop extends Laya.Script {
    constructor() {
        super()
    }

    myOwner: Laya.Image
    startY: number = 0

    onAwake(): void {
        this.myOwner = this.owner as Laya.Image
        this.startY = this.myOwner.y
        this.startTween()
    }

    startTween() {
        Laya.Tween.to(this.myOwner, { y: this.startY + 50 }, 1000, Laya.Ease.sineInOut, new Laya.Handler(this, () => {
            Laya.Tween.to(this.myOwner, { y: this.startY }, 1000, Laya.Ease.sineInOut, new Laya.Handler(this, () => {
                this.startTween()
            }))
        }))
    }
}