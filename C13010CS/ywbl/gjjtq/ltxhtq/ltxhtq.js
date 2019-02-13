
const app = getApp();

let jcrtqxxcxData;//银行信息
let jcrtqxxcxDic;//银行
let gjjzhxxcxDic;
let lixiGlobal;
let tqjehjGlobal;
Page({
  data: {
   tqrxm:'',
   tqrzjhm:'',
   grzhye:'',
   xhlx:'',
   tqjehj:'',
   skyhzh:'',
   skyh:''
  },

  onLoad() {
    this.Serchyhxx(this);
    this.getGjjzhxxcx(this);
  },

 
  Serchyhxx:(that)=>{
     my.httpRequest({
      url: app.data.url + '/app-web/public/gjjtq/yhkzhcx.service',
      method: 'POST',
      headers: {
        "Content-Type": "application/json",
        "citycode":app.data.zjbzxbm.substr(0, 6)
      },
      data: {
        appid: "20170517000101",
        sign: "SYWDJSKI8UYH7D7FKIUJNE45IJHYRKJ0",
        grzh: app.data.grzh,
        citybm: "C13010KF",
      },
      dataType: 'json',
      contentType: 'application/json;charset=UTF-8', //contentType很重要    
      success: (result) => {
        console.log("银行信息查询返回：",result);
        if (result.data.ret!="99") {
          jcrtqxxcxData=result.data;
          console.log("jcrtqxxcxData>>>>:",jcrtqxxcxData.data.length);
          if(result.data.data.length>0){
           jcrtqxxcxDic = jcrtqxxcxData.data[0];
           that.setData({
             skyh: jcrtqxxcxDic.khyh,
             skyhzh: jcrtqxxcxDic.yhzh
            });
          }else {
           my.hideLoading();
           my.alert({ content: "未查询到您的收款银行账号信息，请添加后再来操作" });
          }
        } else {
          my.hideLoading();
          my.alert({ content: result.data.msg });
        }
      },
      fail: (result) => {
        my.hideLoading();
        my.alert({ content: "网络错误" });
      },
    });
  },


  getGjjzhxxcx:(that)=>{
    my.httpRequest({
    url: app.data.url + '/app-web/personal/public/gjjzhxxcx.service',
    method: 'POST',
    headers: {
      "Content-Type": "application/json",
      "citycode":app.data.zjbzxbm.substr(0, 6)
    },
    data: {
      appid: "20170517000101",
      sign: "SYWDJSKI8UYH7D7FKIUJNE45IJHYRKJ0",
      grzh: app.data.grzh,
      //citybm: "C13010KF",
      zjbzxbm:app.data.zjbzxbm
    },
    dataType: 'json',
    contentType: 'application/json;charset=UTF-8', //contentType很重要    
    success: (result) => {
      console.log("公积金账户信息查询返回：",result);
      if (result.data.ret=="0") {
        gjjzhxxcxDic=result.data.data[0];
        console.log("gjjzhxxcxDic>>>>",gjjzhxxcxDic);
        that.setData({
          tqrxm: gjjzhxxcxDic.xingming,
          tqrzjhm: gjjzhxxcxDic.zjhm,
          grzhye:parseFloat(gjjzhxxcxDic.grzhye).toFixed(2)+" 元",
        });
        
        that.tqlxcx(gjjzhxxcxDic.grzh,gjjzhxxcxDic.dwzh,that);
        
      }else if(result.data.ret=="1"){
        my.hideLoading();
        my.alert({ content: "未查询到您的公积金信息" });
      }else {
        my.hideLoading();
        my.alert({ content: result.data.msg});
      }
    },
    fail: (result) => {
      my.hideLoading();
      my.alert({ content: "网络错误" });
     },
   });
  },

  tqlxcx:(grzh,dwzh,that)=>{
    my.httpRequest({
      url: app.data.url + '/app-web/public/gjjtq/tqlxcx.service',
      method: 'POST',
      headers: {
        "Content-Type": "application/json",
        "citycode":app.data.zjbzxbm.substr(0, 6)
      },
      data: {
        appid: "20170517000101",
        sign: "SYWDJSKI8UYH7D7FKIUJNE45IJHYRKJ0",
        grzh: grzh,
        dwzh:dwzh,
        citybm: "C13010KF",
      },
      dataType: 'json',
      contentType: 'application/json;charset=UTF-8', //contentType很重要  
    success: (result) => {
      console.log("提取利息查询返回：",result);
      lixiGlobal= parseFloat(result.data.zjlx).toFixed(2);
      console.log("lixiGlobal>>>>:",lixiGlobal);
      let tqjehj = parseFloat(gjjzhxxcxDic.grzhye) + parseFloat(lixiGlobal);
      tqjehjGlobal = parseFloat(tqjehj).toFixed(2);
      console.log("tqjehjGlobal>>>>>:",tqjehjGlobal);
      that.setData({
         xhlx:lixiGlobal+" 元",
         tqjehj:tqjehjGlobal+" 元",
      });
    },
    fail: (result) => {
      my.hideLoading();
      my.alert({ content: "网络错误" });
    },
   });
  }

});
