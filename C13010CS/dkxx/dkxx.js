const app = getApp();
const exceptions = () => {
  my.showToast({ type: 'exception', content: '网络异常',duration: 3000});
}
Page({
  data: {
     tabs: [
      {title: '贷款信息'},
      {title: '还款明细'},
      { title: '还款计划' },
      { title: '逾期明细' },
    ],
    activeTab: 0,

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

    ksrq:'2017-01-01',
    jsrq:'2019-01-01',
    jsrq1:'2022-02-02',
    items: [],
    items1: [],
    items2: [],
    hkjhxq:'-2',
    hkjhxq1:'-2',
    hkjhxq2:'-2',
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

    yhqs:'',
    yqbjhj:'',
    yqfx:'',
    yqfxhj:'',
    yqlx:'',
    yqlxhj:'',
  },

  handleTabClick({ index }) {
    if(index=="0"){
      this.setData({
      activeTab: index,
    });
    }else if(index=="1"){
       this.Serchhkmx(this);
       this.setData({
       activeTab: index,
    });
    }else if(index=="2"){
       this.Serchhkjh(this);
       this.setData({
       activeTab: index,
    });
    }else{
      this.Serchyqhk(this);
      this.setData({
      activeTab: index,
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
    let formatDate = year + '-' + month + '-' + day;
    let ksmatDate= (year-1) + '-' + month + '-' + day;
    console.log(">>>>>formatDate>>>>>",formatDate);
    console.log(">>>>>ksmatDate>>>>>",ksmatDate);
    my.httpRequest({
      url:  app.data.url+'/app-web/personal/public/dkzhxxcx.service',
      method: 'POST',
      headers: {
            "Content-Type": "application/json",
            "citycode":app.data.zjbzxbm.substr(0,6)
      },
      data: {
        appid: "20170517000101",
        zjbzxbm:app.data.zjbzxbm,
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
         my.showToast({type: 'fail',content: '操作失败',duration: 3000});
        }
      },
      fail:(res) => {
        my.alert({content:"网络错误"});
      },
    });
  },

  Serchhkjh:(that)=>{
     console.log("还款计划ksrq>>>>>>>>>",that.data.ksrq1);
     console.log("还款计划jsrq>>>>>>>>>",that.data.jsrq1);
     my.httpRequest({
      url: app.data.url+'/app-web/personal/public/dkhkjhcx.service',
      method: 'POST',
      headers: {
            "Content-Type": "application/json",
            "citycode":app.data.zjbzxbm.substr(0,6)
      },
      data: {
        appid: "20170517000101",
        zjbzxbm:app.data.zjbzxbm,
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
              hkjhmx1[i].extra = '￥'+hkjhmx1[i].yhbx;
              hkjhmx1[i].inum=i;
              hkjhmx.push(hkjhmx1[i]);
            
          }
          that.setData({
            items1:hkjhmx
          });
      
        }else{
          that.setData({
            items1:hkjhmx
           });
         my.showToast({type: 'none',content: '查无数据',duration: 3000});
        }
      },
      fail:(res) => {
       exceptions();
      },
    });
  },
// ----比较时间---
 compareDateEndTimeGTStartTime:(startTime, endTime) =>{
        return ((new Date(endTime.replace(/-/g, "/"))) > (new Date(
                startTime.replace(/-/g, "/"))));
    },
//查询还款明细数据
Serchhkmx:(that)=>{

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
      url: app.data.url+'/app-web/personal/public/dkhkmxcx.service',
      method: 'POST',
      headers: {
            "Content-Type": "application/json",
            "citycode":app.data.zjbzxbm.substr(0,6)
      },
      data: {
        appid: "20170517000101",
        sign:"SYWDJSKI8UYH7D7FKIUJNE45IJHYRKJ0",
        zjbzxbm:app.data.zjbzxbm,
        ksrq:that.data.ksrq,
        jsrq:that.data.jsrq,
        jkhtbh:app.data.jkhtbh
      },
      dataType: 'json',
      contentType : 'application/json;charset=UTF-8', //contentType很重要    
      success: (res) => {
         let dkhkmc = [];
         let dkhkmc1 = [];
         let inum=0;
         my.hideLoading();
         if(res.data.ret == "0"){
          dkhkmc1 = res.data.data;
         console.log("dkxxmc",);
          for(var i=0; i<dkhkmc1.length; i++){
            if(dkhkmc1[i].hkny.length>0){
              console.log("dkxx.length<<<<<<<<",dkhkmc1.length);
              dkhkmc1[i].title = dkhkmc1[i].hkny + '期';
              dkhkmc1[i].extra = "￥"+(dkhkmc1[i].chbj*100+dkhkmc1[i].chfx*100+dkhkmc1[i].chlx*100)/100;
              dkhkmc1[i].inum=inum++;
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
          my.showToast({type: 'none',content: '查无数据',duration: 3000});
        }
      },
      fail:(res) => {
        exceptions();
      },
    });
  },
  //查询逾期明细数据
Serchyqhk:(that)=>{  
     my.httpRequest({
      url: 'https://api.sjgjj.cn/app-web/personal/public/yqwhkmxcx.service',
      method: 'POST',
      headers: {
            "Content-Type": "application/json",
            "citycode":app.data.zjbzxbm.substr(0,6)
      },
      data: {
        appid: "20170517000101",
        zjbzxbm:app.data.zjbzxbm,
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
              yqhkmc1[i].title = yqhkmc1[i].yhny + '期';
              yqhkmc1[i].extra =  "￥"+(yqhkmc1[i].yqbj*100+yqhkmc1[i].yqfx*100+yqhkmc1[i].yqlx*100)/100;
              yqhkmc1[i].inum=i;
              yqhkmc.push(yqhkmc1[i]);
          
          }
          that.setData({
            items2:yqhkmc
          });
      
        }else{
          that.setData({
            items2:yqhkmc
           });
          my.showToast({type: 'none',content: '查无数据',duration: 3000});
        }
      },
      fail:(res) => {
        exceptions();
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
   if(ev.index===this.data.hkjhxq1){
     this.setData({
       hkjhxq1:-1
     });
     return;
   }
   this.setData({
      hkjhxq1:ev.index,
      yhrq: this.data.items1[ev.index].yhrq,
      yhbj:this.data.items1[ev.index].yhbj,
      yhlx:this.data.items1[ev.index].yhlx,
      yhbx:this.data.items1[ev.index].yhbx,
  });
  console.log(this.data.hkjhxq1);
},
onItemClick2(ev){
   console.log("ev>>>>>",ev)
   console.log(">>>>>>>>",this.data.items2,this.data.items2[ev.index]);
   if(ev.index===this.data.hkjhxq2){
     this.setData({
       hkjhxq2:-1
     });
     return;
   }
   this.setData({
      hkjhxq2:ev.index,
      yhrq: this.data.items2[ev.index].yhrq,
      yhqs:this.data.items2[ev.index].yhqs,
      yqbjhj:this.data.items2[ev.index].yqbjhj,
       yqfx:this.data.items2[ev.index].yqfxhj,
       yqfxhj:this.data.items2[ev.index].yqfxhj,
       yqlx:this.data.items2[ev.index].yqlx,
       yqlxhj:this.data.items2[ev.index].yqlxhj,
  });
  console.log(this.data.hkjhxq2);
},
  jsdatePicker1() {
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
    let formatDate = year + '-' + month + '-' + day;
    console.log(">>>>>formatDate>>>>>",formatDate);
    my.datePicker({
      currentDate: '',
      success: (res) => {
        console.log(">>>>>JSON.stringify(res)>>>>>",res.date);
        this.setData({
          jsrq1:res.date,
        });
        this.Serchhkjh(this);
      },
    });
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
    let formatDate = year + '-' + month + '-' + day;
    console.log(">>>>>formatDate>>>>>",formatDate);
    my.datePicker({
      currentDate: '',
      success: (res) => {
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


