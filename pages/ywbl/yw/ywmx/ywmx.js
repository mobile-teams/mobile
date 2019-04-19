const app = getApp();
Page({
  data: {
    ywmxurl: ' '
  },
  onLoad(e) {
    var ywmxurl = '';
    console.log("ywmx_接参数eee》》》", e);
    if (e.style != '' && e.style != null && e.style == 'public') {
      ywmxurl = app.data.url + '/alipay/' + e.ywbm;
    } else {
      ywmxurl = app.data.url + '/alipay/' + e.ywbm + '?citycode=' + app.data.zjbzxbm+'&date='+new Date().getTime();
    }
    this.setData({
      ywmxurl: ywmxurl
    });
    console.log('url>>>>>>-', this.data.ywmxurl);
    this.webViewContext = my.createWebViewContext('web-view_ywmx');
  },

  //接收H5发送消息
  ywmx_onMessage(e) {

    //打电话标志 fqbz-发起标志
    console.log("接收服务网点打电话！！！", e);
    if (e.detail.fqbz == '1') {
      my.makePhoneCall({ number: e.detail.call });
    }

    //刷脸标志 sl-刷脸
    if (e.detail.slyz == 'sl') {
      console.log("<<<<<---欢迎进入刷脸环节--->>>>>");
      my.ap.faceVerify({
        bizId: e.detail.bizid, //业务请求的唯一标识，需要保证唯一性 - 传入业务流水号
        bizType: '2', //业务场景参数，必须填写‘2’，代表刷脸认证  
        success: (res) => {
          console.log("刷脸111success：resresresres", res);
          if (res.faceRetCode == '1000') {
            console.log("刷脸111成功成功成功返回》》》：", res);
            //向后台发送刷脸请求222
            var obj = new Object();
            obj.appid = app.data.appid;
            obj.zimid = res.zimId;
            obj.bizid = e.detail.bizid;
            obj.sign = app.getSign(obj, app.data.pkey);
            console.log("刷脸--JSON.stringify(obj):::", JSON.stringify(obj))
            my.request({
              url: 'https://api.sjgjj.cn/app-web/personal/common/aliface.service',
              method: 'POST',
              headers: {
                "Content-Type": "application/json",
                "citycode": "CSY001"
              },
              data: JSON.stringify(obj),
              dataType: 'json',
              contentType: 'application/json;charset=UTF-8', //contentType很重要    
              success: (res) => {
                //判断刷脸是否成功
                console.log("刷脸接口222成功成功返回》》》：", res);
                  //向H5发送成功信息
                  this.webViewContext.postMessage({ 'success': res.data.success,'zimmsg':res.data.zimMsg });
              },
              fail: (res) => {
                console.log("刷脸接口222失败返回(网络波动)《《《《：", res);
                this.webViewContext.postMessage({ 'sucess': false, 'zimmsg': '您的网络不稳定，请重新尝试' });
              }
            });
          } else {
            console.log("刷脸不通过---", res);
            this.webViewContext.postMessage({ 'success': false, 'zimmsg': '认证失败' });
          }
        },
        fail: (res) => {
          console.log("刷脸1111失败返回《《《《：", res);
          this.webViewContext.postMessage({ 'success': false, 'zimmsg': "刷脸失败" });
        }
      });
    }
  },
});
