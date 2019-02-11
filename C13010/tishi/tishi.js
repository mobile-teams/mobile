
const app = getApp();
Page({
  data: {
    tabbar:{},     //放在data中
  },
  onLoad() {
    app.editTabBar(); //放在onLoad中
  },
  onShow() {
    // console.log("dakai");    
    // my.alert({
    // title: '服务暂未开通' ,
    // success:() =>{
    //     console.log("111");
    //     my.switchTab({
    //       url: '../../pages/index/index'
    //     });
    //   }
    // });
  },
});
