import Context from "../Context";
import EventType from "../utils/EventType";
// import ModelCreator from "../plugins/ModelCreator";
import MyVector3 from "../plugins/MyVector3";

/**
 * 游戏控制类
 */
export default class GameManager {
    private _isPlay: boolean;
    private _isOver: boolean;
    private _isPause: boolean;
    private _isPressed: boolean;

    // modelCreator: ModelCreator;

    constructor() {
        this._isPlay = false;
        this._isOver = false;
        this._isPause = false;
        this._isPressed = false;

        Laya.stage.on(Laya.Event.MOUSE_DOWN, this, this.onMouseDownClick);
        Laya.stage.on(Laya.Event.MOUSE_UP, this, this.onMouseUpClick);
        Laya.stage.on(Laya.Event.MOUSE_MOVE, this, this.onMouseMoveClick);

        // this.modelCreator = new ModelCreator();
    }

    /**是否按下 */
    get isPressed(): boolean {
        return this._isPressed;
    }
    set isPressed(value: boolean) {
        this._isPressed = value;
    }

    /**游戏开始 */
    get isPlay(): boolean {
        return this._isPlay;
    }
    set isPlay(value: boolean) {
        this._isPlay = value;
    }

    /**游戏结束 */
    get isOver(): boolean {
        return this._isOver;
    }
    set isOver(value: boolean) {
        this._isOver = value;
    }

    /**游戏暂停 */
    get isPause(): boolean {
        return this._isPause;
    }
    set isPause(value: boolean) {
        this._isPause = value;
        Laya.timer.scale = value ? 0 : 1;
    }

    /**游戏时间缩放 */
    set gameScale(scale) {
        Laya.timer.scale = scale;
    }

    onMouseDownClick(evt) {
        // if(!this.isPlay || this.isOver) return;
        Context.Event.event(EventType.MOUSE_EVENT, { type: "down", evt: evt });
    }

    onMouseUpClick(evt) {
        // if(!this.isPlay || this.isOver) return;
        Context.Event.event(EventType.MOUSE_EVENT, { type: "up", evt: evt });
    }

    onMouseMoveClick(evt) {
        // if(!this.isPlay || this.isOver) return;
        Context.Event.event(EventType.MOUSE_EVENT, { type: "move", evt: evt });
    }

    // getCoinPoints(pointA, pointB, shotSpeed = 16, throwTime = 1.8, g = -10, amount = 30) {
    //     var points = [];

    //     var dTime = 0;
    //     var targetY = pointA.y;
    //     var gravity = new Laya.Vector3;

    //     var speed = new Laya.Vector3(-(pointB.x - pointA.x) / throwTime,
    //         (pointB.y - pointA.y) / throwTime - 0.5 * g * throwTime,
    //         (pointB.z - pointA.z) / throwTime);

    //     var posTmp = pointA;

    //     // var i = 0;
    //     while (posTmp.y >= targetY) { // || gravity.y >= shotSpeed
    //         gravity.y = g * (dTime += 0.02);

    //         let pos = new Laya.Vector3();
    //         Laya.Vector3.add(speed, gravity, pos);
    //         Laya.Vector3.scale(pos, 0.02, pos);

    //         Laya.Vector3.add(posTmp, pos, pos);
    //         posTmp = pos;

    //         points.push(pos);

    //         // console.log("coinPos: ", gravity.y, pos);

    //         // i++;
    //         // if (i > 10) {
    //         //     i = 0;
    //         //     this.modelCreator.createCoinCurve(pos);
    //         // }
    //     }

    //     this.showCoin(points, amount);
    //     return points;
    // }

    // showCoin(points, amount) {
    //     // var dis = Math.floor(points.length / amount);
    //     var dis = 6;
    //     var count = 0;
    //     var offsetX = Math.random() * 200 - 100;

    //     for (var i = Math.floor(points.length / 4); i < points.length; i++) {
    //         if(count == amount) continue;

    //         if (i % dis == 0) {
    //             var point = points[i];
                
    //             point.x = this.getThrowX(offsetX, 0, 0, (point.y - points[0].y) / 500);
    //             this.modelCreator.createCoinCurve(points[i]);
    //             count++;
    //         }
    //     }
    // }

    getThrowX(a,b,c,X){
        return a * Math.pow(X, 2) + b * X + c;
    }
}