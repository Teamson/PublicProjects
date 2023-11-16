
const { ccclass, property } = cc._decorator;

@ccclass
export default class SoundMgr extends cc.Component {

    public static _ins: SoundMgr

    currentMusic: string = ""

    public IsMusic: boolean = true
    public IsSound: boolean = true

    onLoad() {
        SoundMgr._ins = this
        cc.game.addPersistRootNode(this.node)
    }

    start() {
        // [3]
    }

    setIsMuteMusic(IsMute: boolean) {
        this.IsMusic = IsMute;
        if (!IsMute && this.currentMusic != '') {
            this.StopMuisc(this.currentMusic);
        } else if (IsMute && this.currentMusic != '') {
            this.PlayMusic(this.currentMusic);
        } else if (IsMute && this.currentMusic == '') {
            this.PlayMusic('Bgm');
        }
    }
    setIsMuteSound(IsMute: boolean) {
        this.IsSound = IsMute;
    }

    loadSounds(cb: Function) {
        cc.resources.loadDir('Sounds', cc.AudioClip, (err, clips) => {
            clips.forEach((sound) => {
                let clip = new cc.Node()
                let crl = clip.addComponent(cc.AudioSource)
                crl.playOnLoad = false
                crl.clip = sound
                clip.name = sound.name
                this.node.addChild(clip)
            })
            cb && cb();
        })
    }

    PlaySound(key: string, loop: boolean = false, volume: number = 1) {
        if (this.IsSound && this.node.getChildByName(key)) {
            this.node.getChildByName(key).getComponent(cc.AudioSource).loop = loop
            this.node.getChildByName(key).getComponent(cc.AudioSource).volume = volume
            return this.node.getChildByName(key).getComponent(cc.AudioSource).play()
        }
    }

    stopSound(key: string) {
        if (this.node.getChildByName(key))
            this.node.getChildByName(key).getComponent(cc.AudioSource).stop()
    }

    PlayMusic(key: string, loop: boolean = true, volume: number = 0.5) {
        if (this.IsMusic && this.node.getChildByName(key)) {
            if (this.currentMusic && this.currentMusic != '') this.StopMuisc(this.currentMusic)
            this.node.getChildByName(key).getComponent(cc.AudioSource).loop = loop
            this.node.getChildByName(key).getComponent(cc.AudioSource).volume = volume
            this.node.getChildByName(key).getComponent(cc.AudioSource).play()
            this.currentMusic = key
        }
    }

    StopMuisc(key: string) {
        if (this.node.getChildByName(key))
            this.node.getChildByName(key).getComponent(cc.AudioSource).stop()
    }
}
