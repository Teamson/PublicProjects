import Context from "../Context";
import { SoundType } from "../enums/EnumType";


export default class SoundManager {
    private _soundFile: string[];
    private _pathRoot: string;
    private _soundCtx: any;

    constructor() {
        this._pathRoot = "res/Sounds/";//"https://p.ddkaoshi.com/resource/sound/"
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

            if (file.indexOf("PoliceSiren") != -1) innerAudioContext.loops = 0;

            Laya.SoundManager.addChannel(innerAudioContext);
            this._soundCtx[file] = true;
        }

        let loadUrl = ["res/Sounds/Bgm.mp3"];
        Laya.loader.load(loadUrl,Laya.Handler.create(this,()=>{
            this.playMusic("Bgm");
        }));
         
        Laya.SoundManager.autoReleaseSound = false;
    }

    play(name) {
        if (this._soundCtx[name] ) {
            // this._soundCtx[name].play();
            Laya.SoundManager.playSound(this._pathRoot + name + ".mp3");
        }
    }
    playLoop(name)
    {
        if (this._soundCtx[name]) {
            // this._soundCtx[name].play();
            Laya.SoundManager.playSound(this._pathRoot + name + ".mp3",0);
        }
    }

    stop(name) {
        if (this._soundCtx[name]) {
            // this._soundCtx[name].stop();
            Laya.SoundManager.stopSound(this._pathRoot + name + ".mp3");
        }
    }

    currentMusic: string;
    playMusic(name?) {
        // if (name == this.currentMusic) return;
        // if (LayaSample.storageMgr.isPlaySound()) {
        Laya.SoundManager.stopMusic();

        if (name) {
            Laya.SoundManager.playMusic(this._pathRoot + name + ".mp3", 0);
            this.currentMusic = name;
        }
        else {
            Laya.SoundManager.playMusic(this._pathRoot + this.currentMusic + ".mp3", 0);
        }
        // }
    }

    stopMusic() {
        Laya.SoundManager.stopMusic();
    }
}