export default class Cylinder extends Laya.Script {
    constructor() {
        super()
    }
    myOwner: Laya.Sprite3D
    index: number = 0

    onAwake() {
        this.myOwner = this.owner as Laya.Sprite3D
    }

    initData(index) {
        this.index = index
        let ms: Laya.MeshSprite3D = this.myOwner as Laya.MeshSprite3D
        Laya.Texture2D.load("res/Texture/Cylinder_" + (index + 1) + '.jpg', Laya.Handler.create(this, function (texture) {
            (ms.meshRenderer.material as Laya.BlinnPhongMaterial).albedoTexture = texture;
        }));
    }

    onUpdate() {

    }
}