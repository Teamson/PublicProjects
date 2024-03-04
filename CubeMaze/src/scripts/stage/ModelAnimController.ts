import Data from "../tools/Data";

export enum ModelAnimClips {
    Idle = "Idle",
    Jump = "Jump",
    End = "End",
    Move = "Move",
    Dance = "Dance"
}
export default class ModelAnimController {
    static playAnim(name: string) {
        let nowName = Data.anim.getControllerLayer(0).getCurrentPlayState().animatorState.name;
        if (nowName != name) {
            Data.anim.play(name, 0, 0);
        }
    }
  
    static FadeIn(name: string) {
        Data.anim.crossFade(name, 0.2, 0, 0);
    }
    //获取动画进度参考
    // if (Data.anim.getControllerLayer(0).getCurrentPlayState().animatorState.name == AnimClips.Move) {
    //     let axis = Data.anim.getControllerLayer(0).getCurrentPlayState().normalizedTime;
    //     axis = axis % 1;
}