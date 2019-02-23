const app = getApp();
Page({
  data: {
    xzcs: '../image/cityImg/001.png',
    //xzcs:'https://www.baidu.com/img/bd_logo1.png',
    citybm: '',
    xzcsflag:'0',
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
  },
  // 在对象中搜索
  arraySearch(l1, l2) {
    for (var name in app.data.PinYin) {
      if (app.data.PinYin[name].indexOf(l1) != -1) {
        return this.ucfirst(name);
        break;
      }
    }
    return false;
  },
  // 首字母大写
  ucfirst(l1) {
    if (l1.length > 0) {
      var first = l1.substr(0, 1).toUpperCase();
      var spare = l1.substr(1, l1.length);
      return first + spare;
      // return first;
    }
  },
  ConvertPinyin(l1) {
    var l2 = l1.length;
    var I1 = "";
    var reg = new RegExp('[a-zA-Z0-9\- ]');
    for (var i = 0; i < l2; i++) {
      var val = l1.substr(i, 1);
      var name = this.arraySearch(val, app.data.PinYin);
      if (reg.test(val)) {
        I1 += val;
      } else if (name !== false) {
        I1 += name;
      }
    }
    I1 = I1.replace(/ /g, '-');
    while (I1.indexOf('--') > 0) {
      I1 = I1.replace('--', '-');
    }
    return I1;
  },

  onLoad() {
    console.log("___>"+my.canIUse('hideBackHome'));
    let that = this;
    // my.getStorage({
    //     key:'yhxx',
    //     success(res) {
    //         console.log(res);
    //         app.data.xingming= res.data.xingming;

    //         app.data.zjhm = res.data.zjhm;

    //         app.setZjbzxbm(res.data.citybm);
           
    //         that.setData({
    //          citybm:res.data.citybm,
    //         });
    //         console.log("this.data.citybm",that.data.citybm);
    //       my.redirectTo({ url: '../'+that.data.citybm+'/index/index' });
    //     },
    //   });
  },

  //刷新使用
  load: (that) => {
    my.showLoading({
      content: '加载中...',
      delay: '1000',
    });
    my.httpRequest({
      url: app.data.url + '/app-web/public/redis/city.service',
      method: 'POST',
      headers: {
        "Content-Type": "application/json",
        "citycode": app.data.zjbzxbm.substr(0, 6)
      },
      data: {
        "appid": "20181127000101",
        "sign": "HLHSASASASASAHSLJLKHLSYM10PX0S73CX741Z7BCAACC1SP000DAAKHSOASAOSHAOSHSYM10PX0S73CX741Z7BCAACC1SP000DAAKHSOASAOSHAOSH",
        "id": "atwa",
        "msg": "atwasoft"
      },
      dataType: 'json',
      contentType: 'application/json;charset=UTF-8', //contentType很重要    
      success: (res) => {
        my.hideLoading();
        let city = res.data.data;
        let mycity = [];
        let m = 0;

        for (let i = 0; i < city.length; i++) {
          console.log("i=" + i);
          let l = {};
          if (city[i].citymc == "" || city[i].citybm == "") {
            continue;
          }
          l.city = city[i].citymc;
          l.adCode = city[i].citybm;
          l.spell = that.ConvertPinyin(city[i].citymc);
          mycity[m] = l;
          m++;
        }
        my.chooseCity({
          cities: mycity,
          success: (res) => {
            //获取城市编码
            console.log(res);
            my.getAuthCode({
              scopes: 'auth_user',
              success: ({ authCode }) => {
                console.log("authCode" + authCode);
                //查询真实个人信息


                //将姓名和证件号 存入全局变量
                app.setXingming('尹起才');
                app.setZjhm('23020419700919021X');
                my.redirectTo({ url: '../index/index' });
              },
            });
          },
        });
      },
      fail: (res) => {
        my.hideLoading();
        my.alert({ content: "网络错误" });
      },
    });
  },

  csxz() {
    // my.showLoading({
    //   content: '加载中...',
    //   delay: '1000',
    // });
    //--------------------------调用接口查询城市，暂时没有接口-----------------
    // my.httpRequest({
    //   url: 'http://192.168.54.77:8089/app-web/public/redis/city.service',
    //   method: 'POST',
    //   headers: {
    //     "Content-Type": "application/json",
    //     "citycode": "C22040CS"
    //   },
    //   data: {
    //     "appid": "20181127000101",
    //     "sign": "HLHSASASASASAHSLJLKHLSYM10PX0S73CX741Z7BCAACC1SP000DAAKHSOASAOSHAOSHSYM10PX0S73CX741Z7BCAACC1SP000DAAKHSOASAOSHAOSH",
    //     "id": "atwa",
    //     "msg": "atwasoft"
    //   },
    //   dataType: 'json',
    //   contentType: 'application/json;charset=UTF-8', //contentType很重要    
    //   success: (res) => {
    //     my.hideLoading();
    //     let city = res.data.data;
    //     let mycity = [];
    //     let m = 0;
    //     for (let i = 0; i < city.length; i++) {
    //       let l = {};
    //       if (city[i].citymc == "" || city[i].citybm == "") {
    //         continue;
    //       }
    //       l.city = city[i].citymc;
    //       l.adCode = city[i].citybm;
    //       l.spell = this.ConvertPinyin(city[i].citymc);
    //       mycity[m] = l;
    //       m++;
    //     }
    my.chooseCity({
      // cities:mycity,
      // showLocatedCity:true,
      // showHotCities:true,
      hotCities: [
        {
          city: '石家庄市',
          adCode: 'C13010CS',
          spell: 'sjz'
        }
      ],
      cities: [
        {
          city: '石家庄市',
          adCode: 'C13010CS',
          spell: 'sjz'
        },
        {
          city: '保定市',
          adCode: 'C13060',
          spell: 'bd'
        },
        {
          city: '定州市',
          adCode: 'C13120CS',
          spell: 'dz'
        },
        {
          city: '太原市',
          adCode: 'C14020CS',
          spell: 'ty'
        },
        {
          city: '长治市',
          adCode: 'C14040CS',
          spell: 'cz'
        },
        {
          city: '晋城市',
          adCode: 'C14050CS',
          spell: 'jc'
        },
        {
          city: '朔州市',
          adCode: 'C14060CS',
          spell: 'sz'
        },
        {
          city: '晋中市',
          adCode: 'C14070CS',
          spell: 'jz'
        },
        {
          city: '临汾市',
          adCode: 'C14100CS',
          spell: 'lf'
        },
        {
          city: '乌海市',
          adCode: 'C15030CS',
          spell: 'wh'
        },
        {
          city: '赤峰市',
          adCode: 'C15040CS',
          spell: 'cf'
        },
        {
          city: '通辽市',
          adCode: 'C15050CS',
          spell: 'tl'
        },
        {
          city: '鄂尔多斯市',
          adCode: 'C15060CS',
          spell: 'eeds'
        },
        {
          city: '巴彦淖尔',
          adCode: 'C15080CS',
          spell: 'byne'
        },
        {
          city: '乌兰察布',
          adCode: 'C15090CS',
          spell: 'wlcb'
        },
         {
          city: '满洲里',
          adCode: 'C15210CS',
          spell: 'mzl'
        },
        {
          city: '兴安盟',
          adCode: 'C15220CS',
          spell: 'xam'
        },
         {
          city: '锡林郭勒盟',
          adCode: 'C15250CS',
          spell: 'xlglm'
        },
        {
          city: '阿拉善盟',
          adCode: 'C15290CS',
          spell: 'alsm'
        },
         {
          city: '鞍山市',
          adCode: 'C21030CS',
          spell: 'as'
        },
         {
          city: '本钢',
          adCode: 'C21051CS',
          spell: 'bg'
        },
        {
          city: '丹东市',
          adCode: 'C21060CS',
          spell: 'dd'
        },
         {
          city: '辽阳市',
          adCode: 'C21100CS',
          spell: 'ly'
        },
         {
          city: '辽河油田',
          adCode: 'C21111CS',
          spell: 'lhyt'
        },
        {
          city: '朝阳市',
          adCode: 'C21130CS',
          spell: 'cy'
        },
         {
          city: '葫芦岛',
          adCode: 'C21140CS',
          spell: 'hld'
        },
         {
          city: '吉林电力',
          adCode: 'C22012CS',
          spell: 'jldl'
        },
         {
          city: '四平市',
          adCode: 'C22030CS',
          spell: 'sp'
        },
        {
          city: '辽源市',
          adCode: 'C22040CS',
          spell: 'tl'
        },
        {
          city: '白山市',
          adCode: 'C22060CS',
          spell: 'bs'
        },
        {
          city: '黑龙江省直',
          adCode: 'C23011CS',
          spell: 'hljsz'
        },
         {
          city: '齐齐哈尔',
          adCode: 'C23020CS',
          spell: 'qqhe'
        },
        {
          city: '鸡西市',
          adCode: 'C23030CS',
          spell: 'jx'
        },
        {
          city: '鹤岗市',
          adCode: 'C23040CS',
          spell: 'hg'
        },
        {
          city: '双鸭山市',
          adCode: 'C23050CS',
          spell: 'sys'
        },
        {
          city: '大庆市',
          adCode: 'C23060CS',
          spell: 'dq'
        },
        {
          city: '伊春市',
          adCode: 'C23070CS',
          spell: 'yc'
        },
        {
          city: '佳木斯市',
          adCode: 'C23080CS',
          spell: 'jms'
        },
        {
          city: '七台河市',
          adCode: 'C23090CS',
          spell: 'tqh'
        },
        {
          city: '绥化市',
          adCode: 'C23120CS',
          spell: 'sh'
        },
        {
          city: '江苏省直',
          adCode: 'C32011CS',
          spell: 'jssz'
        },
        {
          city: '徐州市',
          adCode: 'C32011CS',
          spell: 'xz'
        },
        {
          city: '江苏油田',
          adCode: 'C32102CS',
          spell: 'jsyt'
        },
        {
          city: '嘉兴市',
          adCode: 'C33040CS',
          spell: 'jx'
        },
        {
          city: '绍兴市',
          adCode: 'C33060CS',
          spell: 'cx'
        },
         {
          city: '江西省直',
          adCode: 'C36011CS',
          spell: 'jxsz'
        },
         {
          city: '南昌铁路',
          adCode: 'C36012CS',
          spell: 'nctl'
        },
        {
          city: '景德镇市',
          adCode: 'C36020CS',
          spell: 'jdz'
        },
        {
          city: '萍乡市',
          adCode: 'C36030CS',
          spell: 'px'
        },
        {
          city: '九江市',
          adCode: 'C36040CS',
          spell: 'jj'
        },

        {
          city: '鹰潭市',
          adCode: 'C36060CS',
          spell: 'yt'
        },
       {
          city: '赣州市',
          adCode: 'C36070CS',
          spell: 'gz'
        },
         {
          city: '上饶市',
          adCode: 'C36110CS',
          spell: 'sr'
        },
       {
          city: '枣庄市',
          adCode: 'C37040CS',
          spell: 'zz'
        },
        {
          city: '东营市',
          adCode: 'C37050CS',
          spell: 'dy'
        },
       {
          city: '泰安市',
          adCode: 'C37090CS',
          spell: 'ta'
        },
        {
          city: '日照市',
          adCode: 'C37110CS',
          spell: 'rz'
        },
        {
          city: '莱芜市',
          adCode: 'C37120CS',
          spell: 'lw'
        },
        {
          city: '菏泽市',
          adCode: 'C37170CS',
          spell: 'hz'
        },
       {
         city: '河南电力',
          adCode: 'C41012CS',
          spell: 'hndl'
        },
        {
         city: '郑州铁路',
          adCode: 'C41013CS',
          spell: 'zztl'
        },
        {
         city: '洛阳铁路',
          adCode: 'C41031CS',
          spell: 'lytl'
        },
        {
         city: '安阳市',
          adCode: 'C41050CS',
          spell: 'ay'
        },
        {
         city: '鹤壁市',
          adCode: 'C41060CS',
          spell: 'hb'
        },
        {
         city: '焦作市',
          adCode: 'C41080CS',
          spell: 'jz'
        },
        {
         city: '濮阳市',
          adCode: 'C41090CS',
          spell: 'py'
        },
        {
         city: '驻马店市  ',
          adCode: 'C41170CS',
          spell: 'zmd'
        },
        {
         city: '黄石市  ',
          adCode: 'C42020CS',
          spell: 'hs'
        },
		    {
         city: '中原油田',
          adCode: 'C41091CS',
          spell: 'zyyt'
        },
        {
         city: '漯河市',
          adCode: 'C41110CS',
          spell: 'lh'
        },
        {
         city: '义煤集团',
          adCode: 'C41121CS',
          spell: 'ymjt'
        },
		{
         city: '南阳油田',
          adCode: 'C41131CS',
          spell: 'nyyt'
        },
        {
         city: '黄石市',
          adCode: 'C42020CS',
          spell: 'hs'
        },
        {
         city: '十堰市东风公司',
          adCode: 'C42031CS',
          spell: 'sydfgs'
        },
		{
         city: '襄阳市',
          adCode: 'C42060CS',
          spell: 'xy'
        },
		{
         city: '鄂州市',
          adCode: 'C42070CS',
          spell: 'ez'
        },
		{
         city: '荆州市',
          adCode: 'C42100CS',
          spell: 'jz'
        },
		{
         city: '恩施市',
          adCode: 'C42280CS',
          spell: 'es'
        },
		{
         city: '湖南省直',
          adCode: 'C43011CS',
          spell: 'hnsz'
        },
		{
         city: '衡阳市',
          adCode: 'C43040CS',
          spell: 'hy'
        },
		{
         city: '常德市',
          adCode: 'C43070CS',
          spell: 'cd'
        },
		{
         city: '益阳市',
          adCode: 'C43090CS',
          spell: 'ys'
        },
		{
         city: '永州市',
          adCode: 'C43110CS',
          spell: 'yz'
        },
		{
         city: '怀化市',
          adCode: 'C43120CS',
          spell: 'hh'
        },
		{
         city: '珠海市',
          adCode: 'C44040CS',
          spell: 'zh'
        },
		{
         city: '南宁区直',
          adCode: 'C45010CS',
          spell: 'nnqz'
        },
		{
         city: '广西区直',
          adCode: 'C45010CS',
          spell: 'gxqz'
        },
		{
         city: '钦州市',
          adCode: 'C45070CS',
          spell: 'qz'
        },
		{
         city: '贺州市',
          adCode: 'C45110CS',
          spell: 'hz'
        },
		{
         city: '河池市',
          adCode: 'C45120CS',
          spell: 'hc'
        },
		{
         city: '来宾市',
          adCode: 'C45130CS',
          spell: 'lb'
        },
		{
         city: '广元市',
          adCode: 'C51080CS',
          spell: 'gy'
        },
		{
         city: '南充市',
          adCode: 'C51130CS',
          spell: 'nc'
        },
		{
         city: '广安市',
          adCode: 'C51160CS',
          spell: 'ga'
        },
		{
         city: '贵州省直',
          adCode: 'C52011CS',
          spell: 'gzsz'
        },
		{
         city: '贵州铜仁',
          adCode: 'C52220CS',
          spell: 'gztr'
        },
		{
         city: '黔西南州',
          adCode: 'C52230CS',
          spell: 'qxnz'
        },
		{
         city: '黔东南州',
          adCode: 'C52260CS',
          spell: 'qdnz'
        },
		{
         city: '黔南布依族苗族自治州',
          adCode: 'C52270CS',
          spell: 'qnz'
        },
		{
         city: '临沧市',
          adCode: 'C53090CS',
          spell: 'lc'
        },
		{
         city: '大理市',
          adCode: 'C53290CS',
          spell: 'dl'
        },
		{
         city: '西安市',
          adCode: 'C61010CS',
          spell: 'xa'
        },
		{
         city: '长庆油田',
          adCode: 'C61013CS',
          spell: 'cqyt'
        },
		{
         city: '宝鸡市',
          adCode: 'C61030CS',
          spell: 'bj'
        },
		{
         city: '咸阳市',
          adCode: 'C61040CS',
          spell: 'xy'
        },
		{
         city: '汉中市',
          adCode: 'C61070CS',
          spell: 'hz'
        },
		{
         city: '杨凌示范区公司',
          adCode: 'C61120CS',
          spell: 'ylsfqgs'
        },
		{
         city: '韩城',
          adCode: 'C61130CS',
          spell: 'hc'
        },
		{
         city: '甘肃电力公司',
          adCode: 'C62013CS',
          spell: 'gsdlgs'
        },
		{
         city: '酒泉市',
          adCode: 'C62090CS',
          spell: 'jq'
        },
		{
         city: '玉门油田',
          adCode: 'C62091CS',
          spell: 'ymyt'
        },
		{
         city: '陇南市',
          adCode: 'C62120CS',
          spell: 'ln'
        },
		{
         city: '甘南市',
          adCode: 'C62300CS',
          spell: 'gn'
        },
		{
         city: '西宁市',
          adCode: 'C63010CS',
          spell: 'xn'
        },
		{
         city: '乌鲁木齐市',
          adCode: 'C65010CS',
          spell: 'wlmq'
        },
		{
         city: '克拉玛依市',
          adCode: 'C65020CS',
          spell: 'klmy'
        },
		
		{
         city: '吐鲁番市',
          adCode: 'C65210CS',
          spell: 'tlf'
        },
		
		{
         city: '哈密市',
          adCode: 'C65220CS',
          spell: 'hm'
        },
		{
         city: '吐哈油田',
          adCode: 'C65221CS',
          spell: 'thyt'
        },
		{
         city: '昌吉市',
          adCode: 'C65230CS',
          spell: 'cj'
        },
		{
         city: '博尔塔拉蒙古自治州',
          adCode: 'C65270CS',
          spell: 'betlzzz'
        },
		{
         city: '巴音郭楞',
          adCode: 'C65280CS',
          spell: 'bygl'
        },
		{
         city: '塔里木油田',
          adCode: 'C65281CS',
          spell: 'tlmyt'
        },
		{
         city: '塔西南油田',
          adCode: 'C65282CS',
          spell: 'txnyt'
        },
		{
         city: '阿克苏',
          adCode: 'C65290CS',
          spell: 'aks'
        },
		{
         city: '克孜勒苏柯尔',
          adCode: 'C65300CS',
          spell: 'kzlske'
        },
		{
         city: '喀什',
          adCode: 'C65310CS',
          spell: 'ks'
        },
		{
         city: '和田',
          adCode: 'C65320CS',
          spell: 'ht'
        },
		{
         city: '伊犁',
          adCode: 'C65400CS',
          spell: 'yl'
        },
		{
         city: '塔城',
          adCode: 'C65420CS',
          spell: 'tc'
        },
		{
         city: '阿勒泰',
          adCode: 'C65430CS',
          spell: 'alt'
        }
		



      ],
      success: (res) => {
        //获取城市编码
        console.log(res);
        if(res.adCode=="../image/cityImg/C13990.png"){
          return ;
        }
        this.setData({
        //  xzcs: "../image/cityImg/"+res.adCode.substr(0, 6)+".png",
          xzcs: "https://api.sjgjj.cn/img/city/"+res.adCode.substr(0, 6)+".png",
          xzcsflag:"1",
          citybm:res.adCode,
        });
      },
    });
    //   },
    //   fail: (res) => {
    //     my.hideLoading();
    //     my.alert({ content: "网络错误" });
    //   },
    // });
  },

  //授权登陆
  sqdl() {
    let cs = this.data.xzcsflag;
    if (cs=='0') {
      my.alert({
        title: '请选择公积金城市'
      });
      return;
    } else {
      my.getAuthCode({
        scopes: 'auth_user',
        success: ({ authCode }) => {
          //获取真实用户名和密码;
          // app.setXingming('冯如车');
          // app.setZjhm('130105197412111224');
            //  app.data.xingming= "徐建伟",
            //  app.data.zjhm = "130181198610057370",
            app.data.xingming= "任彦军";
            app.data.zjhm = "130131198905065112";
          //   app.data.xingming= "卓长高",
          // app.data.zjhm = "130122196610084628",
            app.setZjbzxbm(this.data.citybm);
        //  my.navigateTo({ url: '../index/index' });   
         // my.redirectTo({ url: '../'+this.data.citybm+'/index/index' });
          my.redirectTo({ url: '../C13010CS/index/index' });
          //my.navigateTo({ url: '../C13010/index/index' });

          // 将用户信息放入缓存
          my.setStorage({
            key: 'yhxx',
            data: {
              xingming: '任彦军',
              zjhm: '130131198905065112',
              citybm: this.data.citybm,
            }
          });

        },
      });
    }

  },

  // onPullDownRefresh() {
  //   //刷新
  //   this.load(this);
  //   my.stopPullDownRefresh();
  // },

  //------------------此处报错，待研究-----------------
  // my.getPhoneNumber({
  //   success: (res) => {
  //     let encryptedData = res.response
  //     console.log(encryptedData)
  // my.httpRequest({
  //     url: '你的后端服务端',
  //     data: encryptedData
  // });
  //   },
  //   fail: (res) => {
  //     console.log(res)
  //     console.log('getPhoneNumber_fail')
  //   },
  // });
  //只能获取用户支付宝头像和昵称
  // my.getAuthUserInfo({
  //   success: () => {
  //     console.log(`userInfo:`, userInfo); 
  //   }
  // });

});
