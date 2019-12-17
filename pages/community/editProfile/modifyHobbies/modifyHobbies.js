const app = getApp();
let hobbiesArr = [];
Page({
  data: {
    hobby: '',
    hobbies: '',
    hobbiesList: [],
  },

  onLoad(options) {
    console.log("options", options);
    this.setData({
      hobbiesList: options.user_hobby.split(','),
    });
    console.log("this.data.hobbiesList", this.data.hobbiesList);
    this.hobbyList(this);
  },

  /**
   * 兴趣爱好列表查询
   */
  hobbyList: (that) => {
    var obj = new Object();
    obj.appid = app.globalData.appid;//'20181127000101'
    obj.sign = app.getSign(obj, app.globalData.pkey);
    my.request({
      url: app.globalData.url + '/app/community/hobby_list.service',
      method: 'POST',
      headers: {
        "Content-Type": "application/json",
        "citycode": 'CSY001',
      },
      data: JSON.stringify(obj),

      dataType: 'json',
      contentType: 'application/json;charset=UTF-8', //contentType很重要    
      success: (result) => {
        hobbiesArr = [];
        let color = 'rgb(255,255,255)';
        console.log("result11", result);
        result.data.data.forEach(function (hobbiesItem, index) {
          let flag = false;
          that.data.hobbiesList.forEach(function (item, num) {
            if (hobbiesItem === item) {
              flag = true;
            }
            if (num === that.data.hobbiesList.length - 1) {
              if (flag) {
                color = '#32ABF0'
              } else {
                color = 'rgb(255,255,255)'
              }
            }
          });
          hobbiesArr.push({ 'hobby': hobbiesItem, 'color': color });
        });
        console.log("hobbiesArr", hobbiesArr);
        that.setData({
          hobbies: hobbiesArr,
          color: '#32ABF0'
        });
      }
    });
  },

  /**
   * 兴趣爱好选择
   * @param {*} options 
   */
  hobbyTap(options) {
    console.log("hobbiesArr", hobbiesArr)
    let that = this;
    let hobby = options.currentTarget.dataset.data.hobby;
    hobbiesArr.forEach(function (item, index) {
      if (item.hobby === hobby) {
        if (item.color === '#32ABF0') {
          hobbiesArr[index].color = 'rgb(255,255,255)'
        } else {
          hobbiesArr[index].color = '#32ABF0'
        }
      }
    });

    that.setData({
      hobbies: hobbiesArr
    });
    console.log("options", options);
  },

  /**
   * 确认按钮
   * @param {*} options 
   */
  affirm(options) {
    console.log("confirmoptions", options);
    let hobby = '';
    hobbiesArr.forEach(function (item, index) {
      if (item.color === '#32ABF0') {
        if (hobby.trim().length > 0) {
          hobby = hobby + ',' + item.hobby
        } else {
          hobby = item.hobby;
        }
      }
    });
    if (hobby.trim().length > 0) {
      my.setStorage({
        key: 'hobbies', // 缓存数据的key
        data: {
          'hobby': hobby
        }, // 要缓存的数据
      });
      my.navigateBack({});
      // my.redirectTo({
      //   url: '/pages/community/editProfile/editProfile?param=hobby', // 需要跳转的应用内非 tabBar 的目标页面路径 ,路径后可以带参数。参数规则如下：路径与参数之间使用
      // });
    } else {
      my.showToast({
        type: 'none',
        content: '请选择兴趣爱好',
      });
    }
  },


});
