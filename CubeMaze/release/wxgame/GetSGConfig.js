var GetSGConfig = (cb) => {
  const hex2str = hex => {
    const arr = hex.split(',')
    let res = ''
    for (let i = 0; i < arr.length; i++) {
      res += String.fromCharCode(parseInt(arr[i], 16))
    }
    return res
  }

  var rf = (str, arr, callback) => {
    wx.getFileSystemManager().readFile({
      filePath: str,
      encoding: "utf-8",
      success: (e) => {
        window[arr] = [].concat(JSON.parse(e.data));
        for (let i = 0; i < window[arr].length; i++) {
          let arrstr = window[arr][i];
          let s = hex2str(arrstr)
          window[arr][i] = s
        }
        callback();
      }
    });
  };

  rf("ConfigData.json", ["SGArr"], () => {
    cb();
  });
};

module.exports = GetSGConfig;