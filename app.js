//var fun_md5 = require('/utils/aes/md5.js')
//var fun_sha1 = require('/utils/aes/sha1.js')
var fun_sign = require('/utils/aes/sha1.min.js')
//var fun_base64 = require('/utils/base64.js')
var fun_aes = require('/utils/aes/aes.js')
//var key = fun_aes.CryptoJS.enc.Utf8.parse("SY9IS82J4NDJS05H");  
//十六位十六进制数作为秘钥偏移量
var iv = fun_aes.CryptoJS.enc.Utf8.parse('A-16-Byte-String');

App({
  globalData: {
    grzh: 0,
    jkhtbh: 0,
    dwmc: " ",
    dkxx: [],
    xingming: "",
    zjhm: "",
    urls: "",   //城服接入标志参数，慎改
    // url: "https://openapi.sjgjj.cn",
    url: "https://apics.sjgjj.cn",//测试环境。
    zjbzxbm: "",
    gruangaourl: " ",
    appid: "20170815290101",
    pkey: "SY9IS82J4NDJS05HFNDJS73JRUG5BSKG",
    token: "",
    grkey: "",
    virtual_user: '0',//0是虚拟用户未注册 1是虚拟用户已经注册
    virtual_user_state: '0',//0是未审批通过 1是用户注册审批通过
    hctime: 24 * 60 * 60,
    pdsfdl: false

  },

  onLaunch(options) {
    /************************城市服务使用，切勿随意修改**************************** */
    //获取启动参数 
    if (options.query) {
      if (options.query.citybm) {
        this.globalData.zjbzxbm = JSON.stringify(options.query.citybm).replace(/\"/g, "")
      }
      if (options.query.urls) {
        this.globalData.urls = JSON.stringify(options.query.urls).replace(/\"/g, "")
      }
      if (options.query.dlzt) {
        this.globalData.pdsfdl = true
      }
      my.setStorage({
        key: 'city',
        data: {
          citybm: this.globalData.zjbzxbm
        }
      });

    }
    /************************城市服务使用，切勿随意修改**************************** */

    /**
     * 强制更新
     */
    const updateManager = my.getUpdateManager()
    updateManager.onCheckForUpdate(function (res) {
      // 请求完新版本信息的回调
      console.log("请求完新版本信息的回调", res.hasUpdate)
      if (res.hasUpdate) {
        updateManager.onUpdateReady(function (res) {
          //清除缓存
          my.clearStorage();
          my.alert({
            title: '更新提示',
            content: '新版本已经准备好，是否重启应用？',
            success: function () {
              // 新的版本已经下载好，调用 applyUpdate 应用新版本并重启
              updateManager.applyUpdate();
            }
          })
        })

        // 新版本下载失败
        updateManager.onUpdateFailed(function () {
          my.alert({
            title: '提示',
            content: '新版本已经上线啦~，请您删除当前小程序，重新搜索打开~'
          });
        })
      }
    })
  },
  onShow(options) {
    //热启动
  },
  //存放全局变量
  setGrzh: function (event) {
    this.globalData.grzh = event
    console.log('=======个人账号==', this.globalData.grzh)
  },
  setJkhtbh: function (event) {
    this.globalData.jkhtbh = event
    console.log('=======借款合同编号==', this.globalData.jkhtbh)
  },
  setDkxx: function (event) {
    this.globalData.dkxx = event
    console.log('=======贷款信息==', this.globalData.jkhtbh)
  },
  //存放姓名和证件号码
  setXingming: function (event) {
    this.globalData.xingming = event;
  },

  //存放广告url
  setGuanggaourl: function (event) {
    this.globalData.gruangaourl = event;
  },
  setZjbzxbm: function (event) {
    this.globalData.zjbzxbm = event;
  },
  setZjhm: function (event) {
    this.globalData.zjhm = event;
  },
  setDwmc: function (event) {
    this.globalData.dwmc = event;
  },

  fmoney(s = 0, n = 2) {
    const dot = str => `.${(+('0.' + (str || 0))).toFixed(n).split('.')[1]}`
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
    Year = day.getFullYear() - 2;// 支持IE和火狐浏览器.
    CurrentDate = Year + "-01-01";
    return CurrentDate;
  },
  getSign(a, b) {
    //const key= fun_aes.CryptoJS.enc.Utf8.parse(this.globalData.pkey.substr(0, 16));  
    return fun_sign.Appsign(a, b);
  },
  EncryptBASE64: function (word, keys) {
    var key = fun_aes.CryptoJS.enc.Utf8.parse(keys.substr(0, 16));
    var srcs1 = fun_aes.CryptoJS.enc.Utf8.parse(word);
    var encrypted1 = fun_aes.CryptoJS.AES.encrypt(srcs1, key, { iv: iv, mode: fun_aes.CryptoJS.mode.CBC, padding: fun_aes.CryptoJS.pad.Pkcs7 });
    //返回base64加密结果
    return encrypted1.toString();
  },
  Decrypt: function (word, keys) {
    var key = fun_aes.CryptoJS.enc.Utf8.parse(keys.substr(0, 16));
    var decrypt = fun_aes.CryptoJS.AES.decrypt(word, key, { iv: iv, mode: fun_aes.CryptoJS.mode.CBC, padding: fun_aes.CryptoJS.pad.Pkcs7 });

    return JSON.parse(fun_aes.CryptoJS.enc.Utf8.stringify(decrypt).toString());
  },

  CurentTime() {
    var myDate = new Date();
    return myDate.getTime(); //获取当前时间(从1970.1.1开始的毫秒数)
  },
  onShareAppMessage() {
    return {
      path: 'citychose/citychose',
    };
  },
});
