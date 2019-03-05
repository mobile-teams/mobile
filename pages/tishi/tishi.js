
const app = getApp();
Page({
  data: {
    tabbar:{},     //放在data中
  },
  onLoad() {
   // app.editTabBar(); //放在onLoad中
  },
  onShow() {
    console.log("dakai");    
    my.alert({
    title:"提示",
    content: '办理该业务请使用手机App!',
    success:() =>{
        console.log("111");
        // my.switchTab({
        //   url: '/pages/index/index'
        // });
        my.navigateBack();
      }
    });
  },
});
