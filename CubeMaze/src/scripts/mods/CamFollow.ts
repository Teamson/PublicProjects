import Stage from "../Stage";
import Data from "../tools/Data";
import Tools from "./Tools";

export default class CamFollow extends Laya.Script {

    public offset = new Laya.Vector3(-0.25, 18, -8);
    public offsetXmin = -1;
    public offsetXmax = 0.5;
    public self: Laya.Sprite3D;
    public target: Laya.Sprite3D;
    onAwake() {
        this.offset.x = (this.offsetXmax - this.offsetXmin) / 2 + this.offsetXmin;
        this.self = this.owner as Laya.Sprite3D
        this.target = Data.player;
        let targetPos = this.target.transform.position.clone();
        this.self.transform.position = Tools.Vector3Add(targetPos, this.offset);
        this.justGo();
    }
    onUpdate() {
        let targetPos = this.target.transform.position.clone();
        let selfPos = this.self.transform.position.clone()
        let nowOffset = Tools.Vector3Reduce(selfPos, targetPos);
        if (nowOffset.x < this.offsetXmin) {
            nowOffset.x = this.offsetXmin;
        } else if (nowOffset.x > this.offsetXmax) {
            nowOffset.x = this.offsetXmax;
        }
        if (Stage.instance) {
            if (Stage.instance.nowCube.length > 30) {
                nowOffset.y = this.offset.y + 3
            } else {
                nowOffset.y = this.offset.y;
            }
        }
        nowOffset.z = this.offset.z;
        targetPos.y = 0;
        let shouldGoPos = Tools.Vector3Add(targetPos, nowOffset);
        let goPos = new Laya.Vector3();
        Laya.Vector3.lerp(selfPos, shouldGoPos, 0.1, goPos)
        this.self.transform.position = goPos;
    }
    justGo() {
        let targetPos = this.target.transform.position.clone();
        let selfPos = this.self.transform.position.clone()
        let nowOffset = Tools.Vector3Reduce(selfPos, targetPos);
        if (nowOffset.x < this.offsetXmin) {
            nowOffset.x = this.offsetXmin;
        } else if (nowOffset.x > this.offsetXmax) {
            nowOffset.x = this.offsetXmax;
        }
        if (Stage.instance) {
            if (Stage.instance.nowCube.length > 30) {
                nowOffset.y = this.offset.y + 3
            } else {
                nowOffset.y = this.offset.y;
            }
        }
        nowOffset.z = this.offset.z;
        targetPos.y = 0;
        let shouldGoPos = Tools.Vector3Add(targetPos, nowOffset);
        this.self.transform.position = shouldGoPos;
    }
    onDestroy() {
        this.justGo();
    }
}