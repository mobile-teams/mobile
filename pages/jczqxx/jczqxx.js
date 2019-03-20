const app = getApp();
Page({
  data: {
    tabs: [
      {
        title: '全部',
        // badgeType: 'text',
        // badgeText: '6',
      },
      {
        title: '缴存',
        // badgeType: 'dot',
      },
      { title: '提取' },
      { title: '其他' }
    ],
    activeTab: 0,
    items: [

    ],
    jcxxItems: [

    ],
    zqxxItems: [

    ],
    qtxxItems: [

    ],
  },
  handleTabClick({ index }) {
    this.setData({
      activeTab: index,
    });
  },
  onLoad() {
    my.showLoading({
      content: '加载中...',
      delay: '1000',
    });
    my.getStorage({
      key: "djxx",
      success: (res) => {
        if (res.data == "zjtqcx") {
          this.setData({
            activeTab: 2,
          });
        } else if (res.data == "zjjccx") {
          this.setData({
            activeTab: 1,
          });
        } else {
          this.setData({
            activeTab: 0,
          });
        }
      },
    });
    var obj = new Object();
    obj.appid = app.data.appid;
    obj.zjbzxbm = app.data.zjbzxbm;
    obj.grzh = app.data.grzh;
    obj.ksrq = app.getTwoYearAgoFormatDate();
    obj.jsrq = app.getNowFormatDate();
    obj.sign = app.getSign(obj, app.data.pkey);
    console.log("gjjywmxcx--getSign::", app.getSign(obj, app.data.pkey));
    console.log("gjjywmxcx--JSON.stringify(obj):::", JSON.stringify(obj))
    my.httpRequest({
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
        let jczqxx = res.data.data;
        let alljczqxx = [];
        let jcxx = [];
        let zqxx = [];
        let qtxx = [];
        let a = 0; let b = 0; let c = 0; let e = 0;
        let flagtq; let flagqt;
        let s;
        for (let i = jczqxx.length - 1; i >= 0; i--) {
          s = {};
          s.ywfsrq = jczqxx[i].ywfsrq;
          s.ywzy = jczqxx[i].ywzy;
          s.yue = app.fmoney(jczqxx[i].yue);
          s.fse = app.fmoney(jczqxx[i].fse);
          alljczqxx[e] = s;
          e++;
          if (jczqxx[i].ywlx == "缴存") {
            jcxx[a] = s;
            a++;
            continue;
          } else if (jczqxx[i].ywlx == "提取") {
            zqxx[b] = s;
            b++;
            continue;
          } else if (jczqxx[i].ywlx == "其他") {
            qtxx[c] = s;
            c++;
            continue;
          }
        }
        a = 0;
        b = 0;
        c = 0;
        e = 0;

        if (zqxx.length < 1) {
          flagtq = 0;
        } else {
          flagtq = 1;
        }
        if (qtxx.length < 1) {
          flagqt = 0;
        } else {
          flagqt = 1;
        }
        console.log("zqxx", zqxx, zqxx.length, "flagtq", flagtq);
        console.log("qtxx", qtxx, qtxx.length, "flagqt", flagqt);
        this.setData({
          items: alljczqxx,
          jcxxItems: jcxx,
          zqxxItems: zqxx,
          qtxxItems: qtxx,
          flagqt: flagqt,
          flagtq: flagtq,
        });
        my.hideLoading();
      },
      fail: (res) => {
        my.hideLoading();
        my.alert({ content: "网络错误" });
      },
      complete: (res) => {
        my.hideLoading();
        // my.alert({title: 'complete'});
      }
    });
  },
});