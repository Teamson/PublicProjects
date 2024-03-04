// import Context from "../Context";
// import EventType from "../utils/EventType";

// /**体力系统 */
// export default class StrengthManager {
//     /**当前体力 */
//     currentStrength: number;
//     /**体力上限值 */
//     maxStrength: number;
//     /**恢复间隔-分钟 */
//     recoverTime: number;
//     /**单局消耗 */
//     costStrength: number;
//     /**恢复点数-视频 */
//     recoverValue_Video: number;
//     /**恢复点数-分享 */
//     recoverValue_Share: number;

//     /**是否通过观看视频获取体力 */
//     isGetStrengthByVideo: boolean

//     countTime: number;

//     constructor() {
//         this.init();
//     }

//     init() {
//         this.costStrength = 1;
//         this.maxStrength = 20;
//         this.recoverTime = 5;
//         this.recoverValue_Share = 5;
//         this.recoverValue_Video = 5;

//         // this.currentStrength = Context.Storage.storageData.strength;

//         //离线体力
//         // let curTime = new Date().getTime() - Context.Storage.storageData.offlineTime;
//         // let minutes = curTime / 60000;
//         let newStrength = Math.floor(minutes / this.recoverTime);
//         if(newStrength >= 20 - this.currentStrength){
//             newStrength = 20 - this.currentStrength;
//         }
//         this.addStrength(3, newStrength);

//         if (this.currentStrength < this.maxStrength) {
//             //记录时间戳，实时计时，显示时间
//             this.countTime = 0;
//             Laya.timer.loop(1000, this, this.updateStrengthValue);
//         }
//     }

//     /**
//      * 增加体力
//      * @param type 恢复类型：0-时间 1-视频 2-分享 3-其他
//      */
//     addStrength(type, value?) {
//         // if (this.currentStrength >= this.maxStrength) {
//         //     return;
//         // }

//         switch (type) {
//             case 0:
//                 this.currentStrength += 1;
//                 break;
//             case 1:
//                 this.currentStrength += this.recoverValue_Video;
//                 break;
//             case 2:
//                 this.currentStrength += this.recoverValue_Share;
//                 break;
//             case 3:
//                 this.currentStrength += value;
//                 break;
//         }

//         if (this.currentStrength >= this.maxStrength && value == null) {
//             this.currentStrength = this.maxStrength;
//         }

//         this.updateData();
//         // Context.Event.event(EventType.UPDATE_STRENGTH_VALUE);
//     }

//     /**
//      * 消耗体力
//      * @param cb 回调
//      */
//     subStrength(cb) {
//         if (this.currentStrength < this.costStrength) {
//             var canPlay = false;
//             this.isGetStrengthByVideo = !this.isGetStrengthByVideo;
//         }
//         else {
//             canPlay = true;

//             if (this.currentStrength == this.maxStrength) {
//                 Laya.timer.clear(this, this.updateStrengthValue);
//                 this.countTime = 0;
//                 Laya.timer.loop(1000, this, this.updateStrengthValue);
//             }

//             this.currentStrength -= this.costStrength;
//         }

//         this.updateData();
//         cb(canPlay);
//     }

//     get getStrengtByMaxStrength(): string {
//         return this.currentStrength + "/" + this.maxStrength;
//     }

//     time: string;
//     updateStrengthValue() {
//         this.countTime++;
//         let seconds = this.recoverTime * 60 - this.countTime; //*60
//         this.time = Context.Utils.getTimeLeft2BySecond(seconds);

//         // Context.Event.event(EventType.UPDATE_STRENGTH_TIME);
//         if (seconds == 0) {
//             this.addStrength(0);
//             if (this.currentStrength < this.maxStrength) {
//                 this.countTime = 0;
//             }
//             else {
//                 Laya.timer.clear(this, this.updateStrengthValue);
//             }
//         }
//     }

//     updateData() {
//         Context.Storage.setValue(Context.Storage.storageName.strength, this.currentStrength);
//         // Context.Storage.setValue(Context.Storage.storageName.offlineTime, new Date().getTime());
//     }
// }