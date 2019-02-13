Page({
  data: {
    zxmc:"",
    address:"",
    tel:"",
    ywlx:"",
    fwsj:"",
  },
  onLoad(options) {
     var that = this;
     var map = options.map.split(",");
     console.log("map",map);
     this.setData({
      zxmc:map[0],
      address:map[1],
      tel:map[2],
      ywlx:map[3],
      fwsj:map[4],
    })
  },
});
