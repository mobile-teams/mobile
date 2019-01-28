const app = getApp();
Page({
  data: {
    tabs: [
      {
        title: '全部',
        // badgeType: 'text',
        // badgeText: '6',
      },
      {
        title: '缴存',
        // badgeType: 'dot',
      },
      { title: '提取' },
      { title: '其他' }
    ],
    activeTab: 0,
    items: [
      
    ],
  },
  handleTabClick({ index }) {
    this.setData({
      activeTab: index,
    });
  },
  handleTabChange({ index }) {
    this.setData({
      activeTab: index,
    });
  },
  onItemClick(ev) {
    my.alert({
      content: `点击了第${ev.index}行`,
    });
  },
  onLoad() {
    // my.showLoading({
    //   content: '加载中...',
    //   delay: '1000',
    // });
    my.httpRequest({
      url: 'http://192.168.54.77:8089/app-web/personal/public/gjjywmxcx.service',
      method: 'POST',
      headers: {
            "Content-Type": "application/json",
            "citycode":"C23020KF",
      },
      data: {
        appid: "20170517000101",
        citybm:"C23020KF",
        zjbzxbm:"C23020KF",
        sign:"SYWDJSKI8UYH7D7FKIUJNE45IJHYRKJ0",
        grzh:app.data.grzh,
        ksrq:"2000-01-01",
        jsrq:"2019-01-01"
      },
      dataType: 'json',
      contentType : 'application/json;charset=UTF-8', //contentType很重要    
      success: (res) => {
        //  my.hideLoading();
         let jczqxx = res.data.data;
         console.log(jczqxx);
         for(var i=0; i<jczqxx.length; i++){
            jczqxx[i].title = jczqxx[i].ywfsrq;
            jczqxx[i].brief = jczqxx[i].ywzy;
            jczqxx[i].extra = jczqxx[i].yue;
         }
         console.log("jczqxx",jczqxx);
        this.setData({
          items:jczqxx
        });
      },
      fail:(res) => {
        my.alert({content:"网络错误"});
      },
      complete:(res) => {
        // my.alert({title: 'complete'});
      }
    });
  },
});