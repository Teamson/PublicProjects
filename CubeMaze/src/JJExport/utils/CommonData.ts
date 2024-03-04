/**全局变量 */
export default class CommonData {
    /**游戏appId */
    appId: string = "wxa49498a30cf837f6";
    /**游戏版本 */
    gameVersion: string = "1.0.4";
    /**游戏类型 */
    gameType: string = "3D";

    /**场景资源路径 */
    sceneResUrl: string = "res/scene/Conventional/ResScene.ls";
    /**预设资源路径 */
    modelResUrl: string = "res/model/Conventional/ResScene.lh";

    /**游戏主场景-3D */
    mainScene: Laya.Scene3D;

    /**游戏主摄像机 */
    mainCamera: Laya.Camera;

    skinCamera: Laya.Camera;

    /**复活次数 */
    rebornCount: number = 0;

    /**游戏次数 */
    playCount: number = 0;

    /**随机分享失败文案 */
    get shareContext(): string {
        let str = [
            '请分享到活跃的群！',
            '请分享到不同群！',
            '请分享给好友！',
            '请分享给20人以上的群！'
        ]

        let index = Math.floor(Math.random() * 4);
        return str[index];
    }

    laodSubpackageFinish: boolean;
    loadFinished: boolean;

    /****************************** 业务全局变量 ******************************/
    isReborn: boolean;
}