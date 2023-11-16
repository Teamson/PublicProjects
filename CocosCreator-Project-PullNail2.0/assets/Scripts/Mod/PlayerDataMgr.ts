
export class PlayerData {
    grade: number = 1
    coin: number = 0
    skinId: number = 0
    skinArr: number[] = [1, 0, 0, 0, 0, 0, 0, 0, 0]
    score: number = 0
    hadAuthorize: boolean = false
}

export default class PlayerDataMgr {
    private static _playerData: PlayerData
    public static maxGrade: number = 10

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

    public static getSkinId(): number[] {
        let arr = []
        for (let i = 1; i < this._playerData.skinArr.length; i++) {
            if (this._playerData.skinArr[i] == 0) {
                arr.push(i)
            }
        }
        return arr
    }
}
