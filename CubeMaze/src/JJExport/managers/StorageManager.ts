// import Context from "../Context";
// import EventType from "../utils/EventType";

// export default class StorageManager {
//     /**缓存数据 --直接添加需要新增的缓存名-- */
//     storageData = {
//         /**分数 */
//         score: 0,
//         /**关卡 */
//         level: 1,
//         /**游戏次数 */
//         playCount: 0,
//         /**游戏时长 时间戳ms*/
//         playTime: new Date().getTime(),
//         /**游戏刷新时间 */
//         gameTime: new Date().getTime() - 86400000,
//         /**离线时间 */
//         offlineTime: new Date().getTime(),

//         /**体力 */
//         strength: 20,
//         /**金币 */
//         coin: 350,

//         /**钥匙数 */
//         key: 0,

//         /**签到天数 */
//         signDay: 1,
//         /**签到期数 */
//         signWeek: 1,
//         /**当日是否已签到 */
//         isSign: false,
//         /**钥匙数 */
//         keyAmount: 0,

//         /**是否开启声音 */
//         isSound: true,
//         /**是否开启震动 */
//         isVibrate: true,

//         /**已解锁英雄 */
//         skinHero: [1],
//         /**已解锁武器 */
//         skinBrick: [1],
//         /**已解锁颜色 */
//         skinColor: [0],

//         /**当前使用英雄 */
//         heroIndex: 1,
//         /**当前使用武器 */
//         brickIndex: 1,
//         /**当前使用颜色 */
//         colorIndex: 0,

//         /**是否新手 */
//         isNewPlay: true,

//         /**角色等级属性 */
//         upgradeProperty: {
//             attack: 1,  //攻击力
//             defense: 1, //防御力
//             offline: 1  //离线收益
//         },

//         unlockBuff: false,
//         nextReward: null,

//         /**每日分享剩余次数 */
//         shareCount: 0,

//         jumpCoinLevel: 1,
//     }

//     /**缓存数据名称 --与上面命名保持一致即可-- */
//     storageName = {
//         score: "",
//         level: "",
//         playCount: "",
//         playTime: "",
//         gameTime: "",
//         strength: "",
//         coin: "",
//         signDay: "",
//         signWeek: "",
//         isSign: "",
//         isSound: "",
//         isVibrate: "",
//         keyAmount: "",
//         skinHero: "",
//         skinBrick: "",
//         skinColor: "",
//         heroIndex: "",
//         brickIndex: "",
//         colorIndex: "",
//         isNewPlay: "",
//         offlineTime: "",
//         upgradeProperty: "",

//         unlockBuff: "",
//         nextReward: "",
//         shareCount: "",

//         key: "",
//         jumpCoinLevel: "",
//     }

//     constructor() {
//         this.init();
//     }

//     /**初始化数据 */
//     init() {
//         for (let key in this.storageData) {
//             let jsonData = this.readStorage(key);
//             if (!jsonData) {
//                 this.writeStorage(key, this.storageData[key]);
//             }
//             else {
//                 this.storageData[key] = JSON.parse(jsonData);

//             }

//             //数据名称更新
//             this.storageName[key] = key;
//         }

//         //刷新每日数据
//         this.refreshData();

//         if (this.storageData.nextReward == null) {
//             this.storageData.nextReward = {};
//             this.updateNextReward();
//         }
//     }

//     /**设置缓存数据 */
//     setValue(name: string, value: any) {
//         //方式一：直接赋值
//         this.storageData[name] = value;
//         this.writeStorage(name, value);
//     }

//     /**写入缓存 */
//     writeStorage(key: string, value: any) {
//         Laya.LocalStorage.setItem(key, JSON.stringify(value));
//     }

//     /**读取缓存 */
//     readStorage(key: string) {
//         return Laya.LocalStorage.getItem(key);
//     }

//     /**移除缓存 */
//     removeStorage(key: string) {
//         Laya.LocalStorage.removeItem(key);
//     }

//     /**刷新每日数据 */
//     refreshData() {
//         var gameTime = Math.floor((this.storageData.gameTime) / 86400000);
//         var curTime = Math.floor(this.getCurrentTime / 86400000);
//         if (gameTime != curTime) { //TODON 测试签到 -86400000
//             console.log("更新每日数据");

//             //更新当日游戏次数
//             this.setValue(this.storageName.playCount, 0);
//             //更新当日游戏时间
//             this.setValue(this.storageName.playTime, this.getCurrentTime);
//             //更新刷新时间
//             this.setValue(this.storageName.gameTime, this.getCurrentTime);
//             //更新体力
//             this.setValue(this.storageName.strength, 20);

//             //更新签到
//             this.setValue(this.storageName.isSign, false);

//             if (this.storageData.signDay > 7) {
//                 this.setValue(this.storageName.signDay, 1);
//                 this.setValue(this.storageName.signWeek, this.storageData.signWeek + 1);
//             }

//             Context.Event.on(EventType.UPDATE_SHARE_COUNT, this, this.updateShareCount);
//         }
//     }

//     /**更新当日分享次数 */
//     updateShareCount(evt) {
//         this.setValue(this.storageName.shareCount, evt.amount);
//         console.log("剩余分享次数：", evt.amount);

//         Context.Event.event(EventType.UPDATE_CHECK_SV);
//     }

//     /**获取当前时间戳 ms*/
//     get getCurrentTime() {
//         return new Date().getTime();
//     }

//     // /**签到 */
//     // sign() {
//     //     this.setValue(this.storageName.isSign, true);
//     //     this.setValue(this.storageName.signDay, this.storageData.signDay + 1);

//     //     Context.Event.event(EventType.SIGN_EVENT);
//     // }

//     /**通关 */
//     passLevel() {
//         this.setValue(this.storageName.level, this.storageData.level + 1);
//     }

//     /**升级 */
//     upgradeLevel() {
//         this.setValue(this.storageName.jumpCoinLevel, this.storageData.jumpCoinLevel + 1);
//     }

//     /**
//      * 金币更新
//      * @param value 更新值
//      */
//     updateCoin(value) {
//         this.setValue(this.storageName.coin, this.storageData.coin + value);
//         Context.Event.event(EventType.CHANGE_COIN_EVENT);
//     }

//     // /**
//     //  * 钥匙更新
//     //  * @param value 更新值
//     //  */
//     // updateKey(value) {
//     //     this.setValue(this.storageName.key, this.storageData.key + value);
//     //     Context.Event.event(EventType.CHANGE_KEY_EVENT);
//     // }

//     /**获得英雄皮肤 */
//     updateHeroSkin(index) {
//         this.storageData.skinHero.push(index);
//         this.setValue(this.storageName.skinHero, this.storageData.skinHero);
//         this.setValue(this.storageName.heroIndex, index);
//         // Context.Event.event(EventType.CHANGE_SKIN_EVENT, { index: index, canSave: true });
//     }

//     /**获得武器皮肤 */
//     updateBrickSkin(index) {
//         this.storageData.skinBrick.push(index);
//         this.setValue(this.storageName.skinBrick, this.storageData.skinBrick);

//         this.setValue(this.storageName.brickIndex, index);
//         // Context.Event.event(EventType.CHANGE_BRICK_EVENT, { index: index, canSave: true });
//     }

//     /**获得新颜色 */
//     updateColorSkin(index) {
//         this.storageData.skinColor.push(index);
//         this.setValue(this.storageName.skinColor, this.storageData.skinColor);
//     }

//     /**
//      * 升级属性
//      * @param type 1：攻击力，2：防御力，3：离线收益
//      */
//     upgrade(type) {
//         if (type == 1) {
//             this.storageData.upgradeProperty.attack++;
//             if (this.storageData.upgradeProperty.attack > 40) this.storageData.upgradeProperty.attack = 40;
//         }
//         else if (type == 2) {
//             this.storageData.upgradeProperty.defense++;
//             if (this.storageData.upgradeProperty.defense > 40) this.storageData.upgradeProperty.defense = 40;
//         }
//         else {
//             this.storageData.upgradeProperty.offline++;
//             if (this.storageData.upgradeProperty.offline > 40) this.storageData.upgradeProperty.offline = 40;
//         }

//         this.setValue(this.storageName.upgradeProperty, this.storageData.upgradeProperty);
//     }

//     /**保存奖励，获取下一个 */
//     getNewSkin() {
//         this.updateHeroSkin(this.storageData.nextReward.id);
//         this.updateNextReward();
//     }

//     /**更新下一关奖励 */
//     updateNextReward() {
//         this.storageData.nextReward.isWeapon = false;
//         this.storageData.nextReward.id = null;
//         var lockSkin = [];

//         for (var i = 1; i <= 4; i++) {
//             if (this.storageData.skinHero.indexOf(i) == -1) {
//                 lockSkin.push(i);
//             }
//         }

//         if (lockSkin.length > 0) {
//             var id = Context.Utils.getRandomArray(lockSkin, 1)[0];
//             this.storageData.nextReward.id = id;
//         }

//         this.setValue(this.storageName.nextReward, this.storageData.nextReward);
//     }
// }