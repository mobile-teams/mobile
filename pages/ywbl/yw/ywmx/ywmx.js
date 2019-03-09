const app = getApp();
Page({
  data: {
    ywmxurl:' '
  },
  onLoad(e) {
    var ywmxurl='';
    console.log("eee",e);
    if(e.style!='' && e.style!=null && e.style=='public'){
      ywmxurl=app.data.url+'alipay/'+e.ywbm;
    }else{
      ywmxurl=app.data.url+'alipay/'+e.ywbm+'?citycode='+app.data.zjbzxbm;
    }
    this.setData({
     // ywmxurl:'http://192.168.5.164:6008/'+e.ywbm
     ywmxurl: ywmxurl
    });
    console.log('url>>>>>>-',this.data.ywmxurl);
    this.webViewContext = my.createWebViewContext('web-view_ywmx');
  },

  ywmx_onMessage(e) { 
  	console.log("接收服务网点打电话！！！",e); 
    my.makePhoneCall({ number: e.detail.call });
  },
});
