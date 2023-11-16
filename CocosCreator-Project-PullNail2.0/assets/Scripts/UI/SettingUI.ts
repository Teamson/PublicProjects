import PlatformApi from "../Mod/PlatformApi";
import SoundMgr from "../Mod/SoundMgr";
import Utility from "../Mod/Utility";

const {ccclass, property} = cc._decorator;

@ccclass
export default class SettingUI extends cc.Component {
    @property(cc.Node)
    music: cc.Node = null;
    @property(cc.Node)
    effect: cc.Node = null;

    isMusic: boolean = true;
    isSound: boolean = true;

    protected onEnable(): void {
        Utility.zoomUI(this.node.getChildByName('root'))
        this.updateIcon()
    }

    musicCB() {
        this.isMusic = !this.isMusic;
        SoundMgr._ins.setIsMuteMusic(this.isMusic);
        this.updateIcon()
        SoundMgr._ins.PlaySound('Click')
    }

    soundCB() {
        this.isSound = !this.isSound;
        SoundMgr._ins.setIsMuteSound(this.isSound);
        this.updateIcon()
        SoundMgr._ins.PlaySound('Click')
    }

    updateIcon() {
        this.music.getChildByName('btn').children[0].active = SoundMgr._ins.IsMusic;
        this.music.getChildByName('btn').children[1].active = !SoundMgr._ins.IsMusic;

        this.effect.getChildByName('btn').children[0].active = SoundMgr._ins.IsSound;
        this.effect.getChildByName('btn').children[1].active = !SoundMgr._ins.IsSound;
    }

    closeCB(){
        SoundMgr._ins.PlaySound('Click')
        Utility.zoomUI(this.node.getChildByName('root'),0,()=>{
            this.node.active = false
        })
    }
}
