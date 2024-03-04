export default class BaseUI extends Laya.Scene {
 
    onAwake()
    {
        this.height = Laya.stage.height;
        this.init();
    }
    init(){}
}