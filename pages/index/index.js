const app = getApp();
const jkhtbh = [];
const dkxx = [];
const grzhxx = [];
let grzhxx1 = [];
let wddk = [];
let gjjxxArr = [];
let grzhye1;
Page({
  data: {
    // tabbar:{},     //放在data中
    canUse: my.canIUse('lifestyle'),
    grzhye: 0,
    grzh: '',
    grzhzt: '',
    flag: true,
    flag1: false,
    flag2: false,
    flag3: false,
    flagdkzt: '',
    flagdkzt1: 0,
    dkzt: '',
    indexgrzh: 0,
    xingming: '',
    notlogged_img:app.data.url+'/alipay/img/icon_zhcx_notlogged.png',//index未登录图片
    // 轮播图变量
    images: [],
    indicatorDots: true,
    autoplay: true,
    interval: 3000,
    current: 1, //默认显示第几张,0为第一张
    circular: true,
    //缴存提取
    zjjce: '0.00',
    zjjcrq: '',
    zjtqe: '0.00',
    zjtqrq: '',

    dkye: 0,
    dkffe: 0,

    //新版本添加贷款字段显示
    dkztmc: '',
    dkyemc: '',
    dkffemc: '',
    jkhtbhmc: '',
    jkrgjjzhmc: '',
    yhrqmc: '',
    yhbjmc: '',
    yhlxmc: '',
    yhbxhjmc: '',
    pdsfdl: true,
  },

  gjjxxcx() {
    my.navigateTo({ url: '../zhxx/zhxx?grzh=' + this.data.grzh });
  },
  tapName(event) {
    if (this.data.flag) {
      this.setData({ grzhye: "*****" });
    } else {
      this.setData({ grzhye: app.fmoney(grzhye1) });
    }
    this.setData({
      flag: !this.data.flag
    })
  },
  sqdltab() {
    app.data.jmtzbz = '/index/index',
      my.navigateTo({ url: '/citychose/citychose' });
  },
  onShow() {
    my.setNavigationBar({
      title: '账户查询',
    });
    },

    onLoad() {
    console.log(">>>>>>xingming:",app.data.xingming)
    this.setData({
      pdsfdl: app.data.pdsfdl,
    });
    console.log("pdsfdl<<<<<<", app.data.pdsfdl);
    if (app.data.pdsfdl) {
      this.setData({
        xingming:app.data.xingming,
        images: [
          { imgUrl: app.data.url + '/alipay/common/banna/banna3.jpg?citycode=' + app.data.zjbzxbm+ '&date=' + new Date().getTime(), url: app.data.url + '/alipay/common/banna/banna3.html?citycode=' + app.data.zjbzxbm + '&date=' + new Date().getTime(), style: 'banna' },
          { imgUrl: app.data.url + '/alipay/ywbl/ndzd/ndzd_banner.png'+ '&date=' + new Date().getTime(), url: app.data.url + '/alipay/ywbl/ndzd/index.html', style: 'ndzd' },
          { imgUrl: app.data.url + '/alipay/common/banna/banna1.jpg?citycode=' + app.data.zjbzxbm+ '&date=' + new Date().getTime(), url: app.data.url + '/alipay/common/banna/banna1.html?citycode=' + app.data.zjbzxbm + '&date=' + new Date().getTime(), style: 'banna' },
          // { imgUrl: app.data.url + '/alipay/common/banna/banna2.jpg?citycode=' + app.data.zjbzxbm, url: app.data.url + '/alipay/common/banna/banna2.html?citycode=' + app.data.zjbzxbm + '&date=' + new Date().getTime(), style:'banna' },
        ],
      });
      this.gjjdkjbxxcx(this);
    }
  },

  //下拉刷新
  onPullDownRefresh() {
    //判断是否登录状态
    //刷新
    if (app.data.pdsfdl) {
      this.gjjdkjbxxcx(this);
    }

    my.stopPullDownRefresh();
  },
  //公积金贷款进本信息查询
  gjjdkjbxxcx: (that) => {
    that.zhcxinfo(that);
    var obj = new Object();
    obj.appid = app.data.appid;
    obj.zjbzxbm = app.data.zjbzxbm;
    obj.xingming = app.data.xingming;
    obj.zjhm = app.data.zjhm;
    obj.login_way ='05';
    obj.sign = app.getSign(obj, app.data.pkey)

    var obj1 = new Object();
    obj1.data = app.EncryptBASE64(JSON.stringify(obj), app.data.grkey);
    obj1.appid = app.data.appid;
    obj1.citybm = app.data.zjbzxbm;
    obj1.sign = app.getSign(obj1, app.data.pkey);

    my.request({
      url: app.data.url + '/app-web/personal/public/gjjdkjbxxcx.service?token=' + app.data.token,
      //url: 'http://192.168.54.64:8000/app-web/personal/public/gjjdkjbxxcx.service?token='+app.data.token,
      method: 'POST',
      headers: {
        "Content-Type": "application/json",
        "citycode": app.data.zjbzxbm,
        "appid": app.data.appid
      },
      data: JSON.stringify(obj1),
      dataType: 'json',
      contentType: 'application/json;charset=UTF-8', //contentType很重要    
      success: (result) => {
        console.log("gjjdkjbxxcx接口返回结果res ：", result);
        if (result.data.ret != '0') {
          my.alert({
            title: "提示",
            content: result.data.msg,
            success: () => {
              app.data.urls = "";//如 从城服进入，没有查到信息，需置空urls。否则导致死循环。
              app.data.pdsfdl = false;
              my.removeStorage({
                key: 'token_issue',
                success: function() {
                }
              });
              my.reLaunch({
                url: '/citychose/citychose'
              });
            }
          });
          return;
        }
        var res = app.Decrypt(result.data.data, app.data.grkey);
        console.log("返回结果解密：：", res);

        if (res.data == null) {
          my.alert({
            title: "提示",
            content: '未查询到您的公积金信息!',
            success: () => {
              //my.navigateBack();
              app.data.urls = "";//如 从城服进入，没有查到信息，需置空urls。否则导致死循环。
              app.data.pdsfdl = false;
              my.reLaunch({
                url: '/pages/index/index'
              });
            }
          });
        } else {
          grzhye1 = res.data[0].gjjxx[0].grzhye
          that.setData({
            flag: true,
            grzhye: app.fmoney(grzhye1),
            grzh: res.data[0].gjjxx[0].grzh,
            grzhzt: res.data[0].gjjxx[0].grzhzt,
          });
          app.setDwmc(res.data[0].gjjxx[0].dwmc);
          app.setGrzh(res.data[0].gjjxx[0].grzh);
          if (res.data[0].dkxx.length > 0) {
            app.setJkhtbh(res.data[0].dkxx[0].jkhtbh);
            for (var i = 0; i < res.data[0].dkxx.length; i++) {
              jkhtbh[i] = res.data[0].dkxx[i].jkhtbh;
              dkxx[i] = res.data[0].dkxx[i].jkhtbh + " " + res.data[0].dkxx[i].dkzt;
            }
          }
          // console.log(res.data[0].gjjxx.length);
          if (res.data[0].gjjxx.length > 1) {
            that.setData({
              flag1: true
            })
          }
          console.log('贷款信息：', res.data[0].dkxx.length);
          let flagdkzt2 = 0;
          if (res.data[0].dkxx.length > 0) {
            if (res.data[0].dkxx[0].dkzt == '正常还款' || res.data[0].dkxx[0].dkzt == '逾期还款') {
              flagdkzt2 = 1;
            } else {
              flagdkzt2 = 0;
            }
            if (res.data[0].dkxx.length > 1) {
              that.setData({
                dkzt: res.data[0].dkxx[0].dkzt,
                dkye: res.data[0].dkxx[0].dkye,
                dkffe: res.data[0].dkxx[0].dkffe,
                flag2: true,
                flag3: true,
                flagdkzt: res.data[0].dkxx[0].dkzt,
                flagdkzt1: flagdkzt2,

                dkztmc: res.data[0].dkxx[0].dkzt,
                dkyemc: app.fmoney(res.data[0].dkxx[0].dkye),
                dkffemc: app.fmoney(res.data[0].dkxx[0].dkffe),
              });
            } else {
              that.setData({
                dkzt: res.data[0].dkxx[0].dkzt,
                dkye: res.data[0].dkxx[0].dkye,
                dkffe: res.data[0].dkxx[0].dkffe,
                flag2: true,
                flagdkzt: res.data[0].dkxx[0].dkzt,
                flagdkzt1: flagdkzt2,


                dkztmc: res.data[0].dkxx[0].dkzt,
                dkyemc: app.fmoney(res.data[0].dkxx[0].dkye),
                dkffemc: app.fmoney(res.data[0].dkxx[0].dkffe),
              });
            }
          }
          grzhxx1 = [];
          for (var i = 0; i < res.data[0].gjjxx.length; i++) {
            grzhxx1.push(res.data[0].gjjxx[i]);
            grzhxx[i] = res.data[0].gjjxx[i].grzh + " " + res.data[0].gjjxx[i].grzhzt;
          }

        }
      },
      fail: function(result) {
        app.data.pdsfdl = false;
        my.alert({
          title: "提示",
          content: '服务正在维护。。。',
          success: () => {
            my.removeStorage({
              key: 'token_issue',
              success: function() {
              }
            });
            my.reLaunch({
              url: '/citychose/citychose'
            });
          }
        });
      },
    });
  },

  //账户信息查询
  zhcxinfo: (that) => {
    var obj = new Object();
    obj.appid = app.data.appid;
    obj.zjbzxbm = app.data.zjbzxbm;
    obj.citybm = app.data.zjbzxbm;
    obj.xingming = app.data.xingming;
    obj.zjhm = app.data.zjhm;
    obj.login_way ='05';
    obj.sign = app.getSign(obj, app.data.pkey)

    var obj1 = new Object();
    obj1.data = app.EncryptBASE64(JSON.stringify(obj), app.data.grkey);
    obj1.appid = app.data.appid;
    obj1.citybm = app.data.zjbzxbm;
    obj1.sign = app.getSign(obj1, app.data.pkey);

    my.request({
      url: app.data.url + '/app-web/public/zhcx/info.service?token=' + app.data.token,
      method: 'POST',
      headers: {
        "Content-Type": "application/json",
        "citycode": app.data.zjbzxbm,
        "appid": app.data.appid
      },
      data: JSON.stringify(obj1),
      dataType: 'json',
      contentType: 'application/json;charset=UTF-8', //contentType很重要    
      success: (result) => {
        console.log("info接口返回结果res ：", result);
        if (result.data.ret != '0') {
          my.alert({
            title: "提示",
            content: result.data.msg,
            success: () => {
              app.data.urls = "";//如 从城服进入，没有查到信息，需置空urls。否则导致死循环。
              app.data.pdsfdl = false;
              my.removeStorage({
                key: 'token_issue',
                success: function() {
                }
              });
              my.reLaunch({
                url: '/citychose/citychose'
              });
            }
          });
          return;
        }
        var res = app.Decrypt(result.data.data, app.data.grkey);
        console.log("返回结果解密：：", res);

        if (res.ret == 0) {
          if (res.data[0].dkxx.length > 0) {
            console.log("我的贷款", res.data[0].dkxx);
            that.setData({
              jkhtbhmc: res.data[0].dkxx[0].jkhtbh,
              jkrgjjzhmc: res.data[0].dkxx[0].jkrgjjzh,
              yhrqmc: res.data[0].dkxx[0].yhrq,
              yhbjmc: app.fmoney(res.data[0].dkxx[0].yhbj),
              yhlxmc: app.fmoney(res.data[0].dkxx[0].yhlx),
              yhbxhjmc: app.fmoney(res.data[0].dkxx[0].yhbxhj),
            });
          }
          for (var i = 0; i < res.data[0].dkxx.length; i++) {
            console.log("res.data[0].dkxx", res.data[0].dkxx[i]);
            wddk.push(res.data[0].dkxx[i]);
          }
          gjjxxArr = [];
          for (var i = 0; i < res.data[0].gjjxx.length; i++) {
            gjjxxArr.push(res.data[0].gjjxx[i]);
          }
          if (gjjxxArr.length > 0) {
            var gjjxxmx = gjjxxArr[0];
            var zjjce = 0.00;
            var zjjcrq = "";
            var zjtqe = 0.00;
            var zjtqrq = "";
            if (gjjxxmx.zjjce.length > 0) {
              zjjce = app.fmoney(gjjxxmx.zjjce);
              zjjcrq = gjjxxmx.zjjcrq;
            } else {
              zjjce = app.fmoney(0.00);
              zjjcrq = "";
            }
            if (gjjxxmx.zjtqe.length > 0) {
              zjtqe = app.fmoney(gjjxxmx.zjtqe);
              zjtqrq = gjjxxmx.zjtqrq;
            } else {
              zjtqe = app.fmoney(0.00);
              zjtqrq = "";
            }
            that.setData({
              zjjce: zjjce,
              zjjcrq: zjjcrq,
              zjtqe: zjtqe,
              zjtqrq: zjtqrq,
            });
          }
        }
      },
    });
  },

  //缴存提取信息
  zjjctqxx: (that) => {
    for (var i = 0; i < gjjxxArr.length; i++) {
      if (app.data.grzh == gjjxxArr[i].grzh) {
        var gjjxxmx = gjjxxArr[i];
      }
    }
    var zjjce = 0.00;
    var zjjcrq = "";
    var zjtqe = 0.00;
    var zjtqrq = "";
    if (gjjxxmx.zjjce.length > 0) {
      zjjce = app.fmoney(gjjxxmx.zjjce);
      zjjcrq = gjjxxmx.zjjcrq;
    } else {
      zjjce = app.fmoney(0.00);
      zjjcrq = "";
    }
    if (gjjxxmx.zjtqe.length > 0) {
      zjtqe = app.fmoney(gjjxxmx.zjtqe);
      zjtqrq = gjjxxmx.zjtqrq;
    } else {
      zjtqe = app.fmoney(0.00);
      zjtqrq = "";
    }
    that.setData({
      zjjce: zjjce,
      zjjcrq: zjjcrq,
      zjtqe: zjtqe,
      zjtqrq: zjtqrq,
    });
  },

  //切换账号
  qhzh() {
    my.showActionSheet({
      title: '请选择您的个人账号',
      items: grzhxx,
      cancelButtonText: '取消',
      success: (res) => {
        if (res.index != -1) {
          let i = res.index;
          this.setData({
            flag: true,
            grzhye: app.fmoney(grzhxx1[i].grzhye),
            grzh: grzhxx1[i].grzh,
            grzhzt: grzhxx1[i].grzhzt,
          });
          grzhye1 = grzhxx1[i].grzhye;
          app.setGrzh(grzhxx1[i].grzh)
          app.setDwmc(grzhxx1[i].dwmc);
          this.zjjctqxx(this);
        }
      },
    });
  },

  //跳转最近缴存明细
  zjjccx() {
    my.setStorage({
      key: "djxx",
      data: {
        type: "zjjccx",
        grzh: this.data.grzh
      },
      success: (res) => {
        my.navigateTo({ url: '../jczqxx/jczqxx' });
      },
    });
  },

  //跳转最近提取明细
  zjtqcx() {
    my.setStorage({
      key: "djxx",
      data: {
        type: "zjtqcx",
        grzh: this.data.grzh
      },
      success: (res) => {
        my.navigateTo({ url: '../jczqxx/jczqxx' });
      },
    });
  },
  changeimage(e) {
    var num = e.detail.current;
    var source = e.detail.source;
    this.setData({
      current: num,
    })
    //console.log(num, source)
  },

  //轮播图
  lunbotu(e) {
    let guanggaourl = e.currentTarget.dataset.value.url;
    console.log(guanggaourl);
    if (e.currentTarget.dataset.value.style == 'ndzd') {
      my.navigateTo({ url: '../ywbl/yw/ywmx/ywmx?style=ndzd&location=index&ywbm=ywbl/ndzd/index.html' })
    } else if (e.currentTarget.dataset.value.style == 'banna') {
      app.setGuanggaourl(guanggaourl);
      my.navigateTo({ url: '../guanggao/guanggao' });
    }
  },

  //跳转贷款明细
  redirectTo() {
    my.navigateTo({ url: '../dkxx/dkxx' })
  },

  //选择借款合同编号
  xzdk() {
    my.showActionSheet({
      title: '请选择您的借款合同编号',
      items: dkxx,
      cancelButtonText: '取消',
      success: (res) => {
        if (res.index != -1) {
          let i = res.index;
          let flagdkzt2 = 0;
          // console.log("index",i);
          // console.log("index",wddk);
          if (wddk[i].dkzt == '正常还款' || wddk[i].dkzt == '逾期还款') {
            flagdkzt2 = 1;
          } else {
            flagdkzt2 = 0;
          }
          this.setData({
            flagdkzt1: flagdkzt2,
            flagdkzt: wddk[i].dkzt,

            dkztmc: wddk[i].dkzt,
            dkyemc: app.fmoney(wddk[i].dkye),
            dkffemc: app.fmoney(wddk[i].dkffe),
            jkhtbhmc: wddk[i].jkhtbh,
            jkrgjjzhmc: wddk[i].jkrgjjzh,
            yhrqmc: wddk[i].yhrq,
            yhbjmc: app.fmoney(wddk[i].yhbj),
            yhlxmc: app.fmoney(wddk[i].yhlx),
            yhbxhjmc: app.fmoney(wddk[i].yhbxhj),


          });
          app.data.jkhtbh = wddk[i].jkhtbh;
        }
      },
    });
  },
})
