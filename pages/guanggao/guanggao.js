const app = getApp();
Page({
  data: {
    ggurl: ' '
  },
  onLoad() {
      this.setData({
        ggurl: app.globalData.gruangaourl
      });
      console.log('url', this.data.ggurl, app.globalData.gruangaourl);
      this.webViewContext = my.createWebViewContext('web-view-1');
    
    // 向H5发送消息
    //this.webViewContext.postMessage({'sendToWebView0': '0'});
    //this.webViewContext.postMessage({'zhanghao': '1066','mima':'1234'});
  },

  onMessage(e) {
    console.log(e); //{'sendToMiniProgram': '0'}
    this.webViewContext.postMessage({ 'zhanghao': '1066', 'mima': '1234' });
  },
});
