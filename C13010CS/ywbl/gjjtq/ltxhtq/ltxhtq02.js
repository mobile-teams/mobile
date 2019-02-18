
const app = getApp();

Page({
  data: {
    tqrxm:"",
    tqrzjhm:"",
    grzhye:"",
    xhlx:"",
    tqjehj:"",
    grzhyemc:"",
    xhlxmc:"",
    tqjehjmc:"",
    skyhzh:"",
    skyh:"",
    ywlsh:"",
    tqfs:"",
    tqyybm:"",
    grbh:""
  },
  onLoad(options) {
     var that = this;
     var map = options.map.split(",");
     console.log("map",map);
     this.setData({
      tqrxm:map[1],
      tqrzjhm:map[2],
      grzhye:map[3],
      xhlx:map[4],
      tqjehj:map[5],
      grzhyemc:app.fmoney(map[3])+" 元",
      xhlxmc:app.fmoney(map[4])+" 元",
      tqjehjmc:app.fmoney(map[5])+" 元",
      skyhzh:map[6],
      skyh:map[7],
      tqfs:map[8],
      tqyybm:map[9],
      ywlsh:map[10],
    });
    my.httpRequest({
      url: app.data.url+'/app-web/personal/public/gjjzhxxcx.service',
      method: 'POST',
      headers: {
            "Content-Type": "application/json",
            "citycode":app.data.zjbzxbm.substr(0,6)
      },
      data: {
        appid: "20170517000101",
        zjbzxbm:app.data.zjbzxbm,
        sign:"SYWDJSKI8UYH7D7FKIUJNE45IJHYRKJ0",
        grzh:app.data.grzh
      },
      dataType: 'json',
      contentType : 'application/json;charset=UTF-8', //contentType很重要    
      success: (res) => {
        console.log("res>>>>>>",res);res.data.data[0].grbh
        console.log("res.data.data[0].grbh>>>>>>",res.data.data[0].grbh);
        this.setData({
          grbh: res.data.data[0].grbh
        });
      },
      fail:(res) => {
        my.alert({content:"网络错误"});
      }, complete:(res) => {
        // my.alert({title: 'complete'});
      }
    });
  },
 
  jcrywblyzClick(){
    my.httpRequest({
      url: app.data.url + '/app-web/public/gjjtq/chk.service',
      method: 'POST',
      headers: {
        "Content-Type": "application/json",
        "citycode":app.data.zjbzxbm.substr(0, 6)
      },
      data: {
        appid: "20170517000101",
        sign: "SYWDJSKI8UYH7D7FKIUJNE45IJHYRKJ0",
        tqyy:this.data.tqyybm,
        grzh: app.data.grzh,
        citybm: "C13010KF",
      },
      dataType: 'json',
      contentType: 'application/json;charset=UTF-8', //contentType很重要    
      success: (ret) => {
        console.log(ret);
        if (ret.data.ret == "0") {
           this.submitClick(this);
        } else {
          my.hideLoading();
          my.alert({ content: ret.data.msg });
        }
      },
      fail: (ret) => {
        my.hideLoading();
        my.alert({ content: "网络错误" });
      },
    });
  },


  submitClick:(that)=>{
     console.log("提交审批....");
      my.httpRequest({
      url: app.data.url + '/app-web/public/gjjtq/ltxtq_process_start.service',
      method: 'POST',
      headers: {
        "Content-Type": "application/json",
        "citycode":app.data.zjbzxbm.substr(0, 6)
      },
      data: {
        appid: "20170517000101",
        sign: "SYWDJSKI8UYH7D7FKIUJNE45IJHYRKJ0",
        tqyy:that.data.tqyybm,
        tqlx:that.data.tqlx,
        tqjehj:that.data.tqjehj,
        grzh: app.data.grzh,
        tqyhzh:that.data.skyhzh,
        skyh:that.data.skyh,
        grbh:that.data.grbh,
        ywlsh:that.data.ywlsh,
        citybm: "C13010KF",
      },
      dataType: 'json',
      contentType: 'application/json;charset=UTF-8', //contentType很重要    
      success: (ret) => {
        console.log(ret);
       if (ret.data.ret == "0") {
          my.alert({ content: "提交成功" });
        } else {
          my.hideLoading();
          my.alert({ content: ret.data.msg });
        }
      },
      fail: (ret) => {
        my.hideLoading();
        my.alert({ content: "网络错误" });
      },
    });
  },

});
