const app = getApp();
Page({
  data: {
    dkxxurl: ' '
  },
  onLoad(e) {
    var dkxxurl = '';
    console.log("eee", e);
    this.setData({
      dkxxurl: app.data.url+'/alipay/zhcx/dkzhxxcx.html?citycode='+app.data.zjbzxbm+'&date='+new Date().getTime(),

    });
    console.log('url>>>>>>-', this.data.dkxxurl);
    this.webViewContext = my.createWebViewContext('web-view_dkxx');
  },

  dkxx_onMessage(e) {
    console.log("贷款信息页面H5参数！！！",e); 
    this.webViewContext.postMessage({'xingming': app.data.xingming,'zjhm':app.data.zjhm,'citycode':app.data.zjbzxbm,'jkhtbh':app.data.jkhtbh});
  },
});
