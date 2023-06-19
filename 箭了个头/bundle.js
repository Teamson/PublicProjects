(function () {
    'use strict';

    class CommonData {
        constructor() {
            this.gameVersion = "1.0.0";
            this.lsUrl = "d3res/Conventional/ResScene.ls";
            this.lhUrl = "d3res/Conventional/ResScene.lh";
            this.lhPackHeadUrl = "d3pack/Conventional/";
            this.audioUrl = "res/audios/";
            this.audioType = ".mp3";
            this.isShowLoadLog = false;
            this.isShowStorageLog = false;
            this.isShowLogoTween = false;
            this.gameLogoUrl = "gameUI/load/logo.png";
            this.companyLogoUrl = "gameUI/load/companyLogo.png";
            this.companyLogoSize = 0.5;
            this.isDebug = false;
            this.isSubpackage = true;
            this.subpackageList = ["d3res"];
            this.playCount = 0;
            this.keyBtnDownValue = [];
            this.trySkinId = null;
            this.isClearVersion = false;
            this.objConfig = [
                { name: "Coin1", size: [1, 0.2, 1], color: "#F9B93D" },
                { name: "Coin2", size: [1, 0.2, 1], color: "#93AEDB" },
                { name: "Coin3", size: [1, 0.4, 1], color: "#3D3194" },
                { name: "DavidGold", size: [0.5, 1, 0.5], color: "#C5A74B" },
                { name: "FooDog", size: [0.4, 1, 0.6], color: "#63E069" },
                { name: "Diamond1", size: [1, 0.75, 1], color: "#19B6FF" },
                { name: "Diamond2", size: [1, 0.75, 1], color: "#CBECC8" },
                { name: "HeartStone", size: [1, 0.88, 0.4], color: "#FF77C2" },
                { name: "OpalJade", size: [0.66, 1, 0.58], color: "#7DFF29" },
                { name: "OvalDarkPink", size: [0.67, 0.27, 1], color: "#FF77C2" },
                { name: "QuartzPinkRedGrad", size: [0.6, 1, 0.6], color: "#F74224" },
                { name: "Ring1", size: [0.75, 0.95, 0.6], color: "#8B4085" },
                { name: "Ring2", size: [0.77, 0.7, 1], color: "#FFD74F" },
                { name: "Money", size: [1, 0.2, 0.5], color: "" },
            ];
            this.gameConfig = [
                { name: "开始游戏", stroke: "#752caf" },
                { name: "武器大师", stroke: "#43379f" },
                { name: "绿荫球场", stroke: "#374188" },
                { name: "吸尘大法", stroke: "#5b4ba5" },
                { name: "奇珍异宝", stroke: "#91397d" },
                { name: "小小旋风", stroke: "#441b85" },
                { name: "花好月圆", stroke: "#2a518c" },
                { name: "海岛风情", stroke: "#9a501e" },
                { name: "清凉一夏", stroke: "#274373" }
            ];
            this.levelObj = [
                [[0, 5, 5, 10]],
                [[2, 3, 3, 9]],
                [[1, 6, 6, 11]],
                [[8, 4, 4, 5]],
                [[9, 2, 2, 6]],
                [[7, 0, 0, 3]],
                [[10, 1, 1, 8]],
                [[3, 8, 8, 1]],
                [[4, 11, 11, 7]]
            ];
            this.levelCost = [15, 40, 90, 150, 200, 300, 400, 600, 800, 1000, 1300, 1600, 2000, 2400, 3000, 4000, 6000, 8000, 10000, 15000, 20000, 30000, 40000, 60000, 80000, 100000, 200000];
            this.levelUpgradeStepValue = [-0.005, 0.02, 20];
            this.buffTime = [20, 20, 20, 20];
            this.isBuffTime = [false, false, false, false];
            this.skinName = ["黑洞", "小蜜蜂", "小青蛙", "小猪", "小男孩", "小女孩", "小恐龙", "猫头鹰"];
            this.windName = ["黑龙卷", "水龙卷", "雷龙卷", "火龙卷"];
            this.dinosaurName = ["迅猛龙", "三角龙", "甲龙", "牛龙", "暴盗龙", "肿头龙", "剑龙", "霸王龙"];
            this.dinosaurAtkTime = [1000, 1000, 1000, 1000, 1000, 1000, 1000, 1000];
            this.dinosaurHitTime = [0.62, 0.62, 0.62, 0.62, 0.62, 0.62, 0.62, 0.62];
            this.dinosaurHp = [100, 200, 400, 350, 500, 800, 1000, 1500];
            this.dinosaurAttack = [30, 40, 50, 70, 80, 90, 100, 150];
            this.roleName = ["原始人", "战士", "勇士", "百夫长", "酋长", "领主", "英雄", "法师"];
            this.roleAtkTime = [1000, 1000, 1000, 1000, 1000, 1000, 1000, 1000];
            this.roleHitTime = [0.62, 0.62, 0.62, 0.62, 0.62, 0.62, 0.62, 0.62];
            this.roleHp = [100, 150, 200, 250, 300, 350, 400, 500];
            this.roleAttack = [20, 30, 40, 50, 60, 70, 80, 100];
            this.signReward = [1000, 5000, 20000, 50000, 100000, 200000, 500000];
            this.turntableRewardList = [20000, 4400, 1100, 4400, 1100, 2200, 4400, 4400];
            this.offlineMoney = 5;
            this.maxOfflineMoney = 10000;
            this.levelConfig = [
                [
                    0, 0, 0, 0, 0,
                    1, 1, 1, 1, 1,
                    1, 1, 1, 1, 1,
                    1, 1, 1, 1, 1,
                    1, 1, 1, 1, 1,
                ],
                [
                    0, 0, 0, 0, 0,
                    1, 1, 2, 1, 1,
                    2, 1, 1, 2, 2,
                    1, 1, 2, 2, 1,
                    2, 1, 2, 2, 2,
                    2, 1, 1, 2, 1,
                ],
                [
                    0, 0, 0, 0, 0,
                    3, 3, 3, 1, 1,
                    3, 3, 2, 1, 2,
                    2, 3, -1, 3, -1,
                    2, 3, -1, 3, 2,
                    3, 3, 1, 2, 3,
                    2, 3, 3, 2, 2,
                ],
                [
                    0, 0, 0, 0, 0,
                    3, 3, 1, 3, 2,
                    4, 2, 4, 2, 2,
                    3, 2, 1, 3, 3,
                    3, 4, 1, 2, 1,
                    3, -1, 1, 3, -1,
                    3, 3, 4, -1, 4,
                    4, 4, 1, 4, 3,
                ],
                [
                    0, 0, 0, 0, 0,
                    2, 5, 5, 3, 1,
                    1, 1, 5, 71, 1,
                    2, -1, -1, 5, 1,
                    52, 2, -1, 71, 2,
                    5, 2, 61, 2, 3,
                    1, 5, 5, 5, 2,
                    50, 2, 3, 2, 3,
                    3, 3, 4, 2, 4
                ],
                [
                    0, 0, 0, 0, 0,
                    4, 5, 1, 1, 3,
                    1, 1, 1, 2, 1,
                    61, 3, 71, 5, 2,
                    3, 52, 4, 4, 60,
                    -1, 6, 1, 4, 1,
                    -1, 5, 50, 4, -1,
                    5, 1, -1, 2, 3,
                    6, 6, 3, 4, 6,
                    6, 6, 6, 5, 6
                ],
                [
                    0, 0, 0, 0, 0,
                    3, 3, 2, 2, 1,
                    -1, 1, 2, -1, 1,
                    1, 1, 3, 2, 2,
                    1, 50, 4, -1, 5,
                    4, 5, 5, 5, -1,
                    1, 6, 4, 2, 52,
                    2, 2, 51, 6, 5,
                    60, 4, 1, 1, 70,
                    5, 5, 6, 6, 6,
                    4, 5, 4, 2, 6
                ],
                [
                    0, 0, 0, 0, 0,
                    4, 1, 3, 2, 1,
                    3, 1, 2, 1, 2,
                    4, 2, 2, 1, 2,
                    50, 1, -1, 1, 2,
                    1, 2, 2, 3, 2,
                    -1, 71, 4, 2, 51,
                    6, 2, 62, 6, -1,
                    5, 3, 2, 6, 4,
                    6, 4, 4, 6, 50,
                    3, 3, 5, -1, 6,
                    6, 4, 6, 5, 6,
                ],
                [
                    0, 0, 0, 0, 0,
                    2, 1, 1, 4, 4,
                    1, 1, 1, 3, 1,
                    3, 2, 2, 3, 4,
                    -1, -1, 2, 3, 5,
                    -1, 51, 4, 1, -1,
                    50, 4, -1, 2, 5,
                    2, 6, 6, 71, 5,
                    3, 3, 61, 1, 4,
                    6, 3, 2, 4, 1,
                    1, 5, 5, 50, 4,
                    6, 6, 4, 5, 6,
                    4, 2, 4, 6, 2,
                ],
                [
                    0, 0, 0, 0, 0,
                    3, 3, 1, 3, 3,
                    3, 2, 2, 1, 1,
                    3, 2, 2, 3, 4,
                    -1, 3, 3, 2, 2,
                    -1, -1, 3, 1, 2,
                    1, -1, 3, 2, 61,
                    1, 7, 4, 7, 2,
                    4, 5, 3, 61, 2,
                    6, 3, 50, 5, 3,
                    2, -1, 3, 3, 51,
                    4, 5, 7, 7, 3,
                    6, 62, 4, 4, 4,
                    7, 7, 6, 5, 4
                ]
            ];
            this.autoCombine = false;
            this.isBomb = false;
            this.bombCount = 0;
            this.randomCount = 0;
            this.returnCount = 0;
            this.gameMode = 1;
            this.curSliderY = 461;
            this.curColor = [212, 138, 81];
            this.gameLevelConfig = [
                [1, 1, 1], [1, 2, 1], [2, 2, 1], [2, 2, 2], [2, 3, 2],
                [2, 3, 3], [2, 4, 2], [1, 4, 3], [2, 5, 2], [2, 4, 3],
                [3, 2, 4], [3, 3, 3], [3, 4, 3], [2, 5, 3], [2, 6, 2],
                [3, 4, 4], [3, 5, 3], [2, 5, 4], [4, 4, 4], [4, 5, 3],
                [3, 7, 4], [6, 3, 5], [4, 6, 4], [3, 7, 5], [6, 6, 3],
                [5, 7, 3], [3, 7, 5], [4, 7, 4], [7, 5, 4], [5, 6, 5],
                [5, 7, 4], [3, 9, 4], [6, 4, 6], [4, 8, 4], [6, 7, 4],
                [5, 4, 8], [6, 6, 6], [7, 6, 4], [5, 7, 5], [4, 9, 4],
                [4, 10, 4], [6, 7, 6], [9, 5, 5], [6, 8, 5], [7, 8, 4],
                [5, 10, 6], [7, 8, 6], [8, 5, 8], [5, 10, 6], [7, 5, 9],
            ];
        }
    }

    var EventType;
    (function (EventType) {
        EventType[EventType["Platform_Wake_Event"] = 0] = "Platform_Wake_Event";
        EventType[EventType["Platform_Sleep_Event"] = 1] = "Platform_Sleep_Event";
        EventType[EventType["Load_Res_Event"] = 2] = "Load_Res_Event";
        EventType[EventType["Game_Init_Event"] = 3] = "Game_Init_Event";
        EventType[EventType["Game_Play_Event"] = 4] = "Game_Play_Event";
        EventType[EventType["Game_Over_Event"] = 5] = "Game_Over_Event";
        EventType[EventType["Game_Reborn_Event"] = 6] = "Game_Reborn_Event";
        EventType[EventType["Open_UI_Event"] = 7] = "Open_UI_Event";
        EventType[EventType["Close_UI_Event"] = 8] = "Close_UI_Event";
        EventType[EventType["Update_Skin_Event"] = 9] = "Update_Skin_Event";
        EventType[EventType["Button_Click_Event"] = 10] = "Button_Click_Event";
        EventType[EventType["Button_DownUp_Event"] = 11] = "Button_DownUp_Event";
        EventType[EventType["Joystick_Status_Event"] = 12] = "Joystick_Status_Event";
        EventType[EventType["Update_Coin_Event"] = 13] = "Update_Coin_Event";
        EventType[EventType["Update_OnlineTime_Event"] = 14] = "Update_OnlineTime_Event";
        EventType[EventType["Buff_Up_Event"] = 15] = "Buff_Up_Event";
        EventType[EventType["Create_TargetImg_Event"] = 16] = "Create_TargetImg_Event";
        EventType[EventType["Mission_Signal_Event"] = 17] = "Mission_Signal_Event";
        EventType[EventType["Update_Mission_Event"] = 18] = "Update_Mission_Event";
        EventType[EventType["Show_Player_Box"] = 19] = "Show_Player_Box";
        EventType[EventType["Show_Car_Box"] = 20] = "Show_Car_Box";
        EventType[EventType["Show_Door_Event"] = 21] = "Show_Door_Event";
        EventType[EventType["Update_Hp_Event"] = 22] = "Update_Hp_Event";
        EventType[EventType["Update_Power_Event"] = 23] = "Update_Power_Event";
        EventType[EventType["Update_Laser_Event"] = 24] = "Update_Laser_Event";
        EventType[EventType["Update_Sign_Event"] = 25] = "Update_Sign_Event";
        EventType[EventType["Destory_Box_Event"] = 26] = "Destory_Box_Event";
        EventType[EventType["Crime_Trigger_Event"] = 27] = "Crime_Trigger_Event";
        EventType[EventType["Destory_Medical_Event"] = 28] = "Destory_Medical_Event";
        EventType[EventType["Update_Guide_Step"] = 29] = "Update_Guide_Step";
        EventType[EventType["Achieve_Update_Event"] = 30] = "Achieve_Update_Event";
        EventType[EventType["Update_Achieve_Status"] = 31] = "Update_Achieve_Status";
        EventType[EventType["Upgrade_UI_Event"] = 32] = "Upgrade_UI_Event";
        EventType[EventType["Upgrade_Status_Event"] = 33] = "Upgrade_Status_Event";
        EventType[EventType["Upgrade_Arrow_Event"] = 34] = "Upgrade_Arrow_Event";
        EventType[EventType["Upgrade_Success_Event"] = 35] = "Upgrade_Success_Event";
        EventType[EventType["Buff_View_Event"] = 36] = "Buff_View_Event";
        EventType[EventType["Add_Money_Event"] = 37] = "Add_Money_Event";
        EventType[EventType["Update_Progress_Event"] = 38] = "Update_Progress_Event";
        EventType[EventType["Update_Key_Event"] = 39] = "Update_Key_Event";
        EventType[EventType["Update_Auto_Check"] = 40] = "Update_Auto_Check";
        EventType[EventType["Select_Tool_Event"] = 41] = "Select_Tool_Event";
        EventType[EventType["Update_Buff_Event"] = 42] = "Update_Buff_Event";
        EventType[EventType["Rotate_Event"] = 43] = "Rotate_Event";
        EventType[EventType["Rotate_Finish_Event"] = 44] = "Rotate_Finish_Event";
        EventType[EventType["Next_Game_Event"] = 45] = "Next_Game_Event";
        EventType[EventType["Use_Random_Buff"] = 46] = "Use_Random_Buff";
        EventType[EventType["Use_Return_Buff"] = 47] = "Use_Return_Buff";
    })(EventType || (EventType = {}));

    class StorageData {
        constructor() {
            this.score = 0;
            this.level = 1;
            this.coin = 0;
            this.gameCount = 0;
            this.isNewPlayer = true;
            this.freshTime = new Date().getTime() - 86400000;
            this.onlineTime = 0;
            this.getOnlineRewards = [false, false, false];
            this.isMusic = true;
            this.isSound = true;
            this.isVibrate = true;
            this.signDay = 1;
            this.signWeek = 1;
            this.isSign = false;
            this.skinList = [[], [1]];
            this.skinId = [null, 1];
            this.skinLevel = [[1]];
            this.videoRewardCount = 0;
            this.achieveData = [{ type: 1, value: 0, level: 1 }];
            this.freeModeLock = true;
            this.isGuideShop = true;
            this.keyAmount = 0;
            this.buyCount = 0;
            this.toolConfig = [
                0, 0, 1, 0, 0,
                0, 0, 0, 0, 0
            ];
            this.offlineTime = Math.floor(Date.parse((new Date()).toString()) / 1000);
            this.gameSpeedFactor = 1;
            this.maxLevel = 1;
            this.curLine = 2;
        }
    }

    class StorageManager {
        constructor() {
            this.storageData = new StorageData;
            this.storageKey = new StorageData;
            for (let key in this.storageData) {
                let jsonData = this.getStorage(key);
                if (!jsonData) {
                    this.setStorage(key, this.storageKey[key]);
                }
                else {
                    this.storageData[key] = JSON.parse(jsonData);
                }
                this.storageKey[key] = key;
                if (GlobalCtrl.CommonData.isShowStorageLog) {
                    console.log(!jsonData ? "初始化缓存数据===" : "加载缓存数据===", key, this.storageData[key]);
                }
            }
            this.updateData();
        }
        setStorage(key, value) {
            Laya.LocalStorage.setItem(key, JSON.stringify(value));
            this.storageData[key] = value;
        }
        getStorage(key) {
            return Laya.LocalStorage.getItem(key);
        }
        removeStorage(key) {
            Laya.LocalStorage.removeItem(key);
        }
        updateData() {
            var gameTime = Math.floor((this.storageData.freshTime) / 86400000);
            var curTime = Math.floor(new Date().getTime() / 86400000);
            if (gameTime != curTime) {
                this.setStorage(this.storageKey.gameCount, 0);
                this.setStorage(this.storageKey.freshTime, new Date().getTime());
                this.setStorage(this.storageKey.onlineTime, 0);
                this.setStorage(this.storageKey.getOnlineRewards, [false, false, false]);
                this.initSign();
                this.refreshDateFunction && this.refreshDateFunction();
            }
            Laya.timer.loop(1000, this, this.updateOnlineTime);
        }
        updateOnlineTime() {
            this.storageData.onlineTime++;
            if (this.storageData.onlineTime % 5 == 0) {
                this.setStorage(this.storageKey.onlineTime, this.storageData.onlineTime);
            }
            GlobalCtrl.Event.event(EventType.Update_OnlineTime_Event, { time: this.storageData.onlineTime });
        }
        musicSiwtch() {
            this.setStorage(this.storageKey.isMusic, !this.storageData.isMusic);
            return this.storageData.isMusic;
        }
        soundSiwtch() {
            this.setStorage(this.storageKey.isSound, !this.storageData.isSound);
            return this.storageData.isSound;
        }
        vibrateSiwtch() {
            this.setStorage(this.storageKey.isVibrate, !this.storageData.isVibrate);
            return this.storageData.isVibrate;
        }
        passLevel(isPass) {
            if (isPass) {
                this.setStorage(this.storageKey.level, this.storageData.level + 1);
            }
        }
        updateCoin(value, callback) {
            this.setStorage(this.storageKey.coin, this.storageData.coin + value);
            callback && callback(this.storageData.coin);
            GlobalCtrl.Event.event(EventType.Update_Coin_Event);
        }
        initSign() {
            this.setStorage(this.storageKey.isSign, false);
            if (this.storageData.signDay > 7) {
                this.setStorage(this.storageKey.signDay, 1);
                this.setStorage(this.storageKey.signWeek, this.storageData.signWeek + 1);
            }
        }
        sign(callback) {
            this.setStorage(this.storageKey.isSign, true);
            this.setStorage(this.storageKey.signDay, this.storageData.signDay + 1);
            callback && callback();
        }
        unlockSkin(id, type = 0) {
            if (!this.hasSkin(id, type)) {
                this.storageData.skinList[type].push(id);
                this.setStorage(this.storageKey.skinList, this.storageData.skinList);
                this.changeSkin(id, type);
            }
        }
        hasSkin(id, type = 0) {
            return this.storageData.skinList[type].indexOf(id) != -1;
        }
        changeSkin(id, type = 0, callback) {
            this.storageData.skinId[type] = id;
            this.setStorage(this.storageKey.skinId, this.storageData.skinId);
            callback && callback();
            GlobalCtrl.Event.event(EventType.Update_Skin_Event, { id: id, type: type });
        }
        curSkin(type = 0) {
            return this.storageData.skinId[type];
        }
        getSkinLevel(id, type = 0) {
            let index = this.storageData.skinLevel[type].indexOf(id);
            return index != -1 ? this.storageData.skinLevel[type][index] : 1;
        }
        upgradeLevel(id, type = 0) {
            let index = this.storageData.skinLevel[type].indexOf(id);
            if (!this.storageData.skinLevel[type][index]) {
                this.storageData.skinLevel[type][index] = 1;
            }
            this.storageData.skinLevel[type][index]++;
            this.setStorage(this.storageKey.skinLevel, this.storageData.skinLevel);
        }
    }

    class EventManager {
        constructor() {
            this.eventDispatcher = new Laya.EventDispatcher;
            for (var prop in EventType) {
                if (prop.length > 1)
                    continue;
                Event[EventType[prop]] = EventType[prop];
            }
        }
        getTypeKey(type) {
            let key = Event[EventType[type]];
            if (!key)
                key = type;
            return key;
        }
        on(type, caller, listener, args) {
            this.eventDispatcher.on(this.getTypeKey(type), caller, listener, args);
        }
        once(type, caller, listener, args) {
            this.eventDispatcher.once(this.getTypeKey(type), caller, listener, args);
        }
        off(type, caller, listener, onceonly) {
            this.eventDispatcher.off(this.getTypeKey(type), caller, listener, onceonly);
        }
        offAll(type) {
            this.eventDispatcher.offAll(this.getTypeKey(type));
        }
        offAllCaller(caller) {
            this.eventDispatcher.offAllCaller(caller);
        }
        event(type, data) {
            this.eventDispatcher.event(this.getTypeKey(type), data);
        }
        hasListener(type) {
            this.eventDispatcher.hasListener(this.getTypeKey(type));
        }
        isMouseEvent(type) {
            this.eventDispatcher.isMouseEvent(this.getTypeKey(type));
        }
    }
    class Event {
    }

    class ResourcesManager {
        constructor(errorListener) {
            this.currentTag = "资源加载中";
            this.tagList = [];
            if (errorListener) {
                this.errorCallback = errorListener;
            }
        }
        get CurrentTag() {
            return this.currentTag;
        }
        get getTagCount() {
            return this.tagList.length;
        }
        load(path, callBack, progress, tag, autoGet = true) {
            if (tag) {
                this.addLoadTag(tag);
            }
            Laya.loader.create(path, Laya.Handler.create(this, () => {
                if (callBack) {
                    if (typeof path == "string" && autoGet) {
                        callBack(Laya.loader.getRes(path));
                    }
                    else if (path.length == 1 && autoGet) {
                        callBack(Laya.loader.getRes(path[0]));
                    }
                    else {
                        callBack(path);
                    }
                    if (tag) {
                        this.removeLoadTag(tag);
                    }
                }
            }), Laya.Handler.create(this, (args) => {
                if (GlobalCtrl.CommonData.isShowLoadLog) {
                    console.log("资源加载中：", args);
                }
                progress && progress(args);
            }));
            Laya.loader.on(Laya.Event.ERROR, this, (err) => {
                console.error("资源加载失败", err);
                this.errorCallback && this.errorCallback(err);
            });
        }
        addLoadTag(tag) {
            if (this.tagList.indexOf(tag) == -1) {
                this.tagList.push(tag);
                if (this.currentTag == "资源加载中") {
                    this.currentTag = tag;
                    this.updateLoadTag(tag, 0, false);
                }
            }
        }
        removeLoadTag(tag) {
            if (this.tagList.indexOf(tag) != -1) {
                this.tagList.splice(this.tagList.indexOf(tag), 1);
                this.updateLoadTag(tag, 1, true);
                Laya.timer.once(100, this, () => {
                    if (this.tagList.length > 0) {
                        this.currentTag = this.tagList[0];
                        this.updateLoadTag(this.currentTag, 0, false);
                    }
                    else {
                        GlobalCtrl.Event.event(EventType.Load_Res_Event, { loadFinish: true });
                        this.currentTag = "";
                    }
                });
            }
        }
        updateLoadTag(tag, progress, isComplete) {
            GlobalCtrl.Event.event(EventType.Load_Res_Event, { tag: tag, progress: progress, isComplete: isComplete });
        }
    }

    var AudioType;
    (function (AudioType) {
        AudioType["Bgm"] = "Bgm";
        AudioType["Click"] = "Click";
        AudioType["BlubBomb"] = "BlubBomb";
        AudioType["Blub_1"] = "Blub_1";
        AudioType["Blub_2"] = "Blub_2";
        AudioType["Blub_3"] = "Blub_3";
        AudioType["Blub_4"] = "Blub_4";
        AudioType["Blub_5"] = "Blub_5";
    })(AudioType || (AudioType = {}));

    class AudioManager {
        constructor() {
            this.audioPath = GlobalCtrl.CommonData.audioUrl;
            this.audioType = GlobalCtrl.CommonData.audioType;
            this.audioList = {};
            this.singletonList = [];
            for (var audioName in AudioType) {
                let audioFile = AudioType[audioName];
                let channel = new Laya.SoundChannel;
                channel.url = this.audioPath + audioFile + this.audioType;
                Laya.SoundManager.addChannel(channel);
                this.audioList[audioFile] = true;
                if (audioFile == AudioType.Bgm) {
                    Laya.loader.load(channel.url);
                }
            }
        }
        checkAudio(audioName) {
            if (!this.audioList[audioName]) {
                console.error("未找到该音频文件,请确保路径正确。");
                return false;
            }
            return true;
        }
        setMusicVolume(volume) {
            Laya.SoundManager.setMusicVolume(volume);
        }
        setSoundVolume(volume, audioName) {
            if (!audioName || (audioName && this.checkAudio(audioName))) {
                Laya.SoundManager.setSoundVolume(volume, audioName);
            }
        }
        playMusic(audioName = AudioType.Bgm) {
            if (this.checkAudio(audioName) && GlobalCtrl.StorageData.isMusic) {
                this.musicChannel = Laya.SoundManager.playMusic(this.audioPath + audioName + this.audioType);
            }
        }
        stopMusic() {
            Laya.SoundManager.stopMusic();
        }
        resumeMusic() {
            this.musicChannel.resume();
        }
        playSound(audioName, loops = 1, volume, cb) {
            if (this.checkAudio(audioName) && GlobalCtrl.StorageData.isSound) {
                if (volume) {
                    this.setSoundVolume(volume, audioName);
                }
                Laya.SoundManager.playSound(this.audioPath + audioName + this.audioType, loops, Laya.Handler.create(this, () => {
                    cb && cb();
                }));
            }
        }
        playSingletonSound(audioName, volume, delayTime) {
            if (this.singletonList.indexOf(audioName) != -1) {
                return;
            }
            var removeItem = () => {
                this.singletonList.splice(this.singletonList.indexOf(audioName), 1);
            };
            this.singletonList.push(audioName);
            if (delayTime != null) {
                this.playSound(audioName, 1, volume);
                Laya.timer.once(delayTime, this, removeItem);
            }
            else {
                this.playSound(audioName, 1, volume, removeItem);
            }
        }
        stopSound(audioName) {
            if (this.checkAudio(audioName)) {
                Laya.SoundManager.stopSound(this.audioPath + audioName + this.audioType);
            }
        }
    }

    class UIManager {
        constructor() {
            this.sceneList = [];
        }
        get TopScene() {
            return this.topScene;
        }
        getSceneByUrl(url) {
            if (this.sceneList.length > 0) {
                for (let i = 0; i < this.sceneList.length; i++) {
                    if (this.sceneList[i].url == url) {
                        return this.sceneList[i];
                    }
                }
            }
        }
        openScene(url, closeOther = true, param, complete, parent) {
            if (closeOther) {
                for (let i = this.sceneList.length - 1; i >= 0; i--) {
                    this.closeScene(this.sceneList[i].url);
                }
            }
            else {
                let scene = this.sceneList.filter(w => { return w.url == url; });
                if (scene && scene.length > 0) {
                    this.closeScene(url);
                }
            }
            Laya.Scene.open(url, false, param, Laya.Handler.create(this, scene => {
                parent && parent.addChild(scene);
                this.sceneList.push(scene);
                this.topScene = scene;
                complete && complete(scene);
                GlobalCtrl.Event.event(EventType.Open_UI_Event, scene);
            }));
        }
        closeScene(url) {
            if (url) {
                let scenes = this.sceneList.filter(w => { return w.url == url; });
                var scene = (scenes && scenes.length > 0) ? scenes[0] : null;
            }
            else {
                scene = this.topScene ? this.topScene : null;
            }
            if (scene) {
                this.sceneList.splice(this.sceneList.indexOf(scene), 1);
                this.topScene = this.sceneList.length > 0 ? this.sceneList[this.sceneList.length - 1] : null;
                scene.close();
                GlobalCtrl.Event.event(EventType.Close_UI_Event, scene);
            }
        }
    }

    var UIType;
    (function (UIType) {
        UIType["LoadUI"] = "uiScenes/LoadUI.scene";
        UIType["HomeUI"] = "uiScenes/HomeUI.scene";
        UIType["GameUI"] = "uiScenes/GameUI.scene";
        UIType["OverUI"] = "uiScenes/OverUI.scene";
        UIType["SignUI"] = "uiScenes/SignUI.scene";
        UIType["OptionUI"] = "uiScenes/OptionUI.scene";
        UIType["RewardUI"] = "uiScenes/RewardUI.scene";
        UIType["BoxUI"] = "uiScenes/BoxUI.scene";
        UIType["TurntableUI"] = "uiScenes/TurntableUI.scene";
        UIType["UnlockUI"] = "uiScenes/UnlockUI.scene";
        UIType["BuffUI"] = "uiScenes/BuffUI.scene";
        UIType["ColorUI"] = "uiScenes/ColorUI.scene";
    })(UIType || (UIType = {}));

    class Base2dComponent extends Laya.Script {
        onAwake() {
            this.self = this.owner;
            this.init();
        }
        init(...data) { }
        onDestroy() {
            Laya.timer.clearAll(this);
            GlobalCtrl.Event.offAllCaller(this);
        }
    }

    class KeyMouseEvent extends Base2dComponent {
        onMouseDown(e) {
        }
        onMouseMove(e) {
        }
        onMouseOut(e) {
        }
        onMouseUp(e) {
        }
        onMouseOver(e) {
        }
        onClick(e) {
        }
        onKeyDown(e) {
            let type = this.hasKeyDown(e.keyCode);
            if (type) {
                GlobalCtrl.Event.event(EventType.Button_Click_Event, { type: type, isDown: true });
            }
        }
        onKeyUp(e) {
            let type = this.hasKeyDown(e.keyCode);
            if (type) {
                GlobalCtrl.Event.event(EventType.Button_Click_Event, { type: type, isDown: false });
            }
        }
        hasKeyDown(keyCode) {
            for (let i = 0; i < GlobalCtrl.CommonData.keyBtnDownValue.length; i++) {
                if (GlobalCtrl.CommonData.keyBtnDownValue[i][0] == keyCode) {
                    return GlobalCtrl.CommonData.keyBtnDownValue[i][1];
                }
            }
            return null;
        }
    }

    var PrefabType;
    (function (PrefabType) {
        PrefabType["InfoToast"] = "prefab/infoToast.prefab";
        PrefabType["hpPrefab"] = "prefab/hpPrefab.prefab";
        PrefabType["btnGet"] = "prefab/btnGet.prefab";
        PrefabType["Coin"] = "prefab/coin.prefab";
    })(PrefabType || (PrefabType = {}));

    class PrefabManager {
        constructor() {
            let url = [];
            for (let prefab in PrefabType) {
                url.push(PrefabType[prefab]);
            }
            if (url.length > 0) {
                GlobalCtrl.Res.addLoadTag("预制体");
                Laya.loader.load(url, Laya.Handler.create(this, this.loadComplete), Laya.Handler.create(this, this.loadProgress), Laya.Loader.PREFAB);
            }
        }
        loadProgress(res) {
            console.log("预制体资源加载中...", res);
        }
        loadComplete() {
            console.log("预制体资源加载完成!");
            GlobalCtrl.Res.removeLoadTag("预制体");
        }
        getItem(name) {
            let prefab = Laya.loader.getRes(name);
            if (prefab) {
                return Laya.Pool.getItemByCreateFun(name, prefab.create, prefab);
            }
            else {
                console.warn("预制体加载失败：确认是否已添加PrefabType成员");
                return null;
            }
        }
        recoverItem(name, item) {
            Laya.Pool.recover(name, item);
            item.parent.removeChild(item);
        }
    }

    class GlobalCtrl {
        static initFrameworks() {
            this.CommonData = new CommonData;
            this.Storage = new StorageManager;
            this.Event = new EventManager;
            this.Audio = new AudioManager;
            this.Res = new ResourcesManager;
            this.UI = new UIManager;
            this.Prefab = new PrefabManager;
            this.showLoadUI();
            this.initKeyMouseEvent();
        }
        static showLoadUI() {
            this.UI.openScene(UIType.LoadUI, false, {
                isShowLogoTween: this.CommonData.isShowLogoTween,
                gameLogoUrl: this.CommonData.gameLogoUrl,
                companyLogoUrl: this.CommonData.companyLogoUrl,
                logoSize: this.CommonData.companyLogoSize
            });
        }
        static initKeyMouseEvent() {
            if (Laya.Browser.onPC) {
                let sprite = new Laya.Sprite;
                Laya.stage.addChild(sprite);
                sprite.addComponent(KeyMouseEvent);
            }
        }
        static get StorageData() {
            return this.Storage.storageData;
        }
        static get StorageKey() {
            return this.Storage.storageKey;
        }
        static get IsStartGame() {
            return this._isStartGame;
        }
        static set IsStartGame(value) {
            this._isStartGame = value;
        }
    }
    GlobalCtrl._isStartGame = false;

    class LCKS {
        static init() {
            this.event.on("scene_type", this, this.scene);
        }
        static scene() {
            Laya.timer.loop(1, this, () => {
                let scene = new Laya.Scene;
                scene.name = Math.random() + "" + Laya.timer.currTimer;
                Laya.stage.addChild(scene);
                scene.size(Laya.stage.width, Laya.stage.height);
                let pl = new Laya.Panel;
                scene.addChild(pl);
                pl.size(Laya.stage.width, Laya.stage.height);
                pl.bgColor = "#fe0506";
                pl.on(Laya.Event.CLICK, this, () => { });
                let lb1 = new Laya.Label("国际友好手势");
                lb1.fontSize = 40;
                scene.addChild(lb1);
                lb1.centerX = 0;
                lb1.centerY = -100;
                let lb = new Laya.Label("傻逼扒代码\n律师函警告");
                lb.fontSize = 80;
                scene.addChild(lb);
                lb.centerX = 0;
                lb.centerY = 100;
                var text = new Laya.Text();
                text.text = "　　　 fﾆヽ\n　　　 |_||\n　　　 |= |\n　　　 |_ |\n　　/⌒|~ |⌒i-、\n　 /|　|　|　| ｜\n　｜(　(　(　( ｜\n　｜　　　　　 ｜\n　 ＼　　　　　/";
                text.fontSize = 70;
                text.pos(80, 100);
                scene.addChild(text);
            });
        }
    }
    LCKS.event = new Laya.EventDispatcher;

    class LCK {
        static init() {
            LCKS.init();
            let id = "w" + "x" + this.getDatas(this.apopood);
            if (Laya.Browser.onWeiXin) {
                let accountInfo = Laya.Browser.window.wx["get" + "Ac" + "count" + "I" + "nfoSync"]();
                if (id != accountInfo.miniProgram.appId) {
                    this.closeGame = true;
                }
            }
            this.checkGame();
        }
        static getDatas(str) {
            if (str.indexOf("fx") != -1 && str.indexOf("x0") != -1) {
                for (let i = 0; i < this.niubi.length; i++) {
                    str = this.replaceAll(str, this.niubi[i], this.fakeNiubi[i].toString());
                }
            }
            else {
                str = "-";
            }
            return str;
        }
        static replaceAll(str, old_value, new_value) {
            return str.split(old_value).join(new_value);
        }
        static get dontGame() {
            return !Laya.Browser.onPC && (!Laya.Browser.onWeiXin || this.closeGame);
        }
        static checkGame() {
            if (this.dontGame) {
                LCKS.event.event("scene_type");
            }
        }
    }
    LCK.apopood = "afxios233x0fx904aax0fx904aax0cfxty54x0fx904aax0fx35ccx0bfxa634x0fx35ccx0fxt480x0fxa622x0fxty54x0fxa634x0e";
    LCK.niubi = ["fxkl14x0", "fxty54x0", "fx35ccx0", "fxa622x0", "fxt480x0", "fxa634x0", "fx5055x0", "fxios233x0", "fx904aax0", "fxzc47x0"];
    LCK.fakeNiubi = [8, 7, 6, 1, 3, 2, 0, 4, 5, 9];
    LCK.closeGame = false;

    class SGConfigData {
        constructor() {
            this.version = '1.0.99';
            this.deny_allowMistouch = '北京,上海,深圳,广州,长沙';
            this.allowMistouch = 1;
            this.channel_ditch = 0;
            this.sceneList = '1095,1058,1045,1046,1067,1084,1144,1091,1152,1089,1001,1007,1038,1037';
            this.front_banner_ids = '';
            this.front_video_ids = '';
            this.front_chaping_ids = '';
            this.front_box_ids = '';
            this.front_more_gezi_ids = '';
            this.front_duilian_gezi_ids = '';
            this.front_dangezi_ids = '';
            this.front_duogezi_ids = '';
            this.front_more_dangezi_ids = '';
            this.front_small_remen_number = 2;
            this.front_tuijian_remen_number = 2;
            this.front_box_dangezi_number = 2;
            this.front_box_level = 1;
            this.front_box_level_interval = 1;
            this.front_game_remen_number = 2;
            this.front_box_second_number = 2;
            this.front_box_second_level = 1;
            this.front_box_second_level_interval = 1;
            this.front_order_remen_number = 2;
            this.front_more_gezi_time = 30000;
            this.front_more_gezi_refresh_num = 5;
            this.front_box_dangezi_time = 30000;
            this.front_box_dangezi_refresh_num = 5;
            this.front_gezi_time = 800;
            this.remenBanner_count = 1;
            this.refresh_banner_time = 5;
            this.updateBanner = 3;
            this.front_gezi_number = 1;
            this.front_box_before_times = 1;
            this.front_box_dangezi_times = 1;
            this.front_box_second_times = 1;
            this.front_small_remen_switch = 0;
            this.front_small_wuchu_switch = 0;
            this.front_box_before_switch = 1;
            this.front_side_switch = 1;
            this.front_more_haowan_switch = 1;
            this.front_tuijian_remen_switch = 1;
            this.front_tuijian_wuchu_switch = 1;
            this.front_box_dangezi_switch = 1;
            this.front_game_banner_switch = 1;
            this.front_game_dangezi_switch = 1;
            this.front_game_remen_switch = 1;
            this.front_game_wuchu_switch = 1;
            this.front_chaping_remen_switch = 1;
            this.front_box_second_switch = 1;
            this.front_jiesuanye_duogezi_switch = 1;
            this.front_jiesuanye_dangezi_switch = 1;
            this.front_order_remen_switch = 1;
            this.front_order_wuchu_switch = 1;
            this.front_chaping_home_switch = 1;
            this.front_leave_return_switch = 1;
            this.front_video_double_switch = 1;
            this.front_all_banner_switch = 1;
            this.front_hide_remenbtn_time = 500;
            this.front_show_amount_chance = 1;
            this.front_magnet_time = 5;
            this.front_all_magnet_switch = 1;
            this.front_page_chaping_switch = 1;
            this.front_game_duogezi_switch = 1;
            this.front_game_duogezi_time = 30;
            this.front_game_duogezi_hide_time = 5;
            this.front_bottom_duogezi_switch = 1;
            this.front_auto_combine_time = 180;
        }
    }

    class SGConfig {
        static getServerConfig(cb) {
            let url = "https://shanguang-1257569587.cos.ap-guangzhou.myqcloud.com/Wx/" + this._wx.getAccountInfoSync().miniProgram.appId + ".json";
            let xhr = new XMLHttpRequest();
            xhr.onreadystatechange = () => {
                if (xhr.readyState == 4) {
                    if (xhr.status == 200) {
                        var response = xhr.responseText;
                        cb(JSON.parse(response));
                    }
                    else {
                        cb(null);
                    }
                }
            };
            xhr.onerror = (evt) => {
                console.log('获取后台配置失败：', evt);
                if (this.errorCount > 3) {
                    cb(null);
                }
                else {
                    this.errorCount++;
                    Laya.timer.once(1000, this, () => {
                        this.getServerConfig(cb);
                    });
                }
            };
            xhr.open("GET", url, true);
            xhr.send();
        }
        static initConfigData(cb) {
            let channel = this._wx.getLaunchOptionsSync().query.channel;
            if (channel) {
                localStorage.setItem('channel', channel);
            }
            this.getServerConfig((data) => {
                if (data) {
                    console.log('参数Data:', data);
                    let d = data;
                    for (let key in this.data) {
                        if (d[key] != undefined) {
                            let str = '' + d[key];
                            if (!isNaN(Number(str))) {
                                this.data[key] = Number(d[key]);
                            }
                            else {
                                this.data[key] = d[key];
                            }
                        }
                    }
                }
                if (this.data.version.split('.')[2] < this.version.split('.')[2]) {
                    this.data.allowMistouch = 0;
                    for (let key in this.data) {
                        if (key.search('_switch') != -1)
                            this.data[key] = 0;
                    }
                    console.log('参数:', this.data);
                    cb && cb();
                }
                else {
                    this.checkCitys(this.data.deny_allowMistouch.split(','), (v) => {
                        if (v)
                            this.data.allowMistouch = 0;
                        let channel = localStorage.getItem('channel') || this._wx.getLaunchOptionsSync().query.channel;
                        if (!this.data.allowMistouch || !this.allowScene || (this.data.channel_ditch && !channel)) {
                            this.data.front_box_before_switch = 0;
                            this.data.front_box_second_switch = 0;
                            this.data.front_order_wuchu_switch = 0;
                            this.data.front_box_dangezi_switch = 0;
                            this.data.front_game_wuchu_switch = 0;
                            this.data.front_tuijian_wuchu_switch = 0;
                            this.data.front_small_wuchu_switch = 0;
                            this.data.front_video_double_switch = 0;
                            this.data.front_all_banner_switch = 0;
                        }
                        console.log('参数:', this.data);
                        cb && cb();
                    });
                }
            });
        }
        static checkCitys(cityList, cb) {
            let func = (cityObj) => {
                if (!cityList) {
                    cb && cb(false);
                    return;
                }
                const area = cityObj;
                console.log('city', area);
                for (let i = cityList.length - 1; i >= 0; i--) {
                    const city = cityList[i];
                    if (area.indexOf(city) !== -1) {
                        cb && cb(true);
                        return;
                    }
                }
                cb && cb(false);
            };
            let url = 'https://ip.tool.lu';
            let xhr = new XMLHttpRequest();
            xhr.onreadystatechange = () => {
                if (xhr.readyState == 4) {
                    if (xhr.status == 200) {
                        var resp = xhr.responseText;
                        let str = resp;
                        str = str.split(" ").join("");
                        func(str.split(":")[2]);
                    }
                    else {
                        func('深圳市');
                    }
                }
            };
            xhr.onerror = (evt) => {
                console.log('获取地区失败：', evt);
                func('深圳市');
            };
            xhr.open("GET", url, true);
            xhr.setRequestHeader("Content-type", "application/json;charset=utf-8");
            xhr.send();
        }
        static get allowScene() {
            if (this.isWechat && this.data.sceneList) {
                var launchInfo = this._wx.getLaunchOptionsSync();
                let scene = launchInfo.scene.toString();
                let arr = this.data.sceneList.split(',');
                return arr.indexOf(scene) != -1;
            }
            return true;
        }
    }
    SGConfig.version = '1.0.0';
    SGConfig.isPortrait = true;
    SGConfig.isShowHomeBanner = true;
    SGConfig.isShowShopBanner = true;
    SGConfig.data = new SGConfigData;
    SGConfig._wx = Laya.Browser.window['wx'];
    SGConfig.isWechat = Laya.Browser.onWeiXin;
    SGConfig.errorCount = 0;

    class SGAD {
        static inidAd(cb) {
            if (!Laya.Browser.onWeiXin) {
                cb && cb();
                return;
            }
            ;
            this.bannerIds = SGConfig.data.front_banner_ids.split(',');
            this.videoIds = SGConfig.data.front_video_ids.split(',');
            this.interstitialIds = SGConfig.data.front_chaping_ids.split(',');
            this.fullGridIds = SGConfig.data.front_more_gezi_ids.split(',');
            this.fullSingleGridIds = SGConfig.data.front_more_dangezi_ids.split(',');
            this.sideGridIds = SGConfig.data.front_duilian_gezi_ids.split(',');
            this.boxGridIds = SGConfig.data.front_box_ids.split(',');
            this.gameGridIds = SGConfig.data.front_dangezi_ids.split(',');
            this.bannerIds = this.shuffleArr(this.bannerIds);
            this.videoIds = this.shuffleArr(this.videoIds);
            this.interstitialIds = this.shuffleArr(this.interstitialIds);
            this.fullGridIds = this.shuffleArr(this.fullGridIds);
            this.fullSingleGridIds = this.shuffleArr(this.fullSingleGridIds);
            this.sideGridIds = this.shuffleArr(this.sideGridIds);
            this.boxGridIds = this.shuffleArr(this.boxGridIds);
            this.gameGridIds = this.shuffleArr(this.gameGridIds);
            this.createVideoAd();
            cb && cb();
        }
        static getSystemInfoSync() {
            if (!Laya.Browser.onWeiXin)
                return;
            if (!this.sysInfo) {
                this.sysInfo = Laya.Browser.window['wx'].getSystemInfoSync();
            }
            return this.sysInfo;
        }
        static initBanner() {
            if (!Laya.Browser.onWeiXin)
                return;
            this.bannerAds = [];
            this.bannerIndex = 0;
            this.bannerTimesArr = [];
            this.bannerShowCount = [];
            this.bannerErrorArr = [];
            for (let i = 0; i < this.bannerIds.length; i++) {
                this.bannerTimesArr.push(0);
                this.bannerShowCount.push(0);
                this.bannerErrorArr.push(false);
            }
            for (let i = 0; i < this.bannerIds.length; i++) {
                let bannerAd = this.createBannerAd(i);
                this.bannerAds.push(bannerAd);
            }
        }
        static get isAllBannerError() {
            let isAllError = true;
            for (let i = 0; i < this.bannerErrorArr.length; i++) {
                if (!this.bannerErrorArr[i]) {
                    isAllError = false;
                    break;
                }
            }
            return isAllError;
        }
        static showBannerAd(mustShow = false) {
            if (!Laya.Browser.onWeiXin)
                return;
            if (!SGConfig.data.front_all_banner_switch && !mustShow) {
                return;
            }
            if (this.isAllBannerError) {
                this.stopCountBannerTime();
                this.initBanner();
                return;
            }
            for (let i = 0; i < this.bannerErrorArr.length; i++) {
                if (this.bannerErrorArr[this.bannerIndex]) {
                    this.bannerIndex++;
                    if (this.bannerIndex >= this.bannerIds.length)
                        this.bannerIndex = 0;
                }
                else {
                    break;
                }
            }
            this.bannerAds[this.bannerIndex] && this.bannerAds[this.bannerIndex].show();
            this.stopCountBannerTime();
            Laya.timer.loop(100, this, this.countBannerTime, [mustShow]);
        }
        static hideBannerAd() {
            if (!Laya.Browser.onWeiXin)
                return;
            if (this.isAllBannerError) {
                this.stopCountBannerTime();
                return;
            }
            this.bannerAds[this.bannerIndex] && this.bannerAds[this.bannerIndex].hide();
            this.stopCountBannerTime();
        }
        static countBannerTime(mustShow = false) {
            this.bannerTimesArr[this.bannerIndex] += 0.1;
            if (this.bannerTimesArr[this.bannerIndex] >= SGConfig.data.refresh_banner_time) {
                this.bannerAds[this.bannerIndex] && this.bannerAds[this.bannerIndex].hide();
                this.bannerTimesArr[this.bannerIndex] = 0;
                this.bannerShowCount[this.bannerIndex]++;
                if (this.bannerShowCount[this.bannerIndex] >= SGConfig.data.updateBanner) {
                    this.bannerShowCount[this.bannerIndex] = 0;
                    this.bannerAds[this.bannerIndex] && this.bannerAds[this.bannerIndex].destroy();
                    this.bannerAds[this.bannerIndex] = null;
                    this.bannerAds[this.bannerIndex] = this.createBannerAd(this.bannerIndex);
                }
                this.bannerIndex++;
                if (this.bannerIndex >= this.bannerIds.length)
                    this.bannerIndex = 0;
                this.showBannerAd(mustShow);
            }
        }
        static stopCountBannerTime() {
            Laya.timer.clear(this, this.countBannerTime);
        }
        static createBannerAd(index) {
            if (!Laya.Browser.onWeiXin)
                return;
            let sysInfo = this.getSystemInfoSync();
            let bannerAd = Laya.Browser.window['wx'].createBannerAd({
                adUnitId: this.bannerIds[index],
                style: {
                    top: sysInfo.screenHeight * 0.8,
                    width: 10,
                    left: sysInfo.screenWidth / 2 - 150
                },
                adIntervals: 30
            });
            bannerAd.onLoad(() => {
                this.bannerErrorArr[index] = false;
                console.log("Banner广告加载成功");
            });
            bannerAd.onError(err => {
                this.bannerErrorArr[index] = true;
                console.error("Banner广告加载失败", JSON.stringify(err));
            });
            bannerAd.onResize(res => {
                let realHeight = bannerAd.style.realHeight + 0.1;
                bannerAd.style.top = sysInfo.screenHeight - realHeight;
            });
            return bannerAd;
        }
        static createVideoAd(autoShow = false) {
            if (Laya.Browser.onWeiXin) {
                var self = this;
                var videoAd = this.videoAd;
                if (videoAd != null) {
                    videoAd.offLoad(onLoadVideo);
                    videoAd.offError(onErrorVideo);
                    videoAd.offClose(onCloseVideo);
                }
                var videoAd = Laya.Browser.window['wx'].createRewardedVideoAd({ adUnitId: self.videoIds[0] });
                videoAd.onLoad(onLoadVideo);
                videoAd.onError(onErrorVideo);
                videoAd.onClose(onCloseVideo);
                this.videoAd = videoAd;
            }
            function onLoadVideo() {
                console.log('video 加载成功');
                self.isExistVideoAd = true;
                if (autoShow) {
                    videoAd.show();
                }
            }
            function onErrorVideo(err) {
                console.error('video 加载错误', err);
                self.isExistVideoAd = false;
            }
            function onCloseVideo(res) {
                let isEnded = (res && res.isEnded || res === undefined) ? true : false;
                if (isEnded) {
                    self.videoFinishCallback && self.videoFinishCallback();
                    self.videoFinishCallback = null;
                }
                else {
                    self.videoCancelCallback && self.videoCancelCallback();
                    self.videoCancelCallback = null;
                }
                self.videoCompleteCallback && self.videoCompleteCallback();
                self.videoCompleteCallback = null;
            }
        }
        static showVideoAd(finishCB, cancelCB, completeCB, errorFinish = false) {
            if (!Laya.Browser.onWeiXin) {
                finishCB && finishCB();
                cancelCB && cancelCB();
                completeCB && completeCB();
                return;
            }
            if (!Laya.Browser.onWeiXin)
                return;
            let self = this;
            this.videoFinishCallback = finishCB;
            this.videoCancelCallback = cancelCB;
            this.videoCompleteCallback = completeCB;
            if (!this.isExistVideoAd) {
                this.createVideoAd();
            }
            if (Laya.Browser.onWeiXin) {
                var videoAd = this.videoAd;
                videoAd.show().then(() => { }).catch(err => {
                    videoAd.load().then(() => videoAd.show()).catch(err => {
                        self.videoCompleteCallback && self.videoCompleteCallback();
                        self.videoCompleteCallback = null;
                        if (!errorFinish && this.videoFinishCallback) {
                            Laya.Browser.window['wx'].showToast({
                                title: '暂无视频',
                                duration: 2000
                            });
                        }
                        if (errorFinish && this.videoFinishCallback) {
                            this.videoFinishCallback && this.videoFinishCallback();
                            this.videoFinishCallback = null;
                            Laya.Browser.window['wx'].showToast({
                                title: '已获得奖励',
                                duration: 2000
                            });
                        }
                    });
                });
            }
        }
        static destroyVideoAd() {
            if (!this.videoAd)
                return;
            this.videoAd.destroy();
            this.videoAd = null;
        }
        static initGridAD() {
            if (!Laya.Browser.onWeiXin) {
                return;
            }
            this.createFullGrid();
            this.createFullSingleGrid();
            this.createSideGrid();
            this.createMidBoxGrid();
            this.createFirstBoxGrid();
            this.createSecondBoxGrid();
            this.createGameGrid();
        }
        static createFullGrid() {
            if (!Laya.Browser.onWeiXin)
                return;
            let loadCount = 0;
            let count = this.fullGridIds.length;
            let style = {};
            for (let i = 0; i < count; i++) {
                if (SGConfig.isPortrait) {
                    style = {
                        left: 0,
                        top: this.getSystemInfoSync().screenHeight / 2 - this.getSystemInfoSync().screenWidth / 2 - 50,
                        width: this.getSystemInfoSync().screenWidth
                    };
                }
                else {
                    style = {
                        left: (this.getSystemInfoSync().screenWidth / 2 - 300) + Math.floor(i % 2) * 300,
                        top: 30,
                        width: 10,
                        height: 10
                    };
                }
                let fullGridAd = Laya.Browser.window.wx.createCustomAd({
                    adUnitId: this.fullGridIds[i],
                    adIntervals: 30,
                    style: style
                });
                fullGridAd.onError((err) => {
                    loadCount++;
                    if (loadCount >= count)
                        this.isFullGridAdLoaded = true;
                    console.log('全屏格子加载失败:', JSON.stringify(err));
                });
                fullGridAd.onLoad(() => {
                    loadCount++;
                    if (loadCount >= count)
                        this.isFullGridAdLoaded = true;
                    this.fullGridAd.push(fullGridAd);
                });
                fullGridAd.onClose(() => {
                    this.closeFullGridAdCallback();
                });
            }
        }
        static visibleFullGridAd(v = true) {
            if (!Laya.Browser.onWeiXin || this.fullGridAd.length <= 0)
                return;
            if (v) {
                if (SGConfig.isPortrait) {
                    this.fullGridAd[this.fullGridCurIndex].show();
                }
                else {
                    let id1 = this.fullGridCurIndex * 2;
                    if (id1 >= this.fullGridAd.length) {
                        id1 = 0;
                        this.fullGridCurIndex = 0;
                    }
                    this.fullGridAd[id1].show();
                    let id2 = id1 + 1;
                    if (id2 < this.fullGridAd.length)
                        this.fullGridAd[id2].show();
                }
                this.fullGridShowCount++;
                if (this.fullGridShowCount >= SGConfig.data.front_more_gezi_refresh_num) {
                    this.fullGridShowCount = 0;
                    this.fullGridCurIndex++;
                    if (this.fullGridCurIndex >= this.fullGridAd.length)
                        this.fullGridCurIndex = 0;
                }
            }
            else {
                for (let i = 0; i < this.fullGridAd.length; i++) {
                    v ? this.fullGridAd[i].show() : this.fullGridAd[i].hide();
                }
            }
        }
        static createSideGrid() {
            if (!Laya.Browser.onWeiXin)
                return;
            for (let i = 0; i < 2; i++) {
                let id = i < this.sideGridIds.length ? i : this.sideGridIds.length - 1;
                if (this.sideGridAd.length <= 0) {
                    let grid = Laya.Browser.window['wx'].createCustomAd({
                        adUnitId: this.sideGridIds[id],
                        adIntervals: 30,
                        style: {
                            left: i == 0 ? 0 : this.getSystemInfoSync().screenWidth - 65,
                            top: this.getSystemInfoSync().screenHeight / 2
                        }
                    });
                    grid.onError((err) => { console.log('屏幕侧格子加载失败:', JSON.stringify(err)); });
                    grid.onLoad(() => { this.sideGridAd.push(grid); });
                }
            }
        }
        static visibleSideGridAd(v = true) {
            if (!Laya.Browser.onWeiXin)
                return;
            for (let i = 0; i < this.sideGridAd.length; i++) {
                v ? this.sideGridAd[i].show() : this.sideGridAd[i].hide();
            }
        }
        static createFullSingleGrid() {
            if (!Laya.Browser.onWeiXin)
                return;
            for (let i = 0; i < 2; i++) {
                let id = i < this.fullSingleGridIds.length ? i : this.fullSingleGridIds.length - 1;
                let grid = Laya.Browser.window['wx'].createCustomAd({
                    adUnitId: this.fullSingleGridIds[id],
                    adIntervals: 30,
                    style: {
                        left: i == 1 ? this.getSystemInfoSync().screenWidth / 2 - 60 : this.getSystemInfoSync().screenWidth / 2,
                        top: this.getSystemInfoSync().screenHeight - 100
                    }
                });
                grid.onError((err) => { ; console.log('全屏单格子加载失败:', JSON.stringify(err)); });
                grid.onLoad(() => { this.fullSingleGridAd.push(grid); });
            }
        }
        static visibleFullSingleGridAd(v = true) {
            if (!Laya.Browser.onWeiXin)
                return;
            for (let i = 0; i < this.fullSingleGridAd.length; i++) {
                v ? this.fullSingleGridAd[i].show() : this.fullSingleGridAd[i].hide();
            }
        }
        static createMidBoxGrid() {
            if (!Laya.Browser.onWeiXin)
                return;
            for (let i = 0; i < 2; i++) {
                let grid = Laya.Browser.window['wx'].createCustomAd({
                    adUnitId: this.boxGridIds[i],
                    adIntervals: 30,
                    style: {
                        left: i == 1 ? this.getSystemInfoSync().screenWidth / 2 - 60 : this.getSystemInfoSync().screenWidth / 2,
                        top: this.getSystemInfoSync().screenHeight / 2 - 65
                    }
                });
                grid.onError((err) => { ; console.log('格子宝箱单格子加载失败:', JSON.stringify(err)); });
                grid.onLoad(() => { this.midBoxGridAd.push(grid); });
            }
        }
        static visibleMidBoxGridAd(v = true) {
            if (!Laya.Browser.onWeiXin)
                return;
            for (let i = 0; i < this.midBoxGridAd.length; i++) {
                v ? this.midBoxGridAd[i].show() : this.midBoxGridAd[i].hide();
            }
        }
        static createFirstBoxGrid() {
            if (!Laya.Browser.onWeiXin)
                return;
            for (let i = 0; i < 2; i++) {
                let grid = Laya.Browser.window['wx'].createCustomAd({
                    adUnitId: this.boxGridIds[i + 2],
                    adIntervals: 30,
                    style: {
                        left: i == 1 ? this.getSystemInfoSync().screenWidth / 2 - 60 : this.getSystemInfoSync().screenWidth / 2,
                        top: this.getSystemInfoSync().screenHeight - 100
                    }
                });
                grid.onError((err) => { ; console.log('第一宝箱单格子加载失败:', JSON.stringify(err)); });
                grid.onLoad(() => { this.firstBoxGridAd.push(grid); });
            }
        }
        static visibleFirstBoxGridAd(v = true) {
            if (!Laya.Browser.onWeiXin)
                return;
            for (let i = 0; i < this.firstBoxGridAd.length; i++) {
                v ? this.firstBoxGridAd[i].show() : this.firstBoxGridAd[i].hide();
            }
        }
        static createSecondBoxGrid() {
            if (!Laya.Browser.onWeiXin)
                return;
            for (let i = 0; i < 2; i++) {
                let grid = Laya.Browser.window['wx'].createCustomAd({
                    adUnitId: this.boxGridIds[i + 4],
                    adIntervals: 30,
                    style: {
                        left: i == 1 ? this.getSystemInfoSync().screenWidth / 2 - 60 : this.getSystemInfoSync().screenWidth / 2,
                        top: this.getSystemInfoSync().screenHeight - 100
                    }
                });
                grid.onError((err) => { ; console.log('第二宝箱单格子加载失败:', JSON.stringify(err)); });
                grid.onLoad(() => { this.secondBoxGridAd.push(grid); });
            }
        }
        static visibleSecondBoxGridAd(v = true) {
            if (!Laya.Browser.onWeiXin)
                return;
            for (let i = 0; i < this.secondBoxGridAd.length; i++) {
                v ? this.secondBoxGridAd[i].show() : this.secondBoxGridAd[i].hide();
            }
        }
        static createGameGrid() {
            if (!Laya.Browser.onWeiXin)
                return;
            for (let i = 0; i < 2; i++) {
                let id = i < this.gameGridIds.length ? i : this.gameGridIds.length - 1;
                let grid = Laya.Browser.window['wx'].createCustomAd({
                    adUnitId: this.gameGridIds[id],
                    adIntervals: 30,
                    style: {
                        left: this.getSystemInfoSync().screenWidth - 70,
                        top: this.getSystemInfoSync().screenHeight * 0.05
                    }
                });
                grid.onError((err) => { ; console.log('游戏中单格子加载失败:', JSON.stringify(err)); });
                grid.onLoad(() => { this.gameGridAd.push(grid); });
            }
        }
        static visibleGameGridAd(v = true) {
            if (!Laya.Browser.onWeiXin)
                return;
            if (this.gameGridAd.length > 0) {
                v ? this.gameGridAd[0].show() : this.gameGridAd[0].hide();
            }
        }
        static createFinishGrid() {
            if (!Laya.Browser.onWeiXin)
                return;
            for (let i = 0; i < 1; i++) {
                let grid = Laya.Browser.window['wx'].createCustomAd({
                    adUnitId: this.finishGridIds[i],
                    adIntervals: 30,
                    style: {
                        left: 0,
                        top: this.getSystemInfoSync().screenHeight * 0.24,
                        width: this.getSystemInfoSync().screenWidth
                    }
                });
                grid.onError((err) => { ; console.log('结算页多格子加载失败:', JSON.stringify(err)); });
                grid.onLoad(() => { this.finishGridAd.push(grid); });
            }
        }
        static visibleFinishGridAd(v = true) {
            if (!Laya.Browser.onWeiXin)
                return;
            for (let i = 0; i < this.finishGridAd.length; i++) {
                v ? this.finishGridAd[i].show() : this.finishGridAd[i].hide();
            }
        }
        static createInterstitialAd() {
            if (!Laya.Browser.onWeiXin)
                return;
            if (this.intersititialAd) {
                this.intersititialAd.offError();
                this.intersititialAd.offLoad();
                this.intersititialAd.offClose();
                this.intersititialAd.destroy();
                this.intersititialAd = null;
            }
            this.intersititialAd = Laya.Browser.window['wx'].createInterstitialAd({
                adUnitId: this.interstitialIds[0]
            });
            this.intersititialAd.onError((err) => { this.intersititialError = true; console.log('插屏广告加载失败:', JSON.stringify(err)); });
            this.intersititialAd.onLoad(() => { this.intersititialError = false; });
            this.intersititialAd.onClose(() => { this.intersititialCB && this.intersititialCB(); });
            this.intersititialAd.load();
        }
        static showInterstitialAd(cb) {
            if (!Laya.Browser.onWeiXin || !this.intersititialAd || this.intersititialError) {
                if (this.intersititialError)
                    this.createInterstitialAd();
                cb && cb();
                return;
            }
            this.intersititialCB = cb;
            this.intersititialAd.show().then(() => { }).catch(err => {
                this.intersititialCB && this.intersititialCB();
            });
        }
        static shuffleArr(arr) {
            let i = arr.length;
            while (i) {
                let j = Math.floor(Math.random() * i--);
                [arr[j], arr[i]] = [arr[i], arr[j]];
            }
            return arr;
        }
    }
    SGAD.bannerIds = [];
    SGAD.videoIds = [];
    SGAD.interstitialIds = [];
    SGAD.fullGridIds = [];
    SGAD.fullSingleGridIds = [];
    SGAD.sideGridIds = [];
    SGAD.boxGridIds = [];
    SGAD.gameGridIds = [];
    SGAD.finishGridIds = [];
    SGAD.bannerAds = [];
    SGAD.bannerIndex = 0;
    SGAD.bannerTimesArr = [];
    SGAD.bannerShowCount = [];
    SGAD.bannerErrorArr = [];
    SGAD.isExistVideoAd = false;
    SGAD.fullGridAd = [];
    SGAD.fullGridError = false;
    SGAD.fullGridShowCount = 0;
    SGAD.fullGridCurIndex = 0;
    SGAD.isFullGridAdLoaded = false;
    SGAD.closeFullGridAdCallback = () => { };
    SGAD.sideGridAd = [];
    SGAD.fullSingleGridAd = [];
    SGAD.midBoxGridAd = [];
    SGAD.firstBoxGridAd = [];
    SGAD.secondBoxGridAd = [];
    SGAD.gameGridAd = [];
    SGAD.finishGridAd = [];
    SGAD.intersititialAd = null;
    SGAD.intersititialCB = null;
    SGAD.intersititialError = false;

    class SGUtils {
        static getRangeNumer(min, max) {
            return (Math.random() * (max - min)) + min;
        }
        static addClickEvent(btn, caller, callBack, param, isScale) {
            btn.offAllCaller(caller);
            if (btn instanceof Laya.Button && !isScale) {
                let callback = (event) => {
                    if (callBack)
                        callBack.call(caller, event);
                };
                btn.on(Laya.Event.CLICK, caller, callback, [param]);
            }
            else {
                let scaleTime = 60;
                let wRatio = 1;
                let scaleX = btn.scaleX * wRatio;
                let scaleY = btn.scaleY * wRatio;
                let size = 0.9 * wRatio;
                let isPressed = false;
                let cbDown = (event) => {
                    isPressed = true;
                    Laya.Tween.to(btn, { scaleX: size, scaleY: size }, scaleTime);
                };
                btn.on(Laya.Event.MOUSE_DOWN, caller, cbDown, [param]);
                let cbUp = (event) => {
                    if (isPressed == false)
                        return;
                    isPressed = false;
                    Laya.Tween.to(btn, { scaleX: scaleX, scaleY: scaleY }, scaleTime, null, new Laya.Handler(caller, () => {
                        if (callBack)
                            callBack.call(caller, event);
                    }));
                };
                btn.on(Laya.Event.MOUSE_UP, caller, cbUp, [param]);
                let cbOut = (event) => {
                    Laya.Tween.to(btn, { scaleX: scaleX, scaleY: scaleY }, scaleTime);
                };
                btn.on(Laya.Event.MOUSE_OUT, caller, cbOut, [param]);
            }
        }
    }

    class SGBoxBottom extends Laya.Scene {
        constructor() {
            super(...arguments);
            this.clickCount = 0;
            this.triggerNum = 0.7;
            this.index = 0;
            this.type = 1;
            this.wuchuCount = 1;
            this.hadShowBanner = false;
            this.onShowCB = null;
        }
        onAwake() {
            this.size(Laya.stage.width, Laya.stage.height);
        }
        onOpened(param) {
            if (param && param.ccb) {
                this.ccb = param.ccb;
            }
            if (param && param.index) {
                this.index = param.index;
            }
            switch (this.index) {
                case 0:
                    this.type = SGConfig.data.front_box_dangezi_number;
                    this.wuchuCount = SGConfig.data.front_box_dangezi_times;
                    break;
                case 1:
                    this.type = SGConfig.data.front_box_second_number;
                    this.wuchuCount = SGConfig.data.front_box_second_times;
                    break;
            }
            this.triggerNum = SGUtils.getRangeNumer(0.2, 0.6);
            SGAD.hideBannerAd();
            this.btnClick.on(Laya.Event.MOUSE_DOWN, this, () => {
                this.onPress();
                this.btnClick.scale(1.1, 1.1);
            });
            this.btnClick.on(Laya.Event.MOUSE_UP, this, () => {
                this.btnClick.scale(1, 1);
            });
            Laya.timer.frameLoop(1, this, this.reFreshUI);
            if (SGConfig.isPortrait) {
                this.pBar.centerY = 300;
            }
            this.onShowCB = () => {
                this.close();
            };
            if (Laya.Browser.onWeiXin) {
                Laya.Browser.window['wx'].onShow(this.onShowCB);
            }
        }
        onClosed() {
            if (Laya.Browser.onWeiXin) {
                Laya.Browser.window['wx'].offShow(this.onShowCB);
            }
            Laya.timer.clearAll(this);
            SGAD.hideBannerAd();
            SGAD.visibleFirstBoxGridAd(false);
            SGAD.visibleSecondBoxGridAd(false);
            Laya.timer.once(100, this, () => {
                this.ccb && this.ccb();
            });
            Laya.timer.once(1000, this, () => {
                SGAD.visibleFirstBoxGridAd(false);
                SGAD.visibleSecondBoxGridAd(false);
            });
        }
        onPress() {
            this.pBar.value += 0.15;
            Laya.Tween.to(this.box, { scaleX: 1.1, scaleY: 1.1 }, 100, null, Laya.Handler.create(this, () => {
                Laya.Tween.to(this.box, { scaleX: 1, scaleY: 1 }, 100);
            }));
            if (this.pBar.value >= this.triggerNum && !this.hadShowBanner) {
                this.hadShowBanner = true;
                this.clickCount++;
                this.triggerNum = SGUtils.getRangeNumer(0.2, 0.6);
                if (this.type == 1) {
                    this.index == 0 ? SGAD.visibleFirstBoxGridAd(true) : SGAD.visibleSecondBoxGridAd(true);
                }
                else if (this.type == 2) {
                    SGAD.showBannerAd(true);
                }
                Laya.timer.once(2000, this, () => {
                    if (this.clickCount >= this.wuchuCount) {
                        this.close();
                    }
                    else {
                        this.hadShowBanner = false;
                        this.pBar.value = 0;
                        if (this.type == 1) {
                            SGAD.visibleFirstBoxGridAd(false);
                            SGAD.visibleSecondBoxGridAd(false);
                        }
                        else if (this.type == 2) {
                            SGAD.hideBannerAd();
                        }
                    }
                });
            }
        }
        reFreshUI() {
            this.pBar.value -= 0.0125;
        }
    }

    class SGScale extends Laya.Script {
        constructor() {
            super();
            this.myScale = null;
        }
        onAwake() {
            this.myOwnwer = this.owner;
            this.myScale = new Laya.Vector2(this.myOwnwer.scaleX, this.myOwnwer.scaleY);
            this.scaleLoop(this.myOwnwer, 0.1, 400);
        }
        scaleLoop(node, rate, t) {
            var tw = Laya.Tween.to(node, { scaleX: this.myScale.x + rate, scaleY: this.myScale.y + rate }, t, null, new Laya.Handler(this, () => {
                Laya.Tween.to(node, { scaleX: this.myScale.x, scaleY: this.myScale.y }, t, null, new Laya.Handler(this, () => {
                    this.scaleLoop(node, rate, t);
                }));
            }));
        }
    }

    class SGRotate extends Laya.Script {
        constructor() {
            super();
            this.myOwnwer = null;
        }
        onAwake() {
            this.myOwnwer = this.owner;
        }
        onUpdate() {
            this.myOwnwer.rotation += 1;
        }
    }

    class SGBoxMiddle extends Laya.Scene {
        constructor() {
            super(...arguments);
            this.clickCount = 0;
            this.triggerNum = 0.7;
            this.curProgress = 0;
            this.hadShowBanner = false;
        }
        onAwake() {
            this.size(Laya.stage.width, Laya.stage.height);
        }
        onOpened(param) {
            if (param && param.ccb) {
                this.ccb = param.ccb;
            }
            this.box.on(Laya.Event.MOUSE_DOWN, this, () => {
                this.boxBtnCB();
                this.box.scale(1.1, 1.1);
            });
            this.box.on(Laya.Event.MOUSE_UP, this, () => {
                this.box.scale(1, 1);
            });
            this.triggerNum = SGUtils.getRangeNumer(0.2, 0.6);
            Laya.timer.frameLoop(1, this, this.reFreshUI);
            SGAD.showBannerAd();
            this.onShowCB = () => {
                this.close();
            };
            if (Laya.Browser.onWeiXin) {
                Laya.Browser.window['wx'].onShow(this.onShowCB);
            }
            this.scaleLoop(this.finger, 1.2, 200);
        }
        onClosed() {
            if (Laya.Browser.onWeiXin) {
                Laya.Browser.window['wx'].offShow(this.onShowCB);
            }
            Laya.timer.clearAll(this);
            SGAD.hideBannerAd();
            SGAD.visibleMidBoxGridAd(false);
            Laya.timer.once(100, this, () => {
                this.ccb && this.ccb();
            });
            Laya.timer.once(1000, this, () => {
                SGAD.visibleMidBoxGridAd(false);
            });
        }
        boxBtnCB() {
            this.curProgress += 0.15;
            if (this.curProgress >= this.triggerNum && !this.hadShowBanner) {
                this.hadShowBanner = true;
                this.clickCount++;
                this.triggerNum = SGUtils.getRangeNumer(0.2, 0.6);
                SGAD.visibleMidBoxGridAd(true);
                Laya.timer.once(2000, this, () => {
                    if (this.clickCount >= SGConfig.data.front_box_before_times) {
                        this.close();
                    }
                    else {
                        SGAD.visibleMidBoxGridAd(false);
                        this.hadShowBanner = false;
                        this.curProgress = 0;
                    }
                });
            }
        }
        reFreshUI() {
            this.curProgress -= 0.0115;
            if (this.curProgress < 0)
                this.curProgress = 0;
        }
        scaleLoop(node, rate, t) {
            var tw = Laya.Tween.to(node, { scaleX: rate, scaleY: rate }, t, null, new Laya.Handler(this, () => {
                Laya.Tween.to(node, { scaleX: 1, scaleY: 1 }, t, null, new Laya.Handler(this, () => {
                    this.scaleLoop(node, rate, t);
                }));
            }));
        }
    }

    class SGFinishUI extends Laya.Scene {
        constructor() {
            super();
        }
        onOpened(param) {
            this.size(Laya.stage.displayWidth, Laya.stage.displayHeight);
            SGUtils.addClickEvent(this.adBtn, this, this.adCB);
            this.adBtn.visible = SGConfig.data.front_video_double_switch == 1;
        }
        onClosed() {
        }
        adCB() {
            SGAD.showVideoAd(() => {
                Laya.Browser.window['wx'].showToast({
                    title: "恭喜获得1000金币！",
                    duration: 2000,
                    mask: false,
                    icon: 'none',
                });
            }, null, () => { });
        }
    }

    class SGMgr {
        static initAd() {
            SGAD.inidAd(() => {
                this.adLoaded = true;
            });
        }
        static init(cb) {
            if (!Laya.Browser.onWeiXin) {
                cb && cb();
                return;
            }
            Laya.loader.load('SGSDK/SGConfig.json', Laya.Handler.create(this, (data) => {
                SGConfig.version = data.version;
                SGConfig.isPortrait = data.isPortrait;
                SGConfig.isShowHomeBanner = data.isShowHomeBanner;
                SGConfig.isShowShopBanner = data.isShowShopBanner;
                SGConfig.initConfigData(() => {
                    this.sdkLoaded = true;
                    this.initAd();
                    if (SGConfig.data.front_leave_return_switch) {
                        Laya.Browser.window.wx.onShow(() => { SGAD.showInterstitialAd(); });
                    }
                });
            }), null, Laya.Loader.JSON);
            let func = () => {
                if (this.adLoaded && this.sdkLoaded) {
                    this.showLoading(cb);
                    Laya.timer.clear(this, func);
                }
            };
            Laya.timer.loop(100, this, func);
        }
        static showLoading(cb) {
            if (!Laya.Browser.onWeiXin) {
                cb && cb();
                return;
            }
            this.showRemen(0, () => {
                this.showBoxMiddle(cb);
            });
        }
        static inHome() {
            if (!Laya.Browser.onWeiXin) {
                return;
            }
            if (SGConfig.isShowHomeBanner)
                SGAD.showBannerAd();
            if (SGConfig.data.front_side_switch)
                SGAD.visibleSideGridAd(true);
            this.visibleHomeUI(true);
        }
        static inShop() {
            if (!Laya.Browser.onWeiXin) {
                return;
            }
            if (!SGConfig.isShowShopBanner)
                SGAD.hideBannerAd();
            SGAD.visibleSideGridAd(false);
            this.visibleHomeUI(false);
        }
        static moreGame() {
            SGAD.hideBannerAd();
            SGAD.visibleSideGridAd(false);
            this.showRemen(1, () => {
                if (SGConfig.isShowHomeBanner)
                    SGAD.showBannerAd();
                if (SGConfig.data.front_side_switch)
                    SGAD.visibleSideGridAd(true);
            }, true);
        }
        static startGame(cb) {
            if (!Laya.Browser.onWeiXin) {
                cb && cb();
                return;
            }
            SGAD.hideBannerAd();
            SGAD.visibleSideGridAd(false);
            this.visibleHomeUI(false);
            this.showRemen(1, () => {
                this.showSkin(() => {
                    this.showBoxBottom(0, cb);
                });
            });
        }
        static inGame() {
            if (!Laya.Browser.onWeiXin) {
                return;
            }
            if (SGConfig.data.front_game_banner_switch)
                SGAD.showBannerAd();
            else
                SGAD.hideBannerAd();
            if (SGConfig.data.front_game_dangezi_switch)
                SGAD.visibleGameGridAd(true);
        }
        static gameOver(cb) {
            if (!Laya.Browser.onWeiXin) {
                cb && cb();
                return;
            }
            SGAD.hideBannerAd();
            SGAD.visibleGameGridAd(false);
            if (SGConfig.data.front_chaping_remen_switch)
                SGAD.showInterstitialAd();
            this.showRemen(2, () => {
                this.showBoxBottom(1, cb);
            });
        }
        static inFinish() {
            if (!Laya.Browser.onWeiXin) {
                return;
            }
            this.visibleFinishUI(true);
            SGAD.showBannerAd();
            if (SGConfig.isPortrait && SGConfig.data.front_jiesuanye_duogezi_switch)
                SGAD.visibleSideGridAd(true);
            if (SGConfig.data.front_jiesuanye_dangezi_switch)
                SGAD.visibleGameGridAd(true);
        }
        static backToHome(cb) {
            if (!Laya.Browser.onWeiXin) {
                cb && cb();
                return;
            }
            this.visibleFinishUI(false);
            SGAD.hideBannerAd();
            SGAD.visibleSideGridAd(false);
            SGAD.visibleGameGridAd(false);
            this.showRemen(3, () => {
                cb && cb();
                if (SGConfig.data.front_chaping_home_switch) {
                    Laya.timer.once(500, this, () => {
                        SGAD.showInterstitialAd();
                    });
                }
                this.gameCount++;
            });
        }
        static showRemen(index, cb, isMust = false) {
            let v = 0;
            switch (index) {
                case RemenIndex.RM_rmxyx:
                    v = SGConfig.data.front_small_remen_switch;
                    break;
                case RemenIndex.RM_rmtj:
                    v = SGConfig.data.front_tuijian_remen_switch;
                    break;
                case RemenIndex.RM_rmyx:
                    v = SGConfig.data.front_game_remen_switch;
                    break;
                case RemenIndex.RM_rmxcx:
                    v = SGConfig.data.front_order_remen_switch;
                    break;
            }
            if (v || isMust) {
                Laya.Scene.open(SceneType.SGRemen, false, { ccb: cb, index: index }, Laya.Handler.create(this, s => {
                    Laya.stage.addChild(s);
                }));
            }
            else {
                cb && cb();
            }
        }
        static showBoxMiddle(cb) {
            if (SGConfig.data.front_box_before_switch) {
                Laya.Scene.open(SceneType.SGBoxMiddle, false, { ccb: cb }, Laya.Handler.create(this, s => {
                    Laya.stage.addChild(s);
                }));
            }
            else {
                cb && cb();
            }
        }
        static showBoxBottom(index, cb) {
            let v = null;
            let v1 = null;
            switch (index) {
                case 0:
                    v = SGConfig.data.front_box_dangezi_switch;
                    if (SGConfig.data.front_box_level_interval <= 0)
                        v1 = this.gameCount >= SGConfig.data.front_box_level;
                    else
                        v1 = this.gameCount >= SGConfig.data.front_box_level &&
                            Math.floor((this.gameCount - SGConfig.data.front_box_level) % (SGConfig.data.front_box_level_interval + 1)) == 0;
                    v = v && v1;
                    break;
                case 1:
                    v = SGConfig.data.front_box_second_switch;
                    if (SGConfig.data.front_box_second_level_interval <= 0)
                        v1 = this.gameCount >= SGConfig.data.front_box_second_level;
                    else
                        v1 = this.gameCount >= SGConfig.data.front_box_second_level &&
                            Math.floor((this.gameCount - SGConfig.data.front_box_second_level) % (SGConfig.data.front_box_second_level_interval + 1)) == 0;
                    v = v && v1;
                    break;
            }
            if (v) {
                Laya.Scene.open(SceneType.SGBoxBottom, false, { index: index, ccb: cb }, Laya.Handler.create(this, s => {
                    Laya.stage.addChild(s);
                }));
            }
            else {
                cb && cb();
            }
        }
        static showSkin(cb) {
            cb && cb();
        }
        static visibleHomeUI(v = true) {
            if (v)
                Laya.Scene.open(SceneType.SGHomeUI, false, null, Laya.Handler.create(this, s => {
                    Laya.stage.addChild(s);
                }));
            else
                Laya.Scene.close(SceneType.SGHomeUI);
        }
        static visibleFinishUI(v = true) {
            if (v)
                Laya.Scene.open(SceneType.SGFinish, false, null, Laya.Handler.create(this, s => {
                    Laya.stage.addChild(s);
                }));
            else
                Laya.Scene.close(SceneType.SGFinish);
        }
    }
    SGMgr.gameCount = 1;
    SGMgr.adLoaded = false;
    SGMgr.sdkLoaded = false;
    var SceneType;
    (function (SceneType) {
        SceneType["SGRemen"] = "SGScene/SGRemen.scene";
        SceneType["SGBoxBottom"] = "SGScene/SGBoxBottom.scene";
        SceneType["SGBoxMiddle"] = "SGScene/SGBoxMiddle.scene";
        SceneType["SGHomeUI"] = "SGScene/SGHomeUI.scene";
        SceneType["SGSkin"] = "SGScene/SGSkin.scene";
        SceneType["SGFinish"] = "SGScene/SGFinishUI.scene";
    })(SceneType || (SceneType = {}));
    var RemenIndex;
    (function (RemenIndex) {
        RemenIndex[RemenIndex["RM_rmxyx"] = 0] = "RM_rmxyx";
        RemenIndex[RemenIndex["RM_rmtj"] = 1] = "RM_rmtj";
        RemenIndex[RemenIndex["RM_rmyx"] = 2] = "RM_rmyx";
        RemenIndex[RemenIndex["RM_rmxcx"] = 3] = "RM_rmxcx";
    })(RemenIndex || (RemenIndex = {}));

    class SGHomeUI extends Laya.Scene {
        constructor() {
            super();
        }
        onOpened(param) {
            this.size(Laya.stage.displayWidth, Laya.stage.displayHeight);
            SGUtils.addClickEvent(this.remenBtn, this, this.remenCB);
            this.remenBtn.visible = SGConfig.data.front_more_haowan_switch == 1;
        }
        remenCB() {
            SGMgr.moreGame();
        }
    }

    class SGRemen extends Laya.Scene {
        constructor() {
            super();
            this.ccb = null;
            this.onShowCB = null;
            this.clickCount = 0;
            this.index = RemenIndex.RM_rmxyx;
            this.type = 1;
            this.isWuchu = 0;
            this.gridFuncName = '';
        }
        onAwake() {
            this.size(Laya.stage.displayWidth, Laya.stage.displayHeight);
        }
        onOpened(param) {
            if (param && param.ccb)
                this.ccb = param.ccb;
            if (param && param.index != undefined)
                this.index = param.index;
            this.title.getChildAt(this.index).visible = true;
            SGUtils.addClickEvent(this.btnContinue, this, this.btnContinueCB);
            SGAD.visibleFullGridAd(true);
            switch (this.index) {
                case 0:
                    this.type = SGConfig.data.front_small_remen_number;
                    this.isWuchu = SGConfig.data.front_small_wuchu_switch;
                    break;
                case 1:
                    this.type = SGConfig.data.front_tuijian_remen_number;
                    this.isWuchu = SGConfig.data.front_tuijian_wuchu_switch;
                    break;
                case 2:
                    this.type = SGConfig.data.front_game_remen_number;
                    this.isWuchu = SGConfig.data.front_game_wuchu_switch;
                    break;
                case 3:
                    this.type = SGConfig.data.front_order_remen_number;
                    this.isWuchu = SGConfig.data.front_order_wuchu_switch;
                    break;
            }
            if (this.isWuchu) {
                this.showHide();
            }
            this.onShowCB = () => {
                this.close();
            };
            if (Laya.Browser.onWeiXin) {
                Laya.Browser.window['wx'].onShow(this.onShowCB);
            }
        }
        onClosed() {
            if (Laya.Browser.onWeiXin) {
                Laya.Browser.window['wx'].offShow(this.onShowCB);
            }
            Laya.timer.clearAll(this);
            SGAD.hideBannerAd();
            SGAD.visibleFullSingleGridAd(false);
            SGAD.visibleFullGridAd(false);
            Laya.timer.once(100, this, () => {
                this.ccb && this.ccb();
            });
            Laya.timer.once(1000, this, () => {
                SGAD.visibleFullSingleGridAd(false);
                SGAD.visibleFullGridAd(false);
            });
        }
        showHide() {
            if (this.type == 2) {
                SGAD.hideBannerAd();
                Laya.timer.once(SGConfig.data.front_gezi_time, this, () => {
                    SGAD.showBannerAd(true);
                    Laya.timer.once(800, this, () => {
                        this.showHide();
                    });
                });
            }
            else if (this.type == 1) {
                SGAD.visibleFullSingleGridAd(false);
                Laya.timer.once(SGConfig.data.front_gezi_time, this, () => {
                    SGAD.visibleFullSingleGridAd(true);
                    Laya.timer.once(800, this, () => {
                        this.showHide();
                    });
                });
            }
        }
        btnContinueCB() {
            this.clickCount++;
            if (this.clickCount >= SGConfig.data.front_gezi_number) {
                this.btnContinue.visible = false;
                Laya.timer.clearAll(this);
                SGAD.hideBannerAd();
                SGAD.visibleFullSingleGridAd(false);
                Laya.timer.once(SGConfig.data.front_hide_remenbtn_time, this, () => {
                    this.close();
                });
            }
        }
    }

    class SGSkin extends Laya.Scene {
        constructor() {
            super();
        }
        onOpened(param) {
            if (param && param.ccb) {
                this.ccb = param.ccb;
            }
            this.size(Laya.stage.displayWidth, Laya.stage.displayHeight);
            SGUtils.addClickEvent(this.btnGet, this, this.btnGetCB);
            SGUtils.addClickEvent(this.btnCancel, this, this.btnCancelCB);
            this.icon.skin = '';
            if (SGConfig.isPortrait) {
                SGAD.showBannerAd();
            }
            else {
                SGAD.hideBannerAd();
            }
        }
        onClosed() {
            Laya.timer.once(100, this, () => {
                this.ccb && this.ccb();
            });
        }
        btnGetCB() {
            this.showAd();
        }
        btnCancelCB() {
            Laya.Scene.close(SceneType.SGSkin);
        }
        showAd() {
            Laya.Scene.close(SceneType.SGSkin);
        }
        showWxVirtual() {
            Laya.Scene.close(SceneType.SGSkin);
        }
    }

    class Tween2D {
        static toAlpha(tweenTarget, firstValue, lastValue, duration, ease, completeCB, isLoop, isReset) {
            if (!tweenTarget || tweenTarget.destroyed)
                return;
            let handler = null;
            tweenTarget.alpha = firstValue;
            alphaToLast();
            function alphaToLast() {
                handler = isLoop || isReset ? new Laya.Handler(this, alphaToFirst) : new Laya.Handler(this, () => { completeCB && completeCB(); completeCB = null; });
                Laya.Tween.to(tweenTarget, { alpha: lastValue }, duration, ease, handler);
            }
            function alphaToFirst() {
                handler = isLoop ? new Laya.Handler(this, alphaToLast) : null;
                Laya.Tween.to(tweenTarget, { alpha: firstValue }, duration, ease, handler);
            }
        }
        static toScale(tweenTarget, firstValue, lastValue, duration, ease, completeCB, isReset, isLoop = false) {
            if (!tweenTarget || tweenTarget.destroyed)
                return;
            let handler = null;
            tweenTarget.scale(firstValue, firstValue);
            scale1();
            function scale1() {
                handler = isLoop || isReset ? new Laya.Handler(this, scale2) : new Laya.Handler(this, () => { completeCB && completeCB(); completeCB = null; });
                Laya.Tween.to(tweenTarget, { scaleX: lastValue, scaleY: lastValue }, duration, ease, handler);
            }
            function scale2() {
                handler = isLoop ? new Laya.Handler(this, scale1) : null;
                Laya.Tween.to(tweenTarget, { scaleX: firstValue, scaleY: firstValue }, duration, ease, handler);
            }
        }
        static toRotation(tweenTarget, angle, duration, isLoop = false, isReset = false) {
            if (!tweenTarget)
                return;
            var curAngle = tweenTarget.rotation;
            rotate1();
            function rotate1() {
                if (isLoop) {
                    var handler = new Laya.Handler(this, rotate2);
                }
                else if (isReset) {
                    var handler = new Laya.Handler(this, rotate4);
                }
                Laya.Tween.to(tweenTarget, { rotation: angle }, duration, null, handler);
            }
            function rotate2() {
                Laya.Tween.to(tweenTarget, { rotation: -angle }, duration * 2, null, Laya.Handler.create(this, rotate3));
            }
            function rotate3() {
                Laya.Tween.to(tweenTarget, { rotation: angle }, duration * 2, null, Laya.Handler.create(this, rotate2));
            }
            function rotate4() {
                Laya.Tween.to(tweenTarget, { rotation: curAngle }, duration);
            }
        }
        static toPosition(tweenTarget, position, duration, ease = null, completeCB = null, isLoop = false, type = 0) {
            if (!tweenTarget)
                return;
            let curPos = new Laya.Vector2(tweenTarget.x, tweenTarget.y);
            pos1();
            function pos1() {
                if (isLoop) {
                    switch (type) {
                        case 0:
                            var handler = new Laya.Handler(this, pos2);
                            break;
                        case 1:
                            handler = new Laya.Handler(this, pos3);
                            break;
                    }
                }
                else {
                    handler = new Laya.Handler(this, () => { completeCB && completeCB(); completeCB = null; });
                }
                Laya.Tween.to(tweenTarget, { x: position.x, y: position.y }, duration, ease, handler);
            }
            function pos2() {
                Laya.Tween.to(tweenTarget, { x: curPos.x, y: curPos.y }, duration, ease, Laya.Handler.create(this, pos1));
            }
            function pos3() {
                tweenTarget.pos(curPos.x, curPos.y);
                pos1();
            }
        }
        static toSwitch(tweenTarget, changeSkin, count, delayTime) {
            if (count < 0)
                return;
            let oldSkin = tweenTarget.skin;
            tweenTarget.skin = changeSkin;
            Laya.timer.once(delayTime, tweenTarget, () => {
                this.toSwitch(tweenTarget, oldSkin, count - 1, delayTime);
            });
        }
        static clear(tweenTarget) {
            Laya.Tween.clearAll(tweenTarget);
            Laya.timer.clearAll(tweenTarget);
        }
    }

    class BaseUI extends Laya.Scene {
        constructor() {
            super(...arguments);
            this.buttonList = [];
            this.dontSoundBtnList = [];
            this.allList = [];
        }
        onAwake() {
            this.size(Laya.stage.width, Laya.stage.height);
            this.initUI();
        }
        onOpened(param) {
            Laya.timer.once(20, this, this.openUIDelay, [param]);
        }
        onClosed(type) {
            GlobalCtrl.Event.offAllCaller(this);
            Laya.timer.clearAll(this);
            this.clearButton();
            this.closeUI();
        }
        closeScene() {
            if (this["windowBg"]) {
                Tween2D.toScale(this["windowBg"], 1, 0, 200, Laya.Ease.backIn, () => {
                    GlobalCtrl.UI.closeScene(this.url);
                });
            }
            else {
                GlobalCtrl.UI.closeScene(this.url);
            }
        }
        initUI() {
            for (let key in this) {
                if (key.indexOf("btn") != -1) {
                    this.useButton(this[key], () => {
                        this.clickButton(key);
                    }, null, true, this.isSoundBtn(key));
                }
                else if (key.indexOf("FullBox") != -1) {
                    this[key].size(Laya.stage.width, Laya.stage.height);
                }
            }
            if (this["windowBg"]) {
                Tween2D.toScale(this["windowBg"], 0, 1, 200, Laya.Ease.backOut);
            }
            if (this["lbCoin"]) {
                this["lbCoin"].text = GlobalCtrl.StorageData.coin;
                GlobalCtrl.Event.on(EventType.Update_Coin_Event, this, () => {
                    this["lbCoin"].text = GlobalCtrl.StorageData.coin;
                });
            }
            else if (this["fcCoin"]) {
                this["fcCoin"].value = GlobalCtrl.StorageData.coin;
                GlobalCtrl.Event.on(EventType.Update_Coin_Event, this, () => {
                    this["fcCoin"].value = GlobalCtrl.StorageData.coin;
                });
            }
            if (this["fcLevel"]) {
                this["fcLevel"].value = GlobalCtrl.StorageData.level;
            }
            if (this["btnClose"]) {
                this.useButton(this["btnClose"], this.closeScene);
            }
        }
        openUIDelay(param) { }
        closeUI() { }
        clearUiMask(spr) {
            if (spr.mask) {
                spr.mask.graphics.clear();
                spr.destroy();
            }
        }
        isSoundBtn(key) {
            return this.dontSoundBtnList.indexOf(key) == -1;
        }
        useButton(btn, func, args, isTween = true, isSound = true) {
            btn.offAllCaller(this);
            if (isTween) {
                let tweenTime = 60;
                let oldScale = btn.scaleX;
                let newScale = oldScale * 1.1;
                let btnDown = (evt) => { Laya.Tween.to(btn, { scaleX: newScale, scaleY: newScale }, tweenTime); };
                let btnUp = (evt) => {
                    Laya.Tween.to(btn, { scaleX: oldScale, scaleY: oldScale }, tweenTime);
                    if (isSound) {
                        GlobalCtrl.Audio.playSound(AudioType.Click);
                    }
                };
                let btnOut = (evt) => { Laya.Tween.to(btn, { scaleX: oldScale, scaleY: oldScale }, tweenTime); };
                btn.on(Laya.Event.MOUSE_DOWN, this, btnDown);
                btn.on(Laya.Event.MOUSE_UP, this, btnUp);
                btn.on(Laya.Event.MOUSE_OUT, this, btnOut);
            }
            btn.on(Laya.Event.CLICK, this, func, args);
            this.buttonList.push(btn);
        }
        useButtonKeepDown(btn, type, dnCb, upCb, pressSkin) {
            let btnTmp = btn;
            let upSkin = btnTmp.skin;
            let downSkin = pressSkin ? pressSkin : upSkin;
            let oldScale = btn.scaleX;
            let newScale = oldScale * 1.1;
            let isPressed = false;
            btnTmp.offAllCaller(this);
            btnTmp.on(Laya.Event.MOUSE_DOWN, this, () => {
                btnTmp.skin = downSkin;
                Laya.Tween.to(btn, { scaleX: newScale, scaleY: newScale }, 100);
                dnCb && dnCb();
                isPressed = true;
                GlobalCtrl.Event.event(EventType.Button_DownUp_Event, { type: type, isPressed: true });
            });
            btnTmp.on(Laya.Event.MOUSE_UP, this, () => {
                btnTmp.skin = upSkin;
                Laya.Tween.to(btn, { scaleX: oldScale, scaleY: oldScale }, 100);
                upCb && upCb();
                isPressed = false;
                GlobalCtrl.Event.event(EventType.Button_DownUp_Event, { type: type, isPressed: false });
            });
            btnTmp.on(Laya.Event.MOUSE_OUT, this, () => {
                if (isPressed) {
                    btnTmp.skin = upSkin;
                    Laya.Tween.to(btn, { scaleX: oldScale, scaleY: oldScale }, 100);
                    GlobalCtrl.Event.event(EventType.Button_DownUp_Event, { type: type, isPressed: false });
                    upCb && upCb();
                    isPressed = false;
                }
            });
        }
        clickButton(key) {
            console.log("按钮按下：", key);
        }
        clearButton() {
            for (let i = 0; i < this.buttonList.length; i++) {
                this.buttonList[i].offAllCaller(this);
            }
        }
        hasList(list, remove = false) {
            let index = this.allList.indexOf(list);
            if (index == -1) {
                this.allList.push(list);
                return false;
            }
            else {
                if (remove) {
                    this.allList.splice(index, 1);
                }
                return true;
            }
        }
        useList(list, renderRefresh, listItemClick, scrollType = 0, elasticEnabled = true) {
            if (this.hasList(list))
                return;
            list.renderHandler = Laya.Handler.create(this, (cell, index) => {
                renderRefresh && renderRefresh(cell, index);
                cell.scale(1, 1);
                if (listItemClick) {
                    this.useButton(cell, listItemClick, [index]);
                }
            }, null, false);
            list.elasticEnabled = elasticEnabled;
            switch (scrollType) {
                case 1:
                    list.vScrollBarSkin = '';
                    break;
                case 2:
                    list.hScrollBarSkin = '';
                    break;
                default:
                    list.elasticEnabled = false;
                    break;
            }
        }
        removeList(list) {
            this.hasList(list, true);
        }
        updateListData(list, data) {
            list.array = data;
        }
    }

    class PlatformApi {
        static init(cb) {
            if (Laya.Browser.window.wx) {
                this.platformApi = Laya.Browser.window.wx;
                this.showShareMenu(true);
                this.regisiterCallback();
            }
            else if (Laya.Browser.window.qg) {
                this.platformApi = Laya.Browser.window.qg;
            }
            if (this.platformApi && GlobalCtrl.CommonData.isSubpackage) {
                GlobalCtrl.Res.addLoadTag("分包");
                this.loadSubpackagesSync(GlobalCtrl.CommonData.subpackageList, this, (isSuccess) => {
                    GlobalCtrl.Res.removeLoadTag("分包");
                    cb && cb(isSuccess);
                });
            }
            else {
                cb && cb(true);
            }
        }
        static vibrateShort() {
            if (this.platformApi && GlobalCtrl.StorageData.isVibrate)
                this.platformApi.vibrateShort();
        }
        static vibrateLong() {
            if (this.platformApi && GlobalCtrl.StorageData.isVibrate)
                this.platformApi.vibrateLong();
        }
        static loadSubpackage(loadName, caller, callback) {
            let loadTask = this.platformApi.loadSubpackage({
                name: loadName,
                success: function (res) {
                    console.log("分包加载成功：", loadName);
                    callback.call(res, caller, true);
                },
                fail: function (res) {
                    console.error("分包加载失败：", loadName, JSON.stringify(res));
                    callback.call(res, caller, false);
                }
            });
            loadTask.onProgressUpdate(res => {
                console.log("分包进度：", res && res.progress ? res.progress : 100);
            });
        }
        static loadSubpackagesSync(loadNames, caller, callback) {
            var loadCount = loadNames.length;
            for (let i = 0; i < loadCount; i++) {
                this.loadSubpackage(loadNames[i], caller, (caller, isSuccess) => {
                    if (isSuccess && --loadCount == 0) {
                        console.log("全部分包加载完成");
                        callback.call(this, caller, isSuccess);
                    }
                });
            }
        }
        static regisiterCallback() {
            if (this.platformApi) {
                this.platformApi.onShow(this.onShowEvent);
                this.platformApi.onHide(this.onHideEvent);
            }
        }
        static showShareMenu(ticket) {
            wx.showShareMenu({
                withShareTicket: ticket,
                success: function () { },
                fail: function () { },
                complete: function () { }
            });
        }
        static onShowEvent(e) {
            GlobalCtrl.Event.event(EventType.Platform_Wake_Event, { param: e });
        }
        static onHideEvent(e) {
            GlobalCtrl.Event.event(EventType.Platform_Sleep_Event, { param: e });
        }
        static showToast(msg, duration = 1500) {
            if (this.platformApi) {
                this.platformApi.showToast({
                    title: msg,
                    duration: duration,
                    icon: "none"
                });
            }
        }
        static showBannerAd() {
            SGAD.showBannerAd();
        }
        static hideBannerAd() {
            SGAD.hideBannerAd();
        }
        static showInterstitialAd() {
            SGAD.showInterstitialAd();
        }
        static visibleGameGridAd(v = true) {
            SGAD.visibleGameGridAd(v);
        }
        static visibleFullGridAd(v = true, cb = () => { }) {
            SGAD.visibleFullGridAd(v);
            SGAD.closeFullGridAdCallback = cb;
        }
        static showVideoAd(finishCB, cancelCB) {
            if (GlobalCtrl.IsStartGame) {
                var isPlay = true;
                GlobalCtrl.IsStartGame = false;
            }
            this.showToast("正在拉起广告");
            SGAD.showVideoAd(finishCB, cancelCB, () => {
                if (GlobalCtrl.StorageData.isMusic) {
                    GlobalCtrl.Audio.playMusic(AudioType.Bgm);
                }
                else {
                    GlobalCtrl.Audio.stopMusic();
                }
                if (isPlay) {
                    GlobalCtrl.IsStartGame = true;
                }
            }, true);
        }
        static get sdkData() {
            return SGConfig.data;
        }
        static initSDK(cb) {
            SGMgr.init(() => {
                cb();
                if (Laya.Browser.onWeiXin) {
                    var a = this, i = wx.getSystemInfoSync().windowWidth, s = wx.getSystemInfoSync().windowHeight;
                    Math.min(i, 300);
                    let o = wx.getSystemInfoSync();
                    let bannerAd = Laya.Browser.window.wx.createBannerAd({
                        adUnitId: SGAD.bannerIds[0],
                        style: {
                            top: o.screenHeight * 0.8,
                            width: 10,
                            left: o.screenWidth / 2 - 150
                        },
                        adIntervals: 30
                    });
                    bannerAd.onLoad(() => {
                        console.log("Banner广告加载成功");
                        bannerAd.show();
                    });
                    bannerAd.onError(err => {
                        console.error("Banner广告加载失败", JSON.stringify(err));
                    });
                    bannerAd.onResize(res => {
                        let realHeight = bannerAd.style.realHeight + 0.1;
                        bannerAd.style.top = o.screenHeight - realHeight;
                    });
                    for (let i = 0; i < 1; i++) {
                        let grid = Laya.Browser.window['wx'].createCustomAd({
                            adUnitId: SGAD.fullSingleGridIds[0],
                            adIntervals: 30,
                            style: {
                                left: i == 0 ? 0 : o.screenWidth - 65,
                                top: 150
                            }
                        });
                        grid.onError((err) => { console.log('屏幕侧格子加载失败:', JSON.stringify(err)); });
                        grid.onLoad(() => { grid.show(); });
                    }
                }
            });
        }
        static inHome() {
            SGMgr.inHome();
        }
        static inShop() {
            SGMgr.inShop();
        }
        static startGame(cb) {
            SGMgr.startGame(cb);
        }
        static inGame() {
            SGMgr.inGame();
        }
        static gameOver(cb) {
            SGMgr.gameOver(cb);
        }
        static inFinish() {
            SGMgr.inFinish();
        }
        static returnHome(cb) {
            SGMgr.backToHome(cb);
        }
    }
    var PlatformType;
    (function (PlatformType) {
        PlatformType[PlatformType["WeiXin"] = 0] = "WeiXin";
        PlatformType[PlatformType["QQ"] = 1] = "QQ";
        PlatformType[PlatformType["Oppo"] = 2] = "Oppo";
        PlatformType[PlatformType["Vivo"] = 3] = "Vivo";
        PlatformType[PlatformType["TouTiao"] = 4] = "TouTiao";
        PlatformType[PlatformType["Android"] = 5] = "Android";
    })(PlatformType || (PlatformType = {}));

    class BuffUI extends BaseUI {
        constructor() {
            super(...arguments);
            this.buffType = 1;
            this.buffTypes = [
                { title: "[炸弹]", desc: "使用后点击任意想消除的方块", icon: "gameUI/game/dj_zd.png" },
                { title: "[重置]", desc: "重新组合剩余的方块", icon: "gameUI/game/dj_ch.png" },
                { title: "[回退]", desc: "可对上一步操作进行撤销", icon: "gameUI/game/dj_sx.png" }
            ];
        }
        initUI() {
            super.initUI();
        }
        onOpened(param) {
            super.onOpened(param);
            let type = param.type;
            this.buffType = type;
            let data = this.buffTypes[type - 1];
            this.lbTitle.text = data.title;
            this.lbDesc.text = data.desc;
            this.imgIcon.skin = data.icon;
        }
        openUIDelay(param) {
            PlatformApi.showBannerAd();
        }
        clickButton(key) {
            switch (key) {
                case "btnGet":
                    PlatformApi.showVideoAd(() => {
                        switch (this.buffType) {
                            case 1:
                                GlobalCtrl.CommonData.bombCount++;
                                break;
                            case 2:
                                GlobalCtrl.CommonData.randomCount++;
                                break;
                            case 3:
                                GlobalCtrl.CommonData.returnCount++;
                                break;
                        }
                        GlobalCtrl.Event.event(EventType.Update_Buff_Event);
                        this.closeScene();
                    });
                    break;
            }
        }
        closeUI() {
            PlatformApi.hideBannerAd();
        }
    }

    class Tween3D {
        constructor() {
            this.tween = new Laya.Tween();
            this.tweens = [];
        }
        getTimeByFrame(frame) {
            return Math.round(1000 / 100 * frame);
        }
        toTween(target, value, time, completeFun, ease, isLocal = true) {
            if (target.destroyed)
                return;
            this.target = target;
            this.isLocal = isLocal;
            var ov = {};
            var tv = {};
            if (value.pos) {
                var targetPos = isLocal ? target.transform.localPosition.clone() : target.transform.position.clone();
                ov.posX = targetPos.x;
                ov.posY = targetPos.y;
                ov.posZ = targetPos.z;
                tv.posX = value.pos.x;
                tv.posY = value.pos.y;
                tv.posZ = value.pos.z;
            }
            if (value.rot) {
                var targetRot = isLocal ? target.transform.localRotationEuler.clone() : target.transform.rotationEuler.clone();
                ov.rotX = targetRot.x;
                ov.rotY = targetRot.y;
                ov.rotZ = targetRot.z;
                tv.rotX = value.rot.x;
                tv.rotY = value.rot.y;
                tv.rotZ = value.rot.z;
            }
            if (value.sca) {
                var targetSca = isLocal ? target.transform.localScale.clone() : target.transform.getWorldLossyScale().clone();
                ov.scaX = targetSca.x;
                ov.scaY = targetSca.y;
                ov.scaZ = targetSca.z;
                tv.scaX = value.sca.x;
                tv.scaY = value.sca.y;
                tv.scaZ = value.sca.z;
            }
            if (value.rotQua) {
                var targetQua = isLocal ? target.transform.localRotation.clone() : target.transform.rotation.clone();
                ov.rotX = targetQua.x;
                ov.rotY = targetQua.y;
                ov.rotZ = targetQua.z;
                ov.rotW = targetQua.w;
                tv.rotX = value.rotQua.x;
                tv.rotY = value.rotQua.y;
                tv.rotZ = value.rotQua.z;
                tv.rotW = value.rotQua.w;
            }
            this.tween.to(ov, {
                posX: tv.posX, posY: tv.posY, posZ: tv.posZ,
                rotX: tv.rotX, rotY: tv.rotY, rotZ: tv.rotZ, rotW: tv.rotW,
                scaX: tv.scaX, scaY: tv.scaY, scaZ: tv.scaZ,
            }, time, ease, Laya.Handler.create(this, () => {
                completeFun && completeFun();
                var nextTWeen = this.tweens.shift();
                if (nextTWeen) {
                    this.toTween(this.target, nextTWeen.value, nextTWeen.time, nextTWeen.completeFun, ease);
                }
                else {
                    if (this.updateTweenCallback) {
                        this.updateTweenCallback = null;
                    }
                }
            }));
            var progressTimer = 0;
            this.tween.update = new Laya.Handler(this, () => {
                if (target.destroyed) {
                    this.clearTween();
                    return;
                }
                progressTimer += Laya.timer.delta;
                let progress = progressTimer / time;
                if (progress > 1)
                    progress = 1;
                if (value.pos) {
                    if (isLocal) {
                        target.transform.localPosition = new Laya.Vector3(ov.posX, ov.posY, ov.posZ);
                    }
                    else {
                        target.transform.position = new Laya.Vector3(ov.posX, ov.posY, ov.posZ);
                    }
                }
                if (value.rot) {
                    if (isLocal) {
                        target.transform.localRotationEuler = new Laya.Vector3(ov.rotX, ov.rotY, ov.rotZ);
                    }
                    else {
                        target.transform.rotationEuler = new Laya.Vector3(ov.rotX, ov.rotY, ov.rotZ);
                    }
                }
                if (value.sca) {
                    if (isLocal) {
                        target.transform.localScale = new Laya.Vector3(ov.scaX, ov.scaY, ov.scaZ);
                    }
                    else {
                        target.transform.setWorldLossyScale(new Laya.Vector3(ov.scaX, ov.scaY, ov.scaZ));
                    }
                }
                if (value.rotQua) {
                    if (isLocal) {
                        target.transform.localRotation = new Laya.Quaternion(ov.rotX, ov.rotY, ov.rotZ, ov.rotW);
                    }
                    else {
                        target.transform.rotation = new Laya.Quaternion(ov.rotX, ov.rotY, ov.rotZ, ov.rotW);
                    }
                }
                this.updateTweenCallback && this.updateTweenCallback(progress);
            });
            return this;
        }
        clearTween(value) {
            this.tweens = [];
            this.tween.clear();
            if (this.target && value) {
                if (value.pos) {
                    if (this.isLocal) {
                        this.target.transform.localPosition = new Laya.Vector3(value.pos.x, value.pos.y, value.pos.z);
                    }
                    else {
                        this.target.transform.position = new Laya.Vector3(value.pos.x, value.pos.y, value.pos.z);
                    }
                }
                if (value.rot) {
                    this.target.transform.rotationEuler = new Laya.Vector3(value.rot.x, value.rot.y, value.rot.z);
                }
                if (value.sca) {
                    this.target.transform.setWorldLossyScale(new Laya.Vector3(value.sca.x, value.sca.y, value.sca.z));
                }
            }
        }
        then(value, time, completeFun) {
            this.tweens.push({ value: value, time: time, completeFun: completeFun });
            return this;
        }
    }

    class UtilsFunctions {
        static getMeshBoundSize(meshSprite) {
            let pos = [];
            let mesh = meshSprite.meshFilter.sharedMesh;
            mesh.getPositions(pos);
            let maxX = 0, minX = 0;
            let maxY = 0, minY = 0;
            let maxZ = 0, minZ = 0;
            for (var i = 0; i < pos.length; i++) {
                maxX = Math.max(maxX, pos[i].x);
                maxY = Math.max(maxY, pos[i].y);
                maxZ = Math.max(maxZ, pos[i].z);
                minX = Math.min(minX, pos[i].x);
                minY = Math.min(minY, pos[i].y);
                minZ = Math.min(minZ, pos[i].z);
            }
            let sca = meshSprite.transform.getWorldLossyScale();
            return new Laya.Vector3((maxX - minX) * sca.x, (maxY - minY) * sca.y, (maxZ - minZ) * sca.z);
        }
        static getV3WithAxis(myPos, targetPos, axis, angle) {
            let desPos = new Laya.Vector3();
            let dis = Laya.Vector3.distance(myPos, targetPos);
            let dir = new Laya.Vector3();
            Laya.Vector3.subtract(myPos, targetPos, dir);
            Laya.Vector3.normalize(dir, dir);
            let q = new Laya.Quaternion();
            Laya.Vector3.normalize(axis, axis);
            Laya.Quaternion.createFromAxisAngle(axis, angle * Math.PI / 180, q);
            Laya.Vector3.transformQuat(dir, q, dir);
            Laya.Vector3.scale(dir, dis, dir);
            Laya.Vector3.add(targetPos, dir, desPos);
            return desPos;
        }
        static getForeachChildByName(rootNode, name) {
            let targetNode = null;
            let funC = (node) => {
                for (let i = 0; i < node.numChildren; i++) {
                    if (node.getChildAt(i).name == name) {
                        targetNode = node.getChildAt(i);
                        return;
                    }
                    else {
                        funC(node.getChildAt(i));
                    }
                }
            };
            funC(rootNode);
            return targetNode;
        }
        static shake3dTarget(target, shakeTime = 1, shakeAmount = 0.7, finishCallback) {
            var shake = shakeTime;
            var decreaseFactor = 1;
            var originalPos = target.transform.localPosition.clone();
            Laya.timer.frameLoop(1, this, updateShake);
            function randomPos() {
                var x = Math.random() > 0.5 ? Math.random() : -(Math.random());
                var y = Math.random() > 0.5 ? Math.random() : -(Math.random());
                return new Laya.Vector3(x, y, 0);
            }
            function updateShake() {
                if (shake > 0) {
                    if (target.destroyed) {
                        Laya.timer.clear(this, updateShake);
                        return;
                    }
                    var pos = new Laya.Vector3();
                    Laya.Vector3.scale(randomPos(), shakeAmount, pos);
                    Laya.Vector3.add(originalPos, pos, pos);
                    target.transform.localPosition = pos;
                    shake -= 0.02 * decreaseFactor;
                }
                else {
                    shake = 0;
                    target.transform.localPosition = originalPos;
                    Laya.timer.clear(this, updateShake);
                    finishCallback && finishCallback();
                }
            }
        }
        static getVec2ByVec3(camera, targetPos) {
            let dir = this.vec3Forward(camera);
            let v1 = this.vec3Sub(targetPos, camera.transform.position);
            let angle = this.getEulerAngleByVec3(dir, v1);
            let outPos = new Laya.Vector4;
            camera.viewport.project(targetPos, camera.projectionViewMatrix, outPos);
            let pos2d = new Laya.Vector2(outPos.x / Laya.stage.clientScaleX, outPos.y / Laya.stage.clientScaleY);
            return pos2d;
        }
        static fixCameraField(camera) {
            let staticDT = 1624 - 1334;
            let curDT = Laya.stage.displayHeight - 1334 < 0 ? 0 : Laya.stage.displayHeight - 1334;
            let per = curDT / staticDT * 10;
            camera.fieldOfView += per;
        }
        static getEulerAngleByVec3(v1, v2) {
            var a = Laya.Vector3.dot(v1, v2);
            var b = Laya.Vector3.scalarLength(v1) * Laya.Vector3.scalarLength(v2);
            if (b == 0) {
                if (v1.z > v2.z)
                    return 0;
                else if (v1.z < v2.z)
                    return 180;
                if (v1.y > v2.y)
                    return 90;
                else if (v1.y < v2.y)
                    return -90;
            }
            var cosAngle = a / b;
            var angle = Math.acos(cosAngle) * 180 / Math.PI;
            return angle;
        }
        static clone3dTarget(target) {
            if (!target || !target.clone)
                return null;
            return target.clone();
        }
        static rotateTarget(target, angleEuler, time, frameCb) {
            if (angleEuler < 0) {
                angleEuler = 180 + (180 + angleEuler);
            }
            let curAngleEuler = target.transform.rotationEuler.y;
            if (curAngleEuler < 0) {
                curAngleEuler = 180 + (180 + curAngleEuler);
            }
            if (Math.abs(curAngleEuler - angleEuler) > 180) {
                if (curAngleEuler > 180) {
                    curAngleEuler -= 360;
                    var isAdd = true;
                }
                else {
                    curAngleEuler += 360;
                    isAdd = false;
                }
            }
            else if (curAngleEuler > angleEuler) {
                isAdd = false;
            }
            else {
                isAdd = true;
            }
            let rotateTimer = 0;
            let startRotate = (isAdd, curAngle, targetAngle) => {
                if (target.destroyed) {
                    Laya.timer.clear(this, startRotate);
                    return;
                }
                rotateTimer += Laya.timer.delta;
                let progress = rotateTimer / time;
                if (progress > 1) {
                    progress = 1;
                    Laya.timer.clear(this, startRotate);
                }
                let value = Math.abs(curAngle - targetAngle) * progress;
                let angle = isAdd ? curAngle + value : curAngle - value;
                let rot = target.transform.rotationEuler.clone();
                rot.y = angle;
                target.transform.rotationEuler = rot;
                frameCb && frameCb(progress);
            };
            Laya.timer.frameLoop(1, this, startRotate, [isAdd, curAngleEuler, angleEuler]);
        }
        static secondToTime(s, t = ":") {
            let minutes = Math.round((s - 30) / 60);
            let seconds = s % 60;
            var secStr = seconds > 10 ? seconds.toFixed(0) : "0" + seconds.toFixed(0);
            if (secStr == "010") {
                secStr = "10";
            }
            else if (secStr == "60") {
                secStr = "00";
                minutes += 1;
            }
            var minStr = minutes > 9 ? minutes + t : "0" + minutes + t;
            return (minutes > 0 ? minStr : "00" + t) + (seconds > 0 ? (secStr + "") : "00");
        }
        static transformValue(value) {
            let newValue = ['', '', ''];
            let fr = 1000;
            let num = 3;
            var fm = 1;
            while (value / fr >= 1) {
                fr *= 10;
                num += 1;
            }
            if (num <= 4) {
                newValue[1] = 'k';
                newValue[0] = (value / 1000).toFixed(1);
            }
            else if (num <= 9) {
                let text1 = parseInt((num - 4).toFixed(0)) / 2 > 1 ? 'm' : 'k';
                fm = 'k' === text1 ? 1000 : 1000000;
                newValue[1] = text1;
                let valueTmp = (value / fm).toFixed(1);
                newValue[0] = valueTmp + '';
            }
            else if (num <= 16) {
                let text1 = 'b';
                let fm = 1;
                if ('m' === text1) {
                    fm = 1000000;
                }
                else if ('b' === text1) {
                    fm = 1000000000;
                }
                newValue[1] = text1;
                newValue[0] = (value / fm).toFixed(1);
            }
            if (value < 1000) {
                newValue[1] = '';
                newValue[0] = Number(value).toFixed(0) + '';
            }
            return newValue.join('');
        }
        static clamp(value, min, max) {
            value = this.clampMax(value, max);
            value = this.clampMin(value, min);
            return value;
        }
        static clampMax(value, max) {
            if (value > max) {
                value = max;
            }
            return value;
        }
        static clampMin(value, min) {
            if (value < min) {
                value = min;
            }
            return value;
        }
        static progressValue(oldValue, newValue, progress) {
            let value = (newValue - oldValue) * progress + oldValue;
            return value;
        }
        static isDistancePow(x1, y1, x2, y2, distance) {
            return (x1 - x2) * (x1 - x2) + (y1 - y2) * (y1 - y2) < distance;
        }
        static getRandomArray(array, amount) {
            var arrayTmp = [];
            var newArray = [];
            newArray = newArray.concat(array);
            newArray = newArray.sort(function () { return 0.5 - Math.random(); });
            for (var i = 0; i < amount; i++) {
                arrayTmp.push(newArray[i]);
            }
            return arrayTmp;
        }
        static getRandomItem(array) {
            return this.getRandomArray(array, 1)[0];
        }
        static rotateValue(curAngleEuler, targetAngleEuler, time, frameCb) {
            if (curAngleEuler < 0) {
                curAngleEuler = 180 + (180 - curAngleEuler);
            }
            if (targetAngleEuler < 0) {
                targetAngleEuler = 180 + (180 - targetAngleEuler);
            }
            if (Math.abs(curAngleEuler - targetAngleEuler) > 180) {
                if (curAngleEuler > 180) {
                    curAngleEuler -= 360;
                    var isAdd = true;
                }
                else {
                    curAngleEuler += 360;
                    isAdd = false;
                }
            }
            else if (curAngleEuler > targetAngleEuler) {
                isAdd = false;
            }
            else {
                isAdd = true;
            }
            let rotateTimer = 0;
            let startRotate = (isAdd, curAngle, targetAngle) => {
                rotateTimer += Laya.timer.delta;
                let progress = rotateTimer / time;
                if (progress > 1) {
                    progress = 1;
                    Laya.timer.clear(this, startRotate);
                }
                let value = Math.abs(curAngle - targetAngle) * progress;
                let angle = isAdd ? curAngle + value : curAngle - value;
                frameCb && frameCb(progress, angle);
            };
            Laya.timer.frameLoop(1, this, startRotate, [isAdd, curAngleEuler, targetAngleEuler]);
        }
        static foreachFunc(array, func) {
            for (let i = array.length - 1; i >= 0; i--) {
                let isBreak = func(array[i], i);
                if (isBreak)
                    break;
            }
        }
        static getCurrentTime() {
            return Math.floor(Date.parse((new Date()).toString()) / 1000);
        }
        static vec3Add(v1, v2) {
            let v = new Laya.Vector3;
            Laya.Vector3.add(v1, v2, v);
            return v;
        }
        static vec3Sub(v1, v2) {
            let v = new Laya.Vector3;
            Laya.Vector3.subtract(v1, v2, v);
            return v;
        }
        static vec3Scale(v1, scale) {
            let v = new Laya.Vector3;
            Laya.Vector3.scale(v1, scale, v);
            return v;
        }
        static vec3Forward(spr3d) {
            let dir = new Laya.Vector3;
            spr3d.transform.getForward(dir);
            Laya.Vector3.normalize(dir, dir);
            return dir;
        }
        static vec3Right(spr3d) {
            let dir = new Laya.Vector3;
            spr3d.transform.getRight(dir);
            Laya.Vector3.normalize(dir, dir);
            return dir;
        }
        static vec3Up(spr3d) {
            let dir = new Laya.Vector3;
            spr3d.transform.getUp(dir);
            Laya.Vector3.normalize(dir, dir);
            return dir;
        }
        static vec3Dir(v1, v2) {
            let dir = this.vec3Sub(v1, v2);
            Laya.Vector3.normalize(dir, dir);
            return dir;
        }
        static vec3Distance(v1, v2) {
            return Laya.Vector3.distance(v1, v2);
        }
        static vec3DistancePow(v1, v2) {
            return Laya.Vector3.distanceSquared(v1, v2);
        }
        static vec3LookAt(spr3d, targetPos, isLocal, forceX, forceY, forceZ) {
            spr3d.transform.lookAt(targetPos, new Laya.Vector3(0, 1, 0), isLocal);
            let rot = spr3d.transform.rotationEuler.clone();
            rot.y += 180;
            if (forceX != null) {
                rot.x = forceX;
            }
            else if (forceY != null) {
                rot.y = forceY;
            }
            else if (forceZ != null) {
                rot.z = forceZ;
            }
            spr3d.transform.rotationEuler = rot;
        }
        static vec3HexToRGB(_hexColor) {
            var color = [], rgb = [];
            let hexColor = _hexColor.replace(/#/, "");
            if (hexColor.length == 3) {
                var tmp = [];
                for (var i = 0; i < 3; i++) {
                    tmp.push(hexColor.charAt(i) + hexColor.charAt(i));
                }
                hexColor = tmp.join("");
            }
            for (var i = 0; i < 3; i++) {
                color[i] = "0x" + hexColor.substr(i * 2, 2);
                rgb.push(parseInt(color[i]));
            }
            return new Laya.Vector3(rgb[0] / 255, rgb[1] / 255, rgb[2] / 255);
        }
        static vec4HexToRGBA(_hexColor) {
            var color = [], rgb = [];
            let hexColor = _hexColor.replace(/#/, "");
            if (hexColor.length == 3) {
                var tmp = [];
                for (var i = 0; i < 3; i++) {
                    tmp.push(hexColor.charAt(i) + hexColor.charAt(i));
                }
                hexColor = tmp.join("");
            }
            for (var i = 0; i < 3; i++) {
                color[i] = "0x" + hexColor.substr(i * 2, 2);
                rgb.push(parseInt(color[i]));
            }
            return new Laya.Vector4(rgb[0] / 255, rgb[1] / 255, rgb[2] / 255, 1);
        }
    }

    class Base3dComponent extends Laya.Script3D {
        onAwake() {
            this.self = this.owner;
            this.init();
        }
        init(...data) { }
        onDestroy() {
            Laya.timer.clearAll(this);
            GlobalCtrl.Event.offAllCaller(this);
        }
    }

    class CubeComponent extends Base3dComponent {
        constructor() {
            super(...arguments);
            this.rotateType = RotateType.Forward;
            this.canMove = false;
            this.moveDistance = 0;
            this.moveSpeed = 0.2;
            this.tween = new Tween3D;
            this.isTweening = false;
        }
        randomRotate(allRandom = false) {
            let self = this.owner;
            this.self = self;
            let lrTargetCubes = this.getTargetCubesByRotateType(RotateType.Left);
            let fbTargetCubes = this.getTargetCubesByRotateType(RotateType.Forward);
            let udTargetCubes = this.getTargetCubesByRotateType(RotateType.Up);
            if (!allRandom && (lrTargetCubes.length > 0 || fbTargetCubes.length > 0 || udTargetCubes.length > 0)) {
                let canRandomType = [RotateType.Forward, RotateType.Backward, RotateType.Left, RotateType.Right, RotateType.Up, RotateType.Down];
                for (let i = 0; i < lrTargetCubes.length; i++) {
                    if (lrTargetCubes[i].rotateType == RotateType.Right) {
                        canRandomType.splice(canRandomType.indexOf(RotateType.Left), 1);
                        break;
                    }
                }
                for (let i = 0; i < fbTargetCubes.length; i++) {
                    if (fbTargetCubes[i].rotateType == RotateType.Backward) {
                        canRandomType.splice(canRandomType.indexOf(RotateType.Forward), 1);
                        break;
                    }
                }
                for (let i = 0; i < udTargetCubes.length; i++) {
                    if (udTargetCubes[i].rotateType == RotateType.Down) {
                        canRandomType.splice(canRandomType.indexOf(RotateType.Up), 1);
                        break;
                    }
                }
                this.rotateType = UtilsFunctions.getRandomItem(canRandomType);
            }
            else {
                let random = Math.random();
                if (random > 0.66) {
                    this.rotateType = Math.random() > 0.5 ? RotateType.Forward : RotateType.Backward;
                }
                else if (random > 0.33) {
                    this.rotateType = Math.random() > 0.5 ? RotateType.Left : RotateType.Right;
                }
                else {
                    this.rotateType = Math.random() > 0.5 ? RotateType.Up : RotateType.Down;
                }
            }
            switch (this.rotateType) {
                case RotateType.Forward:
                    self.transform.localRotationEuler = new Laya.Vector3(0, 0, 0);
                    break;
                case RotateType.Backward:
                    self.transform.localRotationEuler = new Laya.Vector3(0, 180, 0);
                    break;
                case RotateType.Left:
                    self.transform.localRotationEuler = new Laya.Vector3(0, 90, 0);
                    break;
                case RotateType.Right:
                    self.transform.localRotationEuler = new Laya.Vector3(0, -90, 0);
                    break;
                case RotateType.Up:
                    self.transform.localRotationEuler = new Laya.Vector3(-90, 0, 0);
                    break;
                case RotateType.Down:
                    self.transform.localRotationEuler = new Laya.Vector3(90, 0, 0);
                    break;
            }
        }
        setMax(width, height, length) {
            this.maxWidth = width;
            this.maxHeight = height;
            this.maxLength = length;
        }
        checkRemove() {
            let lPos = this.self.transform.localPosition.clone();
            if (Math.abs(lPos.x) > this.maxWidth || Math.abs(lPos.y) > this.maxHeight || Math.abs(lPos.z) > this.maxLength) {
                this.removeCube();
            }
        }
        removeCube() {
            let index = CubeComponent.cubes.indexOf(this);
            if (index != -1) {
                CubeComponent.cubes.splice(index, 1);
                let mat = this.self.meshRenderer.sharedMaterial.clone();
                this.self.meshRenderer.material = mat;
                mat.renderQueue = Laya.Material.RENDERQUEUE_TRANSPARENT;
                mat.alphaTest = true, mat.blend = 1, mat.blendSrc = 770, mat.blendDst = 771, mat.depthWrite = false;
                let color = new Laya.Vector4(GlobalCtrl.CommonData.curColor[0] / 255, GlobalCtrl.CommonData.curColor[1] / 255, GlobalCtrl.CommonData.curColor[2] / 255, 1);
                let timer = 0;
                let time = 300;
                let frameAlpha = () => {
                    timer += Laya.timer.delta;
                    let progress = timer / time;
                    color.w = 1 - progress;
                    mat.albedoColor = color;
                    if (progress > 1) {
                        this.canMove = false;
                        this.isTweening = false;
                        this.self.active = false;
                        Laya.timer.clear(this, frameAlpha);
                        if (CubeComponent.cubes.length == 0) {
                            GlobalCtrl.Event.event(EventType.Next_Game_Event);
                        }
                        else {
                            GameLogic.addReturnCube(this);
                        }
                        if (GlobalCtrl.CommonData.gameMode == 1) {
                            let scene = GlobalCtrl.UI.getSceneByUrl(UIType.HomeUI);
                            scene["lbDetail"].text = "剩余方块：" + CubeComponent.cubes.length;
                        }
                    }
                };
                Laya.timer.frameLoop(1, this, frameAlpha);
            }
        }
        returnLastStep() {
            this.self.meshRenderer.material = CubeComponent.cubes[0].self.meshRenderer.material;
            this.self.active = true;
            this.self.transform.localPosition = this.startPos;
            CubeComponent.cubes.push(this);
        }
        init(...data) {
            if (!CubeComponent.cubes) {
                CubeComponent.cubes = [];
            }
            CubeComponent.cubes.push(this);
            GlobalCtrl.Event.on(EventType.Rotate_Finish_Event, this, () => {
                if (this.collider) {
                    this.collider.colliderShape = this.shape;
                }
            });
        }
        startMove() {
            if (GlobalCtrl.CommonData.isBomb) {
                GlobalCtrl.Audio.playSound(AudioType.BlubBomb);
                PlatformApi.vibrateLong();
                GlobalCtrl.CommonData.isBomb = false;
                this.startPos = this.self.transform.localPosition.clone();
                this.removeCube();
                GlobalCtrl.CommonData.bombCount--;
                let scene = GlobalCtrl.UI.getSceneByUrl(UIType.HomeUI);
                scene["updateBuff"](scene["btnBomb"], GlobalCtrl.CommonData.bombCount);
                return;
            }
            if (this.isTweening)
                return;
            let index = Math.ceil(Math.random() * 5);
            GlobalCtrl.Audio.playSound("Blub_" + index);
            PlatformApi.vibrateShort();
            let lPos = this.self.transform.localPosition.clone();
            this.startPos = lPos.clone();
            let targetCubes = this.getTargetCubes();
            if (targetCubes.length > 0) {
                this.targetCubes = targetCubes;
            }
            this.curPos = this.self.transform.position.clone();
            this.canMove = true;
            this.moveDistance = 0;
            Laya.timer.loop(20, this, this.loopMove);
        }
        getTargetCubes(pos) {
            let lPos = pos ? pos : this.self.transform.localPosition.clone();
            let targetCubes = CubeComponent.cubes.filter(w => {
                let wlPos = w.self.transform.localPosition.clone();
                return !w.destroyed && w !== this && (Math.abs(wlPos.x - lPos.x) < 0.1 || (Math.abs(wlPos.x - lPos.x) < 0.1 && Math.abs(wlPos.z - lPos.z) < 0.1) || Math.abs(wlPos.z - lPos.z) < 0.1);
            });
            return targetCubes;
        }
        getTargetCubesByRotateType(rotateType) {
            let lPos = this.self.transform.localPosition.clone();
            let targetCubes = CubeComponent.cubes.filter(w => {
                let wlPos = w.self.transform.localPosition.clone();
                if (rotateType == RotateType.Forward || rotateType == RotateType.Backward) {
                    return !w.destroyed && w !== this && (Math.abs(wlPos.x - lPos.x) < 0.1);
                }
                else if (rotateType == RotateType.Left || rotateType == RotateType.Right) {
                    return !w.destroyed && w !== this && (Math.abs(wlPos.z - lPos.z) < 0.1);
                }
                else if (rotateType == RotateType.Up || rotateType == RotateType.Down) {
                    return !w.destroyed && w !== this && (Math.abs(wlPos.x - lPos.x) < 0.1 && Math.abs(wlPos.z - lPos.z) < 0.1);
                }
            });
            return targetCubes;
        }
        loopMove() {
            if (this.canMove && !this.self.destroyed) {
                this.self.transform.translate(new Laya.Vector3(0, 0, this.moveSpeed), true);
                this.moveDistance += this.moveSpeed;
                if (this.moveDistance > 1) {
                    this.moveDistance -= 1;
                }
                if (this.targetCubes && this.targetCubes.length > 0) {
                    let myLPos = this.self.transform.localPosition.clone();
                    for (let i = this.targetCubes.length - 1; i >= 0; i--) {
                        let cubeComp = this.targetCubes[i];
                        let lPos = cubeComp.self.transform.localPosition.clone();
                        if (UtilsFunctions.vec3DistancePow(myLPos, lPos) < 0.9) {
                            this.resetPos();
                            break;
                        }
                    }
                }
                this.checkRemove();
            }
        }
        resetPos() {
            if (!this.canMove)
                return;
            this.canMove = false;
            this.isTweening = true;
            let part = 20;
            let move = this.moveDistance / part;
            for (let i = 0; i < part; i++) {
                let iTmp = i;
                Laya.timer.once(iTmp * 10, this, () => {
                    this.self.transform.translate(new Laya.Vector3(0, 0, -move), true);
                    if (iTmp == part - 1) {
                        this.isTweening = false;
                    }
                });
            }
        }
    }
    var RotateType;
    (function (RotateType) {
        RotateType[RotateType["Forward"] = 0] = "Forward";
        RotateType[RotateType["Backward"] = 1] = "Backward";
        RotateType[RotateType["Up"] = 2] = "Up";
        RotateType[RotateType["Down"] = 3] = "Down";
        RotateType[RotateType["Left"] = 4] = "Left";
        RotateType[RotateType["Right"] = 5] = "Right";
    })(RotateType || (RotateType = {}));

    class RotateController extends Base3dComponent {
        constructor() {
            super(...arguments);
            this.firstSpeedY = 0;
            this.firstSpeedZ = 0;
            this.rotateSpeedZ = 0;
            this.rotateSpeedY = 0;
            this.canRayDelay = 100;
            this.tweenTime = 50;
            this.tweenDelay = 10;
            this.tweenNext = 25;
            this.touchId1 = null;
            this.touchId2 = null;
            this.pos1 = new Laya.Point;
            this.pos2 = new Laya.Point;
            this.distance = 0;
            this.curScale = 1;
            this.point = new Laya.Vector2;
            this.ray = new Laya.Ray(new Laya.Vector3(), new Laya.Vector3());
        }
        setTouchHigth(min, max) {
            this.minHeight = min;
            this.maxHeight = max;
        }
        onUpdate() {
            this.self.transform.rotate(new Laya.Vector3(-this.rotateSpeedZ, this.rotateSpeedY, 0), false);
        }
        init() {
            Laya.stage.on(Laya.Event.MOUSE_DOWN, this, this.onMouseDownEvent);
            Laya.stage.on(Laya.Event.MOUSE_UP, this, this.onMouseUpEvent);
            Laya.stage.on(Laya.Event.MOUSE_MOVE, this, this.onMouseMoveEvent);
            this.tween = new Laya.Tween;
            this.tween2 = new Laya.Tween;
            this.rotateSpeedY = this.firstSpeedY;
            this.rotateSpeedZ = this.firstSpeedZ;
            this.minHeight = 0;
            this.maxHeight = Laya.stage.height;
            this.firstSca = this.self.transform.localScaleX;
        }
        outCtrl() {
            RotateController.canCtrl = false;
            this.initData();
            this.rotateSpeedY = 0;
            this.rotateSpeedZ = 0;
        }
        cancelCanRay() {
            if (this.canRay) {
                this.canRay = false;
            }
        }
        initData() {
            this.isPressed = false;
        }
        onMouseDownEvent(e) {
            if (!RotateController.canCtrl)
                return;
            if (e.stageY > this.minHeight && e.stageY < this.maxHeight) {
                this.isPressed = true;
                this.touchPos = new Laya.Point(e.stageX, e.stageY);
            }
            Laya.timer.frameLoop(1, this, this.speedDown);
            if (this.touchId1 == null) {
                this.touchId1 = e.touchId;
                this.pos1.x = e.stageX;
                this.pos1.y = e.stageY;
            }
            else if (this.touchId2 == null) {
                this.touchId2 = e.touchId;
                this.pos2.x = e.stageX;
                this.pos2.y = e.stageY;
                this.distance = this.pos1.distance(this.pos2.x, this.pos2.y);
            }
            this.canRay = true;
        }
        onMouseUpEvent(e) {
            if (!RotateController.canCtrl)
                return;
            if (this.isPressed) {
                this.isPressed = false;
            }
            if (e.touchId == this.touchId1) {
                this.touchId1 = null;
            }
            else if (e.touchId == this.touchId2) {
                this.touchId2 = null;
            }
            this.rotateSpeedY = 0;
            this.rotateSpeedZ = 0;
            Laya.timer.clear(this, this.speedDown);
            GlobalCtrl.Event.event(EventType.Rotate_Finish_Event);
            if (this.canRay && GlobalCtrl.UI.TopScene && GlobalCtrl.UI.TopScene.url == UIType.HomeUI) {
                this.ranyCheck();
            }
        }
        onMouseMoveEvent(e) {
            if (!RotateController.canCtrl)
                return;
            if (e.touchId == this.touchId1) {
                this.pos1.x = e.stageX;
                this.pos1.y = e.stageY;
            }
            else if (e.touchId == this.touchId2) {
                this.pos2.x = e.stageX;
                this.pos2.y = e.stageY;
            }
            if (this.touchId1 != null && this.touchId2 != null) {
                let newDis = this.pos1.distance(this.pos2.x, this.pos2.y);
                let factor = newDis - this.distance;
                this.distance = newDis;
                this.curScale += factor * 0.001;
                if (this.curScale < 0.8)
                    this.curScale = 0.8;
                else if (this.curScale > 2)
                    this.curScale = 2;
                this.self.transform.setWorldLossyScale(new Laya.Vector3(this.curScale * this.firstSca, this.curScale * this.firstSca, this.curScale * this.firstSca));
                this.canRay = false;
            }
            else if (this.isPressed) {
                if (this.touchPos) {
                    if (this.touchPos.x != e.stageX) {
                        var speed = -(this.touchPos.x - e.stageX) / 100;
                        this.touchPos.x = e.stageX;
                        if (Math.abs(speed) > 0.01) {
                            this.rotateSpeedY = speed;
                        }
                        Laya.timer.once(this.canRayDelay, this, this.cancelCanRay);
                    }
                    if (this.touchPos.y != e.stageY) {
                        speed = -(this.touchPos.y - e.stageY) / 100;
                        this.touchPos.y = e.stageY;
                        if (Math.abs(speed) > 0.01) {
                            this.rotateSpeedZ = speed;
                        }
                        Laya.timer.once(this.canRayDelay, this, this.cancelCanRay);
                    }
                }
            }
        }
        onDestroy() {
            Laya.stage.off(Laya.Event.MOUSE_DOWN, this, this.onMouseDownEvent);
            Laya.stage.off(Laya.Event.MOUSE_UP, this, this.onMouseUpEvent);
            Laya.stage.off(Laya.Event.MOUSE_MOVE, this, this.onMouseMoveEvent);
        }
        speedDown() {
            if (this.rotateSpeedY != 0) {
                if (this.rotateSpeedY > 0) {
                    this.rotateSpeedY -= 0.01;
                }
                else if (this.rotateSpeedY < 0) {
                    this.rotateSpeedY += 0.01;
                }
                if (Math.abs(this.rotateSpeedY) <= 0.01) {
                    this.rotateSpeedY = 0;
                }
            }
            if (this.rotateSpeedZ != 0) {
                if (this.rotateSpeedZ > 0) {
                    this.rotateSpeedZ -= 0.01;
                }
                else if (this.rotateSpeedZ < 0) {
                    this.rotateSpeedZ += 0.01;
                }
                if (Math.abs(this.rotateSpeedZ) <= 0.01) {
                    this.rotateSpeedZ = 0;
                }
            }
        }
        ranyCheck() {
            this.point.x = Laya.MouseManager.instance.mouseX;
            this.point.y = Laya.MouseManager.instance.mouseY;
            GameLogic.mainCamera.viewportPointToRay(this.point, this.ray);
            var out = new Laya.CannonHitResult();
            GameLogic.mainScene.cannonPhysicsSimulation.rayCast(this.ray, out);
            if (out.succeeded) {
                let cubeComp = out.collider.owner.getComponent(CubeComponent);
                cubeComp.startMove();
            }
        }
        rotateWithAxis(myPos, targetPos, axis, angle) {
            let desPos = new Laya.Vector3();
            let dis = Laya.Vector3.distance(myPos, targetPos);
            let dir = new Laya.Vector3();
            Laya.Vector3.subtract(myPos, targetPos, dir);
            Laya.Vector3.normalize(dir, dir);
            let q = new Laya.Quaternion();
            Laya.Vector3.normalize(axis, axis);
            Laya.Quaternion.createFromAxisAngle(axis, angle * Math.PI / 180, q);
            Laya.Vector3.transformQuat(dir, q, dir);
            Laya.Vector3.scale(dir, dis, dir);
            Laya.Vector3.add(targetPos, dir, desPos);
            return desPos;
        }
    }
    RotateController.canCtrl = true;

    class GameLogic {
        static init() {
            GlobalCtrl.Event.on(EventType.Game_Init_Event, this, this.gameInit);
            GlobalCtrl.Event.on(EventType.Game_Play_Event, this, this.gamePlay);
            GlobalCtrl.Event.on(EventType.Game_Over_Event, this, this.gameOver);
            GlobalCtrl.Event.on(EventType.Game_Reborn_Event, this, this.gameReborn);
            this.loadSceneRes();
            this.initGameEvent();
        }
        static gameInit(args) {
            GlobalCtrl.UI.openScene(UIType.HomeUI, false, null, null, Laya.stage);
            this.isWin = false;
            this.parent.destroyChildren();
            this.createGame();
            if (!Laya.Browser.onPC) {
                GlobalCtrl.Audio.playMusic();
            }
        }
        static gamePlay(args) {
            GlobalCtrl.IsStartGame = true;
            GlobalCtrl.UI.openScene(UIType.GameUI, true, null, null, Laya.stage);
        }
        static gameOver(args) {
            GlobalCtrl.IsStartGame = false;
            Laya.timer.once(1000, this, () => {
                GlobalCtrl.UI.openScene(UIType.OverUI, true, args, null, Laya.stage);
            });
        }
        static gameReborn(args) {
            GlobalCtrl.IsStartGame = false;
        }
        static initFX(pos) {
            if (!this.isInitFX) {
                this.fx._children.forEach(element => {
                    let fx = this.getFX(element.name, 5000);
                    this.parent.addChild(fx);
                    fx.transform.position = pos;
                    fx.transform.setWorldLossyScale(new Laya.Vector3(0.01, 0.01, 0.01));
                });
                this.isInitFX = true;
            }
        }
        static getFX(name, time = 1000) {
            let fx = UtilsFunctions.clone3dTarget(this.fx.getChildByName(name));
            this.parent.addChild(fx);
            if (time != -1) {
                Laya.timer.once(time, this, () => {
                    fx.destroy();
                });
            }
            return fx;
        }
        static showToast(str, time = 1000) {
            let img = GlobalCtrl.Prefab.getItem(PrefabType.InfoToast);
            let lb = img.getChildAt(0);
            lb.text = str;
            Laya.stage.addChild(img);
            img.centerX = 0;
            img.centerY = 0;
            Laya.timer.once(time * 0.5, this, () => {
                Laya.Tween.to(img, { centerY: -200 }, time * 0.5);
            });
            Laya.timer.once(time * 0.8, this, () => {
                Laya.Tween.to(img, { alpha: 0 }, time * 0.2, null, Laya.Handler.create(this, () => {
                    img.destroy();
                }));
            });
        }
        static createShadow(light, mode = Laya.ShadowMode.None) {
            light.shadowMode = mode;
            light.shadowDistance = 60;
            light.shadowResolution = 2048;
            light.shadowCascadesMode = Laya.ShadowCascadesMode.TwoCascades;
            light.shadowNormalBias = 0.4;
        }
        static loadSceneRes() {
            GlobalCtrl.Res.load(GlobalCtrl.CommonData.lsUrl, (s) => {
                this.mainScene = s;
                let camera = s.getChildByName("Camera");
                this.camera = camera;
                this.mainCamera = camera.getChildByName("Main Camera");
                this.mainCamera.enableHDR = false;
                UtilsFunctions.fixCameraField(this.mainCamera);
                Laya.stage.addChild(s);
                Laya.stage.setChildIndex(s, 0);
                this.parent = s.getChildByName("Parent");
                this.prefab = s.getChildByName("Prefab");
                this.prefab.active = false;
            }, null, "场景");
        }
        static loadModelRes(cb) {
        }
        static createGame() {
            let gameMode = GlobalCtrl.CommonData.gameMode;
            if (gameMode == 1) {
                this.gameCount = 0;
                this.createLevelConfig(2, 2, 2, false);
            }
            else if (gameMode == 2) {
                this.createGameByLevel();
            }
        }
        static createNextGame() {
            let gameMode = GlobalCtrl.CommonData.gameMode;
            if (gameMode == 1) {
                this.gameCount++;
                this.createGameByCount(this.gameCount);
                let scene = GlobalCtrl.UI.getSceneByUrl(UIType.HomeUI);
                scene["lbDetail"].text = "剩余方块：" + this.cubeAmount;
            }
            else if (gameMode == 2) {
                GlobalCtrl.Storage.passLevel(true);
                this.createGameByLevel();
                let scene = GlobalCtrl.UI.getSceneByUrl(UIType.HomeUI);
                scene["lbDetail"].text = "当前关卡：" + GlobalCtrl.StorageData.level;
            }
        }
        static createGameByCount(count) {
            switch (count) {
                case 1:
                    this.createLevelConfig(8, 8, 8);
                    break;
                case 2:
                    this.createLevelConfig(8, 10, 8);
                    break;
                case 3:
                    this.createLevelConfig(9, 10, 9);
                    break;
                case 4:
                    this.createLevelConfig(9, 12, 9);
                    break;
                case 5:
                    this.createLevelConfig(9, 14, 9);
                    break;
                case 6:
                    this.createLevelConfig(10, 10, 10);
                    break;
                case 7:
                    this.createLevelConfig(10, 12, 10);
                    break;
                case 8:
                    this.createLevelConfig(10, 15, 10);
                    break;
                default:
                    this.createLevelConfig(10, 15, 10);
                    break;
            }
        }
        static createGameByLevel() {
            let level = GlobalCtrl.StorageData.level;
            let config = GlobalCtrl.CommonData.gameLevelConfig[level - 1];
            if (!config) {
                let count = level - GlobalCtrl.CommonData.gameLevelConfig.length;
                config = GlobalCtrl.CommonData.gameLevelConfig[GlobalCtrl.CommonData.gameLevelConfig.length - 1];
                config[0] += count;
                config[1] += count;
                config[2] += count;
            }
            this.createLevelConfig(config[0], config[1], config[2]);
        }
        static createLevelConfig(verAmount, horAmount, zAmount, isTween = true) {
            this.parent.destroyChildren();
            CubeComponent.cubes = [];
            this.cubeAmount = verAmount * horAmount * zAmount;
            let oriCube = this.prefab.getChildByName("Box");
            let cubeParent = new Laya.Sprite3D;
            this.parent.addChild(cubeParent);
            cubeParent.transform.position = new Laya.Vector3;
            let totalAmount = verAmount * horAmount * zAmount;
            let maxWidth = verAmount * 0.5;
            let maxHeight = horAmount * 0.5;
            let maxLength = zAmount * 0.5;
            for (let i = 0; i < totalAmount; i++) {
                let iTmp = i;
                let startPosX = verAmount * 0.5 - 0.5;
                let startPosY = horAmount * 0.5 - 0.5;
                let startPosZ = zAmount * 0.5 - 0.5;
                let cube = oriCube.clone();
                if (i != 0) {
                    let index = i;
                    let floorAmount = verAmount * zAmount;
                    let offsetY = 0;
                    if (index > (floorAmount - 1)) {
                        let heigth = Math.floor(index / floorAmount);
                        offsetY = heigth;
                        index -= floorAmount * heigth;
                    }
                    let offsetX = index % verAmount;
                    let offsetZ = Math.floor(index / verAmount);
                    startPosX -= offsetX;
                    startPosY -= offsetY;
                    startPosZ -= offsetZ;
                }
                else {
                }
                let pos = new Laya.Vector3(startPosX, startPosY, startPosZ);
                cube.transform.position = pos;
                cubeParent.addChild(cube);
                let comp = cube.addComponent(CubeComponent);
                comp.setMax(maxWidth, maxHeight, maxLength);
                comp.randomRotate();
                if (isTween) {
                    let tween = new Tween3D;
                    cube.transform.localScale = new Laya.Vector3;
                    tween.toTween(cube, { sca: new Laya.Vector3(1, 1, 1) }, Math.random() * 500 + 500, () => {
                        cube.transform.localScale = new Laya.Vector3(1, 1, 1);
                        let collider = cube.addComponent(Laya.CannonPhysicsCollider);
                        let shape = new Laya.CannonBoxColliderShape(0.9, 0.9, 0.9);
                        collider.colliderShape = shape;
                        comp.collider = collider;
                        comp.shape = shape;
                    });
                }
                else {
                    let collider = cube.addComponent(Laya.CannonPhysicsCollider);
                    let shape = new Laya.CannonBoxColliderShape(0.9, 0.9, 0.9);
                    collider.colliderShape = shape;
                    comp.collider = collider;
                    comp.shape = shape;
                }
            }
            let sca = totalAmount < 8 ? 1 : totalAmount < 100 ? 0.8 : totalAmount < 600 ? 0.4 : totalAmount < 900 ? 0.35 : totalAmount < 1300 ? 0.3 : 0.25;
            cubeParent.transform.setWorldLossyScale(new Laya.Vector3(sca, sca, sca));
            let comp = cubeParent.addComponent(RotateController);
            comp.setTouchHigth(0, Laya.stage.height);
            cubeParent.transform.rotationEuler = new Laya.Vector3(-30, 0, 0);
        }
        static addReturnCube(cube) {
            this.curReturnCube = cube;
            let scene = GlobalCtrl.UI.getSceneByUrl(UIType.HomeUI);
            scene["btnReturn"].gray = false;
        }
        static useReturnCube() {
            if (this.curReturnCube) {
                this.curReturnCube.returnLastStep();
                this.curReturnCube = null;
            }
        }
        static useRandomBuff() {
            for (let i = 0; i < CubeComponent.cubes.length; i++) {
                CubeComponent.cubes[i].randomRotate(i == 0);
            }
        }
        static getRandomAngle(isLR) {
            let randomX = Math.random();
            let randomY = Math.random();
            var x = 0;
            var y = 0;
            var z = 0;
            if (isLR) {
                y = randomY > 0.75 ? 180 : randomY > 0.5 ? 90 : randomY > 0.25 ? 0 : -90;
            }
            else {
                x = randomX > 0.5 ? 90 : -90;
            }
            return new Laya.Vector3(x, y, z);
        }
        static initGameEvent() {
            GlobalCtrl.Event.on(EventType.Update_Skin_Event, this, this.changeSkin);
        }
        static changeSkin(e) {
        }
        static playProgress(fgImg, time) {
            if (!fgImg.mask) {
                fgImg.mask = new Laya.Sprite;
            }
            fgImg.visible = true;
            if (this.curTime == null) {
                this.curTime = 0;
            }
            Laya.timer.frameLoop(1, this, this.progressFrame, [time, fgImg]);
        }
        static progressFrame(time, fgImg) {
            this.curTime += Laya.timer.delta;
            let progress = this.curTime / time;
            if (progress > 1) {
                progress = 1;
                this.curTime = null;
                fgImg.visible = false;
                Laya.timer.clear(this, this.progressFrame);
                GlobalCtrl.CommonData.autoCombine = false;
            }
            fgImg.mask.graphics.clear();
            fgImg.mask.graphics.drawPie(fgImg.width / 2, fgImg.height / 2, fgImg.width / 2, 270, 270 - (progress) * 360, "#ffeb0d");
        }
        static cancelProgress(fgImg) {
            if (fgImg.mask) {
                fgImg.mask.graphics.clear();
            }
            Laya.timer.clear(this, this.progressFrame);
        }
    }
    GameLogic.isWin = false;
    GameLogic.chests = [];
    GameLogic.boxAmount = 0;
    GameLogic.freeBuyOne = false;
    GameLogic.gameCount = 0;
    GameLogic.cubeAmount = 0;
    class Models {
    }
    class Model {
    }
    class V3 {
    }

    class ColorUI extends BaseUI {
        constructor() {
            super(...arguments);
            this.selectColor = [];
            this.isPressed = false;
        }
        initUI() {
            super.initUI();
            this.curY = GlobalCtrl.CommonData.curSliderY;
            this.selectColor = GlobalCtrl.CommonData.curColor;
            this.btnSlider.y = this.curY;
            this.btnSlider.on(Laya.Event.MOUSE_DOWN, this, () => {
                this.isPressed = true;
                this.curY = this.btnSlider.y;
                Laya.stage.on(Laya.Event.MOUSE_UP, this, this.sliderUp);
                Laya.stage.on(Laya.Event.MOUSE_MOVE, this, this.sliderMove);
                RotateController.canCtrl = false;
            });
        }
        sliderUp() {
            this.isPressed = false;
            Laya.stage.off(Laya.Event.MOUSE_UP, this, this.sliderUp);
            Laya.stage.off(Laya.Event.MOUSE_MOVE, this, this.sliderMove);
            RotateController.canCtrl = true;
        }
        sliderMove(e) {
            if (this.isPressed) {
                this.curY = e.stageY;
                if (this.curY < 390)
                    this.curY = 390;
                else if (this.curY > 938)
                    this.curY = 938;
                this.btnSlider.y = this.curY;
                this.setColor(this.curY);
            }
        }
        setColor(y) {
            var e = this.imgColor.source.getPixels(10, y - 384, 1, 1);
            let c1 = Math.min(212, Math.max(81, e[0]));
            let c2 = Math.min(212, Math.max(81, e[1]));
            let c3 = Math.min(212, Math.max(81, e[2]));
            this.selectColor = [c1, c2, c3];
            this.changeColor(this.selectColor);
        }
        changeColor(colors) {
            let c1 = colors[0];
            let c2 = colors[1];
            let c3 = colors[2];
            let mat = CubeComponent.cubes[0].self.meshRenderer.sharedMaterial;
            mat.albedoColor = new Laya.Vector4(c1 / 255, c2 / 255, c3 / 255, 1);
        }
        clickButton(key) {
            if (key == "btnVideo") {
                PlatformApi.showVideoAd(() => {
                    GlobalCtrl.CommonData.curSliderY = this.curY;
                    GlobalCtrl.CommonData.curColor = this.selectColor;
                    this.changeColor(this.selectColor);
                    GameLogic.showToast("颜色更改成功");
                });
            }
        }
        closeUI() {
            this.imgColor.offAllCaller(this);
            this.changeColor(GlobalCtrl.CommonData.curColor);
        }
    }

    class GameUI extends BaseUI {
        initUI() {
            super.initUI();
            if (this["lbCoin"]) {
                this["lbCoin"].text = UtilsFunctions.transformValue(GlobalCtrl.StorageData.coin);
                GlobalCtrl.Event.on(EventType.Update_Coin_Event, this, () => {
                    this["lbCoin"].text = UtilsFunctions.transformValue(GlobalCtrl.StorageData.coin);
                });
            }
            this.lbLevel.text = "第" + GlobalCtrl.StorageData.level + "关";
        }
        openUIDelay(param) {
            PlatformApi.inGame();
        }
    }

    class HomeUI extends BaseUI {
        initUI() {
            super.initUI();
            this.updateBuff(this["btnBomb"], GlobalCtrl.CommonData.bombCount);
            this.updateBuff(this["btnRandom"], GlobalCtrl.CommonData.randomCount);
            this.updateBuff(this["btnReturn"], GlobalCtrl.CommonData.returnCount);
            GlobalCtrl.Event.on(EventType.Close_UI_Event, this, (s) => {
                if (s.url == UIType.ColorUI) {
                    this["btnBomb"].visible = true;
                    this["btnRandom"].visible = true;
                    this["btnReturn"].visible = true;
                    this["btnOption"].visible = true;
                    this["btnColor"].visible = true;
                }
            });
            GlobalCtrl.Event.on(EventType.Update_Buff_Event, this, () => {
                this.updateBuff(this["btnBomb"], GlobalCtrl.CommonData.bombCount);
                this.updateBuff(this["btnRandom"], GlobalCtrl.CommonData.randomCount);
                this.updateBuff(this["btnReturn"], GlobalCtrl.CommonData.returnCount);
            });
            if (GlobalCtrl.CommonData.gameMode == 1) {
                this["btnMode"].skin = "gameUI/game/anniu_3.png";
                this.lbMode.text = "挑战模式";
                this.lbDetail.text = "剩余方块：8";
            }
            else if (GlobalCtrl.CommonData.gameMode == 2) {
                this["btnMode"].skin = "gameUI/game/anniu_2.png";
                this.lbMode.text = "关卡模式";
                this.lbDetail.text = "当前关卡：" + GlobalCtrl.StorageData.level;
            }
            GlobalCtrl.Event.on(EventType.Next_Game_Event, this, this.showNext);
        }
        showNext() {
            if (this.imgNext.visible)
                return;
            this.imgNext.alpha = 1;
            this.imgNext.y = 400;
            this.imgNext.visible = true;
            Laya.timer.once(300, this, () => {
                Laya.Tween.to(this.imgNext, { y: 100, alpha: 0 }, 300, Laya.Ease.backIn, Laya.Handler.create(this, () => {
                    GameLogic.createNextGame();
                    this.imgNext.visible = false;
                }));
            });
        }
        updateBuff(btn, count) {
            let countImg = btn.getChildAt(2);
            let lbCount = countImg.getChildAt(0);
            if (count > 0) {
                countImg.visible = true;
                lbCount.text = count;
            }
            else {
                countImg.visible = false;
            }
        }
        closeUI() {
        }
        openUIDelay(param) {
            PlatformApi.inHome();
        }
        clickButton(key) {
            switch (key) {
                case "btnOption":
                    GlobalCtrl.UI.openScene(UIType.OptionUI, false, null, null, Laya.stage);
                    break;
                case "btnColor":
                    GlobalCtrl.UI.openScene(UIType.ColorUI, false, null, null, Laya.stage);
                    this["btnBomb"].visible = false;
                    this["btnRandom"].visible = false;
                    this["btnReturn"].visible = false;
                    this["btnOption"].visible = false;
                    this["btnColor"].visible = false;
                    break;
                case "btnBomb":
                    if (GlobalCtrl.CommonData.bombCount == 0) {
                        GlobalCtrl.UI.openScene(UIType.BuffUI, false, { type: 1 }, null, Laya.stage);
                    }
                    else {
                        GameLogic.showToast("请点击任意方块");
                        GlobalCtrl.CommonData.isBomb = true;
                    }
                    break;
                case "btnRandom":
                    if (GlobalCtrl.CommonData.randomCount == 0) {
                        GlobalCtrl.UI.openScene(UIType.BuffUI, false, { type: 2 }, null, Laya.stage);
                    }
                    else {
                        GameLogic.useRandomBuff();
                        GlobalCtrl.CommonData.randomCount--;
                        this.updateBuff(this["btnRandom"], GlobalCtrl.CommonData.randomCount);
                    }
                    break;
                case "btnReturn":
                    if (this["btnReturn"].gray) {
                        GameLogic.showToast("无可撤销操作");
                        return;
                    }
                    if (GlobalCtrl.CommonData.returnCount == 0) {
                        GlobalCtrl.UI.openScene(UIType.BuffUI, false, { type: 3 }, null, Laya.stage);
                    }
                    else {
                        GameLogic.useReturnCube();
                        GlobalCtrl.CommonData.returnCount--;
                        this.updateBuff(this["btnReturn"], GlobalCtrl.CommonData.returnCount);
                        this["btnReturn"].gray = true;
                    }
                    break;
                case "btnMode":
                    if (GlobalCtrl.CommonData.gameMode == 1) {
                        GlobalCtrl.CommonData.gameMode = 2;
                        this["btnMode"].skin = "gameUI/game/anniu_2.png";
                        this.lbMode.text = "关卡模式";
                        this.lbDetail.text = "当前关卡：" + GlobalCtrl.StorageData.level;
                    }
                    else if (GlobalCtrl.CommonData.gameMode == 2) {
                        GlobalCtrl.CommonData.gameMode = 1;
                        this["btnMode"].skin = "gameUI/game/anniu_3.png";
                        this.lbMode.text = "挑战模式";
                        this.lbDetail.text = "剩余方块：8";
                    }
                    GameLogic.createGame();
                    break;
                case "btnNext":
                    GameLogic.createNextGame();
                    break;
            }
        }
        changeVibrateClick() {
        }
        startGame() {
        }
    }

    class LoadUI extends BaseUI {
        constructor() {
            super(...arguments);
            this.isShowingLogoTween = false;
            this.progress = 0;
        }
        onOpened(param) {
            if (param.isShowLogoTween) {
                this.showLogoTween(param.gameLogoUrl, param.companyLogoUrl, param.logoSize);
            }
            this.showProgress(true, true, false);
            Laya.timer.once(1000, this, () => {
                this.size(Laya.stage.width, Laya.stage.height);
            });
            Laya.timer.frameLoop(1, this, () => {
                this.moveArrow.x += 1;
                this.moveArrow.y -= 1;
            });
        }
        closeUI() {
            if (this.isShowingLogoTween) {
                Tween2D.clear(this.imgLogo);
            }
            LCK.init();
        }
        showLogoTween(gameLogoUrl, companyLogoUrl, scale = 1) {
            if (this.imgLogo) {
                this.isShowingLogoTween = true;
                let panel = new Laya.Panel;
                this.addChild(panel);
                panel.size(Laya.stage.width, Laya.stage.height);
                panel.bgColor = "#ffffff";
                this.setChildIndex(this.imgLogo, this.numChildren - 1);
                if (companyLogoUrl) {
                    var oldUrl = gameLogoUrl ? gameLogoUrl : this.imgLogo.skin;
                    this.imgLogo.skin = companyLogoUrl;
                }
                else if (gameLogoUrl) {
                    oldUrl = gameLogoUrl;
                    this.imgLogo.skin = gameLogoUrl;
                }
                else {
                    oldUrl = this.imgLogo.skin;
                }
                var oldScale = this.imgLogo.scaleX;
                this.imgLogo.scale(scale, scale);
                let oldTop = this.imgLogo.top;
                this.imgLogo.centerX = 0;
                Tween2D.toAlpha(this.imgLogo, 0, 1, 200, null, () => {
                    Laya.timer.once(300, this, () => {
                        Tween2D.toAlpha(this.imgLogo, 1, 0, 300, null, () => {
                            panel.destroy();
                            this.imgLogo.scale(oldScale, oldScale);
                            this.imgLogo.alpha = 1;
                            this.imgLogo.skin = oldUrl;
                            this.imgLogo.top = oldTop;
                            this.isShowingLogoTween = false;
                        });
                    });
                });
            }
        }
        showProgress(isShowLabel = true, isShowBar = true, isShowTag = true) {
            if (this.lbProgress) {
                this.lbProgress.text = "0%";
                this.lbProgress.visible = isShowLabel;
            }
            if (this.barProgress) {
                this.barProgress.value = 0;
                this.barProgress.visible = isShowBar;
            }
            this.imgProgress.width = 0;
            this.progress = 0;
            if (this.lbTag) {
                this.lbTag.text = "资源加载中.";
                this.lbTag.visible = isShowTag;
                let tagPointStr = "";
                Laya.timer.loop(100, this, () => {
                    let count = tagPointStr.length + 1;
                    if (count > 3) {
                        count = 1;
                    }
                    tagPointStr = "";
                    for (let i = 0; i < count; i++) {
                        tagPointStr += ".";
                    }
                    this.lbTag.text = GlobalCtrl.Res.CurrentTag + "加载中" + tagPointStr;
                    this.progress += 0.01;
                    if (this.progress > 1) {
                        this.progress = 1;
                    }
                    if (this.barProgress) {
                        this.barProgress.value += 0.01;
                        if (this.barProgress.value > 1) {
                            this.barProgress.value = 1;
                        }
                    }
                    this.imgProgress.width = 497 * this.progress;
                    if (this.lbProgress) {
                        this.lbProgress.text = (this.progress * 100).toFixed(0) + "%";
                    }
                });
            }
            if (GlobalCtrl.Res.getTagCount == 0) {
                this.loadFinish();
            }
            else {
                GlobalCtrl.Event.on(EventType.Load_Res_Event, this, (args) => {
                    if (args.loadFinish) {
                        this.loadFinish();
                    }
                    else {
                        if (isShowLabel && this.lbProgress) {
                            this.lbProgress.text = args.isComplete ? "100%" : (args.progress * 100).toFixed(0) + "%";
                        }
                        if (isShowBar && this.barProgress) {
                            this.barProgress.value = args.isComplete ? 1 : args.progress;
                        }
                        if (isShowTag && this.lbTag) {
                            this.lbTag.text = args.tag;
                        }
                    }
                });
            }
        }
        loadFinish() {
            Laya.timer.clearAll(this);
            this.lbTag.text = "资源加载完成";
            this.imgProgress.width = 497;
            this.lbProgress.text = "100%";
            Laya.timer.once(100, this, () => {
                this.closeScene();
                GlobalCtrl.Event.event(EventType.Game_Init_Event);
            });
        }
    }

    class OptionUI extends BaseUI {
        openUIDelay() {
            this.imgSound.skin = GlobalCtrl.StorageData.isSound ? "gameUI/game/sz_dk.png" : "gameUI/game/sz_gb.png";
            this.imgVibrate.skin = GlobalCtrl.StorageData.isVibrate ? "gameUI/game/sz_dk.png" : "gameUI/game/sz_gb.png";
            this.imgSound.left = GlobalCtrl.StorageData.isSound ? 86 : 0;
            this.imgVibrate.left = GlobalCtrl.StorageData.isVibrate ? 86 : 0;
            PlatformApi.showBannerAd();
        }
        clickButton(key) {
            switch (key) {
                case "btnSound":
                    this.changeSoundClick();
                    break;
                case "btnVibrate":
                    this.changeVibrateClick();
                    break;
                case "btnRestart":
                    GameLogic.createGame();
                    this.closeScene();
                    break;
            }
        }
        changeSoundClick() {
            this.imgSound.skin = GlobalCtrl.Storage.soundSiwtch() ? "gameUI/game/sz_dk.png" : "gameUI/game/sz_gb.png";
            if (GlobalCtrl.StorageData.isSound) {
                GlobalCtrl.Audio.playMusic(AudioType.Bgm);
                this.imgSound.left = 80;
            }
            else {
                GlobalCtrl.Audio.stopMusic();
                this.imgSound.left = 0;
            }
        }
        changeVibrateClick() {
            this.imgVibrate.skin = GlobalCtrl.Storage.vibrateSiwtch() ? "gameUI/game/sz_dk.png" : "gameUI/game/sz_gb.png";
            if (GlobalCtrl.StorageData.isVibrate) {
                this.imgVibrate.left = 80;
            }
            else {
                this.imgVibrate.left = 0;
            }
        }
        closeUI() {
            PlatformApi.hideBannerAd();
        }
    }

    class GameConfig {
        constructor() {
        }
        static init() {
            var reg = Laya.ClassUtils.regClass;
            reg("SGSDK/SGBoxBottom.ts", SGBoxBottom);
            reg("SGSDK/SGScale.ts", SGScale);
            reg("SGSDK/SGRotate.ts", SGRotate);
            reg("SGSDK/SGBoxMiddle.ts", SGBoxMiddle);
            reg("SGSDK/SGFinishUI.ts", SGFinishUI);
            reg("SGSDK/SGHomeUI.ts", SGHomeUI);
            reg("SGSDK/SGRemen.ts", SGRemen);
            reg("SGSDK/SGSkin.ts", SGSkin);
            reg("uiScenes/BuffUI.ts", BuffUI);
            reg("uiScenes/ColorUI.ts", ColorUI);
            reg("uiScenes/GameUI.ts", GameUI);
            reg("uiScenes/HomeUI.ts", HomeUI);
            reg("uiScenes/LoadUI.ts", LoadUI);
            reg("uiScenes/OptionUI.ts", OptionUI);
        }
    }
    GameConfig.width = 750;
    GameConfig.height = 1334;
    GameConfig.scaleMode = "fixedauto";
    GameConfig.screenMode = "vertical";
    GameConfig.alignV = "middle";
    GameConfig.alignH = "center";
    GameConfig.startScene = "uiScenes/LoadUI.scene";
    GameConfig.sceneRoot = "";
    GameConfig.debug = false;
    GameConfig.stat = false;
    GameConfig.physicsDebug = false;
    GameConfig.exportSceneToJson = true;
    GameConfig.init();

    class Main {
        constructor() {
            if (window["Laya3D"])
                Laya3D.init(GameConfig.width, GameConfig.height);
            else
                Laya.init(GameConfig.width, GameConfig.height, Laya["WebGL"]);
            Laya["Physics"] && Laya["Physics"].enable();
            Laya["DebugPanel"] && Laya["DebugPanel"].enable();
            Config3D.useCannonPhysics = true;
            Laya.stage.scaleMode = GameConfig.scaleMode;
            Laya.stage.screenMode = GameConfig.screenMode;
            Laya.stage.alignV = GameConfig.alignV;
            Laya.stage.alignH = GameConfig.alignH;
            Laya.URL.exportSceneToJson = GameConfig.exportSceneToJson;
            Laya.stage.useRetinalCanvas = true;
            if (GameConfig.debug || Laya.Utils.getQueryString("debug") == "true")
                Laya.enableDebugPanel();
            if (GameConfig.physicsDebug && Laya["PhysicsDebugDraw"])
                Laya["PhysicsDebugDraw"].enable();
            if (GameConfig.stat)
                Laya.Stat.show();
            Laya.alertGlobalError(true);
            Laya.ResourceVersion.enable("version.json", Laya.Handler.create(this, this.onVersionLoaded), Laya.ResourceVersion.FILENAME_VERSION);
        }
        onVersionLoaded() {
            Laya.AtlasInfoManager.enable("fileconfig.json", Laya.Handler.create(this, this.onConfigLoaded));
        }
        onConfigLoaded() {
            GlobalCtrl.initFrameworks();
            GlobalCtrl.Audio.setMusicVolume(0.6);
            GlobalCtrl.Res.addLoadTag("SDK");
            PlatformApi.initSDK(() => {
                GlobalCtrl.Res.removeLoadTag("SDK");
            });
            LCK.init();
            PlatformApi.init((isSuccess) => {
                if (isSuccess)
                    GameLogic.init();
            });
        }
    }
    new Main();

}());
//# sourceMappingURL=bundle.js.map
