const app = getApp();
Page({
  data: {
    data_userid: '',
    head_img: '',
    nick_name: '',
    user_hobby: '',
    ifExit: true
  },
  onLoad(options) {
    my.setStorage({
      key: 'headImage', // 缓存数据的key
      data: {
        'headImage': ''
      }, // 要缓存的数据
    });
    my.setStorage({
      key: 'hobbies', // 缓存数据的key
      data: {
        'hobby': ''
      }, // 要缓存的数据
    });
    this.userinfo(this);
  },

  onShow() {
    //兴趣爱好返回
    my.getStorage({
      key: 'hobbies', // 缓存数据的key
      success: (res) => {
        console.log("res", res);
        if (res.data && res.data.hobby.trim().length > 0) {
          this.setData({
            user_hobby: res.data.hobby
          })
        }
      },
    });

    //头像返回
    my.getStorage({
      key: 'headImage', // 缓存数据的key
      success: (res) => {
        console.log("res", res);
        if (res.data && res.data.headImage.trim().length > 0) {
          this.setData({
            head_img: res.data.headImage
          })
        }
      },
    });
  },


  /**
   * 虚拟用户基本信息查询
   */
  userinfo: (that) => {
    var obj = new Object();
    obj.appid = app.data.appid;//'20181127000101'//
    obj.zjhm = app.data.zjhm; //'13062619921201003X';//'130102199508132441';//'13062619921201003X';
    obj.user_type = '0';//0个人用户 1机构用户
    obj.sign = app.getSign(obj, app.data.pkey);
    my.request({
      url: app.data.url + '/app/community/tuser.service',
      method: 'POST',
      headers: {
        "Content-Type": "application/json",
        "citycode": 'CSY001',
      },
      data: JSON.stringify(obj),

      dataType: 'json',
      contentType: 'application/json;charset=UTF-8', //contentType很重要    
      success: (result) => {
        console.log("result#@@@", result.data);
        if (result.data.msg && result.data.msg === "查询为空") {
          that.getUserMsg(that);
          that.setData({
            ifExit: false
          });
        }
        if (result.data.ret == '0') {
          //存在虚拟用户
          that.setData({
            data_userid: result.data.data[0].userid,
            head_img: result.data.data[0].avatar,
            nick_name: result.data.data[0].nick_name,
            user_hobby: result.data.data[0].user_hobby
          });
        }
        console.log("户基本信息查询result.data:", result.data);
        console.log("查询用户是否存在：", result.data.msg);
      }
    });
  },

  /**
   * 获取用户个人信息
   */
  getUserMsg: (that) => {
    my.getAuthCode({
      scopes: 'auth_user',
      fail: (error) => {
        console.error('getAuthCode', error);
      },
      success: () => {
        my.getAuthUserInfo({
          fail: (error) => {
            console.error('授权信息获取失败', error);
          },
          success: (userInfo) => {
            console.log('授权信息userInfo:', userInfo);
            that.setData({
              userInfo,
              nick_name: userInfo.nickName,
              head_img: userInfo.avatar,
            });
          }
        });
      }
    });
  },
  /**
   * 昵称输入
   * @param {*} options 
   */
  nickNameValue(options) {
    let nickName = '';
    console.log("options", options);
    if (options.detail.value && options.detail.value.trim().length > 0) {
      nickName = options.detail.value;
    }
    this.setData({
      nick_name: nickName
    });
  },

  /**
   * 选择头像
   */
  modifyHead() {
    my.navigateTo({ url: 'modifyHead/modifyHead' })
  },

  /**
   * 选择兴趣爱好
   */
  modifyHobbies() {
    my.navigateTo({ url: 'modifyHobbies/modifyHobbies?user_hobby=' + this.data.user_hobby })
  },

  /**
   * 保存修改
   */
  saveProfile() {
    let that = this;
    let nickName = that.data.nick_name;
    let headImg = that.data.head_img;
    let userHobby = that.data.user_hobby;
    if (headImg.trim().length <= 0) {
      my.showToast({
        type: 'none',
        content: '请选择头像',
      });
      return;
    }
    if (nickName.trim().length <= 0) {
      my.showToast({
        type: 'none',
        content: '请输入昵称',
      });
      return;
    }
    if (nickName.trim().length < 3 || nickName.trim().length > 18) {
      my.showToast({
        type: 'none',
        content: '昵称为3-18位',
      });
      return;
    }

    if (userHobby.trim().length <= 0) {
      my.showToast({
        type: 'none',
        content: '请选择兴趣爱好',
      });
      return;
    }
    if (that.data.ifExit) {
      that.updateUser(that);
    } else {
      that.addUser(that);
    }
  },

  /**
   * 虚拟用户新增
   */
  addUser: (that) => {
    var obj = new Object();
    obj.appid = app.data.appid;//'20181127000101'//
    obj.zjhm = app.data.zjhm; //'13062619921201003X'//app.data.zjhm;//
    obj.avatar = that.data.head_img;
    obj.nick_name = that.data.nick_name;
    obj.user_hobby = that.data.user_hobby;
    obj.sign = app.getSign(obj, app.data.pkey);
    my.request({
      url: app.data.url + '/app/community/tuser_add.service',
      method: 'POST',
      headers: {
        "Content-Type": "application/json",
        "citycode": 'CSY001',
      },
      data: JSON.stringify(obj),

      dataType: 'json',
      contentType: 'application/json;charset=UTF-8', //contentType很重要    
      success: (result) => {
        console.log("虚拟用户新增result.data:", result.data);
        if (result.data.ret === '0') {
          my.reLaunch({
            url: '/pages/community/community'
          });
        } else {
          my.showToast({
            type: 'none',
            content: result.data.msg,
          });
          return;
        }
      }
    });
  },

  /**
   * 虚拟用户修改
   */
  updateUser: (that) => {
    var obj = new Object();
    obj.appid = app.data.appid;//'20181127000101'//
    obj.userid = that.data.data_userid;
    obj.avatar = that.data.head_img;
    obj.nick_name = that.data.nick_name;
    obj.user_hobby = that.data.user_hobby;
    obj.sign = app.getSign(obj, app.data.pkey);
    console.log("tuser_updateobj", obj);
    my.request({
      url: app.data.url + '/app/community/tuser_update.service',
      method: 'POST',
      headers: {
        "Content-Type": "application/json",
        "citycode": 'CSY001',
      },
      data: JSON.stringify(obj),

      dataType: 'json',
      contentType: 'application/json;charset=UTF-8', //contentType很重要    
      success: (result) => {
        console.log("虚拟用户修改result.data:", result.data);
        if (result.data.ret === '0') {
          my.reLaunch({
            url: '/pages/community/community'
          });
        } else {
          my.showToast({
            type: 'none',
            content: result.data.msg,
          });
          return;
        }
      }
    });
  },

});
