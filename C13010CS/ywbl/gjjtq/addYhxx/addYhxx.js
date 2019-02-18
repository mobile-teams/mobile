const app = getApp();
let yhxxArray;
let jcrkhdj11DicGlobal;
let jcrtqxxcxData;
Page({
  data: {
    fhjmmc:'',
    address:'',
    addskyh:'',
    addyhzh:'',
    index: 0,
    array:[]
  },
  onLoad(options) {
    this.searchskyh(this);
    var map = options.map.split(",");
    console.log("map",map);
     this.setData({
      fhjmmc:map[0],
      address:map[1],
    })
  },
   //返回
  fanhuiClick() {
    my.navigateTo({ url: '../../gjjtq/'+this.data.fhjmmc+'/'+this.data.fhjmmc});
  },
  //添加银行信息
  addyhzhInput(e) {
    this.setData({
      addyhzh: e.detail.value,
    });
    console.log("e3<<<<<<<<",e);
  },

  addyhzhClick(){
     my.httpRequest({
      url: app.data.url + '/app-web/public/gjjtq/yhktj.service',
      method: 'POST',
      headers: {
        "Content-Type": "application/json",
        "citycode":app.data.zjbzxbm.substr(0, 6)
      },
      data: {
        appid: "20170517000101",
        sign: "SYWDJSKI8UYH7D7FKIUJNE45IJHYRKJ0",
        grzh: app.data.grzh,
        yhzh: this.data.addyhzh,
        skyhmc:this.data.addskyh,
        lhh :jcrkhdj11DicGlobal.grckzhkhyhdm.substr(0,3),
        citybm:"C13010KF",
      },
      dataType: 'json',
      contentType: 'application/json;charset=UTF-8', //contentType很重要    
      success: (result) => {
        console.log("添加银行信息返回：",result);
        if(result != null && result.data != null){
            if(result.data.ret == 0){
              // my.alert({ content:  result.data.msg });  //如何显示一段时间在跳转？
               my.navigateTo({ url: '../../gjjtq/'+this.data.fhjmmc+'/'+this.data.fhjmmc});
            } else {
               my.alert({ content: result.data.msg });
            }
        }else{
            shineyue.showError("添加失败");
        }
      },
      fail: (result) => {
        my.hideLoading();
        my.alert({ content: "网络错误" });
      },
    });
     

  },
  //查询银行信息
  searchskyh:(that)=>{
     my.httpRequest({
      url: app.data.url + '/app-web/public/gjjtq/skyhcx.service',
      method: 'POST',
      headers: {
        "Content-Type": "application/json",
        "citycode":app.data.zjbzxbm.substr(0, 6)
      },
      data: {
        appid: "20170517000101",
        sign: "SYWDJSKI8UYH7D7FKIUJNE45IJHYRKJ0",
        grckzhkhyhmc: ' ',
        citybm:"C13010KF",
      },
      dataType: 'json',
      contentType: 'application/json;charset=UTF-8', //contentType很重要    
      success: (result) => {
        console.log("查询收款银行信息返回：",result);
         jcrtqxxcxData=result.data.data;
         yhxxArray = [];
          if(jcrtqxxcxData != null && jcrtqxxcxData.length > 0){
            for (let i = 0; i < jcrtqxxcxData.length; i++) {
            console.log('21412412');
            yhxxArray.push(jcrtqxxcxData[i].grckzhkhyhmc);
            //yhxxArray.push( {'label':jcrtqxxcxData.data[i].yhzh,'value':i});
            }
          }
          //yhxxArray.push("添加新银行卡");
          console.log("yhxxArray<<<<<<<:",yhxxArray);
          jcrkhdj11DicGlobal = jcrtqxxcxData[0];
          that.setData({
           array: yhxxArray,
           addskyh: jcrtqxxcxData[0].grckzhkhyhmc,
          });
          // my.showActionSheet({
          //   // title: '',
          //   items: yhxxArray,
          //   success: (res) => {
          //     console.log("res",res.index);
          //     if(res.index!="-1"){
          //     jcrkhdj11DicGlobal = jcrtqxxcxData[res.index];
          //     this.setData({
          //       addskyh: jcrtqxxcxData[res.index].grckzhkhyhmc,
          //     });
          //     }
          //   },
          // });
      },
      fail: (result) => {
        my.hideLoading();
        my.alert({ content: "网络错误" });
      },
    });
  },
  bindPickerChange(e) {
    console.log('picker发送选择改变，携带值为', e.detail.value);
     if(e.detail.value!="-1"){
      jcrkhdj11DicGlobal = jcrtqxxcxData[e.detail.value];
      console.log("jcrkhdj11DicGlobal>>>>>",jcrtqxxcxData[e.detail.value].grckzhkhyhmc);
      this.setData({
        index: e.detail.value,
        addskyh: jcrtqxxcxData[e.detail.value].grckzhkhyhmc,
      });
    }
  },
});
