import Context from "../Context";

export default class NetManager {
    host = "https://api.jiujiuhuyu.com/";
    appKey = "1a398b4ddd333191da6d1d20794d2fde";

    //method请求api
    //parm  请求参数
    //cb    完成回调
    /**
     * 发送 HTTP 请求。
     * @param	url				请求的地址。大多数浏览器实施了一个同源安全策略，并且要求这个 URL 与包含脚本的文本具有相同的主机名和端口。
     * @param	data			(default = null)发送的数据。
     * @param	method			(default = "get")用于请求的 HTTP 方法。值包括 "get"、"post"、"head"。
     * @param	responseType	(default = "text")Web 服务器的响应类型，可设置为 "text"、"json"、"xml"、"arraybuffer"。
     * @param	headers			(default = null) HTTP 请求的头部信息。参数形如key-value数组：key是头部的名称，不应该包括空白、
     * 冒号或换行；value是头部的值，不应该包括换行。比如["Content-Type", "application/json"]。
     */
    request(method, param, cb, type = "get") {
        let httpRequest = new Laya.HttpRequest();
        httpRequest.once(Laya.Event.COMPLETE, this, cb); //response
        httpRequest.once(Laya.Event.ERROR, this, this.errorHandler);
        httpRequest.on(Laya.Event.PROGRESS, this, this.progressHandler);

        let url = this.host + method;
        // let data = JSON.stringify(param);
        if (type == "get") {
            httpRequest.send(url + param, "", "get", "json");
        }
        else if (type == "post") {
            httpRequest.send(url, param, "post", "json", ["Content-Type", "application/json;charset=UTF-8"]);
        }
    }

    errorHandler(res) {
        console.error("HTTP 错误：", res);
    }

    progressHandler(res) {
        //console.log("HTTP 进度:", res);
    }

    // response(res) {
    //     let cb = this.callBackFunc[this.callBackFunc.length - 1];
    //     this.callBackFunc.splice(this.callBackFunc.length - 1, 1);
    //     if (cb) cb(res);
    // }

    getJJGameConfigs() {
        let param: any = {};
        param.version = Context.CommonData.gameVersion;
        param.app_key = this.appKey;
        param = this.getParam(param);
        this.request("game/configs", param, function (res) {
            console.log(res);
        });
    }

    getJJGameAds(position = '') {
        let param: any = {};
        param.app_key = this.appKey;
        param.position_id = position;
        param = this.getParam(param);
        this.request("ads", param, function (res) {
            console.log(res);
        });
    }

    getParam(param) {
        var paramStr = "?"
        for (let key in param) {
            paramStr += key + "=" + param[key] + "&";
        }
        return paramStr;
    }

    gameConfigs = {

    }
}