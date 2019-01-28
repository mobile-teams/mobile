const app = getApp();
Page({
  data: {
     tabs: [
      {title: '贷款信息',},
      {title: '还款明细'},
      { title: '还款计划' },
      { title: '逾期明细' },
    ],
    activeTab:0,
    items:[],
    items1:[],
    items2:[],
    jkthbh:'',
    jkrgjjzh:'',
    jkrdwmc:'',
    jkrxm:'',
    jkrzjhm:'',
    dkffe:'',
    dkffrq:'',
    dkyh:'',
    dkzt:'',
    dkye:'',
    dklx:'',
    dkhkfs:'',
    ydhkr:'',
    sfdc:'',
    dkll:'',
    yjqrq:'',
  },
  handleTabClick({ index }) {
    this.setData({
      activeTab: index,
    });
  },
   handleTabChange({ index }) {
     this.setData({
       activeTab: index,
     });
   },
 
  onLoad() {
     my.showLoading({
       content: '加载中...',
       delay: '1000',
     });
    my.httpRequest({
      url: 'http://192.168.54.77:8089/app-web/personal/public/dkzhxxcx.service',
      method: 'POST',
      headers: {
            "Content-Type": "application/json",
            "citycode":"C23020KF"
      },
      data: {
        appid: "20170517000101",
        zjbzxbm:"C23020KF",
        sign:"SYWDJSKI8UYH7D7FKIUJNE45IJHYRKJ0",
        jkhtbh:app.data.jkhtbh
      },
      dataType: 'json',
      contentType : 'application/json;charset=UTF-8', //contentType很重要    
      success: (res) => {
        const dkxx = res.data.data[0];
        console.log(dkxx)
         my.hideLoading();
        if(res.data.ret==0){
           this.setData({
               jkhtbh:app.data.jkhtbh,
               jkrgjjzh:dkxx.jkrgjjzh,
               jkrdwmc:dkxx.jkrdwmc,
               jkrxm: dkxx.jkrxm,
               jkrzjhm:dkxx.jkrzjh,
               dkffe:dkxx.dkffe, 
               dkffrq: dkxx.dkffrq,
               dkyh:dkxx.zhkhyhmc,
               dkzt:dkxx.dkzt, 
               dkye: dkxx.dkye,
               dklx:dkxx.dklx,
               dkhkfs:dkxx.dkhkfs, 
               ydhkr: dkxx.ydhkr+'日',
               sfdc:dkxx.sfdc,
               dkll:dkxx.dkll+'%', 
               yjqrq: dkxx.yjqrq,
          });
        }else{
          my.alert({
            title: '提示' ,
            content:res.data.msg
          });
        }
      },
      fail:(res) => {
        my.alert({content:"网络错误"});
      },
    });
    //查询还款明细数据
     my.httpRequest({
      url: 'http://192.168.54.77:8089/app-web/personal/public/dkhkmxcx.service',
      method: 'POST',
      headers: {
            "Content-Type": "application/json",
            "citycode":"C23020KF"
      },
      data: {
        appid: "20170517000101",
        zjbzxbm:"C23020KF",
        ksrq:"2012-06-22",
        jsrq:"2020-01-01",
        sign:"SYWDJSKI8UYH7D7FKIUJNE45IJHYRKJ0",
        jkhtbh:app.data.jkhtbh
      },
      dataType: 'json',
      contentType : 'application/json;charset=UTF-8', //contentType很重要    
      success: (res) => {
         const hkmx = res.data.data
         console.log(hkmx);
         for(var i=0; i<hkmx.length; i++){
            hkmx[i].title = hkmx[i].hkrq;
            hkmx[i].extra = Number(hkmx[i].chlx)+Number(hkmx[i].chbj);
         }        
          this.setData({
           items:hkmx
         });
      },
      fail:(res) => {
        my.alert({content:"网络错误"});
      },
    });
     //查询还款计划数据 
      my.httpRequest({
      url: 'http://192.168.54.77:8089/app-web/personal/public/dkhkmxcx.service',
      method: 'POST',
      headers: {
            "Content-Type": "application/json",
            "citycode":"C23020KF"
      },
      data: {
        appid: "20170517000101",
        zjbzxbm:"C23020KF",
        ksrq:"2012-06-22",
        jsrq:"2020-01-01",
        sign:"SYWDJSKI8UYH7D7FKIUJNE45IJHYRKJ0",
        jkhtbh:app.data.jkhtbh
      },
      dataType: 'json',
      contentType : 'application/json;charset=UTF-8', //contentType很重要    
      success: (res) => {
         const hkmx = res.data.data
         console.log(hkmx);
         for(var i=0; i<hkmx.length; i++){
            hkmx[i].title = hkmx[i].hkrq;
            hkmx[i].extra = Number(hkmx[i].chlx)+Number(hkmx[i].chbj);
         }        
          this.setData({
           items:hkmx
         });
      },
      fail:(res) => {
        my.alert({content:"网络错误"});
      },
    });
    //查询逾期明细数据
      my.httpRequest({
      url: 'http://192.168.54.77:8089/app-web/personal/public/dkhkmxcx.service',
      method: 'POST',
      headers: {
            "Content-Type": "application/json",
            "citycode":"C23020KF"
      },
      data: {
        appid: "20170517000101",
        zjbzxbm:"C23020KF",
        ksrq:"2012-06-22",
        jsrq:"2020-01-01",
        sign:"SYWDJSKI8UYH7D7FKIUJNE45IJHYRKJ0",
        jkhtbh:app.data.jkhtbh
      },
      dataType: 'json',
      contentType : 'application/json;charset=UTF-8', //contentType很重要    
      success: (res) => {
         const hkmx = res.data.data
         console.log(hkmx);
         for(var i=0; i<hkmx.length; i++){
            hkmx[i].title = hkmx[i].hkrq;
            hkmx[i].extra = Number(hkmx[i].chlx)+Number(hkmx[i].chbj);
         }        
          this.setData({
           items:hkmx
         });
      },
      fail:(res) => {
        my.alert({content:"网络错误"});
      },
    });
  },
});


