import MyVector3 from "../plugins/MyVector3";
import Context from "../Context";

export default class UtilsFunction {
    /**
     * 按钮事件
     * @param btn 按钮
     * @param caller 事件对象
     * @param callBack 回调函数
     * @param isScale 是否缩放
     */
    addClickEvent(btn: Laya.Sprite, caller: any, callBack: Function, param?: any[], isScale?: boolean) {
        btn.offAllCaller(caller);

        if (btn instanceof Laya.Button && !isScale) {
            let callback = (event) => {
                // event.stopPropagation();
                if (callBack) callBack.call(caller, event);
                //TODON 添加按钮声
            }
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
                // event.stopPropagation();
                Laya.Tween.to(btn, { scaleX: size, scaleY: size }, scaleTime);
            }
            btn.on(Laya.Event.MOUSE_DOWN, caller, cbDown, [param]);

            let cbUp = (event) => {
                if (isPressed == false) return;
                isPressed = false;
                // event.stopPropagation();
                Laya.Tween.to(btn, { scaleX: scaleX, scaleY: scaleY }, scaleTime);
                if (callBack) callBack.call(caller, event);
                //TODON 添加按钮声

            }
            btn.on(Laya.Event.MOUSE_UP, caller, cbUp, [param]);

            let cbOut = (event) => {
                // event.stopPropagation();
                Laya.Tween.to(btn, { scaleX: scaleX, scaleY: scaleY }, scaleTime);
            }
            btn.on(Laya.Event.MOUSE_OUT, caller, cbOut, [param]);
        }
    }

    getRGB(_hexColor) {
        var color = [], rgb = [];
        let hexColor = _hexColor.replace(/#/, "");
        if (hexColor.length == 3) { // 处理 "#abc" 成 "#aabbcc"
            var tmp = [];
            for (var i = 0; i < 3; i++) {
                tmp.push(hexColor.charAt(i) + hexColor.charAt(i));
            }
            hexColor = tmp.join("");
        }

        for (var i = 0; i < 3; i++) {
            color[i] = "0x" + hexColor.substr(i * 2, 2);
            // rgb.push(parseInt(Number(color[i])));
            rgb.push(parseInt(color[i]));
        }
        return new Laya.Vector3(rgb[0] / 255, rgb[1] / 255, rgb[2] / 255);
    }

    getColorString(num) {
        var str1 = num & 15;
        var str2 = (str1 > 9) ? this.getHexValue(Number(str1)) + "" : str1 + "";
        var str3 = num >>> 4;
        str1 = str3 & 15;
        var str4 = (str1 > 9) ? this.getHexValue(Number(str1)) + "" : str1 + "";

        return str4 + str2;
    }

    getHexValue(num) {
        switch (num) {
            case 10: return 'A';
            case 11: return 'B';
            case 12: return 'C';
            case 13: return 'D';
            case 14: return 'E';
            case 15: return 'F';
        }
    }

    /**获取当前时间 时间戳s*/
    getCurrentTime(): number {
        return Math.floor(Date.parse((new Date()).toString()) / 1000);
    }

    /**反向插值 */
    inverseLerp(a, b, v) {
        return (v - a) / (b - a);
    }

    /**线性方程 */
    linearEquation(point1: Laya.Point, point2: Laya.Point) {
        var k = (point1.y - point2.y) / (point1.x - point1.y);
        var b = point1.y - k * point1.x;

        return [k, b];
    }

    /**读取Json文件 */
    loadJsonFile(path: string, callBack: Function) {
        Laya.loader.load(path, Laya.Handler.create(this, (json) => {
            var data = Laya.loader.getRes(path);
            callBack(data);
        }), null, Laya.Loader.JSON);
    }

    /**
     * 获取随机数组
     * @param array 数组 
     * @param amount 成员数量
     */
    getRandomArray(array: any[], amount: number): any[] {
        var arrayTmp: any[] = [];

        var newArray = [];
        newArray = newArray.concat(array);
        newArray = newArray.sort(function () { return 0.5 - Math.random() })
        for (var i = 0; i < amount; i++) {
            arrayTmp.push(newArray[i]);
        }

        return arrayTmp;
    }

    /**分包加载 */
    loadSubpackage(loadName, caller, callback) {
        if (Laya.Browser.onWeiXin) {
            let loadTask = wx["loadSubpackage"]({
                name: loadName,
                success: function (res) {
                    console.log("分包加载成功：", loadName);
                    callback.call(res, caller, true);
                },
                fail: function (res) {
                    console.error("分包加载失败：", loadName);
                    callback.call(res, caller, false);
                }
            })

            loadTask.onProgressUpdate(res => {
                console.log(res, "分包================");
            });
        }
    }

    /**同步加载多个分包 */
    loadSubpackagesSync(loadNames: string[], caller, callback) {
        var loadCount = loadNames.length;
        for (var i = 0; i < loadCount; i++) {
            this.loadSubpackage(loadNames[i], caller, (target, isSuccess) => {
                if (isSuccess) {
                    loadCount--;
                    if (loadCount == 0) {
                        console.log("全部分包加载完成");
                        callback.call(this, caller, true);
                    }
                }
            });
        }
    }

    /**分包加载 */
    loadSubpackages(loadNames: string[], caller, callback) {
        var packageCount = loadNames.length;
        function loadSubpackage() {
            var name = loadNames[packageCount - 1];
            if (name != null) {
                Context.Utils.loadSubpackage(name, caller, (target, isSuccess) => {
                    if (isSuccess) {
                        packageCount--;
                        loadSubpackage();
                    }
                });
            }
            else {
                console.log("全部分包加载完成");
                if (packageCount == 0) {
                    callback.call(this, caller, true);
                }
                else {
                    callback.call(this, caller, false);
                }
            }
        }

        loadSubpackage();
    }

    /**秒转分:秒 */
    public getTimeLeft2BySecond(s: number): string {
        let minutes = Math.round((s - 30) / 60) % 60;
        let seconds = s % 60;

        var minStr = minutes > 9 ? minutes + ":" : "0" + minutes + ":";
        var secStr = seconds > 9 ? seconds + "" : "0" + seconds;
        return (minutes > 0 ? minStr : "00:") + (seconds > 0 ? (secStr + "") : "00");
    }

    /**物体抖动 */
    objectShake(target: Laya.Sprite3D, shakeTime: number = 1, shakeAmount: number = 0.7) {
        var shake = shakeTime;
        var decreaseFactor = 1;
        var originalPos = target.transform.localPosition.clone();

        Laya.timer.frameLoop(1, this, updateShake);

        function randomPos(): Laya.Vector3 {
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

    /**2D物体抖动 */
    originPos: Laya.Vector2;
    shakeTime: number
    objectShake2D(target: Laya.Sprite, shakeTime: number = 1, shakeAmount: number = 0.7) {
        if (this.originPos) {
            Laya.timer.clear(this, this.updateShake);
            target.pos(this.originPos.x, this.originPos.y);
        }

        this.shakeTime = shakeTime;
        var decreaseFactor = 1;
        this.originPos = new Laya.Vector2(target.x, target.y);

        Laya.timer.frameLoop(1, this, this.updateShake, [shakeAmount, target, decreaseFactor]);
    }

    randomPos(): Laya.Vector2 {
        var x = Math.random() > 0.5 ? Math.random() : -(Math.random());
        var y = Math.random() > 0.5 ? Math.random() : -(Math.random());
        return new Laya.Vector2(x, y);
    }

    updateShake(shakeAmount, target, decreaseFactor) {
        if (this.shakeTime > 0) {
            var pos = new Laya.Vector2();
            Laya.Vector2.scale(this.randomPos(), shakeAmount, pos);
            pos.setValue(pos.x + this.originPos.x, pos.y + this.originPos.y);
            target.pos(pos.x, pos.y)

            this.shakeTime -= 0.02 * decreaseFactor;
        }
        else {
            this.shakeTime = 0;
            target.pos(this.originPos.x, this.originPos.y);
            Laya.timer.clear(this, this.updateShake);
            this.originPos = null;
        }
    }


    /**************************** 业务 *************************/
    /**是否在同一侧 */
    sameSide(vA: MyVector3, vB: MyVector3, vC: MyVector3, vP: MyVector3): boolean {
        var ab = MyVector3.subtract(vB, vA);
        var ac = MyVector3.subtract(vC, vA);
        var ap = MyVector3.subtract(vP, vA);

        var v1 = MyVector3.cross(ab, ac);
        var v2 = MyVector3.cross(ab, ap);

        return MyVector3.dot(v1, v2) >= 0;
    }

    /**是否在三角区域内 */
    pointInTriangle(vA: MyVector3, vB: MyVector3, vC: MyVector3, vP: MyVector3): boolean {
        return this.sameSide(vA, vB, vC, vP) && this.sameSide(vB, vC, vA, vP) && this.sameSide(vC, vA, vB, vP);
    }

    /**
     * 遍历rootNode的子节点，查找name匹配的节点
     * @param rootNode 根节点
     * @param name 需要查找的节点的name
     */
    findNodeByName(rootNode: Laya.Sprite3D, name: string): Laya.Sprite3D {
        let targetNode: Laya.Sprite3D = null

        let funC = (node: Laya.Sprite3D) => {
            for (let i = 0; i < node.numChildren; i++) {
                if (node.getChildAt(i).name == name) {
                    targetNode = node.getChildAt(i) as Laya.Sprite3D
                    return
                } else {
                    funC(node.getChildAt(i) as Laya.Sprite3D)
                }
            }
        }

        funC(rootNode)
        return targetNode
    }

    coinCollectAnim(startPos, endPos, parent, amount = 15, callBack = null) {
        var amountTmp = amount;
        for (var i = 0; i < amount; i++) {
            let coin = Laya.Pool.getItemByClass("coin", Laya.Image);
            coin.skin = "ui/sy_jb_01.png";
            coin.x = startPos.x;
            coin.y = startPos.y;

            coin.scale(0.6, 0.6);
            parent.addChild(coin);

            let time = 300 + Math.random() * 100 - 50;
            Laya.Tween.to(coin, { x: coin.x + Math.random() * 250 - 125, y: coin.y + Math.random() * 250 - 125 }, time);
            Laya.timer.once(time + 50, this, function () {
                Laya.Tween.to(coin, { x: endPos.x, y: endPos.y }, 400, null, new Laya.Handler(this, function () {
                    parent.removeChild(coin);
                    Laya.Pool.recover("coin", coin);
                    amountTmp--;
                    if (amountTmp == 0 && callBack) callBack(parent);
                }));
            })
        }
    }

    /**
     * 修复相机高度
     * @param camera 相机
     */
    fixCameraField(camera) {
        let staticDT: number = 1624 - 1334;
        let curDT: number = Laya.stage.displayHeight - 1334 < 0 ? 0 : Laya.stage.displayHeight - 1334;
        let per = curDT / staticDT * 10;
        camera.fieldOfView += per;

        // camera.orthographicVerticalSize += per;
    }

    changeMatColor(object, color: Laya.Vector4) {
        if (object.meshRenderer) {
            var mat = object.meshRenderer.sharedMaterial;
            mat.albedoColor = color;
        }
    }

    // hitTargets: any[] = [];
    // hitShowOutlineMat(object: any, type) {
    //     if (this.hitTargets.indexOf(object) != -1) {
    //         return;
    //     }

    //     this.hitTargets.push(object);
    //     // var customMaterial = new MultiplePassOutlineMaterial();
    //     var customMaterial = Context.Level.hitMats.meshRenderer.materials[type].clone();

    //     var time = 40; // 40
    //     if (object) {
    //         if (object.name == "Body" && object.skinnedMeshRenderer) {
    //             var oldMat = object.skinnedMeshRenderer.material.clone();
    //             object.skinnedMeshRenderer.material = customMaterial; //sharedMaterial

    //             Laya.timer.once(time, this, () => {
    //                 if (object && object.skinnedMeshRenderer && oldMat._shader) {
    //                     object.skinnedMeshRenderer.material = oldMat;

    //                     var index = this.hitTargets.indexOf(object);
    //                     if (index != -1) this.hitTargets.splice(index, 1);
    //                 }
    //             });
    //         }
    //         else if (object.meshRenderer) {
    //             var oldMat = object.meshRenderer.material.clone();
    //             object.meshRenderer.material = customMaterial;

    //             Laya.timer.once(time, this, () => {
    //                 if (object && object.meshRenderer && oldMat._shader) {
    //                     object.meshRenderer.material = oldMat;

    //                     var index = this.hitTargets.indexOf(object);
    //                     if (index != -1) this.hitTargets.splice(index, 1);
    //                 }
    //             });
    //         }
    //     }
    // }

    /**3D转屏幕坐标 */
    getSpritePosBySprite3DPoint(target): Laya.Point {
        var pos = target.transform.position.clone();

        //特殊处理
        pos.y = target.name == "Npc1" ? 2 : 1;

        var outPos = new Laya.Vector4;
        Context.CommonData.mainCamera.viewport.project(pos, Context.CommonData.mainCamera.projectionViewMatrix, outPos);
        var pos2d = new Laya.Vector2(outPos.x / Laya.stage.clientScaleX, outPos.y / Laya.stage.clientScaleY);
        return new Laya.Point(pos2d.x, pos2d.y);
    }

    getRandom(): number {
        var nums = [0, 0.1, 0.2, 0.3, 0.4, 0.5, 0.6, 0.7, 0.8, 0.9, 1];
        var num = this.getRandomArray(nums, 1)[0];
        return num;
    }

    getAngle(v1: Laya.Vector3, v2: Laya.Vector3): number {
        var a = Laya.Vector3.dot(v1, v2)
        var b = Laya.Vector3.scalarLength(v1) * Laya.Vector3.scalarLength(v2);

        if (b == 0) {
            if (v1.z > v2.z) return 0;
            else if (v1.z < v2.z) return 180;

            if (v1.y > v2.y) return 90;
            else if (v1.y < v2.y) return -90;
        }

        var cosAngle = a / b;
        var angle = Math.acos(cosAngle) * 180 / Math.PI;
        return angle;
    }

    transform(value: number) {
        let newValue = ['', '', ''];
        let fr = 1000;
        let num = 3;
        var fm = 1;
        while (value / fr >= 1) {
            fr *= 10;
            num += 1;
            // console.log('数字', value / fr, 'num:', num);
        }
        if (num <= 4) { // 千
            newValue[1] = 'k';
            // newValue[0] = parseInt((value / 1000).toFixed(0)) + '';
            newValue[0] = (value / 1000).toFixed(2)
        } else if (num <= 9) { //16 万
            let text1 = parseInt((num - 4).toFixed(0)) / 2 > 1 ? 'm' : 'k';  //千万：万（百万：千）
            // tslint:disable-next-line:no-shadowed-variable
            // fm = '0k' === text1 ? 10000 : 10000000;
            fm = 'k' === text1 ? 1000 : 1000000;
            newValue[1] = text1;

            // let valueTmp = Math.round(value / fm);
            let valueTmp = (value / fm).toFixed(2);
            newValue[0] = valueTmp + '';
        }
        else if (num <= 16) {// 亿
            let text1 = 'b';
            // let text1 = (num - 8) / 2 > 1 ? 'b' : 'm';
            // text1 = (num - 8) / 4 > 1 ? '000b' : text1;
            // text1 = (num - 8) / 7 > 1 ? '000000b' : text1;
            // tslint:disable-next-line:no-shadowed-variable
            let fm = 1;
            if ('m' === text1) {
                fm = 1000000;
            } else if ('b' === text1) {
                fm = 1000000000;
            }
            // } else if ('000000m' === text1) {
            //     fm = 1000000000000;
            // } else if ('000000000m' === text1) {
            //     fm = 1000000000000000;
            // }
            newValue[1] = text1;
            // newValue[0] = parseInt((value / fm).toFixed(0)) + '';
            newValue[0] = (value / fm).toFixed(2)
        }
        if (value < 1000) {
            newValue[1] = '';
            newValue[0] = Number(value).toFixed(0) + '';
        }
        return newValue.join('');
    }


    static showPoint = function (verts, triangls) {
        // var vertexDeclaration= Laya.VertexMesh.getVertexDeclaration("POSITION");

        var vertsTemp = [];
        for (var i = 0; i < verts.length; i++) {
            var v = verts[i];
            var cube = UtilsFunction.createBox(0.1, 0.1, 0.1);
            var spr = new Laya.MeshSprite3D();
            // spr.meshFilter.sharedMesh = cube;

            Context.CommonData.mainScene.addChild(spr);
        }

        // var vertices = new Float32Array(vertsTemp);
        // var indices = new Uint16Array(triangls);
        // return Laya.PrimitiveMesh._createMesh(vertexDeclaration, vertices, indices);
    }

    static createMesh = function (verts, triangls) {
        Laya.Resource.destroyUnusedResources();

        var vertexDeclaration = Laya.VertexMesh.getVertexDeclaration("POSITION,NORMAL");

        var vertsTemp = [];
        var normal = new Laya.Vector3(-1, 0, 0);
        for (var i = 0; i < verts.length; i++) {
            var v = verts[i];
            vertsTemp.push(v.x);
            vertsTemp.push(v.y);
            vertsTemp.push(v.z);

            // if (i % 3 == 0) {
            //     normal = Context.Utils.getNormal(verts[i], verts[i + 1], verts[i + 2]);
            // }

            // normal = normals[i];

            // vertsTemp.push(normal.x);
            // vertsTemp.push(normal.y);
            // vertsTemp.push(normal.z);

            // if (i <= triangls.length / 3) {
            //     var index = Math.floor(i / 3) + 1;
            //     normal = Context.Utils.getNormal(verts[triangls[index]], verts[triangls[index - 1]], verts[triangls[index + 1]]);
            // }
            // else {
            //     index = triangls.indexOf(i);
            //     normal = Context.Utils.getNormal(verts[triangls[index]], verts[triangls[index + 1]], verts[triangls[index + 2]]);
            // }

            vertsTemp.push(normal.x);
            vertsTemp.push(normal.y);
            vertsTemp.push(normal.z);

            // vertsTemp.push(-1);
            // vertsTemp.push(0);
            // vertsTemp.push(0);


            // if (i % 3 == 0) {
            //     vertsTemp.push(0);
            //     vertsTemp.push(0);
            // }
            // else if ((i + 1) % 3 == 0) {
            //     vertsTemp.push(0);
            //     vertsTemp.push(1);
            // }
            // else {
            //     vertsTemp.push(1);
            //     vertsTemp.push(0);
            // }
        }

        var vertices = new Float32Array(vertsTemp);
        var indices = new Uint16Array(triangls);

        // return Laya.PrimitiveMesh._createMesh(vertexDeclaration, vertices, indices);
    }

    static createBox2 = function (long, height, width) {
        (long === void 0) && (long = 1);
        (height === void 0) && (height = 1);
        (width === void 0) && (width = 1);
        var vertexDeclaration = Laya.VertexMesh.getVertexDeclaration("POSITION");
        var halfLong = long / 2;
        var halfHeight = height / 2;
        var halfWidth = width / 2;
        var vertices = new Float32Array([
            -halfLong, halfHeight, -halfWidth, halfLong, halfHeight, -halfWidth, halfLong, halfHeight, halfWidth, -halfLong, halfHeight, halfWidth,
            -halfLong, -halfHeight, -halfWidth, halfLong, -halfHeight, -halfWidth, halfLong, -halfHeight, halfWidth, -halfLong, -halfHeight, halfWidth,
            -halfLong, halfHeight, -halfWidth, -halfLong, halfHeight, halfWidth, -halfLong, -halfHeight, halfWidth, -halfLong, -halfHeight, -halfWidth,
            halfLong, halfHeight, -halfWidth, halfLong, halfHeight, halfWidth, halfLong, -halfHeight, halfWidth, halfLong, -halfHeight, -halfWidth,
            -halfLong, halfHeight, halfWidth, halfLong, halfHeight, halfWidth, halfLong, -halfHeight, halfWidth, -halfLong, -halfHeight, halfWidth,
            -halfLong, halfHeight, -halfWidth, halfLong, halfHeight, -halfWidth, halfLong, -halfHeight, -halfWidth, -halfLong, -halfHeight, -halfWidth]);
        var indices = new Uint16Array([
            0, 1, 2, 2, 3, 0,  //由三角形012，和三角形230 组成上面 
            4, 7, 6, 6, 5, 4, //同上 组成底面
            8, 9, 10, 10, 11, 8, //组成左侧面
            12, 15, 14, 14, 13, 12,//组成右侧面
            16, 17, 18, 18, 19, 16,//组成正面
            20, 23, 22, 22, 21, 20]);//后面
        // return Laya.PrimitiveMesh._createMesh(vertexDeclaration, vertices, indices);
    }

    static createBox = function (long, height, width) {
        (long === void 0) && (long = 1);
        (height === void 0) && (height = 1);
        (width === void 0) && (width = 1);
        var vertexCount = 24;
        var indexCount = 36;
        var vertexDeclaration = Laya.VertexMesh.getVertexDeclaration("POSITION,NORMAL,UV");
        var halfLong = long / 2;
        var halfHeight = height / 2;
        var halfWidth = width / 2;
        var vertices = new Float32Array([
            -halfLong, halfHeight, -halfWidth, 0, 1, 0, 0, 0, halfLong, halfHeight, -halfWidth, 0, 1, 0, 1, 0, halfLong, halfHeight, halfWidth, 0, 1, 0, 1, 1, -halfLong, halfHeight, halfWidth, 0, 1, 0, 0, 1,
            -halfLong, -halfHeight, -halfWidth, 0, -1, 0, 0, 1, halfLong, -halfHeight, -halfWidth, 0, -1, 0, 1, 1, halfLong, -halfHeight, halfWidth, 0, -1, 0, 1, 0, -halfLong, -halfHeight, halfWidth, 0, -1, 0, 0, 0,
            -halfLong, halfHeight, -halfWidth, -1, 0, 0, 0, 0, -halfLong, halfHeight, halfWidth, -1, 0, 0, 1, 0, -halfLong, -halfHeight, halfWidth, -1, 0, 0, 1, 1, -halfLong, -halfHeight, -halfWidth, -1, 0, 0, 0, 1,
            halfLong, halfHeight, -halfWidth, 1, 0, 0, 1, 0, halfLong, halfHeight, halfWidth, 1, 0, 0, 0, 0, halfLong, -halfHeight, halfWidth, 1, 0, 0, 0, 1, halfLong, -halfHeight, -halfWidth, 1, 0, 0, 1, 1,
            -halfLong, halfHeight, halfWidth, 0, 0, 1, 0, 0, halfLong, halfHeight, halfWidth, 0, 0, 1, 1, 0, halfLong, -halfHeight, halfWidth, 0, 0, 1, 1, 1, -halfLong, -halfHeight, halfWidth, 0, 0, 1, 0, 1,
            -halfLong, halfHeight, -halfWidth, 0, 0, -1, 1, 0, halfLong, halfHeight, -halfWidth, 0, 0, -1, 0, 0, halfLong, -halfHeight, -halfWidth, 0, 0, -1, 0, 1, -halfLong, -halfHeight, -halfWidth, 0, 0, -1, 1, 1]);
        var indices = new Uint16Array([
            0, 1, 2, 2, 3, 0,  //由三角形012，和三角形230 组成上面 
            4, 7, 6, 6, 5, 4, //同上 组成底面
            8, 9, 10, 10, 11, 8, //组成左侧面
            12, 15, 14, 14, 13, 12,//组成右侧面
            16, 17, 18, 18, 19, 16,//组成正面
            20, 23, 22, 22, 21, 20]);//后面
        // return Laya.PrimitiveMesh._createMesh(vertexDeclaration, vertices, indices);
    }

    static createTriangle(long, height, width) {
        (long === void 0) && (long = 1);
        (height === void 0) && (height = 1);
        (width === void 0) && (width = 1);
        var vertexCount = 3;
        var indexCount = 3;
        var vertexDeclaration = Laya.VertexMesh.getVertexDeclaration("POSITION,NORMAL,UV");
        var halfLong = long / 2;
        var halfHeight = height / 2;
        var halfWidth = width / 2;

        var vertices = new Float32Array([
            -halfLong, halfHeight, -halfWidth, 0, 1, 0, 0, 0, halfLong, halfHeight, -halfWidth, 0, 1, 0, 1, 0, halfLong, halfHeight, halfWidth, 0, 1, 0, 1, 1,
            -halfLong, -halfHeight, -halfWidth, 0, -1, 0, 0, 0, halfLong, -halfHeight, -halfWidth, 0, -1, 0, -1, 0, halfLong, -halfHeight, halfWidth, 0, -1, 0, -1, -1,
            -halfLong, halfHeight, -halfWidth, 0, -1, 0, 0, 0, halfLong, halfHeight, -halfWidth, 0, -1, 0, -1, 0, halfLong, -halfHeight, -halfWidth, 0, -1, 0, 0, -1, -halfLong, -halfHeight, -halfWidth, 0, -1, 0, -1, -1,
            halfLong, halfHeight, -halfWidth, 0, 1, 0, 0, 0, halfLong, halfHeight, halfWidth, 0, 1, 0, 1, 0, halfLong, -halfHeight, -halfWidth, 0, 1, 0, 0, 1, halfLong, -halfHeight, halfWidth, 0, 1, 0, 1, 1,
            -halfLong, halfHeight, -halfWidth, 0, 1, 0, 0, 0, halfLong, halfHeight, halfWidth, 0, 1, 0, 0, 0, halfLong, -halfHeight, halfWidth, 0, 1, 0, 0, 1, -halfLong, -halfHeight, -halfWidth, 0, 1, 0, 1, 1
        ]);
        var indices = new Uint16Array([
            0, 1, 2,
            5, 4, 3,
            6, 9, 8, 8, 7, 6,
            11, 10, 12, 12, 13, 11,
            14, 15, 16, 16, 17, 14,
        ]);
        // return Laya.PrimitiveMesh._createMesh(vertexDeclaration, vertices, indices);
    }

    // var vertices=new Float32Array([
    // -halfLong,halfHeight,-halfWidth,0,1,0,0,0,halfLong,halfHeight,-halfWidth,0,1,0,1,0,halfLong,halfHeight,halfWidth,0,1,0,1,1,-halfLong,halfHeight,halfWidth,0,1,0,0,1,
    // -halfLong,-halfHeight,-halfWidth,0,-1,0,0,1,halfLong,-halfHeight,-halfWidth,0,-1,0,1,1,halfLong,-halfHeight,halfWidth,0,-1,0,1,0,-halfLong,-halfHeight,halfWidth,0,-1,0,0,0,
    // -halfLong,halfHeight,-halfWidth,-1,0,0,0,0,-halfLong,halfHeight,halfWidth,-1,0,0,1,0,-halfLong,-halfHeight,halfWidth,-1,0,0,1,1,-halfLong,-halfHeight,-halfWidth,-1,0,0,0,1,
    // halfLong,halfHeight,-halfWidth,1,0,0,1,0,halfLong,halfHeight,halfWidth,1,0,0,0,0,halfLong,-halfHeight,halfWidth,1,0,0,0,1,halfLong,-halfHeight,-halfWidth,1,0,0,1,1,
    // -halfLong,halfHeight,halfWidth,0,0,1,0,0,halfLong,halfHeight,halfWidth,0,0,1,1,0,halfLong,-halfHeight,halfWidth,0,0,1,1,1,-halfLong,-halfHeight,halfWidth,0,0,1,0,1,
    // -halfLong,halfHeight,-halfWidth,0,0,-1,1,0,halfLong,halfHeight,-halfWidth,0,0,-1,0,0,halfLong,-halfHeight,-halfWidth,0,0,-1,0,1,-halfLong,-halfHeight,-halfWidth,0,0,-1,1,1]);

    getNormal(A, B, C): Laya.Vector3 {
        var AB = MyVector3.subtract(B, A);
        var AC = MyVector3.subtract(C, A);

        return MyVector3.normalized(MyVector3.cross(AC, AB));
    }


    lerpVec3(a, b, t): Laya.Vector3 {
        t = this.Clamp01(t);
        return new Laya.Vector3(
            a.x + (b.x - a.x) * t,
            a.y + (b.y - a.y) * t,
            a.z + (b.z - a.z) * t,
        );
    }

    Clamp01(v): number {
        if (v > 1) return 1;
        if (v < 0) return 0;
        return v;
    }
}