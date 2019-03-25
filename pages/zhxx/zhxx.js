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
      zhcxurl: app.data.url + '/alipay/zhcx/gjjzhxxcx.html?citycode=' + app.data.zjbzxbm
    });
    console.log('url>>>>>>-', this.data.zhcxurl);
    this.webViewContext = my.createWebViewContext('web-view_zhcx');
  },

  zhcx_onMessage(e) {
    console.log("账户查询页面H5参数！！！", e);
    this.webViewContext.postMessage({ 'xingming': app.data.xingming, 'zjhm': app.data.zjhm, 'citycode': app.data.zjbzxbm, 'grzh': this.data.grzh });
  },
});
