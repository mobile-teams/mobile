const app = getApp();
var jkhtbhArray;
var dkxxArrayGlobal;
var gjjxxArrayGlobal;
var jkrtqhk01Dic;
Page({
  data: {
    userid:'',
    grbh:'',
    zxbm:'',
    jgbm:'',
    dkzt:'',
    jkhtbh:'',
    dkye:'',
    grzh:'',
    dwzh:'',
    dwmc:'',
    grzhye:'',
    yzjkrgx:'',
  },
  onLoad() {
    //userinfo查询
    my.httpRequest({
      url: app.data.url + '/app-web/public/auth/userinfo.service',
      method: 'POST',
      headers: {
        "Content-Type": "application/json",
        "citycode": app.data.zjbzxbm.substr(0, 6)
      },
      data: {
        appid: "20181023000101",
        id : "zjhm",
        sign: "SYWDLSKI0UYH7D7FKIUJME45IJHYRKJ1",
        citybm:app.data.zjbzxbm,
        zjhm: app.data.zjhm,
        msg:app.data.zjhm,

      },
      dataType: 'json',
      contentType: 'application/json;charset=UTF-8', //contentType很重要    
      success: (res) => {
        console.log("userinfo查询",res.data);
        this.setData({
          userid:res.data.userid,
          zxbm:res.data.zxbm,
          jgbm:res.data.jgbm,
          grbh:res.data.khbh,
        });
        this.zhcxinfo(this);
      },
    });
  },

  zhcxinfo:(that)=>{
    //zhcxinfo查询
    my.httpRequest({
      url: app.data.url + '/app-web/public/zhcx/info.service',
      method: 'POST',
      headers: {
        "Content-Type": "application/json",
        "citycode": app.data.zjbzxbm.substr(0, 6)
      },
      data: {
        appid: "20181023000101",
        id : "zjhm",
        sign: "SYWDLSKI0UYH7D7FKIUJME45IJHYRKJ1",
        citybm:app.data.zjbzxbm,
        xingming:app.data.xingming,
        zjhm: app.data.zjhm,
      },
      dataType: 'json',
      contentType: 'application/json;charset=UTF-8', //contentType很重要    
      success: (res) => {
        if(res.data.ret == 0){
          if (res.data.data[0].dkxx.length > 0) {
              if (res.data.data[0].dkxx.length == 1) {
                dkxxArrayGlobal = res.data.data[0].dkxx;
                that.setData({
                  dkzt : dkxxArrayGlobal[0].dkzt,
                  jkhtbh : dkxxArrayGlobal[0].jkhtbh,
                  dkye : dkxxArrayGlobal[0].dkye,
                });
            } else if (res.data.data[0].dkxx.length > 1) {
              that.selectJkhtbh(that,res.data);
            }
            if(dkxxArrayGlobal.length>0){
              console.log("dkxxArrayGlobal",dkxxArrayGlobal);
              jkhtbhArray = [];
              for (var i = 0; i < dkxxArrayGlobal.length; i++) {
                console.log('21412412');
                jkhtbhArray.push(dkxxArrayGlobal[i].jkhtbh);
              }
              console.log('jkhtbhArray',jkhtbhArray);
            }else{
              my.alert({
                title:"提示",
                content: '未查询到您的贷款信息',
                success: () => {
                  my.navigateBack();
                }
              });
            }
          }else{
            my.alert({
              title:"提示",
              content: '未查询到您的贷款信息',
              success: () => {
                my.navigateBack();
              }
            });
          }
          if (res.data.data[0].gjjxx.length > 0) {
            gjjxxArrayGlobal = res.data.data[0].gjjxx[0];
            that.setData({
              dwzh:gjjxxArrayGlobal.dwzh,
              grzh:gjjxxArrayGlobal.grzh,
              dwmc:gjjxxArrayGlobal.dwmc,
              grzhye:gjjxxArrayGlobal.grzhye,
              jgbm:gjjxxArrayGlobal.jgbm,
            });
          } else {
            my.alert({
              title:"提示",
              content: '未查询到您的公积金信息',
              success: () => {
                my.navigateBack();
              }
            });
          }
        }
        console.log("1233333333333");
        that.jkrtqhk(that);
        console.log("11111111");
      },
    });
  },

  //月对冲信息查询
  jkrtqhk:(that)=>{
    console.log("that",that);
    my.httpRequest({
      url: app.data.url + '/app-web/public/skip/second.service',
      method: 'POST',
      headers: {
        "Content-Type": "application/json",
        "citycode": app.data.zjbzxbm.substr(0, 6)
      },
      data: {
        ffbm:"01",
        jkhtbh:that.data.jkhtbh,
        khbh:that.data.grbh,
        userid:that.data.userid,
        ywfl:"04",
        ywlb:"03",
        zhbh:that.data.grzh,
        path:"/HFB/jkr/jkrtqhk.service",
        appid: "20181109000102",
        sign: "SYN190XSS332X731Z4BCAADC1CP900SX",
        citybm:app.data.zjbzxbm,
      },
      dataType: 'json',
      contentType: 'application/json;charset=UTF-8', //contentType很重要
      success: (res) => {
        console.log("jkrtqhk查询",res.data);
        var resultjson = JSON.parse(res.data);
        jkrtqhk01Dic = '';
        for (var i = 0; i < resultjson.data.length; i++) {
          if (resultjson.data[i].jkrgx == "借款人") {
            jkrtqhk01Dic = resultjson.data[i];
          }
        }
        that.setData({
          yzjkrgx:jkrtqhk01Dic.jkrgx,
          xingming:jkrtqhk01Dic.xm,
          zjhm:jkrtqhk01Dic.zjhm,
          dkye:app.fmoney(that.data.dkye)+'元',
          grzh:jkrtqhk01Dic.gjjzh,
          grzhzt:jkrtqhk01Dic.grzhzt,
          grzhye:app.fmoney(jkrtqhk01Dic.grzhye)+'元',
          yjce:app.fmoney(jkrtqhk01Dic.yjce)+'元',
          yjny:jkrtqhk01Dic.yjny,
          sfzq:jkrtqhk01Dic.zhsfdj,
        });
        console.log("jkrtqhk01Dic",jkrtqhk01Dic);
      },
    });
  },

  //多笔贷款
  selectJkhtbh:(that,result) =>{
    if (result.data[0].dkxx.length < 2) {
      return;
    }
    for (var i = 0; i < result.data[0].dkxx.length; i++) {
        dkxxArrayGlobal = result.data[i].dkxx;
        that.data.dkzt = dkxxArrayGlobal[i].dkzt;
        that.data.jkhtbh = dkxxArrayGlobal[i].jkhtbh;
        that.data.dkye = dkxxArrayGlobal[i].dkye;
        that.data.grzh = dkxxArrayGlobal[i].jkrgjjzh;
    }
  },

  onJkhtbh() {
    my.showActionSheet({
      title: '选择借款合同编号',
      items: jkhtbhArray,
      success: (res) => {
        console.log("res",res);
        this.setData({
          jkhtbh:jkhtbhArray[res.index].jkhtbh,
        });
        if(res.index>0){
          this.jkrtqhk(this);
        }
      },
    });
  },

  submit() {
    console.log("111111111",this.data);
    if(this.isContains(this.data.dkzt,"结清")){
      my.alert({
        title:"提示",
        content: '您的贷款已结清',
      });
      return;
    }
    if(this.isContains(this.data.grzhzt,"销户")){
      my.alert({
        title:"提示",
        content: '您的个人账户已销户',
      });
      return;
    }
    var msg = jkrtqhk01Dic.dchd == 0 ? "是否签约对冲还贷?" : "是否取消对冲还贷?";
    my.confirm({
      title: '提示',
      content: msg,
      confirmButtonText: '确定',
      cancelButtonText: '取消',
      success: (result) => {
        console.log("result",result);
        my.alert({
          title: `${result.confirm}`,
        });
      },
    });
  },

  ywlshcx :(that)=>{
    my.httpRequest({
      url: app.data.url + '/app-web/public/common/hqywlsh.service',
      method: 'POST',
      headers: {
        "Content-Type": "application/json",
        "citycode": app.data.zjbzxbm.substr(0, 6)
      },
      data: {
      },
      dataType: 'json',
      contentType: 'application/json;charset=UTF-8', //contentType很重要
      success: (res) => {
        console.log("ywlshcx",res);
        that.setData({
         
        });
      },
    });
  },

  isContains:(str, substr)  =>{
    return str.indexOf(substr) >= 0;
  },

});
