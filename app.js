App({
   data:{
   grzh:0,
   jkhtbh:0,
   },

  onLaunch(options) {
    // 第一次打开ceshi
    // options.query == {number:1}
    console.info('App onLaunch');
  },
  onShow(options) {
    // 从后台被 scheme 重新打开
    // options.query == {number:1}
  },
  //存放全局变量
  setGrzh: function (event) {
    this.data.grzh = event
    console.log('=======个人账号==', this.data.grzh)
  },
  setJkhtbh: function (event) {
    this.data.jkhtbh = event
    console.log('=======借款合同编号==', this.data.jkhtbh)
  },
  fmoney(s=0, n=2) {
  const dot = str => `.${(+('0.'+(str || 0))).toFixed(n).split('.')[1]}`
  if (!s) return '0.00';
  const ss = s + '';
  if (!/[0-9]/.test(ss)) return ss;
  const sa = ss.split('.');
  if (sa[0].length < 3) return `${sa[0]}${dot(sa[1])}`;
  return ss.replace(/(\d[\d.]+\d)/g, v => {
    const sv = v.split('.');
    return `${sv[0].replace(/\B(?=(\d{3})+\b)/g, ',')}${dot(sv[1])}`;
  })
  },

  getNowFormatDate() {
		let day = new Date();
		let Year = 0;
		let Month = 0;
		let Day = 0;
		let CurrentDate = "";
		Year = day.getFullYear();// 支持IE和火狐浏览器.
		Month = day.getMonth() + 1;
		Day = day.getDate();
		CurrentDate += Year + "-";
		if (Month >= 10) {
			CurrentDate += Month + "-";
		} else {
			CurrentDate += "0" + Month + "-";
		}
		if (Day >= 10) {
			CurrentDate += Day;
		} else {
			CurrentDate += "0" + Day;
		}
		return CurrentDate;
	},

  getTwoYearAgoFormatDate() {
		let day = new Date();
		let Year = 0;
		let CurrentDate = "";
		Year = day.getFullYear()-2;// 支持IE和火狐浏览器.
		CurrentDate = Year + "-01-01";
		return CurrentDate;
	},

});
