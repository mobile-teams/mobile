const app = getApp();
Page({
  data: {
    ant:"",
    flag:true
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
          sjhm:this.plusXing(res.data.sjhm,3,4),
          zjhm:this.plusXing(res.data.zjhm,1,1),
        })
      }
    });
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
        console.log("zhcxinfo查询",res.data);
        console.log('1111112222',res.data.data[0].gjjxx[0].dwzh);
        if(res.data.ret == 0){
          console.log('1111112222');
          if (res.data.data[0].dkxx.length <= 0) {
            my.alert({
              title:"提示",
              content: '未查询到您的贷款信息',
              success: () => {
                my.navigateBack();
              }
            });
            
          }
          if (res.data.data[0].gjjxx.length > 0) {
            console.log('1111111111');
            this.setData({
              dwzh:res.data.data[0].gjjxx[0].dwzh,
              grzh:res.data.data[0].gjjxx[0].grzh,
            });
            console.log('1111133333');
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
      }
    });

    var timer = null;
    var count = 10;
    timer = setInterval(function () {
      if (count > 0) {
          count = count - 1;
          this.setData({
            ant:"请先阅读完该协议" + "(" + count + ")",
            flag:true,
            type:'ghost',
            button:'我知道了',
          });
          console.log("data：",this.data.ant);
      } else {
          clearInterval(timer);
          this.setData({
             flag:false,
             type:'primary',
             ant:"请先阅读完该协议",
             button:'我已同意',
          });
      }
       console.log("读秒数",count);
    }.bind(this), 1000);
  },

  //脱敏
  plusXing:(str, frontLen, endLen) => {
    var len = str.length - frontLen - endLen;
    var xing = '';
    for (var i = 0; i < len; i++) {
      xing += '*';
    }
    return str.substring(0, frontLen) + xing + str.substring(str.length - endLen);
  },

  nextPage(ev){my.navigateTo({ url: '../index/index' })
  }
});