const app = getApp();
Page({
  data: {
    grzh:'',
    grzhzt:'',
    grzhye:'',
    grjcjs:'',
    gryjce:'',
    grjcjs:'',
    dwzh:'',
    dwmc:'',
    dwyjce:'',
    dwjcbl:'',
    khrq:'',
    qjny:'',
    jzny:''
  },
  
  onLoad() {
    my.showLoading({
      content: '加载中...',
      delay: '1000',
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
        let zhxx = res.data.data[0];
         my.hideLoading();
        if(res.data.ret==0){
          let grjcbl2 = (Number(zhxx.grjcbl) * 100)+'%';
          let dwjcbl2 = (Number(zhxx.dwjcbl) * 100)+'%';
          this.setData({
            grzh: zhxx.grzh,
            grzhzt:zhxx.grzhzt,
            grzhye:app.fmoney(zhxx.grzhye)+'元',
            grjcjs:app.fmoney(zhxx.grjcjs)+'元',
            gryjce:app.fmoney(zhxx.gryjce)+'元',
            grjcbl:grjcbl2,
            dwzh:zhxx.dwzh,
            dwmc:zhxx.dwmc,
            dwyjce:app.fmoney(zhxx.dwyjce)+'元',
            dwjcbl:dwjcbl2,
            khrq:zhxx.khrq,
            qjny:zhxx.qjny,
            jzny:zhxx.jzny
          });
        }else{
          my.alert({
            title: '提示' ,
            content:grxx.msg
          });
        }
      },
      fail:(res) => {
        my.alert({content:"网络错误"});
      },
      complete:(res) => {
        // my.alert({title: 'complete'});
      }
    });
  },
  
});
