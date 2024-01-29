
import { _decorator, Component, Node, resources, AudioClip, AudioSource, log, game } from 'cc';
const { ccclass, property } = _decorator;

@ccclass('SoundMgr')
export class SoundMgr extends Component {

    public static Share: SoundMgr

    @property(AudioClip)
    clips: AudioClip[] = []

    currentMusic: string = ""

    currentAid: number = -1

    doneCB: Function = null

    IsMute: boolean = false

    onLoad() {
        SoundMgr.Share = this
        game.addPersistRootNode(this.node)
    }

    start() {
        // [3]
        this.loadSounds()
    }

    loadSounds() {
        resources.loadDir('sounds', AudioClip, (err, clips) => {
            clips.forEach((sound) => {
                let clip = new Node()
                let crl = clip.addComponent(AudioSource)
                crl.playOnAwake = false
                crl.clip = sound
                clip.name = sound.name
                this.node.addChild(clip)
            })
        })
        // this.clips.forEach((sound) => {
        //     let clip = new Node()
        //     let crl = clip.addComponent(AudioSource)
        //     crl.playOnAwake = false
        //     crl.clip = sound
        //     clip.name = sound.name
        //     this.node.addChild(clip)
        // })
    }

    PlaySound(key: string, loop: boolean = false, volume: number = 1) {
        if (this.node == null) {
            return null
        }
        if (!this.IsMute) {
            let source = this.node.getChildByName(key)
            if (source == null) {
                console.log("can't load sound", key)
                return null
            }
            this.node.getChildByName(key).getComponent(AudioSource).loop = loop
            this.node.getChildByName(key).getComponent(AudioSource).volume = volume
            return this.node.getChildByName(key).getComponent(AudioSource).play()
        }
    }

    stopSound(key: string) {
        this.node.getChildByName(key).getComponent(AudioSource).stop()
    }

    getMusicClip(key: string) {
        return this.node.getChildByName(key).getComponent(AudioSource).clip
    }

    PlayMusic(key: string, loop: boolean = true) {
        if (this.node == null) {
            return
        }
        if (!this.IsMute) {
            let source = this.node.getChildByName(key)
            if (source == null) {
                log("can't load music", key)
                return
            }
            this.node.getChildByName(key).getComponent(AudioSource).loop = loop
            this.node.getChildByName(key).getComponent(AudioSource).play()
            this.currentMusic = key
        }
    }

    StopMuisc(key: string) {
        if (this.node == null) {
            return
        }
        this.node.getChildByName(key).getComponent(AudioSource).stop()
    }

    // update (deltaTime: number) {
    //     // [4]
    // }
}
