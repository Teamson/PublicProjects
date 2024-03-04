export default class BreathUI extends Laya.Script {


    tween: Laya.Tween;
    onEnable(): void {
        let cb1 = () => {
            this.tween = Laya.Tween.to(this.owner, { scaleX: 1.1, scaleY: 1.1 }, 250, null, Laya.Handler.create(this, cb2))
        }
        let cb2 = () => {
            this.tween = Laya.Tween.to(this.owner, { scaleX: 0.9, scaleY: 0.9 }, 500, null, Laya.Handler.create(this, cb3));
        }
        let cb3 = () => {
            this.tween = Laya.Tween.to(this.owner, { scaleX: 1, scaleY: 1 }, 250, null, Laya.Handler.create(this, cb1))
        }
        cb1();
    }

    onDisable(): void {
        this.tween.clear();
    }
}