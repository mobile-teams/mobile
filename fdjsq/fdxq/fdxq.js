import debounce from '/util/debounce';
const app = getApp();

Page({
  data: {
     tabs: [
      { title: '等额本息' },
      { title: '等额本金' },
    ],
   
    activeTab: 0,
    
    jdfs:'',//借贷方式 由前页面控制进入后显示贷款方式 待处理
    loantype:'',//贷款类型
    gjjbenjin:'',//公积金本金
    gjjllzk:'',//公积金利率折扣
    year:'',//年限
    sybenjin:'',//商业贷款金额
    syllzk:'',//商业贷款折扣



    zonghuankuan:'2.25',
    zonglixi:'2.25',
    zongdaikuan:'2.25',
    yueshu:'2.25',

    zonghuankuan02:'2.25',
    zonglixi02:'2.25',
    zongdaikuan02:'2.25',
    yueshu02:'2.25',


    bxitems: [],
    bjitems: [],
    bxfindmore:"0",
    bjfindmore:"0",

    toView: 'red',
    scrollTop: 100,
    flagyhbx:0,
    flagyhbj:0,
    
  },
  
  handleTabClick({ index }) {
    
    if(index=="0"){
      this.setData({
      activeTab: index,
      JKFS:"1",
      flagyhbx:0,
      flagyhbj:0,
      bxfindmore:"0",
      bjfindmore:"0",
    });
    if(this.data.loantype=="gongjijin"){
    this.GJJDEBX(this);
    }else{
    this.ZHDEBX(this);
    }
    }else {
      this.setData({
      activeTab: index,
      JKFS:"2",
      flagyhbx:0,
      flagyhbj:0,
      bxfindmore:"0",
      bjfindmore:"0",
    });
    if(this.data.loantype=="gongjijin"){
    this.GJJDEBJ(this);
    }else{
    this.ZHDEBJ(this);
    }
    }
    //this.OnChange(this);
  },
  onLoad(options) {

    this.scroll = debounce(this.scroll.bind(this), 100);

    let map = options.map.split(",");
    console.log("map",map);
    this.setData({
      loantype:map[0],
      jdfs:map[1],
      gjjbenjin:map[2],
      sybenjin:map[3],
      year:map[4],
      gjjllzk:map[5],
      syllzk:map[6],
    });
    console.log("this.data<<<<<<<:",this.data);
    if (this.data.jdfs == "Debx") {
       this.setData({
         activeTab:0
       });
      //判断贷款类型显示数据
      if (this.data.loantype == "gongjijin") {
        this.GJJDEBX(this);
      } else if (this.data.loantype == "zuhe") {
        this.ZHDEBX(this);
      }
    } else if (this.data.jdfs == "Debj") {
      this.setData({
         activeTab:1
       });
      //判断贷款类型显示数据
      if (this.data.loantype == "gongjijin") {
        this.GJJDEBJ(this);
      } else if (this.data.loantype == "zuhe") {
        this.ZHDEBJ(this);
      }
     }
  },
 //公积金等额本息
  DebxMoreDatafont(){
    this.setData({
      bxfindmore:"1",
      flagyhbx:1,
    });
    if(this.data.loantype=="gongjijin"){
    this.GJJDEBX(this);
    }else{
    this.ZHDEBX(this);
    }
  },
  GJJDEBX:(that)=>{
    console.log("进入GJJDEBX计算方法");
    //参数处理
    console.log("-年-" + that.data.year);
    //月数
    let monthsum = parseInt(that.data.year) * 12;
    //总贷款
    let benjin = that.data.gjjbenjin;
    //根据年限判断公积金利率
    let LiLv
    if ((that.data.year <= 5) && (that.data.year >= 0)) {
       LiLv = that.data.gjjllzk * 2.75;
    } else if (that.data.year >= 5) {
       LiLv = that.data.gjjllzk * 3.25;
    }
    //月供
    LiLv = LiLv / 100;
    let yuegong = (benjin * 10000 * (LiLv / 12) * Math
        .pow((1 + LiLv / 12), (monthsum)))
        / ((Math.pow((1 + LiLv / 12),
            (monthsum))) - 1);
    //总还款
    let zonge = (yuegong * monthsum);
    //总利息
    let zlx = (zonge - benjin * 10000);
    console.log("-总额-" + that.data.year + "-总利息-" + zlx+ "-本金-" + benjin + "-月数-" + monthsum);
    //写入页面
    let zonge1 = (zonge / 10000).toFixed(2);
    let zlx1 = (zlx / 10000).toFixed(2);
    benjin = ((parseInt(benjin)).toFixed(2));
    //千分符
    zonge1 = app.fmoney(zonge1);
    zlx1 = app.fmoney(zlx1);
    benjin = app.fmoney(benjin);
    that.setData({
      zonghuankuan:zonge1,
      zonglixi:zlx1,
      zongdaikuan:benjin,
      yueshu:monthsum,
    });
    //let benjin1 = benjin+'.00';
    //benjin = Math.round(benjin * 100) / 100;
    benjin = ((parseInt(benjin)).toFixed(2));

    benjin = benjin * 10000;
	  //遍历月数 依次写入页面
    console.log("不加载一年以后的数据");
    let arraydebx=[];
    if(that.data.bxfindmore=="0"){
      for (let i = 0; i < 12; i++) {
        let yuebenjin = 0.00;
        let yuelixi = 0.00;
        let shengyu = 0.00;
        //公式计算
        yuelixi = benjin * LiLv / 12;
        yuebenjin = yuegong - yuelixi;
        shengyu = zonge - yuegong;

        zonge = zonge - yuegong;
        benjin = benjin - yuebenjin;
        console.log("shengyu>>>>>>>>>",shengyu);
        let nian="",yue;

        if (i % 12 == 0) {
          nian = "第"+(parseInt(i / 12) +1)+"年";
          yue="1月"
        }else{
          yue= i - parseInt(i / 12) * 12 + 1+"月";
        }

        if (shengyu < 0) {
          shengyu = 0.00
        }
        arraydebx.push({'nian':nian,'yue':yue,'yuebenjin':app.fmoney(parseFloat(yuebenjin).toFixed(2)),'yuelixi':app.fmoney(parseFloat(yuelixi).toFixed(2)),'shengyu':app.fmoney(parseFloat(shengyu).toFixed(2)),'value':i});
      }
    }else{
      for (let i = 0; i < monthsum; i++) {
        let yuebenjin = 0.00;
        let yuelixi = 0.00;
        let shengyu = 0.00;
        //公式计算
        yuelixi = benjin * LiLv / 12;
        yuebenjin = yuegong - yuelixi;
        shengyu = zonge - yuegong;

        zonge = zonge - yuegong;
        benjin = benjin - yuebenjin;
        console.log("shengyu>>>>>>>>>",shengyu);
        let nian="",yue;

        if (i % 12 == 0) {
          nian = "第"+(parseInt(i / 12) +1)+"年";
          yue="1月"
        }else{
          yue= i - parseInt(i / 12) * 12 + 1+"月";
        }

        if (shengyu < 0) {
          shengyu = 0.00
        }
         arraydebx.push({'nian':nian,'yue':yue,'yuebenjin':app.fmoney(parseFloat(yuebenjin).toFixed(2)),'yuelixi':app.fmoney(parseFloat(yuelixi).toFixed(2)),'shengyu':app.fmoney(parseFloat(shengyu).toFixed(2)),'value':i});
      }
    }
    console.log("arraydebx<<<<<<<<<<<<<<:",arraydebx);
    that.setData({
      bxitems: arraydebx,
    });
  },
  //公积金等额本金
  DebjMoreDatafont(){
    this.setData({
      bjfindmore:"1",
      flagyhbj:1,
    });
    if(this.data.loantype=="gongjijin"){
     this.GJJDEBJ(this);
    }else{
     this.ZHDEBJ(this);
    }
  },
  GJJDEBJ:(that)=>{
    console.log("进入GJJDEBJ计算方法");
    //参数处理
    console.log("-年-" + that.data.year);
    //月数
    let monthsum = parseInt(that.data.year) * 12;
    //总贷款
    let benjin = that.data.gjjbenjin;
    //根据年限判断公积金利率
    let LiLv
    if ((that.data.year <= 5) && (that.data.year >= 0)) {
       LiLv = that.data.gjjllzk * 2.75;
    } else if (that.data.year >= 5) {
       LiLv = that.data.gjjllzk * 3.25;
    }
    //月供
    LiLv = LiLv / 100;

    let zlx = 0;
    for (let k = 0; k < monthsum; k++) {
      zlx += (benjin * 10000 - k * benjin * 10000
          / monthsum)
          * LiLv / 12;
    }
    //总额
    let zonge = zlx + benjin * 10000;
    //月供
    let yuegong = benjin * 10000 / monthsum
        + (benjin * 10000 * LiLv / 12);
    //公积金等额本金月本金
    let yuelixi1 = benjin * 10000 * LiLv / 12;
    let yuebenjindebj = yuegong - yuelixi1
    console.log("-总额-" + that.data.year + "-总利息-" + zlx
        + "-本金-" + benjin + "-月数-" + monthsum);
    //写入页面
    let zonge1 = (zonge / 10000).toFixed(2);
    let zlx1 = (zlx / 10000).toFixed(2);
    benjin = ((parseInt(benjin)).toFixed(2));
    //千分符
    zonge1 = app.fmoney(zonge1);
    zlx1 = app.fmoney(zlx1);
    benjin = app.fmoney(benjin);
    that.setData({
      zonghuankuan02:zonge1,
      zonglixi02:zlx1,
      zongdaikuan02:benjin,
      yueshu02:monthsum,
    });

    benjin = benjin * 10000;
	  //遍历月数 依次写入页面
    console.log("不加载一年以后的数据");
    let arraydebj=[];
    if(that.data.bjfindmore=="0"){
      for (let i = 0; i < 12; i++) {
        let yuebenjin = 0.00;
        let yuelixi = 0.00;
        let shengyu = 0.00;
        //公式计算
        yuelixi = benjin * LiLv / 12;
        yuebenjin = yuebenjindebj;
        yuegong = yuebenjin + yuelixi;
        shengyu = zonge - yuegong;
        zonge = zonge - yuegong;
        benjin = benjin - yuebenjin;
        console.log("shengyu>>>>>>>>>",shengyu);
        let nian="",yue;

        if (i % 12 == 0) {
          nian = "第"+(parseInt(i / 12) +1)+"年";
          yue="1月"
        }else{
          yue= i - parseInt(i / 12) * 12 + 1+"月";
        }

        if (shengyu < 0) {
          shengyu = 0.00
        }
        arraydebj.push({'nian':nian,'yue':yue,'yuebenjin':app.fmoney(parseFloat(yuebenjin).toFixed(2)),'yuelixi':app.fmoney(parseFloat(yuelixi).toFixed(2)),'shengyu':app.fmoney(parseFloat(shengyu).toFixed(2)),'value':i});
      }
    }else{
      for (let i = 0; i < monthsum; i++) {
        let yuebenjin = 0.00;
        let yuelixi = 0.00;
        let shengyu = 0.00;
        //公式计算
        yuelixi = benjin * LiLv / 12;
        yuebenjin = yuebenjindebj;
        yuegong = yuebenjin + yuelixi;
        shengyu = zonge - yuegong;
        zonge = zonge - yuegong;
        benjin = benjin - yuebenjin;
        console.log("shengyu>>>>>>>>>",shengyu);
        let nian="",yue;

        if (i % 12 == 0) {
          nian = "第"+(parseInt(i / 12) +1)+"年";
          yue="1月"
        }else{
          yue= i - parseInt(i / 12) * 12 + 1+"月";
        }

        if (shengyu < 0) {
          shengyu = 0.00
        }
         arraydebj.push({'nian':nian,'yue':yue,'yuebenjin':app.fmoney(parseFloat(yuebenjin).toFixed(2)),'yuelixi':app.fmoney(parseFloat(yuelixi).toFixed(2)),'shengyu':app.fmoney(parseFloat(shengyu).toFixed(2)),'value':i});
      }
    }
    console.log("arraydebx<<<<<<<<<<<<<<:",arraydebj);
    that.setData({
      bjitems: arraydebj,
    });
  },

  //组合等额本息
  ZHDEBX:(that)=>{
    console.log("进入ZHDEBX计算方法");
    //参数处理
    console.log("-年-" +  that.data.year);
    //月数
    let monthsum = parseInt( that.data.year) * 12;
    //公积金本金
    let Gjjbenjin = that.data.gjjbenjin;
    //商业贷款本金
    let Sybenjin =  that.data.sybenjin;
    //根据年限判断公积金利率
    let GjjLiLv;
    if (( that.data.year <= 5) && ( that.data.year >= 0)) {
       GjjLiLv = that.data.gjjllzk * 2.75;
    } else if ( that.data.year >= 5) {
       GjjLiLv = that.data.gjjllzk * 3.25;
    }
    //根据年限判断商业贷款利率
    let SyLiLv;
    if ((that.data.year <= 1) && (that.data.year >= 0)) {
       SyLiLv = that.data.syllzk * 4.35;
    } else if ((that.data.year <= 5) && (that.data.year >= 1)) {
       SyLiLv = that.data.syllzk * 4.75;
    } else {
       SyLiLv = that.data.syllzk * 4.90;
    }
    //初始化
    let Gjjyuegong = 0.00;
    let Gjjzonge = 0.00;
    let Gjjzlx = 0.00;
    let Syyuegong = 0.00;
    let Syzonge = 0.00;
    let Syzlx = 0.00;
    //公积金月供
    GjjLiLv = GjjLiLv / 100;
    Gjjbenjin = Gjjbenjin * 10000;
    Gjjyuegong = (Gjjbenjin * (GjjLiLv / 12) * Math
        .pow((1 + GjjLiLv / 12), (monthsum)))
        / ((Math.pow((1 + GjjLiLv / 12),
            (monthsum))) - 1);
    //公积金总还款
    Gjjzonge = (Gjjyuegong * monthsum);
    //公积金总利息
    Gjjzlx = (Gjjzonge - Gjjbenjin);
    console.log("-公积金总额-" + Gjjzonge + "-公积金总利息-"
        + Gjjzlx + "-公积金本金-" + Gjjbenjin
        + "-公积金月数-" + monthsum);
    //商业贷款月供
    SyLiLv = SyLiLv / 100;
    Sybenjin = Sybenjin * 10000;
    Syyuegong = (Sybenjin * (SyLiLv / 12) * Math
        .pow((1 + SyLiLv / 12), (monthsum)))
        / ((Math.pow((1 + SyLiLv / 12),
            (monthsum))) - 1);
    //商业贷款总还款
    Syzonge = (Syyuegong * monthsum);
    //商业贷款总利息
    Syzlx = (Syzonge - Sybenjin);
    console.log("-商业总额-" + Syzonge + "-商业总利息-"
        + Syzlx + "-商业本金-" + Sybenjin + "-月数-"
        + monthsum);
    //合计
    let zonge = Gjjzonge + Syzonge;
    let zlx = Gjjzlx + Syzlx;
    let benjin = Gjjbenjin + Sybenjin;
    //写入页面
    let zonge1 = (zonge / 10000).toFixed(2);
    let zlx1 = (zlx / 10000).toFixed(2);
    let benjin1 = (benjin / 10000).toFixed(2);
    //千分符
    zonge1 = app.fmoney(zonge1);
    zlx1 = app.fmoney(zlx1);
    benjin1 = app.fmoney(benjin1);
    that.setData({
      zonghuankuan:zonge1,
      zonglixi:zlx1,
      zongdaikuan:benjin1,
      yueshu:monthsum,
    });
    //
    benjin = benjin * 10000;

	  //遍历月数 依次写入页面
    console.log("不加载一年以后的数据");
    let arraydebx=[];
    if(that.data.bxfindmore=="0"){
      for (let i = 0; i < 12; i++) {
       //初始化
        let yuebenjin = 0.00;
        let yuelixi = 0.00;
        let shengyu = 0.00;
        //公式计算
        //公积金部分
        let Gjjyuelixi = Gjjbenjin * GjjLiLv
            / 12;
        let Gjjyuebenjin = Gjjyuegong
            - Gjjyuelixi;
        let Gjjshengyu = Gjjzonge - Gjjyuegong;
        Gjjzonge = Gjjzonge - Gjjyuegong;
        Gjjbenjin = Gjjbenjin - Gjjyuebenjin;
        //商业贷款部分
        let Syyuelixi = Sybenjin * SyLiLv / 12;
        let Syyuebenjin = Syyuegong - Syyuelixi;
        let Syshengyu = Syzonge - Syyuegong;
        Syzonge = Syzonge - Syyuegong;
        Sybenjin = Sybenjin - Syyuebenjin;
        //合计
        yuebenjin = Gjjyuebenjin + Syyuebenjin;
        yuelixi = Gjjyuelixi + Syyuelixi;
        shengyu = Gjjshengyu + Syshengyu;

        let nian="",yue;

        if (i % 12 == 0) {
          nian = "第"+(parseInt(i / 12) +1)+"年";
          yue="1月"
        }else{
          yue= i - parseInt(i / 12) * 12 + 1+"月";
        }

        if (shengyu < 0) {
          shengyu = 0.00
        }
        arraydebx.push({'nian':nian,'yue':yue,'yuebenjin':app.fmoney(parseFloat(yuebenjin).toFixed(2)),'yuelixi':app.fmoney(parseFloat(yuelixi).toFixed(2)),'shengyu':app.fmoney(parseFloat(shengyu).toFixed(2)),'value':i});
      }
    }else{
      for (let i = 0; i < monthsum; i++) {
               //初始化
        let yuebenjin = 0.00;
        let yuelixi = 0.00;
        let shengyu = 0.00;
        //公式计算
        //公积金部分
        let Gjjyuelixi = Gjjbenjin * GjjLiLv
            / 12;
        let Gjjyuebenjin = Gjjyuegong
            - Gjjyuelixi;
        let Gjjshengyu = Gjjzonge - Gjjyuegong;
        Gjjzonge = Gjjzonge - Gjjyuegong;
        Gjjbenjin = Gjjbenjin - Gjjyuebenjin;
        //商业贷款部分
        let Syyuelixi = Sybenjin * SyLiLv / 12;
        let Syyuebenjin = Syyuegong - Syyuelixi;
        let Syshengyu = Syzonge - Syyuegong;
        Syzonge = Syzonge - Syyuegong;
        Sybenjin = Sybenjin - Syyuebenjin;
        //合计
        yuebenjin = Gjjyuebenjin + Syyuebenjin;
        yuelixi = Gjjyuelixi + Syyuelixi;
        shengyu = Gjjshengyu + Syshengyu;

        let nian="",yue;

        if (i % 12 == 0) {
          nian = "第"+(parseInt(i / 12) +1)+"年";
          yue="1月"
        }else{
          yue= i - parseInt(i / 12) * 12 + 1+"月";
        }

        if (shengyu < 0) {
          shengyu = 0.00
        }
         arraydebx.push({'nian':nian,'yue':yue,'yuebenjin':app.fmoney(parseFloat(yuebenjin).toFixed(2)),'yuelixi':app.fmoney(parseFloat(yuelixi).toFixed(2)),'shengyu':app.fmoney(parseFloat(shengyu).toFixed(2)),'value':i});
      }
    }
    console.log("arraydebx<<<<<<<<<<<<<<:",arraydebx);
    that.setData({
      bxitems: arraydebx,
    });
  },

  //组合等额本金
  ZHDEBJ:(that)=>{
    console.log("进入ZHDEBJ计算方法");
   //参数处理
    console.log("-年-" + that.data.year);
    //月数
    let monthsum = parseInt(that.data.year) * 12;
    //公积金本金
    let Gjjbenjin = that.data.gjjbenjin;
    //商业贷款本金
    let Sybenjin = that.data.sybenjin;

    //根据年限判断公积金利率
    let ZhGjjll
    if ((that.data.year <= 5) && (that.data.year >= 0)) {
       ZhGjjll = that.data.gjjllzk * 2.75 / 100;
    } else if (year >= 5) {
       ZhGjjll = that.data.gjjllzk * 3.25 / 100;
    }
    //根据年限判断商业贷款利率
    let ZhSdll
    if ((that.data.year <= 1) && (that.data.year >= 0)) {
       ZhSdll = that.data.syllzk * 4.35 / 100;
    } else if ((that.data.year <= 5) && (that.data.year >= 1)) {
       ZhSdll = that.data.syllzk * 4.75 / 100;
    } else {
       ZhSdll = that.data.syllzk * 4.90 / 100;
    }
    //初始化
    let Gjjyuegong = 0.00;
    let Gjjzonge = 0.00;
    let Gjjzlx = 0.00;
    let Syyuegong = 0.00;
    let Syzonge = 0.00;
    let Syzlx = 0.00;
    Gjjbenjin = Gjjbenjin * 10000;
    //公积金部分
    for (let k = 0; k < monthsum; k++) {
      Gjjzlx += (Gjjbenjin - k * Gjjbenjin
          / monthsum)
          * ZhGjjll / 12;
    }
    let gjjzonge = Gjjzlx + Gjjbenjin;
    console.log("公积金" + gjjzonge);
    let gjjyuegong = Gjjbenjin / monthsum
        + (Gjjbenjin * ZhGjjll / 12);
    let gjjyuelixi1 = Gjjbenjin * ZhGjjll / 12;
    let gjjyuebenjindebj = gjjyuegong - gjjyuelixi1
    //商业贷款部分
    Sybenjin = Sybenjin * 10000;
    for (let k = 0; k < monthsum; k++) {
      Syzlx += (Sybenjin - k * Sybenjin
          / monthsum)
          * ZhSdll / 12;
    }
    Syzonge = Syzlx + Sybenjin;
    Syyuegong = Sybenjin / monthsum
        + (Sybenjin * ZhSdll / 12);
    let Syyuelixi1 = Sybenjin * ZhSdll / 12;
    let Syyuebenjindebj = Syyuegong - Syyuelixi1;
    //合计
    console.log("-公积金总额-" + gjjzonge + "-商业总额-"
        + Syzonge + "-总额-" + zonge);
    let zonge = gjjzonge + Syzonge;
    console.log("总额" + zonge);
    let zlx = Gjjzlx + Syzlx;
    let benjin = Gjjbenjin + Sybenjin;
    //写入页面
    let zonge1 = (zonge / 10000).toFixed(2);
    let zlx1 = (zlx / 10000).toFixed(2);
    let benjin1 = (benjin / 10000).toFixed(2);
    //let benjin1 = benjin.toFixed(2);
    //千分符
    zonge1 = app.fmoney(zonge1);
    zlx1 = app.fmoney(zlx1);
    benjin1 = app.fmoney(benjin1);							
    that.setData({
      zonghuankuan02:zonge1,
      zonglixi02:zlx1,
      zongdaikuan02:benjin1,
      yueshu02:monthsum,
    });
    //
		benjin = benjin;
	  //遍历月数 依次写入页面
    console.log("不加载一年以后的数据");
    let arraydebj=[];
    if(that.data.bjfindmore=="0"){
      for (let i = 0; i < 12; i++) {
        //初始化
        ////alert("公积金等额本金");
        let yuebenjin = 0.00;
        let yuelixi = 0.00;
        let shengyu = 0.00;
        //公积金部分
        let Gjjyuelixi = Gjjbenjin * ZhGjjll
            / 12;
        let Gjjyuebenjin = gjjyuebenjindebj;
        ////alert(yuebenjin);
        Gjjyuegong = Gjjyuebenjin + Gjjyuelixi;
        let Gjjshengyu = gjjzonge - Gjjyuegong;
        gjjzonge = gjjzonge - Gjjyuegong;
        Gjjbenjin = Gjjbenjin - Gjjyuebenjin;
        //商业部分
        let Syyuelixi = Sybenjin * ZhSdll / 12;
        let Syyuebenjin = Syyuebenjindebj;
        ////alert(yuebenjin);
        let Syyuegong = Syyuebenjin + Syyuelixi;
        let Syshengyu = Syzonge - Syyuegong;
        Syzonge = Syzonge - Syyuegong;
        Sybenjin = Sybenjin - Syyuebenjin;
        //合计
        yuebenjin = Gjjyuebenjin + Syyuebenjin;
        yuelixi = Gjjyuelixi + Syyuelixi;
        shengyu = Gjjshengyu + Syshengyu;
        console.log("shengyu>>>>>>>>>",shengyu);
        let nian="",yue;

        if (i % 12 == 0) {
          nian = "第"+(parseInt(i / 12) +1)+"年";
          yue="1月"
        }else{
          yue= i - parseInt(i / 12) * 12 + 1+"月";
        }

        if (shengyu < 0) {
          shengyu = 0.00
        }
        arraydebj.push({'nian':nian,'yue':yue,'yuebenjin':app.fmoney(parseFloat(yuebenjin).toFixed(2)),'yuelixi':app.fmoney(parseFloat(yuelixi).toFixed(2)),'shengyu':app.fmoney(parseFloat(shengyu).toFixed(2)),'value':i});
      }
    }else{
      for (let i = 0; i < monthsum; i++) {
        //初始化
        ////alert("公积金等额本金");
        let yuebenjin = 0.00;
        let yuelixi = 0.00;
        let shengyu = 0.00;
        //公积金部分
        let Gjjyuelixi = Gjjbenjin * ZhGjjll
            / 12;
        let Gjjyuebenjin = gjjyuebenjindebj;
        ////alert(yuebenjin);
        Gjjyuegong = Gjjyuebenjin + Gjjyuelixi;
        let Gjjshengyu = gjjzonge - Gjjyuegong;
        gjjzonge = gjjzonge - Gjjyuegong;
        Gjjbenjin = Gjjbenjin - Gjjyuebenjin;
        //商业部分
        let Syyuelixi = Sybenjin * ZhSdll / 12;
        let Syyuebenjin = Syyuebenjindebj;
        ////alert(yuebenjin);
        let Syyuegong = Syyuebenjin + Syyuelixi;
        let Syshengyu = Syzonge - Syyuegong;
        Syzonge = Syzonge - Syyuegong;
        Sybenjin = Sybenjin - Syyuebenjin;
        //合计
        yuebenjin = Gjjyuebenjin + Syyuebenjin;
        yuelixi = Gjjyuelixi + Syyuelixi;
        shengyu = Gjjshengyu + Syshengyu;
        console.log("shengyu>>>>>>>>>",shengyu);
        let nian="",yue;

        if (i % 12 == 0) {
          nian = "第"+(parseInt(i / 12) +1)+"年";
          yue="1月"
        }else{
          yue= i - parseInt(i / 12) * 12 + 1+"月";
        }

        if (shengyu < 0) {
          shengyu = 0.00
        }
         arraydebj.push({'nian':nian,'yue':yue,'yuebenjin':app.fmoney(parseFloat(yuebenjin).toFixed(2)),'yuelixi':app.fmoney(parseFloat(yuelixi).toFixed(2)),'shengyu':app.fmoney(parseFloat(shengyu).toFixed(2)),'value':i});
      }
    }
    console.log("arraydebj<<<<<<<<<<<<<<:",arraydebj);
    that.setData({
      bjitems: arraydebj,
    });
  },

  upper(e) {
    console.log(e);
  },
  lower(e) {
    console.log(e);
  },
  scroll(e) {
    this.setData({
      scrollTop: e.detail.scrollTop,
    });
  },
  scrollEnd() {

  },
});


