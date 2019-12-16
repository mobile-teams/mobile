const app = getApp();
let searchHistory = [];
let v_userid;
Page({
  data: {
    page: 1,
    titleKey: '',
    searchFlag: '0',
  },

  onLoad(options) {
    console.log("搜索onLoad options", searchHistory);
    if (options && options.userid !== '') {
      v_userid = options.userid;
    } else {
      v_userid = '';
    }
    my.getStorage({ //读取searchHistory缓存信息
      key: 'searchHistory',
      success(result) {
        if (result.data != null && result.data != '') {
          if (result.data.searchHistory.length > 0) {
            searchHistory = result.data.searchHistory
          }
        } else {
          console.log("之前没有搜索记录！");
        }
      }
    });
    console.log("searchHistory data", searchHistory);
    this.setData({
      searchHistory: searchHistory
    });
  },

  onShow() {
    this.titleSearch(this);
  },

  //标题模糊搜索及换一换
  titleSearchTap(options) {
    let that = this;
    console.log("options::",options);
    if (options && options.currentTarget.tagName === 'view') {
      that.data.titleKey = '';
      if (that.data.page < Math.ceil(that.data.count / 10)) {
        that.data.page++;
      } else {
        that.data.page = 1;
      }
    } else if (options && options.currentTarget.tagName === 'input') {
      let num = 0;
      /*if (searchHistory.length > 0) {
        searchHistory.forEach(function(item, index) {
          if (that.data.titleKey.trim().length > 0 && that.data.titleKey !== item) {
            num++;
          }
          if (num === searchHistory.length) {
            searchHistory.push(that.data.titleKey);
          }
        });
      } else {
        if (that.data.titleKey.trim().length > 0) {
          searchHistory.push(that.data.titleKey);
        }
      }
      my.setStorage({
        key: 'searchHistory',
        data: {
          searchHistory: searchHistory,
        }
      });*/
    } else {
      that.data.titleKey = '';
    }
    let flag;
    if (that.data.titleKey.trim().length > 0) {
      flag = '1';
    } else {
      flag = '0';
    }
    that.setData({
      searchFlag: flag
    });
    console.log("thatflag", that);
    that.titleSearch(that);
  },

  //搜索框
  searchInput(options) {
    let that = this;
    let inputValue, flag;
    if (options && options.type === 'input') {
      inputValue = options.detail.value.trim();
    } else {
      inputValue = '';
    }
    that.setData({
      titleKey: inputValue
    });
    console.log("titleKey", that.data.titleKey);
    that.titleSearchTap(options);
  },

  //title_search查询
  titleSearch: (that) => {
    var obj = new Object();
    obj.appid = app.data.appid;//'20181127000101'//
    obj.page = that.data.page;
    obj.title_key = that.data.titleKey;
    obj.userid = v_userid == '' ? '0' : v_userid;
    obj.sign = app.getSign(obj, app.data.pkey);
    console.log("obj", obj);
    my.request({
      url: app.data.url + '/app/community/title_search.service',
      method: 'POST',
      headers: {
        "Content-Type": "application/json",
        "citycode": 'CSY001',
      },
      data: JSON.stringify(obj),

      dataType: 'json',
      contentType: 'application/json;charset=UTF-8', //contentType很重要    
      success: (result) => {
        console.log("result", result);
        that.setData({
          count: result.data.count,
          searchItems: result.data.data,
          searchHistory: searchHistory
        });
      },
    });
  },

  //热搜点击
  searchTap(options) {
    
    let that = this;
    let searchData = options.currentTarget.dataset.data;
    console.log("热搜点击:", searchData);//title
     let num = 0;
    if (searchHistory.length > 0) {
        searchHistory.forEach(function(item, index) {
          if (searchData.title.trim().length > 0 && searchData.title !== item) {
            num++;
          }
          if (num === searchHistory.length) {
            searchHistory.push(searchData.title);
          }
        });
      } else {
        if (searchData.title.trim().length > 0) {
          searchHistory.push(searchData.title);
        }
      }
      my.setStorage({
        key: 'searchHistory',
        data: {
          searchHistory: searchHistory,
        }
      });
    //判断目录中是否存在小课堂主题
    my.navigateTo({
      url: '/pages/community/H5page/H5page?h5param=detail&userid=' + v_userid
        + '&title_id=' + searchData.title_id +
        '&szsx=' + searchData.szsx
    })
  },

  //搜索历史点击
  searchHistoryTap(options) {
    console.log("搜索历史点击", options);
    this.setData({
      titleKey: options.currentTarget.dataset.value,
      searchFlag: '1'
    });
     this.titleSearch(this);
  },

  //删除搜索历史
  deleteHistory(options) {
    searchHistory = [];
    my.setStorage({
      key: 'searchHistory',
      data: {
        searchHistory: searchHistory,
      }
    });
    this.setData({
      searchHistory: []
    });
  },

});
