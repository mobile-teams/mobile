const app = getApp();
Page({
  data: {
    ggurl:' ',
    citymc:' '
  },
  onLoad() {
     let that = this;
    my.getLocation({
      type:1,
      success(res) {
        my.hideLoading();
        console.log(res)
        // that对象为Page可以设置数据刷新界面
        that.setData({
         citymc:res.city
        })
        
      },
      fail() {
        my.hideLoading();
        my.alert({ title: '定位失败' });
      },
    })
    this.setData({
      ggurl:"http://192.168.54.101:8088/app_12329/cityList/index.html"
    });
    console.log('url',this.data.ggurl);
    this.webViewContext = my.createWebViewContext('web-view-1');
     // 向H5发送消息
   //this.webViewContext.postMessage({'sendToWebView0': '0'});
   //this.webViewContext.postMessage({'zhanghao': '1066','mima':'1234'});
  },

  onMessage(e) {
  	console.log(e); //{'sendToMiniProgram': '0'}
    if(e.detail.getCurrentcity != null){
      if (this.data.citymc !=null && this.data.citymc !=  ' '){
      console.log("定位城市名称",this.data.citymc);
      this.webViewContext.postMessage({'citymc': this.data.citymc});
      }
    }

    if(e.detail.citybm != null){
    app.data.zjbzxbm = e.detail.citybm;
    my.reLaunch({
      url: '/citychose/citychose', // 需要跳转的应用内非 tabBar 的目标页面路径 ,路径后可以带参数。参数规则如下：路径与参数之间使用
      success: (res) => {
        
      },
    });
    
    }
  //  
  },
});