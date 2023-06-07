export default class SGUtils {

    static getRangeNumer(min, max) {
        return (Math.random() * (max - min)) + min;
    }

    public static addClickEvent(btn: Laya.Sprite, caller: any, callBack: Function, param?: any[], isScale?: boolean) {
        btn.offAllCaller(caller);

        if (btn instanceof Laya.Button && !isScale) {
            let callback = (event) => {
                if (callBack) callBack.call(caller, event);
            }
            btn.on(Laya.Event.CLICK, caller, callback, [param]);
        }
        else {
            let scaleTime = 60;
            let wRatio = 1;
            let scaleX = btn.scaleX * wRatio;
            let scaleY = btn.scaleY * wRatio;
            let size = 0.9 * wRatio;

            let isPressed = false;
            let cbDown = (event) => {
                isPressed = true;
                Laya.Tween.to(btn, { scaleX: size, scaleY: size }, scaleTime);
            }
            btn.on(Laya.Event.MOUSE_DOWN, caller, cbDown, [param]);

            let cbUp = (event) => {
                if (isPressed == false) return;
                isPressed = false;
                Laya.Tween.to(btn, { scaleX: scaleX, scaleY: scaleY }, scaleTime, null, new Laya.Handler(caller, () => {
                    if (callBack) callBack.call(caller, event);
                }));
            }
            btn.on(Laya.Event.MOUSE_UP, caller, cbUp, [param]);

            let cbOut = (event) => {
                Laya.Tween.to(btn, { scaleX: scaleX, scaleY: scaleY }, scaleTime);
            }
            btn.on(Laya.Event.MOUSE_OUT, caller, cbOut, [param]);
        }
    }
}