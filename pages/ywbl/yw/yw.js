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
    console.log("onShow zjbzxbm<<<<<<<<<", app.globalData.zjbzxbm);
  },

  onLoad() {
    console.log("onLoad app.globalData.pdsfdl<<<<<<<<<", app.globalData.pdsfdl);
    console.log("onLoad app.globalData.zjbzxbm<<<<<<<<<", app.globalData.zjbzxbm);
    this.ywpage();
  },
  ywpage: function () {
    console.log("进入ywpage方法：");

    if (app.globalData.pdsfdl) {
      this.setData({
        //跳转ywbl下对应城市yw页面（已登录）
        ywurl: app.globalData.url + '/alipay/ywbl/yw/' + app.globalData.zjbzxbm + '/yw_cx.html?date=' + new Date().getTime()
      });
      console.log("（已登录）app.url>>>>>>--", app.globalData.url)
      console.log('（已登录）url>>>>>>>>-', this.data.ywurl);
      // this.webViewContext = my.createWebViewContext('web-view_yw');
    }
    else {
      if (app.globalData.zjbzxbm == '') {
        var that = this
        my.getStorage({
          key: 'city',
          success(res) {
            if (res.data != null) {
              app.globalData.zjbzxbm = res.data.citybm;
              that.setData({
                citybm: res.data.citybm,
              });
              console.log("缓存zjbzxbm<<<<<<<<<", app.globalData.zjbzxbm);
            }
          },
        });
      }
      this.setData({
        ywurl: app.globalData.url + '/alipay/ywbl/yw_simple.html?date=' + new Date().getTime()
      });
      console.log("《《未登录》》app.url>>>>>>--", app.globalData.url)
      console.log('《《未登录》》url>>>>>>>>-', this.data.ywurl);
    }
    // this.setData({
    //   yw_zjbzxbm: app.globalData.zjbzxbm
    // });
    this.webViewContext = my.createWebViewContext('web-view_yw');
  },

  yw_onMessage(e) {
    console.log("接收业务选择页面H5参数！！！", e.detail);
    this.webViewContext.postMessage({ 'xingming': app.globalData.xingming, 'zjhm': app.globalData.zjhm, 'citycode': app.globalData.zjbzxbm, 'token': app.globalData.token, 'grkey': app.globalData.grkey, 'pkey': app.globalData.pkey });
  },
});