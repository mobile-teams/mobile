const app = getApp();
Page({
  data: {
    ywmxurl:' '
  },
  onLoad(e) {
    this.setData({
     // ywmxurl:'http://192.168.5.164:6008/html/ywbl/gjjtq/tq_index.html?citycode=C13010'
     // ywmxurl:'http://192.168.5.164:6008/'+e.ywbm
     ywmxurl: e.ywbm
    });
    console.log('url>>>>>>-',this.data.ywmxurl);
    this.webViewContext = my.createWebViewContext('web-view_ywmx');
  },

  ywmx_onMessage(e) { 
  	console.log("接收业务明细H25！！！",e); //{'sendToMiniProgram': '0'}

  },
});
