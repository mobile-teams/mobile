const app = getApp();
Page({
  data: {
    grzh: '',
    grzhzt: '',
    grzhye: '',
    grjcjs: '',
    gryjce: '',
    grjcjs: '',
    dwzh: '',
    dwmc: '',
    dwyjce: '',
    dwjcbl: '',
    khrq: '',
    qjny: '',
    jzny: ''
  },

  onLoad() {
    my.showLoading({
      content: '加载中...',
      delay: '1000',
    });
    var obj = new Object();
    obj.appid = app.data.appid;
    obj.zjbzxbm = app.data.zjbzxbm;
    obj.grzh = app.data.grzh;
    obj.sign = app.getSign(obj, app.data.pkey);
    console.log("gjjzhxxcx--getSign::", app.getSign(obj, app.data.pkey));
    console.log("gjjzhxxcx--JSON.stringify(obj):::", JSON.stringify(obj))
    my.httpRequest({
      url: app.data.url + '/app-web/personal/public/gjjzhxxcx.service',
      method: 'POST',
      headers: {
        "Content-Type": "application/json",
        "citycode": app.data.zjbzxbm
      },
      data: JSON.stringify(obj),
      dataType: 'json',
      contentType: 'application/json;charset=UTF-8', //contentType很重要    
      success: (res) => {
        let zhxx = res.data.data[0];
        my.hideLoading();
        if (res.data.ret == 0) {
          console.log(Number(zhxx.grjcbl) * 100);
          let grjcbl2 = app.fmoney((Number(zhxx.grjcbl) * 100)) + '%';
          let dwjcbl2 = app.fmoney((Number(zhxx.dwjcbl) * 100)) + '%';
          this.setData({
            grzh: zhxx.grzh,
            grzhzt: zhxx.grzhzt,
            grzhye: app.fmoney(zhxx.grzhye) + '元',
            grjcjs: app.fmoney(zhxx.grjcjs) + '元',
            gryjce: app.fmoney(zhxx.gryjce) + '元',
            grjcbl: grjcbl2,
            dwzh: zhxx.dwzh,
            dwmc: zhxx.dwmc,
            dwyjce: app.fmoney(zhxx.dwyjce) + '元',
            dwjcbl: dwjcbl2,
            khrq: zhxx.khrq,
            qjny: zhxx.qjny,
            jzny: zhxx.jzny
          });
        } else {
          my.alert({
            title: '提示',
            content: grxx.msg
          });
        }
      },
      fail: (res) => {
        my.alert({ content: "网络错误" });
      },
      complete: (res) => {
        // my.alert({title: 'complete'});
      }
    });
  },

});
