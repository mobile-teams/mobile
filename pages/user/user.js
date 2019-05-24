const app = getApp();
Page({
  data: {
    // tabbar:{},     //放在data中
    thumb: 'https://gw.alipayobjects.com/zos/rmsportal/VBqNBOiGYkCjqocXjdUj.png',
    footerImg: 'https://gw.alipayobjects.com/zos/rmsportal/VBqNBOiGYkCjqocXjdUj.png',
    xingming: "欢迎使用手机公积金",
    dwmc: "请授权登录后查看账户信息",
    iscf: true,
    itemsGywm: [
      {
        thumb: '/image/lxwm2.png',
        title: '关于我们',
        arrow: true,
      },
    ],

    itemsPhone: [
      {
        thumb: '/image/phone.png',
        title: '服务热线',
        arrow: true,
      },
    ],
    // itemsQchc: [
    //   {
    //     thumb: '/image/clearcache.png',
    //     title: '清除缓存',
    //   // extra: '描述文字',
    //     arrow: false,
    //   },
    // ],
    // itemsYssm: [
    //   {
    //     thumb: '/image/yssm.png',
    //     title: '隐私声明',
    //     arrow: true,
    //   },
    // ],
  },
  onShow() {
    var obj = new Object();
    obj.appid = app.data.appid;
    obj.citybm = app.data.zjbzxbm;
    obj.id = "zjhm";
    obj.msg = app.data.zjhm;
    obj.sign = app.getSign(obj, app.data.pkey);
    var obj1 = new Object();
    obj1.data = app.EncryptBASE64(JSON.stringify(obj), app.data.grkey);
    obj1.appid = app.data.appid;
    obj1.citybm = app.data.zjbzxbm;
    obj1.sign = app.getSign(obj1, app.data.pkey);
    my.request({
      url: app.data.url + '/app-web/public/auth/userinfo.service?token=' + app.data.token,
      method: 'POST',
      headers: {
        "Content-Type": "application/json",
        // "citycode": app.data.zjbzxbm,
        "appid": app.data.appid
      },
      data: JSON.stringify(obj1),

      dataType: 'json',
      contentType: 'application/json;charset=UTF-8', //contentType很重要    
      success: (result) => {
        console.log("info接口返回结果res ：", result);
        var res = app.Decrypt(result.data.data, app.data.grkey);
        console.log("返回结果解密：：", res);
        if (res.ret == 0) {
          console.log("12312312", res.data);
          this.setData({
            xingming: this.plusXing(app.data.xingming, 1, 1),
            dwmc: this.plusXing(app.data.dwmc, 2, 2),
            sjhm: this.plusXing(res.sjhm, 3, 4),
          })
          console.log('99999999', this.data.sjhm);
        }

      },
    });
    my.getAuthCode({
      scopes: 'auth_user',
      fail: (error) => {
        console.error('getAuthCode', error);
      },
      success: () => {
        my.getAuthUserInfo({
          fail: (error) => {
            console.error('getAuthUserInfo', error);
          },
          success: (userInfo) => {
            console.log(`userInfo:`, userInfo);
            this.setData({
              userInfo,
              hasUserInfo: true,
            });
          }
        });
      }
    });
    console.log(app.data.xingming, app.data.dwmc);

    console.log("app.data.urls", app.data.urls);
    if (app.data.urls != "" || !app.data.pdsfdl) {
      this.setData({
        iscf: false,
      })
    }
  },
  onCardClick: function (ev) {
    if (app.data.pdsfdl) {
      my.navigateTo({ url: '../grzx/grzx' })
    } else { 
      my.navigateTo({ url: '/citychose/citychose' })
    }

  },
  onItemClick(ev) {
    my.confirm({
      title: '提示',
      content: '呼叫服务热线公积金12329?',
      success: (result) => {
        if (result.confirm) {
          my.makePhoneCall({ number: '12329' });
        }
      },
    });
  },
  onItemClick1(ev) {
    my.navigateTo({ url: '../gywm/gywm' })
  },
  onQchcClick() {
    my.removeStorage({
      key: 'city',
      success: function () {
        my.alert({ content: '删除成功' });
      }
    });
  },
  onExit(ev) {
    my.reLaunch({
      url: '/citychose/citychose'
    });
  },
  //脱敏
  plusXing: (str, frontLen, endLen) => {
    if (str.length > 2) {
      var len = str.length - frontLen - endLen;
      var xing = '';
      for (var i = 0; i < len; i++) {
        xing += '*';
      }
      return str.substring(0, frontLen) + xing + str.substring(str.length - endLen);
    } else {
      var len = str.length - frontLen;
      var xing = '';
      for (var i = 0; i < len; i++) {
        xing += '*';
      }
      return str.substring(0, frontLen) + xing;
    }
  },
});

