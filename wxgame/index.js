window.screenOrientation="portrait",loadLib("libs/min/laya.core.min.js"),loadLib("libs/min/laya.ui.min.js"),loadLib("libs/min/laya.d3.min.js"),loadLib("libs/min/laya.physics3D.min.js"),loadLib("WXSDK/sg_conf.js"),wx.loadSubpackage({
  name: 'js',
  success: ()=>{
    // var GetSGConfig = require('GetSGConfig.js');
    // GetSGConfig(()=>{
      loadLib("js/bundle.js");
    // });
  },
})