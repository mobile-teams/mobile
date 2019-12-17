const app = getApp();
Page({
  data: {
    dkxxurl: ' '
  },
  onLoad(e) {
    var dkxxurl = '';
    console.log("eee", e);
    this.setData({
      // dkxxurl: app.globalData.url+'/alipay/zhcx/dkzhxxcx.html?citycode='+app.globalData.zjbzxbm+'&date='+new Date().getTime(),
      dkxxurl: app.globalData.url + '/alipay/zhcx/dkzhxxcx.html?ate=' + new Date().getTime(),
    });
    console.log('url>>>>>>-', this.data.dkxxurl);
    this.webViewContext = my.createWebViewContext('web-view_dkxx');
  },

  dkxx_onMessage(e) {
    console.log("贷款信息页面H5参数！！！", e);
    this.webViewContext.postMessage({
      'xingming': app.globalData.xingming,
      'zjhm': app.globalData.zjhm,
      'citycode': app.globalData.zjbzxbm,
      'jkhtbh': app.globalData.jkhtbh,
      'grkey': app.globalData.grkey,
      'token': app.globalData.token
    });
  },
});
