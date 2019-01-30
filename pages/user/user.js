const app = getApp();
Page({
  data: {
    thumb: 'https://gw.alipayobjects.com/zos/rmsportal/VBqNBOiGYkCjqocXjdUj.png',
    footerImg: 'https://gw.alipayobjects.com/zos/rmsportal/VBqNBOiGYkCjqocXjdUj.png',
    xingming:"",

    itemsPhone: [
      {
        thumb: '/image/phone.png',
        title: '服务热线',
      // extra: '描述文字',
        arrow: true,
      },
    ],
    itemsYssm: [
      {
        thumb: '/image/yssm.png',
        title: '隐私声明',
        arrow: true,
      },
    ],
    itemsXgmm: [
      {
        thumb: '/image/xgmm.png',
        title: '密码修改',
        arrow: true,
      },
    ],
    itemsClearcache: [
      {
      thumb: '/image/clearcache.png',
      title: '清除缓存',
      arrow: true,
    },
  ],
  },
  onLoad() {
    console.log(app.data.xingming,app.data.dwmc);

    this.setData({
      xingming:app.data.xingming,
      dwmc:app.data.dwmc
    })
  },
   onCardClick: function(ev) {
    my.showToast({
      type: 'exception',
      content: '功能暂未开通',
       duration: 3000
    });
  },
   onItemClick(ev) {
    my.showToast({
      type: 'exception',
      content: `功能暂未开通`,
       duration: 3000
    });
  },
  onItemClick1(ev) {
    my.showToast({
      type: 'success',
      content: '清除暂存成功',
      duration: 3000
    });
  },
});

