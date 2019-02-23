
const app = getApp();

let jcrtqxxcxData;//银行信息
let jcrtqxxcxDic;//银行
let yhxxArray
let tqdbxxcxDic;
let lixiGlobal;
let tqjehjGlobal;
let ywlshGlobal;
Page({
  data: {
   bpmid:'',
   canReLaunch: !!my.reLaunch,
   tqrxm:'',
   tqrzjhm:'',
   grzhye:'',
   xhlx:'',
   tqjehj:'',
   grzhyemc:'0.00 元',
   xhlxmc:'0.00 元',
   tqjehjmc:'0.00 元',
   skyhzh:'',
   skyh:'',
   index: 0,
   array:[],
   grzh:'',
   grbh:''
  },

  onLoad(options) {
    var map = options.map.split(",");
    console.log("map",map);
    this.setData({
      bpmid:map[0],
      taskId:map[1],
    });
    this.tqdbxxcx(this);
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
          console.log("jcrtqxxcxData>>>>:",jcrtqxxcxData.data);
          if(result.data.data.length>0){
           jcrtqxxcxDic = jcrtqxxcxData.data[0];
          //  that.setData({
          //    skyh: jcrtqxxcxDic.khyh,
          //    skyhzh: jcrtqxxcxDic.yhzh
          //   });
          }else {
           jcrtqxxcxData=[];
           //that.pickerClick(that);
           my.hideLoading();
           my.alert({ content: "未查询到您的收款银行账号信息，请添加后再来操作" });
          }
          that.pickerClick(that);
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
  //选择银行卡
  pickerClick:(that)=> {
    yhxxArray = [];
    if(jcrtqxxcxData.data != null && jcrtqxxcxData.data.length > 0){
      for (let i = 0; i < jcrtqxxcxData.data.length; i++) {
      console.log('21412412');
      if(jcrtqxxcxData.data[i].yhzh==that.data.skyhzh){
        that.setData({
          index:i
        });
      }
      yhxxArray.push(jcrtqxxcxData.data[i].yhzh);
      //yhxxArray.push( {'label':jcrtqxxcxData.data[i].yhzh,'value':i});
      }
    }
    //yhxxArray.push("添加新银行卡");
    console.log("yhxxArray<<<<<<<:",yhxxArray);
    that.setData({
      array:yhxxArray,
    });
  },
  bindPickerChange(e) {
    console.log('picker发送选择改变，携带值为', e.detail.value);
     if(e.detail.value!="-1"){
      
      if(e.detail.value == jcrtqxxcxData.data.length){
        let map ='ltxhtq,sssss';
        my.navigateTo({ url: '../../gjjtq/addYhxx/addYhxx?map='+map });
      }else{
       jcrtqxxcxDic = jcrtqxxcxData.data[e.detail.value];
       this.setData({
        index: e.detail.value,
        skyh: jcrtqxxcxDic.khyh,
        skyhzh: jcrtqxxcxDic.yhzh
       });
      }
    }
  },
  //提取待办接口查询
  tqdbxxcx:(that)=>{
    my.httpRequest({
    url: app.data.url + '/app-web/public/gjjtq/tqdbxxcx.service',
    method: 'POST',
    headers: {
      "Content-Type": "application/json",
      "citycode":app.data.zjbzxbm.substr(0, 6)
    },
    data: {
      appid: "20170517000101",
      sign: "SYWDJSKI8UYH7D7FKIUJNE45IJHYRKJ0",
      bpmid: that.data.bpmid,
      citybm: "C13010KF",
      zjbzxbm: "C13010KF"
    },
    dataType: 'json',
    contentType: 'application/json;charset=UTF-8', //contentType很重要    
    success: (result) => {
      console.log("提取待办接口查询",result);
     if (result.data.ret=="0") {
        tqdbxxcxDic=result.data.data[0];
        console.log("tqdbxxcxDic>>>>",tqdbxxcxDic);
        that.setData({
          tqrxm: tqdbxxcxDic.xingming,
          tqrzjhm: tqdbxxcxDic.zjhm,
          grzhye:parseFloat(tqdbxxcxDic.grzhye).toFixed(2),
          xhlx:tqdbxxcxDic.tqlx2,
          tqjehj:tqdbxxcxDic.tqjehj,

          grzhyemc:app.fmoney(parseFloat(tqdbxxcxDic.grzhye).toFixed(2))+" 元",
          xhlxmc:app.fmoney(parseFloat(tqdbxxcxDic.tqlx2).toFixed(2))+" 元",
          tqjehjmc:app.fmoney(parseFloat(tqdbxxcxDic.tqjehj).toFixed(2))+" 元",

          skyh: tqdbxxcxDic.zrzxkhyh,
          skyhzh: tqdbxxcxDic.tqyhzh,

          grzh:tqdbxxcxDic.grzh,
          grbh:tqdbxxcxDic.grbh

        });
        lixiGlobal=that.data.xhlx;
        tqjehjGlobal=that.data.tqjehj;
        ywlshGlobal=tqdbxxcxDic.tqywlsh;
        that.Serchyhxx(that);
       }else {
      //   my.hideLoading();
        my.alert({ content: result.data.msg});
      }
    },
    fail: (result) => {
      my.hideLoading();
      my.alert({ content: "网络错误" });
     },
   });
  },

  submitClick(){
   console.log("再次提交>>>>>>>>> sftj2:",this.data.skyh,this.data.skyhzh);
   my.showLoading({content:'提交中...'});
   my.httpRequest({
    url: app.data.url + '/app-web/public/gjjtq/tqdb_process_zcstart.service',
    method: 'POST',
    headers: {
      "Content-Type": "application/json",
      "citycode":app.data.zjbzxbm.substr(0, 6)
    },
    data: {
      appid: "20170517000101",
      sign: "SYWDJSKI8UYH7D7FKIUJNE45IJHYRKJ0",
      tqlx: lixiGlobal,
      tqjehj: tqjehjGlobal,
      tqyhzh: this.data.skyhzh,
      sftj:"2",
      //thbz: " ",
      taskId: this.data.taskId,
      skyh: this.data.skyh,
      tqyy: "0201",
      bpmid: this.data.bpmid,
      ywlsh: ywlshGlobal,
      grzh: this.data.grzh,
      grbh: this.data.grbh,
      taskDefinitionKey : "sp",
      channgel : "app",
      source : "提取业务",
			processKey:"jcr_ltxhtq_sp",
      tenantId:"01",
      citybm: "C13010KF",
      zjbzxbm: "C13010KF"
    },
    dataType: 'json',
    contentType: 'application/json;charset=UTF-8', //contentType很重要    
    success: (result) => {
      console.log("再次提交",result);
      if (result.data.ret=="0") {
        my.hideLoading();
        my.showToast({type: 'none',content: '再次提交成功',duration: 3000});
        //my.showToast({type: 'none',content: result.data.msg,duration: 3000});
        }else {
        my.hideLoading();
        //my.alert({ content: result.data.msg});
        my.showToast({type: 'none',content: result.data.msg,duration: 3000});
      }
    },
    fail: (result) => {
      my.hideLoading();
      my.alert({ content: "网络错误" });
     },
   });
  },
  endProcessClick(){
   console.log("撤销>>>>>>>>> tqyy0201:");
   my.showLoading({content:'撤销中...'});
   my.httpRequest({
    url: app.data.url + '/app-web/public/gjjtq/tqdb_process_zcstart.service',
    method: 'POST',
    headers: {
      "Content-Type": "application/json",
      "citycode":app.data.zjbzxbm.substr(0, 6)
    },
    data: {
      appid: "20170517000101",
      sign: "SYWDJSKI8UYH7D7FKIUJNE45IJHYRKJ0",
      tqlx: lixiGlobal,
      tqjehj: tqjehjGlobal,
      tqyhzh: this.data.skyhzh,
      thbz: "4",
      sftj:"1",
      taskId: this.data.taskId,
      skyh: this.data.skyh,
      tqyy: "0201",
      bpmid: this.data.bpmid,
      ywlsh: ywlshGlobal,
      grzh: this.data.grzh,
      grbh: this.data.grbh,
      citybm: "C13010KF",
      zjbzxbm: "C13010KF"
    },
    dataType: 'json',
    contentType: 'application/json;charset=UTF-8', //contentType很重要    
    success: (result) => {
      console.log("撤销",result);
     if (result.data.ret=="0") {
        my.hideLoading();
        my.showToast({type: 'none',content: '撤销成功',duration: 3000});
       }else {
        my.hideLoading();
        //my.alert({ content: result.data.msg});
        my.showToast({type: 'none',content: result.data.msg,duration: 3000});
      }
    },
    fail: (result) => {
      my.hideLoading();
      my.alert({ content: "网络错误" });
     },
   });

  }
});
