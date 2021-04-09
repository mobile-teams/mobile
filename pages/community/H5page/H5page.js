const app = getApp();
Page({
  data: {
    H5_url: '',
    userid: '',
    title_id: '',
    reply_id: '',
  },
  onLoad(e) {
    console.log("接收传入参数：", e);
    //判断用户是否未登录
    if (!app.globalData.pdsfdl && app.globalData.zjbzxbm == "") {
      app.globalData.zjbzxbm = 'C13010'
    }
    console.log("城市编码：", app.globalData.zjbzxbm);
    //主题详情页面
    if (e.h5param == 'detail') {
      this.setData({
        H5_url: app.globalData.url + '/alipay/community/detail/index1.html?date=' + new Date().getTime() + '&citybm=' + app.globalData.zjbzxbm + '&appid=' + app.globalData.appid + '&szsx=' + e.szsx + '&avatar=' + e.avatar + '&btid=' + e.title_id + '&nick_name=' + encodeURI(encodeURI(e.nick_name)),
        userid: e.userid,
        title_id: e.title_id,
      });
    }
    //主题发布页面
    else if (e.h5param == 'edit_detail') {
      this.setData({
        H5_url: app.globalData.url + '/alipay/community/editor/publish.html?date=' + new Date().getTime() + '&citybm=' + app.globalData.zjbzxbm,
        userid: e.userid,
      });
    }

    //草稿箱编辑页面
    else if (e.h5param == 'edit_draft') {
      this.setData({
        H5_url: app.globalData.url + '/alipay/community/editor/draftbox.html?date=' + new Date().getTime() + '&citybm=' + app.globalData.zjbzxbm,
        userid: e.userid,
        title_id: e.title_id,
      });
    } else {
      console.log("发生错误了！！！！");
    }

    console.log('url', this.data.H5_url);
    this.webViewContext = my.createWebViewContext('web-view');
  },

  onMessage(e) {
    console.log("向H5发送基本信息》》》》", e);
    this.webViewContext.postMessage({ 'userid': this.data.userid, 'title_id': this.data.title_id, 'reply_id': this.data.reply_id });
  },
});
