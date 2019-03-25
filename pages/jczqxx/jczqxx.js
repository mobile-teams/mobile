const app = getApp();
Page({
  data: {
    jczqxxurl: ' '
  },
  onLoad(e) {
    var jczqxxurl = '';
    console.log("eee", e);
    this.setData({
      jczqxxurl: app.data.url + '/alipay/zhcx/gjjywmxcx.html?citycode=' + app.data.zjbzxbm
    });
    console.log('url>>>>>>-', this.data.jczqxxurl);
    this.webViewContext = my.createWebViewContext('web-view_jczqxx');
  },

  jczqxx_onMessage(e) {
    console.log("缴存提取页面页面H5参数！！！", e);
    my.getStorage({
      key: "djxx",
      success: (res) => {
        console.log("djxx  ", res);
        this.webViewContext.postMessage({ 'xingming': app.data.xingming, 'zjhm': app.data.zjhm, 'citycode': app.data.zjbzxbm, 'djxx': res.data });

      },
    });

      },
});
