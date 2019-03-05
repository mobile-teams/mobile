const app = getApp();

const  bmgjlist= [
      {
        icon: '/image/icon/ffwdcx.png',
        text: '服务网点查询',
         path: '/pages/fwwdxx/fwwdxx',
         url:"https://api.sjgjj.cn/html/mine/grzx/index.html"
       // url:"https://api.sjgjj.cn/html/common/fwwdcx/main.html"
       // url:"http://192.168.54.102:8088/app_12329/main.html"
      },
      {
        icon: '/image/icon/fdjsq.png',
        text: '房贷计算器',
        path: '/fdjsq/fdjsq',
        //url:"http://192.168.5.164:6008/html/fdjsq/ceshi.html"
       url:"http://192.168.5.164:6008/html/about.html"
      },
    ];

const  gjywlist= [
      {
        icon: '/image/icon/gjjtq.png',
        text: '我要提取',
      // path: '../../ywbl/gjjtq/gjjtq',
       path :'/pages/tishi/tishi',
       url:"http://192.168.54.101:8088/app_12329/cityList/index.html"
      }
    ];
const  dkywlist= [
      // {
      //   icon: '/image/icon/dkyw.png',
      //   text: '我要贷款',
      //   //desc: '描述信息',
      // },
      {
        icon: '/image/icon/tqhb.png',
        text: '提前还本',
        path: '/pages/tishi/tishi',
        url:"http://192.168.54.101:8088/app_12329/cityList1/index.html"
      },
      {
        icon: '/image/icon/tqjq.png',
        text: '提前结清',
        path: '/pages/tishi/tishi',
      },
      {
        icon: '/image/icon/ydcsq.png',
        text: '月对冲签约',
        path: '/pages/tishi/tishi',
      },
    ];
const  wdywlist= [
  {
    icon: '/image/icon/wdyw.png',
    text: '我的业务',
    path: '/pages/tishi/tishi',
    //path: '../../ywbl/daiban/daiban',
  }
];


let basicComponentList = [
  
  {
    type: '便民服务',
    list: bmgjlist,
  },
  {
    type: '归集业务',
    list: gjywlist,
  },
  {
    type: '贷款业务',
    list: dkywlist,
  },
  {
    type: '我的业务',
    list: wdywlist,
  }, 
];


Page({
  data: {
    basicComponentList,
    //tabbar:{},     //放在data中
  },
  onLoad() {
    //app.editTabBar(); //放在onLoad中
  },
  tiaozhuan(e){
    console.log(e);
    var guanggaourl = e.currentTarget.dataset.h5url
    let tourl = e.currentTarget.dataset.url
    if(guanggaourl != null ){
        if(e.currentTarget.dataset.ywmc =="服务网点查询"){
            guanggaourl=guanggaourl+"?citycode="+app.data.zjbzxbm.substr(0,6);
        }
        console.log(guanggaourl);
        app.setGuanggaourl(guanggaourl);
        my.navigateTo({ url: '../../guanggao/guanggao' });
    }else{
        my.navigateTo({url:tourl});
    }



  }

});