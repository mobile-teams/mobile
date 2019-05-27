const app = getApp();
Page({
  data: {},
  onLoad() {
    this.photochk(this);
  },
  //头像列表信息
  photochk: (that) => {
    var obj = new Object();
    obj.appid = app.data.appid;//'20181127000101'
    obj.sign = app.getSign(obj, app.data.pkey);
    my.request({
      url: app.data.url + '/app/community/photochk.service',
      method: 'POST',
      headers: {
        "Content-Type": "application/json",
        "citycode": 'CSY001',
      },
      data: JSON.stringify(obj),

      dataType: 'json',
      contentType: 'application/json;charset=UTF-8', //contentType很重要    
      success: (result) => {
        console.log("result11", result);
        if (result.data.ret == '0') {
          that.setData({
            headImages: result.data.data
          });
        }
      }
    });
  },

  /**
   * 头像选择
   * @param {*} options 
   */
  imageTap(options) {
    console.log("options", options);
    let headImage = options.currentTarget.dataset.data.url;
    console.log("options", options);
    my.setStorage({
      key: 'headImage', // 缓存数据的key
      data: {
        'headImage': headImage
      }, // 要缓存的数据
    });
    my.navigateBack({});
    // my.redirectTo({
    //   url: '/pages/community/editProfile/editProfile?param=headImage', // 需要跳转的应用内非 tabBar 的目标页面路径 ,路径后可以带参数。参数规则如下：路径与参数之间使用
    // });
  },
});
