const app = getApp();

const  bmgjlist= [
      {
        icon: '/image/icon/ffwdcx.png',
        text: '服务网点查询',
         path: '/C13010CS/fwwdxx/fwwdxx',
        url:"https://api.sjgjj.cn/html/common/fwwdcx/main.html"
       // url:"http://192.168.54.100:8088/app_12329/main.html"
      },
      {
        icon: '/image/icon/fdjsq.png',
        text: '房贷计算器',
        path: '/fdjsq/fdjsq',
       
      },
    ];

const  gjywlist= [
      {
        icon: '/image/icon/gjjtq.png',
        text: '我要提取',
      // path: '../../ywbl/gjjtq/gjjtq',
       path :'/C13010CS/tishi/tishi',
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
        path: '/C13010CS/tishi/tishi',
        //url:"http://192.168.54.100:8088/app_12329/wyindex.html"
      },
      {
        icon: '/image/icon/tqjq.png',
        text: '提前结清',
        path: '/C13010CS/tishi/tishi',
      },
      {
        icon: '/image/icon/ydcsq.png',
        text: '月对冲签约',
        path: '/C13010CS/tishi/tishi',
      },
    ];
const  wdywlist= [
  {
    icon: '/image/icon/wdyw.png',
    text: '我的业务',
    path: '/C13010CS/tishi/tishi',
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
    tabbar:{},     //放在data中
  },
  onLoad() {
    app.editTabBar(); //放在onLoad中
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