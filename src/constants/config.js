// 是否需要vConsole
export const needVConsole = false;

export const cities = [
  {
    name: '北京',
    value: '1',
  }, {
    name: '重庆',
    value: '2',
  }, {
    name: '天津',
    value: '3',
  }, {
    name: '成都',
    value: '4',
  }, {
    name: '昆明',
    value: '5',
  }, {
    name: '上海',
    value: '6',
  }, {
    name: '银川',
    value: '7',
  }, {
    name: '南京',
    value: '8',
  }, {
    name: '杭州',
    value: '9',
  }, {
    name: '深圳',
    value: '11',
  }, {
    name: '石家庄',
    value: '12',
  }, {
    name: '广州',
    value: '14',
  }, {
    name: '东莞',
    value: '17',
  }, {
    name: '济南',
    value: '18',
  }, {
    name: '武汉',
    value: '19',
  }, {
    name: '长春',
    value: '25',
  }, {
    name: '郑州',
    value: '27',
  }, {
    name: '合肥',
    value: '31',
  }, {
    name: '沈阳',
    value: '37',
  }, {
    name: '哈尔滨',
    value: '42',
  }, {
    name: '太原',
    value: '47',
  }, {
    name: '长沙',
    value: '54',
  }, {
    name: '廊坊',
    value: '60',
  }, {
    name: '西安',
    value: '64',
  }, {
    name: '南昌',
    value: '75',
  }, {
    name: '海口',
    value: '87',
  }, {
    name: '贵阳',
    value: '95',
  }, {
    name: '呼和浩特',
    value: '109',
  }, {
    name: '南宁',
    value: '117',
  }, {
    name: '乌鲁木齐',
    value: '173',
  }
];
export const SanZheOption = [
  {name: '不投保', value: '0'},
  {name: '5万', value: '50000'},
  {name: '10万', value: '100000'},
  {name: '15万', value: '150000'},
  {name: '20万', value: '200000'},
  {name: '30万', value: '300000'},
  {name: '50万', value: '500000'},
  {name: '100万', value: '1000000'},
  {name: '150万', value: '1500000'},
  {name: '200万', value: '2000000'},
  {name: '250万', value: '2500000'},
  {name: '300万', value: '3000000'},
  {name: '500万', value: '5000000'},
];
export const SiJiOption = [
  {name: '不投保', value: '0'},
  {name: '1万', value: '10000'},
  {name: '2万', value: '20000'},
  {name: '3万', value: '30000'},
  {name: '4万', value: '40000'},
  {name: '5万', value: '50000'},
  {name: '10万', value: '100000'},
  {name: '20万', value: '200000'},
  {name: '50万', value: '500000'},
  {name: '100万', value: '1000000'},
];
export const ChengKeOption = [
  {name: '不投保', value: '0'},
  {name: '1万', value: '10000'},
  {name: '2万', value: '20000'},
  {name: '3万', value: '30000'},
  {name: '4万', value: '40000'},
  {name: '5万', value: '50000'},
  {name: '10万', value: '100000'},
  {name: '20万', value: '200000'},
  {name: '50万', value: '500000'},
  {name: '100万', value: '1000000'},
];
export const HuaHenOption = [
  {name: '不投保', value: '0'},
  {name: '2000元', value: '2000'},
  {name: '5000元', value: '5000'},
  {name: '1万', value: '10000'},
  {name: '2万', value: '20000'},
];
export const BoLiOption = [
  {name: '不投保', value: '0'},
  {name: '国产', value: '1'},
  {name: '进口', value: '2'},
];
export const HcXiuLiChangOption_cn = [
  {name: '上浮系数', value: '0'},
  {name: '10%', value: '0.1'},
  {name: '15%', value: '0.15'},
  {name: '20%', value: '0.2'},
  {name: '30%', value: '0.3'},
];
export const HcXiuLiChangOption_en = [
  {name: '上浮系数', value: '0'},
  {name: '15%', value: '0.15'},
  {name: '20%', value: '0.2'},
  {name: '30%', value: '0.3'},
  {name: '40%', value: '0.4'},
  {name: '50%', value: '0.5'},
  {name: '60%', value: '0.6'},
];

export function getCarInfo() {
  return {
    "message": "",
    "respCode": "0",
    "respMsg": null,
    "data": {
      "SaveQuote": {
        "Fybc": "0",
        "FybcDays": "0",
        "SheBeiSunShi": "0",
        "BjmSheBeiSunShi": "0",
        "Source": 4.0,
        "HcJingShenSunShi": 0.0,
        "HcSanFangTeYue": 0.0,
        "HcXiuLiChang": "0",
        "HcXiuLiChangType": "-1",
        "SheBeis": [],
        "BoLi": 0.0,
        "BuJiMianCheSun": 1.0,
        "BuJiMianDaoQiang": 0.0,
        "BuJiMianSanZhe": 1.0,
        "BuJiMianChengKe": 0.0,
        "BuJiMianSiJi": 0.0,
        "BuJiMianHuaHen": 0.0,
        "BuJiMianSheShui": 0.0,
        "BuJiMianZiRan": 0.0,
        "BuJiMianJingShenSunShi": 0.0,
        "SheShui": 0.0,
        "HuaHen": 0.0,
        "SiJi": 0.0,
        "ChengKe": 0.0,
        "CheSun": 74752.0,
        "DaoQiang": 0.0,
        "SanZhe": 1000000.0,
        "ZiRan": 0.0
      },
      "UserInfo": {
        "IdType": 1.0,
        "Organization": "海宁支公司车商业务一部",
        "AutoMoldCode": "BTAAAD0030",
        "ExhaustScale": "1.7980",
        "PostedName": "浦鹏程",
        "CredentislasNum": "330481199103273210",
        "ModleName": "思域DHW7182FBASD轿车",
        "NextForceStartDate": "2020-01-08 00:00:00",
        "NextBusinessStartDate": "2020-01-08 00:00:00",
        "FuelType": 1.0,
        "ProofType": 1.0,
        "ClauseType": 2.0,
        "LicenseColor": 1.0,
        "RunRegion": 1.0,
        "IsPublic": 2.0,
        "BizNo": "PDAA201833040000369320",
        "ForceNo": "PDZA201833040000414833",
        "InsuredName": "浦鹏程",
        "InsuredIdCard": "330481199103273210",
        "InsuredIdType": 1.0,
        "InsuredMobile": "",
        "HolderIdCard": "330481199103273210",
        "HolderIdType": 1.0,
        "HolderMobile": "",
        "CarUsedType": 1.0,
        "SeatCount": 5.0,
        "CityCode": 1.0,
        "RegisterDate": "2014-01-06",
        "PurchasePrice": 116800.0,
        "ForceExpireDate": "2020-01-07 23:59:59",
        "BusinessExpireDate": "2020-01-07 23:59:59",
        "LicenseOwner": "浦鹏程",
        "LicenseNo": "浙F707M7",
        "RateFactor1": 0.6,
        "RateFactor2": 0.75,
        "RateFactor3": 0.85,
        "RateFactor4": 1.0,
        "CarVin": "LVHFB2642D5033786",
        "EngineNo": "3033760",
        "sealManId": "ae2187091414459d9caec0fd933fd00d"
      },
      "StatusMessage": "续保成功",
      "BusinessStatus": 1.0
    },
    "ok": true
  }
}

export function getOwnerInfo() {
  return {
    "data": {
      "BusinessStatus": 1.0,
      "SaveQuote": {
        "BoLi": 0.0,
        "BuJiMianCheSun": 0.0,
        "BuJiMianChengKe": 0.0,
        "BuJiMianDaoQiang": 0.0,
        "BuJiMianHuaHen": 0.0,
        "BuJiMianJingShenSunShi": 0.0,
        "BuJiMianSanZhe": 0.0,
        "BuJiMianSheShui": 0.0,
        "BuJiMianSiJi": 0.0,
        "BuJiMianZiRan": 0.0,
        "CheSun": 0.0,
        "ChengKe": 0.0,
        "DaoQiang": 0.0,
        "HcJingShenSunShi": 0.0,
        "HcSanFangTeYue": 0.0,
        "HuaHen": 0.0,
        "SanZhe": 0.0,
        "SheShui": 0.0,
        "SiJi": 0.0,
        "Source": 0.0,
        "ZiRan": 0.0
      },
      "StatusMessage": "查询成功",
      "UserInfo": {
        "BusinessExpireDate": "",
        "CarUsedType": 1.0,
        "CarVin": "LVGBM51K6FG576893",
        "CityCode": 0.0,
        "ClauseType": 0.0,
        "CredentislasNum": "",
        "EngineNo": "P116713",
        "ForceExpireDate": "",
        "FuelType": 1.0,
        "HolderIdCard": "1",
        "HolderIdType": 0.0,
        "HolderMobile": "",
        "IdType": 1.0,
        "InsuredIdCard": "",
        "InsuredIdType": 1.0,
        "InsuredMobile": "",
        "InsuredName": "",
        "IsNewCar": "1",
        "IsPublic": 2.0,
        "LicenseColor": 0.0,
        "LicenseNo": "浙F880SJ",
        "LicenseOwner": "",
        "ModleName": "丰田GTM7202GE轿车",
        "NextForceStartDate": "",
        "PostedName": "",
        "ProofType": 0.0,
        "PurchasePrice": 0.0,
        "RateFactor1": 0.0,
        "RateFactor2": 0.0,
        "RateFactor3": 0.0,
        "RateFactor4": 0.0,
        "RegisterDate": "2019-01-10",
        "RunRegion": 0.0,
        "SeatCount": 0.0,
        "sealManId": "ec68e3c38cba479eba40541705ffbcc9"
      }
    }, "message": "", "ok": true, "respCode": "0"
  }
}


export const SaveQuoteMap = {
  BoLi: {desc: '玻璃单独破碎险', bjm: ''},
  CheSun: {desc: '机动车损失险', bjm: 'BuJiMianCheSun'},
  ChengKe: {desc: '乘客座位险', bjm: 'BuJiMianChengKe'},
  DaoQiang: {desc: '全车盗抢险', bjm: 'BuJiMianDaoQiang'},
  HcJingShenSunShi: {desc: '精神损失险', bjm: 'BuJiMianJingShenSunShi'},
  HcSanFangTeYue: {desc: '机动车无法找到第三方险', bjm: ''},
  HcXiuLiChang: {desc: '指定修理厂险', bjm: 'HcXiuLiChangType'},
  HuaHen: {desc: '划痕险', bjm: 'BuJiMianHuaHen'},
  SanZhe: {desc: '第三者责任险', bjm: 'BuJiMianSanZhe'},
  SheShui: {desc: '涉水行驶损失险', bjm: 'BuJiMianSheShui'},
  SiJi: {desc: '司机座位险', bjm: 'BuJiMianSiJi'},
  ZiRan: {desc: '自燃损失险', bjm: 'BuJiMianZiRan'},
};

export const IdCardOptions = [
  {name: '身份证', value: '1'},
  {name: '组织机构代码证', value: '2'},
  {name: '护照', value: '3'},
  {name: '军官证', value: '4'},
  {name: '港澳居民来往内地通行证', value: '5'},
  {name: '其他', value: '6'},
  {name: '港澳通行证', value: '7'},
  {name: '出生证', value: '8'},
  {name: '营业执照（社会统一信用代码）', value: '9'},
  {name: '税务登记证', value: '10'},
  {name: '港澳身份证', value: '14'},
];

export const QquoteComp = [
  {id: '1', name: '太平洋车险', 'img': require('@/assets/tpyIcon.png')},
  {id: '2', name: '平安车险', 'img': require('@/assets/payhIcon.png')},
  {id: '4', name: '人保车险', 'img': require('@/assets/rbIcon.png')},
  {id: '8', name: '中国人寿财险', 'img': require('@/assets/zgrsIcon.png')},
];

export const SaveBizQuoteMap = {
  BoLi: {desc: '玻璃单独破碎险', bjm: ''},
  CheSun: {desc: '机动车损失险', bjm: 'BuJiMianCheSun'},
  ChengKe: {desc: '乘客座位险', bjm: 'BuJiMianChengKe'},
  DaoQiang: {desc: '全车盗抢险', bjm: 'BuJiMianDaoQiang'},
  HcJingShenSunShi: {desc: '精神损失险', bjm: 'BuJiMianJingShenSunShi'},
  HcSanFangTeYue: {desc: '机动车无法找到第三方险', bjm: ''},
  HcXiuLiChang: {desc: '指定修理厂险', bjm: 'HcXiuLiChangType'},
  HuaHen: {desc: '划痕险', bjm: 'BuJiMianHuaHen'},
  SanZhe: {desc: '第三者责任险', bjm: 'BuJiMianSanZhe'},
  SheShui: {desc: '涉水行驶损失险', bjm: 'BuJiMianSheShui'},
  SiJi: {desc: '司机座位险', bjm: 'BuJiMianSiJi'},
  ZiRan: {desc: '自燃损失险', bjm: 'BuJiMianZiRan'},
};

export const getCarJson = {
  "message": "",
  "respCode": "0",
  "respMsg": null,
  "data": {
    "priceId": "1208",
    "id": "1208",
    "ownerId": "81269",
    "plateNum": "京AK3401",
    "vinNo": "LSYBCAAA1BK040463",
    "ownerName": "李成云",
    "registerDate": null,
    "viExp": "2018-08-17 00:00:00",
    "createTime": "2019-01-04 08:13:56",
    "engineNum": "061331",
    "priceJson": "[{\"Item\":{\"BizRate\":0,\"ForceRate\":0,\"BizTotal\":445,\"ForceTotal\":950,\"TaxTotal\":400,\"QuoteStatus\":1,\"QuoteResult\":\"1.车牌号冀A5D307: 商业险上年保险止期：20180630. 交强险上年保单无平台信息.\",\"RepeatSubmitResult\":null,\"HcSheBeiSunshi\":{\"baoE\":0,\"baoFei\":0},\"HcHuoWuZeRen\":{\"baoE\":0,\"baoFei\":0},\"HcFeiYongBuChang\":null,\"BuJiMianJingShenSunSh\":null,\"RateFactor1\":1,\"RateFactor2\":0.75,\"RateFactor3\":0.85,\"RateFactor4\":1,\"TotalRate\":null,\"SheBeis\":null,\"Source\":1,\"BoLi\":{\"baoE\":0,\"baoFei\":0},\"BuJiMianCheSun\":{\"baoE\":0,\"baoFei\":0},\"BuJiMianDaoQiang\":{\"baoE\":0,\"baoFei\":0},\"BuJiMianSanZhe\":{\"baoE\":1,\"baoFei\":58.04},\"BuJiMianChengKe\":{\"baoE\":0,\"baoFei\":0},\"BuJiMianSiJi\":{\"baoE\":0,\"baoFei\":0},\"BuJiMianHuaHen\":{\"baoE\":0,\"baoFei\":0},\"BuJiMianSheShui\":{\"baoE\":0,\"baoFei\":0},\"BuJiMianZiRan\":{\"baoE\":0,\"baoFei\":0},\"SheShui\":{\"baoE\":0,\"baoFei\":0},\"HuaHen\":{\"baoE\":0,\"baoFei\":0},\"SiJi\":{\"baoE\":0,\"baoFei\":0},\"ChengKe\":{\"baoE\":0,\"baoFei\":0},\"CheSun\":{\"baoE\":0,\"baoFei\":0},\"Fybc\":null,\"FybcDays\":null,\"SheBeiSunShi\":null,\"BjmSheBeiSunShi\":null,\"HcJingShenSunShi\":{\"baoE\":0,\"baoFei\":0},\"HcSanFangTeYue\":{\"baoE\":0,\"baoFei\":0},\"HcXiuLiChang\":{\"baoE\":0,\"baoFei\":0},\"HcXiuLiChangType\":null,\"DaoQiang\":{\"baoE\":0,\"baoFei\":0},\"SanZhe\":{\"baoE\":50000,\"baoFei\":386.96},\"ZiRan\":{\"baoE\":0,\"baoFei\":0}},\"UserInfo\":{\"ForceExpireDate\":\"2019-01-04\",\"BusinessExpireDate\":\"2018-06-30\",\"BusinessStartDate\":\"2019-01-05\",\"ForceStartDate\":\"2019-01-05\",\"VehicleInfo\":\"东风标致DC7204DTA 307轿车//1.997/5/99800.0/2007\",\"AutoMoldCode\":\"BZAAED0054\",\"LicenseNo\":\"冀A5D307\",\"Email\":null,\"HolderIdCard\":\"13010219760907152X\",\"HolderName\":\"陈宝珠\",\"HolderIdType\":1,\"HolderMobile\":\"17612235899\",\"InsuredName\":\"陈宝珠\",\"InsuredIdCard\":\"13010219760907152X\",\"InsuredIdType\":1,\"InsuredMobile\":\"17612235899\"},\"BusinessStatus\":1,\"StatusMessage\":\"获取报价信息成功\"},{\"Item\":{\"BizRate\":0,\"ForceRate\":0,\"BizTotal\":923.17,\"ForceTotal\":950,\"TaxTotal\":400,\"QuoteStatus\":1,\"QuoteResult\":\"报价成功\",\"RepeatSubmitResult\":null,\"HcSheBeiSunshi\":{\"baoE\":0,\"baoFei\":0},\"HcHuoWuZeRen\":{\"baoE\":0,\"baoFei\":0},\"HcFeiYongBuChang\":null,\"BuJiMianJingShenSunSh\":null,\"RateFactor1\":1,\"RateFactor2\":1.15,\"RateFactor3\":1.15,\"RateFactor4\":1,\"TotalRate\":null,\"SheBeis\":null,\"Source\":4,\"BoLi\":{\"baoE\":0,\"baoFei\":0},\"BuJiMianCheSun\":{\"baoE\":0,\"baoFei\":0},\"BuJiMianDaoQiang\":{\"baoE\":0,\"baoFei\":0},\"BuJiMianSanZhe\":{\"baoE\":1,\"baoFei\":120.41},\"BuJiMianChengKe\":{\"baoE\":0,\"baoFei\":0},\"BuJiMianSiJi\":{\"baoE\":0,\"baoFei\":0},\"BuJiMianHuaHen\":{\"baoE\":0,\"baoFei\":0},\"BuJiMianSheShui\":{\"baoE\":0,\"baoFei\":0},\"BuJiMianZiRan\":{\"baoE\":0,\"baoFei\":0},\"SheShui\":{\"baoE\":0,\"baoFei\":0},\"HuaHen\":{\"baoE\":0,\"baoFei\":0},\"SiJi\":{\"baoE\":0,\"baoFei\":0},\"ChengKe\":{\"baoE\":0,\"baoFei\":0},\"CheSun\":{\"baoE\":0,\"baoFei\":0},\"Fybc\":null,\"FybcDays\":null,\"SheBeiSunShi\":null,\"BjmSheBeiSunShi\":null,\"HcJingShenSunShi\":{\"baoE\":0,\"baoFei\":0},\"HcSanFangTeYue\":{\"baoE\":0,\"baoFei\":0},\"HcXiuLiChang\":{\"baoE\":0,\"baoFei\":0},\"HcXiuLiChangType\":null,\"DaoQiang\":{\"baoE\":0,\"baoFei\":0},\"SanZhe\":{\"baoE\":50000,\"baoFei\":802.76},\"ZiRan\":{\"baoE\":0,\"baoFei\":0}},\"UserInfo\":{\"ForceExpireDate\":\"2019-01-04\",\"BusinessExpireDate\":\"2018-06-30\",\"BusinessStartDate\":\"2019-01-05\",\"ForceStartDate\":\"2019-01-05\",\"VehicleInfo\":\"东风标致DC7204DTA 307轿车/东风标致DC7204DTA 307轿车/1.997/5/109800.0/\",\"AutoMoldCode\":\"BZAAED0054\",\"LicenseNo\":\"冀A5D307\",\"Email\":null,\"HolderIdCard\":\"13010219760907152X\",\"HolderName\":\"陈宝珠\",\"HolderIdType\":1,\"HolderMobile\":\"17612235899\",\"InsuredName\":\"陈宝珠\",\"InsuredIdCard\":\"13010219760907152X\",\"InsuredIdType\":1,\"InsuredMobile\":\"17612235899\"},\"BusinessStatus\":1,\"StatusMessage\":\"获取报价信息成功\"},{\"Item\":{\"BizRate\":0,\"ForceRate\":0,\"BizTotal\":445.01,\"ForceTotal\":950,\"TaxTotal\":400,\"QuoteStatus\":1,\"QuoteResult\":\"报价成功\",\"RepeatSubmitResult\":null,\"HcSheBeiSunshi\":{\"baoE\":0,\"baoFei\":0},\"HcHuoWuZeRen\":{\"baoE\":0,\"baoFei\":0},\"HcFeiYongBuChang\":null,\"BuJiMianJingShenSunSh\":null,\"RateFactor1\":1,\"RateFactor2\":0.75,\"RateFactor3\":0.85,\"RateFactor4\":1,\"TotalRate\":null,\"SheBeis\":null,\"Source\":8,\"BoLi\":{\"baoE\":0,\"baoFei\":0},\"BuJiMianCheSun\":{\"baoE\":0,\"baoFei\":0},\"BuJiMianDaoQiang\":{\"baoE\":0,\"baoFei\":0},\"BuJiMianSanZhe\":{\"baoE\":1,\"baoFei\":58.04},\"BuJiMianChengKe\":{\"baoE\":0,\"baoFei\":0},\"BuJiMianSiJi\":{\"baoE\":0,\"baoFei\":0},\"BuJiMianHuaHen\":{\"baoE\":0,\"baoFei\":0},\"BuJiMianSheShui\":{\"baoE\":0,\"baoFei\":0},\"BuJiMianZiRan\":{\"baoE\":0,\"baoFei\":0},\"SheShui\":{\"baoE\":0,\"baoFei\":0},\"HuaHen\":{\"baoE\":0,\"baoFei\":0},\"SiJi\":{\"baoE\":0,\"baoFei\":0},\"ChengKe\":{\"baoE\":0,\"baoFei\":0},\"CheSun\":{\"baoE\":0,\"baoFei\":0},\"Fybc\":null,\"FybcDays\":null,\"SheBeiSunShi\":null,\"BjmSheBeiSunShi\":null,\"HcJingShenSunShi\":{\"baoE\":0,\"baoFei\":0},\"HcSanFangTeYue\":{\"baoE\":0,\"baoFei\":0},\"HcXiuLiChang\":{\"baoE\":0,\"baoFei\":0},\"HcXiuLiChangType\":null,\"DaoQiang\":{\"baoE\":0,\"baoFei\":0},\"SanZhe\":{\"baoE\":50000,\"baoFei\":386.97},\"ZiRan\":{\"baoE\":0,\"baoFei\":0}},\"UserInfo\":{\"ForceExpireDate\":\"2019-01-04\",\"BusinessExpireDate\":\"2018-06-30\",\"BusinessStartDate\":\"2019-01-05\",\"ForceStartDate\":\"2019-01-05\",\"VehicleInfo\":\"东风标致DC7204DTA 307轿车/东风标致DC7204DTA 307轿车三厢 手动档 舒适型 国Ⅳ/1.997/5/99800.0/200709\",\"AutoMoldCode\":\"BZAAED0054\",\"LicenseNo\":\"冀A5D307\",\"Email\":null,\"HolderIdCard\":\"13010219760907152X\",\"HolderName\":\"陈宝珠\",\"HolderIdType\":1,\"HolderMobile\":\"17612235899\",\"InsuredName\":\"陈宝珠\",\"InsuredIdCard\":\"13010219760907152X\",\"InsuredIdType\":1,\"InsuredMobile\":\"17612235899\"},\"BusinessStatus\":1,\"StatusMessage\":\"获取报价信息成功\"},{\"Item\":{\"BizRate\":0,\"ForceRate\":0,\"BizTotal\":659.66,\"ForceTotal\":950,\"TaxTotal\":400,\"QuoteStatus\":1,\"QuoteResult\":\"报价成功\",\"RepeatSubmitResult\":null,\"HcSheBeiSunshi\":{\"baoE\":0,\"baoFei\":0},\"HcHuoWuZeRen\":{\"baoE\":0,\"baoFei\":0},\"HcFeiYongBuChang\":null,\"BuJiMianJingShenSunSh\":null,\"RateFactor1\":1,\"RateFactor2\":0.9,\"RateFactor3\":1.05,\"RateFactor4\":1,\"TotalRate\":null,\"SheBeis\":null,\"Source\":2,\"BoLi\":{\"baoE\":0,\"baoFei\":0},\"BuJiMianCheSun\":{\"baoE\":0,\"baoFei\":0},\"BuJiMianDaoQiang\":{\"baoE\":0,\"baoFei\":0},\"BuJiMianSanZhe\":{\"baoE\":1,\"baoFei\":86.04},\"BuJiMianChengKe\":{\"baoE\":0,\"baoFei\":0},\"BuJiMianSiJi\":{\"baoE\":0,\"baoFei\":0},\"BuJiMianHuaHen\":{\"baoE\":0,\"baoFei\":0},\"BuJiMianSheShui\":{\"baoE\":0,\"baoFei\":0},\"BuJiMianZiRan\":{\"baoE\":0,\"baoFei\":0},\"SheShui\":{\"baoE\":0,\"baoFei\":0},\"HuaHen\":{\"baoE\":0,\"baoFei\":0},\"SiJi\":{\"baoE\":0,\"baoFei\":0},\"ChengKe\":{\"baoE\":0,\"baoFei\":0},\"CheSun\":{\"baoE\":0,\"baoFei\":0},\"Fybc\":null,\"FybcDays\":null,\"SheBeiSunShi\":null,\"BjmSheBeiSunShi\":null,\"HcJingShenSunShi\":{\"baoE\":0,\"baoFei\":0},\"HcSanFangTeYue\":{\"baoE\":0,\"baoFei\":0},\"HcXiuLiChang\":{\"baoE\":0,\"baoFei\":0},\"HcXiuLiChangType\":null,\"DaoQiang\":{\"baoE\":0,\"baoFei\":0},\"SanZhe\":{\"baoE\":50000,\"baoFei\":573.62},\"ZiRan\":{\"baoE\":0,\"baoFei\":0}},\"UserInfo\":{\"ForceExpireDate\":\"2019-01-04\",\"BusinessExpireDate\":\"2018-06-30\",\"BusinessStartDate\":\"2019-01-05\",\"ForceStartDate\":\"2019-01-05\",\"VehicleInfo\":\"东风标致DC7204DTA 307轿车/东风标致DC7204DTA 307轿车1.997三厢 手动档 舒适型 国Ⅳ/1.997/5/109800.0/2007\",\"AutoMoldCode\":\"BZD1076DFB\",\"LicenseNo\":\"冀A5D307\",\"Email\":null,\"HolderIdCard\":\"\",\"HolderName\":\"\",\"HolderIdType\":1,\"HolderMobile\":\"\",\"InsuredName\":\"陈宝珠\",\"InsuredIdCard\":\"13010219760907152X\",\"InsuredIdType\":1,\"InsuredMobile\":\"17612235899\"},\"BusinessStatus\":1,\"StatusMessage\":\"获取报价信息成功\"}]",
    "lastInsuranceJson": "{\"BusinessStatus\":1,\"SaveQuote\":{\"BoLi\":0,\"BuJiMianCheSun\":0,\"BuJiMianChengKe\":0,\"BuJiMianDaoQiang\":0,\"BuJiMianHuaHen\":0,\"BuJiMianJingShenSunShi\":0,\"BuJiMianSanZhe\":1,\"BuJiMianSheShui\":0,\"BuJiMianSiJi\":1,\"BuJiMianZiRan\":0,\"CheSun\":0,\"ChengKe\":0,\"DaoQiang\":0,\"HcJingShenSunShi\":0,\"HcSanFangTeYue\":0,\"HuaHen\":0,\"SanZhe\":500000,\"SheShui\":0,\"SiJi\":10000,\"Source\":4,\"ZiRan\":0},\"StatusMessage\":\"续保成功\",\"UserInfo\":{\"BusinessExpireDate\":\"2018-08-17\",\"CarUsedType\":1,\"CarVin\":\"LSYBCAAA1BK040463\",\"CityCode\":1,\"ClauseType\":2,\"CredentislasNum\":\"120225197206124170\",\"EngineNo\":\"061331\",\"ForceExpireDate\":\"2018-08-17\",\"FuelType\":0,\"HolderIdCard\":\"120225197206124170\",\"HolderIdType\":1,\"HolderMobile\":\"\",\"IdType\":1,\"InsuredIdCard\":\"120225197206124170\",\"InsuredIdType\":1,\"InsuredMobile\":\"\",\"InsuredName\":\"李成云\",\"IsPublic\":2,\"LicenseColor\":1,\"LicenseNo\":\"京AK3401\",\"LicenseOwner\":\"李成云\",\"ModleName\":\"金杯SY6513X2S1BH轻型客车\",\"NextBusinessStartDate\":\"2019-01-05\",\"NextForceStartDate\":\"2019-01-05\",\"PostedName\":\"李成云\",\"ProofType\":0,\"PurchasePrice\":58800,\"RateFactor1\":0,\"RateFactor2\":0,\"RateFactor3\":0,\"RateFactor4\":0,\"RegisterDate\":\"2011-07-13\",\"RunRegion\":0,\"SeatCount\":9,\"sealManId\":\"ec68e3c38cba479eba40541705ffbcc9\",\"plateNumId\":\"81269\"}}",
    "salesman": null,
    "status": null,
    "typeName": null,
    "contactWay": null,
    "ownerType": null,
    "brandModel": "金杯SY6513X2S1BH轻型客车",
    "slaemId": null,
    "docInfo": "120225197206124170",
    "baojiaStatus": null,
    "preInsurance": "人保",
    "businessExpireDate": "2019-01-05",
    "forceExpireDate": "2019-01-05",
    "priceContents": [
      {
        "priceOrg": "太平洋",
        "priceOrgCode": 1,
        "priceResult": "￥1795.00",
        "buyStatus": null,
        "party": {
          "insuredName": "陈宝珠",
          "insuredIdCard": "13010219760907152X",
          "insuredIdType": 1,
          "insuredMobile": "17612235899",
          "holderName": "陈宝珠",
          "holderIdCard": "13010219760907152X",
          "holderIdType": 1,
          "holderMobile": "17612235899",
          "email": null
        },
        "forceTotal": "￥950.00",
        "taxTotal": "￥400.00",
        "businessPrice": {
          "businessTotal": "￥445.00",
          "details": [
            {
              "name": "第三者责任险",
              "detailPrice": "￥386.96",
              "buJiMianPrice": "58.04"
            }
          ]
        }
      },
      {
        "priceOrg": "人保",
        "priceOrgCode": 4,
        "priceResult": "￥2273.17",
        "buyStatus": null,
        "party": {
          "insuredName": "陈宝珠",
          "insuredIdCard": "13010219760907152X",
          "insuredIdType": 1,
          "insuredMobile": "17612235899",
          "holderName": "陈宝珠",
          "holderIdCard": "13010219760907152X",
          "holderIdType": 1,
          "holderMobile": "17612235899",
          "email": null
        },
        "forceTotal": "￥950.00",
        "taxTotal": "￥400.00",
        "businessPrice": {
          "businessTotal": "￥923.17",
          "details": [
            {
              "name": "第三者责任险",
              "detailPrice": "￥802.76",
              "buJiMianPrice": "120.41"
            }
          ]
        }
      },
      {
        "priceOrg": "国寿财",
        "priceOrgCode": 8,
        "priceResult": "￥1795.01",
        "buyStatus": null,
        "party": {
          "insuredName": "陈宝珠",
          "insuredIdCard": "13010219760907152X",
          "insuredIdType": 1,
          "insuredMobile": "17612235899",
          "holderName": "陈宝珠",
          "holderIdCard": "13010219760907152X",
          "holderIdType": 1,
          "holderMobile": "17612235899",
          "email": null
        },
        "forceTotal": "￥950.00",
        "taxTotal": "￥400.00",
        "businessPrice": {
          "businessTotal": "￥445.01",
          "details": [
            {
              "name": "第三者责任险",
              "detailPrice": "￥386.97",
              "buJiMianPrice": "58.04"
            }
          ]
        }
      },
      {
        "priceOrg": "平安",
        "priceOrgCode": 2,
        "priceResult": "￥2009.66",
        "buyStatus": null,
        "party": {
          "insuredName": "陈宝珠",
          "insuredIdCard": "13010219760907152X",
          "insuredIdType": 1,
          "insuredMobile": "17612235899",
          "holderName": "",
          "holderIdCard": "",
          "holderIdType": 1,
          "holderMobile": "",
          "email": null
        },
        "forceTotal": "￥950.00",
        "taxTotal": "￥400.00",
        "businessPrice": {
          "businessTotal": "￥659.66",
          "details": [
            {
              "name": "第三者责任险",
              "detailPrice": "￥573.62",
              "buJiMianPrice": "86.04"
            }
          ]
        }
      }
    ]
  },
  "ok": true
};
