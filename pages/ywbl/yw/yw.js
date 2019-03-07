const app = getApp();
Page({
  data: {
    ywurl:' '
  },
  onLoad() {
    this.setData({
      ywurl:'http://192.168.5.164:6008/html/ywbl/gjjtq/SmallApp/yw.html?citycode='+app.data.zjbzxbm//app.data.gruangaourl
     // ywurl:'http://192.168.54.102:8088/app_12329/SmallApp/yw.html?citycode='+app.data.zjbzxbm
    });
    console.log("app.url>>>>>>--",app.data.url)
    console.log('url>>>>>>>>-',this.data.ywurl);
    this.webViewContext = my.createWebViewContext('web-view_yw');
  
  },

  yw_onMessage(e) {
  	console.log("接收业务选择页面H5参数！！！",e); 
    this.webViewContext.postMessage({'xingming': app.data.xingming,'zjhm':app.data.zjhm,'citycode':app.data.zjbzxbm});
  },
});
