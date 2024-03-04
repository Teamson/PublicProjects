import { SoundType } from "../../JJExport/enums/EnumType";
import Data from "../tools/Data";
import Tween3D from "./Tween3D";

export default class Tools {
   //加载场景
   static loadScene(Url, zOrder = 0, cb: Function = () => { }, param: any = null) {
      Url && Laya.Scene.open(Url, false, param, Laya.Handler.create(this, (scene) => {
         Laya.stage.addChild(scene);
         scene.zOrder = zOrder;
         cb();
      }));
   }
   //**事件开启 */
   static TouchOn(start: Function, move: Function, end: Function, caller) {
      Laya.stage.on(Laya.Event.MOUSE_DOWN, caller, start);
      Laya.stage.on(Laya.Event.MOUSE_MOVE, caller, move);
      Laya.stage.on(Laya.Event.MOUSE_UP, caller, end);
      Laya.stage.on(Laya.Event.MOUSE_OUT, caller, end);
   }
   //**接触事件关闭 */
   static TouchOff(start: Function, move: Function, end: Function, caller) {
      Laya.stage.off(Laya.Event.MOUSE_DOWN, caller, start);
      Laya.stage.off(Laya.Event.MOUSE_MOVE, caller, move);
      Laya.stage.off(Laya.Event.MOUSE_UP, caller, end);
      Laya.stage.on(Laya.Event.MOUSE_OUT, caller, end);
   }
   //**普通UI按钮点击 */
   static buttonInit(btn: Laya.Button, caller: any, cb: Function, param?: any[], isScale?: boolean) {
      btn.offAllCaller(caller);

      if (btn instanceof Laya.Button && !isScale) {
         let callback = (event) => {
            Data.soundController.play(SoundType.CLICK);
            if (cb) cb.call(caller, event);
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
            if (cb) cb.call(caller, event);
            //TODON 添加按钮声
            Data.soundController.play(SoundType.CLICK);
         }
         btn.on(Laya.Event.MOUSE_UP, caller, cbUp, [param]);

         let cbOut = (event) => {
            // event.stopPropagation();
            Laya.Tween.to(btn, { scaleX: scaleX, scaleY: scaleY }, scaleTime);
         }
         btn.on(Laya.Event.MOUSE_OUT, caller, cbOut, [param]);
      }
   }
   //**Image的Button点击 */
   static imageButtonInit(img: Laya.Image, caller, cb: Function, value?: any) {
      img.offAllCaller(caller);
      let cb1 = (event) => {
         Data.soundController.play(SoundType.CLICK);
         if (cb) cb.call(caller, event);
      }
      img.on(Laya.Event.MOUSE_UP, caller, cb1, [value]);
   }
   //**游戏中按钮点击 */
   static gameButtonOn(img: Laya.Image, caller: any, Down: Function, Up: Function) {
      img.offAllCaller(caller)

      img.on(Laya.Event.MOUSE_DOWN, caller, Down);
      img.on(Laya.Event.MOUSE_UP, caller, Up);
      img.on(Laya.Event.MOUSE_OUT, caller, Up);
   }
   //**Vector3相加 */
   static Vector3Add(a: Laya.Vector3, b: Laya.Vector3): Laya.Vector3 {
      let pos = new Laya.Vector3();
      Laya.Vector3.add(a, b, pos);
      return pos;
   }
   //**Vector3相减a-b */
   static Vector3Reduce(a: Laya.Vector3, b: Laya.Vector3): Laya.Vector3 {
      let pos = new Laya.Vector3();
      let c = Tools.Vector3Axis(b, -1);
      pos = this.Vector3Add(a, c);
      return pos;
   }
   //**Vector2相加 */
   static Vector2Add(a: Laya.Vector2, b: Laya.Vector2): Laya.Vector2 {
      let pos = new Laya.Vector2(a.x + b.x, a.y + b.y);
      return pos;
   }
   //**Vector2相减a-b */
   static Vector2Reduce(a: Laya.Vector2, b: Laya.Vector2): Laya.Vector2 {
      let pos = new Laya.Vector2(a.x - b.x, a.y - b.y);
      return pos;
   }
   //**Vector2长度 */
   static Vector2Scale(a: Laya.Vector2): number {
      let scale = Math.sqrt((Math.pow(a.x, 2) + Math.pow(a.y, 2)))
      return scale;
   }
   //**获取transform前方 */
   static getTransformForward(transform: Laya.Transform3D): Laya.Vector3 {
      let pos = new Laya.Vector3();
      transform.getForward(pos);
      pos = this.Vector3Axis(pos, -1);
      return pos;
   }
   //**乘Vector */
   static Vector3Axis(vec3: Laya.Vector3, axis: number): Laya.Vector3 {
      let pos = vec3.clone();
      pos.x *= axis;
      pos.y *= axis;
      pos.z *= axis;
      return pos;
   }
   //**改欧拉角Y */
   static setTransRotEulerY(transform: Laya.Transform3D, rotY: number) {
      let rot = transform.localRotationEuler.clone();
      rot.y = rotY;
      transform.localRotationEuler = rot;
   }
   //**改欧拉角X */
   static setTransRotEulerX(transform: Laya.Transform3D, rotX: number) {
      let rot = transform.localRotationEuler.clone();
      rot.x = rotX;
      transform.localRotationEuler = rot;
   }
   //**改欧拉角Z */
   static setTransRotEulerZ(transform: Laya.Transform3D, rotZ: number) {
      let rot = transform.localRotationEuler.clone();
      rot.z = rotZ;
      transform.localRotationEuler = rot;
   }
   //**随机抽取数组中一个元素(不删除) */
   static getRandomInArray(array) {
      if (array.length) {
         let r = Math.random() * array.length;
         r = Math.floor(r);
         return array[r];
      } else {
         console.log("传入错误参数,返回空")
         return null;
      }
   }
   //**随机抽取数组中一个元素(删除) */
   static takeRandomInArray(array) {
      if (array.length) {
         let r = Math.random() * array.length;
         r = Math.floor(r);
         let obj = array[r]
         array.splice(r, 1);
         return obj;
      } else {
         console.log("传入错误参数,返回空")
         return null;
      }
   }
   /**3D转屏幕坐标 */
   static getSpritePosBySprite3DPoint(target, offset: Laya.Vector2 = new Laya.Vector2(0, 0)): Laya.Point {
      var pos = target.transform.position.clone();
      var outPos = new Laya.Vector4;
      Data.mainCam.viewport.project(pos, Data.mainCam.projectionViewMatrix, outPos);
      var pos2d = new Laya.Vector2(outPos.x / Laya.stage.clientScaleX, outPos.y / Laya.stage.clientScaleY);
      pos2d.x += offset.x;
      pos2d.y += offset.y;
      return new Laya.Point(pos2d.x, pos2d.y);
   }
   //**金币收集 */
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
               if (amountTmp == 0 && callBack) callBack(parent);
            }));
         })
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
               if (amountTmp == 0 && callBack) callBack(parent);
            }));
         })
      }
   }
   //**数值固定值靠近*/
   static numberTo(base, target, dt) {

      if (base < target) {
         base += dt;
      } else if (base > target) {
         base -= dt;
      }
      if (Math.abs((target - base)) < dt) {
         base = target
      }
      return base;
   }
   //**找节点中这个名字的玩意儿*/
   static findNodeByName(rootNode: Laya.Sprite3D, name: string): Laya.Sprite3D {
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
   /**读取Json文件 */
   //从bin开始
   //  res/Stages/StagesConfig.json
   static loadJsonFile(path: string, callBack: Function) {
      Laya.loader.load(path, Laya.Handler.create(this, (json) => {
         var data = Laya.loader.getRes(path);
         callBack(data);
      }), null, Laya.Loader.JSON);
   }
   /**物体抖动 */
   static objectShake(target: Laya.Sprite3D, shakeTime: number = 1, shakeAmount: number = 0.7) {
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

   //**物体变小后变大提醒 */
   static objectScaleTips(target: Laya.Sprite3D) {
      let t = new Tween3D();
      let normalScale = target.transform.localScale.clone();
      let smallScale = Tools.Vector3Axis(normalScale, 0.8);
      let bigScale = Tools.Vector3Axis(normalScale, 1.2);
      t.toTween(target, { sca: smallScale }, 50)
         .then({ sca: bigScale }, 50)
         .then({ sca: normalScale }, 50);
   }
   //**手机振动 */
   static vibrateShort() {
      if (Laya.Browser.onWeiXin) {
         wx.vibrateShort({
            success: function () { },
            fail: function () { },
            complete: function () { }
         })
      }
   }
   //**延时执行函数 */
   static delayCall(call, time) {
      setTimeout(() => {
         call();
      }, time);
   }
   /**
        * 
        * @param myPos 待旋转对象坐标
        * @param targetPos 被绕对象坐标
        * @param axis 轴
        * @param angle 角度
        * @returns 旋转后坐标
        */
   public static RotateWithAxis(myPos: Laya.Vector3, targetPos: Laya.Vector3, axis: Laya.Vector3, angle: number): Laya.Vector3 {
      let desPos: Laya.Vector3 = new Laya.Vector3()
      let dis: number = Laya.Vector3.distance(myPos, targetPos)
      let dir = new Laya.Vector3()
      Laya.Vector3.subtract(myPos, targetPos, dir)
      Laya.Vector3.normalize(dir, dir)
      let q = new Laya.Quaternion()
      Laya.Vector3.normalize(axis, axis)
      Laya.Quaternion.createFromAxisAngle(axis, angle * Math.PI / 180, q)
      Laya.Vector3.transformQuat(dir, q, dir)
      Laya.Vector3.scale(dir, dis, dir)
      Laya.Vector3.add(targetPos, dir, desPos)
      return desPos
   }
}