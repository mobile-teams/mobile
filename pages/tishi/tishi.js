Page({
  data: {},
  onShow() {
    console.log("dakai");    
    my.alert({
    title: '服务暂未开通' ,
    success:() =>{
        console.log("111");
        my.switchTab({
          url: '../../pages/index/index'
        });
      }
    });
  },
});
