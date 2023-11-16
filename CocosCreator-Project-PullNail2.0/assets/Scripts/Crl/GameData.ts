
const { ccclass, property } = cc._decorator;

@ccclass
export default class GameData {
    public static isStart: boolean = false
    public static isGameOver: boolean = false
    public static isWin: boolean = false
    public static isPause: boolean = false
    public static gameIndex: number = 1
    public static gameTime: number = 181
    public static curGradeName: string = ''
    public static hadGotAnswer: boolean = false
    public static hadOpenHole:boolean = false
    public static hadAnswerRevive:boolean = false
}
