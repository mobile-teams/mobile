const app = getApp();
Page({
  data: {
    ggurl:' ',
    citymc:' '
  },
  onLoad() {
    this.setData({
     // ggurl:"http://192.168.54.101:8088/app_12329/cityList/index.html?a=1"
     ggurl:"https://www.gjj12329.cn/alipay/cityList/index.html?a=1"
    });
    console.log('url',this.data.ggurl);
    this.webViewContext = my.createWebViewContext('web-view-1');
     // 向H5发送消息
  },
  onReady(){
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
          console.log("this.data:",that.data);
          that.webViewContext.postMessage({'citymc': that.data.citymc});
        },
        fail() {
          my.hideLoading();
          my.alert({ title: '定位失败' });
        },
      })
  },
  onMessage(e) {
  	console.log(e); 
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