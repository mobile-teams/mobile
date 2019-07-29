const app = getApp();
Page({
  data: {
    data_isshow: '',
    reply_page: 1,
    reply_size: '10',//列表内容
    data_list: [],//主题列表
    reply_list: [],//回复列表
    total_count: '',
    user_sfdz: '0',//是否点赞
    user_sfsc: '0',//是否收藏
    data_userid: '',
    title_id: '',
    theme_article_dzs: 0,//点赞数
    position: 'bottomRight',
    data_content: '',//接收从主页面传来的content信息
    dzs: [],//点赞数
    dcs: [],//点踩数
    sfdc: [],//是否点赞
    sfdz: [],//是否点菜
    hfnr: [],//回复内容
  },
  onLoad(e) {
    my.showLoading({
      content: '正在加载...',
    });
    console.log("接收页面传参》》》》", e);
    this.setData({
      title_id: e.title_id,
      data_content: e.content,
      data_userid: e.userid
    })
    //社区主题列表信息查询
    this.sqztlbcx(this);
    //主题回复列表查询
    this.replycx(this);

  },

  //跳转主题详情页面（三级页面）
  theme_detail() {
    my.navigateTo({ url: '/pages/community/H5page/H5page?h5param=detail&userid=' + this.data.data_userid + '&title_id=' + this.data.title_id })
  },

  //下拉刷新
  onPullDownRefresh() {
    //清空数组数据，赋值默认值重新查询
    this.setData({
      reply_page: 1,
      data_list: [],
      reply_list: [],//回复列表
      dzs: 0,
      dcs: 0
    })
    //社区主题列表信息查询
    this.sqztlbcx(this);
    //主题回复列表查询
    this.replycx(this);
    my.stopPullDownRefresh();
  },

  //上拉加载数据
  onReachBottom() {
    this.setData({
      reply_page: this.data.reply_page + 1,
    })
    //控制显示条数，=总条数后不允许查询
    console.log("当前显示总条数", this.data.reply_list.length);
    if (this.data.reply_list.length == this.data.total_count) {
      console.log("无更多数据...");
      my.showToast({
        type: 'none',
        content: '没有更多数据',
        duration: 1000,
      });
    } else {
      //主题回复列表查询
      this.replycx(this);
      console.log("正在加载...");
    }
  },

  //社区主题信息回复
  user_reply() {
    //判断用户是否登录
    if (!app.data.pdsfdl) {
      my.alert({
        content: '请登陆后使用此功能',
      });
      return;
    }
    //先判断是用户是否注册虚拟用户
    if (app.data.virtual_user == '1') {
      //判断用户是否通过审核，未审核通过不允许添加回复
      if (app.data.virtual_user_state == '1') {
        //判断信息是否是未展示信息
        if (this.data.data_isshow == '2' || this.data.data_isshow == '0') {
          my.showToast({
            type: 'none',
            content: '该信息未通过审核，暂不能操作',
            duration: 1000,
          });
          return;
        } else {
          my.navigateTo({ url: '/pages/community/H5page/H5page?h5param=edit_reply&userid=' + this.data.data_userid + '&title_id=' + this.data.title_id })
        }
      } else {
        my.showToast({
          type: 'none',
          content: '您未通过审核，暂时不能操作',
          duration: 1000,
        });
        return;
      }
    } else {
      my.alert({
        content: '请完善信息后回复',
        success: () => {
          my.navigateTo({ url: "/pages/community/editProfile/editProfile" })
        },
      });
    }
  },
  //主题回复详情页面
  reply_detal(e) {
    console.log("获取点击回复详细页面的id：", e)
    my.navigateTo({ url: '/pages/community/H5page/H5page?h5param=reply&' + this.data.data_userid + '&reply_id=' + e.currentTarget.dataset.value })
  },
  //主题用户收藏
  user_sc() {
    console.log("用户点击收藏……");
    //判断用户是否登陆
    if (!app.data.pdsfdl) {
      my.alert({
        content: '请登陆后使用此功能',
      });
      return;
    }
    //判断用户是否注册
    if (app.data.virtual_user == '0') {
      my.alert({
        content: '请完善信息后操作',
        success: () => {
          my.navigateTo({ url: "/pages/community/editProfile/editProfile" })
        },
      });
      return;
    }
    //判断信息是否是未展示信息
    if (this.data.data_isshow == '2' || this.data.data_isshow == '0') {
      my.showToast({
        type: 'none',
        content: '该信息未通过审核，暂不能操作',
        duration: 1000,
      });
      return;
    }
    //判断用户状态，如果是收藏则取消收藏，如果是未收藏则收藏 0未收藏 1已收藏
    if (this.data.user_sfsc == '0') {
      //收藏
      this.user_sc_sc(this);
    } else if (this.data.user_sfsc == '1') {
      //取消收藏
      this.user_sc_qxsc(this);
    }
  },

  //用户点击收藏接口
  user_sc_sc: (that) => {
    console.log("访问收藏接口》》》》", that);
    var obj = new Object();
    obj.appid = app.data.appid;
    obj.userid = that.data.data_userid;
    obj.btid = that.data.title_id;//是否展示
    obj.sign = app.getSign(obj, app.data.pkey);
    my.request({
      url: app.data.url + '/app/community/user_sc.service',
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
          console.log("收藏信息result.data:", result.data);
          that.setData({
            //已收藏
            user_sfsc: '1'
          })
          my.showToast({
            type: 'none',
            content: '成功',
            duration: 1000,
          });
        } else {
          my.alert({
            content: result.data.msg
            //  title:"网络错误"
          });
        }
      },
    });
  },
  //用户取消收藏
  user_sc_qxsc: (that) => {
    console.log("访问取消收藏接口《《《《", that);
    var obj = new Object();
    obj.appid = app.data.appid;//'20181127000101'//
    obj.userid = that.data.data_userid;//不传时，返回的是否点赞（收藏）均未未点赞（收藏）
    obj.btid = that.data.title_id;//是否展示
    obj.sign = app.getSign(obj, app.data.pkey);
    my.request({
      url: app.data.url + '/app/community/user_scqx.service',
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
          console.log("取消收藏信息result.data:", result.data);
          that.setData({
            //取消收藏
            user_sfsc: '0'
          })
          my.showToast({
            type: 'none',
            content: '成功',
            duration: 1000,
          });
        } else {
          my.alert({
            content: result.data.msg
            //  title:"网络错误"
          });
        }
      },
    });
  },


  //主题用户点赞
  user_dz() {
    console.log("用户点赞……");
    //判断用户是否登录
    if (!app.data.pdsfdl) {
      my.alert({
        content: '请登陆后使用此功能',
      });
      return;
    }
    //判断用户是否注册
    if (app.data.virtual_user == '0') {
      my.alert({
        content: '请完善信息后操作',
        success: () => {
          my.navigateTo({ url: "/pages/community/editProfile/editProfile" })
        },
      });
      return;
    }
    //判断信息是否是未展示信息
    if (this.data.data_isshow == '2' || this.data.data_isshow == '0') {
      my.showToast({
        type: 'none',
        content: '该信息未通过审核，暂不能操作',
        duration: 1000,
      });
      return;
    }
    //判断用户状态
    if (this.data.user_sfdz == '0') {
      //点赞
      this.user_dz_dz(this);
    } else if (this.data.user_sfdz == '1') {
      //取消点赞
      this.user_dz_qxdz(this);
    }
  },
  //用户点击点赞接口
  user_dz_dz: (that) => {
    console.log("访问点赞接口《《《《");
    var obj = new Object();
    obj.appid = app.data.appid;//'20181127000101'//
    obj.userid = that.data.data_userid;//不传时，返回的是否点赞（收藏）均未未点赞（收藏）
    obj.btid = that.data.title_id;//是否展示
    obj.sign = app.getSign(obj, app.data.pkey);
    my.request({
      url: app.data.url + '/app/community/user_dz.service',
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
          console.log("点赞信息result.data:", result.data);
          that.setData({
            //已点赞
            user_sfdz: '1',
            theme_article_dzs: that.data.theme_article_dzs + 1
          })
          my.showToast({
            type: 'none',
            content: '成功',
            duration: 1000,
          });
        } else {
          my.alert({
            content: result.data.msg
            //  title:"网络错误"
          });
        }
      },
    });
  },
  //用户取消点赞
  user_dz_qxdz: (that) => {
    console.log("访问取消点赞接口《《《《");
    var obj = new Object();
    obj.appid = app.data.appid;//'20181127000101'//
    obj.userid = that.data.data_userid;//不传时，返回的是否点赞（收藏）均未未点赞（收藏）
    obj.btid = that.data.title_id;//是否展示
    obj.sign = app.getSign(obj, app.data.pkey);
    my.request({
      url: app.data.url + '/app/community/user_dzqx.service',
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
          console.log("收藏信息result.data:", result.data);
          that.setData({
            user_sfdz: '0',//取消点赞
            theme_article_dzs: that.data.theme_article_dzs - 1
          })
          my.showToast({
            type: 'none',
            content: '成功',
            duration: 1000,
          });
        } else {
          my.alert({
            content: result.data.msg
            //  title:"网络错误"
          });
        }
      },
    });
  },

  //回复点赞功能
  user_reply_dz(e) {
    console.log("接收用户点击回复点<赞>……", e.currentTarget.dataset.value);
    console.log("接收用户点击回复点<赞>…33333333…", e);
    //判断用户是否登录
    if (!app.data.pdsfdl) {
      my.alert({
        content: '请登陆后使用此功能',
      });
      return;
    }
    //判断用户是否注册
    if (app.data.virtual_user == '0') {
      my.alert({
        content: '请完善信息后操作',
        success: () => {
          my.navigateTo({ url: "/pages/community/editProfile/editProfile" })
        },
      });
      return;
    }
    //判断用户状态 sfdz==null时 数据是接口返回 如果!=null 数据从集合中取
    var sfdz_1 = this.data.sfdz[e.currentTarget.dataset.idx] == null ? e.currentTarget.dataset.value.sfdz : this.data.sfdz[e.currentTarget.dataset.idx]
    var sfdc_1 = this.data.sfdc[e.currentTarget.dataset.idx] == null ? e.currentTarget.dataset.value.sfdc : this.data.sfdc[e.currentTarget.dataset.idx]

    if (sfdz_1 == '0') {
      //点赞
      this.data.dzlx = 'reply';
      this.data.dzpj = 'dz_reply';
      this.data.reply_id = e.currentTarget.dataset.value.content_id;
      var dzs1 = 'dzs[' + e.currentTarget.dataset.idx + ']'//将页面点赞数存入
      var dcs1 = 'dcs[' + e.currentTarget.dataset.idx + ']'//将页面点踩数存入
      var sfdc1 = 'sfdc[' + e.currentTarget.dataset.idx + ']';//页面是否点踩存入
      var sfdz1 = 'sfdz[' + e.currentTarget.dataset.idx + ']';//页面是否点赞存入
      var dzs_1 = this.data.dzs[e.currentTarget.dataset.idx] == null ? e.currentTarget.dataset.value.content_dzs : this.data.dzs[e.currentTarget.dataset.idx]
      var dcs_1 = this.data.dcs[e.currentTarget.dataset.idx] == null ? e.currentTarget.dataset.value.content_dcs : this.data.dcs[e.currentTarget.dataset.idx]
      if (sfdc_1 == '0') {
        this.setData({
          [dzs1]: parseInt(dzs_1) + 1,
          [sfdz1]: 1
        })
      } else {
        this.setData({
          [dzs1]: parseInt(dzs_1) + 1,
          [dcs1]: parseInt(dcs_1) - 1,
          [sfdc1]: 0,
          [sfdz1]: 1
        })
      }
      console.log(this.data.dzs);
      this.user_reply_dzdc(this);
    }

  },

  //回复点踩功能
  user_reply_dc(e) {
    // console.log("接收用户回复点<踩>……", e.currentTarget.dataset.value);
    console.log("接收用户点击回复点<踩>……", e);
    //判断用户是否登录
    if (!app.data.pdsfdl) {
      my.alert({
        content: '请登陆后使用此功能',
      });
      return;
    }
    //判断用户是否注册
    if (app.data.virtual_user == '0') {
      my.alert({
        content: '请完善信息后操作',
        success: () => {
          my.navigateTo({ url: "/pages/community/editProfile/editProfile" })
        },
      });
      return;
    }
    //判断用户状态
    var sfdc_2 = this.data.sfdc[e.currentTarget.dataset.idx] == null ? e.currentTarget.dataset.value.sfdc : this.data.sfdc[e.currentTarget.dataset.idx]
    var sfdz_2 = this.data.sfdz[e.currentTarget.dataset.idx] == null ? e.currentTarget.dataset.value.sfdz : this.data.sfdz[e.currentTarget.dataset.idx]
    // if (e.currentTarget.dataset.value.sfdc == '0') {
    if (sfdc_2 == '0') {
      //点踩
      this.data.dzlx = 'reply';
      this.data.dzpj = 'dc_reply';
      this.data.reply_id = e.currentTarget.dataset.value.content_id;
      var dzs2 = 'dzs[' + e.currentTarget.dataset.idx + ']';
      var dcs2 = 'dcs[' + e.currentTarget.dataset.idx + ']';
      var sfdc2 = 'sfdc[' + e.currentTarget.dataset.idx + ']';
      var sfdz2 = 'sfdz[' + e.currentTarget.dataset.idx + ']';
      var dzs_2 = this.data.dzs[e.currentTarget.dataset.idx] == null ? e.currentTarget.dataset.value.content_dzs : this.data.dzs[e.currentTarget.dataset.idx]
      var dcs_2 = this.data.dcs[e.currentTarget.dataset.idx] == null ? e.currentTarget.dataset.value.content_dcs : this.data.dcs[e.currentTarget.dataset.idx]
      if (sfdz_2 == '0') {
        this.setData({
          [dcs2]: parseInt(dcs_2) + 1,
          [sfdc2]: 1,
        })
      } else {
        this.setData({
          [dzs2]: parseInt(dzs_2) - 1,
          [dcs2]: parseInt(dcs_2) + 1,
          [sfdc2]: 1,
          [sfdz2]: 0
        })
      }

      console.log(this.data.dzs);
      this.user_reply_dzdc(this);
    }
  },

  //虚拟用户点赞统计及对回复进行点赞点踩接口
  user_reply_dzdc: (that) => {
    console.log("虚拟用户点赞统计及对回复进行点赞点踩接口》》》》》", that);
    var obj = new Object();
    obj.appid = app.data.appid;//'20181127000101'//
    obj.userid = that.data.data_userid;//不传时，返回的是否点赞（收藏）均未未点赞（收藏）
    obj.btid = that.data.title_id;//主题id
    obj.dzlx = that.data.dzlx;//对回复进行点赞必传，传reply
    obj.dzpj = that.data.dzpj;//对回复进行点赞必传，传dz_reply(点赞)或者dc_reply（点踩）
    obj.reply_id = that.data.reply_id;//对回复进行点赞时必传，传回复的id
    obj.sign = app.getSign(obj, app.data.pkey);
    console.log("虚拟用户点赞统计及对回复进行点赞点踩objjjjj,", obj);
    my.request({
      url: app.data.url + '/app/community/user_dz.service',
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
          console.log("主题点赞、踩回复result.data:", result.data);
          my.showToast({
            type: 'none',
            content: '成功',
            duration: 1000,
          });
        } else {
          my.alert({
            content: result.data.msg
            //  title:"网络错误"
          });
        }
      },
    });
  },

  //社区主题列表查询（list）
  sqztlbcx: (that) => {
    var obj = new Object();
    obj.appid = app.data.appid;//'20181127000101'//
    obj.userid = that.data.data_userid;//不传时，返回的是否点赞（收藏）均未未点赞（收藏）
    obj.title_id = that.data.title_id;//是否展示
    obj.sign = app.getSign(obj, app.data.pkey);
    my.request({
      url: app.data.url + '/app/community/title_detail.service',
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
          console.log("社区二级主题列表信息result.data:", result.data.data, that);
          that.setData({
            //总条数
            data_list: result.data.data,
            user_sfdz: result.data.data[0].sfdz,//是否点赞
            user_sfsc: result.data.data[0].sfsc,//是否收藏
            theme_article_dzs: parseInt(result.data.data[0].article_dzs), //returns 10 .,//加载点赞数
            data_isshow: result.data.data[0].isshow,//是否展示
          })
          my.hideLoading();
        } else {
          my.hideLoading();
          my.alert({
            content: result.data.msg
            //  title:"网络错误"
          });
        }
      },
    });
  },

  //社区主题回复列表查询（reply）
  replycx: (that) => {
    var obj = new Object();
    obj.appid = app.data.appid;//'20181127000101'//
    obj.userid = that.data.data_userid==''?'0':that.data.data_userid;
    obj.title_id = that.data.title_id;//是否展示
    obj.kssj = '2019-01-01';
    obj.jssj = '3019-01-01';
    obj.page = that.data.reply_page;
    obj.size = that.data.reply_size;
    obj.sign = app.getSign(obj, app.data.pkey);
    my.request({
      url: app.data.url + '/app/community/reply_list.service',
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
          console.log("回复列表信息result.data:", result.data);
          that.setData({
            // 存入总条数
            total_count: result.data.count,
            reply_list: that.data.reply_list.concat(result.data.data),
          })
          for (var i = 0; i < that.data.reply_list.length; i++) {
            var ind = 'hfnr[' + i + ']';
            that.setData({
              [ind]: that.data.reply_list[i].content.replace(/<[^>]+>/g, '')
            })

          }
          my.hideLoading();
        } else {
          my.hideLoading();
          console.log("无回复信息");
        }
      },
    });
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
