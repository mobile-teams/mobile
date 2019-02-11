Page({
  data: {
    items: [
       {
        title: '隐私声明',
        arrow: true,
      },
      {
        title: '在线客服',
        extra: '4006993888',
      },
      {
        title: '电子邮箱',
        extra: 'sjgjj@atwasoft.net',
      },
      {
        title: '微信公众号',
        extra: '神玥伟奥互联网',
      },
    ],
  },
  onItemClick(ev) {
    if(ev.index === 0){
      my.navigateTo({ url: '../yssm/yssm' });
    }else if(ev.index === 1){
      my.makePhoneCall({ number: '4006993888' });
    }
  },
});
