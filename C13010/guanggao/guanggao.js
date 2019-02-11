const app = getApp();
Page({
  data: {
    ggurl:' '
  },
  onLoad() {
    this.setData({
      ggurl:app.data.gruangaourl
    });
    console.log('url',this.data.ggurl,app.data.gruangaourl);
  },
});
