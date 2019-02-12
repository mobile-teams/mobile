const app = getApp();
const extContainers = [
 {
        thumb: '/image/dh.png',
        text: '导航',
      },
       {
        thumb: '/image/phone.png',
        text: '联系电话',
      },
      {
        thumb: '/image/dtxq.png',
        text: '详情',
       // path:'../fuwu/fuwu',
      },

];
 const itemsGlb= [
      {
        title: '石家庄住房公积金管理中心',
        brief: '河北省石家庄市新石北路360-1号',
        arrow: false,
        index:0,
        list: extContainers,
      },
      {
        title: '桥西管理部',
        brief: '新石北路360—1号市公积金中心2楼(新石北路与友谊南大街交叉口西行500米路南)',
        arrow: false,
        index:1,
        list: extContainers,
      },
      {
        title: '长安管理部',
        brief: '西大街52号农行广安支行2楼(中山东路与西大街交叉口南行200米路西)',
        arrow: false,
         index:2,
        list: extContainers,
      },
      {
        title: '桥东管理部',
         brief: '石家庄市槐安东路77号市行政服务中心1楼(休门街与槐安路交叉口东北角)',
        arrow: false,
         index:3,
        list: extContainers,
      },
      {
        title: '新华管理部',
        brief: '石家庄市和平西路58号一楼',
        arrow: false,
         index:4,
        list: extContainers,
      },
      {
        title: '裕华管理部',
        brief: '石家庄市槐安东路与雅清街交叉口西南角工行胜利支行1楼',
        arrow: false,
         index:5,
        list: extContainers,
      },
      {
        title: '藁城管理部',
        brief: '昌盛南街22号',
        arrow: false,
         index:6,
        list: extContainers,
      },
      {
        title: '晋州管理部',
        brief: '晋州市中兴路新华街26号',
        arrow: false,
         index:7,
        list: extContainers,
      },
      {
        title: '新乐管理部',
        brief: '新乐市礼堂街与南环路交叉口南行50米路东',
        arrow: false,
         index:8,
        list: extContainers,
      },
      {
        title: '鹿泉管理部',
        brief: '鹿泉区新康路19号西楼',
        arrow: false,
         index:9,
        list: extContainers,
      },
      {
        title: '正定管理部',
        brief: '正定县常山西路52号中国银行正定支行西侧',
        arrow: false,
         index:10,
        list: extContainers,
      },
      {
        title: '栾城管理部',
        brief: '栾城县鑫源路21号建设银行栾城支行院内',
        arrow: false,
         index:11,
        list: extContainers,
      },
      {
        title: '井陉管理部',
        brief: '井陉县城微新路5-1号（欢喜岭河北银行对面，原中国人寿三楼）',
        arrow: false,
         index:12,
        list: extContainers,
      },
      {
        title: '无极管理部',
        brief: '无极县贸易南街25号',
        arrow: false,
         index:13,
        list: extContainers,
      },
 {
        title: '深泽管理部',
        brief: '深泽县西苑街与北苑路交叉口西南角',
        arrow: false,
         index:14,
        list: extContainers,
      },
       {
        title: '行唐管理部',
        brief: '行唐县香港路南头阳光水岸小区底商（阳光水岸小区北门西行100米）',
        arrow: false,
         index:15,
        list: extContainers,
      },
       {
        title: '灵寿管理部',
        brief: '灵寿县松阳大街4-9号',
        arrow: false,
         index:16,
        list: extContainers,
      },
       {
        title: '平山管理部',
        brief: '平山县康乐街南头、书香苑小区北临底商',
        arrow: false,
         index:17,
        list: extContainers,
      },
       {
        title: '赵县管理部',
        brief: '赵县柏林大街159号建设银行二楼',
        arrow: false,
         index:18,
        list: extContainers,
      },
{
        title: '元氏管理部',
        brief: '元氏县北环路190号（向阳街与北环路交口东行100米路南）',
        arrow: false,
         index:19,
        list: extContainers,
      },
       {
        title: '高邑管理部',
        brief: '高邑县城南星路119号财产保险三楼',
        arrow: false,
         index:20,
        list: extContainers,
      },
      {
        title: '赞皇管理部',
        brief: '赞皇县城太行路与状元街交口',
        arrow: false,
         index:21,
        list: extContainers,
      },
      {
        title: '矿区管理部',
        brief: '矿区中纬西路2号',
        arrow: false,
         index:22,
        list: extContainers,
      },
    ];
Page({
  data: {
    itemsGlb,
  },
  onLoad() {
  },
  onItemClick(ev) {
     console.log("1111111",ev);
     var num= ev.index.split("-");

     if(num[0] == 0){
        if(num[1]==0){
            my.openLocation({
              longitude: '114.4463100000',
              latitude: '38.0185000000',
              name:  '石家庄住房公积金管理中心',
              address: '河北省石家庄市新石北路360-1号',
            })
        }
        if(num[1]==1){
           my.makePhoneCall({ number: '0311-85290000' });
        }
          if(num[1]==2){
            let map = '石家庄住房公积金管理中心,河北省石家庄市新石北路360-1号,0311-85290000,贷款、提取、缴存,周一到周五(国家法定节假日除外)上午: 9:00-12:00下午: 13：00-17：00'
            //跳转详情
             my.navigateTo({ url: 'detail/detail?map='+map })
        }   
     }
     if(num[0] == 1){
        if(num[1]==0){
            my.openLocation({
              longitude: '114.4463100000',
              latitude: '38.0185000000',
              name:  '桥西管理部',
              address: '新石北路360—1号市公积金中心2楼(新石北路与友谊南大街交叉口西行500米路南)',
            })
        }
        if(num[1]==1){
           my.makePhoneCall({ number: '0311-85296231' });
        }
          if(num[1]==2){
             let map = '桥西管理部,新石北路360—1号市公积金中心2楼(新石北路与友谊南大街交叉口西行500米路南),0311-85296231,贷款、提取、缴存,周一到周五(国家法定节假日除外)上午: 9:00-12:00下午: 13：00-17：00'
            //跳转详情
             my.navigateTo({ url: 'detail/detail?map='+map })
        }  
     }
     if(num[0] == 2){
        if(num[1]==0){
            my.openLocation({
              longitude: '114.5209100000',
              latitude: '38.0415500000',
              name:  '长安管理部',
              address: '西大街52号农行广安支行2楼(中山东路与西大街交叉口南行200米路西)',
            })
        }
        if(num[1]==1){
           my.makePhoneCall({ number: '0311-86675006' });
        }
          if(num[1]==2){
              let map = '长安管理部,西大街52号农行广安支行2楼(中山东路与西大街交叉口南行200米路西),0311-86675006'
            //跳转详情
             my.navigateTo({ url: 'detail/detail?map='+map })
        }  
     }
     if(num[0] == 3){
        if(num[1]==0){
            my.openLocation({
              longitude: '114.5077000000',
              latitude: '38.0225900000',
              name:  '桥东管理部',
              address: '石家庄市槐安东路77号市行政服务中心1楼(休门街与槐安路交叉口东北角)',
            })
        }
        if(num[1]==1){
          my.makePhoneCall({ number: '0311-86137233' });
        }
          if(num[1]==2){
            let map = '桥东管理部,石家庄市槐安东路77号市行政服务中心1楼(休门街与槐安路交叉口东北角),0311-86137233'
            //跳转详情
             my.navigateTo({ url: 'detail/detail?map='+map })
        }  
     }
     if(num[0] == 4){
        if(num[1]==0){
            my.openLocation({
              longitude: '114.4862700000',
              latitude: '38.0555700000',
              name:  '新华管理部',
              address: '石家庄市和平西路58号一楼',
            })
        }
        if(num[1]==1){
          my.makePhoneCall({ number: '0311-85296760' });
        }
          if(num[1]==2){
            let map = '新华管理部,石家庄市和平西路58号一楼,0311-85296760'
            //跳转详情
             my.navigateTo({ url: 'detail/detail?map='+map })
        }  
     }
     if(num[0] == 5){
        if(num[1]==0){
            my.openLocation({
              longitude: '114.5664300000',
              latitude: '38.0221000000',
              name:  '裕华管理部',
              address: '石家庄市槐安东路与雅清街交叉口西南角工行胜利支行1楼',
            })
        }
        if(num[1]==1){
          my.makePhoneCall({ number: '0311-89901002' });
        }
          if(num[1]==2){
            //跳转详情
             my.navigateTo({ url: 'detail/detail' })
        }  
     }
     if(num[0] == 6){
        if(num[1]==0){
            my.openLocation({
              longitude: '114.8589900000',
              latitude: '38.0245900000',
              name:  '藁城管理部',
              address: '昌盛南街22号',
            })
        }
        if(num[1]==1){
          my.makePhoneCall({ number: '0311-88163710' });
        }
          if(num[1]==2){
            //跳转详情
             my.navigateTo({ url: 'detail/detail' })
        }  
     }
     if(num[0] == 7){
        if(num[1]==0){
            my.openLocation({
              longitude: '115.0454300000',
              latitude: '38.0256300000',
              name:  '晋州管理部',
              address: '晋州市中兴路新华街26号',
            })
        }
        if(num[1]==1){
          my.makePhoneCall({ number: '0311-84310320' });
        }
          if(num[1]==2){
            //跳转详情
             my.navigateTo({ url: 'detail/detail' })
        }  
     }
     if(num[0] == 8){
        if(num[1]==0){
            my.openLocation({
              longitude: '114.6818200000',
              latitude: '38.3448600000',
              name:  '新乐管理部',
              address: '新乐市礼堂街与南环路交叉口南行50米路东',
            })
        }
        if(num[1]==1){
           my.makePhoneCall({ number: '0311-88582607' });
        }
          if(num[1]==2){
            //
            console.log("3333333333",num);
        }  
     }
     if(num[0] == 9){
        if(num[1]==0){
            my.openLocation({
              longitude: '114.3143600000',
              latitude: '38.0937200000',
              name:  '鹿泉管理部',
              address: '鹿泉区新康路19号西楼',
            })
        }
        if(num[1]==1){
           my.makePhoneCall({ number: '0311-82188385' });
        }
          if(num[1]==2){
            //
            console.log("3333333333",num);
        }  
     }
     if(num[0] == 10){
        if(num[1]==0){
            my.openLocation({
              longitude: '114.5582400000',
              latitude: '38.1453900000',
              name:  '正定管理部',
              address: '正定县常山西路52号中国银行正定支行西侧',
            })
        }
        if(num[1]==1){
          my.makePhoneCall({ number: '0311-88018803' });
        }
          if(num[1]==2){
            //
            console.log("3333333333",num);
        }  
     }
     if(num[0] == 11){
        if(num[1]==0){
            my.openLocation({
              longitude: '114.6534000000',
              latitude: '37.8882600000',
              name:  '栾城管理部',
              address: '栾城县鑫源路21号建设银行栾城支行院内',
            })
        }
        if(num[1]==1){
          my.makePhoneCall({ number: '0311-85503917' });
        }
          if(num[1]==2){
            //
            console.log("3333333333",num);
        }  
     }
     if(num[0] == 12){
        if(num[1]==0){
            my.openLocation({
              longitude: '114.1556100000',
              latitude: '38.0193700000',
              name:  '井陉管理部',
              address: '井陉县城微新路5-1号（欢喜岭河北银行对面，原中国人寿三楼）',
            })
        }
        if(num[1]==1){
           my.makePhoneCall({ number: '0311-82022838' });
        }
          if(num[1]==2){
            //
            console.log("3333333333",num);
        }  
     }
     if(num[0] == 13){
        if(num[1]==0){
            my.openLocation({
              longitude: '114.9639100000',
              latitude: '38.1755700000',
              name:  '无极管理部',
              address: '无极县贸易南街25号',
            })
        }
        if(num[1]==1){
          my.makePhoneCall({ number: '0311-85581603' });
        }
          if(num[1]==2){
            //
            console.log("3333333333",num);
        }  
     }
     if(num[0] == 14){
        if(num[1]==0){
            my.openLocation({
              longitude: '115.1885500000',
              latitude: '38.1831400000',
              name:  '深泽管理部',
              address: '深泽县西苑街与北苑路交叉口西南角',
            })
        }
        if(num[1]==1){
          my.makePhoneCall({ number: '0311-83522232' });
        }
          if(num[1]==2){
            //
            console.log("3333333333",num);
        }  
     }
     if(num[0] == 15){
        if(num[1]==0){
            my.openLocation({
              longitude: '114.5504600000',
              latitude: '38.4383000000',
              name:  '行唐管理部',
              address: '行唐县香港路南头阳光水岸小区底商（阳光水岸小区北门西行100米）',
            })
        }
        if(num[1]==1){
          my.makePhoneCall({ number: '0311-82999903' });
        }
          if(num[1]==2){
            //
            console.log("3333333333",num);
        }  
     }
     if(num[0] == 16){
        if(num[1]==0){
            my.openLocation({
              longitude: '114.3640100000',
              latitude: '38.3027300000',
              name:  '灵寿管理部',
              address: '灵寿县松阳大街4-9号',
            })
        }
        if(num[1]==1){
           my.makePhoneCall({ number: '0311-85581603' });
        }
          if(num[1]==2){
            //
            console.log("3333333333",num);
        }  
     }
     if(num[0] == 17){
        if(num[1]==0){
            my.openLocation({
              longitude: '114.1843000000',
              latitude: '38.2605800000',
              name:  '平山管理部',
              address: '平山县康乐街南头、书香苑小区北临底商',
            })
        }
        if(num[1]==1){
          my.makePhoneCall({ number: '0311-82905601' });
        }
          if(num[1]==2){
            //
            console.log("3333333333",num);
        }  
     }
     if(num[0] == 18){
        if(num[1]==0){
            my.openLocation({
              longitude: '114.7834170000',
              latitude: '37.7550130000',
              name:  '赵县管理部',
              address: '赵县柏林大街159号建设银行二楼',
            })
        }
        if(num[1]==1){
          my.makePhoneCall({ number: '0311-84950234' });
        }
          if(num[1]==2){
            console.log("3333333333",num);
        }  
     }
     if(num[0] == 19){
        if(num[1]==0){
            my.openLocation({
              longitude: '114.5244500000',
              latitude: '37.7745500000',
              name:  '元氏管理部',
              address: '元氏县北环路190号（向阳街与北环路交口东行100米路南）',
            })
        }
        if(num[1]==1){
          my.makePhoneCall({ number: '0311-84608159' });
        }
          if(num[1]==2){

            console.log("3333333333",num);
        }  
     }
     if(num[0] == 20){
        if(num[1]==0){
            my.openLocation({
              longitude: '114.6109200000',
              latitude: '37.6079100000',
              name:  '高邑管理部',
              address: '高邑县城南星路119号财产保险三楼',
            })
        }
        if(num[1]==1){
          my.makePhoneCall({ number: '0311-84030795' });
        }
          if(num[1]==2){
            //
            console.log("3333333333",num);
        }  
     }
     if(num[0] == 21){
        if(num[1]==0){
            my.openLocation({
              longitude: '114.4022400000',
              latitude: '37.6587700000',
              name:  '赞皇管理部',
              address: '赞皇县城太行路与状元街交口',
            })
        }
        if(num[1]==1){
         my.makePhoneCall({ number: '0311-84226966' });
        }
          if(num[1]==2){
            //
            console.log("3333333333",num);
        }  
     }
     if(num[0] == 22){
        if(num[1]==0){
            my.openLocation({
              longitude: '114.0631800000',
              latitude: '38.0684300000',
              name:  '矿区管理部',
              address: '矿区中纬西路2号',
            })
        }
        if(num[1]==1){
          my.makePhoneCall({ number: '0311-82074052' });
        }
          if(num[1]==2){
            //
            console.log("3333333333",num);
        }  
     }
  },
});

