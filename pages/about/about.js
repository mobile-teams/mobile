Page({
  data: {
    // yscm:">",
    zxkf:"4006993888",
    dzyx:"sjgjj@atwasoft.net",
    wxggz:"手机公积金",
  },
  onClick1(ev) {
   my.navigateTo({ url: '../yssm/yssm' });
    
  },
    onClick2(ev) {
    my.makePhoneCall({ number: '4006993888' });
  },
});
