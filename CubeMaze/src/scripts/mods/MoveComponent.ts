
import Stage from "../Stage";
import StageController from "../stage/StageController";
import Data from "../tools/Data";
import Tools from "./Tools";

export default class MoveComponent extends Laya.Script3D {
    /**自身对象 */
    private _self: Laya.Sprite3D;

    /**记录点击原点 */
    private _originPosX: number;

    /**目标位置 */
    private _targetPos: Laya.Vector3;
    /**目标欧拉角 */
    // private _targetRot: Laya.Vector3;

    /**插值位置 */
    private _lerpPos: Laya.Vector3;
    /**插值欧拉角 */
    // private _lerpRot: Laya.Vector3;

    private _maxDis: number;

    /**速度系数 */
    private _speedFactor: number;

    private _maxPosX: number;
    // private _maxRotX: number;

    /**是否按下 */
    public isPressed: boolean;

    //**前进速度 */
    private forwardSpeed: number;
    onAwake() {
        this._self = this.owner as Laya.Sprite3D;
        this.init();
    }

    init() {
        this._targetPos = new Laya.Vector3;
        this._lerpPos = new Laya.Vector3;
        //速度系数
        this._speedFactor = 1;
        //可移动范围
        this._maxPosX = 2.7;
        // this._maxRotX = 10;
        this.forwardSpeed = 4.5;
        Tools.TouchOn(this.onMouseDownEvent, this.onMouseMoveEvent, this.onMouseUpEvent, this);
        Laya.timer.frameLoop(1, this, this.frameUpdateRolePos);
    }



    onMouseDownEvent(evt) {
        Laya.timer.clear(this, this.frameUpdateRolePos);
        Laya.timer.frameLoop(1, this, this.frameUpdateRolePos);
        this.isPressed = true;
        this._originPosX = evt.stageX;

    }

    onMouseUpEvent() {
        this.isPressed = false

    }

    onMouseMoveEvent(evt) {
        if (this.isPressed) {
            let posLimit = this._maxPosX;
            if (evt.stageX != this._originPosX) {
                let pos = this._self.transform.position.clone();
                let dis = evt.stageX - this._originPosX;
                // //特殊情况限制
                if ((dis > 0 && this._maxDis < 0) || (dis < 0 && this._maxDis > 0)) this._maxDis = 0;

                //
                if (Math.abs(dis) > Math.abs(this._maxDis)) {
                    dis = this._maxDis;
                }



                pos.x -= 0.04 * dis * this._speedFactor; //调整灵敏度，数字越大灵敏度越高
                // rot.z += dis / rotLimit;

                //边界限制
                if (pos.x > posLimit) pos.x = posLimit;
                else if (pos.x < -posLimit) pos.x = -posLimit;


                this._targetPos = pos;

                this._originPosX = evt.stageX;
            }
            else {

            }
        }
    }

    targetRot = 0;
    nowRot = 0;
    frameUpdateRolePos() {
        if (Stage.instance.isStart) {

            //左右横移
            this._targetPos.setValue(this._targetPos.x, this._self.transform.position.y, this._self.transform.position.z);
            Laya.Vector3.lerp(this._self.transform.position, this._targetPos, 0.2, this._lerpPos);




            //前进
            let pos = this._self.transform.position.clone();



            //碰撞更新
            Data.collider.ColliderUpdate();
        } else {

        }
    }
    onDestroy() {

        Laya.timer.clearAll(this);
        Tools.TouchOff(this.onMouseDownEvent, this.onMouseMoveEvent, this.onMouseUpEvent, this);
    }
}