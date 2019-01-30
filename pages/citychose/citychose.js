const app = getApp();
Page({
  data: {
    xzcs: '请选择公积金缴存城市',
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

  //刷新使用
  load: (that) => {
    my.showLoading({
      content: '加载中...',
      delay: '1000',
    });
    my.httpRequest({
      url: app.data.url + '/app-web/public/redis/city.service',
      method: 'POST',
      headers: {
        "Content-Type": "application/json",
        "citycode": app.data.zjbzxbm.substr(0, 6)
      },
      data: {
        "appid": "20181127000101",
        "sign": "HLHSASASASASAHSLJLKHLSYM10PX0S73CX741Z7BCAACC1SP000DAAKHSOASAOSHAOSHSYM10PX0S73CX741Z7BCAACC1SP000DAAKHSOASAOSHAOSH",
        "id": "atwa",
        "msg": "atwasoft"
      },
      dataType: 'json',
      contentType: 'application/json;charset=UTF-8', //contentType很重要    
      success: (res) => {
        my.hideLoading();
        let city = res.data.data;
        let mycity = [];
        let m = 0;

        for (let i = 0; i < city.length; i++) {
          console.log("i=" + i);
          let l = {};
          if (city[i].citymc == "" || city[i].citybm == "") {
            continue;
          }
          l.city = city[i].citymc;
          l.adCode = city[i].citybm;
          l.spell = that.ConvertPinyin(city[i].citymc);
          mycity[m] = l;
          m++;
        }
        my.chooseCity({
          cities: mycity,
          success: (res) => {
            //获取城市编码
            console.log(res);
            my.getAuthCode({
              scopes: 'auth_user',
              success: ({ authCode }) => {
                console.log("authCode" + authCode);
                //查询真实个人信息


                //将姓名和证件号 存入全局变量
                app.setXingming('尹起才');
                app.setZjhm('23020419700919021X');
                my.redirectTo({ url: '../index/index' });
              },
            });
          },
        });
      },
      fail: (res) => {
        my.hideLoading();
        my.alert({ content: "网络错误" });
      },
    });
  },

  csxz() {
    // my.showLoading({
    //   content: '加载中...',
    //   delay: '1000',
    // });
    //--------------------------调用接口查询城市，暂时没有接口-----------------
    // my.httpRequest({
    //   url: 'http://192.168.54.77:8089/app-web/public/redis/city.service',
    //   method: 'POST',
    //   headers: {
    //     "Content-Type": "application/json",
    //     "citycode": "C22040CS"
    //   },
    //   data: {
    //     "appid": "20181127000101",
    //     "sign": "HLHSASASASASAHSLJLKHLSYM10PX0S73CX741Z7BCAACC1SP000DAAKHSOASAOSHAOSHSYM10PX0S73CX741Z7BCAACC1SP000DAAKHSOASAOSHAOSH",
    //     "id": "atwa",
    //     "msg": "atwasoft"
    //   },
    //   dataType: 'json',
    //   contentType: 'application/json;charset=UTF-8', //contentType很重要    
    //   success: (res) => {
    //     my.hideLoading();
    //     let city = res.data.data;
    //     let mycity = [];
    //     let m = 0;
    //     for (let i = 0; i < city.length; i++) {
    //       let l = {};
    //       if (city[i].citymc == "" || city[i].citybm == "") {
    //         continue;
    //       }
    //       l.city = city[i].citymc;
    //       l.adCode = city[i].citybm;
    //       l.spell = this.ConvertPinyin(city[i].citymc);
    //       mycity[m] = l;
    //       m++;
    //     }
    my.chooseCity({
      // cities:mycity,
      hotCities: [
        {
          city: '石家庄市',
          adCode: '110105',
          spell: 'shijiazhuangshi'
        },
        {
          city: '太原市',
          adCode: '110106',
          spell: 'taiyuanshi'
        },
      ],
      cities: [
        {
          city: '石家庄市',
          adCode: '110105',
          spell: 'shijiazhuangshi'
        },
        {
          city: '大理白族自治州',
          adCode: '110108',
          spell: 'dalibaizuzizhizhou'
        },
        {
          city: '太原市',
          adCode: '110106',
          spell: 'taiyuanshi'
        },
        {
          city: '大庆市',
          adCode: '110101',
          spell: 'daqingshi'
        },
        {
          city: '永州市',
          adCode: '110101',
          spell: 'yongzhoushi'
        },
        {
          city: '贵州省直',
          adCode: '110101',
          spell: 'guizhoushengzhi'
        },
      ],
      success: (res) => {
        //获取城市编码
        console.log(res);
        this.setData({
          xzcs: res.city,
        });
      },
    });
    //   },
    //   fail: (res) => {
    //     my.hideLoading();
    //     my.alert({ content: "网络错误" });
    //   },
    // });
  },

  //授权登陆
  sqdl() {
    let cs = this.data.xzcs;
    if (cs.indexOf('请选择公积金缴存城市') > -1) {
      my.alert({
        title: '请选择公积金城市'
      });
      return;
    } else {
      my.getAuthCode({
        scopes: 'auth_user',
        success: ({ authCode }) => {
          //获取真实用户名和密码;
          app.setXingming('许福才');
          app.setZjhm('220403196208210517');
          my.redirectTo({ url: '../index/index' });
        },
      });
    }

  },

  // onPullDownRefresh() {
  //   //刷新
  //   this.load(this);
  //   my.stopPullDownRefresh();
  // },

  //------------------此处报错，待研究-----------------
        // my.getPhoneNumber({
        //   success: (res) => {
        //     let encryptedData = res.response
        //     console.log(encryptedData)
        // my.httpRequest({
        //     url: '你的后端服务端',
        //     data: encryptedData
        // });
        //   },
        //   fail: (res) => {
        //     console.log(res)
        //     console.log('getPhoneNumber_fail')
        //   },
        // });
        //只能获取用户支付宝头像和昵称
        // my.getAuthUserInfo({
        //   success: () => {
        //     console.log(`userInfo:`, userInfo); 
        //   }
        // });

});
