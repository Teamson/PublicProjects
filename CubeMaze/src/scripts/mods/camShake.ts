import Tools from "./Tools";

export default class camShake {

    vibrateShort(cam: Laya.Sprite3D): void {
        Tools.objectShake(cam, Laya.timer.delta/1000, 0.1);
    }
}