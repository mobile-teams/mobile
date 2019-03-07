const app = getApp();
Page({
  data: {
    ggurl:'',
  },
  onLoad() {
    this.setData({
      ggurl:'http://192.168.54.100:8088/app_12329/about.html'
    });
    console.log('url',this.data.ggurl,app.data.gruangaourl);
    //this.webViewContext = my.createWebViewConext('web-view-1');
  },
  onMessage(e) {
  	console.log(e); 
  },
});