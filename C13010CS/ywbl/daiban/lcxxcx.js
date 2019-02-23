const app = getApp();
const exceptions = () => {
  my.showToast({ type: 'exception', content: '网络异常',duration: 3000});
}
Page({
  data: {
  items:[],
  },
  onLoad(options) {
    var map = options.map.split(",");
    console.log("map",map);
    this.setData({
       processInstanceId:map[0],
    });
    console.log("processInstanceId>>>",this.data.processInstanceId);
    
    my.httpRequest({
      url: app.data.url+'/app-web/public/task/lcspxxcx.service',
      method: 'POST',
      headers: {
            "Content-Type": "application/json",
            "citycode":app.data.zjbzxbm.substr(0,6)
      },
      data: {
        appid: "20170517000101",
        //citybm:"C13010KF",
        citybm: app.data.zjbzxbm,
        sign:"SYWDJSKI8UYH7D7FKIUJNE45IJHYRKJ0",
        processInstanceId:this.data.processInstanceId
      },
      dataType: 'json',
      contentType : 'application/json;charset=UTF-8', //contentType很重要    
      success: (res) => {
         console.log("我发起流程信息查看>>>>>>>>>",res);
         let lcmx = [];
         let lcmx1 = [];
         if(res.data.ret == "0"){
          lcmx1 = res.data.data;
          console.log("lcmx1流程待办查询返回mc",lcmx1);
          for(var i=0; i<lcmx1.length; i++){
              lcmx1[i].assignee = lcmx1[i].assignee;
              lcmx1[i].comment =lcmx1[i].comment==" "? "无":lcmx1[i].comment;
              lcmx1[i].taskName=lcmx1[i].taskName==" "? "未知":lcmx1[i].taskName ;
              lcmx1[i].time=lcmx1[i].time==" " ?  "无":lcmx1[i].time ;
              lcmx.push(lcmx1[i]);
          }
          this.setData({
            items:lcmx
          });
         }else{
          this.setData({
            items:lcmx
           });
          my.showToast({type: 'none',content: '查无数据',duration: 3000});
        }
        console.log("items>>>>>>>>",this.data.items);
      },
      fail:(res) => {
        my.alert({content:"网络错误"});
      }
    });
  }

});


