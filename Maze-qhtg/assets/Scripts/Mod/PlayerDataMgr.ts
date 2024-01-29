import { _decorator } from "cc";
const { ccclass, property } = _decorator;

export class PlayerData {
    grade: number = 1
    coin: number = 0
    skinId: number = 0
    skinArr: number[] = [1, 0, 0, 0, 0, 0]
}
@ccclass
export default class PlayerDataMgr {
    private static _playerData: PlayerData
    public static maxGrade: number = 9

    //获取用户数据
    public static getPlayerData(): PlayerData {
        if (!localStorage.getItem('playerData')) {
            this._playerData = new PlayerData()
            localStorage.setItem('playerData', JSON.stringify(this._playerData))
        } else {
            if (this._playerData == null) {
                let item: any = localStorage.getItem('playerData')
                this._playerData = JSON.parse(item) as PlayerData
            }
        }
        return this._playerData
    }

    //设置用户数据
    public static setPlayerData() {
        localStorage.setItem('playerData', JSON.stringify(this._playerData))
    }

    public static changeGrade(v: number = 1) {
        this._playerData.grade += v
        this.setPlayerData()
    }
}
