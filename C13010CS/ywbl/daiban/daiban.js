const app = getApp();
const exceptions = () => {
  my.showToast({ type: 'exception', content: '网络异常',duration: 3000});
}
Page({
  data: {
     tabs: [
      { title: '待办事项' },
      { title: '我发起的' },
    ],
    activeTab: 0,

    fqitems: [],
    dbitems: [],
    grbh:"",
    // num:"",//待办中确定对应流程
    // num01:"",
    flagdb:0,
    flagfq:0,
  
  },

  handleTabClick({ index }) {
    if(index=="0"){
      this.lcwddbxxcx(this);
      this.setData({
      activeTab: index,
    });
    }else {
      this.lcjdcx(this);
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
    my.httpRequest({
      url: app.data.url+'/app-web/personal/public/gjjzhxxcx.service',
      method: 'POST',
      headers: {
            "Content-Type": "application/json",
            "citycode":app.data.zjbzxbm.substr(0,6)
      },
      data: {
        appid: "20170517000101",
        zjbzxbm:"C13010KF",
        sign:"SYWDJSKI8UYH7D7FKIUJNE45IJHYRKJ0",
        grzh:app.data.grzh
      },
      dataType: 'json',
      contentType : 'application/json;charset=UTF-8', //contentType很重要    
      success: (res) => {
        console.log("res>>>>>>",res);res.data.data[0].grbhgrbh
        console.log("res.data.data[0].grbh>>>>>>",res.data.data[0].grbh);
        this.setData({
          grbh: res.data.data[0].grbh
        });
        this.lcwddbxxcx(this);
      },
      fail:(res) => {
        my.alert({content:"网络错误"});
      }, complete:(res) => {
        // my.alert({title: 'complete'});
      }
    });
  },

 //流程节点查询
  lcjdcx:(that)=>{
     console.log("流程节点查询>>>>>>>>>");
     my.httpRequest({
      url: app.data.url+'/app-web/public/task/lcjdcx.service',
      method: 'POST',
      headers: {
            "Content-Type": "application/json",
            "citycode":app.data.zjbzxbm.substr(0,6)
      },
      data: {
        appid: "20170517000101",
        sign:"SYWDJSKI8UYH7D7FKIUJNE45IJHYRKJ0",
        grbh:that.data.grbh,
        citybm: "C13010KF",
      },
      dataType: 'json',
      contentType : 'application/json;charset=UTF-8', //contentType很重要    
      success: (res) => {
         let lcjdmx = [];
         let lcjdmx1 = [];
         //let num=0;
         //my.hideLoading();
         console.log("流程节点查询返回>>>>>>>>>",res);
         if(res.data.ret == "0"){
          lcjdmx1 = res.data.data;
          if(lcjdmx1.length>0){
            that.setData({
              flagfq:1,
            });
          }
          console.log("lcjdmx1流程节点查询返回mc",lcjdmx1);
          for(var i=0; i<lcjdmx1.length; i++){
              lcjdmx1[i].channgel = lcjdmx1[i].channgel;
              lcjdmx1[i].description =lcjdmx1[i].description;
              lcjdmx1[i].processDefinitionName=lcjdmx1[i].processDefinitionName;
              lcjdmx1[i].source =lcjdmx1[i].source;
              lcjdmx1[i].durationTime =lcjdmx1[i].durationTime;
              lcjdmx1[i].sfwc =lcjdmx1[i].finished== true ? "是" : "否";
              lcjdmx1[i].num =i;
              lcjdmx.push(lcjdmx1[i]);
          }
          that.setData({
            fqitems:lcjdmx
          });
      
         }else{
          that.setData({
            fqitems:lcjdmx
           });
           
          my.showToast({type: 'none',content: '查无数据',duration: 3000});
        }
        console.log(">>>>",that.data.fqitems);
      },
      fail:(res) => {
       exceptions();
      },
    });
  },
  //流程待办信息查询
lcwddbxxcx:(that)=>{  
     my.httpRequest({
      url: app.data.url+'/app-web/public/task/lcwddbxxcx.service',
      method: 'POST',
      headers: {
          "Content-Type": "application/json",
          "citycode":app.data.zjbzxbm.substr(0,6)
      },
      data: {
        appid: "20170517000101",
        sign:"SYWDJSKI8UYH7D7FKIUJNE45IJHYRKJ0",
        grbh:that.data.grbh,
        citybm: "C13010KF",
      },
      dataType: 'json',
      contentType : 'application/json;charset=UTF-8', //contentType很重要    
      success: (res) => {
        console.log("流程待办信息查询>>>>>>>>>",res);
         let lcdbmx = [];
         let lcdbmx1 = [];
         //my.hideLoading();
         if(res.data.ret == "0"){
          lcdbmx1 = res.data.data;
          if(lcdbmx1.length>0){
            that.setData({
              flagdb:1,
            });
          }
          console.log("lcdbmx1流程待办查询返回mc",lcdbmx1);
          for(var i=0; i<lcdbmx1.length; i++){
              lcdbmx1[i].channgel = lcdbmx1[i].channgel;
              lcdbmx1[i].source =lcdbmx1[i].source;
              lcdbmx1[i].processDefinitionName=lcdbmx1[i].processDefinitionName;
              lcdbmx1[i].taskName =lcdbmx1[i].taskName;
              lcdbmx1[i].createTime =lcdbmx1[i].createTime;
              lcdbmx1[i].description =lcdbmx1[i].description;
              lcdbmx1[i].num =i;
              lcdbmx.push(lcdbmx1[i]);
          }
          that.setData({
            dbitems:lcdbmx
          });
         }else{
          that.setData({
            dbitems:lcdbmx
           });
          my.showToast({type: 'none',content: '查无数据',duration: 3000});
        }
        console.log(">>>>",that.data.dbitems);
      },
      fail:(res) => {
        exceptions();
      },
    });
  },
  //查看退回原因
  lcxxcxClick(e){
   console.log("查看退回原因<<<<<<<<<<",e.currentTarget.dataset.value);
   let dic =this.data.dbitems[e.currentTarget.dataset.value];
   let map =dic.processInstanceId;
   //my.navigateTo({ url: '../../daiban/lcxxcx?map='+map });
    my.navigateTo({ url: '../daiban/lcxxcx?map='+map }); 
  },
  //修改重新上传 
  tiaozhengClick(e){
    console.log("修改重新上传<<<<<<<<<<",e.currentTarget.dataset.value);
    let dic =this.data.dbitems[e.currentTarget.dataset.value];
    console.log("dic>>>>>>>>",dic);
    let map =dic.businessKey+','+dic.taskId;
    if(dic.processDefinitionKey=="jcr_ltxhtq_sp"){
      my.navigateTo({ url: '../daiban/adjust_lxtq/adjust_lxtq?map='+map });
    }

  },
  //查看 
  wfqdlcxxcxClick(e){
   console.log("查看<<<<<<<<<<",e.currentTarget.dataset.value);
   let dic =this.data.dbitems[e.currentTarget.dataset.value];
   let map =dic.processInstanceId;
   //my.navigateTo({ url: '../../daiban/lcxxcx?map='+map });
   my.navigateTo({ url: '../daiban/lcxxcx?map='+map });
  }
});


