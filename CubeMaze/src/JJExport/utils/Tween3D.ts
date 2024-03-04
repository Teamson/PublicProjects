export default class Tween3D {
    /** 动画帧数与时间换算：每帧时间（ms) = 1000 / 帧数 */
    tween: Laya.Tween;
    tweens: any[];

    target: Laya.Sprite3D;
    isLocal: boolean;

    constructor() {
        this.tween = new Laya.Tween();
        this.tweens = [];
    }

    getTimeByFrame(frame) {
        return Math.round(1000 / 100 * frame); // 60可替换为实际帧率
    }

    toTween(target: Laya.Sprite3D, value: { pos?: Laya.Vector3, rot?: Laya.Vector3, sca?: Laya.Vector3 }, time: number, completeFun?: Function, isLocal: boolean = true) {
        this.target = target;
        this.isLocal = isLocal;

        //当前值
        var ov: any = {};
        //目标值
        var tv: any = {};

        if (value.pos) {
            var targetPos = isLocal ? target.transform.localPosition.clone() : target.transform.position.clone();

            ov.posX = targetPos.x
            ov.posY = targetPos.y;
            ov.posZ = targetPos.z;

            tv.posX = value.pos.x;
            tv.posY = value.pos.y;
            tv.posZ = value.pos.z;
        }
        if (value.rot) {
            var targetRot = isLocal ? target.transform.localRotationEuler.clone() : target.transform.rotationEuler.clone(); //target.transform.rotationEuler.clone();//

            ov.rotX = targetRot.x;
            ov.rotY = targetRot.y;
            ov.rotZ = targetRot.z;

            tv.rotX = value.rot.x;
            tv.rotY = value.rot.y;
            tv.rotZ = value.rot.z;
        }
        if (value.sca) {
            var targetSca = target.transform.getWorldLossyScale().clone();

            ov.scaX = targetSca.x;
            ov.scaY = targetSca.y;
            ov.scaZ = targetSca.z;

            tv.scaX = value.sca.x;
            tv.scaY = value.sca.y;
            tv.scaZ = value.sca.z;
        }

        this.tween.to(ov, {
            posX: tv.posX, posY: tv.posY, posZ: tv.posZ,
            rotX: tv.rotX, rotY: tv.rotY, rotZ: tv.rotZ,
            scaX: tv.scaX, scaY: tv.scaY, scaZ: tv.scaZ
        }, time, null, Laya.Handler.create(this, () => {
            completeFun && completeFun();
            var nextTWeen = this.tweens.shift();
            if (nextTWeen) {
                this.toTween(this.target, nextTWeen.value, nextTWeen.time, nextTWeen.completeFun);
            }
        }));

        this.tween.update = new Laya.Handler(this, () => {
            if (value.pos) {
                if (isLocal) {
                    target.transform.localPosition = new Laya.Vector3(ov.posX, ov.posY, ov.posZ);
                }
                else {
                    target.transform.position = new Laya.Vector3(ov.posX, ov.posY, ov.posZ);
                }
            }
            if (value.rot) {
                if (isLocal) {
                    target.transform.localRotationEuler = new Laya.Vector3(ov.rotX, ov.rotY, ov.rotZ);
                }
                else {
                    target.transform.rotationEuler = new Laya.Vector3(ov.rotX, ov.rotY, ov.rotZ);
                }
                // target.transform.rotationEuler = new Laya.Vector3(ov.rotX, ov.rotY, ov.rotZ);
            }
            if (value.sca) {
                target.transform.setWorldLossyScale(new Laya.Vector3(ov.scaX, ov.scaY, ov.scaZ));
            }
        });

        return this;
    }

    clearTween(value?: { pos?: Laya.Vector3, rot?: Laya.Vector3, sca?: Laya.Vector3 }) {
        this.tweens = [];
        this.tween.clear();

        if (this.target && value) {
            if (value.pos) {
                if (this.isLocal) {
                    this.target.transform.localPosition = new Laya.Vector3(value.pos.x, value.pos.y, value.pos.z);
                }
                else {
                    this.target.transform.position = new Laya.Vector3(value.pos.x, value.pos.y, value.pos.z);
                }
            }
            if (value.rot) {
                this.target.transform.rotationEuler = new Laya.Vector3(value.rot.x, value.rot.y, value.rot.z);
            }
            if (value.sca) {
                this.target.transform.setWorldLossyScale(new Laya.Vector3(value.sca.x, value.sca.y, value.sca.z));
            }
        }
    }

    then(value: { pos?: Laya.Vector3, rot?: Laya.Vector3, sca?: Laya.Vector3 }, time: number, completeFun?: Function) {
        this.tweens.push({ value: value, time: time, completeFun: completeFun });
        return this;
    }
}