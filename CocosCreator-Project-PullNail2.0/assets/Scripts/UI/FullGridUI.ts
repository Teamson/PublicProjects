import UINode from "../Crl/UINode";
import { UIType } from "../Mod/Entity";
import SGAD from "../Mod/SGAD";

const { ccclass, property } = cc._decorator;

@ccclass
export default class FullGridUI extends cc.Component {

    protected onEnable(): void {
        SGAD.visibleFullGridAd(true)
        SGAD.hideBannerAd()
    }

    closeCB() {
        SGAD.visibleFullGridAd(false)
        SGAD.showBannerAd()
        UINode.Share.closeUI(UIType.UI_FullGrid)
    }

}
