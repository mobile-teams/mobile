const app = getApp();
Page({
  data: {
    sjhm: '',
  },

  onLoad() {
    var obj = new Object();
    obj.appid = app.data.appid;
    obj.citybm = app.data.zjbzxbm;
    obj.id = "zjhm";
    obj.msg = app.data.zjhm;
    obj.sign = app.getSign(obj, app.data.pkey);

    var obj1 = new Object();
    obj1.data = app.EncryptBASE64(JSON.stringify(obj), app.data.grkey);
    obj1.appid = app.data.appid;
    obj1.citybm = app.data.zjbzxbm;
    obj1.sign = app.getSign(obj1, app.data.pkey);

    my.request({
      url: app.data.url + '/app-web/public/auth/userinfo.service?token=' + app.data.token,
      method: 'POST',
      headers: {
        "Content-Type": "application/json",
        // "citycode": app.data.zjbzxbm,
        "appid": app.data.appid
      },
      data: JSON.stringify(obj1),

      dataType: 'json',
      contentType: 'application/json;charset=UTF-8', //contentType很重要    
      success: (result) => {
        console.log("info接口返回结果res ：", result);
        var res = app.Decrypt(result.data.data, app.data.grkey);
        console.log("返回结果解密：：", res);
    //    console.log("返回结果解密：", res.data);
        if (res.ret == 0) {
          console.log("12312312", res);

          // app.data.sjhm = res.data.khbh;
          //app.setSjhm(res.data.khbh);
          this.setData({
            sjhm: this.plusXing(res.sjhm, 3, 4),
            zjhm: this.plusXing(res.zjhm, 10, 4),
            xingming: res.xingming
          })
          console.log('个人中心userinfo查询成功', this.data.sjhm);
        }

      },
    });
  },
  //脱敏
  plusXing: (str, frontLen, endLen) => {
    var len = str.length - frontLen - endLen;
    var xing = '';
    for (var i = 0; i < len; i++) {
      xing += '*';
    }
    return str.substring(0, frontLen) + xing + str.substring(str.length - endLen);
  },
});
