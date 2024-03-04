import Context from "../Context";

export default class UiManager {
    /**所有ui场景 */
    private scenes: Laya.Scene[];
    /**最顶层场景 */
    private topScene: Laya.Scene;

    forceHide: boolean = false;

    constructor() {
        this.init();
    }

    /**初始化场景 */
    init() {
        this.scenes = [];
    }

    /**获取顶层场景 */
    get getTopScene() {
        return this.topScene;
    }

    /**
     * 打开场景
     * @param url 地址
     * @param closeOther 是否关闭其他界面
     * @param param 参数
     * @param parent 父节点
     * @param callBack 回调函数
     */
    openScene(url: string, closeOther: boolean = false, param?: any, parent?: Laya.Node, callBack?: Function) {
        Laya.Scene.open(url, closeOther, param, Laya.Handler.create(this, s => {
            let scene = this.scenes.filter((w) => { return w.url == url });
            if (scene && scene.length > 0) {
                console.log("已打开此场景", scene);
                scene[0].close();
            }
            else {
                if (parent) {
                    parent.addChild(s);
                }
                else {
                    Laya.stage.addChild(s);
                }

                this.scenes.push(s);
                this.topScene = this.scenes[this.scenes.length - 1];

                if (callBack) {
                    callBack(s);
                }
            }
        }));
    }

    // /**关闭场景 */
    // closeScene(scene?) {
    //     if (scene && scene instanceof Laya.Scene) {
    //         this.scenes.splice(this.scenes.indexOf(scene), 1);
    //         scene.close();
    //         this.topScene = this.scenes[this.scenes.length - 1];
    //     }
    //     else if (this.topScene) {
    //         this.scenes.splice(this.scenes.indexOf(this.topScene), 1);
    //         this.topScene.close();
    //         this.topScene = this.scenes[this.scenes.length - 1];
    //     }
    //     else{

    //     }
    // }

    /**关闭场景 */
    closeScene(scene?) {
        if (scene) {
            if (typeof scene === 'string') {
                this.scenes.forEach(sceneItem => {
                    if (sceneItem.url == scene) {
                        scene = sceneItem;
                        return;
                    }
                });
            }
            // var index = this.scenes.indexOf(scene);
        }
        else if (this.topScene != null) {
            scene = this.topScene;
        }

        if (scene && scene instanceof Laya.Scene) {
            var index = this.scenes.indexOf(scene);
            if (index != -1) {
                this.scenes.splice(index, 1);
                this.topScene = this.scenes[this.scenes.length - 1];
            }
            scene.close();
        }

        // if (scene) {
        //     var index = this.scenes.indexOf(scene);
        //     if (index != -1) {
        //         this.scenes.splice(index, 1);
        //         this.topScene = this.scenes[this.scenes.length - 1];
        //     }
        //     scene.close();

        //     Laya.timer.once(100, this, () => {
        //         var scene: any = this.topScene;
        //         if (scene.canShowAd) {
        //             Context.Platform.showBanner();
        //         }
        //         else {
        //             Context.Platform.hideBanner();
        //         }
        //     })
        // }
    }
}