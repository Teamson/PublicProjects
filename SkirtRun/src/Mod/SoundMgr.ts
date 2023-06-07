export default class SoundMgr {
    private static _instance: SoundMgr
    public static get instance(): SoundMgr {
        if (!this._instance) {
            this._instance = new SoundMgr()
        }
        return this._instance
    }

    effectArr: string[] = []

    initLoading(fun: Function) {
        //预加载资源
        var resUrl: any[] = [
            { url: 'res/Sounds/Click.mp3', type: Laya.Loader.SOUND },
            { url: 'res/Sounds/Get.mp3', type: Laya.Loader.SOUND },
            { url: 'res/Sounds/Hurt.mp3', type: Laya.Loader.SOUND },
            { url: 'res/Sounds/Win.mp3', type: Laya.Loader.SOUND },
            { url: 'res/Sounds/Lose.mp3', type: Laya.Loader.SOUND }
        ];
        Laya.loader.load(resUrl, Laya.Handler.create(this, fun));

        //跟随设备静音键 静音
        //Laya.SoundManager.useAudioMusic = true
        //Laya.SoundManager.autoStopMusic = true
        Laya.SoundManager.setMusicVolume(1)
        Laya.SoundManager.setSoundVolume(1)
    }

    playMusic(str: string, loops: number = 0, cb?: Function) {
        Laya.SoundManager.playMusic('res/Sounds/' + str, loops, new Laya.Handler(this, cb))
    }

    stopMusic() {
        Laya.SoundManager.stopMusic()
    }

    playSoundEffect(str: string, loops: number = 1, cb?: Function, soundClass?, startTime?) {
        // if (this.effectArr.indexOf(str) == -1) {
        //     this.effectArr.push(str)
        //     Laya.SoundManager.playSound('res/Sounds/' + str, loops, new Laya.Handler(this, cb))
        //     Laya.timer.once(1000, this, () => {
        //         this.effectArr.splice(this.effectArr.indexOf(str), 1)
        //     })
        // }
        return Laya.SoundManager.playSound('res/Sounds/' + str, loops, new Laya.Handler(this, cb), soundClass, startTime)
    }

    stopSound(str: string) {
        Laya.SoundManager.stopSound('res/Sounds/' + str)
    }
}