const app = getApp();
Page({
  data: {
    ywurl: ' '
  },

  onShow() {
    my.setNavigationBar({
      title: '业务办理',
    });
  },

  onLoad() {
    console.log("app.data.pdsfdl<<<<<<<<<", app.data.pdsfdl);
    console.log("app.data.zjbzxbm<<<<<<<<<", app.data.zjbzxbm);
    if (app.data.pdsfdl) {
      this.setData({
        // ywurl: app.data.url + '/alipay/ywbl/yw.html?citycode=' + app.data.zjbzxbm + '&date=' + new Date().getTime()
        //先修改为统一登录样式，修改完所有页面后在修改地址
        ywurl: app.data.url + '/alipay/yw_login.html?date=' + new Date().getTime()
      });
      console.log("app.url>>>>>>--", app.data.url)
      console.log('url>>>>>>>>-', this.data.ywurl);
      this.webViewContext = my.createWebViewContext('web-view_yw');
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
          }
        },
      });
      this.setData({
        ywurl: app.data.url + '/alipay/yw.html?data=' + new Date().getTime()
      });
      console.log("app.url>>>>>>--", app.data.url)
      console.log('url>>>>>>>>-', this.data.ywurl);
      this.webViewContext = my.createWebViewContext('web-view_yw');
    }
  },

  yw_onMessage(e) {
    console.log("接收业务选择页面H5参数！！！", e);
    this.webViewContext.postMessage({ 'xingming': app.data.xingming, 'zjhm': app.data.zjhm, 'citycode': app.data.zjbzxbm, 'token': app.data.token, 'grkey': app.data.grkey, 'pkey': app.data.pkey });
  },
});
