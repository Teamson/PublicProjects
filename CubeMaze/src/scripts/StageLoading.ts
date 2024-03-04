import BaseUI from "./mods/BaseUI";
import { SceneUrl } from "./tools/Data";

export default class StageLoading extends BaseUI {
    bg: Laya.Image;
    max;
    static instance;
    public callback = () => { };

    init() {
        StageLoading.instance = this;
        let width = Laya.stage.width;
        let height = Laya.stage.height;
       
        this.bg.width = width;
        this.bg.height = height;

    }
    start1() {
        
    }
    start2() {
       
    }
    End() {
        this.close()
        this.callback();
    }
}