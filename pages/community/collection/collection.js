const app = getApp();
Page({
  data: {
    data_userid: '',
    data_page: 1,
    data_size: '10',//列表内容
    data_list: [],
    sfsc: 0,
  },
  onLoad(e) {
    //接收上页面传来userid
    console.log("传来参数：", e);
    this.setData({
      data_userid: e.userid
    })
    //加载收藏接口
    this.user_collection(this);
  },

  //下拉刷新
  onPullDownRefresh() {
    //清空数组数据，赋值默认值重新查询
    this.setData({
      data_page: 1,
      data_list: [],
    })
    //收藏列表信息查询
    this.user_collection(this);
    my.stopPullDownRefresh();
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
      //主题回复列表查询
      this.user_collection(this);
      console.log("正在加载...");
    }
  },


  //我的文章——收藏接口
  user_collection: (that) => {
    var obj = new Object();
    obj.appid = app.data.appid;//'20181127000101'//
    obj.userid = that.data.data_userid;//userid
    obj.page = that.data.data_page;
    obj.size = that.data.data_size;
    obj.sign = app.getSign(obj, app.data.pkey);
    my.request({
      url: app.data.url + '/app/community/mine_sc.service',
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
          console.log("收藏主题列表信息result.data:", result.data, that);
          that.setData({
            //总条数
            total_count: result.data.count,
            data_list: that.data.data_list.concat(result.data.data),
            sfsc: 1
          })
          console.log("收藏主题总个数", result.data.count);
          my.hideLoading();
        } else {
          my.hideLoading();
          sfsc: 0
          console.log(result.data.msg);
        }
      },
    });
  },
  //点收藏
  click_collection(e) {
    console.log("点收藏事件：", e);
    var title_id = e.currentTarget.dataset.value.title_id;
    var content = e.currentTarget.dataset.value.content;
    //跳转草稿箱H5页面
    my.navigateTo({
      url: '/pages/community/community_theme/community_theme?userid='
        + this.data.data_userid
        + '&title_id=' + title_id
        + '&content=' + content
    })

  }
});
