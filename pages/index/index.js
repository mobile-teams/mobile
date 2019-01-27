const app = getApp();
const preventTurn = () => {
  my.alert({title:'提示',content:'敬请期待...'})
}
const basicContainers = [
  {
    name: '贷款信息',
    thumb: '/image/icon/01.png',
    path: '../dkxx/dkxx',
  },
   {
    name: '我要提取',
    thumb: '/image/icon/02.png',
    path: false,
  },
   {
    name: '我要贷款',
    thumb: '/image/icon/03.png',
    path: false,
  },
   {
    name: '我要还款',
    thumb: '/image/icon/04.png',
    path: false,
  },
  {
    name: '冲还贷签约',
    thumb: '/image/icon/05.png',
    path: false,
  },
];
let basicComponentList = [
  {
    type: '业务办理',
    list: basicContainers,
  },
 
];

let grzhye1;
Page({
   data: {
    grzhye:0,
    grzh:'',
    grzhzt:'',
    flag:true,
    basicComponentList,
  },
   preventTurn(event){
     const path = event.currentTarget.dataset.index
     path?my.navigateTo({ url: path }): preventTurn()
   },
   gjjxxcx(){
    my.navigateTo({ url: '../zhxx/zhxx' });
   },
  tapName(event) {
    if(this.data.flag){
      this.setData({grzhye:"*****"});
    }else{
      this.setData({grzhye:grzhye1});
    }
    this.setData({
      flag:!this.data.flag
    })
  },
  onLoad() { 
    my.httpRequest({
      url: 'http://192.168.54.77:8089/app-web/personal/public/gjjdkjbxxcx.service',
      method: 'POST',
      headers: {
            "Content-Type": "application/json",
            "citycode":"C23020KF"
          },
      data: {
        appid: "20170517000101",
        citybm:"C23020KF",
        sign:"SYWDJSKI8UYH7D7FKIUJNE45IJHYRKJ0",
        xingming:"乔铁军",
       	zjhm:"230202196701261830"
      },
      dataType: 'json',
      contentType : 'application/json;charset=UTF-8', //contentType很重要    
      success: (res) => {
        console.log(res);
        grzhye1 = res.data.data[0].gjjxx[0].grzhye       
        this.setData({ 
          grzhye: app.fmoney(grzhye1),
          grzh:res.data.data[0].gjjxx[0].grzh,
          grzhzt:res.data.data[0].gjjxx[0].grzhzt
        }) 
        app.setGrzh(res.data.data[0].gjjxx[0].grzh)
        app.setJkhtbh(res.data.data[0].dkxx[0].jkhtbh)
      }
    });
  },
})
