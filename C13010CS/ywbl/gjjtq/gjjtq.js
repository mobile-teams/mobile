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

   ZhfwglClick:(tqArrybm,zhfwpath,that)=> {
     console.log("zhfwpath<<<<<<<<<<",zhfwpath);
     console.log("tqArrybm<<<<<<<<<<",tqArrybm);

      // let bm = "C13010";
      // let url = "/" + bm + "/app_12329/" + zhfwpath + ".businesscheck";
      // let obj = new Object();
      // obj.path = url;
      // obj.appid = localStorage.appid;
      // obj.citybm = localStorage.citybm;
      // obj.sign = shineyue.getSign(obj);//加密;
      // console.log("url = ", url);
      // let param = {
      //     url: "/app-web/public/skip/second.service",
      //     data: JSON.stringify(obj),
      //     headers: {citycode: obj.citybm}
      // };
      // Shine.post(param, function (result, err) {
      //     if (err) {
      //         shineyue.showError("网络错误");
      //         return;
      //     }
      //     let resultjson = JSON.parse(result);
      //     console.log("businesscheck==", resultjson);
      //     if (resultjson.status == "200") {
      //         that.isrealnameClick(tqArrybm);
      //         // jcrywblyzClick(tqlxArray[index].bm, tqlxArray[index].gjhtqywlx, tqlxArray[index].tqyy);//TODO 测试去掉支付宝登录
      //     } else {
      //         shineyue.showDismiss();
      //         shineyue.showAlertPopRoot("提示", resultjson.msg, "确定");
      //     }
      //   });
   },

  



});