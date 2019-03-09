const app = getApp();
Page({
  data: {
    ggurl:'',
  },
  onLoad() {
    this.setData({
      ggurl:app.data.url+'alipay/gywm/about.html'
    });
    console.log('url',this.data.ggurl,app.data.gruangaourl);
    //this.webViewContext = my.createWebViewConext('web-view-1');
  },
  onMessage(e) {
  	console.log(e); 
  },
});