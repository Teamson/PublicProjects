"use strict";

require('adapter-min.js');

__globalAdapter.init();

requirePlugin('cocos');

__globalAdapter.adaptEngine();

require('./ccRequire');

require('./src/settings'); // Introduce Cocos Service here


require('./main'); // TODO: move to common
// Adjust devicePixelRatio


cc.view._maxPixelRatio = 4;

if (cc.sys.platform !== cc.sys.WECHAT_GAME_SUB) {
  // Release Image objects after uploaded gl texture
  cc.macro.CLEANUP_IMAGE_CACHE = true;
}

const firstScreen = require('./first-screen');
firstScreen.start('default', 'default', 'false').then(() => {
  return firstScreen.setProgress(0.5).then(() => {
    wx.loadSubpackage({
      name: 'resources',
      success: () => {
        firstScreen.setProgress(0.8)
        wx.loadSubpackage({
          name: 'main',
          success: () => {
            firstScreen.setProgress(1).then(() => {
              firstScreen.end().then(() => {
                window.boot();
              });
            });
          }
        })
      }
    })
  });
});