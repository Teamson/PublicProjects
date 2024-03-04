// import Context from "../Context";
// import { PrefabItem } from "../enums/EnumType";
// import EventType from "../utils/EventType";

// /**合成管理器 */
// export default class CompoundManager {

//     canBuy: boolean;

//     currentList: number[] = [
//         1, 0, 0, 0,
//         0, 0, 0, 0,
//         0, 0, 0, 0
//     ];
//     currentMax: number = 1;
//     maxIndex: number = 20;

//     //每秒总收益
//     earnBySecond: number = 1;

//     buyItemData: any[] = [];

//     constructor() {
//         let jsonData = Context.Storage.readStorage("compoundList");
//         if (!jsonData) {
//             Context.Storage.writeStorage("compoundList", this.currentList);
//             Context.Storage.writeStorage("currentMax", this.currentMax);
//             Context.Storage.writeStorage("buyItemData", this.buyItemData);
//         }
//         else {
//             this.currentList = JSON.parse(jsonData);
//             this.currentMax = JSON.parse(Context.Storage.readStorage("currentMax"));
//             this.buyItemData = JSON.parse(Context.Storage.readStorage("buyItemData"))
//         }

//         this.canBuy = this.currentList.indexOf(0) != -1;
//         this.calcTotalEarn();
//     }

//     buyItem(level, price): number {
//         if (this.canBuy) {
//             if (Context.Storage.storageData.coin >= price) {
//                 for (var i = 0; i < this.currentList.length; i++) {
//                     if (this.currentList[i] == 0) {
//                         Context.Storage.updateCoin(-price);
//                         this.currentList[i] = level;
//                         this.canBuy = this.currentList.indexOf(0) != -1;
//                         Context.Storage.writeStorage("compoundList", this.currentList);

//                         if (this.buyItemData[level - 1] == null) {
//                             this.buyItemData[level - 1] = 1;
//                         }
//                         else {
//                             this.buyItemData[level - 1] += 1;
//                         }
//                         Context.Storage.writeStorage("buyItemData", this.buyItemData);
//                         this.calcTotalEarn();
//                         return 0;
//                     }
//                 }
//             }
//             else {
//                 console.log("金币不足");
//                 return 1;
//             }
//         }
//         else {
//             console.log("仓库已满,请清理仓库!");
//             return 2;
//         }
//     }

//     /**计算各等级对应购买价格 */
//     calcPrice(level): number {
//         if (level == 1) {
//             if (this.buyItemData[level - 1] == null) {
//                 return 100
//             }
//             else {
//                 return Math.floor(100 * Math.pow(1.07, this.buyItemData[level - 1]));
//             }
//         }
//         else if (level == 2) {
//             if (this.buyItemData[level - 1] == null) {
//                 return 1500
//             }
//             else {
//                 return Math.floor(1500 * Math.pow(1.07, this.buyItemData[level - 1]));
//             }
//         }
//         else {
//             if (this.buyItemData[level - 1] == null) {
//                 return Math.floor(6627 * Math.pow(2.668, level - 3));
//             }
//             else {
//                 return Math.floor(Math.floor(6627 * Math.pow(2.668, level - 3)) * Math.pow(1.175, this.buyItemData[level - 1]));
//             }
//         }
//     }

//     /**每秒收益 */
//     calcEarn(level): number {
//         return Math.ceil(1.25 * Math.pow(2.114, level - 1));
//     }

//     /**计算总收益 */
//     calcTotalEarn() {
//         this.earnBySecond = 0;
//         for (var i = 0; i < this.currentList.length; i++) {
//             if (this.currentList[i] != 0) {
//                 var earn = this.calcEarn(this.currentList[i]) * 5;
//                 this.earnBySecond += earn;
//             }
//         }
//     }

//     /**计算离线收益 */
//     calcOfflineReward(): number {
//         let curTime = new Date().getTime() - Context.Storage.storageData.offlineTime;
//         let minutes = Math.floor(curTime / 60000 / 30);
//         var reward = minutes * 60 * (this.earnBySecond / 1.5);
//         return reward;
//     }

//     compound(index1, index2): boolean {
//         var isSuccess = false;

//         var item1 = this.currentList[index1];
//         var item2 = this.currentList[index2];
//         if (item1 == item2) {
//             if (item1 == this.maxIndex) {
//                 console.log("已达最高等级");
//             }
//             else {
//                 this.currentList[index2] = item1 + 1;
//                 this.currentList[index1] = 0;
//                 isSuccess = true;

//                 if (this.currentMax < item1 + 1) {
//                     this.currentMax = item1 + 1;
//                     Context.Storage.writeStorage("currentMax", this.currentMax);
//                     //TODON 解锁新等级
//                     Context.Event.event(EventType.UNLOCK_NEW_WEAPON);
//                 }
//                 this.calcTotalEarn();

//                 Context.Platform.playVibrateShort();
//             }
//         }
//         else {
//             var tmp = item2
//             this.currentList[index2] = item1;
//             this.currentList[index1] = tmp;
//         }

//         Context.Storage.writeStorage("compoundList", this.currentList);
//         this.canBuy = this.currentList.indexOf(0) != -1;
//         return isSuccess;
//     }

//     delete(index): number {
//         this.currentList[index] = 0;
//         Context.Storage.writeStorage("compoundList", this.currentList);
//         this.canBuy = this.currentList.indexOf(0) != -1;
//         this.calcTotalEarn();

//         return Math.floor(this.calcPrice(index) / 2);
//     }

//     freeUpgrade(level) {
//         for (var i = this.currentList.length - 1; i >= 0; i--) {
//             if(this.currentList[i] != 0 && this.currentList[i] == level){
//                 this.currentList[i] += 1;
//                 Context.Storage.writeStorage("compoundList", this.currentList);
//                 this.calcTotalEarn();
//                 return true;
//             }
//         }

//         return false;
//     }
// }