const app = getApp();

const  bmgjlist= [
      {
        icon: '/image/icon/ffwdcx.png',
        text: '服务网点查询',
        //desc: '描述信息',
         path: '/C13010CS/fwwdxx/fwwdxx',
      },
      {
        icon: '/image/icon/fdjsq.png',
        text: '房贷试算器',
        path: '/C13010CS/tishi/tishi',
      },
    ];

const  gjywlist= [
      {
        icon: '/image/icon/gjjtq.png',
        text: '我要提取',
        //desc: '描述信息',
       path: '../../ywbl/gjjtq/gjjtq',
      // path :'/C13010CS/tishi/tishi',
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
    //desc: '描述信息',
     path: '../../ywbl/daiban/daiban',
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

});