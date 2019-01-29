const app = getApp();
Page({
  data:{

  },	
  // 在对象中搜索
  arraySearch(l1, l2) {
      for (var name in app.data.PinYin) {
          if (app.data.PinYin[name].indexOf(l1) != -1) {
              return this.ucfirst(name);
              break;
          }
      }
      return false;
  },
// 首字母大写
  ucfirst(l1) {
      if (l1.length > 0) {
          var first = l1.substr(0, 1).toUpperCase();
          var spare = l1.substr(1, l1.length);
          return first + spare;
          // return first;
      }
  },
  ConvertPinyin(l1) {
      var l2 = l1.length;
      var I1 = "";
      var reg = new RegExp('[a-zA-Z0-9\- ]');
      for (var i = 0; i < l2; i++) {
          var val = l1.substr(i, 1);
          var name = this.arraySearch(val, app.data.PinYin);
          if (reg.test(val)) {
              I1 += val;
          } else if (name !== false) {
              I1 += name;
          }
      }
      I1 = I1.replace(/ /g, '-');
      while (I1.indexOf('--') > 0) {
          I1 = I1.replace('--', '-');
      }
      return I1;
  },

  onLoad() {
    
  },
  load: (that)=>{
    my.showLoading({
      content: '加载中...',
      delay: '1000',
    });
    my.httpRequest({
      url: 'http://192.168.54.77:8089/app-web/public/redis/city.service',
      method: 'POST',
      headers: {
            "Content-Type": "application/json",
            "citycode":"C23020KF"
      },
      data: {
        "appid": "20181127000101",
        "sign":"HLHSASASASASAHSLJLKHLSYM10PX0S73CX741Z7BCAACC1SP000DAAKHSOASAOSHAOSHSYM10PX0S73CX741Z7BCAACC1SP000DAAKHSOASAOSHAOSH",
        "id":"atwa",
        "msg":"atwasoft"
      },
      dataType: 'json',
      contentType : 'application/json;charset=UTF-8', //contentType很重要    
      success: (res) => {
        my.hideLoading();
        let city = res.data.data;
        let mycity = [];
        let m = 0;
        
        for(let i=0; i<city.length; i++){
          console.log("i="+i);
          let l = {};
          if(city[i].citymc=="" || city[i].citybm==""){
            continue;
          }
          l.city = city[i].citymc;
          l.adCode = city[i].citybm;
          l.spell = that.ConvertPinyin(city[i].citymc);
          mycity[m] = l;
          m++;
        }
        my.chooseCity({
          cities:mycity,
          success: (res) => {
            //获取城市编码
            console.log(res);
            my.getAuthCode({
              scopes: 'auth_user',
              success: ({ authCode }) => {
                console.log("authCode"+authCode);
                //查询真实个人信息


                //将姓名和证件号 存入全局变量
                app.setXingming('贺波');
                app.setZjhm('230230196701060022');
                my.redirectTo({ url:'../index/index'});
              },
            });
          },
        });
      },
      fail:(res) => {
        my.hideLoading();
        my.alert({content:"网络错误"});
      },
    });
  },

  csxz(){
    my.showLoading({
      content: '加载中...',
      delay: '1000',
    });
    my.httpRequest({
      url: 'http://192.168.54.77:8089/app-web/public/redis/city.service',
      method: 'POST',
      headers: {
            "Content-Type": "application/json",
            "citycode":"C23020KF"
      },
      data: {
        "appid": "20181127000101",
        "sign":"HLHSASASASASAHSLJLKHLSYM10PX0S73CX741Z7BCAACC1SP000DAAKHSOASAOSHAOSHSYM10PX0S73CX741Z7BCAACC1SP000DAAKHSOASAOSHAOSH",
        "id":"atwa",
        "msg":"atwasoft"
      },
      dataType: 'json',
      contentType : 'application/json;charset=UTF-8', //contentType很重要    
      success: (res) => {
        my.hideLoading();
        let city = res.data.data;
        let mycity = [];
        let m = 0;
        for(let i=0; i<city.length; i++){
          let l = {};
          if(city[i].citymc=="" || city[i].citybm==""){
            continue;
          }
          l.city = city[i].citymc;
          l.adCode = city[i].citybm;
          l.spell = this.ConvertPinyin(city[i].citymc);
          mycity[m] = l;
          m++;
        }
        my.chooseCity({
          cities:mycity,
          success: (res) => {
            //获取城市编码
            console.log(res);
            //获取授权码
            my.getAuthCode({
              scopes: 'auth_user',
              success: ({ authCode }) => {
                console.log("authCode="+authCode);
                //查询真实个人信息


                //将姓名和证件号 存入全局变量
                app.setXingming('贺波');
                app.setZjhm('230230196701060022');
                my.redirectTo({ url:'../index/index'});
              },
            });
          },
        });
      },
      fail:(res) => {
        my.hideLoading();
        my.alert({content:"网络错误"});
      },
    });
  },

  onPullDownRefresh(){
    //刷新
    this.load(this);
    my.stopPullDownRefresh();
  },


});
