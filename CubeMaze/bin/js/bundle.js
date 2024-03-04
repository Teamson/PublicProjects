(function () {
    'use strict';

    class BaseUI extends Laya.Scene {
        onAwake() {
            this.height = Laya.stage.height;
            this.init();
        }
        init() { }
    }

    class PlayerData {
        static GetPlayerData() {
            let data;
            data = Laya.LocalStorage.getJSON('PlayerData');
            if (data) {
                return data;
            }
            else {
                data = {
                    'ver': 1,
                    'grade': 1,
                    'coin': 0,
                    'nowPeople': 0,
                    'peopleActive': [true, false, false, false, false,
                        false, false, false, false],
                    'lockAxis': 0,
                };
                Laya.LocalStorage.setJSON('PlayerData', data);
                return data;
            }
        }
        static SavePlayerData(data) {
            Laya.LocalStorage.setJSON('PlayerData', data);
        }
        static clearPlayerData() {
            Laya.LocalStorage.clear();
        }
        static CheckPlayerData() {
            let data;
            data = Laya.LocalStorage.getJSON('PlayerData');
            if (!data.ver || data.ver != 1) {
                data = {
                    'ver': 1,
                    'grade': 1,
                    'coin': 0,
                    'nowPeople': 0,
                    'peopleActive': [true, false, false, false, false,
                        false, false, false, false],
                    'lockAxis': 0,
                };
                Laya.LocalStorage.setJSON('PlayerData', data);
            }
        }
    }

    var SceneType;
    (function (SceneType) {
        SceneType["Loading"] = "UIScene/Loading.scene";
        SceneType["BusyLoading"] = "UIScene/BusyLoading.scene";
        SceneType["Home"] = "UIScene/Home.scene";
        SceneType["Game"] = "UIScene/Game.scene";
        SceneType["Game3D"] = "UIScene/Game3D.scene";
        SceneType["Reborn"] = "UIScene/Reborn.scene";
        SceneType["Settlement"] = "UIScene/Settlement.scene";
        SceneType["Mission"] = "UIScene/Mission.scene";
        SceneType["Skin"] = "UIScene/Skin.scene";
        SceneType["FreeSkin"] = "UIScene/FreeSkin.scene";
        SceneType["Sign"] = "UIScene/Sign.scene";
        SceneType["Offline"] = "UIScene/Offline.scene";
        SceneType["Strength"] = "UIScene/Strength.scene";
        SceneType["SignTips"] = "UIScene/SignTips.scene";
        SceneType["Busy"] = "UIScene/Busy.scene";
        SceneType["Background"] = "UIScene/Background.scene";
        SceneType["Box"] = "UIScene/Box.scene";
        SceneType["Clean"] = "UIScene/Clean.scene";
    })(SceneType || (SceneType = {}));
    var PrefabItem;
    (function (PrefabItem) {
        PrefabItem["BoxItem"] = "prefab/BoxItem.prefab";
        PrefabItem["FontDamaged"] = "prefab/FontDamaged.prefab";
        PrefabItem["CompoundItem"] = "prefab/CompoundItem.prefab";
    })(PrefabItem || (PrefabItem = {}));
    var SoundType;
    (function (SoundType) {
        SoundType["BGM"] = "Bgm";
        SoundType["CLICK"] = "Click";
        SoundType["AddBrick"] = "AddBrick";
        SoundType["Chest"] = "Chest";
        SoundType["Finish"] = "Finish";
        SoundType["PutBrick"] = "PutBrick";
    })(SoundType || (SoundType = {}));

    class Tween3D {
        constructor() {
            this.tween = new Laya.Tween();
            this.tweens = [];
        }
        getTimeByFrame(frame) {
            return Math.round(1000 / 100 * frame);
        }
        toTween(target, value, time, completeFun, isLocal = true) {
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
                var targetSca = target.transform.getWorldLossyScale().clone();
                ov.scaX = targetSca.x;
                ov.scaY = targetSca.y;
                ov.scaZ = targetSca.z;
                tv.scaX = value.sca.x;
                tv.scaY = value.sca.y;
                tv.scaZ = value.sca.z;
            }
            this.tween.to(ov, {
                posX: tv.posX, posY: tv.posY, posZ: tv.posZ,
                rotX: tv.rotX, rotY: tv.rotY, rotZ: tv.rotZ,
                scaX: tv.scaX, scaY: tv.scaY, scaZ: tv.scaZ
            }, time, null, Laya.Handler.create(this, () => {
                completeFun && completeFun();
                var nextTWeen = this.tweens.shift();
                if (nextTWeen) {
                    this.toTween(this.target, nextTWeen.value, nextTWeen.time, nextTWeen.completeFun);
                }
            }));
            this.tween.update = new Laya.Handler(this, () => {
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
                    target.transform.setWorldLossyScale(new Laya.Vector3(ov.scaX, ov.scaY, ov.scaZ));
                }
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

    class Tools {
        static loadScene(Url, zOrder = 0, cb = () => { }, param = null) {
            Url && Laya.Scene.open(Url, false, param, Laya.Handler.create(this, (scene) => {
                Laya.stage.addChild(scene);
                scene.zOrder = zOrder;
                cb();
            }));
        }
        static TouchOn(start, move, end, caller) {
            Laya.stage.on(Laya.Event.MOUSE_DOWN, caller, start);
            Laya.stage.on(Laya.Event.MOUSE_MOVE, caller, move);
            Laya.stage.on(Laya.Event.MOUSE_UP, caller, end);
            Laya.stage.on(Laya.Event.MOUSE_OUT, caller, end);
        }
        static TouchOff(start, move, end, caller) {
            Laya.stage.off(Laya.Event.MOUSE_DOWN, caller, start);
            Laya.stage.off(Laya.Event.MOUSE_MOVE, caller, move);
            Laya.stage.off(Laya.Event.MOUSE_UP, caller, end);
            Laya.stage.on(Laya.Event.MOUSE_OUT, caller, end);
        }
        static buttonInit(btn, caller, cb, param, isScale) {
            btn.offAllCaller(caller);
            if (btn instanceof Laya.Button && !isScale) {
                let callback = (event) => {
                    Data.soundController.play(SoundType.CLICK);
                    if (cb)
                        cb.call(caller, event);
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
                    Laya.Tween.to(btn, { scaleX: scaleX, scaleY: scaleY }, scaleTime);
                    if (cb)
                        cb.call(caller, event);
                    Data.soundController.play(SoundType.CLICK);
                };
                btn.on(Laya.Event.MOUSE_UP, caller, cbUp, [param]);
                let cbOut = (event) => {
                    Laya.Tween.to(btn, { scaleX: scaleX, scaleY: scaleY }, scaleTime);
                };
                btn.on(Laya.Event.MOUSE_OUT, caller, cbOut, [param]);
            }
        }
        static imageButtonInit(img, caller, cb, value) {
            img.offAllCaller(caller);
            let cb1 = (event) => {
                Data.soundController.play(SoundType.CLICK);
                if (cb)
                    cb.call(caller, event);
            };
            img.on(Laya.Event.MOUSE_UP, caller, cb1, [value]);
        }
        static gameButtonOn(img, caller, Down, Up) {
            img.offAllCaller(caller);
            img.on(Laya.Event.MOUSE_DOWN, caller, Down);
            img.on(Laya.Event.MOUSE_UP, caller, Up);
            img.on(Laya.Event.MOUSE_OUT, caller, Up);
        }
        static Vector3Add(a, b) {
            let pos = new Laya.Vector3();
            Laya.Vector3.add(a, b, pos);
            return pos;
        }
        static Vector3Reduce(a, b) {
            let pos = new Laya.Vector3();
            let c = Tools.Vector3Axis(b, -1);
            pos = this.Vector3Add(a, c);
            return pos;
        }
        static Vector2Add(a, b) {
            let pos = new Laya.Vector2(a.x + b.x, a.y + b.y);
            return pos;
        }
        static Vector2Reduce(a, b) {
            let pos = new Laya.Vector2(a.x - b.x, a.y - b.y);
            return pos;
        }
        static Vector2Scale(a) {
            let scale = Math.sqrt((Math.pow(a.x, 2) + Math.pow(a.y, 2)));
            return scale;
        }
        static getTransformForward(transform) {
            let pos = new Laya.Vector3();
            transform.getForward(pos);
            pos = this.Vector3Axis(pos, -1);
            return pos;
        }
        static Vector3Axis(vec3, axis) {
            let pos = vec3.clone();
            pos.x *= axis;
            pos.y *= axis;
            pos.z *= axis;
            return pos;
        }
        static setTransRotEulerY(transform, rotY) {
            let rot = transform.localRotationEuler.clone();
            rot.y = rotY;
            transform.localRotationEuler = rot;
        }
        static setTransRotEulerX(transform, rotX) {
            let rot = transform.localRotationEuler.clone();
            rot.x = rotX;
            transform.localRotationEuler = rot;
        }
        static setTransRotEulerZ(transform, rotZ) {
            let rot = transform.localRotationEuler.clone();
            rot.z = rotZ;
            transform.localRotationEuler = rot;
        }
        static getRandomInArray(array) {
            if (array.length) {
                let r = Math.random() * array.length;
                r = Math.floor(r);
                return array[r];
            }
            else {
                console.log("传入错误参数,返回空");
                return null;
            }
        }
        static takeRandomInArray(array) {
            if (array.length) {
                let r = Math.random() * array.length;
                r = Math.floor(r);
                let obj = array[r];
                array.splice(r, 1);
                return obj;
            }
            else {
                console.log("传入错误参数,返回空");
                return null;
            }
        }
        static getSpritePosBySprite3DPoint(target, offset = new Laya.Vector2(0, 0)) {
            var pos = target.transform.position.clone();
            var outPos = new Laya.Vector4;
            Data.mainCam.viewport.project(pos, Data.mainCam.projectionViewMatrix, outPos);
            var pos2d = new Laya.Vector2(outPos.x / Laya.stage.clientScaleX, outPos.y / Laya.stage.clientScaleY);
            pos2d.x += offset.x;
            pos2d.y += offset.y;
            return new Laya.Point(pos2d.x, pos2d.y);
        }
        static coinCollectAnim(url, startPos, endPos, parent, amount = 15, callBack = null) {
            var amountTmp = amount;
            for (var i = 0; i < amount; i++) {
                let coin = Laya.Pool.getItemByClass("coin", Laya.Image);
                coin.skin = url;
                coin.x = startPos.x;
                coin.y = startPos.y;
                coin.scale(0.8, 0.8);
                parent.addChild(coin);
                let time = 300 + Math.random() * 100 - 50;
                Laya.Tween.to(coin, { x: coin.x + Math.random() * 250 - 125, y: coin.y + Math.random() * 250 - 125 }, time);
                Laya.timer.once(time + 50, this, function () {
                    Laya.Tween.to(coin, { x: endPos.x, y: endPos.y }, 400, null, new Laya.Handler(this, function () {
                        parent.removeChild(coin);
                        Laya.Pool.recover("coin", coin);
                        amountTmp--;
                        if (amountTmp == 0 && callBack)
                            callBack(parent);
                    }));
                });
            }
        }
        static coinCollectAnimAni(ani, startPos, endPos, parent, amount = 15, callBack = null) {
            var amountTmp = amount;
            for (var i = 0; i < amount; i++) {
                let coin = Laya.Pool.getItemByClass("coinAnim", Laya.Clip);
                coin.skin = ani.skin;
                coin.index = ani.index;
                coin.clipX = ani.clipX;
                coin.clipY = ani.clipY;
                coin.autoPlay = ani.autoPlay;
                coin.x = startPos.x;
                coin.y = startPos.y;
                coin.scale(0.8, 0.8);
                parent.addChild(coin);
                let time = 300 + Math.random() * 100 - 50;
                Laya.Tween.to(coin, { x: coin.x + Math.random() * 250 - 125, y: coin.y + Math.random() * 250 - 125 }, time);
                Laya.timer.once(time + 50, this, function () {
                    Laya.Tween.to(coin, { x: endPos.x, y: endPos.y }, 400, null, new Laya.Handler(this, function () {
                        parent.removeChild(coin);
                        Laya.Pool.recover("coinAnim", coin);
                        amountTmp--;
                        if (amountTmp == 0 && callBack)
                            callBack(parent);
                    }));
                });
            }
        }
        static numberTo(base, target, dt) {
            if (base < target) {
                base += dt;
            }
            else if (base > target) {
                base -= dt;
            }
            if (Math.abs((target - base)) < dt) {
                base = target;
            }
            return base;
        }
        static findNodeByName(rootNode, name) {
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
        static loadJsonFile(path, callBack) {
            Laya.loader.load(path, Laya.Handler.create(this, (json) => {
                var data = Laya.loader.getRes(path);
                callBack(data);
            }), null, Laya.Loader.JSON);
        }
        static objectShake(target, shakeTime = 1, shakeAmount = 0.7) {
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
                }
            }
        }
        static objectScaleTips(target) {
            let t = new Tween3D();
            let normalScale = target.transform.localScale.clone();
            let smallScale = Tools.Vector3Axis(normalScale, 0.8);
            let bigScale = Tools.Vector3Axis(normalScale, 1.2);
            t.toTween(target, { sca: smallScale }, 50)
                .then({ sca: bigScale }, 50)
                .then({ sca: normalScale }, 50);
        }
        static vibrateShort() {
            if (Laya.Browser.onWeiXin) {
                wx.vibrateShort({
                    success: function () { },
                    fail: function () { },
                    complete: function () { }
                });
            }
        }
        static delayCall(call, time) {
            setTimeout(() => {
                call();
            }, time);
        }
        static RotateWithAxis(myPos, targetPos, axis, angle) {
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

    class StageUpdate extends Laya.Script {
        onUpdate() {
            if (Stage.instance.isStart) {
            }
        }
    }

    class TouchWayCheck extends Laya.Script {
        constructor() {
            super(...arguments);
            this.calls = [];
        }
        onAwake() {
            this.init();
        }
        init() {
            Laya.timer.frameLoop(1, this, this.update);
        }
        update() {
        }
        onMouseDown(e) {
            if (this.touchTimer) {
                clearTimeout(this.touchTimer);
            }
            this.isDown = true;
            this.startPos = new Laya.Vector2(e.stageX, e.stageY);
            this.nowPos = this.startPos;
            this.touchTimer = setTimeout(() => {
                this.isDown = false;
            }, 1000);
        }
        onMouseMove(e) {
            if (this.isDown) {
                this.nowPos = new Laya.Vector2(e.stageX, e.stageY);
                this.WayCheck();
            }
        }
        onMouseUp(e) {
            this.isDown = false;
        }
        WayCheck() {
            let dir = Tools.Vector2Reduce(this.nowPos, this.startPos);
            let scale = Tools.Vector2Scale(dir);
            if (scale > 10) {
                let angle = Math.atan2(dir.y, dir.x) / Math.PI * 180;
                let call = "none";
                if (angle > -135 && angle < -45) {
                    call = "up";
                }
                else if (angle > -45 && angle < 45) {
                    call = "right";
                }
                else if (angle < 135 && angle > 45) {
                    call = "down";
                }
                else if (angle < -135 || angle > 135) {
                    call = "left";
                }
                if (call != "none") {
                    if (this.calls.length < 2) {
                        this.calls.push(call);
                    }
                    else {
                        if (Stage.instance.isCalling) {
                            this.calls[1] = call;
                        }
                        else {
                            this.calls[1] = this.calls[0];
                            this.calls[0] = call;
                        }
                    }
                    Stage.instance.callUpdate();
                }
                this.isDown = false;
            }
            this.startPos = this.nowPos;
        }
        onDestroy() {
            if (this.touchTimer) {
                clearTimeout(this.touchTimer);
            }
        }
    }

    var ModelAnimClips;
    (function (ModelAnimClips) {
        ModelAnimClips["Idle"] = "Idle";
        ModelAnimClips["Jump"] = "Jump";
        ModelAnimClips["End"] = "End";
        ModelAnimClips["Move"] = "Move";
        ModelAnimClips["Dance"] = "Dance";
    })(ModelAnimClips || (ModelAnimClips = {}));
    class ModelAnimController {
        static playAnim(name) {
            let nowName = Data.anim.getControllerLayer(0).getCurrentPlayState().animatorState.name;
            if (nowName != name) {
                Data.anim.play(name, 0, 0);
            }
        }
        static FadeIn(name) {
            Data.anim.crossFade(name, 0.2, 0, 0);
        }
    }

    class SGConfig {
        static getServerConfig(cb) {
            window['SGGameConfigs']().then((res) => {
                cb(res.data);
            });
        }
        static initConfigData(cb) {
            this.version = window['SGSdkConf'].version;
            if (this._wx.getLaunchOptionsSync().query.channel) {
                localStorage.setItem('channel', this._wx.getLaunchOptionsSync().query.channel);
            }
            this.getServerConfig((data) => {
                console.log('后台参数:', data);
                this.data = new ConfigData();
                var configs = data.configs;
                for (let key in configs) {
                    this.data[key] = configs[key].config_val;
                }
                this.data.is_allow_area = data.is_allow_area;
                this.data.front_wuchu_scene = data.front_wuchu_scene;
                this.data.wuchu_version = data.wuchu_version;
                let channel = this._wx.getLaunchOptionsSync().query.channel;
                if (!this.isVersionValid) {
                    for (let key in this.data) {
                        if (typeof (this.data[key]) == "boolean")
                            this.data[key] = false;
                    }
                    this.data.front_video_tips_switch = true;
                }
                else if (!this.data.is_allow_area || !this.allowScene || (this.data.channel_ditch && !channel)) {
                    this.data.front_remen_banner_switch = false;
                }
                console.log('最终参数:', this.data);
                cb && cb();
            });
        }
        static get allowScene() {
            if (this.isWechat && this.data.front_wuchu_scene) {
                var launchInfo = this._wx.getLaunchOptionsSync();
                let scene = launchInfo.scene.toString();
                console.log('当前场景值：', scene);
                let arr = this.data.front_wuchu_scene.split('|');
                return arr.indexOf(scene) != -1;
            }
            return false;
        }
        static get isVersionValid() {
            if (!this._wx)
                return false;
            let myV = this.version.split('.');
            let serverV = this.data.wuchu_version.split('.');
            return (parseInt(serverV[0]) + parseInt(serverV[1]) + parseInt(serverV[2])) >= (parseInt(myV[0]) + parseInt(myV[1]) + parseInt(myV[2]));
        }
    }
    SGConfig.version = '1.0.1';
    SGConfig.isPortrait = true;
    SGConfig.homeMoreGameType = 2;
    SGConfig.isShowHomeBanner = true;
    SGConfig.isShowShopBanner = false;
    SGConfig.isShowGameBanner = true;
    SGConfig.isShowFinishBanner = true;
    SGConfig.isShowHomeSideGrid = true;
    SGConfig.isShowGameSingleGrid = true;
    SGConfig.isShowFinishSideGrid = true;
    SGConfig.data = null;
    SGConfig._wx = Laya.Browser.window.wx;
    SGConfig.isWechat = Laya.Browser.onWeiXin;
    class ConfigData {
        constructor() {
            this.is_allow_area = false;
            this.channel_ditch = false;
            this.front_wuchu_scene = '1095|1058|1045|1046|1067|1084|1144|1091|1152|1089|1001|1007|1038|1037';
            this.wuchu_version = '1.0.1';
            this.front_banner_ids = [];
            this.front_video_ids = [];
            this.front_interstitial_ids = [];
            this.front_custom_full_ids = [];
            this.front_custom_side_ids = [];
            this.front_custom_single_ids = [];
            this.front_remen_click_count = 1;
            this.front_banner_refresh_time = 5;
            this.front_banner_show_count = 3;
            this.front_remen_start_gameCount = 1;
            this.front_remen_over_gameCount = 1;
            this.front_remen_finish_gameCount = 1;
            this.front_remen_banner_showHide_time = 0.6;
            this.front_moreGame_switch = true;
            this.front_video_tips_switch = true;
            this.front_remen_loading_switch = true;
            this.front_remen_start_switch = true;
            this.front_remen_over_switch = true;
            this.front_remen_finish_switch = true;
            this.front_remen_banner_switch = false;
            this.front_interstitial_onHide_switch = true;
            this.front_interstitial_afterRemen_switch = true;
        }
    }

    class SGAD {
        static initAd(cb) {
            if (!Laya.Browser.onWeiXin) {
                cb && cb();
                return;
            }
            ;
            this.front_banner_ids = SGConfig.data.front_banner_ids;
            this.front_video_ids = SGConfig.data.front_video_ids;
            this.front_interstitial_ids = SGConfig.data.front_interstitial_ids;
            this.front_custom_full_ids = SGConfig.data.front_custom_full_ids;
            this.front_custom_side_ids = SGConfig.data.front_custom_side_ids;
            this.front_custom_single_ids = SGConfig.data.front_custom_single_ids;
            this.front_banner_ids = this.shuffleArr(this.front_banner_ids);
            this.front_video_ids = this.shuffleArr(this.front_video_ids);
            this.front_interstitial_ids = this.shuffleArr(this.front_interstitial_ids);
            this.front_custom_full_ids = this.shuffleArr(this.front_custom_full_ids);
            this.front_custom_side_ids = this.shuffleArr(this.front_custom_side_ids);
            this.front_custom_single_ids = this.shuffleArr(this.front_custom_single_ids);
            this.initCustomAD();
            this.initBanner();
            this.createVideoAd();
            this.createInterstitialAd();
            let func = () => {
                if (this.isFullGridAdLoaded) {
                    cb && cb();
                    Laya.timer.clear(this, func);
                }
            };
            Laya.timer.loop(100, this, func);
        }
        static getSystemInfoSync() {
            if (!Laya.Browser.onWeiXin)
                return;
            if (!this.sysInfo) {
                this.sysInfo = Laya.Browser.window.wx.getSystemInfoSync();
            }
            return this.sysInfo;
        }
        static initBanner() {
            if (!Laya.Browser.onWeiXin || this.front_banner_ids.length <= 0)
                return;
            this.bannerAds = [];
            this.bannerIndex = 0;
            this.bannerTimesArr = [];
            this.bannerShowCount = [];
            this.bannerErrorArr = [];
            for (let i = 0; i < this.front_banner_ids.length; i++) {
                this.bannerTimesArr.push(0);
                this.bannerShowCount.push(0);
                this.bannerErrorArr.push(false);
            }
            for (let i = 0; i < this.front_banner_ids.length; i++) {
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
        static showBannerAd() {
            if (!Laya.Browser.onWeiXin)
                return;
            if (this.isAllBannerError) {
                this.stopCountBannerTime();
                this.initBanner();
                return;
            }
            for (let i = 0; i < this.bannerErrorArr.length; i++) {
                if (this.bannerErrorArr[this.bannerIndex]) {
                    this.bannerIndex++;
                    if (this.bannerIndex >= this.front_banner_ids.length)
                        this.bannerIndex = 0;
                }
                else {
                    break;
                }
            }
            this.bannerAds[this.bannerIndex] && this.bannerAds[this.bannerIndex].show();
            this.stopCountBannerTime();
            Laya.timer.loop(100, this, this.countBannerTime);
        }
        static hideBannerAd() {
            if (!Laya.Browser.onWeiXin)
                return;
            if (this.isAllBannerError) {
                this.stopCountBannerTime();
                return;
            }
            for (let i = 0; i < this.bannerAds.length; i++) {
                this.bannerAds[i] && this.bannerAds[i].hide();
            }
            this.stopCountBannerTime();
        }
        static countBannerTime() {
            this.bannerTimesArr[this.bannerIndex] += 0.1;
            if (this.bannerTimesArr[this.bannerIndex] >= SGConfig.data.front_banner_refresh_time) {
                this.bannerAds[this.bannerIndex] && this.bannerAds[this.bannerIndex].hide();
                this.bannerTimesArr[this.bannerIndex] = 0;
                this.bannerShowCount[this.bannerIndex]++;
                if (this.bannerShowCount[this.bannerIndex] >= SGConfig.data.front_banner_show_count) {
                    this.bannerShowCount[this.bannerIndex] = 0;
                    this.bannerAds[this.bannerIndex] && this.bannerAds[this.bannerIndex].destroy();
                    this.bannerAds[this.bannerIndex] = null;
                    this.bannerAds[this.bannerIndex] = this.createBannerAd(this.bannerIndex);
                }
                this.bannerIndex++;
                if (this.bannerIndex >= this.front_banner_ids.length)
                    this.bannerIndex = 0;
                this.showBannerAd();
            }
        }
        static stopCountBannerTime() {
            Laya.timer.clear(this, this.countBannerTime);
        }
        static createBannerAd(index) {
            if (!Laya.Browser.onWeiXin)
                return;
            let sysInfo = this.getSystemInfoSync();
            let bannerAd = Laya.Browser.window.wx.createBannerAd({
                adUnitId: this.front_banner_ids[index],
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
        static createVideoAd() {
            if (!Laya.Browser.onWeiXin || this.front_video_ids.length <= 0)
                return;
            if (this.isVideoLoading) {
                return;
            }
            this.isVideoLoading = true;
            if (Laya.Browser.onWeiXin) {
                var self = this;
                var videoAd = this.videoAd;
                if (videoAd != null) {
                    videoAd.offLoad(onLoadVideo);
                    videoAd.offError(onErrorVideo);
                    videoAd.offClose(onCloseVideo);
                }
                var videoAd = Laya.Browser.window.wx.createRewardedVideoAd({ adUnitId: self.front_video_ids[0] });
                videoAd.onLoad(onLoadVideo);
                videoAd.onError(onErrorVideo);
                videoAd.onClose(onCloseVideo);
                this.videoAd = videoAd;
            }
            function onLoadVideo() {
                console.log('video 加载成功');
                self.isExistVideoAd = true;
                this.isVideoLoading = false;
            }
            function onErrorVideo(err) {
                console.error('video 加载错误', err);
                self.isExistVideoAd = false;
                this.isVideoLoading = false;
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
            if (!Laya.Browser.onWeiXin || this.front_video_ids.length <= 0) {
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
                if (!this.videoAd) {
                    Laya.Browser.window.wx.showToast({
                        title: '暂无视频',
                        duration: 2000
                    });
                    completeCB && completeCB();
                    return;
                }
                var videoAd = this.videoAd;
                videoAd.show().then(() => { }).catch(err => {
                    videoAd.load().then(() => videoAd.show()).catch(err => {
                        self.videoCompleteCallback && self.videoCompleteCallback();
                        self.videoCompleteCallback = null;
                        if (!errorFinish && this.videoFinishCallback) {
                            Laya.Browser.window.wx.showToast({
                                title: '暂无视频',
                                duration: 2000
                            });
                        }
                        if (errorFinish && this.videoFinishCallback) {
                            this.videoFinishCallback && this.videoFinishCallback();
                            this.videoFinishCallback = null;
                            Laya.Browser.window.wx.showToast({
                                title: '已获得奖励',
                                duration: 2000
                            });
                        }
                        this.destroyVideoAd();
                    });
                });
            }
        }
        static destroyVideoAd() {
            if (!this.videoAd)
                return;
            this.videoAd.destroy();
            this.videoAd = null;
            this.createVideoAd();
        }
        static initCustomAD() {
            if (!Laya.Browser.onWeiXin) {
                return;
            }
            this.createFullGrid();
            this.createSideGrid();
            this.createSingleGrid();
        }
        static createFullGrid() {
            if (!Laya.Browser.onWeiXin || this.front_custom_full_ids.length <= 0) {
                this.isFullGridAdLoaded = true;
                return;
            }
            let loadCount = 0;
            let count = SGConfig.isPortrait ? 1 : 2;
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
                    adUnitId: this.front_custom_full_ids[i],
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
                    console.log('全屏格子' + i.toString() + '加载成功:');
                });
            }
        }
        static visibleFullGridAd(v = true) {
            if (!Laya.Browser.onWeiXin || this.fullGridAd.length <= 0)
                return;
            for (let i = 0; i < this.fullGridAd.length; i++) {
                v ? this.fullGridAd[i].show() : this.fullGridAd[i].hide();
            }
        }
        static createSideGrid() {
            if (!Laya.Browser.onWeiXin || this.front_custom_side_ids.length <= 0)
                return;
            for (let i = 0; i < 2; i++) {
                let id = i < this.front_custom_side_ids.length ? i : this.front_custom_side_ids.length - 1;
                let grid = Laya.Browser.window.wx.createCustomAd({
                    adUnitId: this.front_custom_side_ids[id],
                    adIntervals: 30,
                    style: {
                        left: i == 0 ? 0 : this.getSystemInfoSync().screenWidth - 65,
                        top: this.getSystemInfoSync().screenHeight * 0.1
                    }
                });
                grid.onError((err) => { console.log('屏幕侧格子加载失败:', JSON.stringify(err)); });
                grid.onLoad(() => { console.log('屏幕侧格子' + i.toString() + '加载成功:'); this.sideGridAd.push(grid); });
            }
        }
        static visibleSideGridAd(v = true) {
            if (!Laya.Browser.onWeiXin)
                return;
            for (let i = 0; i < this.sideGridAd.length; i++) {
                v ? this.sideGridAd[i].show() : this.sideGridAd[i].hide();
            }
        }
        static createSingleGrid() {
            if (!Laya.Browser.onWeiXin || this.front_custom_single_ids.length <= 0)
                return;
            for (let i = 0; i < 2; i++) {
                let id = i < this.front_custom_single_ids.length ? i : this.front_custom_single_ids.length - 1;
                let grid = Laya.Browser.window.wx.createCustomAd({
                    adUnitId: this.front_custom_single_ids[id],
                    adIntervals: 30,
                    style: {
                        left: i == 0 ? 0 : this.getSystemInfoSync().screenWidth - 70,
                        top: this.getSystemInfoSync().screenHeight * 0.1
                    }
                });
                grid.onError((err) => { ; console.log('单格子加载失败:', JSON.stringify(err)); });
                grid.onLoad(() => { console.log('单格子' + i.toString() + '加载成功:'); this.singleGridAd.push(grid); });
            }
        }
        static visibleGameGridAd(v = true) {
            if (!Laya.Browser.onWeiXin)
                return;
            for (let i = 0; i < this.singleGridAd.length; i++) {
                v ? this.singleGridAd[i].show() : this.singleGridAd[i].hide();
            }
        }
        static createInterstitialAd() {
            if (!Laya.Browser.onWeiXin || this.front_interstitial_ids.length <= 0)
                return;
            if (this.intersititialAd) {
                this.intersititialAd.offError();
                this.intersititialAd.offLoad();
                this.intersititialAd.offClose();
                this.intersititialAd.destroy();
                this.intersititialAd = null;
            }
            this.intersititialAd = Laya.Browser.window.wx.createInterstitialAd({
                adUnitId: this.front_interstitial_ids[0]
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
    SGAD.front_banner_ids = [];
    SGAD.front_video_ids = [];
    SGAD.front_interstitial_ids = [];
    SGAD.front_custom_full_ids = [];
    SGAD.front_custom_side_ids = [];
    SGAD.front_custom_single_ids = [];
    SGAD.bannerAds = [];
    SGAD.bannerIndex = 0;
    SGAD.bannerTimesArr = [];
    SGAD.bannerShowCount = [];
    SGAD.bannerErrorArr = [];
    SGAD.isExistVideoAd = false;
    SGAD.isVideoLoading = false;
    SGAD.fullGridAd = [];
    SGAD.fullGridError = false;
    SGAD.fullGridShowCount = 0;
    SGAD.fullGridCurIndex = 0;
    SGAD.isFullGridAdLoaded = false;
    SGAD.sideGridAd = [];
    SGAD.singleGridAd = [];
    SGAD.intersititialAd = null;
    SGAD.intersititialCB = null;
    SGAD.intersititialError = false;

    class SGMgr {
        static init(cb) {
            if (!Laya.Browser.onWeiXin) {
                cb && cb();
                return;
            }
            SGConfig.initConfigData(() => {
                SGAD.initAd(() => {
                    this.adLoaded = true;
                });
                this.sdkLoaded = true;
                if (SGConfig.data.front_interstitial_onHide_switch) {
                    Laya.Browser.window.wx.onShow(() => { SGAD.showInterstitialAd(); });
                }
            });
            let fun = () => {
                if (this.adLoaded && this.sdkLoaded) {
                    Laya.timer.clear(this, fun);
                    this.showLoading(cb);
                }
            };
            Laya.timer.loop(100, this, fun);
        }
        static showLoading(cb) {
            if (!Laya.Browser.onWeiXin) {
                cb && cb();
                return;
            }
            this.showRemen(RemenIndex.Remen_Loading, cb);
        }
        static inHome() {
            if (!Laya.Browser.onWeiXin) {
                return;
            }
            if (SGConfig.isShowHomeBanner)
                SGAD.showBannerAd();
            if (SGConfig.isShowHomeSideGrid)
                SGAD.visibleSideGridAd(true);
            this.visibleHomeUI(true);
        }
        static inShop() {
            if (!Laya.Browser.onWeiXin) {
                return;
            }
            SGAD.hideBannerAd();
            if (SGConfig.isShowShopBanner)
                SGAD.showBannerAd();
            SGAD.visibleSideGridAd(false);
            this.visibleHomeUI(false);
        }
        static moreGame() {
            SGAD.hideBannerAd();
            SGAD.visibleSideGridAd(false);
            this.showRemen(RemenIndex.Remen_Start, () => {
                if (SGConfig.isShowHomeBanner)
                    SGAD.showBannerAd();
                if (SGConfig.isShowHomeSideGrid)
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
            this.showRemen(RemenIndex.Remen_Start, cb);
        }
        static inGame() {
            if (!Laya.Browser.onWeiXin) {
                return;
            }
            SGAD.hideBannerAd();
            if (SGConfig.isShowGameBanner)
                SGAD.showBannerAd();
            if (SGConfig.isShowGameSingleGrid)
                SGAD.visibleGameGridAd(true);
        }
        static gameOver(cb) {
            if (!Laya.Browser.onWeiXin) {
                cb && cb();
                return;
            }
            SGAD.hideBannerAd();
            SGAD.visibleGameGridAd(false);
            this.showRemen(RemenIndex.Remen_Over, cb);
        }
        static inFinish() {
            if (!Laya.Browser.onWeiXin) {
                return;
            }
            SGAD.hideBannerAd();
            if (SGConfig.isShowFinishBanner)
                SGAD.showBannerAd();
            if (SGConfig.isShowFinishSideGrid)
                SGAD.visibleSideGridAd(true);
        }
        static backToHome(cb) {
            if (!Laya.Browser.onWeiXin) {
                cb && cb();
                return;
            }
            SGAD.hideBannerAd();
            SGAD.visibleSideGridAd(false);
            this.showRemen(RemenIndex.Remen_Finish, () => {
                cb && cb();
                this.gameCount++;
            });
        }
        static showRemen(index, cb, isMust = false) {
            let v = false;
            switch (index) {
                case RemenIndex.Remen_Loading:
                    v = SGConfig.data.front_remen_loading_switch;
                    break;
                case RemenIndex.Remen_Start:
                    v = SGConfig.data.front_remen_start_switch && this.gameCount >= SGConfig.data.front_remen_start_gameCount;
                    break;
                case RemenIndex.Remen_Over:
                    v = SGConfig.data.front_remen_over_switch && this.gameCount >= SGConfig.data.front_remen_over_gameCount;
                    break;
                case RemenIndex.Remen_Finish:
                    v = SGConfig.data.front_remen_finish_switch && this.gameCount >= SGConfig.data.front_remen_finish_gameCount;
                    break;
            }
            if (v || isMust) {
                Laya.Scene.open(SceneType$1.SGRemen, false, { ccb: cb, index: index });
            }
            else {
                cb && cb();
            }
        }
        static visibleHomeUI(v = true) {
            if (v)
                Laya.Scene.open(SceneType$1.SGHomeUI, false);
            else
                Laya.Scene.close(SceneType$1.SGHomeUI);
        }
    }
    SGMgr.gameCount = 1;
    SGMgr.adLoaded = false;
    SGMgr.sdkLoaded = false;
    var SceneType$1;
    (function (SceneType) {
        SceneType["SGRemen"] = "SGScene/SGRemen.scene";
        SceneType["SGHomeUI"] = "SGScene/SGHomeUI.scene";
    })(SceneType$1 || (SceneType$1 = {}));
    var RemenIndex;
    (function (RemenIndex) {
        RemenIndex[RemenIndex["Remen_Loading"] = 0] = "Remen_Loading";
        RemenIndex[RemenIndex["Remen_Start"] = 1] = "Remen_Start";
        RemenIndex[RemenIndex["Remen_Over"] = 2] = "Remen_Over";
        RemenIndex[RemenIndex["Remen_Finish"] = 3] = "Remen_Finish";
    })(RemenIndex || (RemenIndex = {}));

    class Stage extends BaseUI {
        constructor() {
            super(...arguments);
            this.isStart = false;
            this.isSuccess = true;
            this.isCalling = false;
            this.nowCube = [];
            this.stageID = 0;
            this.trailPos = [];
            this.trailPosTime = [];
        }
        init() {
            Stage.instance = this;
            this.update = this.getComponent(StageUpdate);
            Data.nowScene = 2;
            console.log("Stage开始执行");
            this.ButtonInit();
            this.ValueInit();
            this.GameInit();
            this.Totarial();
            this.GameStart();
        }
        ButtonInit() {
        }
        ValueInit() {
            let grade = PlayerData.GetPlayerData().grade;
            this.coinValue.value = Data.readCoin().toString();
            this.gradeValue.value = Data.readGrade().toString();
        }
        Totarial() {
            var tl = new Laya.Animation();
            tl.loadAnimation("Anim/Totourial.ani");
            tl.x = this.scene.width / 2;
            tl.y = this.scene.height - 300;
            this.scene.addChild(tl);
            tl.play();
            this.TotarialAnim = tl;
            this.collectAllUI.set_visible(false);
            this.backCollectUI.set_visible(false);
            this.springPanel.set_visible(false);
            this.beaconPanel.set_visible(false);
            this.holePanel.set_visible(false);
            if (Data.readGrade() == 1) {
                this.springPanel.set_visible(true);
            }
            else if (Data.readGrade() == 3) {
                this.beaconPanel.set_visible(true);
            }
            else if (Data.readGrade() == 7) {
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
            Tools.TouchOff(this.GameStart, () => { }, () => { }, this);
            this.TotarialAnim.destroy();
            this.TotarialUI.destroy();
        }
        DrawUI() {
        }
        BackUI() {
        }
        GameInit() {
            let end = Data.scene3D.getChildByName("End");
            let chest = end.getChildByName("Chest");
            let anim = chest.getComponent(Laya.Animator);
            Data.fxController.BornChestAllFx(chest.transform.position.clone());
            anim.play("Idle");
        }
        GameStart() {
            console.log("游戏正式开始");
            this.isStart = true;
            this.coinValue.value = Data.readCoin().toString();
            this.PlayerStart();
            SGMgr.inGame();
        }
        GameEnd() {
            this.callDoneAndCanel();
            this.touchWayCheck.destroy();
            console.log("游戏结束");
            console.log("结算板子数：", this.nowCube.length);
            this.isStart = false;
            this.getComponent(StageUpdate).destroy();
            Data.isSuccess = this.isSuccess;
            Data.mainCam.getComponent(CamFollow).destroy();
            this.EndAnim();
        }
        EndAnim() {
            let t = new Tween3D();
            let end = Data.scene3D.getChildByName("End");
            let chest = end.getChildByName("Chest");
            let endPos = chest.transform.position.clone();
            Data.fxController.smokeFx.transform.localPositionY = 0;
            endPos.y = 0;
            let endItemIs = Math.floor(this.nowCube.length / 5);
            let endItemIndex = this.nowCube.length % 5;
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
                    tcam.toTween(Data.mainCam, { pos: camPos3, rot: camRot3 }, 1000);
            });
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
                        Data.fxController.BornFireWorksAlways(new Laya.Vector3(Data.player.transform.position.clone().x + 3, 0, Data.player.transform.position.clone().z));
                        Data.fxController.BornFireWorksAlways(new Laya.Vector3(Data.player.transform.position.clone().x - 3, 0, Data.player.transform.position.clone().z));
                        setTimeout(() => {
                            SGMgr.gameOver(() => {
                                Laya.Scene.open(SceneUrl.ENDMENU);
                            });
                        }, 2000);
                    });
                }
                else {
                    Data.fxController.BornFireWorksAlways(new Laya.Vector3(Data.player.transform.position.clone().x + 3, 0, Data.player.transform.position.clone().z));
                    Data.fxController.BornFireWorksAlways(new Laya.Vector3(Data.player.transform.position.clone().x - 3, 0, Data.player.transform.position.clone().z));
                    setTimeout(() => {
                        SGMgr.gameOver(() => {
                            Laya.Scene.open(SceneUrl.ENDMENU);
                        });
                    }, 2000);
                }
            });
            for (let i = 0; i < endItemIs; i++) {
                for (let j = 1; j <= 5; j++) {
                    let distance = 20 + i * 7 + 0.5 + j;
                    let cubePos = new Laya.Vector3(Data.player.transform.position.clone().x, 0, Data.player.transform.position.clone().z + distance);
                    let cubeTimer = distance * 50;
                    this.EndCubeSet(cubePos, cubeTimer);
                }
            }
            for (let i = 0; i < endItemIndex; i++) {
                let distance = 20 + endItemIs * 7 + 1.5 + i;
                let cubePos = new Laya.Vector3(Data.player.transform.position.clone().x, 0, Data.player.transform.position.clone().z + distance);
                let cubeTimer = distance * 50;
                this.EndCubeSet(cubePos, cubeTimer);
            }
            Data.endAxis = 1 + endItemIs * 0.1;
            Data.endCoin = Data.endAxis * 10;
            if (isChest) {
                Data.endCoin += 30;
            }
        }
        coinAnimGo(pos) {
            pos = Tools.getSpritePosBySprite3DPoint(pos);
            pos.y -= 300;
            Tools.coinCollectAnimAni(this.coinAnim, pos, new Laya.Vector2(this.coinValue.x, this.coinValue.y), this.scene, 30);
        }
        EndCubeSet(pos, timer) {
            if (this.nowCube.length == 0)
                return true;
            setTimeout(() => {
                Tools.vibrateShort();
                let useCube = this.nowCube[this.nowCube.length - 1];
                Data.scene3D.addChild(useCube);
                useCube.transform.position = pos;
                this.putDownCube(useCube);
                this.nowCube.splice(this.nowCube.length - 1, 1);
                Data.model.transform.localPositionY = 0.3 + 0.3 * this.nowCube.length;
            }, timer);
            return false;
        }
        PlayerStart() {
            this.touchWayCheck = this.addComponent(TouchWayCheck);
        }
        callUpdate() {
            if (this.isCalling)
                return;
            this.isCalling = true;
            let calls = this.touchWayCheck.calls;
            let call = calls[0];
            this.doCall(call);
        }
        doCall(call) {
            let playerPos = Data.player.transform.position.clone();
            let toPos = playerPos;
            playerPos.y = 0;
            this.trailPos = [];
            this.trailPosTime = [];
            this.trailPos.push(toPos);
            let endPos = this.getNextPos(playerPos, call);
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
            if (this.trailPos.length > 1) {
                let count = 0;
                let cb = () => {
                    if (!this.pickPosCube(this.trailPos[count])) {
                        ModelAnimController.FadeIn(ModelAnimClips.Move);
                    }
                    if (Laya.Vector3.equals(this.trailPos[count], StageController.endPos[this.stageID])) {
                        console.log("离开", this.stageID);
                        this.stageID++;
                        console.log("去往", this.stageID);
                        if (this.stageID < StageController.roadCubes.length) {
                            this.doCall(call);
                        }
                        else {
                            this.GameEnd();
                        }
                        return;
                    }
                    if (Laya.Vector3.equals(this.trailPos[count], StageController.startPos[this.stageID])) {
                        console.log("离开", this.stageID);
                        this.stageID--;
                        console.log("去往", this.stageID);
                        if (this.stageID >= 0) {
                            this.doCall(call);
                            return;
                        }
                        else {
                            this.stageID = 0;
                            console.log("已返回起始点");
                        }
                    }
                    if (count != 0) {
                        if (!this.checkPosTrail(this.trailPos[count])) {
                            this.backCollectUI.set_visible(true);
                            setTimeout(() => {
                                this.backCollectUI.set_visible(false);
                            }, 2000);
                            this.callDoneAndCanel();
                            return;
                        }
                        if (this.checkPosWorm(this.trailPos[count])) {
                            return;
                        }
                        if (this.checkPosBeacon(this.trailPos[count])) {
                            return;
                        }
                        if (this.checkPosSpring(this.trailPos[count], call)) {
                            return;
                        }
                        if (this.checkPosStop(this.trailPos[count])) {
                            this.callDone();
                            return;
                        }
                    }
                    else {
                        if (!this.checkPosTrail(this.trailPos[count + 1])) {
                            this.backCollectUI.set_visible(true);
                            setTimeout(() => {
                                this.backCollectUI.set_visible(false);
                            }, 2000);
                            this.callDoneAndCanel();
                            return;
                        }
                    }
                    count++;
                    if (count < this.trailPos.length) {
                        let tween = new Tween3D();
                        Data.fxController.smokeFx.transform.localPositionY = 0;
                        tween.toTween(Data.player, { pos: this.trailPos[count] }, this.trailPosTime[count], cb);
                    }
                    else {
                        this.callDone();
                    }
                };
                cb();
            }
            else {
                this.callDone();
            }
        }
        callDone() {
            let calls = this.touchWayCheck.calls;
            calls.splice(0, 1);
            Tools.vibrateShort();
            if (calls.length > 0) {
                let call = calls[0];
                this.doCall(call);
            }
            else {
                this.isCalling = false;
                Data.fxController.smokeFx.transform.localPositionY = -1000;
            }
        }
        callDoneAndCanel() {
            Tools.vibrateShort();
            this.touchWayCheck.calls = [];
            this.isCalling = false;
            Data.fxController.smokeFx.transform.localPositionY = -1000;
        }
        getNextPos(nowPos, distance) {
            let roadCubes = StageController.roadCubes[this.stageID];
            let canGoPos = nowPos;
            for (let i = 0; i < roadCubes.length; i++) {
                let dir = Tools.Vector3Reduce(roadCubes[i], nowPos);
                let dis = Laya.Vector3.scalarLength(dir);
                if (dis == 1) {
                    let angle = Math.atan2(dir.z, dir.x) / Math.PI * 180;
                    let call = "none";
                    if (angle == 90) {
                        call = "up";
                    }
                    else if (angle == 180) {
                        call = "right";
                    }
                    else if (angle == -90) {
                        call = "down";
                    }
                    else if (angle == 0) {
                        call = "left";
                    }
                    if (distance == call) {
                        canGoPos = roadCubes[i];
                        break;
                    }
                }
            }
            if (nowPos != canGoPos) {
                this.trailPos.push(canGoPos);
                canGoPos = this.getNextPos(canGoPos, distance);
            }
            return canGoPos;
        }
        getCanGoPos(nowPos) {
        }
        checkPosSpecial(pos) {
            let canPickCubes = StageController.canPickCubes[this.stageID];
            for (let i = 0; i < canPickCubes.length; i++) {
                let obj = canPickCubes[i];
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
            let Out = StageController.wormHoleOut;
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
        pickPosCube(pos) {
            let canPickCubes = StageController.canPickCubes[this.stageID];
            for (let i = 0; i < canPickCubes.length; i++) {
                let obj = canPickCubes[i];
                if (Laya.Vector3.equals(obj.transform.position, pos)) {
                    canPickCubes.splice(i, 1);
                    Data.player.addChild(obj);
                    this.CubePickDo(obj);
                    ModelAnimController.FadeIn(ModelAnimClips.Jump);
                    if (canPickCubes.length == 0) {
                        this.collectAllUI.set_visible(true);
                        setTimeout(() => {
                            Laya.Tween.to(this.collectAllUI, { alpha: 0 }, 300);
                            setTimeout(() => {
                                this.collectAllUI.set_visible(false);
                                this.collectAllUI.alpha = 1;
                            }, 1000);
                        }, 1000);
                        console.log("该板块收集完毕", this.stageID);
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
            let ui = new Laya.FontClip(this.addOneUI.skin, "0123456789*+");
            ui.value = "+1";
            ui.x = uiPos.x - 50;
            ui.y = uiPos.y - 100;
            this.scene.addChild(ui);
            Laya.Tween.to(ui, { y: ui.y - 100, alpha: 0 }, 500, null, Laya.Handler.create(this, () => {
                ui.destroy();
            }));
        }
        checkPosTrail(pos) {
            let trailPoses = StageController.trailPos[this.stageID];
            if (!trailPoses)
                return true;
            for (let i = 0; i < trailPoses.length; i++) {
                if (Laya.Vector3.equals(pos, trailPoses[i])) {
                    if (this.nowCube.length <= 1)
                        return false;
                    let useCube = this.nowCube[this.nowCube.length - 1];
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
                            this.doCall("down");
                        }
                        else if (dir == "up") {
                            this.doCall("left");
                        }
                    }
                    else if (forward.x == 1) {
                        if (dir == "left") {
                            this.doCall("down");
                        }
                        else if (dir == "up") {
                            this.doCall("right");
                        }
                    }
                    else if (forward.x == -1) {
                        if (dir == "right") {
                            this.doCall("up");
                        }
                        else if (dir == "down") {
                            this.doCall("left");
                        }
                    }
                    else if (forward.z == -1) {
                        if (dir == "left") {
                            this.doCall("up");
                        }
                        else if (dir == "down") {
                            this.doCall("right");
                        }
                    }
                    return true;
                }
            }
            return false;
        }
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
                    }
                    else if (forward.x == 1) {
                        this.doCall("down");
                    }
                    else if (forward.x == -1) {
                        this.doCall("up");
                    }
                    else if (forward.z == -1) {
                        this.doCall("right");
                    }
                    return true;
                }
            }
            return false;
        }
        checkPosWorm(pos) {
            let In = StageController.wormHoleIn;
            let Out = StageController.wormHoleOut;
            for (let key in In) {
                let value = In[key];
                if (Laya.Vector3.equals(pos, value)) {
                    let tween = new Tween3D();
                    let downPos = Tools.Vector3Reduce(pos, new Laya.Vector3(0, this.nowCube.length * 0.3 + 1.5, 0));
                    let upPos = this.GoOutWorm(key);
                    let goPos = Tools.Vector3Reduce(upPos, new Laya.Vector3(0, this.nowCube.length * 0.3 + 1.5, 0));
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
                    let downPos = Tools.Vector3Reduce(pos, new Laya.Vector3(0, this.nowCube.length * 0.3 + 2.5, 0));
                    let upPos = this.GoInWorm(key);
                    let goPos = Tools.Vector3Reduce(upPos, new Laya.Vector3(0, this.nowCube.length * 0.3 + 2.5, 0));
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
            let Out = StageController.wormHoleOut;
            return Out[id];
        }
        GoInWorm(id) {
            let In = StageController.wormHoleIn;
            return In[id];
        }
        putDownCube(cube) {
            let endPos = cube.transform.position.clone();
            let startPos = cube.transform.position.clone();
            startPos.y += 0.3;
            cube.transform.position = startPos;
            Tools.setTransRotEulerX(cube.transform, 0);
            let t = new Tween3D();
            t.toTween(cube, { pos: endPos, rot: new Laya.Vector3(0, 0, 0) }, 500);
        }
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

    class CamFollow extends Laya.Script {
        constructor() {
            super(...arguments);
            this.offset = new Laya.Vector3(-0.25, 18, -8);
            this.offsetXmin = -1;
            this.offsetXmax = 0.5;
        }
        onAwake() {
            this.offset.x = (this.offsetXmax - this.offsetXmin) / 2 + this.offsetXmin;
            this.self = this.owner;
            this.target = Data.player;
            let targetPos = this.target.transform.position.clone();
            this.self.transform.position = Tools.Vector3Add(targetPos, this.offset);
            this.justGo();
        }
        onUpdate() {
            let targetPos = this.target.transform.position.clone();
            let selfPos = this.self.transform.position.clone();
            let nowOffset = Tools.Vector3Reduce(selfPos, targetPos);
            if (nowOffset.x < this.offsetXmin) {
                nowOffset.x = this.offsetXmin;
            }
            else if (nowOffset.x > this.offsetXmax) {
                nowOffset.x = this.offsetXmax;
            }
            if (Stage.instance) {
                if (Stage.instance.nowCube.length > 30) {
                    nowOffset.y = this.offset.y + 3;
                }
                else {
                    nowOffset.y = this.offset.y;
                }
            }
            nowOffset.z = this.offset.z;
            targetPos.y = 0;
            let shouldGoPos = Tools.Vector3Add(targetPos, nowOffset);
            let goPos = new Laya.Vector3();
            Laya.Vector3.lerp(selfPos, shouldGoPos, 0.1, goPos);
            this.self.transform.position = goPos;
        }
        justGo() {
            let targetPos = this.target.transform.position.clone();
            let selfPos = this.self.transform.position.clone();
            let nowOffset = Tools.Vector3Reduce(selfPos, targetPos);
            if (nowOffset.x < this.offsetXmin) {
                nowOffset.x = this.offsetXmin;
            }
            else if (nowOffset.x > this.offsetXmax) {
                nowOffset.x = this.offsetXmax;
            }
            if (Stage.instance) {
                if (Stage.instance.nowCube.length > 30) {
                    nowOffset.y = this.offset.y + 3;
                }
                else {
                    nowOffset.y = this.offset.y;
                }
            }
            nowOffset.z = this.offset.z;
            targetPos.y = 0;
            let shouldGoPos = Tools.Vector3Add(targetPos, nowOffset);
            this.self.transform.position = shouldGoPos;
        }
        onDestroy() {
            this.justGo();
        }
    }

    class StageController {
        static Init() {
            Laya.timer.clearAll(this);
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
        static PlayerInit() {
            Data.model = Data.player.getChildByName("Model");
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
        static loadStageConfigs() {
            let grade = PlayerData.GetPlayerData().grade;
            let url = "res/Stages/StagesConfig.json";
            let level = (grade - 1) % 14 + 1;
            console.log("grade:", grade, "level:", level);
            let levelurl = "res/Stages/Level" + level.toString() + ".json";
            let color = [1, 2, 3];
            let realColor = [];
            for (let i = 0; i < 3; i++) {
                realColor.push(Tools.takeRandomInArray(color));
            }
            this.stageColor = realColor;
            Tools.loadJsonFile(levelurl, (data) => {
                let grade = PlayerData.GetPlayerData().grade;
                let index = 0;
                let stageData = [data[0], data[1]];
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
                let end = Data.scene3D.getChildByName("End");
                let endPos = this.endPos[this.endPos.length - 1].clone();
                endPos.z -= 0.5;
                end.transform.position = endPos;
                let total = (this.cubeCount - this.trailCubeCount);
                let axisCount = Math.floor(total / 5);
                let add = total % 5;
                this.endItemCount = axisCount;
                this.BornEndItem(axisCount, add);
                this.PlayerInit();
            });
        }
        static StageBornDo(data) {
            for (let i = 0; i < data.length; i++) {
                let name = data[i].name;
                let tips = name.split("_");
                let pos = new Laya.Vector3(parseFloat(data[i].position.x), parseFloat(data[i].position.y), parseFloat(data[i].position.z));
                let rotation = new Laya.Vector3(parseFloat(data[i].rotation.x), parseFloat(data[i].rotation.y), parseFloat(data[i].rotation.z));
                let scale = new Laya.Vector3(parseFloat(data[i].scale.x), parseFloat(data[i].scale.y), parseFloat(data[i].scale.z));
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
                        this.BornWormhole(pos, tips[1], tips[2]);
                        break;
                    case "Stop":
                        this.BornStop(pos);
                        break;
                }
            }
        }
        static BornGround(pos, rotation, scale) {
            let url = "Ground" + this.stageColor[0].toString();
            let prefab = Tools.findNodeByName(Data.prefabs, url);
            let ground = this.BornObj(prefab, pos);
            ground.transform.localRotationEuler = rotation;
            ground.transform.localScale = scale;
        }
        static BornBlockCube(pos, rotation, scale) {
            let url = "BlockCube" + this.stageColor[1].toString();
            let prefab = Tools.findNodeByName(Data.prefabs, url);
            let blockCube = this.BornObj(prefab, pos);
            blockCube.transform.localRotationEuler = rotation;
            blockCube.transform.localScale = scale;
        }
        static BornPickCube(pos) {
            for (let i = 0; i < this.canPickCubes[this.stageID].length; i++) {
                if (Laya.Vector3.equals(this.canPickCubes[this.stageID][i].transform.position.clone(), pos)) {
                    console.log("有相同");
                    return;
                }
            }
            let url = "PickCube" + this.stageColor[2].toString();
            let prefab = Tools.findNodeByName(Data.prefabs, url);
            let obj = this.BornObj(prefab, pos);
            this.roadCubes[this.stageID].push(obj.transform.position.clone());
            this.canPickCubes[this.stageID].push(obj);
            this.cubeCount++;
        }
        static BornTrail(pos, rotation, scale) {
            let url = "Trail" + this.stageColor[1].toString();
            let prefab = Tools.findNodeByName(Data.prefabs, url);
            let obj = this.BornObj(prefab, pos);
            obj.transform.localRotationEuler = rotation;
            obj.transform.localScale = scale;
            let addVector = Tools.getTransformForward(obj.transform);
            Laya.Vector3.normalize(addVector, addVector);
            if (pos.z % 1 == 0.5) {
                for (let i = 0; i <= scale.z; i++) {
                    let add = Tools.Vector3Axis(addVector, i);
                    let point = Tools.Vector3Add(pos, add);
                    this.addTrail(point);
                }
            }
            else if (pos.z % 1 == 0) {
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
        static BornTrailGround(pos) {
            let url = "TrailGround" + this.stageColor[1].toString();
            let prefab = Tools.findNodeByName(Data.prefabs, url);
            let obj = this.BornObj(prefab, pos);
        }
        static BornSpring(pos, rotation) {
            let prefab = Tools.findNodeByName(Data.prefabs, "Spring");
            let obj = this.BornObj(prefab, pos);
            obj.transform.localRotationEuler = rotation;
            this.spring.push(obj);
        }
        static BornBeacon(pos, rotation) {
            let prefab = Tools.findNodeByName(Data.prefabs, "Beacon");
            let obj = this.BornObj(prefab, pos);
            obj.transform.localRotationEuler = rotation;
            this.beacon.push(obj);
        }
        static BornSpringStage(pos, rotation) {
            let prefab = Tools.findNodeByName(Data.prefabs, "SpringStage");
            let obj = this.BornObj(prefab, pos);
            obj.transform.localRotationEuler = rotation;
            this.spring.push(obj);
        }
        static BornWormhole(pos, id, type) {
            let prefab = Tools.findNodeByName(Data.prefabs, "Wormhole");
            let obj = this.BornObj(prefab, pos);
            if (type == "In") {
                this.wormHoleIn[id] = obj.transform.position.clone();
            }
            else if (type == "Out") {
                this.wormHoleOut[id] = obj.transform.position.clone();
            }
        }
        static BornStop(pos) {
            let prefab = Tools.findNodeByName(Data.prefabs, "Stop");
            let obj = this.BornObj(prefab, pos);
            this.stop.push(obj.transform.position.clone());
        }
        static BornEndItem(count, add) {
            for (let i = 0; i < count; i++) {
                let index = i % 7 + 1;
                let name = "EndItem" + index.toString();
                let prefab = Tools.findNodeByName(Data.prefabs, name);
                let pos = this.endPos[this.endPos.length - 1].clone();
                pos.z += 20 + i * 7;
                let obj = this.BornObj(prefab, pos);
                let first = obj.getChildByName("first");
                let second = obj.getChildByName("second");
                let point = obj.getChildByName("point");
                let axis = obj.getChildByName("x");
                this.BornNumber(1 + Math.floor(i / 10), first.transform.position.clone());
                this.BornNumber(i % 10, second.transform.position.clone());
                this.BornPoint(point.transform.position.clone());
                this.BornAxis(axis.transform.position.clone());
                first.destroy();
                second.destroy();
                point.destroy();
                axis.destroy();
            }
            let end = Data.scene3D.getChildByName("End");
            let chest = end.getChildByName("Chest");
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
            let url = "axis";
            let prefab = Tools.findNodeByName(Data.prefabs, url);
            let obj = this.BornObj(prefab, pos);
        }
        static SetPlayerPos(pos) {
            Data.player.transform.position = pos;
        }
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
    StageController.wallBornCount = 0;
    StageController.roadCubes = [];
    StageController.canPickCubes = [];
    StageController.trailPos = [];
    StageController.spring = [];
    StageController.beacon = [];
    StageController.stageID = 0;
    StageController.endPos = [];
    StageController.startPos = [];
    StageController.wormHoleIn = {};
    StageController.wormHoleOut = {};
    StageController.stop = [];
    StageController.stageColor = [];
    StageController.cubeCount = 0;
    StageController.trailCubeCount = 0;
    StageController.endItemCount = 0;

    var SceneUrl;
    (function (SceneUrl) {
        SceneUrl["LOADING"] = "Loading.scene";
        SceneUrl["STARTMENU"] = "StartMenu.scene";
        SceneUrl["STAGEUI"] = "StageUI.scene";
        SceneUrl["ENDMENU"] = "EndMenu.scene";
        SceneUrl["SHOP"] = "Shop.scene";
        SceneUrl["STAGELOADING"] = "StageLoading.scene";
        SceneUrl["SkinLock"] = "SkinLock.scene";
    })(SceneUrl || (SceneUrl = {}));
    class Data {
        static AddGrade() {
            let data = PlayerData.GetPlayerData();
            data.grade++;
            if (parseInt(data.grade) == 3) {
                data.peopleActive[1] = true;
            }
            else if (parseInt(data.grade) == 10) {
                data.peopleActive[2] = true;
            }
            else if (parseInt(data.grade) > 99) {
                data.grade = 99;
            }
            PlayerData.SavePlayerData(data);
        }
        static readGrade() {
            let data = PlayerData.GetPlayerData();
            return parseInt(data.grade);
        }
        static AddCoin(count) {
            let data = PlayerData.GetPlayerData();
            data.coin += count;
            PlayerData.SavePlayerData(data);
        }
        static readCoin() {
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
    Data.isPure = false;
    Data.nowScene = 0;
    Data.usingPrefabs = [];
    Data.isSuccess = false;
    Data.endAxis = 0;
    Data.endCoin = 0;

    class EndMenu extends BaseUI {
        init() {
            Data.nowScene = 3;
            Tools.buttonInit(this.restartButton, this, this.restartGame);
            Tools.buttonInit(this.videoButton, this, this.videoAward);
            let data = PlayerData.GetPlayerData();
            this.nowCoinValue.value = Data.endCoin.toFixed(0);
            this.gradeValue.value = data.grade.toString();
            this.combeAxis.value = Data.endAxis.toFixed(1) + "*";
            Data.AddCoin(Data.endCoin);
            this.coinValue.value = Data.readCoin().toString();
            SGMgr.inFinish();
        }
        restartGame() {
            Data.AddGrade();
            this.close();
            SGMgr.backToHome(() => {
                StageController.Init();
                Laya.Scene.open(SceneUrl.STARTMENU);
            });
        }
        videoAward() {
            Data.AddCoin(Data.endCoin);
            this.coinValue.value = Data.readCoin().toString();
            this.nowCoinValue.value = (Data.endCoin * 2).toFixed(0);
            this.combeAxis.value = (Data.endAxis * 2).toFixed(1) + "*";
            this.videoButton.set_visible(false);
        }
    }

    class ColliderController {
        constructor() {
            this.enable = false;
            this.rubbishPos = new Laya.Vector3(-1000, -1000, -1000);
            this.ColliderInit();
        }
        ColliderInit() {
            this.enable = true;
        }
        ColliderUpdate() {
            if (this.enable) {
            }
        }
        NormalBoxCheck_2D(aPos, aDirX, aDirZ, bPos, bDirX, bDirZ) {
            let dirX = Math.abs(bPos.x - aPos.x);
            let dirZ = Math.abs(bPos.z - aPos.z);
            let hitX = aDirX + bDirX;
            let hitZ = aDirZ + bDirZ;
            return dirX < hitX && dirZ < hitZ;
        }
    }

    class camShake {
        vibrateShort(cam) {
            Tools.objectShake(cam, Laya.timer.delta / 1000, 0.1);
        }
    }

    class FxController {
        constructor() {
            this.fxs = [];
            this.fireWork = [];
            this.init();
        }
        init() {
            this.chestLight = Data.fxs.getChildByName("ChestLightFX");
            this.fireWorkBoom = Data.fxs.getChildByName("FireworkFX");
            this.fireWorkAlawys = Data.fxs.getChildByName("ConfettiSplashFX");
            this.fireWokrRain = Data.fxs.getChildByName("ConfettiRainFX");
            this.moveSmokeFx = Data.fxs.getChildByName("MoveSmokeFX");
            this.finishFx = Data.fxs.getChildByName("FinishFX");
        }
        cleanFxs() {
            for (let i = 0; i < this.fxs.length; i++) {
                this.fxs[i].destroy();
            }
        }
        BornFireWorksAlways(pos) {
            this.fireWork.push(this.BornFx(pos, this.fireWorkAlawys));
        }
        clearFireWork() {
            for (let i = 0; i < this.fireWork.length; i++) {
                this.fireWork[i].destroy();
            }
        }
        BornChestAllFx(chestPos) {
            this.BornFx(Tools.Vector3Add(chestPos, new Laya.Vector3(0, 1, 6.5)), this.chestLight);
        }
        BornMoveSmokeFx() {
            if (this.smokeFx)
                return;
            let obj = this.BornFxOnly(Data.player.transform.position.clone(), this.moveSmokeFx);
            Data.player.addChild(obj);
            obj.transform.localPosition = new Laya.Vector3(0, -1000, 0);
            this.smokeFx = obj;
        }
        BornFinishFx(pos) {
            this.BornFx(pos.clone(), this.finishFx);
        }
        BornFx(pos, prefab) {
            let obj = prefab.clone();
            Data.scene3D.addChild(obj);
            obj.transform.position = pos;
            this.fxs.push(obj);
            return obj;
        }
        BornFxOnly(pos, prefab) {
            let obj = prefab.clone();
            Data.scene3D.addChild(obj);
            obj.transform.position = pos;
            return obj;
        }
    }

    class PlatformApi {
        static showVideoAd(cb) {
            if (!Laya.Browser.onWeiXin) {
                cb && cb();
            }
            SGAD.showVideoAd(cb);
        }
        static loadSubpackage(name, cb) {
            Laya.Browser.window.wx.loadSubpackage({
                name: name,
                success: (res) => {
                    cb && cb();
                }
            });
        }
    }

    class SoundManager {
        constructor() {
            this._pathRoot = "res/Sounds/";
            this._soundCtx = {};
            this._soundFile = [];
            for (var key in SoundType) {
                let sound = SoundType[key];
                this._soundFile.push(sound);
            }
            console.log(this._soundFile);
            this.init();
        }
        init() {
            let path = this._pathRoot;
            let file = "";
            let soundFile = this._soundFile;
            let soundCount = this._soundFile.length;
            for (let i = 0; i < soundCount; ++i) {
                file = soundFile[i];
                let innerAudioContext = new Laya.SoundChannel;
                innerAudioContext.url = path + file + ".mp3";
                if (file.indexOf("PoliceSiren") != -1)
                    innerAudioContext.loops = 0;
                Laya.SoundManager.addChannel(innerAudioContext);
                this._soundCtx[file] = true;
            }
            let loadUrl = ["res/Sounds/Bgm.mp3"];
            Laya.loader.load(loadUrl, Laya.Handler.create(this, () => {
                this.playMusic("Bgm");
            }));
            Laya.SoundManager.autoReleaseSound = false;
        }
        play(name) {
            if (this._soundCtx[name]) {
                Laya.SoundManager.playSound(this._pathRoot + name + ".mp3");
            }
        }
        playLoop(name) {
            if (this._soundCtx[name]) {
                Laya.SoundManager.playSound(this._pathRoot + name + ".mp3", 0);
            }
        }
        stop(name) {
            if (this._soundCtx[name]) {
                Laya.SoundManager.stopSound(this._pathRoot + name + ".mp3");
            }
        }
        playMusic(name) {
            Laya.SoundManager.stopMusic();
            if (name) {
                Laya.SoundManager.playMusic(this._pathRoot + name + ".mp3", 0);
                this.currentMusic = name;
            }
            else {
                Laya.SoundManager.playMusic(this._pathRoot + this.currentMusic + ".mp3", 0);
            }
        }
        stopMusic() {
            Laya.SoundManager.stopMusic();
        }
    }

    class Loading extends BaseUI {
        constructor() {
            super(...arguments);
            this.SceneDone = false;
            this.FxDone = false;
            this.isLoading = true;
        }
        init() {
            this.initLoading();
            this.updateLoading(0);
            if (Laya.Browser.onWeiXin) {
                let names = ["res"];
                PlatformApi.loadSubpackage(names[0], () => {
                    this.init1();
                });
            }
            else {
                this.init1();
            }
        }
        init1() {
            this.updateLoading(0.25);
            let isPure = Data.isPure;
            let data = PlayerData.GetPlayerData();
            PlayerData.CheckPlayerData();
            console.log("玩家存档信息：", data);
            this.initGame();
        }
        initGame() {
            this.updateLoading(0.5);
            console.log("加载声音");
            Data.soundController = new SoundManager();
            Data.camShake = new camShake();
            console.log('进入Loading界面');
            console.log("开始加载场景");
            let sceneName = 'main';
            let url = 'res/LayaScene_' + sceneName + "/Conventional/" + sceneName + '.ls';
            let purl = 'res/LayaScene_' + sceneName + "/Conventional/" + sceneName + '.lh';
            Laya.Scene3D.load(url, Laya.Handler.create(this, this.onComplete));
            Laya.Sprite3D.load(purl, Laya.Handler.create(this, this.onFxComplete));
        }
        StartGame() {
            if (this.SceneDone && this.FxDone) {
                this.updateLoading(1);
                let cb = () => {
                    console.log("打开游戏场景");
                    Laya.stage.addChild(Data.scene3D);
                    Laya.stage.setChildIndex(Data.scene3D, 0);
                    console.log("初始化场景信息");
                    this.SceneInit();
                    StageController.Init();
                    Laya.Scene.open(SceneUrl.STARTMENU);
                };
                SGMgr.init(() => {
                    cb();
                });
            }
        }
        SceneInit() {
            Data.player = Data.scene3D.getChildByName("Player");
            Data.mainCam = Data.scene3D.getChildByName("Main Camera");
            Data.anim = Data.player.getChildByName("Model").getComponent(Laya.Animator);
            Data.collider = new ColliderController();
            Data.fxController = new FxController();
            let scene = Data.scene3D;
            let light = scene.getChildByName("Directional Light");
            light.shadowMode = Laya.ShadowMode.SoftLow;
            light.shadowDistance = 50;
            light.shadowResolution = 2048;
            light.shadowCascadesMode = Laya.ShadowCascadesMode.NoCascades;
            Laya.timer.frameLoop(1, Data.scene3D, () => {
                let water = Data.scene3D.getChildByName("Water");
                for (let i = 0; i < water.numChildren; i++) {
                    let model = water.getChildAt(i);
                    var mat = model.meshRenderer.material;
                    mat.tilingOffsetW += 0.002;
                    mat.tilingOffsetZ += 0.002;
                }
            });
            Data.mainCam.enableHDR = false;
            Laya.stage.useRetinalCanvas = true;
        }
        initLoading() {
        }
        updateLoading(axis) {
            this.bar.value = axis;
        }
        exitLoading() {
            Laya.Tween.clearTween(this.tween);
            this.isLoading = false;
        }
        onComplete(scene) {
            this.updateLoading(0.75);
            Data.scene3D = scene;
            Data.prefabs = Data.scene3D.getChildByName("Prefabs");
            this.SceneDone = true;
            console.log("场景加载完成");
            this.StartGame();
        }
        onFxComplete(prefabs) {
            this.updateLoading(0.75);
            Data.fxs = prefabs.getChildByName("Fx");
            this.FxDone = true;
            console.log("额外道具加载完成");
            this.StartGame();
        }
    }

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

    class SGHomeUI extends Laya.Scene {
        constructor() {
            super();
        }
        onOpened(param) {
            this.size(Laya.stage.displayWidth, Laya.stage.displayHeight);
            SGUtils.addClickEvent(this.remenBtn, this, this.remenCB);
            SGUtils.addClickEvent(this.drawBtn, this, this.remenCB);
            this.remenBtn.visible = SGConfig.data.front_moreGame_switch && (SGConfig.homeMoreGameType == 1 || SGConfig.homeMoreGameType == 2);
            this.drawBtn.visible = SGConfig.data.front_moreGame_switch && (SGConfig.homeMoreGameType == 0 || SGConfig.homeMoreGameType == 2);
        }
        onClosed() {
        }
        remenCB() {
            SGMgr.moreGame();
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

    class SGRemen extends Laya.Scene {
        constructor() {
            super();
            this.ccb = null;
            this.onShowCB = null;
            this.clickCount = 0;
            this.index = RemenIndex.Remen_Loading;
            this.isWuchu = 0;
        }
        onAwake() {
            this.size(Laya.stage.displayWidth, Laya.stage.displayHeight);
            this.bg.size(Laya.stage.displayWidth, Laya.stage.displayHeight);
        }
        onOpened(param) {
            if (param && param.ccb)
                this.ccb = param.ccb;
            if (param && param.index != undefined)
                this.index = param.index;
            this.clickCount = 0;
            SGUtils.addClickEvent(this.btnContinue, this, this.btnContinueCB);
            SGAD.visibleFullGridAd(true);
            if (SGConfig.data.front_remen_banner_switch) {
                this.showHide();
            }
            else {
                SGAD.hideBannerAd();
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
            SGAD.visibleFullGridAd(false);
            Laya.timer.once(100, this, () => {
                this.ccb && this.ccb();
                if (SGConfig.data.front_interstitial_afterRemen_switch) {
                    if (this.index == RemenIndex.Remen_Loading || this.index == RemenIndex.Remen_Over || this.index == RemenIndex.Remen_Finish) {
                        SGAD.showInterstitialAd();
                    }
                }
            });
        }
        showHide() {
            SGAD.hideBannerAd();
            Laya.timer.once(SGConfig.data.front_remen_banner_showHide_time * 1000, this, () => {
                SGAD.showBannerAd();
                Laya.timer.once(SGConfig.data.front_remen_banner_showHide_time * 1000, this, this.showHide);
            });
        }
        btnContinueCB() {
            this.clickCount++;
            if (this.clickCount >= SGConfig.data.front_remen_click_count) {
                this.close();
            }
        }
    }

    class Shop extends BaseUI {
        init() {
            this.init1();
        }
        init1() {
            this.data = PlayerData.GetPlayerData();
            console.log("玩家存档信息：", this.data);
            this.initAllItem();
            this.initButtonEvent();
            this.coinValue.value = this.data.coin;
        }
        initButtonEvent() {
            Tools.imageButtonInit(this.item1, this, this.itemEvent, 1);
            Tools.imageButtonInit(this.item2, this, this.itemEvent, 2);
            Tools.imageButtonInit(this.item3, this, this.itemEvent, 3);
            Tools.imageButtonInit(this.item4, this, this.itemEvent, 4);
            Tools.imageButtonInit(this.item5, this, this.itemEvent, 5);
            Tools.imageButtonInit(this.item6, this, this.itemEvent, 6);
            Tools.imageButtonInit(this.item7, this, this.itemEvent, 7);
            Tools.imageButtonInit(this.item8, this, this.itemEvent, 8);
            Tools.imageButtonInit(this.item9, this, this.itemEvent, 9);
            Tools.imageButtonInit(this.videoButton, this, this.videoEvent);
            Tools.imageButtonInit(this.backButton, this, this.backEvent);
        }
        closeAllShowCar() {
            let show = this.getChildAt(1);
            for (let i = 0; i < show.numChildren; i++) {
                let image = show.getChildAt(i);
                image.visible = false;
            }
        }
        initAllItem() {
            let list = [this.item1, this.item2, this.item3, this.item4, this.item5, this.item6, this.item7, this.item8, this.item9];
            for (let i = 0; i < 9; i++) {
                let item = list[i];
                let choose = item.getChildByName("choose");
                let lock = item.getChildByName("lock");
                let tips = item.getChildByName("tips");
                let showOpen = item.getChildByName("showOpen");
                let showClose = item.getChildByName("showClose");
                choose.set_visible((i == this.data.nowPeople));
                lock.set_visible(!this.data.peopleActive[i]);
                tips.set_visible(!this.data.peopleActive[i]);
                showOpen.set_visible(true);
                showClose.set_visible(false);
            }
        }
        itemEvent(id) {
            let index = id - 1;
            if (this.data.peopleActive[index]) {
                Data.choose(index);
                this.init1();
            }
            else {
                if (index == 1 || index == 2) {
                    console.log("请打过更多关卡解锁");
                }
                else {
                    switch (index) {
                        case 3:
                            this.coinLock(3, 288);
                            break;
                        case 4:
                            this.coinLock(4, 388);
                            break;
                        case 5:
                            this.coinLock(5, 488);
                            break;
                        case 6:
                            this.coinLock(6, 588);
                            break;
                        case 7:
                            this.coinLock(7, 688);
                            break;
                        case 8:
                            this.coinLock(8, 888);
                            break;
                    }
                }
            }
        }
        coinLock(index, coin) {
            if (Data.readCoin() >= coin) {
                Data.AddCoin(-coin);
                Data.unlock(index);
                Data.choose(index);
                this.init1();
            }
            else {
                console.log("金币不足");
            }
        }
        videoEvent() {
            PlatformApi.showVideoAd(() => {
                Data.AddCoin(200);
                this.init1();
            });
        }
        backEvent() {
            this.close();
            Laya.Scene.open(SceneUrl.STARTMENU);
        }
    }

    class SkinLock extends BaseUI {
        constructor() {
            super(...arguments);
            this.goLock = false;
            this.isDone = true;
        }
        init() {
            this.ButtonInit();
            this[3].set_visible(false);
            this[4].set_visible(false);
            this[5].set_visible(false);
            this[6].set_visible(false);
            this[7].set_visible(false);
            this[8].set_visible(false);
            let data = PlayerData.GetPlayerData();
            let actives = data.peopleActive;
            let index = 3;
            for (let i = 3; i < actives.length; i++) {
                if (actives[i] == false) {
                    index = i;
                    this[index].set_visible(true);
                    this.isDone = false;
                    break;
                }
            }
            if (this.isDone) {
                setTimeout(() => {
                    this.restartGame();
                }, 100);
                return;
            }
            this.axis = Number(data.lockAxis.toFixed(2));
            data.lockAxis = Number((this.axis + 0.2).toFixed(2));
            PlayerData.SavePlayerData(data);
            this.updateBar(this.axis, data.lockAxis);
            if (data.lockAxis >= 1) {
                data.lockAxis = 0;
                PlayerData.SavePlayerData(data);
                Data.unlock(index);
                Data.choose(index);
                console.log("成功解锁皮肤");
                this.videoBtn.set_visible(false);
            }
        }
        updateBar(firstAxis, toAxis) {
            clearInterval(this.barTimer);
            this.bar.value = firstAxis;
            if (toAxis >= 1) {
                toAxis = 1;
            }
            let top = toAxis - firstAxis;
            let count = top / 0.01;
            this.barValue.value = (100 * firstAxis).toString();
            Laya.Tween.to(this.bar, { value: toAxis }, 50 * count);
            let addAxis = 1;
            let nowCount = 0;
            this.barTimer = setInterval(() => {
                this.barValue.value = (100 * firstAxis + addAxis * (nowCount + 1)).toFixed(0);
                nowCount++;
                if (nowCount >= count) {
                    clearInterval(this.barTimer);
                }
            }, 50);
        }
        videoEvent() {
            this.isDone = true;
            let data = PlayerData.GetPlayerData();
            let actives = data.peopleActive;
            let index = 3;
            this[3].set_visible(false);
            this[4].set_visible(false);
            this[5].set_visible(false);
            this[6].set_visible(false);
            this[7].set_visible(false);
            this[8].set_visible(false);
            for (let i = 3; i < actives.length; i++) {
                if (actives[i] == false) {
                    index = i;
                    this[index].set_visible(true);
                    this.isDone = false;
                    break;
                }
            }
            if (this.isDone) {
                setTimeout(() => {
                    this.restartGame();
                }, 100);
                return;
            }
            this.axis = Number(data.lockAxis);
            data.lockAxis = this.axis + 0.2;
            PlayerData.SavePlayerData(data);
            this.updateBar(this.axis, data.lockAxis);
            if (data.lockAxis >= 1) {
                data.lockAxis = 0;
                PlayerData.SavePlayerData(data);
                Data.unlock(index);
                Data.choose(index);
                console.log("成功解锁");
            }
        }
        restartGame() {
            StageController.Init();
            Laya.Scene.open(SceneUrl.STARTMENU);
        }
        ButtonInit() {
            Tools.buttonInit(this.restartButton, this, this.restartGame);
            Tools.imageButtonInit(this.videoBtn, this, this.videoEvent);
        }
        DrawUI() {
        }
        BackUI() {
        }
    }

    class StartMenu extends BaseUI {
        constructor() {
            super(...arguments);
            this.fingerScale = 1;
            this.fingerAxis = 1;
        }
        onEnable() {
            SGMgr.inHome();
        }
        init() {
            Data.nowScene = 1;
            console.log("初始化游戏开始界面按钮");
            Data.fxController.cleanFxs();
            this.ButtonInit();
            this.coinValue.value = Data.readCoin().toString();
            this.gradeValue.value = Data.readGrade().toString();
            this.ShakeShop();
            console.log(PlayerData.GetPlayerData());
            console.log('stage:', Laya.stage);
        }
        ButtonInit() {
            Tools.buttonInit(this.startButton, this, this.StartGame);
            Tools.buttonInit(this.shopButton, this, this.OpenShop);
        }
        StartGame() {
            console.log("点击开始游戏");
            this.close();
            SGMgr.startGame(() => {
                this.ShakeShopEnd();
                Data.collider.enable = true;
                Laya.Scene.open(SceneUrl.STAGEUI);
            });
        }
        EndAnimInit() {
        }
        OpenShop() {
            console.log("打开商店");
            SGMgr.inShop();
            this.ShakeShopEnd();
            Laya.Scene.open(SceneUrl.SHOP);
        }
        ShakeShop() {
            this.cb1 = () => {
                this.shopButton.rotation = 0;
                this.shopTween = Laya.Tween.to(this.shopButton, { rotation: -10 }, 250);
                this.shopTimer = setTimeout(() => {
                    this.cb2();
                }, 250);
            };
            this.cb2 = () => {
                this.shopButton.rotation = -10;
                this.shopTween = Laya.Tween.to(this.shopButton, { rotation: 10 }, 500);
                this.shopTimer = setTimeout(() => {
                    this.cb3();
                }, 500);
            };
            this.cb3 = () => {
                this.shopButton.rotation = 10;
                this.shopTween = Laya.Tween.to(this.shopButton, { rotation: 0 }, 250);
                this.shopTimer = setTimeout(() => {
                    this.cb4();
                }, 250);
            };
            this.cb4 = () => {
                this.shopButton.rotation = 0;
                this.shopTimer = setTimeout(() => {
                    this.cb1();
                }, 1000);
            };
            this.cb1();
        }
        ShakeShopEnd() {
            this.shopTween.clear();
            clearTimeout(this.shopTimer);
        }
    }

    class GameConfig {
        constructor() {
        }
        static init() {
            var reg = Laya.ClassUtils.regClass;
            reg("scripts/EndMenu.ts", EndMenu);
            reg("scripts/Loading.ts", Loading);
            reg("SGSDK/SGHomeUI.ts", SGHomeUI);
            reg("SGSDK/SGScale.ts", SGScale);
            reg("SGSDK/SGRemen.ts", SGRemen);
            reg("scripts/Shop.ts", Shop);
            reg("scripts/SkinLock.ts", SkinLock);
            reg("scripts/Stage.ts", Stage);
            reg("scripts/StageUpdate.ts", StageUpdate);
            reg("scripts/StartMenu.ts", StartMenu);
        }
    }
    GameConfig.width = 750;
    GameConfig.height = 1334;
    GameConfig.scaleMode = "fixedwidth";
    GameConfig.screenMode = "vertical";
    GameConfig.alignV = "middle";
    GameConfig.alignH = "center";
    GameConfig.startScene = "Loading.scene";
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
            Laya.stage.scaleMode = GameConfig.scaleMode;
            Laya.stage.screenMode = GameConfig.screenMode;
            Laya.stage.alignV = GameConfig.alignV;
            Laya.stage.alignH = GameConfig.alignH;
            Laya.URL.exportSceneToJson = GameConfig.exportSceneToJson;
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
            Laya.Scene.open(SceneUrl.LOADING);
        }
    }
    new Main();

}());
//# sourceMappingURL=bundle.js.map
