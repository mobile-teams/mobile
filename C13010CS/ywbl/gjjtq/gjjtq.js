const app = getApp();
Page({
  data: {
    tqlxArray: [
      {
        icon: '../../../image/gjjtq/tqyy_chgfdkbxtq.png',
        text: '偿还住房公积...',
        bm:'chgfdkbx',
        tqyy:'0102',
        gjhtqywlx:'部分提取',
        zhfwpath:'tq_chgfdkbx',
        path:'chgfdkbx'
      },
      {
        icon: '../../../image/gjjtq/tqyy_wygl.png',
        text: '物业管理费提取',
        bm:'wyglftq',
        tqyy:'0106',
        gjhtqywlx:'部分提取',
        zhfwpath:'tq_wyglf',
        path:'wyglftq'
      },
      {
        icon: '../../../image/gjjtq/tqyy_lxtx.png',
        text: '退休提取',
        bm:'ltxhtq',
        tqyy:'0201',
        gjhtqywlx:'销户提取',
        zhfwpath:'tq_lxtx',
        path:'ltxhtq'
      },
      {
        icon: '../../../image/gjjtq/tqyy_qtxh.png',
        text: '离职未就业提取',
        bm:'fctwoyears',
        tqyy:'0205',
        gjhtqywlx:'销户提取',
        zhfwpath:'tq_lzwjy',
        path:'fctwoyears'
      },
    ],
  },
  onItemClick(ev) {
    console.log("<<<<<<",this.data.tqlxArray[ev.detail.index]);
    if(ev.detail.index=='2'){
      this.ZhfwglClick(ev.detail.index,this.data.tqlxArray[ev.detail.index].zhfwpath,this);
    }else{
     my.alert({
       content: ev.detail.index,
      });
    }
    
  },

  ZhfwglClick:(tqArrybm,zhfwpath,that) => {
    //正在校验
    let bm = app.data.zjbzxbm.substr(0, 6);
    let url001 = "/" + bm + "/app_12329/" + zhfwpath + ".businesscheck";
    my.httpRequest({
      url: app.data.url + '/app-web/public/skip/second.service',
      method: 'POST',
      headers: {
        "Content-Type": "application/json",
        "citycode": app.data.zjbzxbm.substr(0, 6)
      },
      data: {
        appid: "20170517000101",
        sign: "SYWDJSKI8UYH7D7FKIUJNE45IJHYRKJ0",
        path:url001
      },
      dataType: 'json',
      contentType: 'application/json;charset=UTF-8', //contentType很重要    
      success: (res) => {
        console.log("&&&");
        console.log(res);
        if (res.status == "200") {
            console.log("nmasinnnnnnn<<<<",that.__proto__.data);
            let resultjson=that.__proto__.data;
            that.jcrywblyzClick(resultjson.tqlxArray[tqArrybm].bm,resultjson.tqlxArray[tqArrybm].gjhtqywlx, resultjson.tqlxArray[tqArrybm].tqyy,that);
        } else {
            my.hideLoading();
            my.alert({ content: res.msg});
        }
        // my.hideLoading();
      },
      fail: (res) => {
        my.hideLoading();
        my.alert({ content: "网络错误" });
      },
    });
  },

jcrywblyzClick:(tiqupath,gjhtqywlx,tqyy,that) => {
    my.httpRequest({
      url: app.data.url + '/app-web/public/skip/second.service',
      method: 'POST',
      headers: {
        "Content-Type": "application/json",
        "citycode": app.data.zjbzxbm.substr(0, 6)
      },
      data: {
        appid: "20170517000101",
        sign: "SYWDJSKI8UYH7D7FKIUJNE45IJHYRKJ0",
        path:"/HFSC/common/jcrywblyz.service",
        ffbm:"01",
        gjhtqywlx:gjhtqywlx,
        dwzh:"2016003028",
        grzh: app.data.grzh,
        khbh:"",
        userid:parseFloat(0),
        zhbh:"",
        zjbzxbm:app.data.zjbzxbm.substr(0, 6),
        blqd:"app_12329"
      },
      dataType: 'json',
      contentType: 'application/json;charset=UTF-8', //contentType很重要    
      success: (res) => {
        console.log("&&&>>>>>>>>>>>>>");
        console.log(res);
        my.hideLoading();
      },
      fail: (res) => {
        my.hideLoading();
        my.alert({ content: "网络错误" });
      },
    });
  },
  

//  isrealnameClick:(tqArrybm,that) => {
//     //正在校验
//     console.log('isrealnameClick>>>', app.data.grzh);
//     my.httpRequest({
//       url: app.data.url + '/app-web/public/skip/first.service',
//       method: 'POST',
//       headers: {
//         "Content-Type": "application/json",
//         "citycode": app.data.zjbzxbm.substr(0, 6)
//       },
//       data: {
//         appid: "20170517000101",
//         sign: "SYWDJSKI8UYH7D7FKIUJNE45IJHYRKJ0",
//         path:"/app_12329/public/auth/isrealname.service",
//         blqd:"app_12329",
//         citybm:app.data.zjbzxbm.substr(0, 6),
//         xingming: app.data.xingming,
//         zjhm: app.data.zjhm
//       },
//       dataType: 'json',
//       contentType: 'application/json;charset=UTF-8', //contentType很重要    
//       success: (res) => {
//         console.log("&&&",JSON.parse(res.data));
//         console.log(res.data.ret);
//         let resultjson=JSON.parse(res.data);
//         console.log("&&&",resultjson.ret);
//         if (resultjson.ret == "0") {
//             //isrealnameClick(index);
//             // jcrywblyzClick(tqlxArray[index].bm, tqlxArray[index].gjhtqywlx, tqlxArray[index].tqyy);//TODO 测试去掉支付宝登录
//         } else {
            
//             //   my.hideLoading();
//             //   my.confirm({
//             //   title: '提示',
//             //   content: '完善信息后办理提取业务',
//             //   confirmButtonText: '确定',
//             //   cancelButtonText: '取消',
//             //   success: (result) => {
//             //     console.log("<<<<<<<",result.confirm);
//             //     if(result.confirm){
//             //       my.navigateTo({ url: '../../mine/grzx/grzx' })
//             //     }
//             //    },
//             //  });
//         }
//         // my.hideLoading();
//       },
//       fail: (res) => {
//         my.hideLoading();
//         my.alert({ content: "系统维护中..." });
//       },
//     });
//   },
  

});