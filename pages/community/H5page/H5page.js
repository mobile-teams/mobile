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
    if (!app.data.pdsfdl && app.data.zjbzxbm == "") {
      app.data.zjbzxbm = 'C13010'
    }
    console.log("城市编码：", app.data.zjbzxbm);
    //主题详情页面
    if (e.h5param == 'detail') {
      this.setData({
        H5_url: app.data.url + '/alipay/community/detail/index.html?date=' + new Date().getTime() + '&citybm=' + app.data.zjbzxbm + '&appid=' + app.data.appid + '&zjhm=' + app.data.zjhm + '&szsx=' + e.szsx ,
        userid: e.userid,
        title_id: e.title_id,
      });
    }
    //主题发布页面
    else if (e.h5param == 'edit_detail') {
      this.setData({
        H5_url: app.data.url + '/alipay/community/editor/publish.html?date=' + new Date().getTime() + '&citybm=' + app.data.zjbzxbm + '&zjhm=' + app.data.zjhm,
        userid: e.userid,
      });
    }

    //草稿箱编辑页面
    else if (e.h5param == 'edit_draft') {
      this.setData({
        H5_url: app.data.url + '/alipay/community/editor/draftbox.html?date=' + new Date().getTime() + '&citybm=' + app.data.zjbzxbm,
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
