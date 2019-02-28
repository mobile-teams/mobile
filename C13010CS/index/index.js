const app = getApp();
const jkhtbh = [];
const dkxx =[];
const wddk = [];
const preventTurn = () => {
  my.alert({ title: '提示', content: '暂未开通' })
}
const preventTurn1 = (path) => {
  if (path == '../dkxx/dkxx') {
    console.log(jkhtbh.length);
    if (jkhtbh.length > 1) {
      my.showActionSheet({
        title: '借款合同编号',
        items: jkhtbh,
        cancelButtonText: '取消',
        success: (res) => {
          if (res.index != -1) {
            app.setJkhtbh(jkhtbh[res.index])
            my.navigateTo({ url: path })
          }
        },
      });
    } else if (jkhtbh.length == 0) {
      my.alert({
        title: '此职工无贷款！'
      });
    } else { my.navigateTo({ url: path }) }
  } else { my.navigateTo({ url: path }) }
}
const basicContainers1 = [
  {
    name: '缴存信息',
    thumb: '/image/icon/09.png',
    path: '../jczqxx/jczqxx',
  },
  {
    name: '贷款信息',
    thumb: '/image/icon/01.png',
    path: '../dkxx/dkxx',
  },
];
const basicContainers = [
  {
    name: '我要提取',
    thumb: '/image/icon/02.png',
    path: false,
  },
  {
    name: '我要贷款',
    thumb: '/image/icon/03.png',
    path: false,
  },
  {
    name: '我要还款',
    thumb: '/image/icon/04.png',
    path: false,
  },
  {
    name: '冲还贷签约',
    thumb: '/image/icon/05.png',
    path: false,
  },
];
let basicComponentList = [
  {
    type: '信息查询',
    list: basicContainers1,
  },
  // {
  //   type: '业务办理',
  //   list: basicContainers,
  // },

];

let grzhye1;
Page({
  data: {
    tabbar:{},     //放在data中
    grzhye: 0,
    grzh: '',
    grzhzt: '',
    flag: true,
    flag1: false,
    flag2: false,
    flag3: false,
    flagdkzt : '',
    flagdkzt1:0,
    basicComponentList,
    dkzt : '',
    array: {
      grzhye: [],
      grzhzt: [],
      grzh: [],
      dwmc: []
    },
    indexgrzh: 0,

    // 轮播图变量
    images: [
      { imgUrl: '../../image/1.jpg', url: 'http://192.168.5.164:6008/html/fdjsq/home.html' },
      { imgUrl: '../../image/2.jpg', url: 'http://192.168.54.100:8088/app_12329/index.html' },
      // { imgUrl: '../../image/3.jpg' },
      // { imgUrl: '../../image/4.jpg' },
    ],
    indicatorDots: true,
    autoplay: true,
    interval: 3000,
    current: 1, //默认显示第几张,0为第一张
    circular: true,
    //缴存提取
    zjjcje: '',
    zjjcsj: '',
    zjtqje: '',
    zjtqsj: '',
    //贷款圈圈
     witch: 100,//
    percent: 0,//百分比
    pros: 0,//用于计数进程

    dkye:0,
    dkffe:0
  },
  preventTurn(event) {
    const path = event.currentTarget.dataset.index
    path ? preventTurn1(path) : preventTurn()
  },
  gjjxxcx() {
    my.navigateTo({ url: '../zhxx/zhxx' });
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
    app.editTabBar(); //放在onLoad中
    my.httpRequest({
      url: app.data.url + '/app-web/personal/public/gjjdkjbxxcx.service',
      method: 'POST',
      headers: {
        "Content-Type": "application/json",
        "citycode": app.data.zjbzxbm.substr(0, 6)
      },
      data: {
        appid: "20170517000101",
        sign: "SYWDJSKI8UYH7D7FKIUJNE45IJHYRKJ0",
        zjbzxbm: app.data.zjbzxbm,
        xingming: app.data.xingming,
        zjhm: app.data.zjhm
      },
      dataType: 'json',
      contentType: 'application/json;charset=UTF-8', //contentType很重要    
      success: (res) => {
      
        console.log(res);
        console.log(">>>>>>",res.data);
        console.log("=====",res.data.data)
        if (res.data.data == null) {
        my.alert({
              title:"提示",
              content: '未查询到您的公积金信息!!',
              success: () => {
                //my.navigateBack();
                my.redirectTo({ url: '../../citychose/citychose' });
              }
            });
         }else{
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
            dkxx[i]=res.data.data[0].dkxx[i].jkhtbh+" "+res.data.data[0].dkxx[i].dkzt;
          }
        }
        console.log(res.data.data[0].gjjxx.length);
        if (res.data.data[0].gjjxx.length > 1) {
          this.setData({
            flag1: true
          })
        }
        console.log('贷款信息：', res.data.data[0].dkxx.length);
        let flagdkzt2 = 0;
        if (res.data.data[0].dkxx.length > 0) {
          if(res.data.data[0].dkxx[0].dkzt == '正常还款' || res.data.data[0].dkxx[0].dkzt == '逾期还款'){
            flagdkzt2=1;
          }else{
            flagdkzt2=0;
          }
          console.log("333333333333",this.data.flagdkzt1);
          if(res.data.data[0].dkxx.length > 1){
             this.setData({
              dkzt: res.data.data[0].dkxx[0].dkzt,
              dkye:res.data.data[0].dkxx[0].dkye,
              dkffe:res.data.data[0].dkxx[0].dkffe,
              percent :(res.data.data[0].dkxx[0].dkye*10)/(res.data.data[0].dkxx[0].dkffe),
              flag2: true,
              flag3: true,
              flagdkzt:res.data.data[0].dkxx[0].dkzt,
              flagdkzt1:flagdkzt2,
              
            });
          }else{
            this.setData({
              dkzt: res.data.data[0].dkxx[0].dkzt,
              dkye:res.data.data[0].dkxx[0].dkye,
              dkffe:res.data.data[0].dkxx[0].dkffe,
              percent :(res.data.data[0].dkxx[0].dkye*10)/(res.data.data[0].dkxx[0].dkffe),
              flag2: true,
              flagdkzt :res.data.data[0].dkxx[0].dkzt,
              flagdkzt1:flagdkzt2,
            });
          }
          this.jdjz(this);
        }
        for (var i = 0; i < res.data.data[0].gjjxx.length; i++) {
          this.$spliceData({ "array.grzh": [0, 0, res.data.data[0].gjjxx[i].grzh] });
          this.$spliceData({ "array.grzhzt": [0, 0, res.data.data[0].gjjxx[i].grzhzt] });
          this.$spliceData({ "array.grzhye": [0, 0, res.data.data[0].gjjxx[i].grzhye] });
          this.$spliceData({ "array.dwmc": [0, 0, res.data.data[0].gjjxx[i].dwmc] });
        }
        console.log("-----", this.data.array.grzhye);
        //最近缴存提取查询
        my.httpRequest({
          url: app.data.url + '/app-web/personal/public/gjjywmxcx.service',
          method: 'POST',
          headers: {
            "Content-Type": "application/json",
            "citycode": app.data.zjbzxbm.substr(0, 6)
          },
          data: {
            appid: "20170517000101",
            zjbzxbm: app.data.zjbzxbm,
           // citybm: app.data.zjbzxbm,
            sign: "SYWDJSKI8UYH7D7FKIUJNE45IJHYRKJ0",
            grzh: app.data.grzh,
            ksrq: app.getTwoYearAgoFormatDate(),
            jsrq: app.getNowFormatDate()
          },
          dataType: 'json',
          contentType: 'application/json;charset=UTF-8', //contentType很重要    
          success: (res) => {
            let jczqxx = res.data.data;
            console.log("jczqxx",jczqxx);
            if (jczqxx == null) {
              that.setData({
                zjjcje: '0.00',
                zjjcsj: '',
                zjtqje: '0.00',
                zjtqsj: ''
              });
              return;
            }
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
          },
          fail: (res) => {
            
            console.log("app.data.grzh",app.data.grzh);
            console.log("app.data.zjbzxbm",app.data.zjbzxbm);
            my.hideLoading();
            console.log("res",res);
            my.alert({ content: "缴存支取信息查询失败！" });
          },
        });
      }
      },
      fail: function(res) {
             my.alert({
              title:"提示",
              content: '服务正在维护。。。',
              success: () => {
                //my.navigateBack();
                my.redirectTo({ url: '../../citychose/citychose' });
              }
            });       
      },
    });
    my.httpRequest({
      url: app.data.url + '/app-web/public/zhcx/info.service',
      method: 'POST',
      headers: {
        "Content-Type": "application/json",
        "citycode": app.data.zjbzxbm.substr(0, 6)
      },
      data: {
        appid: "20181023000101",
        sign: "SYWDLSKI0UYH7D7FKIUJME45IJHYRKJ1",
        zjbzxbm: app.data.zjbzxbm,
        citybm:app.data.zjbzxbm,
        xingming: app.data.xingming,
        zjhm: app.data.zjhm
      },
      dataType: 'json',
      contentType: 'application/json;charset=UTF-8', //contentType很重要    
      success: (res) => {
        if(res.data.ret == 0){
            if(res.data.data[0].dkxx.length>0){
              console.log("我的贷款",res.data.data[0].dkxx);
            this.setData({
              yhrq : res.data.data[0].dkxx[0].yhrq,
              yhbxhj : app.fmoney(res.data.data[0].dkxx[0].yhbxhj),
              //dkffe : res.data.data[0].dkxx[0].dkffe,
              //dkye : res.data.data[0].dkxx[0].dkye,
            });
          }
          for (var i = 0; i < res.data.data[0].dkxx.length; i++) {
            console.log("res.data.data[0].dkxx",res.data.data[0].dkxx[i]);
            wddk.push(res.data.data[0].dkxx[i]);
          }
        }
      },
    });
  },
  load: (that) => {
    my.httpRequest({
      url: app.data.url + '/app-web/personal/public/gjjdkjbxxcx.service',
      method: 'POST',
      headers: {
        "Content-Type": "application/json",
        "citycode": app.data.zjbzxbm.substr(0, 6)
      },
      data: {
        appid: "20170517000101",
        zjbzxbm: app.data.zjbzxbm,
        sign: "SYWDJSKI8UYH7D7FKIUJNE45IJHYRKJ0",
        xingming: app.data.xingming,
        zjhm: app.data.zjhm
      },
      dataType: 'json',
      contentType: 'application/json;charset=UTF-8', //contentType很重要    
      success: (res) => {
        console.log(res);
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
    my.httpRequest({
      url: app.data.url + '/app-web/personal/public/gjjywmxcx.service',
      method: 'POST',
      headers: {
        "Content-Type": "application/json",
        "citycode": app.data.zjbzxbm.substr(0, 6)
      },
      data: {
        appid: "20170517000101",
        zjbzxbm: app.data.zjbzxbm,
        sign: "SYWDJSKI8UYH7D7FKIUJNE45IJHYRKJ0",
        grzh: app.data.grzh,
        ksrq: app.getTwoYearAgoFormatDate(),
        jsrq: app.getNowFormatDate()
      },
      dataType: 'json',
      contentType: 'application/json;charset=UTF-8', //contentType很重要    
      success: (res) => {
        console.log("&&&");
        console.log(res);
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
      title: '个人账号',
      items: this.data.array.grzh,
      cancelButtonText: '取消',
      success: (res) => {
        if (res.index != -1) {
          let i = res.index;
          this.setData({
            flag: true,
            grzhye: app.fmoney(this.data.array.grzhye[i]),
            grzh: this.data.array.grzh[i],
            grzhzt: this.data.array.grzhzt[i],
          });
          grzhye1 = this.data.array.grzhye[i];
          app.setGrzh(this.data.array.grzh[i])
          app.setDwmc(this.data.array.dwmc[i]);
          this.zjjctqxx(this);
        }
      },
    });
  },
  zjjccx() {
    my.setStorage({
      key: "djxx",
      data: "zjjccx",
      success: (res) => {
        my.navigateTo({ url: '../jczqxx/jczqxx' });
      },
    });
  },
  zjtqcx() {
    my.setStorage({
      key: "djxx",
      data: "zjtqcx",
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
  jdjz:(that)=>{
     that.interval = setInterval(that.draw.bind(that), 1);
     that.ctx = my.createCanvasContext('canvas');
  },
  draw() {
    const { ctx } = this;
    let width=this.data.witch;
    //let process=this.data.percent;
     let process=this.data.dkye/this.data.dkffe*100;
    this.setData({
      pros:this.data.pros+1
    });
    let pros001=this.data.pros;
      ctx.clearRect(0, 0, width, width);
      ctx.beginPath();
      ctx.moveTo(width/2, width/2);
      ctx.arc(width/2, width/2, width/2, 0, Math.PI * 2, false);
      ctx.closePath();
    if(this.data.dkzt == '结清状态'){
      ctx.fillStyle = 'rgba(35,170,233,255)';
    }else{
      ctx.fillStyle = '#ddd';
    }
    
    ctx.fill();

    ctx.beginPath();
    ctx.moveTo(width/2, width/2);
    ctx.arc(width/2, width/2, width/2,  -Math.PI / 2, Math.PI * 2 * pros001 / 100-Math.PI / 2, false);
    ctx.closePath();
    if(this.data.dkzt == '逾期还款'){
      ctx.fillStyle = 'rgba(228,79,96,255)';//进度条颜色
    }else if(this.data.dkzt == '正常还款'){
      ctx.fillStyle = '#2a2';//进度条颜色
    }

    ctx.fill();

    ctx.beginPath();
    ctx.moveTo(width/2, width/2);
    ctx.arc(width/2, width/2, width/2 - 5, 0, Math.PI * 2, true);
    ctx.closePath();
    ctx.fillStyle = 'rgba(255,255,255,1)';
    
    ctx.fill();

    ctx.beginPath();
    ctx.arc(width/2, width/2, width/2 - 8, 0, Math.PI * 2, true);
    ctx.closePath();
    ctx.strokeStyle = '#ffffff';
    ctx.stroke();
    ctx.font = "9pt Arial";
    ctx.fillStyle = '#2a2';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.moveTo(width/2, width/2);
    //ctx.font="12px Arial";
    ctx.font="10pt Arial";
    ctx.fillStyle = '#000';
    if(this.data.dkzt == '未发放'){
      ctx.fillText("贷款发放额",width/2,width/3);
      ctx.font="12pt Arial";
      ctx.fillText(app.fmoney(0),width/2,width/2);
    }else {
      ctx.fillText("贷款余额",width/2,width/3);
      ctx.font="12pt Arial";
      ctx.fillText(app.fmoney(this.data.dkye),width/2,width/2);
    }
   
    //关闭计时器
    if(pros001>process){
    clearInterval(this.interval);
     this.setData({
      pros:0
    });
    }
    ctx.stroke();
    ctx.draw();
  },
   xzdk(){    
    my.showActionSheet({
      title: '我的贷款',
      items: dkxx,//this.data.array.grzh,
      cancelButtonText: '取消',
      success: (res) => {
        if(res.index!=-1){
          let i =res.index;
          let flagdkzt2 = 0;
          console.log("index",i);
          console.log("index",wddk);
          if(wddk[i].dkzt == '正常还款' || wddk[i].dkzt == '逾期还款'){
            flagdkzt2=1;
          }else{
            flagdkzt2=0;
          }
          this.setData({
            yhrq: wddk[i].yhrq,
            yhbxhj: app.fmoney(wddk[i].yhbxhj),
            dkye: wddk[i].dkye,
            dkffe : wddk[i].dkffe,
            dkzt: app.fmoney(wddk[i].dkzt),
            flagdkzt1 : flagdkzt2,
            flagdkzt : wddk[i].dkzt,
          });
          app.data.jkhtbh = wddk[i].jkhtbh;
          this.jd(this); 
        }
      },
    });
  },
  jd:(that)=>{
    that.interval = setInterval(that.draw.bind(that), 1);
    that.ctx = my.createCanvasContext('canvas');
  }
})
