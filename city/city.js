const app = getApp();
Page({
  data: {
    ggurl:' ',
  },
  onLoad() {
    this.setData({
     ggurl:app.data.url+"/alipay/cityList/index.html?date="+new Date().getTime()
    });
    console.log('url',this.data.ggurl);
    this.webViewContext = my.createWebViewContext('web-view-1');
     // 向H5发送消息
  },
  onMessage(e) {
  	console.log(e); 
    if(e.detail.citybm != null){
    app.data.zjbzxbm = e.detail.citybm;
    my.navigateBack({ });
    // my.reLaunch({
    //   url: '/citychose/citychose', // 需要跳转的应用内非 tabBar 的目标页面路径 ,路径后可以带参数。参数规则如下：路径与参数之间使用
    //   success: (res) => {
        
    //   },
    // });
    
    }
  //  
  },
});