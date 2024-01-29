!(function () {
    (function () {
        if(void 0 === window.SGSdkConf) {
            console.error('jm_conf.js必须放置在jm_pull.js之前');
        }
    })();

    function getParam(param) {
        var paramStr = "?"
        for (let key in param) {
            paramStr += key + "=" + param[key] + "&";
        }
        return paramStr;
    }

    function JJPullRequest(method, url, data) {
        return new Promise((resolve, reject) => {
            var xhr = new XMLHttpRequest();
            xhr.withCredentials = true;
            // 请求成功回调函数
            xhr.onreadystatechange = function(){
                if(xhr.readyState === 4){
                    if(xhr.status == 200){
                        resolve(JSON.parse(xhr.responseText));
                    }
                }
            }

            // 请求出错
            xhr.onerror = e => {
                reject("");
            };
            // 请求超时
            xhr.ontimeout = e => {
                reject("");
            };

            xhr.open(method, url + getParam(data), false);

            xhr.send();
        });
    }

    var JJMountFun = {
        /**
         * 获取游戏所有配置项
         */
        SGGameConfigs: function () {
            return JJPullRequest('GET', window.SGSdkConf.req_domain + '/configs', {
                version: window.SGSdkConf.version,
                app_key: window.SGSdkConf.app_key
            });
        }
    };

    var jiu_mount_fun = ['SGGameConfigs'];
    for (var i = jiu_mount_fun.length - 1; i >= 0; i--) ! function (fun_name, fun_body) {
        Object.defineProperty(window, fun_name, {
            value: fun_body,
            writable: false,
            enumerable: true,
            configurable: true
        });
    }(jiu_mount_fun[i], JJMountFun[jiu_mount_fun[i]]);
})();
