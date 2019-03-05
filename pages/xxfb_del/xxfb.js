const app = getApp();
const exceptions = () => {
  my.showToast({ type: 'exception', content: '网络异常',duration: 3000});
}
Page({
  data: {
    tabbar:{},     //放在data中
    tabs: [],
    activeTab: 0,

    fqitems: [],
    dbitems: [],
    tzggitems: [],//通知公告
    zwgkitems: [],//政务公开
    grbh:"",
    // num:"",//待办中确定对应流程
    // num01:"",
    flagdb:0,
    flagfq:0,
  
  },

  handleTabClick({ index }) {
     console.log(">>>>",this.data.tabs.length);
     //调用相应新闻目录下的方法
      this.xxfbSerch(this.data.tabs[index].title,this);
      this.setData({
      activeTab: index,
      });
  },
  onLoad() {
    app.editTabBar(); //放在onLoad中
    my.httpRequest({
      url: app.data.url+'/app-web/personal/public/gjjzhxxcx.service',
      method: 'POST',
      headers: {
            "Content-Type": "application/json",
            "citycode":app.data.zjbzxbm.substr(0,6)
      },
      data: {
        appid: "20170517000101",
        zjbzxbm:"C13010KF",
        //zjbzxbm: app.data.zjbzxbm,
        sign:"SYWDJSKI8UYH7D7FKIUJNE45IJHYRKJ0",
        grzh:app.data.grzh
      },
      dataType: 'json',
      contentType : 'application/json;charset=UTF-8', //contentType很重要    
      success: (res) => {
        console.log("res>>>>>>",res);
        let arry=[];    
        arry = [{title: "政务公开"},{title: "中心动态"},{title: "政策法规"},{title: "信息公开"}];  //res.data.data
        this.setData({
          grbh: res.data.data[0].grbh,
          tabs:arry
        });
        console.log("tabs>>>>>>>>>>>",this.data.tabs);
        this.xxfbSerch(arry[0].title,this);
      },
      fail:(res) => {
        my.alert({content:"网络错误"});
      }, complete:(res) => {
        // my.alert({title: 'complete'});
      }
    });
  },

  //新闻动态查询
  xxfbSerch:(title,that)=>{
    console.log("title:>>>>>>>>",title);
    let channel_id="72";
    if(title=="政务公开"){
      channel_id="72";
    }
    my.httpRequest({
    //url: app.data.url+'/app-web/personal/public/gjjzhxxcx.service',
    url:'http://192.168.0.164:7072/app-web/public/news/list.service',
    method: 'POST',
    headers: {
          "Content-Type": "application/json",
          "citycode":app.data.zjbzxbm.substr(0,6)
    },
    data: {
      size:"10",
      page:"1",
      channel_id:channel_id,
      citybm:"C13010",
      appid:"20170614102901",
      sign:"a05b628142dee6650fc3ad8b1ce777620fc90c69"
    },
    dataType: 'json',
    contentType : 'application/json;charset=UTF-8', //contentType很重要    
    success: (res) => {
      console.log("res>>>>>>",res);
      let arry=[];    
      arry =res.data.data;
      that.setData({
        zwgkitems:arry
      });
      console.log("tabs>>>>>>>>>>>",that.data.zwgkitems);
    },
    fail:(res) => {
      my.alert({content:"网络错误"});
    }, complete:(res) => {
      // my.alert({title: 'complete'});
    }
  });
},


  xxcxClick(e){
    console.log("e:>>>>>>>>",e.currentTarget.dataset.value);
    // let channel_id=" ";
    // if(e.currentTarget.dataset.value=="政务公开"){
    //   channel_id="72";
    // }
    //  my.httpRequest({
    //   url: app.data.url+'/app-web/personal/public/gjjzhxxcx.service',
    //   method: 'POST',
    //   headers: {
    //         "Content-Type": "application/json",
    //         "citycode":app.data.zjbzxbm.substr(0,6)
    //   },
    //   data: {
    //     appid: "20170517000101",
    //     zjbzxbm:"C13010KF",
    //     //zjbzxbm: app.data.zjbzxbm,
    //     sign:"SYWDJSKI8UYH7D7FKIUJNE45IJHYRKJ0",
    //     grzh:app.data.grzh
    //   },
    //   dataType: 'json',
    //   contentType : 'application/json;charset=UTF-8', //contentType很重要    
    //   success: (res) => {
    //     console.log("res>>>>>>",res);
    //     let arry=[];    
    //     arry = [{title: "通知公告"},{title: "中心动态"},{title: "政策法规"},{title: "信息公开"}];  //res.data.data
    //     this.setData({
    //       grbh: res.data.data[0].grbh,
    //       tabs:arry
    //     });
    //     console.log("tabs>>>>>>>>>>>",this.data.tabs);
    //     this.xxfbSerch(arry[0].title,this);
    //   },
    //   fail:(res) => {
    //     my.alert({content:"网络错误"});
    //   }, complete:(res) => {
    //     // my.alert({title: 'complete'});
    //   }
    // });
  }
});


