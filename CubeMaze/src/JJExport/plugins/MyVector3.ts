export default class MyVector3 {
    static add(v1, v2): Laya.Vector3 {
        var v = new Laya.Vector3;
        Laya.Vector3.add(v1, v2, v);
        return v.clone();
    }

    static subtract(v1, v2): Laya.Vector3 {
        var v = new Laya.Vector3;
        Laya.Vector3.subtract(v1, v2, v);
        return v.clone();
    }

    static mull(v1, multipy) {
        var v = new Laya.Vector3;
        Laya.Vector3.scale(v1, multipy, v);
        return v.clone();
    }

    static dot(v1, v2): number {
        return Laya.Vector3.dot(v1, v2);
    }

    static cross(v1, v2): Laya.Vector3 {
        var v = new Laya.Vector3
        Laya.Vector3.cross(v1, v2, v);
        return v.clone();
    }

    static normalized(v): Laya.Vector3 {
        var vTmp = new Laya.Vector3
        Laya.Vector3.normalize(v, vTmp);
        return vTmp.clone();
    }

    static distance(v1, v2): number{
        var vT = MyVector3.subtract(v1,v2);
        var dis = Laya.Vector3.scalarLength(vT);
        return dis
    }
}