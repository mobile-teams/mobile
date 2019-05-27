const app = getApp();
Page({
  data: {
    data_page: 1,
    data_size: '5',//列表内容
    data_list: [],
    total_count: '',
    data_userid: '',
    data_usertype: '',//用户类型 0个人用户，1机构用户
    user_state: '',
    head_img: '/image/community/head_img.png',
    fabu_img: true,
    position: 'bottomRight',
    show: false,
    showMask: true,
    user_type: '0',//0未登录 1一登陆
  },
  onLoad() {
    my.showLoading({
      content: '正在加载...',
    });

    //用户信息查询
    this.userinfo(this);
    //社区主题列表信息查询
    //this.sqztlbcx(this);

  },
  onMaskClick() {
    this.setData({
      show: false,
    });
  },
  onShowPopoverTap() {
    this.setData({
      show: true,
    });
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
  //点击小课堂直接进详情页面
  theme_detail(e) {
    //获取对应主题的title_id
    console.log("点击小课堂-title_id：", e.currentTarget.dataset.value);
    my.navigateTo({ url: '/pages/community/H5page/H5page?h5param=detail&userid=' + this.data.data_userid + '&title_id=' + e.currentTarget.dataset.value })

  },

  //下拉刷新
  onPullDownRefresh() {
    //清空数组数据，赋值默认值重新查询
    this.setData({
      data_page: 1,
      data_list: []
    })
    this.sqztlbcx(this);
    my.stopPullDownRefresh();
  },

  //有发布主题权限-跳转发布
  fabbu_img_click() {
    console.log("跳转公共H5跳转页面》》》》》》");
    my.navigateTo({ url: '/pages/community/H5page/H5page?h5param=edit_detail&userid=' + this.data.data_userid })
  },

  //上拉加载数据
  onReachBottom() {
    this.setData({
      data_page: this.data.data_page + 1,
    })
    //控制显示条数，=总条数后不允许查询
    console.log("当前显示总条数", this.data.data_list.length);
    if (this.data.data_list.length == this.data.total_count) {
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

  //虚拟用户信息查询
  userinfo: (that) => {
    var obj = new Object();
    obj.appid = app.data.appid;//'20181127000101'//
    obj.zjhm = app.data.zjhm;// '13062619921201003X';//'130102199508132441';////'130582199311173016';////
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
        console.log("用户信息查询result.data:", result.data);
        if (result.data.ret == '0') {
          //存在虚拟用户
          console.log("存在虚拟用户：", result.data.data);
          app.data.virtual_user = '1',
            that.setData({
              data_userid: result.data.data[0].userid,
              head_img: result.data.data[0].avatar,
            })
          if (result.data.data[0].state == '0') {
            //个人审核是否通过  0未通过审批，1通过审批
            that.setData({
              virtual_user_state: result.data.data[0].state,
            })
            //通过审核后，校验个人发布权限 0不能发布，1能发布
            if (result.data.data[0].fban_type == 1) {
              console.log("存在个人发布权限:", result.data.data[0].fban_type);
              that.setData({
                fabu_img: false,
              })
            }
          }
        } else {
          //不存在虚拟用户
          app.data.virtual_user = '0'
          that.setData({
            data_userid: '',//游客登录
          })
        }
        console.log("查询用户是否存在：", result.data.msg);
        that.sqztlbcx(that);
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
      //url:' https://api.sjgjj.cn/app/community/titleck_list.service',
      method: 'POST',
      headers: {
        "Content-Type": "application/json",
        "citycode": 'CSY001',
      },
      data: JSON.stringify(obj),

      dataType: 'json',
      contentType: 'application/json;charset=UTF-8', //contentType很重要    
      success: (result) => {
        if (result.data.ret == '0') {
          console.log("社区主题列表信息result.data:", result.data, that);
          that.setData({
            //总条数
            total_count: result.data.count,
            data_list: that.data.data_list.concat(result.data.data)
          })
          console.log("社区主题总个数", result.data.count);
          my.hideLoading();
        } else {
          my.hideLoading();
          my.alert({
            title: result.data.msg
            //  title:"网络错误"
          });
        }
      },
    });
  },
  //用户点主题
  sqztxx(e) {
    console.log("点击获取主题信息", e.currentTarget.dataset.value.title_id, e.currentTarget.dataset.value.content);
    //如果用户未登录，跳转主题二级
    my.navigateTo({
      url: 'community_theme/community_theme?userid=' + this.data.data_userid
        + '&title_id=' + e.currentTarget.dataset.value.title_id
        + '&content=' + e.currentTarget.dataset.value.content
    })
  },

  /**
   * 点击搜索
   */
  searchTap() {
    my.navigateTo({
      url: '/pages/community/search/search?userid=' + this.data.data_userid
    })
  },
});
