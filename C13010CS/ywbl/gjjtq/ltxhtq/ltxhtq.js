
const app = getApp();

let jcrtqxxcxData;//银行信息
let jcrtqxxcxDic;//银行
let yhxxArray
let gjjzhxxcxDic;
let lixiGlobal;
let tqjehjGlobal;
let ywlshGlobal;
Page({
  data: {
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
   array:[]
  },

  onLoad() {
    //this.Serchyhxx(this);
    this.getGjjzhxxcx(this);
    this.ywlshcx(this);
  },
 onShow() {
   this.Serchyhxx(this);
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
        //citybm: "C13010KF",
        citybm: app.data.zjbzxbm,
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
           that.setData({
             skyh: jcrtqxxcxDic.khyh,
             skyhzh: jcrtqxxcxDic.yhzh
            });
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
      yhxxArray.push(jcrtqxxcxData.data[i].yhzh);
      //yhxxArray.push( {'label':jcrtqxxcxData.data[i].yhzh,'value':i});
      }
    }
    yhxxArray.push("添加新银行卡");
    console.log("yhxxArray<<<<<<<:",yhxxArray);
    that.setData({
      array:yhxxArray,
    });
    // my.showActionSheet({
    //  // title: '',
    //   items: yhxxArray,
    //   success: (res) => {
    //     console.log("res",res.index);
    //     if(res.index == jcrtqxxcxData.data.length){
    //       let map ='ltxhtq,sssss ';
    //       my.navigateTo({ url: '../../gjjtq/addYhxx/addYhxx?map='+map })
    //       //my.navigateTo({ url: '../../gjjtq/addYhxx/addYhxx'});
    //     }else{
    //       jcrtqxxcxDic = jcrtqxxcxData.data[res.index];
    //       this.setData({
    //         skyh: jcrtqxxcxDic.khyh,
    //         skyhzh: jcrtqxxcxDic.yhzh
    //       });
    //     }
    //   },
    // });
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
          grzhye:parseFloat(gjjzhxxcxDic.grzhye).toFixed(2),
          grzhyemc:app.fmoney(parseFloat(gjjzhxxcxDic.grzhye).toFixed(2))+" 元",
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
        //citybm: "C13010KF",
        citybm: app.data.zjbzxbm,
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
         xhlx:lixiGlobal,
         tqjehj:tqjehjGlobal,
         xhlxmc:app.fmoney(lixiGlobal)+" 元",
         tqjehjmc:app.fmoney(tqjehjGlobal)+" 元",
      });
    },
    fail: (result) => {
      my.hideLoading();
      my.alert({ content: "网络错误" });
    },
   });
  },
  
  ywlshcx:(that)=>{
      my.httpRequest({
      url: app.data.url + '/app-web/public/common/hqywlsh.service',
      method: 'POST',
      headers: {
        "Content-Type": "application/json",
        "citycode":app.data.zjbzxbm.substr(0, 6)
      },
      data: {
        appid: "20170517000101",
        sign: "SYWDJSKI8UYH7D7FKIUJNE45IJHYRKJ0",
        //citybm: "C13010KF",
        citybm: app.data.zjbzxbm,
      },
      dataType: 'json',
      contentType: 'application/json;charset=UTF-8', //contentType很重要  
    success: (result) => {  
      console.log("业务流水号查询返回：",result);
      ywlshGlobal=result.data.data.ywlsh;
    },
    fail: (result) => {
      my.hideLoading();
      my.alert({ content: "网络错误" });
    },
   });
  },

  submitClick(){

   let tqjehjcz=this.data.tqjehj;
   let tqlxcz=this.data.xhlx;
   let grzhyecz=this.data.grzhye;
   let yhzhcz=this.data.skyh;
   let khyhcz=this.data.skyhzh;
   let tqfs="02";
   let tqyybm="0201";
   let ywlshcz=ywlshGlobal;
   if(parseFloat(tqjehjcz) > 300000){
      my.alert({ content: "提取金额大于等于30万，请到中心柜台办理业务" });
      return;
   }
   let map ='ltxhtq,'+this.data.tqrxm+','+this.data.tqrzjhm+','+grzhyecz+','+tqlxcz+','+tqjehjcz+','+khyhcz+','+yhzhcz+',02,0201,'+ywlshcz;
   console.log("map>>>>>>>>>:",map);
   my.navigateTo({ url: '../../gjjtq/ltxhtq/ltxhtq02?map='+map });
  }
});
