const app = getApp();
Page({
  data: {
    ywurl: ' ',
   // yw_zjbzxbm: ''
  },

  onShow() {
    my.setNavigationBar({
      title: '业务办理',
    });
      console.log("onShow zjbzxbm<<<<<<<<<", app.data.zjbzxbm);
  },

  onLoad() {
    console.log("onLoad app.data.pdsfdl<<<<<<<<<", app.data.pdsfdl);
    console.log("onLoad app.data.zjbzxbm<<<<<<<<<", app.data.zjbzxbm);
    this.ywpage();
  },
  ywpage: function() {
    console.log("进入ywpage方法：");
    
    if (app.data.pdsfdl) {
      this.setData({
        //跳转common下对应城市yw页面（已登录）
        //  ywurl: app.data.url + '/alipay/common/ywbl/'+app.data.zjbzxbm+'/yw.html?date=' + new Date().getTime()
        ywurl: app.data.url + '/alipay/ywbl/yw_cx.html?date=' + new Date().getTime()
      });
      console.log("（已登录）app.url>>>>>>--", app.data.url)
      console.log('（已登录）url>>>>>>>>-', this.data.ywurl);
      // this.webViewContext = my.createWebViewContext('web-view_yw');
    } 
    else {
      var that = this
      my.getStorage({
        key: 'city',
        success(res) {
          if (res.data != null) {
            app.data.zjbzxbm = res.data.citybm;
            that.setData({
              citybm: res.data.citybm,
            });
            console.log("缓存zjbzxbm<<<<<<<<<", app.data.zjbzxbm);
          }
        },
      });
      this.setData({
        ywurl: app.data.url + '/alipay/ywbl/yw_simple.html?date=' + new Date().getTime()
      });
      console.log("《《未登录》》app.url>>>>>>--", app.data.url)
      console.log('《《未登录》》url>>>>>>>>-', this.data.ywurl);
    }
    // this.setData({
    //   yw_zjbzxbm: app.data.zjbzxbm
    // });
    this.webViewContext = my.createWebViewContext('web-view_yw');
  },

  yw_onMessage(e) {
    console.log("接收业务选择页面H5参数！！！", e.detail);
    this.webViewContext.postMessage({ 'xingming': app.data.xingming, 'zjhm': app.data.zjhm, 'citycode': app.data.zjbzxbm, 'token': app.data.token, 'grkey': app.data.grkey, 'pkey': app.data.pkey });
  },
});