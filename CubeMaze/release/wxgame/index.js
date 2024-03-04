window.screenOrientation="sensor_landscape",loadLib("libs/min/laya.core.min.js"),loadLib("libs/min/laya.ui.min.js"),loadLib("libs/min/laya.d3.min.js"),null!=window.wx&&(loadLib("WXSDK/sg_conf.js"),loadLib("WXSDK/sg_pull.js"));
var GetSGConfig = require('GetSGConfig.js');
GetSGConfig(()=>{
  loadLib("js/bundle.js");
});