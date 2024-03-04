/**2D组件基类 */
export default class BaseScrpit extends Laya.Script {
    /**自身对象 */
    self: Laya.Sprite;

    onAwake() {
        this.self = this.owner as Laya.Sprite;
        this.init();
    }

    /**初始化 */
    init() { }
}