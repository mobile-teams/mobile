const app = getApp();
let dklxarr=["公积金贷款","组合贷款"];
let gjjllarr=["基准利率","1.1倍利率"];
let sdllarr=["基准利率","7折利率","8折利率","8.3折利率","8.5折利率","8.8折利率","9折利率","9.5折利率","1.05倍利率","1.1倍利率","1.2倍利率","1.3倍利率"];
let nxarr=["5","10","15","20","25","30"];
let LiLv;
let ZhSydkll;
let ZhGjjdkll;
const exceptions = () => {
  my.showToast({ type: 'exception', content: '网络异常',duration: 3000});
}
Page({
  data: {
     tabs: [
      { title: '等额本息' },
      { title: '等额本金' },
    ],
    activeTab: 0,
    
    flagdklx:0,

    llindex: 0,
    llitems: [],
    gjjllindex: 0,
    gjjllitems: [],
    sdllindex: 0,
    sdllitems: [],
    dklxindex: 0,
    dklxitems: [],

    gjjnxindex: 0,
    gjjnxitems: [],
    zhnxindex: 0,
    zhnxitems: [],


    LoanType:"gongjijin",
    //公积金贷款计算
    JinE:"",
    JKFS:"1",//1等额本息,2等额本金
    QiXian:"5",
    gjjllzk:"1",//公积金利率
    //组合贷款
    SyJinE:"0",
    GjjJinE:"0",
    Zhdkqx:"5",
    zhsdzk:"1",//组合商贷利率
    zhgjjzk:"1",//组合公积金利率


    //显示数据
    yuegong:"0.00",
    lixi:"0.00",
    zonge:"0.00",

    yuegong2:"0.00",
    lixi2:"0.00",
    zonge2:"0.00",
    dijian2:"0.00",

  
  },
  
  handleTabClick({ index }) {
    
    if(index=="0"){
      this.setData({
      activeTab: index,
      JKFS:"1",
    });
    }else {
      this.setData({
      activeTab: index,
      JKFS:"2",
    });
    }
    this.OnChange(this);
  },
  onLoad() {
    this.setData({
      dklxitems:dklxarr,
      llitems:gjjllarr,
      gjjllitems:gjjllarr,
      sdllitems:sdllarr,
      gjjnxitems:nxarr,
      zhnxitems:nxarr
    });
    this.OnChange(this);
  },
  //贷款类型
  dklxbindPickerChange(e) {
    console.log('picker发送选择改变，携带值为', e.detail.value);
    console.log("jcrkhdj11DicGlobal>>>>>",dklxarr[e.detail.value]);
    if(dklxarr[e.detail.value]=="公积金贷款"){
      this.setData({
       flagdklx: 0,
       LoanType:"gongjijin"
      });
    }else{
      this.setData({
       flagdklx: 1,
       LoanType:"zuhe"
      });
    }
    this.setData({
      dklxindex: e.detail.value,
    });
    console.log("贷款类型>>>>>",this.data.flagdklx,this.data.LoanType);
    this.OnChange(this);
  },
  //公积金利率
  llbindPickerChange(e) {
    console.log('picker发送选择改变，携带值为', e.detail.value);
    console.log("llbindPickerChange>>>>>",gjjllarr[e.detail.value]);
    if(gjjllarr[e.detail.value]=="1.1倍利率"){
      this.setData({
       gjjllzk:"1.1" ,
      });
    }else{
      this.setData({
       gjjllzk:"1" ,
      });
    }
    this.setData({
      llindex: e.detail.value,
    });
    console.log("公积金利率>>>>>",this.data.gjjllzk);
    this.OnChange(this);
  },
  //组合公积金利率
  gjjllbindPickerChange(e) {
    console.log('picker发送选择改变，携带值为', e.detail.value);
    console.log("gjjllbindPickerChange>>>>>",gjjllarr[e.detail.value]);
    if(gjjllarr[e.detail.value]=="1.1倍利率"){
      this.setData({
       zhgjjzk:"1.1" ,
      });
    }else{
      this.setData({
       zhgjjzk:"1" ,
      });
    }
    this.setData({
      gjjllindex: e.detail.value,
    });
    console.log("组合公积金利率>>>>>",this.data.zhgjjzk);
    this.OnChange(this);
  },
  //组合商贷利率
  sdllbindPickerChange(e) {
    console.log('picker发送选择改变，携带值为', e.detail.value);
    console.log("jcrkhdj11DicGlobal>>>>>",sdllarr[e.detail.value]);
    if(sdllarr[e.detail.value]=="基准利率"){
      this.setData({
       zhsdzk:"1" ,
      });
    }else if(sdllarr[e.detail.value]=="7折利率"){
      this.setData({
       zhsdzk:"0.7" ,
      });
    }else if(sdllarr[e.detail.value]=="8折利率"){
      this.setData({
       zhsdzk:"0.8" ,
      });
    }else if(sdllarr[e.detail.value]=="8.3折利率"){
      this.setData({
       zhsdzk:"0.83" ,
      });
    }else if(sdllarr[e.detail.value]=="8.5折利率"){
      this.setData({
       zhsdzk:"0.85" ,
      });
    }else if(sdllarr[e.detail.value]=="8.8折利率"){
      this.setData({
       zhsdzk:"0.88" ,
      });
    }else if(sdllarr[e.detail.value]=="9折利率"){
      this.setData({
       zhsdzk:"0.9" ,
      });
    }else if(sdllarr[e.detail.value]=="9.5折利率"){
      this.setData({
       zhsdzk:"0.95" ,
      });
    }else if(sdllarr[e.detail.value]=="1.05倍利率"){
      this.setData({
       zhsdzk:"1.05" ,
      });
    }else if(sdllarr[e.detail.value]=="1.1倍利率"){
      this.setData({
       zhsdzk:"1.1" ,
      });
    }else if(sdllarr[e.detail.value]=="1.2倍利率"){
      this.setData({
       zhsdzk:"1.2" ,
      });
    }else if(sdllarr[e.detail.value]=="1.3倍利率"){
      this.setData({
       zhsdzk:"1.3" ,
      });
    }
    this.setData({
      sdllindex: e.detail.value,
    });
    console.log("组合商贷利率>>>>>",this.data.zhsdzk);
    this.OnChange(this);
  },
  //公积金年限
  nxbindPickerChange(e) {
    console.log('picker发送选择改变，携带值为', e.detail.value);
    console.log("jcrkhdj11DicGlobal>>>>>",nxarr[e.detail.value]);
    
    this.setData({
      gjjnxindex: e.detail.value,
      QiXian:nxarr[e.detail.value]
    });
    console.log("公积金年限>>>>>",this.data.QiXian);
    this.OnChange(this);
  },
  //组合年限
  zhnxbindPickerChange(e) {
    console.log('picker发送选择改变，携带值为', e.detail.value);
    console.log("jcrkhdj11DicGlobal>>>>>",nxarr[e.detail.value]);

    this.setData({
      zhnxindex: e.detail.value,
      Zhdkqx:nxarr[e.detail.value]
    });
    console.log("组合年限>>>>>",this.data.Zhdkqx);
    this.OnChange(this);
  },

  //公积金贷款金额
  gjjdkjeInput(e) {
    if(e.detail.value==""||e.detail.value==" "){
      this.setData({
      JinE: "0",
      });
    }else{
    this.setData({
      JinE: e.detail.value,
    });
    }
    console.log("公积金贷款金额<<<<<<<<",this.data.JinE);
    this.OnChange(this);
  },  
  //组合公积金贷款金额
  zhgjjdkjeInput(e) {
    if(e.detail.value==""||e.detail.value==" "){
      this.setData({
      GjjJinE: "0",
      });
    }else{
      this.setData({
      GjjJinE: e.detail.value,
      });
    }
    console.log("组合公积金贷款金额<<<<<<<<",this.data.GjjJinE);
    this.OnChange(this);
  }, 
  //组合商业贷款金额 
  zhsydkjeInput(e) {
    if(e.detail.value==""||e.detail.value==" "){
      this.setData({
      SyJinE: "0",
      });
    }else{
    this.setData({
      SyJinE: e.detail.value,
    });
    }
    console.log("组合商业贷款金额<<<<<<<<",this.data.SyJinE);
    this.OnChange(this);
  },  

  //计算
  OnChange:(that)=>{
    if (that.data.LoanType == "gongjijin") {
    //console.log("-----------贷款类型为公积金贷款-----------");
      if (parseFloat(that.data.QiXian) <= 5) {
          LiLv = that.data.gjjllzk * 2.75;
      } else if (parseFloat(that.data.QiXian) <= 30) {
          LiLv = that.data.gjjllzk * 3.25;
      }
      if (that.data.JinE != null && that.data.JinE != "") {
        if (that.data.JKFS == 1) {
         console.log("--------------计算等额本息--------------------");
         that.GJJDEBX(that);
        } else if (that.data.JKFS == 2) {
         console.log("-----------------计算等额本金----------------------");
         that.GJJDEBJ(that);
        }
      }
    }else if (that.data.LoanType == "zuhe") {
      if (parseFloat(that.data.Zhdkqx) <= 5) {
					let zhsdzk = that.data.zhsdzk;
					//alert("组合贷款商业贷款利率折扣"+zhsdzk);
					 ZhSydkll = zhsdzk * 4.75;
					////alert("--计算之后的组合贷款商业贷款公积金利率--"+ ZhSydkll);
					let zhgjjzk = that.data.zhgjjzk;
					////alert("组合贷款 公积金利率折扣"+zhgjjzk);
					 ZhGjjdkll = zhgjjzk * 2.75;
					////alert("--计算之后的组合贷款 公积金利率--"+ ZhGjjdkll);
				} else if (parseFloat(that.data.Zhdkqx) <= 30) {
					let zhsdzk = that.data.zhsdzk;
					//alert("组合贷款商业贷款利率折扣"+zhsdzk);
					 ZhSydkll = zhsdzk * 4.90;
					//alert("--计算之后的组合贷款商业贷款公积金利率--"+ ZhSydkll);
					let zhgjjzk = that.data.zhgjjzk;
					//alert("组合贷款公积金利率折扣"+zhgjjzk);
				  ZhGjjdkll = zhgjjzk * 3.25;
				}
      if (((that.data.GjjJinE != ""))|| ((that.data.SyJinE != ""))|| ( (that.data.GjjJinE != "") && (that.data.SyJinE != ""))) {
					if (that.data.JKFS == 1) {
						//alert("-------组合贷款等额本息------")
						that.ZHDEBX(that);
					} else if (that.data.JKFS == 2) {
						//alert("-------组合贷款等额本金---------")
						that.ZHDEBJ(that);
					}
        }
    }
  },
  //公积金贷款
  GJJDEBX:(that)=>{
    ////alert("----------进入公积金等额本息计算公式-------------");
    let monthsum = parseInt(that.data.QiXian) * 12;
    LiLv = LiLv / 100;
    let yuegong = (parseFloat(that.data.JinE) * 10000 * (LiLv / 12) * Math.pow((1 + LiLv / 12), (monthsum)))/((Math.pow((1 + LiLv / 12), (monthsum))) - 1);
    yuegong = yuegong;
    let zonge = (yuegong * monthsum);
    let zlx = (zonge - parseFloat(that.data.JinE) * 10000);
    zlx = zlx.toFixed(2);
    zonge = zonge.toFixed(2);
    yuegong = yuegong.toFixed(2);
    //千分符 
    zlx = app.fmoney(zlx);
    zonge = app.fmoney(zonge);
    yuegong = app.fmoney(yuegong);
    that.setData({
      lixi:zlx,
      zonge:zonge,
      yuegong:yuegong,
    });
  },
  GJJDEBJ:(that)=>{
    ////alert("----------进入公积金等额本金-------------");
    let monthsum = parseInt(that.data.QiXian) * 12;
    LiLv = LiLv / 100;
    let zlx = 0;
    for (let k = 0; k < monthsum; k++) {
      zlx += (parseFloat(that.data.JinE) * 10000 - k * parseFloat(that.data.JinE) * 10000 / monthsum) * LiLv / 12;
    }
    let zonge = zlx + parseFloat(that.data.JinE) * 10000;
    let yuegong = parseFloat(that.data.JinE) * 10000 / monthsum + (parseFloat(that.data.JinE) * 10000 * LiLv / 12);
    let dijian = (yuegong - parseFloat(that.data.JinE) * 10000 / monthsum) / monthsum;
    zlx = zlx.toFixed(2);
    zonge = zonge.toFixed(2);
    yuegong = yuegong.toFixed(2);
    dijian = dijian.toFixed(2);
    //千分符 
    zlx = app.fmoney(zlx);
    zonge = app.fmoney(zonge);
    yuegong = app.fmoney(yuegong);
    dijian = app.fmoney(dijian);
    that.setData({
      lixi2:zlx,
      zonge2:zonge,
      yuegong2:yuegong,
      dijian2:dijian,
    });
  },
  //组合贷款
  ZHDEBX:(that)=>{
    ////alert("--------------进入组合贷款等额本息--------------");
    let ZhSdll = ZhSydkll / 12 / 100;
    let ZhGjjll = ZhGjjdkll / 12 / 100;
    ////alert("------商贷利率-----"+ZhSdll+"---公积金利率 ---"+ZhGjjll);
    let monthsum = parseInt(that.data.Zhdkqx) * 12;
    //公积金部分
    let gjjyuegong = 0.00;
    let gjjzonge = 0.00;
    let gjjzlx = 0.00;
    gjjyuegong = (parseFloat(that.data.GjjJinE) * 10000 * ZhGjjll * Math.pow((1 + ZhGjjll),
        (monthsum)))
        / ((Math.pow((1 + ZhGjjll), (monthsum))) - 1);
    //yuegong = yuegong.toFixed(2);
    gjjzonge = (gjjyuegong * monthsum);
    gjjzlx = (gjjzonge - parseFloat(that.data.GjjJinE) * 10000);
    //alert("组合贷款公积金部分"+gjjyuegong+"--"+gjjzonge+"--"+gjjzlx);
    //商业贷款部分
    let syyuegong = 0.00;
    let syzonge = 0.00;
    let syzlx = 0.00;
    syyuegong = (parseFloat(that.data.SyJinE) * 10000 * ZhSdll * Math.pow((1 + ZhSdll),(monthsum)))/((Math.pow((1 + ZhSdll), (monthsum))) - 1);
    //yuegong = yuegong.toFixed(2);
    syzonge = (syyuegong * monthsum);
    syzlx = (syzonge - parseFloat(that.data.SyJinE) * 10000);
    //alert("组合贷款商业贷款部分"+syyuegong+"--"+syzonge+"--"+syzlx);
    //商业贷款部分
    let zlx = gjjzlx + syzlx;
    let zonge = gjjzonge + syzonge;
    let yuegong = gjjyuegong + syyuegong;

    zlx = gjjzlx + syzlx;
    zonge = gjjzonge + syzonge;
    yuegong = gjjyuegong + syyuegong;

    zlx = zlx.toFixed(2);
    zonge = zonge.toFixed(2);
    yuegong = yuegong.toFixed(2);
    //千分符 
    zlx = app.fmoney(zlx);
    zonge = app.fmoney(zonge);
    yuegong = app.fmoney(yuegong);
    that.setData({
      lixi:zlx,
      zonge:zonge,
      yuegong:yuegong,
    });
  },
  ZHDEBJ:(that)=>{
    //alert("--------------进入组合贷款等额本金--------------");
			let ZhSdll = ZhSydkll / 12 / 100;
			let ZhGjjll = ZhGjjdkll / 12 / 100;
			let monthsum = parseInt(that.data.Zhdkqx) * 12;
			//公积金部分
			let gjjzlx = 0.00;
			let gjjyuegong = 0.00;
			let gjjdijian = 0.00;
			let gjjzonge = 0.00;
			for (let k = 0; k < monthsum; k++) {
				gjjzlx += (parseFloat(that.data.GjjJinE) * 10000 - k * parseFloat(that.data.GjjJinE) * 10000 / monthsum)* ZhGjjll;
			}
      gjjzonge = gjjzlx + parseFloat(that.data.GjjJinE) * 10000;
      gjjyuegong = parseFloat(that.data.GjjJinE) * 10000 / monthsum	+ (parseFloat(that.data.GjjJinE) * 10000 * ZhGjjll);
      gjjdijian = (gjjyuegong - parseFloat(that.data.GjjJinE) * 10000 / monthsum)/ monthsum;
			//商业贷款部分
			let syzlx = 0.00;
			let syyuegong = 0.00;
			let sydijian = 0.00;
			let syzonge = 0.00;
			for (let k = 0; k < monthsum; k++) {
				syzlx += (parseFloat(that.data.SyJinE)* 10000 - k * parseFloat(that.data.SyJinE) * 10000 / monthsum)
						* ZhSdll;
			}
      syzonge = syzlx + parseFloat(that.data.SyJinE) * 10000;
      syyuegong = parseFloat(that.data.SyJinE) * 10000 / monthsum+ (parseFloat(that.data.SyJinE) * 10000 * ZhSdll);
      sydijian = (syyuegong - parseFloat(that.data.SyJinE) * 10000 / monthsum) / monthsum;
			//组合部分
		 	let zlx = gjjzlx + syzlx;
			let zonge = gjjzonge + syzonge;
			let yuegong = gjjyuegong + syyuegong;
			let dijian = gjjdijian + sydijian;
			zlx = zlx.toFixed(2);
			zonge = zonge.toFixed(2);
			yuegong = yuegong.toFixed(2);
			dijian = dijian.toFixed(2);
			//千分符 
			zlx = app.fmoney(zlx);
			zonge = app.fmoney(zonge);
			yuegong = app.fmoney(yuegong);
			dijian = app.fmoney(dijian);
      that.setData({
        lixi2:zlx,
        zonge2:zonge,
        yuegong2:yuegong,
        dijian2:dijian,
     });
  },
});


