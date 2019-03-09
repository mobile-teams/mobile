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
    // inputXm:"徐建伟",
    // inputZjhm:"130181198610057370",
    // accouint:"130181198610057370",
    // password:"徐建伟"
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
   // app.clearTabBar();
    let that = this;
    // my.getLocation({//获取定位城市
    //     type:1,
    //     success(res) {
    //       my.hideLoading();
    //       console.log(res)
    //       app.data.citymc=res.city                
    //     },
    //     fail() {
    //       my.hideLoading();
    //       my.alert({ title: '定位失败' });
    //     },
    //   })
    if(app.data.zjbzxbm !=""){//判断是否从城市选择页面返回
     console.log("城市列表返回：",app.data.zjbzxbm)
         this.setData({
        //  xzcs: "../image/cityImg/"+res.adCode.substr(0, 6)+".png",
          xzcs: "https://api.sjgjj.cn/img/city/"+app.data.zjbzxbm.substr(0, 6)+".png",
          xzcsflag:"1",
          citybm:app.data.zjbzxbm,
        });
      }else{
    //读取缓存信息
    console.log("读取缓存");
    my.getStorage({
        key:'city',
        success(res) {           
            if(res.data !=null ){
            console.log(res);
           // app.setZjbzxbm(res.data.citybm);   
           app.data.zjbzxbm=res.data.citybm;        
            that.setData({
             citybm:res.data.citybm,
             xzcs: "https://api.sjgjj.cn/img/city/"+res.data.citybm.substr(0, 6)+".png",
             xzcsflag:"1",
            });
            console.log("this.data.citybm",that.data.citybm);
        }
        },
      });
      }
      if(app.data.urls != ""){
        this.sqdl();
      }

  },


  csxz1() {
    my.chooseCity({
      // cities:mycity,
      // showLocatedCity:true,
       showHotCities:false,
      hotCities: [
        {
          city: '石家庄市',
          adCode: 'C13010',
          spell: 'sjz'
        }
      ],
      cities: [
        {
          city: '石家庄市',
          adCode: 'C13010',
          spell: 'sjz'
        },
        {
          city: '保定市',
          adCode: 'C13060',
          spell: 'bd'
        },
        {
          city: '定州市',
          adCode: 'C13120',
          spell: 'dz'
        },
        {
          city: '太原市',
          adCode: 'C14010',
          spell: 'ty'
        },
        {
          city: '长治市',
          adCode: 'C14040',
          spell: 'cz'
        },
        {
          city: '晋城市',
          adCode: 'C14050',
          spell: 'jc'
        },
        {
          city: '朔州市',
          adCode: 'C14060',
          spell: 'sz'
        },
        {
          city: '晋中市',
          adCode: 'C14070',
          spell: 'jz'
        },
        {
          city: '临汾市',
          adCode: 'C14100',
          spell: 'lf'
        },
        {
          city: '乌海市',
          adCode: 'C15030',
          spell: 'wh'
        },
        {
          city: '通辽市',
          adCode: 'C15050',
          spell: 'tl'
        },
        {
          city: '鄂尔多斯市',
          adCode: 'C15060',
          spell: 'eeds'
        },
        {
          city: '巴彦淖尔市',
          adCode: 'C15080',
          spell: 'byne'
        },
        {
          city: '乌兰察布市',
          adCode: 'C15090',
          spell: 'wlcb'
        },
         {
          city: '满洲里市',
          adCode: 'C15210',
          spell: 'mzl'
        },
        {
          city: '兴安盟',
          adCode: 'C15220',
          spell: 'xam'
        },
         {
          city: '锡林郭勒盟',
          adCode: 'C15250',
          spell: 'xlglm'
        },
        {
          city: '阿拉善盟',
          adCode: 'C15290',
          spell: 'alsm'
        },
         {
          city: '鞍山市',
          adCode: 'C21030',
          spell: 'as'
        },
         {
          city: '辽阳市',
          adCode: 'C21100',
          spell: 'ly'
        },
         {
          city: '辽河油田',
          adCode: 'C21111',
          spell: 'lhyt'
        },
        {
          city: '朝阳市',
          adCode: 'C21130',
          spell: 'cy'
        },
         {
          city: '长春电力',
          adCode: 'C22012',
          spell: 'ccdl'
        },
         {
          city: '四平市',
          adCode: 'C22030',
          spell: 'sp'
        },
        {
          city: '辽源市',
          adCode: 'C22040',
          spell: 'ly'
        },
        {
          city: '白山市',
          adCode: 'C22060',
          spell: 'bs'
        },
        {
          city: '黑龙江省直',
          adCode: 'C23011',
          spell: 'hljsz'
        },
         {
          city: '齐齐哈尔市',
          adCode: 'C23020',
          spell: 'qqhe'
        },
        {
          city: '鸡西市',
          adCode: 'C23030',
          spell: 'jx'
        },
        {
          city: '鹤岗市',
          adCode: 'C23040',
          spell: 'hg'
        },
        {
          city: '双鸭山市',
          adCode: 'C23050',
          spell: 'sys'
        },
        {
          city: '大庆市',
          adCode: 'C23060',
          spell: 'dq'
        },
        {
          city: '伊春市',
          adCode: 'C23070',
          spell: 'yc'
        },
        {
          city: '佳木斯市',
          adCode: 'C23080',
          spell: 'jms'
        },
        {
          city: '七台河市',
          adCode: 'C23090',
          spell: 'qth'
        },
        {
          city: '绥化市',
          adCode: 'C23120',
          spell: 'sh'
        },
        {
          city: '徐州市',
          adCode: 'C32030',
          spell: 'xz'
        },
        {
          city: '江苏油田',
          adCode: 'C32102',
          spell: 'jsyt'
        },
        {
          city: '嘉兴市',
          adCode: 'C33040',
          spell: 'jx'
        },
        {
          city: '绍兴市',
          adCode: 'C33060',
          spell: 'sx'
        },
         {
          city: '江西省直',
          adCode: 'C36011',
          spell: 'jxsz'
        },
         {
          city: '南昌铁路',
          adCode: 'C36012',
          spell: 'nctl'
        },
        {
          city: '景德镇市',
          adCode: 'C36020',
          spell: 'jdz'
        },
        {
          city: '萍乡市',
          adCode: 'C36030',
          spell: 'px'
        },
        {
          city: '九江市',
          adCode: 'C36040',
          spell: 'jj'
        },

        {
          city: '鹰潭市',
          adCode: 'C36060',
          spell: 'yt'
        },
       {
          city: '赣州市',
          adCode: 'C36070',
          spell: 'gz'
        },
         {
          city: '上饶市',
          adCode: 'C36110',
          spell: 'sr'
        },
       {
          city: '枣庄市',
          adCode: 'C37040',
          spell: 'zz'
        },
        {
          city: '东营市',
          adCode: 'C37050',
          spell: 'dy'
        },
       {
          city: '泰安市',
          adCode: 'C37090',
          spell: 'ta'
        },
        {
          city: '日照市',
          adCode: 'C37110',
          spell: 'rz'
        },
        {
          city: '莱芜市',
          adCode: 'C37120',
          spell: 'lw'
        },
        {
          city: '菏泽市',
          adCode: 'C37170',
          spell: 'hz'
        },
       {
         city: '郑州住房公积金管理中心省电力分中心',
          adCode: 'C41012',
          spell: 'zzzf'
        },
        {
         city: '安阳市',
          adCode: 'C41050',
          spell: 'ay'
        },
        {
         city: '鹤壁市',
          adCode: 'C41060',
          spell: 'hb'
        },
        {
         city: '焦作市',
          adCode: 'C41080',
          spell: 'jz'
        },
        {
         city: '濮阳市',
          adCode: 'C41090',
          spell: 'py'
        },
        {
         city: '驻马店市  ',
          adCode: 'C41170',
          spell: 'zmd'
        },
		{
         city: '中原油田',
          adCode: 'C41091',
          spell: 'zyyt'
        },
        {
         city: '漯河市',
          adCode: 'C41110',
          spell: 'lh'
        },
        {
         city: '黄石市',
          adCode: 'C42020',
          spell: 'hs'
        },
		{
         city: '襄阳市',
          adCode: 'C42060',
          spell: 'xy'
        },
		{
         city: '鄂州市',
          adCode: 'C42070',
          spell: 'ez'
        },
		{
         city: '荆州市',
          adCode: 'C42100',
          spell: 'jz'
        },
		{
         city: '恩施土家族苗族自治州',
          adCode: 'C42280',
          spell: 'es'
        },
		{
         city: '湖南省直',
          adCode: 'C43011',
          spell: 'hnsz'
        },
		{
         city: '衡阳市',
          adCode: 'C43040',
          spell: 'hy'
        },
		{
         city: '常德市',
          adCode: 'C43070',
          spell: 'cd'
        },
		{
         city: '永州市',
          adCode: 'C43110',
          spell: 'yz'
        },
		{
         city: '怀化市',
          adCode: 'C43120',
          spell: 'hh'
        },
		{
         city: '珠海市',
          adCode: 'C44040',
          spell: 'zh'
        },

		{
         city: '广西区直',
          adCode: 'C45010',
          spell: 'gxqz'
        },
		{
         city: '钦州市',
          adCode: 'C45070',
          spell: 'qz'
        },
		{
         city: '贺州市',
          adCode: 'C45110',
          spell: 'hz'
        },
		{
         city: '河池',
          adCode: 'C45120',
          spell: 'hc'
        },
		{
         city: '来宾市',
          adCode: 'C45130',
          spell: 'lb'
        },
		{
         city: '广元市',
          adCode: 'C51080',
          spell: 'gy'
        },
		{
         city: '南充市',
          adCode: 'C51130',
          spell: 'nc'
        },
		{
         city: '广安市',
          adCode: 'C51160',
          spell: 'ga'
        },
		{
         city: '贵州省直',
          adCode: 'C52011',
          spell: 'gzsz'
        },
		{
         city: '铜仁市',
          adCode: 'C52220',
          spell: 'tr'
        },
		{
         city: '黔西南布依族苗族自治州',
          adCode: 'C52230',
          spell: 'qxnz'
        },
		{
         city: '黔东南苗族侗族自治州',
          adCode: 'C52260',
          spell: 'qdnz'
        },
		{
         city: '黔南布依族苗族自治州',
          adCode: 'C52270',
          spell: 'qnz'
        },
		{
         city: '临沧市',
          adCode: 'C53090',
          spell: 'lc'
        },
		{
         city: '大理白族自治州',
          adCode: 'C53290',
          spell: 'dl'
        },
		{
         city: '宝鸡市',
          adCode: 'C61030',
          spell: 'bj'
        },
		{
         city: '咸阳市',
          adCode: 'C61040',
          spell: 'xy'
        },
		{
         city: '汉中市',
          adCode: 'C61070',
          spell: 'hz'
        },
		{
         city: '杨凌示范区',
          adCode: 'C61120',
          spell: 'ylsfq'
        },
		{
         city: '韩城市',
          adCode: 'C61130',
          spell: 'hc'
        },
		{
         city: '甘肃电力',
          adCode: 'C62013',
          spell: 'gsdl'
        },
		{
         city: '酒泉市',
          adCode: 'C62090',
          spell: 'jq'
        },
		{
         city: '玉门油田',
          adCode: 'C62091',
          spell: 'ymyt'
        },
		{
         city: '陇南市',
          adCode: 'C62120',
          spell: 'ln'
        },
		{
         city: '甘南藏族自治州',
          adCode: 'C62300',
          spell: 'gn'
        },
		{
         city: '西宁市',
          adCode: 'C63010',
          spell: 'xn'
        },
		{
         city: '乌鲁木齐市',
          adCode: 'C65010',
          spell: 'wlmq'
        },
		{
         city: '克拉玛依市',
          adCode: 'C65020',
          spell: 'klmy'
        },
		
		{
         city: '吐鲁番市',
          adCode: 'C65210',
          spell: 'tlf'
        },
		
		{
         city: '哈密市',
          adCode: 'C65220',
          spell: 'hm'
        },
		{
         city: '吐哈油田',
          adCode: 'C65221',
          spell: 'thyt'
        },
		{
         city: '昌吉回族自治州',
          adCode: 'C65230',
          spell: 'cj'
        },
		{
         city: '博尔塔拉蒙古自治州',
          adCode: 'C65270',
          spell: 'betlzzz'
        },
		{
         city: '巴音郭楞蒙古自治州',
          adCode: 'C65280',
          spell: 'bygl'
        },
		{
         city: '巴州住房公积金管理中心塔里木油田分中心',
          adCode: 'C65281',
          spell: 'bztlm'
        },
		{
         city: '巴州住房公积金管理中心塔西南分中心',
          adCode: 'C65282',
          spell: 'bztxn'
        },
		{
         city: '阿克苏地区',
          adCode: 'C65290',
          spell: 'aks'
        },
		{
         city: '克孜勒苏柯尔克孜自治州',
          adCode: 'C65300',
          spell: 'kzlske'
        },
		{
         city: '喀什地区',
          adCode: 'C65310',
          spell: 'ks'
        },
		{
         city: '和田地区',
          adCode: 'C65320',
          spell: 'ht'
        },
		{
         city: '伊犁哈萨克自治州',
          adCode: 'C65400',
          spell: 'yl'
        },
		{
         city: '塔城地区',
          adCode: 'C65420',
          spell: 'tc'
        },
		{
         city: '阿勒泰地区',
          adCode: 'C65430',
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
  csxz(){
    console.log("单击111");
          my.navigateTo({
            url: '/city/city',
          });  
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
          console.log("获取用户授权码：",authCode);
          //获取用户姓名证件号码
          my.httpRequest({
            url: app.data.urlsc + '/app-web/public/common/alitoken.service',
            //url:'http://192.168.54.77:8089/app-web/public/common/alitoken.service',
            method: 'POST',
            headers: {
              "Content-Type": "application/json",
              "citycode": "CSY001"
            },
            data: {
              appid: "20170517000101",
              sign: "SYWDJSKI8UYH7D7FKIUJNE45IJHYRKJ0",
              authCode:authCode,
              citybm:"CSY001"
            },
            dataType: 'json',
            contentType: 'application/json;charset=UTF-8', //contentType很重要    
            success: (res) => {
              console.log("获取信息接口返回：",res);
              console.log("---",res.data.param);
              app.data.xingming= res.data.param.userName;
              app.data.zjhm = res.data.param.certNo;          
              app.setZjbzxbm(this.data.citybm);
              app.data.urls = "";
             // my.redirectTo({ url: '../pages/index/index' });
             my.switchTab({ url: '/pages/index/index' });
            },
            fail:()=>{
                my.alert({
                  title: '授权失败，请重新授权登录' 
                });
            }
          });
            //获取真实用户名和密码;
            // app.setXingming('冯如车');
            // app.setZjhm('130105197412111224');
            //  app.data.xingming= "徐建伟",
            //  app.data.zjhm = "130181198610057370",
            //  app.data.xingming="许福才",
            //  app.data.zjhm = "220403196208210517"
            // app.data.xingming= "任彦军";
            // app.data.zjhm = "130131198905065112";
            //   app.data.xingming= "卓长高",
            // app.data.zjhm = "130122196610084628",
            //  my.switchTab({ url: '/pages/index/index' });
            //  my.navigateTo({ url: '../index/index' });   
            // my.redirectTo({ url: '../'+this.data.citybm+'/index/index' });
          
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
});
