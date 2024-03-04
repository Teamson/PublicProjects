// import Context from "../Context";

// export default class GameLevelMgr {
//     parent: Laya.Sprite3D;
//     emerys: Laya.Sprite3D;

//     scenes: Laya.Sprite3D; //间距-160
//     road: Laya.Sprite3D; //间距-10

//     cloneObj(obj) {
//         return obj.clone();
//     }

//     init(scene) {
//         this.parent = scene.getChildByName("Parent");
//         this.emerys = scene.getChildByName("Emerys");
//         this.scenes = scene.getChildByName("Scenes");
//         this.road = scene.getChildByName("Road");
//     }

//     loadLevel() {
//         this.parent.destroyChildren();

//         //选择场景
//         var isCityScene = Math.random() > 0.5;
//         var sceneLength = 4;

//         if (isCityScene) {
//             for (var i = 0; i < sceneLength; i++) {
//                 var index = Math.random() > 0.5 ? 0 : 1;
//                 var scene = this.cloneObj(this.scenes.getChildAt(index));
//                 this.parent.addChild(scene);
//                 scene.transform.position = new Laya.Vector3(0, 0, i * 160);

//                 for (var j = 0; j < 15; j++) {
//                     var road = this.cloneObj(this.road);
//                     road.getChildAt(0).meshRenderer.materials[1].destroy();
//                     this.parent.addChild(road);
//                     road.transform.position = new Laya.Vector3(0, 0, i * 160 + j * 10);
//                 }
//             }
//         }
//     }
// }
