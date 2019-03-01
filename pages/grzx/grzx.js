const app = getApp();
Page({
  data: {
    sjhm:'',
  },

  onLoad() {
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
        if(res.data.ret == 0){
           console.log("12312312",res.data);
         
           // app.data.sjhm = res.data.khbh;
            //app.setSjhm(res.data.khbh);
             this.setData({
              sjhm:this.plusXing(res.data.sjhm,3,4),
              zjhm:this.plusXing(res.data.zjhm,10,4),
              xingming:res.data.xingming
            })
            console.log('99999999',this.data.sjhm);
          }     
        
      },
    });
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
});
