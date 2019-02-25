Page({
  data: {
    // yscm:">",
    zxkf:"4006993888",
    dzyx:"sjgjj@atwasoft.net",
    wxggz:"神玥伟奥互联网",
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
  onClick1(ev) {
   my.navigateTo({ url: '../yssm/yssm' });
    
  },
    onClick2(ev) {
    my.makePhoneCall({ number: '4006993888' });
  },
});
