const app = getApp();
Page({
  data: {
    ggurl:'',
  },
  onLoad() {
    this.setData({
      ggurl:app.data.url+'/alipay/gywm/about.html'
    });
    console.log('url',this.data.ggurl,app.data.gruangaourl);
    this.webViewContext = my.createWebViewContext('web-view-gywm');
  },
  gywm_onMessage(e) {
    this.webViewContext.postMessage({'citycode': app.data.zjbzxbm});
    console.log("接收关于我们打电话！！！", e);
    if (e.detail.fsbz == '1') {
      my.makePhoneCall({ number: e.detail.call });
    }
  },
});