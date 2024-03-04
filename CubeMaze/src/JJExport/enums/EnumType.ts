/**场景类型 */
export enum SceneType {
    /**加载页 */
    Loading = "UIScene/Loading.scene",
    /**加载页 */
    BusyLoading = "UIScene/BusyLoading.scene",
    /**主页 */
    Home = "UIScene/Home.scene",
    /**游戏页 */
    Game = "UIScene/Game.scene",
    /**3D游戏页 */
    Game3D = "UIScene/Game3D.scene",
    /**复活页 */
    Reborn = "UIScene/Reborn.scene",
    /**结算页 */
    Settlement = "UIScene/Settlement.scene",

    Mission = "UIScene/Mission.scene",

    /**皮肤页 */
    Skin = "UIScene/Skin.scene",
    /**皮肤试用页 */
    FreeSkin = "UIScene/FreeSkin.scene",
    /**签到页 */
    Sign = "UIScene/Sign.scene",
    /**离线收益页 */
    Offline = "UIScene/Offline.scene",

    Strength = "UIScene/Strength.scene",

    /**签到提示页 */
    SignTips = "UIScene/SignTips.scene",

    Busy = "UIScene/Busy.scene",

    Background = "UIScene/Background.scene",

    Box = "UIScene/Box.scene",

    Clean = "UIScene/Clean.scene",
}

/**预制体类型 */
export enum PrefabItem {
    BoxItem = "prefab/BoxItem.prefab",
    FontDamaged = "prefab/FontDamaged.prefab",
    CompoundItem = "prefab/CompoundItem.prefab",
}

/**音效类型 */
export enum SoundType {
    /************* 音乐 *************/
    /**背景音乐 */
    BGM = "Bgm",
  

    /************* 音效 *************/
    /**点击 */
    CLICK = "Click",
    AddBrick = "AddBrick",
    Chest ="Chest",
    Finish="Finish",
    PutBrick = "PutBrick"
}