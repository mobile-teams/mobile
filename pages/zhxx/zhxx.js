const app = getApp();
Page({
  data: {
    zhcxurl: ' ',
    grzh: ''
  },
  onLoad(e) {
    var zhcxurl = '';
    console.log("eee", e);
    this.setData({
      grzh: e.grzh,
      // zhcxurl: app.globalData.url + '/alipay/zhcx/gjjzhxxcx.html?citycode=' + app.globalData.zjbzxbm + '&date=' + new Date().getTime()
      zhcxurl: app.globalData.url + '/alipay/zhcx/gjjzhxxcx.html?date=' + new Date().getTime()
    });
    console.log('url>>>>>>-', this.data.zhcxurl);
    this.webViewContext = my.createWebViewContext('web-view_zhcx');
  },

  zhcx_onMessage(e) {
    console.log("账户查询页面H5参数！！！", e);
    this.webViewContext.postMessage({
      'xingming': app.globalData.xingming,
      'zjhm': app.globalData.zjhm,
      'citycode': app.globalData.zjbzxbm,
      'grzh': this.data.grzh,
      'token': app.globalData.token,
      'grkey': app.globalData.grkey,
    });
  },
});
