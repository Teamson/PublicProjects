export default class TweenManager {
    /**
     * 缩放动画
     * @param target 缩放目标
     * @param scaleStart 初始值
     * @param scaleEnd 结束值
     * @param duration 动画时长-毫秒
     * @param isReset 是否自动复原
     * @param isLoop 是否循环
     * @param ease 缓动类型
     */
    toScale(target: Laya.Sprite, scaleStart: number, scaleEnd: number, duration: number, isReset: boolean, isLoop: boolean = false, ease: Function = null) {
        if (!target) return;

        var handler = null;
        target.scale(scaleStart, scaleStart);
        scale1();

        function scale1() {
            handler = isLoop || isReset ? new Laya.Handler(this, scale2) : null;
            Laya.Tween.to(target, { scaleX: scaleEnd, scaleY: scaleEnd }, duration, ease, handler);
        }

        function scale2() {
            handler = isLoop ? new Laya.Handler(this, scale1) : null;
            Laya.Tween.to(target, { scaleX: scaleStart, scaleY: scaleStart }, duration, ease, handler);
        }
    }

    /**
     * 渐变动画，渐变到目标值
     * @param {object} target 
     * @param {number} alpha 
     * @param {number} duration 
     * @param {boolean} isLoop 
     */
    toAlpha(target: Laya.Sprite, alphaStart: number, alphaEnd: number, duration: number, isReset: boolean, isLoop: boolean = false, ease: Function = null) {
        if (!target) return;

        var handler = null;
        target.alpha = alphaStart;
        alpha1();

        function alpha1() {
            handler = isLoop || isReset ? new Laya.Handler(this, alpha2) : null;
            Laya.Tween.to(target, { alpha: alphaEnd }, duration, ease, handler);
        }

        function alpha2() {
            handler = isLoop ? new Laya.Handler(this, alpha1) : null;
            Laya.Tween.to(target, { alpha: alphaStart }, duration, ease, handler);
        }
    }

    /**
     * 位移动画，移动到指定位置
     * @param target 
     * @param pos 
     * @param duration 
     * @param isLoop 
     */
    toPosition(target, pos, duration, isLoop = false, type = 0) {
        let curPos = new Laya.Vector2(target.x, target.y);
        pos1();

        function pos1() {
            if (isLoop) {
                switch (type) {
                    case 0:
                        var handler = new Laya.Handler(this, pos2);
                        break;
                    case 1:
                        var handler = new Laya.Handler(this, pos3);
                        break;
                }
            }
            // let handler = isLoop ? new Laya.Handler(this, pos2) : null;
            Laya.Tween.to(target, { x: pos.x, y: pos.y }, duration, null, handler);
        }

        function pos2() {
            Laya.Tween.to(target, { x: curPos.x, y: curPos.y }, duration, null, Laya.Handler.create(this, pos1));
        }

        function pos3() {
            target.x = curPos.x;
            target.y = curPos.y;
            pos1();
        }
    }


    /**
     * 移动动画-3D
     * @param target 移动目标
     * @param position 移动位置
     * @param duration 动画时长-毫秒
     * @param ease 缓动类型
     * @param originalPos 起始位置
     */
    toPosition3D(target: Laya.Sprite3D, position: Laya.Vector3, duration: number, ease?: Function, originalPos?: Laya.Vector3, callBack?: Function, progressCallback?: Function) {
        if (originalPos) target.transform.position = originalPos;

        var tween = new Laya.Tween();
        var pos = target.transform.position.clone();

        tween.to(pos, { x: position.x, y: position.y, z: position.z }, duration, ease, Laya.Handler.create(this, () => {
            target.transform.position = position;
            if(callBack) callBack();
        }));

        tween.update = new Laya.Handler(this, () => {
            target.transform.position = pos;
            if(progressCallback) progressCallback(target, pos);
        });
    }

    /**
     * 旋转动画，旋转指定角度
     * @param target 
     * @param angle 
     * @param duration 
     * @param isLoop 
     */
    toRotaion(target, angle, duration, isLoop = false, isReset = false) {
        var curAngle = target.rotation;
        rotate1();

        function rotate1() {
            if (isLoop) {
                var handler = new Laya.Handler(this, rotate2);
            }
            else if (isReset) {
                var handler = new Laya.Handler(this, rotate4)
            }
            // let handler = isLoop ? new Laya.Handler(this, pos2) : null;
            Laya.Tween.to(target, { rotation: angle }, duration, null, handler);
        }

        function rotate2() {
            Laya.Tween.to(target, { rotation: -angle }, duration * 2, null, Laya.Handler.create(this, rotate3));
        }

        function rotate3() {
            Laya.Tween.to(target, { rotation: angle }, duration * 2, null, Laya.Handler.create(this, rotate2));
        }

        function rotate4() {
            Laya.Tween.to(target, { rotation: curAngle }, duration);
        }
    }

    clear(target: any) {
        Laya.Tween.clearAll(target);
    }
}