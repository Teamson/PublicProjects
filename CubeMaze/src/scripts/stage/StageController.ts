import CamFollow from "../mods/CamFollow";
import PlayerData from "../mods/PlayerData";
import Tools from "../mods/Tools";
import Tween3D from "../mods/Tween3D";
import Stage from "../Stage";
import Data from "../tools/Data";
import ModelAnimController, { ModelAnimClips } from "./ModelAnimController";




export default class StageController {
    static wallBornCount = 0;
    static roadCubes = [];
    static canPickCubes = [];
    static trailPos = [];
    static spring = [];
    static beacon = [];
    static stageID = 0;
    static endPos = [];
    static startPos = [];
    static wormHoleIn: { [key: string]: any; } = {}
    static wormHoleOut: { [key: string]: any; } = {}
    static stop = [];
    static stageColor = [];
    static cubeCount = 0;
    static trailCubeCount = 0;
    static endItemCount = 0;
    static Init() {
        Laya.timer.clearAll(this)
        for (let i = 0; i < Data.usingPrefabs.length; i++) {
            Data.usingPrefabs[i].destroy();
        }
        this.canPickCubes = [];
        this.roadCubes = [];
        this.spring = [];
        this.beacon = [];
        this.endPos = [];
        this.startPos = [];
        this.wormHoleIn = {};
        this.wormHoleOut = {};
        this.trailPos = [];
        this.stageID = 0;
        this.stop = [];
        Data.collider.ColliderInit();
        this.loadStageConfigs();

    }
    //玩家事件
    static PlayerInit() {
        Data.model = Data.player.getChildByName("Model") as Laya.Sprite3D;
        for (let i = 1; i < Data.model.numChildren; i++) {
            Data.model.getChildAt(i).active = false;
        }
        let index = parseInt(PlayerData.GetPlayerData().nowPeople);
        Data.model.getChildAt(index + 1).active = true;
        Data.model.getChildAt(index + 10).active = true;
        ModelAnimController.playAnim(ModelAnimClips.Idle);
        Data.model.transform.localPosition = new Laya.Vector3(0, 0.3, 0);
        Tools.setTransRotEulerY(Data.model.transform, -120);
        let comp = Data.mainCam.addComponent(CamFollow);
        comp.justGo();
        Tools.setTransRotEulerX(Data.mainCam.transform, -65);
        Tools.setTransRotEulerY(Data.mainCam.transform, -180 + 4);
        Data.fxController.BornMoveSmokeFx();

    }
    //加载关卡
    static loadStageConfigs() {
        let grade = PlayerData.GetPlayerData().grade;
        let url = "res/Stages/StagesConfig.json";
        let level = (grade - 1) % 14 + 1;
        console.log("grade:", grade, "level:", level);
        let levelurl = "res/Stages/Level" + level.toString() + ".json"
        let color = [1, 2, 3];
        let realColor = [];
        for (let i = 0; i < 3; i++) {
            realColor.push(Tools.takeRandomInArray(color));
        }
        this.stageColor = realColor;
        Tools.loadJsonFile(levelurl, (data) => {
            let grade = PlayerData.GetPlayerData().grade;
            let index = 0;
            let stageData = [data[0], data[1]]
            if (data[2]) {
                stageData.push(data[2]);
            }
            this.roadCubes = new Array(stageData.length);
            this.endPos = new Array(stageData.length);
            this.startPos = new Array(stageData.length);
            this.canPickCubes = new Array(stageData.length);
            this.trailPos = new Array(stageData.length);
            this.cubeCount = 0;
            this.trailCubeCount = 0;
            for (let i = 0; i < stageData.length; i++) {
                this.stageID = i;
                this.roadCubes[i] = [];
                this.endPos[i] = [];
                this.startPos[i] = [];
                this.canPickCubes[i] = [];
                this.trailPos[i] = [];
                this.StageBornDo(stageData[i].stage);
            }
            let end = Data.scene3D.getChildByName("End") as Laya.Sprite3D;
            let endPos = this.endPos[this.endPos.length - 1].clone();
            endPos.z -= 0.5
            end.transform.position = endPos;
            let total = (this.cubeCount - this.trailCubeCount)
            let axisCount = Math.floor(total / 5);
            let add = total % 5;
            this.endItemCount = axisCount;
            this.BornEndItem(axisCount, add);
            this.PlayerInit();
        })
    }
    //生成关卡
    static StageBornDo(data) {
        for (let i = 0; i < data.length; i++) {
            let name = data[i].name;
            let tips = name.split("_");
            let pos = new Laya.Vector3(parseFloat(data[i].position.x), parseFloat(data[i].position.y), parseFloat(data[i].position.z));
            let rotation = new Laya.Vector3(parseFloat(data[i].rotation.x), parseFloat(data[i].rotation.y), parseFloat(data[i].rotation.z))
            let scale = new Laya.Vector3(parseFloat(data[i].scale.x), parseFloat(data[i].scale.y), parseFloat(data[i].scale.z))
            switch (tips[0]) {
                case "Ground":
                    this.BornGround(pos, rotation, scale);
                    break;
                case "BlockCube":
                    this.BornBlockCube(pos, rotation, scale);
                    break;
                case "PickCube":
                    this.BornPickCube(pos);
                    break;
                case "StartPoint":
                    if (this.stageID == 0) {
                        this.SetPlayerPos(pos);
                    }
                    this.startPos[this.stageID] = pos;
                    this.roadCubes[this.stageID].push(pos);
                    break;
                case "Trail":
                    this.BornTrail(pos, rotation, scale);
                    break;
                case "TrailGround":
                    this.BornTrailGround(pos);
                    break;
                case "EndPoint":
                    this.endPos[this.stageID] = pos;
                    this.roadCubes[this.stageID].push(pos);
                    break;
                case "Spring":
                    this.BornSpring(pos, rotation);
                    break;
                case "Beacon":
                    this.BornBeacon(pos, rotation);
                    break;
                case "SpringStage":
                    this.BornSpringStage(pos, rotation);
                    break;
                case "Wormhole":
                    this.BornWormhole(pos, tips[1], tips[2])
                    break;
                case "Stop":
                    this.BornStop(pos);
                    break;
            }
        }
    }
    //生成地板
    static BornGround(pos, rotation, scale) {
        let url = "Ground" + this.stageColor[0].toString();
        let prefab = Tools.findNodeByName(Data.prefabs, url)
        let ground = this.BornObj(prefab, pos) as Laya.Sprite3D;
        ground.transform.localRotationEuler = rotation;
        ground.transform.localScale = scale;
    }
    //生成阻挡墙
    static BornBlockCube(pos, rotation, scale) {
        let url = "BlockCube" + this.stageColor[1].toString();
        let prefab = Tools.findNodeByName(Data.prefabs, url)
        let blockCube = this.BornObj(prefab, pos) as Laya.Sprite3D;
        blockCube.transform.localRotationEuler = rotation;
        blockCube.transform.localScale = scale;
    }
    //生成可捡方块
    static BornPickCube(pos) {
        for (let i = 0; i < this.canPickCubes[this.stageID].length; i++) {
            if (Laya.Vector3.equals(this.canPickCubes[this.stageID][i].transform.position.clone(), pos)) {
                console.log("有相同")
                return;
            }
        }
        let url = "PickCube" + this.stageColor[2].toString();
        let prefab = Tools.findNodeByName(Data.prefabs, url)
        let obj = this.BornObj(prefab, pos) as Laya.Sprite3D;
        this.roadCubes[this.stageID].push(obj.transform.position.clone());
        this.canPickCubes[this.stageID].push(obj);
        this.cubeCount++;
    }
    //生成轨道
    static BornTrail(pos, rotation, scale) {
        let url = "Trail" + this.stageColor[1].toString();
        let prefab = Tools.findNodeByName(Data.prefabs, url);
        let obj = this.BornObj(prefab, pos) as Laya.Sprite3D;
        obj.transform.localRotationEuler = rotation;
        obj.transform.localScale = scale;
        //判定索道经过了几个点
        let addVector = Tools.getTransformForward(obj.transform);
        Laya.Vector3.normalize(addVector, addVector);
        if (pos.z % 1 == 0.5) {
            for (let i = 0; i <= scale.z; i++) {
                let add = Tools.Vector3Axis(addVector, i);
                let point = Tools.Vector3Add(pos, add);
                this.addTrail(point);
            }
        } else if (pos.z % 1 == 0) {
            let addScale = scale.z - 0.5;

            let addPos = Tools.Vector3Add(pos, Tools.Vector3Axis(addVector, 0.5));
            for (let i = 0; i <= addScale; i++) {
                let add = Tools.Vector3Axis(addVector, i);
                let point = Tools.Vector3Add(addPos, add);
                this.addTrail(point);
            }
        }

    }
    static addTrail(pos) {
        for (let i = 0; i < this.trailPos[this.stageID].length; i++) {
            if (Laya.Vector3.equals(this.trailPos[this.stageID][i], pos)) {
                return;
            }
        }
        this.roadCubes[this.stageID].push(pos);
        this.trailPos[this.stageID].push(pos);
        this.trailCubeCount++;
    }
    //生成轨道支柱
    static BornTrailGround(pos) {
        let url = "TrailGround" + this.stageColor[1].toString();
        let prefab = Tools.findNodeByName(Data.prefabs, url);
        let obj = this.BornObj(prefab, pos) as Laya.Sprite3D;
    }
    //生成转角弹簧
    static BornSpring(pos, rotation) {
        let prefab = Tools.findNodeByName(Data.prefabs, "Spring");
        let obj = this.BornObj(prefab, pos) as Laya.Sprite3D;
        obj.transform.localRotationEuler = rotation;
        this.spring.push(obj);
    }
    //生成方向值
    static BornBeacon(pos, rotation) {
        let prefab = Tools.findNodeByName(Data.prefabs, "Beacon");
        let obj = this.BornObj(prefab, pos) as Laya.Sprite3D;
        obj.transform.localRotationEuler = rotation;
        this.beacon.push(obj);
    }
    //生成隐形弹簧
    static BornSpringStage(pos, rotation) {
        let prefab = Tools.findNodeByName(Data.prefabs, "SpringStage");
        let obj = this.BornObj(prefab, pos) as Laya.Sprite3D;
        obj.transform.localRotationEuler = rotation;
        this.spring.push(obj);
    }
    //生成虫洞
    static BornWormhole(pos, id, type) {
        let prefab = Tools.findNodeByName(Data.prefabs, "Wormhole");
        let obj = this.BornObj(prefab, pos) as Laya.Sprite3D;
        if (type == "In") {
            this.wormHoleIn[id] = obj.transform.position.clone();
        } else if (type == "Out") {
            this.wormHoleOut[id] = obj.transform.position.clone();
        }
    }
    //生成停止版
    static BornStop(pos) {
        let prefab = Tools.findNodeByName(Data.prefabs, "Stop");
        let obj = this.BornObj(prefab, pos) as Laya.Sprite3D;
        this.stop.push(obj.transform.position.clone());
    }
    //生成结算板子
    static BornEndItem(count, add) {
        for (let i = 0; i < count; i++) {
            let index = i % 7 + 1;
            let name = "EndItem" + index.toString();
            let prefab = Tools.findNodeByName(Data.prefabs, name);
            let pos = this.endPos[this.endPos.length - 1].clone();
            pos.z += 20 + i * 7;
            let obj = this.BornObj(prefab, pos) as Laya.Sprite3D;
            let first = obj.getChildByName("first") as Laya.Sprite3D;
            let second = obj.getChildByName("second") as Laya.Sprite3D;
            let point = obj.getChildByName("point") as Laya.Sprite3D;
            let axis = obj.getChildByName("x") as Laya.Sprite3D;
            this.BornNumber(1 + Math.floor(i / 10), first.transform.position.clone())
            this.BornNumber(i % 10, second.transform.position.clone())
            this.BornPoint(point.transform.position.clone());
            this.BornAxis(axis.transform.position.clone());
            first.destroy();
            second.destroy();
            point.destroy();
            axis.destroy();
        }
        let end = Data.scene3D.getChildByName("End") as Laya.Sprite3D;
        let chest = end.getChildByName("Chest") as Laya.Sprite3D;
        let chestPos = chest.transform.localPosition.clone();
        chestPos.z = 20 + count * 7 + 0.5;
        chestPos.y = 0.31 + add * 0.3;
        chest.transform.localPosition = chestPos;
    }
    static BornNumber(number, pos) {
        let url = number.toString();
        let prefab = Tools.findNodeByName(Data.prefabs, url);
        let obj = this.BornObj(prefab, pos);
    }
    static BornPoint(pos) {
        let url = "point";
        let prefab = Tools.findNodeByName(Data.prefabs, url);
        let obj = this.BornObj(prefab, pos);
    }
    static BornAxis(pos) {
        let url = "axis"
        let prefab = Tools.findNodeByName(Data.prefabs, url);
        let obj = this.BornObj(prefab, pos);
    }

    //设置玩家位置
    static SetPlayerPos(pos) {
        Data.player.transform.position = pos;
    }

    //统一物品生成接口
    static BornObj(Prefab, pos = new Laya.Vector3(0, 0, 0)) {
        let obj = Prefab.clone();
        if (obj) {
            Data.scene3D.addChild(obj);
            obj.transform.position = pos;
            Data.usingPrefabs.push(obj);
        }
        return obj;
    }

}