const app = getApp();
Page({
  data: {
    ywurl:' '
  },
  onLoad() {
    this.setData({
       ywurl:app.data.url+'/alipay/ywbl/yw.html?citycode='+app.data.zjbzxbm+'&date='+new Date().getTime()
     // ywurl:'http://192.168.5.164:6008/html/ywbl/gjjtq/SmallApp/yw.html?citycode='+app.data.zjbzxbm//app.data.gruangaourl
    });
    console.log("app.url>>>>>>--",app.data.url)
    console.log('url>>>>>>>>-',this.data.ywurl);
    this.webViewContext = my.createWebViewContext('web-view_yw');
  
  },
  // onReady(){
  //   //this.webViewContext.postMessage({'xingming': '昝与行','zjhm':'132336196603253017','citycode':'C13010'});
  //   this.webViewContext.postMessage({'xingming': app.data.xingming,'zjhm':app.data.zjhm,'citycode':app.data.zjbzxbm});
  // },

  yw_onMessage(e) {
  	console.log("接收业务选择页面H5参数！！！",e); 
    this.webViewContext.postMessage({'xingming': app.data.xingming,'zjhm':app.data.zjhm,'citycode':app.data.zjbzxbm});
  },
});
