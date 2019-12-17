const app = getApp();
Page({
  data: {
    // tabbar:{},     //放在data中
    thumb: 'https://gw.alipayobjects.com/zos/rmsportal/VBqNBOiGYkCjqocXjdUj.png',
    footerImg: 'https://gw.alipayobjects.com/zos/rmsportal/VBqNBOiGYkCjqocXjdUj.png',
    xingming: "欢迎使用手机公积金",
    dwmc: "请授权登录后查看账户信息",
    sjhm: "",
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
    wtfk: [
      {
        thumb: '/image/yjfk.png',
        title: '意见反馈',
        arrow: true,
      },
    ],
    itemsQchc: [
      {
        thumb: '/image/clearcache.png',
        title: '清除缓存',
        // extra: '描述文字',
        arrow: false,
      },
    ],
    // itemsYssm: [
    //   {
    //     thumb: '/image/yssm.png',
    //     title: '隐私声明',
    //     arrow: true,
    //   },
    // ],
  },

  onShow() {
    my.setNavigationBar({
      title: '我的',
    });
  },

  onLoad() {
    var obj = new Object();
    obj.appid = app.globalData.appid;
    obj.citybm = app.globalData.zjbzxbm;
    obj.id = "zjhm";
    obj.msg = app.globalData.zjhm;
    obj.sign = app.getSign(obj, app.globalData.pkey);
    var obj1 = new Object();
    obj1.data = app.EncryptBASE64(JSON.stringify(obj), app.globalData.grkey);
    obj1.appid = app.globalData.appid;
    obj1.citybm = app.globalData.zjbzxbm;
    obj1.sign = app.getSign(obj1, app.globalData.pkey);
    if (app.globalData.pdsfdl) {
      my.request({
        url: app.globalData.url + '/app-web/public/auth/userinfo.service?token=' + app.globalData.token,
        method: 'POST',
        headers: {
          "Content-Type": "application/json",
          "citycode": app.globalData.zjbzxbm,
          "appid": app.globalData.appid
        },
        data: JSON.stringify(obj1),

        dataType: 'json',
        contentType: 'application/json;charset=UTF-8', //contentType很重要    
        success: (result) => {
          console.log("info接口返回结果res ：", result);
          if (result.data.ret == 0) {
            var res = app.Decrypt(result.data.data, app.globalData.grkey);
            console.log("返回结果解密：：", res);
            if (res.ret == 0) {
              console.log("12312312", res.data);
              this.setData({
                xingming: this.plusXing(app.globalData.xingming, 1, 1),
                dwmc: this.plusXing(app.globalData.dwmc, 2, 2),
                sjhm: this.plusXing(res.sjhm, 3, 4),
              })
              console.log('99999999', this.data.sjhm);
            } else {
              my.alert({
                title: '提示',
                content: res.msg
              });
            }
          } else {
            my.alert({
              title: '提示',
              content: result.data.msg
            });
          }


        },
        fail: (res) => {
          my.alert({
            title: '提示',
            content: '网络错误'
          });
        }
      });
    }

    my.getAuthCode({
      scopes: 'auth_user',
      fail: (error) => {
        console.log('getAuthCode', error);
      },
      success: () => {
        my.getAuthUserInfo({
          fail: (error) => {
            console.log('getAuthUserInfo', error);
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
    console.log(app.globalData.xingming, app.globalData.dwmc);

    console.log("app.globalData.urls", app.globalData.urls);
    console.log("app.globalData.pdsfdl", app.globalData.pdsfdl);
    if (app.globalData.urls != "" || !app.globalData.pdsfdl) {
      this.setData({
        iscf: false,
      })
    } else {
      this.setData({
        iscf: true,
      })
    }
  },

  /**
   * 问题反馈
   */
  wtfkClick: function(ev) {
    if (app.globalData.pdsfdl) {
      my.navigateTo({ url: '../ywbl/yw/ywmx/ywmx?style=wtfk&ywbm=ywbl/feedback/index1.html' })
    } else {
      my.alert({ content: '请登陆后使用该功能' });

    }

  },


  onCardClick: function(ev) {
    if (app.globalData.pdsfdl) {
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
    my.clearStorage()
    my.alert({ content: '删除成功' });
  },
  onExit(ev) {
    app.globalData.pdsfdl = false;
    this.setData({
      xingming: "欢迎使用手机公积金",
      dwmc: "请授权登录后查看账户信息",
      sjhm: ""
    }),
      my.reLaunch({
        url: '../index/index'
      });
    // my.switchTab({
    //   url: '../index/index', // 跳转的 tabBar 页面的路径（需在 app.json 的 tabBar 字段定义的页面）。注意：路径后不能带参数
    //   success: (res) => {

    //   },
    // });
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

