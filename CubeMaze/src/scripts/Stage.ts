import BaseUI from "./mods/BaseUI"
import Data, { SceneUrl } from "./tools/Data"
import Tools from "./mods/Tools"
import PlayerData from "./mods/PlayerData"
import StageUpdate from "./StageUpdate"
import TouchWayCheck from "./mods/TouchWayCheck"
import StageController from "./stage/StageController"
import Tween3D from "./mods/Tween3D"
import CamFollow from "./mods/CamFollow"
import ModelAnimController, { ModelAnimClips } from "./stage/ModelAnimController"
import SGMgr from "../SGSDK/SGMgr"


export default class Stage extends BaseUI {
    static instance: Stage;
    update: StageUpdate;
    touchWayCheck: TouchWayCheck;
    //一些UI
    coinValue: Laya.FontClip;
    gradeValue: Laya.FontClip;
    coinAnim: Laya.Clip;
    addOneUI: Laya.Clip;
    TotarialUI: Laya.Image;
    collectAllUI: Laya.Image;
    backCollectUI: Laya.Image;
    springPanel: Laya.Image;
    beaconPanel: Laya.Image;
    holePanel: Laya.Image;
    TotarialAnim;
    //参数
    isStart = false;
    isSuccess = true;
    isCalling = false;
    nowCube = [];
    stageID = 0;

    init() {
        Stage.instance = this;
        this.update = this.getComponent(StageUpdate);
        Data.nowScene = 2;

        console.log("Stage开始执行")
        this.ButtonInit();
        this.ValueInit();
        this.GameInit();
        this.Totarial();
        this.GameStart();
    }
    //按钮初始化
    ButtonInit() {
    }
    //数据初始化
    ValueInit() {
        let grade = PlayerData.GetPlayerData().grade;
        this.coinValue.value = Data.readCoin().toString();
        this.gradeValue.value = Data.readGrade().toString();
    }
    //教程
    Totarial() {
        var tl: Laya.Animation = new Laya.Animation();
        //加载动画文件
        tl.loadAnimation("Anim/Totourial.ani");
        //添加到舞台
        tl.x = this.scene.width / 2;
        tl.y = this.scene.height - 300;
        this.scene.addChild(tl);
        //播放Animation动画
        tl.play();
        this.TotarialAnim = tl
        //特殊UI
        this.collectAllUI.set_visible(false);
        this.backCollectUI.set_visible(false);
        this.springPanel.set_visible(false);
        this.beaconPanel.set_visible(false);
        this.holePanel.set_visible(false);
        if (Data.readGrade() == 1) {
            this.springPanel.set_visible(true);
        } else if (Data.readGrade() == 3) {
            this.beaconPanel.set_visible(true);
        } else if (Data.readGrade() == 7) {
            this.holePanel.set_visible(true);
        }
        Tools.TouchOn(this.TotarialEnd, () => { }, () => { }, this);
    }
    TotarialEnd() {
        this.collectAllUI.set_visible(false);
        this.backCollectUI.set_visible(false);
        this.springPanel.set_visible(false);
        this.beaconPanel.set_visible(false);
        this.holePanel.set_visible(false);
        Tools.TouchOff(this.GameStart, () => { }, () => { }, this)
        this.TotarialAnim.destroy();
        this.TotarialUI.destroy();
    }
    //抽屉
    DrawUI() {
    }
    //返回导出按钮
    BackUI() {
    }
    //游戏初始化
    GameInit() {
        let end = Data.scene3D.getChildByName("End") as Laya.Sprite3D;
        let chest = end.getChildByName("Chest") as Laya.Sprite3D;
        let anim = chest.getComponent(Laya.Animator);
        Data.fxController.BornChestAllFx(chest.transform.position.clone());
        anim.play("Idle");
    }
    //游戏开始
    GameStart() {
        console.log("游戏正式开始")
        this.isStart = true;
        this.coinValue.value = Data.readCoin().toString();
        this.PlayerStart();
        SGMgr.inGame()
    }
    //游戏结束
    GameEnd() {
        this.callDoneAndCanel();
        this.touchWayCheck.destroy();
        console.log("游戏结束")
        console.log("结算板子数：", this.nowCube.length);
        this.isStart = false;
        this.getComponent(StageUpdate).destroy();
        Data.isSuccess = this.isSuccess;
        Data.mainCam.getComponent(CamFollow).destroy();
        this.EndAnim();
    }
    //结束动画
    EndAnim() {
        let t = new Tween3D();
        let end = Data.scene3D.getChildByName("End") as Laya.Sprite3D;
        let chest = end.getChildByName("Chest") as Laya.Sprite3D;
        let endPos = chest.transform.position.clone();
        Data.fxController.smokeFx.transform.localPositionY = 0;
        //最小都有20;
        endPos.y = 0;
        let endItemIs = Math.floor(this.nowCube.length / 5);
        let endItemIndex = this.nowCube.length % 5
        let distance = 20 + (endItemIs) * 7 + 1 + endItemIndex;
        let isChest = false;
        if (endItemIs == StageController.endItemCount) {
            endPos.z -= 0.5;
            distance = endPos.z - Data.player.transform.position.clone().z;
            endItemIndex = 0;
            if (this.nowCube.length == (StageController.cubeCount - StageController.trailCubeCount)) {
                isChest = true;
            }
        }
        else {
            endPos.z = Data.player.transform.position.clone().z + distance - 0.5;
        }
        let time = distance * 50;
        let time1 = 50 * 20;
        let tcam = new Tween3D();
        let nowCamPos = Data.mainCam.transform.position.clone();
        let camPos1 = new Laya.Vector3(nowCamPos.x + (endPos.x - nowCamPos.x) * time1 / time - 5, nowCamPos.y - 8, nowCamPos.z + distance * time1 / time);
        let camPos2 = new Laya.Vector3(endPos.x - 8, nowCamPos.y - 8, nowCamPos.z + distance);
        let camPos3 = new Laya.Vector3(endPos.x, nowCamPos.y - 10, nowCamPos.z + distance + 1);
        let camRot1 = new Laya.Vector3(-35, -180 + 30, 0);
        let camRot3 = new Laya.Vector3(-40, -180, 0);
        tcam.toTween(Data.mainCam, { pos: camPos1, rot: camRot1 }, time1)
            .then({ pos: camPos2 }, time - time1, () => {
                if (isChest)
                    tcam.toTween(Data.mainCam, { pos: camPos3, rot: camRot3 }, 1000)
            })
        t.toTween(Data.player, { pos: endPos }, time, () => {
            Data.fxController.smokeFx.transform.localPositionY = -1000;
            if (isChest) {
                let goPos = Data.model.transform.localPosition.clone();
                goPos.z += 2;
                ModelAnimController.playAnim(ModelAnimClips.End);
                setTimeout(() => {
                    this.coinAnimGo(chest);
                }, 1000);
                t.toTween(Data.model, { pos: goPos, rot: new Laya.Vector3(0, 0, 0) }, 1000, () => {
                    ModelAnimController.FadeIn(ModelAnimClips.Dance);
                    let anim = chest.getComponent(Laya.Animator);
                    anim.speed = 0.5;
                    Tools.vibrateShort();
                    anim.play("Play");
                    t.toTween(Data.model, { rot: new Laya.Vector3(0, 180, 0) }, 500);
                    Data.fxController.BornFireWorksAlways(new Laya.Vector3(Data.player.transform.position.clone().x + 3, 0, Data.player.transform.position.clone().z))
                    Data.fxController.BornFireWorksAlways(new Laya.Vector3(Data.player.transform.position.clone().x - 3, 0, Data.player.transform.position.clone().z))
                    setTimeout(() => {
                        SGMgr.gameOver(()=>{
                            Laya.Scene.open(SceneUrl.ENDMENU)
                        })
                    }, 2000);
                })
            } else {
                Data.fxController.BornFireWorksAlways(new Laya.Vector3(Data.player.transform.position.clone().x + 3, 0, Data.player.transform.position.clone().z))
                Data.fxController.BornFireWorksAlways(new Laya.Vector3(Data.player.transform.position.clone().x - 3, 0, Data.player.transform.position.clone().z))
                setTimeout(() => {
                    SGMgr.gameOver(()=>{
                        Laya.Scene.open(SceneUrl.ENDMENU)
                    })
                }, 2000);
            }
        })
        for (let i = 0; i < endItemIs; i++) {
            for (let j = 1; j <= 5; j++) {
                let distance = 20 + i * 7 + 0.5 + j;
                let cubePos = new Laya.Vector3(Data.player.transform.position.clone().x, 0, Data.player.transform.position.clone().z + distance);
                let cubeTimer = distance * 50;
                this.EndCubeSet(cubePos, cubeTimer)
            }
            // let distance = 20 + (i + 1) * 7
            // setTimeout(() => {
            //     Data.fxController.clearFireWork();
            //     Data.fxController.BornFireWorksAlways(new Laya.Vector3(Data.player.transform.position.clone().x + 3, 0, Data.player.transform.position.clone().z))
            //     Data.fxController.BornFireWorksAlways(new Laya.Vector3(Data.player.transform.position.clone().x - 3, 0, Data.player.transform.position.clone().z))
            // }, distance * 50);
        }
        for (let i = 0; i < endItemIndex; i++) {
            let distance = 20 + endItemIs * 7 + 1.5 + i;
            let cubePos = new Laya.Vector3(Data.player.transform.position.clone().x, 0, Data.player.transform.position.clone().z + distance);
            let cubeTimer = distance * 50;
            this.EndCubeSet(cubePos, cubeTimer)
        }
        Data.endAxis = 1 + endItemIs * 0.1;
        Data.endCoin = Data.endAxis * 10;
        if (isChest) {
            Data.endCoin += 30;
        }
    }
    coinAnimGo(pos): void {
        pos = Tools.getSpritePosBySprite3DPoint(pos);
        pos.y -= 300
        Tools.coinCollectAnimAni(this.coinAnim, pos, new Laya.Vector2(this.coinValue.x, this.coinValue.y), this.scene, 30);
    }
    //结束放方块
    EndCubeSet(pos, timer) {
        if (this.nowCube.length == 0)
            return true;
        setTimeout(() => {
            Tools.vibrateShort();
            let useCube = this.nowCube[this.nowCube.length - 1] as Laya.Sprite3D;
            Data.scene3D.addChild(useCube);
            useCube.transform.position = pos;
            this.putDownCube(useCube);
            this.nowCube.splice(this.nowCube.length - 1, 1);
            Data.model.transform.localPositionY = 0.3 + 0.3 * this.nowCube.length;
        }, timer);
        return false;
    }
    //玩家事件
    PlayerStart() {
        this.touchWayCheck = this.addComponent(TouchWayCheck);
    }
    //更新命令
    callUpdate() {
        if (this.isCalling)
            return;
        this.isCalling = true;
        let calls = this.touchWayCheck.calls;
        let call = calls[0];
        this.doCall(call);
    }
    //路径点
    trailPos = [];
    trailPosTime = [];
    //执行命令
    doCall(call) {
        let playerPos = Data.player.transform.position.clone();
        let toPos = playerPos;
        playerPos.y = 0;
        //第一个点（途径的点）
        this.trailPos = [];
        this.trailPosTime = [];
        this.trailPos.push(toPos);
        //排点嵌套
        let endPos = this.getNextPos(playerPos, call)
        //路径点优化
        let finalTrailPos = [];
        let goTime = 50;
        finalTrailPos.push(this.trailPos[0]);
        this.trailPosTime.push(0);
        for (let i = 1; i < this.trailPos.length - 1; i++) {
            if (this.checkPosSpecial(this.trailPos[i]) != "") {
                finalTrailPos.push(this.trailPos[i]);
                this.trailPosTime.push(goTime);
                goTime = 0;
            }
            goTime += 50;
        }
        finalTrailPos.push(this.trailPos[this.trailPos.length - 1]);
        this.trailPosTime.push(goTime);
        this.trailPos = finalTrailPos;

        //去到点操作
        if (this.trailPos.length > 1) {
            let count = 0;
            let cb = () => {
                //途径点查看是否有可以捡起Cube
                if (!this.pickPosCube(this.trailPos[count])) {
                    ModelAnimController.FadeIn(ModelAnimClips.Move);
                }
                //判定是否结束点
                if (Laya.Vector3.equals(this.trailPos[count], StageController.endPos[this.stageID])) {
                    console.log("离开", this.stageID)
                    this.stageID++;
                    console.log("去往", this.stageID)
                    if (this.stageID < StageController.roadCubes.length) {
                        this.doCall(call);
                    } else {
                        this.GameEnd();
                    }
                    return;
                }
                //判定是否是起点
                if (Laya.Vector3.equals(this.trailPos[count], StageController.startPos[this.stageID])) {
                    console.log("离开", this.stageID)
                    this.stageID--;
                    console.log("去往", this.stageID)
                    if (this.stageID >= 0) {
                        this.doCall(call);
                        return;
                    } else {
                        this.stageID = 0;
                        console.log("已返回起始点")
                    }
                }
                //特殊点判断
                if (count != 0) {
                    //判定轨道
                    if (!this.checkPosTrail(this.trailPos[count])) {
                        this.backCollectUI.set_visible(true);
                        setTimeout(() => {
                            this.backCollectUI.set_visible(false);
                        }, 2000);
                        this.callDoneAndCanel();
                        return;
                    }
                    //判定是否为虫洞
                    if (this.checkPosWorm(this.trailPos[count])) {
                        return;
                    }
                    //判定是否是beacon
                    if (this.checkPosBeacon(this.trailPos[count])) {
                        return;
                    }
                    //判定是否为Spring转角
                    if (this.checkPosSpring(this.trailPos[count], call)) {
                        return;
                    }
                    //判定是否为Stop
                    if (this.checkPosStop(this.trailPos[count])) {
                        this.callDone();
                        return;
                    }
                } else {
                    if (!this.checkPosTrail(this.trailPos[count + 1])) {
                        this.backCollectUI.set_visible(true);
                        setTimeout(() => {
                            this.backCollectUI.set_visible(false);
                        }, 2000);
                        this.callDoneAndCanel();
                        return;
                    }
                }
                //执行下一步
                count++;
                if (count < this.trailPos.length) {
                    let tween = new Tween3D();
                    Data.fxController.smokeFx.transform.localPositionY = 0;
                    tween.toTween(Data.player, { pos: this.trailPos[count] }, this.trailPosTime[count], cb);
                }
                else {
                    this.callDone();
                }
            }
            cb();
        } else {
            this.callDone();
            //结束动作
        }
        //end
    }
    //命令完成
    callDone() {
        let calls = this.touchWayCheck.calls;
        calls.splice(0, 1);
        Tools.vibrateShort();
        if (calls.length > 0) {
            let call = calls[0];
            this.doCall(call);
        } else {
            this.isCalling = false;
            Data.fxController.smokeFx.transform.localPositionY = -1000;
            // for (let i = 0; i < Data.player.numChildren; i++) {
            //     let child = Data.player.getChildAt(i) as Laya.Sprite3D;
            //     let moveT = new Tween3D();
            //     let basePos = new Laya.Vector3(0, child.transform.localPositionY, 0);
            //     moveT.toTween(child, { pos: basePos }, 50, () => { }, true);
            // }
        }
    }
    //命令完成且清空
    callDoneAndCanel() {
        Tools.vibrateShort();
        this.touchWayCheck.calls = [];
        this.isCalling = false;
        Data.fxController.smokeFx.transform.localPositionY = -1000;
        // for (let i = 0; i < Data.player.numChildren; i++) {
        //     let child = Data.player.getChildAt(i) as Laya.Sprite3D;
        //     let moveT = new Tween3D();
        //     let basePos = new Laya.Vector3(0, child.transform.localPositionY, 0);
        //     moveT.toTween(child, { pos: basePos }, 50, () => { }, true);
        // }
    }
    //寻路嵌套(核心)
    getNextPos(nowPos, distance) {
        let roadCubes = StageController.roadCubes[this.stageID];
        let canGoPos = nowPos;
        for (let i = 0; i < roadCubes.length; i++) {
            let dir = Tools.Vector3Reduce(roadCubes[i], nowPos);
            let dis = Laya.Vector3.scalarLength(dir);
            if (dis == 1) {
                let angle = Math.atan2(dir.z, dir.x) / Math.PI * 180;
                let call = "none"
                if (angle == 90) {
                    call = "up"
                } else if (angle == 180) {
                    call = "right"
                } else if (angle == -90) {
                    call = "down"
                } else if (angle == 0) {
                    call = "left"
                }
                if (distance == call) {
                    canGoPos = roadCubes[i];
                    break;
                }
            }
        }

        if (nowPos != canGoPos) {
            //途径点
            this.trailPos.push(canGoPos);
            canGoPos = this.getNextPos(canGoPos, distance);
        }
        return canGoPos;
    }
    getCanGoPos(nowPos) {

    }
    //查看该点是否特殊点
    checkPosSpecial(pos) {
        let canPickCubes = StageController.canPickCubes[this.stageID];
        for (let i = 0; i < canPickCubes.length; i++) {
            let obj = canPickCubes[i] as Laya.Sprite3D;
            if (Laya.Vector3.equals(obj.transform.position, pos)) {
                return "pick";
            }
        }
        if (Laya.Vector3.equals(pos, StageController.endPos[this.stageID])) {
            return "end";
        }
        if (Laya.Vector3.equals(pos, StageController.startPos[this.stageID])) {
            return "start";
        }
        let trailPoses = StageController.trailPos[this.stageID];
        for (let i = 0; i < trailPoses.length; i++) {
            if (Laya.Vector3.equals(pos, trailPoses[i])) {
                return "trail";
            }
        }
        let spring = StageController.spring;
        for (let i = 0; i < spring.length; i++) {
            let springPos = spring[i].transform.position;
            if (Laya.Vector3.equals(pos, springPos)) {
                return "spring";
            }
        }
        let beacon = StageController.beacon;
        for (let i = 0; i < beacon.length; i++) {
            let beaconPos = beacon[i].transform.position;
            if (Laya.Vector3.equals(pos, beaconPos)) {
                return "beacon";
            }
        }
        let In = StageController.wormHoleIn;
        let Out = StageController.wormHoleOut
        for (let key in In) {
            let value = In[key];
            if (Laya.Vector3.equals(pos, value)) {
                return "hole";
            }
        }
        for (let key in Out) {
            let value = Out[key];
            if (Laya.Vector3.equals(pos, value)) {
                return "hole";
            }
        }
        return "";
    }
    //查看要走的路径上有没有要捡的方块
    pickPosCube(pos) {
        let canPickCubes = StageController.canPickCubes[this.stageID];
        for (let i = 0; i < canPickCubes.length; i++) {
            let obj = canPickCubes[i] as Laya.Sprite3D;
            if (Laya.Vector3.equals(obj.transform.position, pos)) {
                canPickCubes.splice(i, 1);
                Data.player.addChild(obj);
                this.CubePickDo(obj);
                ModelAnimController.FadeIn(ModelAnimClips.Jump);
                if (canPickCubes.length == 0) {
                    this.collectAllUI.set_visible(true);
                    setTimeout(() => {
                        Laya.Tween.to(this.collectAllUI, { alpha: 0 }, 300)
                        setTimeout(() => {
                            this.collectAllUI.set_visible(false);
                            this.collectAllUI.alpha = 1;
                        }, 1000);
                    }, 1000);
                    console.log("该板块收集完毕", this.stageID)
                    Data.fxController.BornFinishFx(Data.player.transform.position);
                }
                return true;
            }
        }
        return false;
    }
    CubePickDo(cube) {
        Tools.vibrateShort();
        this.nowCube.push(cube);
        cube.transform.localPosition = new Laya.Vector3(0, 0.3 * this.nowCube.length, 0);
        Data.model.transform.localPositionY = 0.3 + 0.3 * this.nowCube.length;
        let uiPos = Tools.getSpritePosBySprite3DPoint(Data.model, new Laya.Vector2(0, 0));
        let ui = new Laya.FontClip(this.addOneUI.skin, "0123456789*+")
        ui.value = "+1";
        ui.x = uiPos.x - 50;
        ui.y = uiPos.y - 100;
        this.scene.addChild(ui);
        Laya.Tween.to(ui, { y: ui.y - 100, alpha: 0 }, 500, null, Laya.Handler.create(this, () => {
            ui.destroy();
        }))
    }
    //查看要走的路径是否是要铺轨的trail
    checkPosTrail(pos) {
        let trailPoses = StageController.trailPos[this.stageID];
        if (!trailPoses)
            return true;
        for (let i = 0; i < trailPoses.length; i++) {
            if (Laya.Vector3.equals(pos, trailPoses[i])) {
                if (this.nowCube.length <= 1)
                    return false;
                let useCube = this.nowCube[this.nowCube.length - 1] as Laya.Sprite3D;
                Data.scene3D.addChild(useCube);
                useCube.transform.position = pos;
                this.putDownCube(useCube);
                this.nowCube.splice(this.nowCube.length - 1, 1);
                StageController.trailPos[this.stageID].splice(i, 1);
                Data.model.transform.localPositionY = 0.3 + 0.3 * this.nowCube.length;
                Tools.vibrateShort();
                return true;
            }
        }
        return true;
    }
    //查看要走的路径是否为Spring
    checkPosSpring(pos, dir) {
        let spring = StageController.spring;
        for (let i = 0; i < spring.length; i++) {
            let springPos = spring[i].transform.position;
            if (Laya.Vector3.equals(pos, springPos)) {
                Tools.objectScaleTips(spring[i]);
                let forward = Tools.getTransformForward(spring[i].transform);
                Laya.Vector3.normalize(forward, forward);
                if (forward.z == 1) {
                    if (dir == "right") {
                        this.doCall("down")
                    } else if (dir == "up") {
                        this.doCall("left");
                    }
                } else if (forward.x == 1) {
                    if (dir == "left") {
                        this.doCall("down");
                    } else if (dir == "up") {
                        this.doCall("right");
                    }
                } else if (forward.x == -1) {
                    if (dir == "right") {
                        this.doCall("up");
                    } else if (dir == "down") {
                        this.doCall("left");
                    }
                } else if (forward.z == -1) {
                    if (dir == "left") {
                        this.doCall("up");
                    } else if (dir == "down") {
                        this.doCall("right");
                    }
                }
                return true;
            }
        }
        return false;
    }
    //查看要走的路径是否为Beacon
    checkPosBeacon(pos) {
        let beacon = StageController.beacon;
        for (let i = 0; i < beacon.length; i++) {
            let beaconPos = beacon[i].transform.position;
            if (Laya.Vector3.equals(pos, beaconPos)) {
                Tools.objectScaleTips(beacon[i]);
                let forward = Tools.getTransformForward(beacon[i].transform);
                Laya.Vector3.normalize(forward, forward);
                if (forward.z == 1) {
                    this.doCall("left");
                } else if (forward.x == 1) {
                    this.doCall("down");
                } else if (forward.x == -1) {
                    this.doCall("up");
                } else if (forward.z == -1) {
                    this.doCall("right");
                }
                return true;
            }
        }
        return false;
    }
    //查看要走的路径是否为WormHole
    checkPosWorm(pos) {
        let In = StageController.wormHoleIn;
        let Out = StageController.wormHoleOut
        for (let key in In) {
            let value = In[key];
            if (Laya.Vector3.equals(pos, value)) {
                let tween = new Tween3D();
                let downPos = Tools.Vector3Reduce(pos, new Laya.Vector3(0, this.nowCube.length * 0.3 + 1.5, 0))
                let upPos = this.GoOutWorm(key);
                let goPos = Tools.Vector3Reduce(upPos, new Laya.Vector3(0, this.nowCube.length * 0.3 + 1.5, 0))
                tween.toTween(Data.player, { pos: downPos }, 1000, () => {
                    Data.player.transform.position = goPos;
                })
                    .then({ pos: upPos }, 1000, () => {
                        this.callDoneAndCanel();
                    });
                return true;
            }
        }
        for (let key in Out) {
            let value = Out[key];
            if (Laya.Vector3.equals(pos, value)) {
                let tween = new Tween3D();
                let downPos = Tools.Vector3Reduce(pos, new Laya.Vector3(0, this.nowCube.length * 0.3 + 2.5, 0))
                let upPos = this.GoInWorm(key);
                let goPos = Tools.Vector3Reduce(upPos, new Laya.Vector3(0, this.nowCube.length * 0.3 + 2.5, 0))
                tween.toTween(Data.player, { pos: downPos }, 1000, () => {
                    Data.player.transform.position = goPos;
                })
                    .then({ pos: upPos }, 1000, () => {
                        this.callDoneAndCanel();
                    });
                return true;
            }
        }
        return false;
    }
    GoOutWorm(id) {
        let Out = StageController.wormHoleOut
        return Out[id];
    }
    GoInWorm(id) {
        let In = StageController.wormHoleIn;
        return In[id]
    }
    //放下方块动画
    putDownCube(cube) {
        let endPos = cube.transform.position.clone();
        let startPos = cube.transform.position.clone();
        startPos.y += 0.3;
        cube.transform.position = startPos;
        Tools.setTransRotEulerX(cube.transform, 0);
        let t = new Tween3D();
        t.toTween(cube, { pos: endPos, rot: new Laya.Vector3(0, 0, 0) }, 500);
    }
    //查看要走的路径是否为Stop
    checkPosStop(pos) {
        let stop = StageController.stop;
        for (let i = 0; i < stop.length; i++) {
            if (Laya.Vector3.equals(stop[i], pos)) {
                return true;
            }
        }
        return false;
    }

}