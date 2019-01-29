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
    jcxxItems:[

    ],
    zqxxItems:[

    ],
    qtxxItems:[

    ],
  },
  handleTabClick({ index }) {
    this.setData({
      activeTab: index,
    });
  },
  onLoad() {
    my.showLoading({
      content: '加载中...',
      delay: '1000',
    });
    my.httpRequest({
      url: app.data.url+'/app-web/personal/public/gjjywmxcx.service',
      method: 'POST',
      headers: {
            "Content-Type": "application/json",
            "citycode":app.data.zjbzxbm.substr(0,6),
      },
      data: {
        appid: "20170517000101",
        zjbzxbm:app.data.zjbzxbm,
        sign:"SYWDJSKI8UYH7D7FKIUJNE45IJHYRKJ0",
        grzh:app.data.grzh,
        ksrq:app.getTwoYearAgoFormatDate(),
        jsrq:app.getNowFormatDate()
      },
      dataType: 'json',
      contentType : 'application/json;charset=UTF-8', //contentType很重要    
      success: (res) => {
         
         let jczqxx = res.data.data;
         let jcxx = [];
         let zqxx = [];
         let qtxx = [];
         let a=0; let b=0;let c=0;
          let s;
         for(let i=0; i<jczqxx.length; i++){
           s = {};
           s.ywfsrq = jczqxx[i].ywfsrq;
           s.ywzy = jczqxx[i].ywzy;
           s.yue = jczqxx[i].yue;
            if(jczqxx[i].ywlx=="缴存"){
              jcxx[a] = s;
              a++;
              continue;
            }else if(jczqxx[i].ywlx=="提取"){
              zqxx[b] = s;
              b++;
              continue;
            }else{
              qtxx[c] = s;
              c++;
              continue;
            }
         }
        a=0;
        b=0;
        c=0;
        this.setData({
          items:jczqxx,
          jcxxItems:jcxx,
          zqxxItems:zqxx,
          qtxxItems:qtxx
        });
        my.hideLoading();
      },
      fail:(res) => {
        my.hideLoading();
        my.alert({content:"网络错误"});
      },
      complete:(res) => {
        my.hideLoading();
        // my.alert({title: 'complete'});
      }
    });
  },
});