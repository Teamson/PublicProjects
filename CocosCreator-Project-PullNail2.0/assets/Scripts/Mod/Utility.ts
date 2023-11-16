
const { ccclass, property } = cc._decorator;

@ccclass
export default class Utility {
    //打乱数组
    public static shuffleArr(arr: any[]) {
        let i = arr.length;
        while (i) {
            let j = Math.floor(Math.random() * i--);
            [arr[j], arr[i]] = [arr[i], arr[j]];
        }
        return arr;
    }

    //数字前补0
    public static joinZero(length: number, num: number) {
        return (Array(length).join('0') + num).slice(-length);
    }

    public static delayActive(node: any, duration: number, target) {
        node.active = false
        target.scheduleOnce(() => { node.active = true }, duration)
    }

    public static getRandomByLength(length: number, count: number = 1) {
        let arr = []
        for (let i = 0; i < length; i++) {
            arr.push(i)
        }
        arr = this.shuffleArr(arr)
        arr = arr.splice(0, count)
        return arr
    }

    public static getRandomItemInArr(arr: any[]): any {
        return arr[Math.floor(Math.random() * arr.length)]
    }

    public static getRandomItemInArrWithoutSelf(self: any, arr: any[], count: number = 1) {
        let temp: any = [].concat(arr)
        if (temp.indexOf(self) != -1)
            temp.splice(temp.indexOf(self), 1)
        temp = this.shuffleArr(temp)
        return temp.slice(0, count)
    }

    public static GetRandom(mix, max, isInt = true) {
        let w = max - mix + 1
        let r1 = Math.random() * w
        r1 += mix
        return isInt ? Math.floor(r1) : r1
    }

    public static getIsNewDate() {
        if (localStorage.getItem('lastDate')) {
            if (new Date().getDate() == parseInt(localStorage.getItem('lastDate'))) {
                //同一天
                localStorage.setItem('lastDate', new Date().getDate().toString())
                return false
            } else {
                //新的一天
                localStorage.setItem('lastDate', new Date().getDate().toString())
                return true
            }
        } else {
            //新的一天
            localStorage.setItem('lastDate', new Date().getDate().toString())
            return true
        }
    }


    public static numberTransformString(num: number, isAtlas: boolean = true) {
        var str: string = '';
        if (num < 1000) {
            str = num.toFixed(0);
        } else if (num < 1000000) {
            str = (num / 1000).toFixed(2) + (isAtlas ? '@' : 'k');
        } else if (num < 1000000000) {
            str = (num / 1000000).toFixed(2) + (isAtlas ? 'A' : 'm');
        } else if (num < 1000000000000) {
            str = (num / 1000000000).toFixed(2) + (isAtlas ? 'B' : 'b');
        } else {
            str = (num / 1000000000000).toFixed(2) + (isAtlas ? 'C' : 't');
        }
        if (isAtlas)
            str = this.numberWithAtlas(str);
        return str;
    }

    public static numberWithAtlas(str: string): string {
        str = str.replace('+', ':');
        str = str.replace('-', ';');
        str = str.replace('*', '<');
        str = str.replace('%', '=');
        str = str.replace('.', '>');
        str = str.replace('/', '?');
        str = str.replace('k', '@');
        str = str.replace('m', 'A');
        str = str.replace('b', 'B');
        str = str.replace('t', 'C');
        return str;
    }

    public static isZooming: boolean = false;
    public static zoomUI(node: cc.Node, scale: number = 1, cb?: Function) {
        this.isZooming = true;
        if (scale == 1) node.setScale(0.01, 0.01, 1);
        cc.tween(node).to(0.2, { scale: scale }).call(() => { this.isZooming = false; cb && cb(); }).start();
    }

    public static AuthorizeSettingCB: Function = null
    public static openAppAuthorizeSetting(onShowCB: Function) {
        if (cc.sys.platform == cc.sys.WECHAT_GAME && window['wx'].openSetting) {
            this.AuthorizeSettingCB = onShowCB
            window['wx'].onShow(this.AuthorizeSettingCB)
            window['wx'].openSetting({
                success: (res) => {
                }
            })
        }
    }
}
