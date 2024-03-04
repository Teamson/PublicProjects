import UiManager from "./managers/UiManager";
import CommonData from "./utils/CommonData";
import UtilsFunction from "./utils/UtilsFunction";
import EventType from "./utils/EventType";
import PrefabManager from "./managers/PrefabManager";
import GameManager from "./managers/GameManager";
import TweenManager from "./managers/TweenManager";
import LevelManager from "./managers/LevelManager";
import PlatformManager from "./managers/PlatformManager";
// import StrengthManager from "./managers/StrengthManager";
import SoundManager from "./managers/SoundManager";
// import CarAssemblyManager from "./managers/CarAssemblyManager";
import NetManager from "./managers/NetManager";
// import CompoundManager from "./managers/CompoundManager";

export default class Context {
    private static uiManager: UiManager;
    private static storageManager: StorageManager;
    private static prefabManager: PrefabManager
    private static commonData: CommonData;
    private static utils: UtilsFunction;
    private static event: Laya.EventDispatcher;
    private static gameManager: GameManager;
    private static tweenManager: TweenManager;
    private static platformManager: PlatformManager;
    private static levelManager: LevelManager;
    // private static strengthManager: StrengthManager;
    private static soundManager: SoundManager;
    private static netManager: NetManager;




    // private static carAssemblyManage: CarAssemblyManager;

    // private static compoundManager: CompoundManager;

    /**初始化 */
    static init() {
        //事件初始化
        for (var prop in EventType) {
            // console.log(prop);
            EventType[prop] = prop;
        }

        Context.UI;
        Context.Storage;
        Context.Prefab;
        Context.CommonData;
        Context.Utils;
        Context.Event;
        Context.Game;
        Context.Tween;
        Context.Level;
        Context.Platform;
        Context.Streng;
        Context.Sound;

    }

    /**ui管理器 */
    static get UI() {
        if (!this.uiManager) {
            this.uiManager = new UiManager();
        }
        return this.uiManager;
    }

    /**缓存管理器 */
    static get Storage() {
        if (!this.storageManager) {
            this.storageManager = new StorageManager();
        }
        return this.storageManager;
    }

    /**扩展工具 */
    static get Utils() {
        if (!this.utils) {
            this.utils = new UtilsFunction();
        }
        return this.utils;
    }

    /**全局数据 */
    static get CommonData() {
        if (!this.commonData) {
            this.commonData = new CommonData();
        }
        return this.commonData;
    }

    /**全局事件 */
    static get Event() {
        if (!this.event) {
            this.event = new Laya.EventDispatcher();
        }
        return this.event;
    }

    /**预制体管理器 */
    static get Prefab() {
        if (!this.prefabManager) {
            this.prefabManager = new PrefabManager();
        }
        return this.prefabManager;
    }

    /**游戏控制器 */
    static get Game() {
        if (!this.gameManager) {
            this.gameManager = new GameManager();
        }
        return this.gameManager;
    }

    /**缓动控制器 */
    static get Tween() {
        if (!this.tweenManager) {
            this.tweenManager = new TweenManager();
        }
        return this.tweenManager;
    }

    /**关卡管理器 */
    static get Level() {
        if (!this.levelManager) {
            this.levelManager = new LevelManager();
        }
        return this.levelManager;
    }

    /**平台管理器 */
    static get Platform() {
        if (!this.platformManager) {
            this.platformManager = new PlatformManager();
        }
        return this.platformManager;
    }

    /**体力系统 */
    static get Streng() {
        // if(!this.strengthManager){
        //     this.strengthManager = new StrengthManager();
        // }

        // return this.strengthManager;
        return null;
    }

    /**音效管理器 */
    static get Sound() {
        if (!this.soundManager) {
            this.soundManager = new SoundManager();
        }

        return this.soundManager;
    }


    // /**音效管理器 */
    // static get CarAssembly(){
    //     if(!this.carAssemblyManage){
    //         this.carAssemblyManage = new CarAssemblyManager();
    //     }

    //     return this.carAssemblyManage;
    // }

    static get Net() {
        if (!this.netManager) {
            this.netManager = new NetManager();
        }

        return this.netManager;
    }

    // /**合成管理器 */
    // static get Compound(){
    //     if(!this.compoundManager){
    //         this.compoundManager = new CompoundManager();
    //     }
    //     return this.compoundManager;
    // }
}


// Object.keys(Context.CommonData).forEach(console.log)

// for (var prop in EventType) {
//     console.log(prop);
//     EventType[prop] = prop;
// } // 反射