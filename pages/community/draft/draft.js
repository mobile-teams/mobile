const app = getApp();
Page({
  data: {
    data_userid: '',
    data_page: 1,
    data_size: '10',//列表内容
    data_list: [],
    title_id: '',
    sfcg:0
  },
  onLoad(e) {
    //接收上页面传来userid
    console.log("传来参数：", e);
    this.setData({
      data_userid: e.userid
    })
    //查询草稿箱
    this.user_draft(this);
  },

     //下拉刷新
  onPullDownRefresh() {
    //清空数组数据，赋值默认值重新查询
    this.setData({
      data_page: 1,
      data_list: [],
    })
    //收藏列表信息查询
    this.user_draft(this);
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
      this.user_draft(this);
      console.log("正在加载...");
    }
  },

  user_draft: (that) => {
    var obj = new Object();
    obj.appid = app.data.appid;//'20181127000101'//
    obj.userid = that.data.data_userid;//userid
    // type	主题类型	string	输入(必传)	0: 草稿  1 要发布的
    obj.type = '0';
    obj.page = that.data.data_page;
    obj.size = that.data.data_size;
    obj.sign = app.getSign(obj, app.data.pkey);
    my.request({
      url: app.data.url + '/app/community/mine_fbcg.service',
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
          console.log("草稿箱列表信息result.data:", result.data, that);
          that.setData({
            //总条数
            total_count: result.data.count,
            data_list: that.data.data_list.concat(result.data.data),
            sfcg:1
          })
          console.log("草稿箱主题总个数", result.data.count);
          my.hideLoading();
        } else {
          my.hideLoading();
          console.log( result.data.msg);
           that.setData({
            sfcg:0
          })
        }
      },
    });
  },

  //点击草稿箱
  edit_draft(e) {
    console.log("点击草稿箱事件：",e);
    var title_id =  e.currentTarget.dataset.value;
    //跳转草稿箱H5页面
    my.navigateTo({ url: '/pages/community/H5page/H5page?h5param=edit_draft&userid=' + this.data.data_userid + '&title_id=' + title_id})

  }
});
