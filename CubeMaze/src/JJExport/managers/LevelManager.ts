import Context from "../Context";


/**
 * 关卡管理类
 */
export default class LevelManager {
    parent: Laya.Sprite3D;
    emerys: Laya.Sprite3D;
    skins: Laya.Sprite3D;

    scenes: Laya.Sprite3D; //间距-160
    road: Laya.Sprite3D; //间距-10
    end: Laya.Sprite3D;



    skinData: any;
    endPosZ: number;

    carFx: Laya.Sprite3D;

    createSmoke() {
        return this.cloneObj(this.carFx.getChildByName("TireSmoke1"));
    }

    createDamageSmoke1() {
        return this.cloneObj(this.carFx.getChildByName("DamageSmoke1"));
    }

    createDamageSmoke2() {
        return this.cloneObj(this.carFx.getChildByName("DamageSmoke2"));
    }

    createBomb() {
        return this.cloneObj(this.carFx.getChildByName("BoomFX"));
    }

    createDash(){
        return this.cloneObj(this.carFx.getChildByName("DashFX"));
    }

    cloneObj(obj) {
        return obj.clone();
    }

    init(scene, model) {
        return;
        //读取缓存配置
        // let jsonData = Context.Storage.readStorage("carConfig");
        // if (!jsonData) {
        //     Context.Storage.writeStorage("carConfig", this.carStorage);
        // }
        // else {
        //     this.carStorage = JSON.parse(jsonData);
        //     // this.updateAllStrength();
        // }

        // this.parent = scene.getChildByName("Parent");
        // this.skins = scene.getChildByName("Skins");
        // this.emerys = model.getChildByName("Emerys");
        // this.scenes = model.getChildByName("Scenes");
        // this.road = model.getChildByName("Road");
        // this.carFx = model.getChildByName("CarFX");
        // // var car = scene.getChildByName("Car1");
        // // car.addComponent(CarComponent);

        // // cameraComp.setTarget(car);
    }

    road1Mat: Laya.Material;
    road2Mat: Laya.Material;
    loadLevel() {
        //选择场景
        var isCityScene = Math.random() > 0.5;
        var sceneLength = 7; //TODON 关卡

        if (isCityScene) {
            var sceneIndexs = [0, 1];
            var mat = this.road1Mat.clone();
        }
        else {
            sceneIndexs = [2, 3];
            mat = this.road2Mat.clone();
        }

        (this.road.getChildAt(0) as Laya.MeshSprite3D).meshRenderer.sharedMaterial = mat;
        for (var i = 0; i < sceneLength; i++) {
            var index = Context.Utils.getRandomArray(sceneIndexs, 1)[0];

            // TODON 去除场景
            var scene = this.cloneObj(this.scenes.getChildAt(index));
            this.parent.addChild(scene);
            scene.transform.position = new Laya.Vector3(0, 0, i * 160);

            for (var j = 0; j < 16; j++) {
                var road = this.cloneObj(this.road);
                this.parent.addChild(road);
                road.transform.position = new Laya.Vector3(0, 0.1, i * 160 + j * 10);
            }
        }

        var end = this.cloneObj(this.end);
        this.parent.addChild(end);
        this.endPosZ = (sceneLength - 2) * 160 - 100;
        end.transform.position = new Laya.Vector3(0, 0.11, this.endPosZ);

    }

    /**玩家缓存配置 */
    carStorage = {
        carConfig: {
            currentUseSkinId: 1
        },
        carData: [
            { skinId: 1, level: 1 }
            // { skinId: 1, level: 1, strength: 10, dateTime: Date.now() },
        ]
    }

    saveCarStorage() {
        // Context.Storage.writeStorage("carConfig", this.carStorage);
    }

    // updateAllStrength() {
    //     var carData = this.carStorage.carData;
    //     for (var i = 0; i < carData.length; i++) {
    //         if (carData[i].strength < 10) {
    //             var time = Date.now() - carData[i].dateTime;
    //             if(time / 60000 > 5){ //五分钟加一
    //                 carData[i].strength++;
    //                 carData[i].dateTime = Date.now();
    //             }
    //             // console.log("时间：", time);
    //         }
    //     }

    //     this.saveCarStorage();
    // }

    // updateCarStrength(index) {
    //     var carData = this.carStorage.carData.filter(w=>{re})
    // }

    upgradeCar(index) {
        this.carStorage.carData.filter(w => { return w.skinId == index + 1 })[0].level++;
        this.saveCarStorage();
    }

    passMissionCount: number = 0;
    missionConfig: any[] = [
        { type: "video", reward: 750, totalCount: 1, currentCount: 0 },
        { type: "comboX3", reward: 500, totalCount: 1, currentCount: 0 },
        { type: "dontHit", reward: 500, totalCount: 1, currentCount: 0 },
        { type: "lowHpPass", reward: 500, totalCount: 1, currentCount: 0 },
        { type: "overtake20", reward: 500, totalCount: 20, currentCount: 0 },
        { type: "pass3level", reward: 500, totalCount: 3, currentCount: 0 },
    ]

    currentMission: number[] = [];
    totalMission: number[] = [];
    updateMissions() {
        // this.totalMission = [];
        // if (this.passMissionCount == 0 || this.passMissionCount % 6 == 0) {
        this.totalMission.push(0);
        // }

        this.totalMission = this.totalMission.concat(Context.Utils.getRandomArray([1, 2, 3, 4, 5], 5));
        // this.getCurrentMission();
    }

    getCurrentMission(index?) {
        if (index == null) {
            for (var i = this.currentMission.length; i < 3; i++) {
                this.currentMission.push(this.totalMission.shift());
                if (this.totalMission.length == 0) {
                    this.updateMissions();
                }
            }
        }
        else {
            var newMission = this.totalMission.shift();

            var missionConfig = this.missionConfig[this.currentMission[this.currentMission.indexOf(index)]];
            missionConfig.currentCount = 0;
            this.currentMission[this.currentMission.indexOf(index)] = newMission;

            this.passMissionCount++;
            if (this.totalMission.length < 3) {
                this.updateMissions();
            }

            Context.Event.event("Update_Mission_Event");
            return newMission;
        }
    }

    updateMission(missionIndex, clear?) {
        for (var i = 0; i < this.currentMission.length; i++) {
            if (missionIndex == this.currentMission[i]) {
                var missionConfig = this.missionConfig[missionIndex];

                if (clear && missionConfig.currentCount < missionConfig.totalCount) {
                    missionConfig.currentCount = 0;
                }
                else {
                    missionConfig.currentCount++;
                }
            }
        }
        Context.Event.event("Update_Mission_Event");
    }

    get finishMission() {
        for (var i = 0; i < this.currentMission.length; i++) {
            var missionConfig = this.missionConfig[this.currentMission[i]];
            if (missionConfig) {
                if (missionConfig.currentCount >= missionConfig.totalCount) {
                    return true;
                }
            }
        }
        return false;
    }
}