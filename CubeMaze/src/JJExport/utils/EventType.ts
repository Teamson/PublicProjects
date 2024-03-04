// /**事件类型 */
export default class EventType {

    /************* 广告 *************/
    /**加载广告 */
    static AD_LOAD_EVENT = "";
    /**显示广告 */
    static AD_SHOW_EVENT = "";
    /**视频关闭 */
    static AD_VIDEO_CLOSE_EVENT = "";

    /************* 微信 *************/
    /**平台唤醒 */
    static PLATFORM_WAKE_EVENT = "";
    /**平台睡眠 */
    static PLATFORM_SLEEP_EVENT = "";

    /************* 通用 *************/
    /**加载完成 */
    static LOAD_FINISH_EVENT = "";
    /**游戏初始化 */
    static GAME_INIT_EVENT = "";
    /**游戏开始 */
    static GAME_PLAY_EVENT = "";
    /**复活 */
    static GAME_REBORN_EVENT = "";
    /**游戏结束 */
    static GAME_OVER_EVENT = "";

    static MOUSE_EVENT = "";

    /************* 业务 *************/
    /**更换角色皮肤 */
    static CHANGE_SKIN_EVENT = "";
    /**更换武器皮肤 */
    static CHANGE_BRICK_EVENT = "";
    /**更新关卡 */
    static CHANGE_LEVEL_EVENT = "";
    /**更新金币 */
    static CHANGE_COIN_EVENT = "";

    static SHOW_TIPS_EVENT = "";
    static UPDATE_SHARE_COUNT = "";
    static UPDATE_CHECK_SV = ""

    /************* 后端 *************/
    /**登录请求 */
    static LOGIN_EVENT = "";
    /**分享回调 */
    static SHARE_BACK_EVENT = "";
}