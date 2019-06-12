const app = getApp();

Page({
  data: {
    xzcs: '../image/cityImg/001.png',
    citybm: '',
    xzcsflag: '0',
    iscf: true,
    // 轮播图变量
    images: [],
    indicatorDots: true,
    autoplay: false,
    interval: 3000,
    current: 1, //默认显示第几张,0为第一张
    circular: true,
  },

  onShow() {
    let that = this;
    if (app.data.zjbzxbm != "") {//判断是否从城市选择页面返回
      console.log("城市列表返回：", app.data.zjbzxbm)
      this.setData({
        xzcs: "https://api.sjgjj.cn/img/city/" + app.data.zjbzxbm.substr(0, 6) + ".png",
        xzcsflag: "1",
        citybm: app.data.zjbzxbm,
        images: [
          { imgUrl: app.data.url + '/alipay/common/banna/banna1.jpg?citycode=' + app.data.zjbzxbm, url: app.data.url + '/alipay/common/banna/banna1.html?citycode=' + app.data.zjbzxbm },
          { imgUrl: app.data.url + '/alipay/common/banna/banna2.jpg?citycode=' + app.data.zjbzxbm, url: app.data.url + '/alipay/common/banna/banna2.html?citycode=' + app.data.zjbzxbm },
          { imgUrl: app.data.url + '/alipay/common/banna/banna3.jpg?citycode=' + app.data.zjbzxbm, url: app.data.url + '/alipay/common/banna/banna3.html?citycode=' + app.data.zjbzxbm },
        ],
      });
    } else {
      //读取缓存信息
      console.log("读取缓存");
      my.getStorage({
        key: 'city',
        success(res) {
          if (res.data != null) {
            app.data.zjbzxbm = res.data.citybm;
            that.setData({
              citybm: res.data.citybm,
              xzcs: "https://api.sjgjj.cn/img/city/" + res.data.citybm.substr(0, 6) + ".png",
              xzcsflag: "1",
              images: [
                { imgUrl: app.data.url + '/alipay/common/banna/banna1.jpg?citycode=' + app.data.zjbzxbm, url: app.data.url + '/alipay/common/banna/banna1.html?citycode=' + app.data.zjbzxbm },
                { imgUrl: app.data.url + '/alipay/common/banna/banna2.jpg?citycode=' + app.data.zjbzxbm, url: app.data.url + '/alipay/common/banna/banna2.html?citycode=' + app.data.zjbzxbm },
                { imgUrl: app.data.url + '/alipay/common/banna/banna3.jpg?citycode=' + app.data.zjbzxbm, url: app.data.url + '/alipay/common/banna/banna3.html?citycode=' + app.data.zjbzxbm },
              ],
            });
          }
        },
      });
    }
    if (app.data.urls != "") {
      this.sqdl();
      this.setData({
        iscf: false,
      })
    }
  },
  csxz() {
    my.navigateTo({
      url: '/city/city',
    });
  },
  //授权登陆
  sqdl() {
    let cs = this.data.xzcsflag;
    if (cs == '0') {
      my.alert({
        title: '提示',
        content: '请选择公积金城市'
      });
      return;
    } else {
      my.getAuthCode({
        scopes: 'auth_user',
        success: ({ authCode }) => {
          //获取用户姓名证件号码
          var obj = new Object();
          obj.appid = app.data.appid;
          obj.authCode = authCode;
          obj.citybm = "CSY001";
          obj.sign = app.getSign(obj, app.data.pkey)
          var obj1 = new Object();
          obj1.data = app.EncryptBASE64(JSON.stringify(obj), app.data.pkey);
          obj1.appid = app.data.appid;
          obj1.citybm = app.data.zjbzxbm;
          obj1.sign = app.getSign(obj1, app.data.pkey);
          console.log('实名接口请求数据：：', obj1);
          // return;
          my.request({
            url: app.data.url + '/app-web/personal/common/alitoken.service',
            method: 'POST',
            headers: {
              "Content-Type": "application/json",
              "citycode": "CSY001",
              "apppid":app.data.appid
            },
            data: JSON.stringify(obj1),
            dataType: 'json',
            contentType: 'application/json;charset=UTF-8', //contentType很重要    
            success: (result) => {
              if (result.data.ret == 0) {
                var res = app.Decrypt(result.data.data, app.data.pkey);
                console.log('实名接口返回数据：', result);
                console.log('实名接口返回数据解密：', res);
                if (res.msg == null) {
                  app.data.xingming = res.param.userName;
                  app.data.zjhm = res.param.certNo;
                  // app.data.xingming = '闽意常';
                  // app.data.zjhm = '210603198210280037'
                  // app.data.xingming = '况后文最';
                  // app.data.zjhm = '130102197012030629'
                  //app.data.urls = "";  初次登入不再置空，需通过该变量，控制退出登录按钮的存在与否，若未查到信息，在index页面置空，防止造成死循环。
                  app.data.zjbzxbm = this.data.citybm;
                  this.getissue();//获取token令牌
                } else {
                  my.alert({
                    title: '提示',
                    content: res.msg
                  });
                }

              } else {
                my.alert({
                  title: '提示',
                  content: '授权信息获取失败'
                });
              }

            },
            fail: () => {
              my.alert({
                title: '提示',
                content: '授权失败，请重新授权登录'
              });
            }
          });
          //   将城市信息放入缓存
          my.setStorage({
            key: 'city',
            data: {
              citybm: this.data.citybm,

            }
          });

        },
      });
    }

  },
  getissue() {
    my.getStorage({ //读取token_issue缓存信息
      key: 'token_issue',
      success(result) {
        let jg_time, yx_time;
        if (result.data == null) {
          jg_time = 1; yx_time = 0;
        } else {
          jg_time = app.CurentTime() - result.data.hc_sytime; //记和上次登陆生成令牌间隔时间（毫秒）
          yx_time = (result.data.expire - app.data.hctime) * 1000; //app.data.hctime缓存时间在app.js中手动修改;yx_time有效时间
        }

        if (result.data != null && jg_time < yx_time && result.data.zjhm == app.data.zjhm) {//有缓存且缓存生成令牌没有失去时效，且是同一个用户
          app.data.token = result.data.token;
          app.data.grkey = result.data.grkey;
          app.data.pdsfdl = true;
          my.reLaunch({
            url: '/pages/index/index', // 页面路径。如果页面不为 tabbar 页面则路径后可以带参数。参数规则如下：路径与参数之间使用
          });

        } else {
          var obj = new Object();
          obj.xingming = app.data.xingming;
          obj.zjhm = app.data.zjhm;
          obj.appid = app.data.appid;
          obj.zjbzxbm = app.data.zjbzxbm;
          obj.citybm = app.data.zjbzxbm;
          obj.sign = app.getSign(obj, app.data.pkey);
          var obj1 = new Object();
          obj1.data = app.EncryptBASE64(JSON.stringify(obj), app.data.pkey);
          obj1.appid = app.data.appid;
          obj1.citybm = app.data.zjbzxbm;
          obj1.sign = app.getSign(obj1, app.data.pkey);
          my.request({
            url: app.data.url + '/app-web/public/token/issue.service',
            method: 'POST',
            headers: {
              "Content-Type": "application/json",
              "citycode": app.data.zjbzxbm,
              "appid": app.data.appid
            },
            data: JSON.stringify(obj1),
            dataType: 'json',
            contentType: 'application/json;charset=UTF-8', //contentType很重要  
            success: (res) => {
              console.log("issue_res", res);
              if (res.data.ret == 0) {
                var result = app.Decrypt(res.data.data, app.data.pkey);
                console.log("令牌返回解密：：", result);
                app.data.token = result.token;
                app.data.grkey = result.grkey;
                //将当前令牌信息放入缓存
                my.setStorage({
                  key: 'token_issue',
                  data: {
                    expire: result.expire,
                    grkey: result.grkey,
                    token: result.token,
                    hc_sytime: app.CurentTime(),
                    zjhm: app.data.zjhm//增加zjhm缓存，判断换用户登录情况
                  }
                });
                app.data.pdsfdl = true;
                my.reLaunch({
                  url: '/pages/index/index', // 页面路径。如果页面不为 tabbar 页面则路径后可以带参数。参数规则如下：路径与参数之间使用
                });
              } else {
                my.alert({
                  title: '提示',
                  content: '查无您的信息，请确认所选公积金中心'
                });
              }

            },
            fail: () => {
              my.alert({
                title: '提示',
                content: '授权信息获取失败，请重新登录'
              });
              my.removeStorage({
                key: 'token_issue',
                success: function() {

                }
              });
            }

          })
        }
      },
    });
  },
  account: function(e) {
    this.data.accouint = e.detail.value;
  },
  password: function(e) {
    this.data.password = e.detail.value;
  },
  changeimage(e) {
    var num = e.detail.current;
    var source = e.detail.source;
    this.setData({
      current: num,
    })
  },
  lunbotu(e) {
    let guanggaourl = e.currentTarget.dataset.value
    console.log(guanggaourl);
    app.setGuanggaourl(guanggaourl);
    my.navigateTo({ url: '../pages/guanggao/guanggao' });
  },
});
