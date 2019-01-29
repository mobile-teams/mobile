const app = getApp();
Page({
  data: {
     tabs: [
      {
        title: '贷款信息',
       // badgeType: 'text',
       // badgeText: '6',
      },
      {
        title: '还款明细',
        //badgeType: 'dot',
        tabBarBackgroundColor:'#0000ff',
      },
      { title: '还款计划' },
      { title: '逾期明细' },
    ],
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
    num:'0',// 隐藏view
    ksrq:'2000-10-11',
    jsrq:'',
    ksrq1:'2019-01-01',
    jsrq1:'2030-01-01',
    activeTab: 0,
    items: [
      
    ],
    items1: [
      
    ],
    items2: [
      
    ],
    hkjhxq:'-2',
    ywzy:'',
    hkrq:'',
    bjye:'',
    chbj:'',
    chlx: '',
    yhbjhj:'',
    yhlxhj:'',

    yhrq:'',
    yhbj:'',
    yhlx:'',
    yhbx:'',
  },

  handleTabClick({ index }) {
    console.log("index01>>>>>>",index);
     console.log(">>>>>>>>.",this.data.showView);
    if(index=="0"){
      console.log("贷款信息>>>>>>",index);
      this.setData({
      num:'0',
      activeTab: index,
    });
    }else if(index=="1"){
       console.log("还款明细>>>>>>",index);
       this.Serchhkmx(this);
       this.setData({
       activeTab: index,
       num:'1',
    });
    }else if(index=="2"){
       console.log("还款计划>>>>>>",index);
       this.Serchhkjh(this);
       this.setData({
       activeTab: index,
       num:'2',
    });
    }else{
      this.setData({
      activeTab: index,
      num:'3',
    });
    }
  },
  handleTabChange({ index }) {
     if(index=="0"){
      console.log("贷款信息>>>>>>",index);
      this.setData({
      num:'0',
      activeTab: index,
    });
    }else if(index=="1"){
       console.log("还款明细>>>>>>",index);
       this.Serchhkmx(this);

       this.setData({
       activeTab: index,
       num:'1',
    });
    }else if(index=="2"){
       console.log("还款计划>>>>>>",index);
       this.Serchhkjh(this);
       this.setData({
       activeTab: index,
       num:'2',
    });
    }else{
      console.log("逾期还款>>>>>>",index);
      this.Serchyqhk(this);
      this.setData({
      activeTab: index,
      num:'3',
    });
    }
  },
 
  onLoad() {
    //  my.showLoading({
    //    content: '加载中...',
    //    delay: '1000',
    //  });

    let now = new Date(); 
    let year = now.getFullYear(); 
    let month = now.getMonth() + 1; 
    let day = now.getDate(); 
    if (month < 10) { 
    month = '0' + month; 
    }; 
    if (day < 10) { 
    day = '0' + day; 
    }; 
    // 如果需要时分秒 
    // var h = now.getHours(); 
    // var m = now.getMinutes(); 
    // var s = now.getSeconds(); 
    let formatDate = year + '-' + month + '-' + day;
    let ksmatDate= (year-1) + '-' + month + '-' + day;
    console.log(">>>>>formatDate>>>>>",formatDate);
    console.log(">>>>>ksmatDate>>>>>",ksmatDate);
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
               jsrq:formatDate,
               ksrq:ksmatDate,
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
  },
  "tabBar": {
    "textColor": "#dddddd",
    "selectedColor": "#49a9ee",
    "backgroundColor": "#ffffff",
    "items": [
      {
        "pagePath": "pages/index/index",
        "name": "首页"
      },
      {
        "pagePath": "pages/logs/logs",
        "name": "日志"
      }
    ]
  },

  Serchhkjh:(that)=>{
    //  my.showLoading({
    //    content: '加载中...',
    //    delay: '1000',
    //  });
    //  console.log("ksrq>>>>>>>>>",this.ksrq);
      console.log("还款计划ksrq>>>>>>>>>",that.data.ksrq1);
     console.log("还款计划jsrq>>>>>>>>>",that.data.jsrq1);
     my.httpRequest({
      url: 'http://192.168.54.77:8089/app-web/personal/public/dkhkjhcx.service',
      method: 'POST',
      headers: {
            "Content-Type": "application/json",
            "citycode":"C23020KF"
      },
      data: {
        appid: "20170517000101",
        zjbzxbm:"C23020KF",
        ksrq:that.data.ksrq1,
        jsrq:that.data.jsrq1,
        sign:"SYWDJSKI8UYH7D7FKIUJNE45IJHYRKJ0",
        jkhtbh:app.data.jkhtbh
      },
      dataType: 'json',
      contentType : 'application/json;charset=UTF-8', //contentType很重要    
      success: (res) => {
         let hkjhmx = [];
         let hkjhmx1 = [];
         //my.hideLoading();
         if(res.data.ret == "0"){
          hkjhmx1 = res.data.data;
         console.log("dkxxmc",hkjhmx1.length);
          for(var i=0; i<hkjhmx1.length; i++){
              hkjhmx1[i].title = hkjhmx1[i].yhrq + '期';
              hkjhmx1[i].extra = hkjhmx1[i].yhbj;
              hkjhmx1[i].inum=i;
              hkjhmx.push(hkjhmx1[i]);
            
          }
          that.setData({
            items1:hkjhmx
          });
      
        }else{
          that.setData({
            items:hkjhmx
          });
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
  },
// ----比较时间---
 compareDateEndTimeGTStartTime:(startTime, endTime) =>{
        return ((new Date(endTime.replace(/-/g, "/"))) > (new Date(
                startTime.replace(/-/g, "/"))));
    },

Serchhkmx:(that)=>{
    //  my.showLoading({
    //    content: '加载中...',
    //    delay: '1000',
    //  });
    let currentData=(that.data.jsrq).replace('-','');//=(that.data.jsrq).substring(0,(that.data.jsrq).replace('-','').length-3);

    let currentData02=(that.data.jsrq).substring(0,(that.data.jsrq).replace('-','').length-3);

    console.log("currentData<<<<<<",that.compareDateEndTimeGTStartTime(that.data.ksrq,that.data.jsrq));
    
    if(!that.compareDateEndTimeGTStartTime(that.data.ksrq,that.data.jsrq)){
         my.alert({
            title: '提醒！' ,
            content:'开始时间不得大于结束时间'
          });

          return;
    }
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
        ksrq:that.data.ksrq,
        jsrq:that.data.jsrq,
        sign:"SYWDJSKI8UYH7D7FKIUJNE45IJHYRKJ0",
        jkhtbh:app.data.jkhtbh
      },
      dataType: 'json',
      contentType : 'application/json;charset=UTF-8', //contentType很重要    
      success: (res) => {
    
         let dkhkmc = [];
         let dkhkmc1 = [];
         my.hideLoading();
         if(res.data.ret == "0"){
          dkhkmc1 = res.data.data;
         console.log("dkxxmc",);
          for(var i=0; i<dkhkmc1.length; i++){
            if(dkhkmc1[i].hkny.length>0){
              console.log("dkxx.length<<<<<<<<",dkhkmc1.length);
              dkhkmc1[i].title = dkhkmc1[i].hkny + '期';
              dkhkmc1[i].brief = dkhkmc1[i].yhbjhj;
              dkhkmc1[i].extra = dkhkmc1[i].yhbjhj;
              dkhkmc1[i].inum=i;
              dkhkmc.push(dkhkmc1[i]);
            }
          }
          that.setData({
            items:dkhkmc
          });
      
        }else{
          that.setData({
            items:dkhkmc
          });
          my.alert({
            title: '提示' ,
            content:res.data.msg
          });
        }
      },
      fail:(res) => {
        console.log('dkresxx');
        my.alert({content:"网络错误"});
      },
    });
  },
Serchyqhk:(that)=>{  
     my.httpRequest({
      url: 'http://192.168.54.77:8089/app-web/personal/public/yqwhkmxcx.service',
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
    
         let yqhkmc = [];
         let yqhkmc1 = [];
         my.hideLoading();
         if(res.data.ret == "0"){
          yqhkmc1 = res.data.data;
         console.log("dkxxmc",);
          for(var i=0; i<yqhkmc1.length; i++){
            if(yqhkmc1[i].hkny.length>0){
              console.log("dkxx.length<<<<<<<<",yqhkmc1.length);
              yqhkmc1[i].title = yqhkmc1[i].hkny + '期';
              yqhkmc1[i].brief = yqhkmc1[i].yhbjhj;
              yqhkmc1[i].extra = yqhkmc1[i].yhbjhj;
              yqhkmc1[i].inum=i;
              yqhkmc.push(yqhkmc1[i]);
            }
          }
          that.setData({
            items2:yqhkmc
          });
      
        }else{
          that.setData({
            items2:yqhkmc
          });
          my.alert({
            title: '提示' ,
            content:res.data.msg
          });
        }
      },
      fail:(res) => {
        console.log('dkresxx');
        my.alert({content:"网络错误"});
      },
    });
  },
onItemClick(ev){
   console.log("ev>>>>>",ev)
   console.log(">>>>>>>>",this.data.items,this.data.items[ev.index]);
   if(ev.index===this.data.hkjhxq){
     this.setData({
       hkjhxq:-1
     });
     return;
   }
   this.setData({
      hkjhxq:ev.index,
      chlx: this.data.items[ev.index].chlx,
      ywzy:this.data.items[ev.index].ywzy,
      hkrq:this.data.items[ev.index].hkrq,
      bjye:this.data.items[ev.index].bjye,
      chbj:this.data.items[ev.index].chbj,
      chlx:this.data.items[ev.index].chlx,
      yhbjhj:this.data.items[ev.index].yhbjhj,
      yhlxhj:this.data.items[ev.index].yhlxhj,
  });
  console.log(this.data.hkjhxq);
},
onItemClick1(ev){
   console.log("ev>>>>>",ev)
   console.log(">>>>>>>>",this.data.items1,this.data.items1[ev.index]);
   if(ev.index===this.data.hkjhxq){
     this.setData({
       hkjhxq:-1
     });
     return;
   }
   this.setData({
      hkjhxq:ev.index,
      yhrq: this.data.items1[ev.index].yhrq,
      yhbj:this.data.items1[ev.index].yhbj,
      yhlx:this.data.items1[ev.index].yhlx,
      yhbx:this.data.items1[ev.index].yhbx,
  });
  console.log(this.data.hkjhxq);
},
  jsdatePicker() {
    let now = new Date(); 
    let year = now.getFullYear(); 
    let month = now.getMonth() + 1; 
    let day = now.getDate(); 
    if (month < 10) { 
    month = '0' + month; 
    }; 
    if (day < 10) { 
    day = '0' + day; 
    }; 
    // 如果需要时分秒 
    // var h = now.getHours(); 
    // var m = now.getMinutes(); 
    // var s = now.getSeconds(); 
    let formatDate = year + '-' + month + '-' + day;
    console.log(">>>>>formatDate>>>>>",formatDate);
    my.datePicker({
      currentDate: '',
     // startDate: '2016-10-9',
     // endDate: formatDate,
      success: (res) => {
        // my.alert({
        //   title: 'datePicker response: ' + JSON.stringify(res)
        // });
        console.log(">>>>>JSON.stringify(res)>>>>>",res.date);
        this.setData({
          jsrq:res.date,
        });
        this.Serchhkmx(this);
      },
    });
  },
   ksdatePicker() {
    let now = new Date(); 
    let year = now.getFullYear(); 
    let month = now.getMonth() + 1; 
    let day = now.getDate(); 
    if (month < 10) { 
    month = '0' + month; 
    }; 
    if (day < 10) { 
    day = '0' + day; 
    }; 
    my.datePicker({
      currentDate: '',
      success: (res) => {
        this.setData({
          ksrq:res.date,
        });
        this.Serchhkmx(this);
      },
    });
  },

});


