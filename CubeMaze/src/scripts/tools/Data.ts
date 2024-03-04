import ColliderController from "../stage/ColliderController";

import PlayerData from "../mods/PlayerData";
import SoundManager from "../../JJExport/managers/SoundManager";

import camShake from "../mods/camShake";
import FxController from "../stage/FxController";
import StageController from "../stage/StageController";

export enum SceneUrl {
    LOADING = 'Loading.scene',
    STARTMENU = 'StartMenu.scene',
    STAGEUI = 'StageUI.scene',
    ENDMENU = 'EndMenu.scene',
    SHOP = 'Shop.scene',
    STAGELOADING = 'StageLoading.scene',
    SkinLock = 'SkinLock.scene'
}

export default class Data {
    static isPure = false;
    //全局常用对象
    static scene3D: Laya.Scene3D;
    static prefabs: Laya.Sprite3D;
    static fxs: Laya.Sprite3D;
    static player: Laya.Sprite3D;
    static model: Laya.Sprite3D;
    static anim: Laya.Animator;
    static mainCam: Laya.Camera
    static soundController: SoundManager
    static fxController: FxController
    static collider: ColliderController;
    static nowScene: number = 0;//loading 0 ,start 1，stage2,end3
    //Tools
    static camShake: camShake;
    //关卡生成预载体存放
    static usingPrefabs: any = [];
    //场景动态数值
    static isSuccess: boolean = false;
    static endAxis: number = 0;
    static endCoin: number = 0;
    static AddGrade() {
        let data = PlayerData.GetPlayerData()
        data.grade++;

        if (parseInt(data.grade) == 3) {
            data.peopleActive[1] = true;
        } else if (parseInt(data.grade) == 10) {
            data.peopleActive[2] = true;
        } else if (parseInt(data.grade) > 99) {
            data.grade = 99;
        }
        PlayerData.SavePlayerData(data);
    }
    static readGrade(): number {
        let data = PlayerData.GetPlayerData();
        return parseInt(data.grade);
    }
    static AddCoin(count: number) {
        let data = PlayerData.GetPlayerData()
        data.coin += count;
        PlayerData.SavePlayerData(data);
    }
    static readCoin(): number {
        let data = PlayerData.GetPlayerData();
        return parseInt(data.coin);
    }
    static unlock(id) {
        console.log("解锁", id);
        let data = PlayerData.GetPlayerData();
        data.peopleActive[id] = true;
        PlayerData.SavePlayerData(data);
    }
    static choose(id) {
        let data = PlayerData.GetPlayerData();
        data.nowPeople = id;
        PlayerData.SavePlayerData(data);
        StageController.PlayerInit();
    }
}