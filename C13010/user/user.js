const app = getApp();
Page({
  data: {
    tabbar:{},     //放在data中
    thumb: 'https://gw.alipayobjects.com/zos/rmsportal/VBqNBOiGYkCjqocXjdUj.png',
    footerImg: 'https://gw.alipayobjects.com/zos/rmsportal/VBqNBOiGYkCjqocXjdUj.png',
    xingming:"",

     itemsGywm: [
      {
        thumb: '/image/lxwm2.png',
        title: '关于我们',
        arrow: true,
      },
    ],

    itemsPhone: [
      {
        thumb: '/image/phone.png',
        title: '服务热线',
      // extra: '描述文字',
        arrow: true,
      },
    ],
    // itemsYssm: [
    //   {
    //     thumb: '/image/yssm.png',
    //     title: '隐私声明',
    //     arrow: true,
    //   },
    // ],
  },
  onLoad() {
    app.editTabBar(); //放在onLoad中
    console.log(app.data.xingming,app.data.dwmc);

    this.setData({
      xingming:app.data.xingming,
      dwmc:app.data.dwmc
    })
  },
  onCardClick: function(ev) {
    my.navigateTo({ url: '../grzx/grzx' })
  },
   onItemClick(ev) {
    my.confirm({
      title: '提示',
      content: '呼叫服务热线公积金12329?',
      success: (result) => {
        if(result.confirm){
          my.makePhoneCall({ number: '12329' });
        }
      },
    });
  },
  onItemClick1(ev) {
   my.navigateTo({ url: '../about/about' })
  },
});

