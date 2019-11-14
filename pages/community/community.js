const app = getApp();
var virtual_user_info;
Page({
  data: {
    data_page: 1,
    data_size: '10',//列表内容
    data_list: [],
    total_count: '',
    data_userid: '',
    data_usertype: '',//用户类型 0个人用户，1机构用户
    user_state: '',
    head_img: '/image/community/head_img.png',
    fabu_img: true,
    position: 'bottomRight',//头像点击弹出pop框位置
    show: false,
    showMask: true,
    user_type: '0',//0未登录 1一登陆
  },
  onLoad() {
    // my.showLoading({
    //   content: '正在加载...'
    // });
    //用户信息查询
    this.userinfo(this);
  },

  onShow() {
    my.setNavigationBar({
      title: '社区',
    });
  },


  onMaskClick() {
    this.setData({
      show: false,
    });
  },
  onShowPopoverTap() {
    //判断是否登录app 未登录跳转登陆页面
    console.log("app.data.pdsfdl", app.data.pdsfdl);
    if (app.data.pdsfdl) {
      this.setData({
        show: true,
      });
    } else {
      console.log("用户未登陆！！！");
      my.navigateTo({
        url: '/citychose/citychose'
      })
    }
  },

  //下拉刷新
  onPullDownRefresh() {
    //my.showNavigationBarLoading();
    //清空数组数据，赋值默认值重新查询
    this.setData({
      data_page: 1,
      data_list: []
    })
    //用户信息查询
    this.userinfo(this);
    //my.hideNavigationBarLoading();
    my.stopPullDownRefresh();
  },

  //上拉加载数据
  onReachBottom() {
    this.setData({
      data_page: this.data.data_page + 1,
    })
    //控制显示条数，=总条数后不允许查询
    console.log("当前显示总条数", this.data.data_list.length);
    if (this.data.data_list.length >= this.data.total_count) {
      console.log("无更多数据...");
      my.showToast({
        type: 'none',
        content: '没有更多数据',
        duration: 1000,
      });
    } else {
      this.sqztlbcx(this);
      console.log("正在加载...");
    }
  },

  //个人信息编辑
  user_editProfile() {
    my.navigateTo({ url: 'editProfile/editProfile' })
    this.onMaskClick();
  },
  //已发布
  user_publication() {
    my.navigateTo({ url: 'publication/publication?userid=' + this.data.data_userid })
    this.onMaskClick();
  },
  //收藏
  user_collection() {
    my.navigateTo({ url: 'collection/collection?userid=' + this.data.data_userid })
    this.setData({
      show: false,
    });
  },

  //草稿
  user_draft() {
    my.navigateTo({ url: 'draft/draft?userid=' + this.data.data_userid })
    this.setData({
      show: false,
    });
  },

  //判断进入二级页面还是三级页面
  theme_detail(e) {
    //判断是否是小课堂图标 - ==2小课堂 ==1热门
    //获取对应主题的title_id
    var szsx = e.currentTarget.dataset.value.szsx;
    //获取用户信息（头像、名称）
    var avatar = "";
    var nick_name = "";
    //判断用户是否注册、登录-未登录状态下不可添加回复
    if (app.data.virtual_user == '1') {
      avatar = virtual_user_info.avatar;
      nick_name = virtual_user_info.nick_name;
    }
    console.log("点击小课堂-title_id：", e.currentTarget.dataset.value);
    my.navigateTo({
      url: '/pages/community/H5page/H5page?h5param=detail&userid='
        + this.data.data_userid
        + '&title_id=' + e.currentTarget.dataset.value.title_id
        + '&szsx=' + e.currentTarget.dataset.value.szsx+ '&avatar=' + avatar + '&nick_name=' + nick_name
    })
  },

  //有发布主题权限-跳转发布
  fabbu_img_click() {
    console.log("跳转公共H5跳转页面》》》》》》");
    my.navigateTo({ url: '/pages/community/H5page/H5page?h5param=edit_detail&userid=' + this.data.data_userid })
  },

  /**
   * 点击搜索
   */
  searchTap() {
    my.navigateTo({
      url: '/pages/community/search/search?userid=' + this.data.data_userid
    })
  },

  //虚拟用户信息查询
  userinfo: (that) => {
    var obj = new Object();
    obj.appid = app.data.appid;//'20181127000101'//
    obj.zjhm = app.data.pdsfdl ? app.data.zjhm : '';// '13062619921201003X';////'130582199311173016';////
    obj.user_type = '0';//0个人用户 1机构用户 //手机登录都是个人用户
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
        // console.log("用户信息查询 result.data:", result.data);
        if (result.data.ret == '0') {
          console.log("存在虚拟用户：", result.data.data);
           virtual_user_info = result.data.data[0];
          //存在虚拟用户
          app.data.virtual_user = '1';
          that.setData({
            data_userid: result.data.data[0].userid,
            head_img: result.data.data[0].avatar,
          })
          app.data.virtual_user_state = result.data.data[0].state;//个人审核是否通过  0未通过审批，1通过审批 2审批拒绝通过

          if (result.data.data[0].state == '1') {
            //通过审核后，校验个人发布权限 0不能发布，1能发布
            if (result.data.data[0].fban_type == 1) {
              console.log("存在个人发布权限:", result.data.data[0].fban_type);
              that.setData({
                fabu_img: false,
              })
            }
          } else {
            //用户未审核通过
            that.setData({
              fabu_img: true,
            })
          }
          that.sqztlbcx(that);
        } else {
          console.log("不存在虚拟用户>>>>>", result);
          // //用户未登录
          // app.data.virtual_user = '0'
          // that.setData({
          //   data_userid: '0',//游客登录
          //   head_img: '/image/community/head_img.png',
          //   fabu_img: true,
          // })
          // console.log("用户未登录，以游客状态访问社区");
          // that.sqztlbcx(that);
          //不存在虚拟用户 - 判断用是否初在登录在状态 登录未注册则自动注册
          if (app.data.pdsfdl) {
            //用户登录，虚拟用户未注册，注册虚拟用户
            that.addUser(that);
          } else {
            //用户未登录
            app.data.virtual_user = '0'
            that.setData({
              data_userid: '0',//游客登录
              head_img: '/image/community/head_img.png',
              fabu_img: true,
            })
            console.log("用户未登录，以游客状态访问社区");
            that.sqztlbcx(that);
          }
        }
      }
    });
  },

  /**
 * 虚拟用户新增
 */
  addUser: (that) => {
    var random_number = new Date().getTime() + '';
    var obj = new Object();
    obj.appid = app.data.appid;
    obj.zjhm = app.data.zjhm;
    obj.avatar = '/image/community/head_img.png';
    obj.nick_name = '用户' + random_number.substr(5, 13);
    obj.user_hobby = '';
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
        console.log("虚拟用户自动注册 result.data:", result.data);
        if (result.data.ret === '0') {
          //注册成功，查询用户注册信息
          that.userinfo(that);
        } else {
          console.log("自动注册失败》》》》");
          that.sqztlbcx(that);
          my.showToast({
            type: 'none',
            content: result.data.msg,
          });
          return;
        }
      }
    });
  },

  //社区主题列表查询（list）
  sqztlbcx: (that) => {
    var obj = new Object();
    obj.appid = app.data.appid;//'20181127000101'//
    obj.userid = that.data.data_userid;
    obj.isshow = '1';//是否展示
    obj.page = that.data.data_page;
    obj.size = that.data.data_size;
    obj.sign = app.getSign(obj, app.data.pkey);
    my.request({
      url: app.data.url + '/app/community/titleck_list.service',
      method: 'POST',
      headers: {
        "Content-Type": "application/json",
        "citycode": 'CSY001',
      },
      data: JSON.stringify(obj),

      dataType: 'json',
      contentType: 'application/json;charset=UTF-8', //contentType很重要    
      success: (result) => {
        my.hideLoading();
        if (result.data.ret == '0') {
          console.log("社区主题列表信息result.data:", result.data, that);
          that.setData({
            //总条数
            total_count: result.data.count,
            data_list: that.data.data_list.concat(result.data.data)
          })
          console.log("社区主题总个数", result.data.count);
        } else {
          my.alert({
            title: result.data.msg
          });
        }
      },
    });
  },

});
