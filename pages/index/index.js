const app = getApp();
const jkhtbh = [];
const dkxx = [];
const grzhxx = [];
const grzhxx1 = [];
const wddk = [];

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
    array: {
      grzhye: [],
      grzhzt: [],
      grzh: [],
      dwmc: []
    },
    indexgrzh: 0,

    // 轮播图变量
    images: [],
    indicatorDots: true,
    autoplay: true,
    interval: 3000,
    current: 1, //默认显示第几张,0为第一张
    circular: true,
    //缴存提取
    zjjcje: '0.00',
    zjjcsj: '',
    zjtqje: '0.00',
    zjtqsj: '',
    //贷款圈圈
    witch: 100,//
    percent: 0,//百分比
    pros: 0,//用于计数进程

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
  onLoad() {
    this.setData({
      images: [
        { imgUrl: app.data.url + '/alipay/common/banna/banna1.jpg?citycode=' + app.data.zjbzxbm, url: app.data.url + '/alipay/common/banna/banna1.html?citycode=' + app.data.zjbzxbm },
        { imgUrl: app.data.url + '/alipay/common/banna/banna2.jpg?citycode=' + app.data.zjbzxbm, url: app.data.url + '/alipay/common/banna/banna2.html?citycode=' + app.data.zjbzxbm },
        { imgUrl: app.data.url + '/alipay/common/banna/banna3.jpg?citycode=' + app.data.zjbzxbm, url: app.data.url + '/alipay/common/banna/banna3.html?citycode=' + app.data.zjbzxbm },
      ],
    });
    //  app.editTabBar(); //放在onLoad中
    var obj = new Object();
    obj.appid = app.data.appid;
    obj.zjbzxbm = app.data.zjbzxbm;
    obj.xingming = app.data.xingming;
    obj.zjhm = app.data.zjhm;
    obj.sign = app.getSign(obj, app.data.pkey)
    my.request({
      url: app.data.url + '/app-web/personal/public/gjjdkjbxxcx.service',
      method: 'POST',
      headers: {
        "Content-Type": "application/json",
        "citycode": app.data.zjbzxbm
      },
      data: JSON.stringify(obj),
      dataType: 'json',
      contentType: 'application/json;charset=UTF-8', //contentType很重要    
      success: (res) => {

        // console.log(res);
        // console.log(">>>>>>",res.data);
        // console.log("=====",res.data.data)
        if (res.data.data == null) {
          my.alert({
            title: "提示",
            content: '未查询到您的公积金信息!',
            success: () => {
              //my.navigateBack();
              app.data.urls = "";//如 从城服进入，没有查到信息，需置空urls。否则导致死循环。
              my.redirectTo({ url: '../../citychose/citychose' });
            }
          });
        } else {
          grzhye1 = res.data.data[0].gjjxx[0].grzhye
          this.setData({
            grzhye: app.fmoney(grzhye1),
            grzh: res.data.data[0].gjjxx[0].grzh,
            grzhzt: res.data.data[0].gjjxx[0].grzhzt,
          });
          app.setDwmc(res.data.data[0].gjjxx[0].dwmc);
          app.setGrzh(res.data.data[0].gjjxx[0].grzh);
          if (res.data.data[0].dkxx.length > 0) {
            app.setJkhtbh(res.data.data[0].dkxx[0].jkhtbh);
            for (var i = 0; i < res.data.data[0].dkxx.length; i++) {
              jkhtbh[i] = res.data.data[0].dkxx[i].jkhtbh;
              dkxx[i] = res.data.data[0].dkxx[i].jkhtbh + " " + res.data.data[0].dkxx[i].dkzt;
            }
          }
          // console.log(res.data.data[0].gjjxx.length);
          if (res.data.data[0].gjjxx.length > 1) {
            this.setData({
              flag1: true
            })
          }
          console.log('贷款信息：', res.data.data[0].dkxx.length);
          let flagdkzt2 = 0;
          if (res.data.data[0].dkxx.length > 0) {
            if (res.data.data[0].dkxx[0].dkzt == '正常还款' || res.data.data[0].dkxx[0].dkzt == '逾期还款') {
              flagdkzt2 = 1;
            } else {
              flagdkzt2 = 0;
            }
            //.log("333333333333",this.data.flagdkzt1);
            if (res.data.data[0].dkxx.length > 1) {
              this.setData({
                dkzt: res.data.data[0].dkxx[0].dkzt,
                dkye: res.data.data[0].dkxx[0].dkye,
                dkffe: res.data.data[0].dkxx[0].dkffe,
                percent: (res.data.data[0].dkxx[0].dkye * 10) / (res.data.data[0].dkxx[0].dkffe),
                flag2: true,
                flag3: true,
                flagdkzt: res.data.data[0].dkxx[0].dkzt,
                flagdkzt1: flagdkzt2,


                dkztmc: res.data.data[0].dkxx[0].dkzt,
                dkyemc: app.fmoney(res.data.data[0].dkxx[0].dkye),
                dkffemc: app.fmoney(res.data.data[0].dkxx[0].dkffe),
              });
            } else {
              this.setData({
                dkzt: res.data.data[0].dkxx[0].dkzt,
                dkye: res.data.data[0].dkxx[0].dkye,
                dkffe: res.data.data[0].dkxx[0].dkffe,
                percent: (res.data.data[0].dkxx[0].dkye * 10) / (res.data.data[0].dkxx[0].dkffe),
                flag2: true,
                flagdkzt: res.data.data[0].dkxx[0].dkzt,
                flagdkzt1: flagdkzt2,


                dkztmc: res.data.data[0].dkxx[0].dkzt,
                dkyemc: app.fmoney(res.data.data[0].dkxx[0].dkye),
                dkffemc: app.fmoney(res.data.data[0].dkxx[0].dkffe),
              });
            }
            //this.jdjz(this);
          }
          for (var i = 0; i < res.data.data[0].gjjxx.length; i++) {
            // this.$spliceData({ "array.grzh": [0, 0, res.data.data[0].gjjxx[i].grzh] });
            // this.$spliceData({ "array.grzhzt": [0, 0, res.data.data[0].gjjxx[i].grzhzt] });
            // this.$spliceData({ "array.grzhye": [0, 0, res.data.data[0].gjjxx[i].grzhye] });
            // this.$spliceData({ "array.dwmc": [0, 0, res.data.data[0].gjjxx[i].dwmc] }); 
            grzhxx1.push(res.data.data[0].gjjxx[i]);
            grzhxx[i] = res.data.data[0].gjjxx[i].grzh + " " + res.data.data[0].gjjxx[i].grzhzt;
          }
          // console.log("-----", this.data.array.grzhye);
          //最近缴存提取查询

          var obj = new Object();
          obj.appid = app.data.appid;
          obj.zjbzxbm = app.data.zjbzxbm;
          obj.grzh = app.data.grzh;
          obj.ksrq = app.getTwoYearAgoFormatDate();
          obj.jsrq = app.getNowFormatDate();
          obj.sign = app.getSign(obj, app.data.pkey)

          my.request({
            url: app.data.url + '/app-web/personal/public/gjjywmxcx.service',
            method: 'POST',
            headers: {
              "Content-Type": "application/json",
              "citycode": app.data.zjbzxbm
            },
            data: JSON.stringify(obj),
            dataType: 'json',
            contentType: 'application/json;charset=UTF-8', //contentType很重要    
            success: (res) => {
              if (res.data.data == null) {
                my.alert({
                  title: "提示",
                  content: '缴存支取信息查询为空!',
                });
              } else {
                let jczqxx = res.data.data;
                console.log("jczqxx", jczqxx);
                if (jczqxx == null) {
                  that.setData({
                    zjjcje: '0.00',
                    zjjcsj: '',
                    zjtqje: '0.00',
                    zjtqsj: ''
                  });
                  return;
                }
                jczqxx.sort(function (a, b) {
                  return Date.parse(a.ywfsrq) - Date.parse(b.ywfsrq);
                });
                let jcxx = [];
                let zqxx = [];
                let a = 0; let b = 0; let c = 0;
                let s;
                for (let i = 0; i < jczqxx.length; i++) {
                  s = {};
                  s.ywfsrq = jczqxx[i].ywfsrq;
                  s.ywzy = jczqxx[i].ywzy;
                  s.yue = app.fmoney(jczqxx[i].yue);
                  s.fse = app.fmoney(jczqxx[i].fse);
                  if (jczqxx[i].ywlx == "缴存") {
                    jcxx[a] = s;
                    a++;
                    continue;
                  } else if (jczqxx[i].ywlx == "提取") {
                    zqxx[b] = s;
                    b++;
                    continue;
                  }
                }
                if (jcxx.length == 0) {
                  this.setData({
                    zjjcje: '0.00',
                    zjjcsj: ''
                  });
                } else {
                  this.setData({
                    zjjcje: jcxx[jcxx.length - 1].fse,
                    zjjcsj: jcxx[jcxx.length - 1].ywfsrq
                  });
                }
                if (zqxx.length == 0) {
                  this.setData({
                    zjtqje: '0.00',
                    zjtqsj: ''
                  });
                } else {
                  this.setData({
                    zjtqje: zqxx[zqxx.length - 1].fse,
                    zjtqsj: zqxx[zqxx.length - 1].ywfsrq
                  });
                }
                my.hideLoading();
              }
            },
            fail: (res) => {

              console.log("app.data.grzh", app.data.grzh);
              console.log("app.data.zjbzxbm", app.data.zjbzxbm);
              my.hideLoading();
              console.log("res", res);
              my.alert({ content: "缴存支取信息查询失败！" });
            },
          });
        }
      },
      fail: function (res) {
        my.alert({
          title: "提示",
          content: '服务正在维护。。。',
          success: () => {
            //my.navigateBack();
            my.redirectTo({ url: '../../citychose/citychose' });
          }
        });
      },
    });
    var obj = new Object();
    obj.appid = app.data.appid;
    obj.zjbzxbm = app.data.zjbzxbm;
    obj.citybm = app.data.zjbzxbm;
    obj.xingming = app.data.xingming;
    obj.zjhm = app.data.zjhm;
    obj.sign = app.getSign(obj, app.data.pkey)
    my.request({
      url: app.data.url + '/app-web/public/zhcx/info.service',
      method: 'POST',
      headers: {
        "Content-Type": "application/json",
        "citycode": app.data.zjbzxbm
      },
      data: JSON.stringify(obj),
      dataType: 'json',
      contentType: 'application/json;charset=UTF-8', //contentType很重要    
      success: (res) => {
        if (res.data.ret == 0) {
          if (res.data.data[0].dkxx.length > 0) {
            console.log("我的贷款", res.data.data[0].dkxx);
            this.setData({
              yhrq: res.data.data[0].dkxx[0].yhrq,
              yhbxhj: app.fmoney(res.data.data[0].dkxx[0].yhbxhj),
              //dkffe : res.data.data[0].dkxx[0].dkffe,
              //dkye : res.data.data[0].dkxx[0].dkye,

              jkhtbhmc: res.data.data[0].dkxx[0].jkhtbh,
              jkrgjjzhmc: res.data.data[0].dkxx[0].jkrgjjzh,
              yhrqmc: res.data.data[0].dkxx[0].yhrq,
              yhbjmc: app.fmoney(res.data.data[0].dkxx[0].yhbj),
              yhlxmc: app.fmoney(res.data.data[0].dkxx[0].yhlx),
              yhbxhjmc: app.fmoney(res.data.data[0].dkxx[0].yhbxhj),
            });
          }
          for (var i = 0; i < res.data.data[0].dkxx.length; i++) {
            console.log("res.data.data[0].dkxx", res.data.data[0].dkxx[i]);
            wddk.push(res.data.data[0].dkxx[i]);
          }
        }
      },
    });
  },
  load: (that) => {
    var obj = new Object();
    obj.appid = app.data.appid;
    obj.zjbzxbm = app.data.zjbzxbm;
    obj.xingming = app.data.xingming;
    obj.zjhm = app.data.zjhm;
    obj.sign = app.getSign(obj, app.data.pkey)
    my.request({
      url: app.data.url + '/app-web/personal/public/gjjdkjbxxcx.service',
      method: 'POST',
      headers: {
        "Content-Type": "application/json",
        "citycode": app.data.zjbzxbm
      },
      data: JSON.stringify(obj),
      dataType: 'json',
      contentType: 'application/json;charset=UTF-8', //contentType很重要    
      success: (res) => {
        // console.log(res);
        grzhye1 = res.data.data[0].gjjxx[0].grzhye
        that.setData({
          grzhye: app.fmoney(grzhye1),
          grzh: res.data.data[0].gjjxx[0].grzh,
          grzhzt: res.data.data[0].gjjxx[0].grzhzt,
          flag: true,
        });
        app.setGrzh(res.data.data[0].gjjxx[0].grzh)
        that.zjjctqxx(that);
        //app.setJkhtbh(res.data.data[0].dkxx[0].jkhtbh)
      }
    });
  },
  zjjctqxx: (that) => {
    //最近缴存提取查询
    console.log('最近缴存提取查询', app.data.grzh);
    var obj = new Object();
    obj.appid = app.data.appid;
    obj.zjbzxbm = app.data.zjbzxbm;
    obj.grzh = app.data.grzh;
    obj.ksrq = app.getTwoYearAgoFormatDate();
    obj.jsrq = app.getNowFormatDate();
    obj.sign = app.getSign(obj, app.data.pkey)
    my.request({
      url: app.data.url + '/app-web/personal/public/gjjywmxcx.service',
      method: 'POST',
      headers: {
        "Content-Type": "application/json",
        "citycode": app.data.zjbzxbm
      },
      data: JSON.stringify(obj),
      dataType: 'json',
      contentType: 'application/json;charset=UTF-8', //contentType很重要    
      success: (res) => {
        // console.log("&&&");
        // console.log(res);
        let jczqxx = res.data.data;
        if (jczqxx == null) {
          that.setData({
            zjjcje: '0.00',
            zjjcsj: '',
            zjtqje: '0.00',
            zjtqsj: ''
          });
          return;
        }
        jczqxx.sort(function (a, b) {
          return Date.parse(a.ywfsrq) - Date.parse(b.ywfsrq);
        });
        let jcxx = [];
        let zqxx = [];
        let a = 0; let b = 0; let c = 0;
        let s;
        for (let i = 0; i < jczqxx.length; i++) {
          s = {};
          s.ywfsrq = jczqxx[i].ywfsrq;
          s.ywzy = jczqxx[i].ywzy;
          s.yue = app.fmoney(jczqxx[i].yue);
          s.fse = app.fmoney(jczqxx[i].fse);
          if (jczqxx[i].ywlx == "缴存") {
            jcxx[a] = s;
            a++;
            continue;
          } else if (jczqxx[i].ywlx == "提取") {
            zqxx[b] = s;
            b++;
            continue;
          }
        }
        console.log("&&&@@");
        console.log(jcxx);
        console.log(zqxx);
        if (jcxx.length == 0) {
          that.setData({
            zjjcje: '0.00',
            zjjcsj: ''
          });
        } else {
          that.setData({
            zjjcje: jcxx[jcxx.length - 1].fse,
            zjjcsj: jcxx[jcxx.length - 1].ywfsrq
          });
        }
        if (zqxx.length == 0) {
          that.setData({
            zjtqje: '0.00',
            zjtqsj: ''
          });
        } else {
          that.setData({
            zjtqje: zqxx[zqxx.length - 1].fse,
            zjtqsj: zqxx[zqxx.length - 1].ywfsrq
          });
        }
        my.hideLoading();
      },
      fail: (res) => {
        my.hideLoading();
        my.alert({ content: "缴存支取信息查询失败！" });
      },
    });
  },
  onPullDownRefresh() {
    //刷新
    this.load(this);
    my.stopPullDownRefresh();
  },
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
  lunbotu(e) {
    let guanggaourl = e.currentTarget.dataset.value
    console.log(guanggaourl);
    app.setGuanggaourl(guanggaourl);
    my.navigateTo({ url: '../guanggao/guanggao' });
  },
  redirectTo() {
    my.navigateTo({ url: '../dkxx/dkxx' })
  },
  xzdk() {
    my.showActionSheet({
      title: '请选择您的借款合同编号',
      items: dkxx,//this.data.array.grzh,
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
            yhrq: wddk[i].yhrq,
            yhbxhj: app.fmoney(wddk[i].yhbxhj),
            dkye: wddk[i].dkye,
            dkffe: wddk[i].dkffe,
            dkzt: wddk[i].dkzt,
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
          //this.jd(this); 
        }
      },
    });
  },
  // jd:(that)=>{
  //   that.interval = setInterval(that.draw.bind(that), 1);
  //   that.ctx = my.createCanvasContext('canvas');
  // }
})
