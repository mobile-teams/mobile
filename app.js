App({
  data: {
    grzh: 0,
    jkhtbh: 0,
    dwmc: " ",
    dkxx:[],
    // xingming: "杨云华",
    // zjhm: "22042219680309007X",
    //  xingming:"胡建文",
    //  zjhm:"220402197604300811",
    // xingming:"金凯",
    // zjhm:"230203197712081457",
    //   xingming:"许福才",
    //  zjhm:"220403196208210517",
    // xingming: "朱禹霖",
    // zjhm: "220402198902081439",
    // xingming: "张辉",
    // zjhm: "220403197909231518",
    // xingming: "马俊杰",
    // zjhm: "220402196508141465",
    // xingming: "王长军",
    // zjhm: "220402197810194415",
    xingming: "徐建伟",
    zjhm: "130181198610057370",
    
    url: "https://api.sjgjj.cn",
    // url:"http://192.168.54.77:8089",
    //zjbzxbm:"C23020KF",
     zjbzxbm: "C13010CS",
    //zjbzxbm: "C22040CS",
    gruangaourl: " ",
    //citybm: "110105",
    PinYin: { 
    }
 },

  onLaunch(options) {
    // 第一次打开ceshi
    // options.query == {number:1}
    console.info('App onLaunch');
  },
  onShow(options) {
    // 从后台被 scheme 重新打开
    // options.query == {number:1}
  },
  //存放全局变量
  setGrzh: function (event) {
    this.data.grzh = event
    console.log('=======个人账号==', this.data.grzh)
  },
  setJkhtbh: function (event) {
    this.data.jkhtbh = event
    console.log('=======借款合同编号==', this.data.jkhtbh)
  },
  setDkxx: function (event) {
    this.data.dkxx = event
    console.log('=======贷款信息==', this.data.jkhtbh)
  },
  //存放姓名和证件号码
  setXingming: function (event) {
    this.data.xingming = event;
  },
  //存放广告url
  setGuanggaourl: function (event) {
    this.data.gruangaourl = event;
  },
  setZjbzxbm: function (event) {
    this.data.zjbzxbm = event;
  },
  setZjhm: function (event) {
    this.data.zjhm = event;
  },
  setDwmc: function (event) {
    this.data.dwmc = event;
  },
  fmoney(s = 0, n = 2) {
    const dot = str => `.${(+('0.' + (str || 0))).toFixed(n).split('.')[1]}`
    if (!s) return '0.00';
    const ss = s + '';
    if (!/[0-9]/.test(ss)) return ss;
    const sa = ss.split('.');
    if (sa[0].length < 3) return `${sa[0]}${dot(sa[1])}`;
    return ss.replace(/(\d[\d.]+\d)/g, v => {
      const sv = v.split('.');
      return `${sv[0].replace(/\B(?=(\d{3})+\b)/g, ',')}${dot(sv[1])}`;
    })
  },

  getNowFormatDate() {
    let day = new Date();
    let Year = 0;
    let Month = 0;
    let Day = 0;
    let CurrentDate = "";
    Year = day.getFullYear();// 支持IE和火狐浏览器.
    Month = day.getMonth() + 1;
    Day = day.getDate();
    CurrentDate += Year + "-";
    if (Month >= 10) {
      CurrentDate += Month + "-";
    } else {
      CurrentDate += "0" + Month + "-";
    }
    if (Day >= 10) {
      CurrentDate += Day;
    } else {
      CurrentDate += "0" + Day;
    }
    return CurrentDate;
  },

  getTwoYearAgoFormatDate() {
    let day = new Date();
    let Year = 0;
    let CurrentDate = "";
    Year = day.getFullYear() - 2;// 支持IE和火狐浏览器.
    CurrentDate = Year + "-01-01";
    return CurrentDate;
  },

  /////重构导航栏    
   editTabBar () {
      var e = this.globalData.tabbar, a = getCurrentPages(), t = a[a.length - 1], s = t.route;
      console.log(t)
      console.log(s)
      console.log("zjbzxbm:::::",this.data.zjbzxbm);
      0 != s.indexOf("/") && (s = "/" + s);
      for( var i in e.items){
        
        if(e.items[i].pagePath.indexOf(this.data.zjbzxbm) == -1){
           e.items[i].pagePath = "/"+this.data.zjbzxbm+e.items[i].pagePath
        }
       
      }
      for (var n in e.items) e.items[n].selected = !1, e.items[n].pagePath == s && (e.items[n].selected = !0);
      t.setData({
      tabbar: e
      });
    },
    globalData: {
      userInfo: null,
      //配置tabbar
      tabbar: {
      // textColor: "#333",
      // selectedColor: "#d0501f",
      // backgroundColor: "#ffffff",
      // borderStyle: "#d5d5d5",
      textColor: "#404040",
      selectedColor: "#108ee9",
      backgroundColor: "#F5F5F9",
      items:[
      {
       // "pagePath": "/"+this.data.citybm+"/tishi/tishi",
       "pagePath": "/tishi/tishi",
        "icon": "/image/fuwu1.png",
        "activeIcon": "/image/fuwu.png",
        "name": "新闻动态"
      },
      {
       // "pagePath": "/"+this.data.citybm+"/index/index",
      //  "pagePath": "/index/index",
       "pagePath": "/index/index",
        "icon": "/image/gongjijin1.png",
        "activeIcon": "/image/gongjijin.png",
        "name": "账户查询"
      },
      {
        // "pagePath": "/"+this.data.citybm+"/ywbl/fuwu/fuwu",
        "pagePath": "/ywbl/fuwu/fuwu",
        "icon": "/image/zixun1.png",
        "activeIcon": "/image/zixun.png",
        "name": "业务办理"
      },
      {
        // "pagePath": "/"+this.data.citybm+"/user/user",
        "pagePath": "/user/user",
        "icon": "/image/wode1.png",
        "activeIcon": "/image/wode.png",
        "name": "我"
      }
    ],
      position: "bottom"
      }
    },

});
