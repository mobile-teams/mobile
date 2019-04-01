const app = getApp();

Page({
  data: {
    xzcs: '../image/cityImg/001.png',
    citybm: '',
    xzcsflag: '0',
    iscf: true,
    list3: [
      {
        icon: '../image/icon/03.png',
        text: '缴存信息',
      },
      {
        icon: '../image/icon/gjjtq.png',
        text: '提取信息',
      },
      {
        icon: '../image/icon/dkyw.png',
        text: '贷款信息',
      },
      {
        icon: '../image/icon/ffwdcx.png',
        text: '服务网点查询',
      },
      {
        icon: '../image/icon/fdjsq.png',
        text: '房贷计算器',
      },
      {
        icon: '../image/icon/mine.png',
        text: '个人信息',
      },
    ],
    // 轮播图变量
    images: [],
    indicatorDots: true,
    autoplay: true,
    interval: 3000,
    current: 1, //默认显示第几张,0为第一张
    circular: true,
  },

  onLoad() {
    console.log("___>" + my.canIUse('hideBackHome'));
    let that = this;
    if (app.data.zjbzxbm != "") {//判断是否从城市选择页面返回
      console.log("城市列表返回：", app.data.zjbzxbm)
      this.setData({
        //xzcs: "../image/cityImg/"+res.adCode.substr(0, 6)+".png",
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
            console.log(res);
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
            console.log("this.data.citybm", that.data.citybm);
          }
        },
      });
    }
    console.log("城市服务标志app.data.urls", app.data.urls);
    if (app.data.urls != "") {
      this.sqdl();
      this.setData({
        iscf: false,
      })
    }
  },
  csxz() {
    console.log("单击选择城市");
    my.navigateTo({
      url: '/city/city',
    });
  },
  //授权登陆
  sqdl() {
    let cs = this.data.xzcsflag;
    if (cs == '0') {
      my.alert({
        title: '请选择公积金城市'
      });
      return;
    } else {

      my.getAuthCode({
        scopes: 'auth_user',
        success: ({ authCode }) => {
          console.log("获取用户授权码：", authCode);
          //获取用户姓名证件号码
          var obj = new Object();
          obj.appid = app.data.appid;
          obj.authCode = authCode;
          obj.citybm = "CSY001";
          obj.sign = app.getSign(obj, app.data.pkey)
          console.log("测试输出");
          console.log("getSign::", app.getSign(obj, app.data.pkey));
          console.log("JSON.stringify(obj):::", JSON.stringify(obj))
          my.request({
            url: app.data.urlsc + '/app-web/personal/common/alitoken.service',
            //url:'http://192.168.54.77:8089/app-web/public/common/alitoken.service',
            method: 'POST',
            headers: {
              "Content-Type": "application/json",
              "citycode": "CSY001"
            },
            data: JSON.stringify(obj),
            dataType: 'json',
            contentType: 'application/json;charset=UTF-8', //contentType很重要    
            success: (res) => {
              console.log("获取信息接口返回：", res.data.param);
              //console.log("---",res.data.param);
              app.data.xingming = res.data.param.userName;
              app.data.zjhm = res.data.param.certNo;
              app.setZjbzxbm(this.data.citybm);
              //app.data.urls = "";  初次登入不再置空，需通过该变量，控制退出登录按钮的存在与否，若未查到信息，在index页面置空，防止造成死循环。
              // my.redirectTo({ url: '../pages/index/index' });
              my.switchTab({ url: '/pages/index/index' });
            },
            fail: () => {
              my.alert({
                title: '授权失败，请重新授权登录'
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
  account: function (e) {
    this.data.accouint = e.detail.value;
    console.log(this.data.accouint);
  },
  password: function (e) {
    this.data.password = e.detail.value;
    console.log(this.data.password);
  },
  changeimage(e) {
    var num = e.detail.current;
    var source = e.detail.source;
    this.setData({
      current: num,
    })
    //console.log(num, source)
  },
  lunbotu(e) {
    let guanggaourl = e.currentTarget.dataset.value
    console.log(guanggaourl);
    app.setGuanggaourl(guanggaourl);
    my.navigateTo({ url: '../pages/guanggao/guanggao' });
  },
});
