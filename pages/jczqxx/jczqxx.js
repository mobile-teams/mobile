const app = getApp();
Page({
  data: {
    jczqxxurl: ' '
  },
  onLoad(e) {
    var jczqxxurl = '';
    console.log("eee", e);
    this.setData({
      // jczqxxurl: app.globalData.url + '/alipay/zhcx/gjjywmxcx.html?citycode=' + app.globalData.zjbzxbm+'&date='+new Date().getTime()
      jczqxxurl: app.globalData.url + '/alipay/zhcx/gjjywmxcx.html?date=' + new Date().getTime()
    });
    console.log('url>>>>>>-', this.data.jczqxxurl);
    this.webViewContext = my.createWebViewContext('web-view_jczqxx');
  },

  jczqxx_onMessage(e) {
    console.log("缴存提取页面页面H5参数！！！", e);
    my.getStorage({
      key: "djxx",
      success: (res) => {
        console.log("djxx ", res);
        this.webViewContext.postMessage({
          'xingming': app.globalData.xingming,
          'zjhm': app.globalData.zjhm,
          'citycode': app.globalData.zjbzxbm,
          'djxx': res.data.type,
          'grzh': res.data.grzh,
          'grkey': app.globalData.grkey,
          'token': app.globalData.token
        });

      },
    });

  },
});
