import Stage from "../Stage";
import Tools from "./Tools";

export default class TouchWayCheck extends Laya.Script {


    onAwake() {
        this.init();
    }
    init() {
        Laya.timer.frameLoop(1, this, this.update);
    }
    update() {
    }
    startPos;
    nowPos;
    touchTimer;
    isDown;
    calls = [];
    onMouseDown(e) {
        if (this.touchTimer) {
            clearTimeout(this.touchTimer);
        }
        this.isDown = true
        this.startPos = new Laya.Vector2(e.stageX, e.stageY);
        this.nowPos = this.startPos;
        this.touchTimer = setTimeout(() => {
            this.isDown = false;
        }, 1000);
    }
    onMouseMove(e) {
        if (this.isDown) {
            this.nowPos = new Laya.Vector2(e.stageX, e.stageY);
            this.WayCheck();
        }
    }
    onMouseUp(e) {
        this.isDown = false;
    }
    WayCheck() {
        let dir = Tools.Vector2Reduce(this.nowPos, this.startPos);
        let scale = Tools.Vector2Scale(dir);
        if (scale > 10) {
            let angle = Math.atan2(dir.y, dir.x) / Math.PI * 180;
            let call = "none"
            if (angle > -135 && angle < -45) {
                call = "up"
            } else if (angle > -45 && angle < 45) {
                call = "right"
            } else if (angle < 135 && angle > 45) {
                call = "down"
            } else if (angle < -135 || angle > 135) {
                call = "left"
            }
            if (call != "none") {
                if (this.calls.length < 2) {
                    this.calls.push(call);
                } else {
                    if (Stage.instance.isCalling) {
                        this.calls[1] = call;
                    } else {
                        this.calls[1] = this.calls[0]
                        this.calls[0] = call;
                    }
                }
                Stage.instance.callUpdate();
                // console.log(this.calls,this.calls[this.calls.length-1]);
            }
            this.isDown = false
        }
        this.startPos = this.nowPos;
    }
    onDestroy() {
        if (this.touchTimer) {
            clearTimeout(this.touchTimer);
        }
    }
}