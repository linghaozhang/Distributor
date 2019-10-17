/*
 JSBridge
 */
export const JSBridge =function (params) {
  let Map = params;
  if (typeof Map === 'string') {
    Map = {code: params}
  }

  return window.android && window.android.jsCallJava(JSON.stringify(Map));
};

/*
 JS通用校验规则,包含身份证,手机号,邮箱等
 */
export default {
  /**
   * @method cardIdValid 身份证、户口本校验
   * @param  code [输入参数]
   * @return {Boolean}     [返回值]
   */
  cardIdValid(code) {
    let city = {
      11: '北京',
      12: '天津',
      13: '河北',
      14: '山西',
      15: '内蒙古',
      21: '辽宁',
      22: '吉林',
      23: '黑龙江',
      31: '上海',
      32: '江苏',
      33: '浙江',
      34: '安徽',
      35: '福建',
      36: '江西',
      37: '山东',
      41: '河南',
      42: '湖北 ',
      43: '湖南',
      44: '广东',
      45: '广西',
      46: '海南',
      50: '重庆',
      51: '四川',
      52: '贵州',
      53: '云南',
      54: '西藏 ',
      61: '陕西',
      62: '甘肃',
      63: '青海',
      64: '宁夏',
      65: '新疆',
      71: '台湾',
      81: '香港',
      82: '澳门',
      91: '国外 '
    };
    let pass = true;
    let reg = /^[1-9]\d{7}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])\d{3}$|^[1-9]\d{5}[1-9]\d{3}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])\d{3}([0-9]|X)$/;
    if (!code || !reg.test(code)) {
      pass = false;
    } else if (!city[code.substr(0, 2)]) {
      pass = false;
    } else {
      //18位身份证需要验证最后一位校验位
      if (code.length == 18) {
        code = code.split('');
        //∑(ai×Wi)(mod 11)
        //加权因子
        var factor = [7, 9, 10, 5, 8, 4, 2, 1, 6, 3, 7, 9, 10, 5, 8, 4, 2];
        //校验位
        var parity = [1, 0, 'X', 9, 8, 7, 6, 5, 4, 3, 2];
        var sum = 0;
        var ai = 0;
        var wi = 0;
        for (var i = 0; i < 17; i++) {
          ai = code[i];
          wi = factor[i];
          sum += ai * wi;
        }
        // let last = parity[sum % 11];
        if (parity[sum % 11] != code[17]) {
          pass = false;
        }
      }
    }
    return pass;
  },
  /**
   * @method cardGenderValid 对身份证的性别校验
   * @param  {String} gender [输入参数] 性别
   * @param  {String} cardId [输入参数] 身份证
   * @return {Boolean}     [返回值]
   */
  cardGenderValid(gender, cardId) {
    let pass = false;
    let sexFlag = 0;
    if (gender == "男") {
      sexFlag = 1;
    } else {
      sexFlag = 0;
    }
    if (cardId.length == 15 && sexFlag == cardId.substring(14, 15) % 2) {
      pass = true;
    } else if (cardId.length == 18 && sexFlag == cardId.substring(14, 17) % 2) {
      pass = true;
    } else {
      //不是15或者18,null
      pass = false;
    }
    return pass;
  },
  /**
   * @method cardBirthValid 对身份证中生日校验
   * @param  {String} birthDay [输入参数] 性别
   * @param  {String} cardId [输入参数] 身份证
   * @return {Boolean}     [返回值]
   */
  cardBirthValid(birthDay, cardId) {
    let pass = false;
    let realBirthDay = "";
    if (cardId.length == 15) {
      realBirthDay = cardId.substring(6, 12);
      realBirthDay = "19" + realBirthDay;
      realBirthDay = realBirthDay.substring(0, 4) + "-" + realBirthDay.substring(4, 6) + "-" + realBirthDay.substring(6);
      pass = birthDay == realBirthDay;
      return pass;
    } else if (cardId.length == 18) {
      realBirthDay = cardId.substring(6, 14);
      realBirthDay = realBirthDay.substring(0, 4) + "-" + realBirthDay.substring(4, 6) + "-" + realBirthDay.substring(6);
      pass = birthDay == realBirthDay;
      return pass;
    }
    return pass;
  },
  /**
   * @method passportValid 护照、台湾居民往来大陆通行证校验
   长度小于等于15位 && （纯数字 || 数字加字母）
   * @param  {String} value [输入参数]
   * @return {Boolean}     [返回值]
   */
  passportValid(value) {
    let patrn = /^[0-9]{1,15}$/;
    let reg = /^(?![^a-zA-Z]+$)(?!\D+$).{1,15}$/;
    return patrn.test(value) || reg.test(value);
  },
  /**
   * @method passportValid 其他证件类型校验 --- 长度小于等于15位 && 数字加字母
   * @param  {String} value [输入参数]
   * @return {Boolean}     [返回值]
   */
  otherCardValid(value) {
    return /^(?![^a-zA-Z]+$)(?!\D+$).{1,15}$/.test(value);
  },
  /**
   * @method phoneValid 手机号码校验
   * @param value [输入参数]
   * @return {Boolean}     [返回值]
   */
  phoneValid(value) {
    return /^1[3456789]\d{9}$/.test(value);
  },
  /**
   *   @method mobileValid 手机号或者电话号码校验
   *   @param value [输入参数]
   *   @return {Boolean}     [返回值]
   */
  mobileValid(value) {
    let mobPhoneReg = /^1[3456789]\d{9}$/;
    let telPhoneReg = /^0\d{2,3}?\d{7,8}$/;
    let pass = false;
    if (!mobPhoneReg.test(value) && !telPhoneReg.test(value)) {
      pass = false;
    } else {
      pass = true;
    }
    return pass;
  },
  /**
   * @method nameValid 姓名校验 --- 2-15中文汉字 || 2-15位英文字母可含空格
   * @param  {String} value [输入参数]
   * @return {Boolean}     [返回值]
   */
  nameValid(value) {
    if (!value) {
      return true
    }
    return /^[^\u0000-\u00FF]{2,15}$|^[a-zA-Z\s]{2,15}$/.test(value);
  },
  /**
   * @method bankValid surname或拼音、forename或拼音 -- 最大200字符
   * @param  {String} value [输入参数]
   * @return {Boolean}     [返回值]
   */
  taxNameValid(value) {
    return /^[a-zA-Z\s][a-zA-Z\s]{1,200}$/.test(value);
  },
  /**
   * @method emailValid 邮箱校验
   * @param  {String} value [输入参数]
   * @return {Boolean}     [返回值]
   */
  emailValid(value) {
    if (value && value.length <= 100) {
      return /^\w+((-\w+)|(\.\w+))*@[A-Za-z0-9]+((\.|-)[A-Za-z0-9]+)*\.[A-Za-z0-9]+$/.test(value);
    }
    return false;
  },
  /**
   * @method addressValid 详细地址校验
   * @param value [输入参数]
   * @return {Boolean}     [返回值]
   */
  addressValid(value) {
    return /([\u4E00-\u9FA5]([a-zA-Z0-9]*)){3,}.*/.test(value);
  },
  /**
   * @method isZipCode 邮编校验
   * @param value [输入参数]
   * @return {Boolean}     [返回值]
   */
  isZipCode(value) {
    return /^[0-9]{6}$/.test(value);
  },
  /**
   * @method bankValid 银行账户的校验
   * @param  {String} value [输入参数]
   * @return {Boolean}     [返回值]
   */
  bankValid(value) {
    let bBool = false;
    let reg = new RegExp(/^[0-9]+$/)
    if (reg.test(value)) {
      if (value.length == 16 || value.length == 17 || value.length == 18 || value.length == 19) {
        bBool = true
      }
    }
    return bBool;
  },
  /**
   * @method onlyEnglishValid 纯英文
   * @param  {String} value [输入参数]
   * @return {Boolean}     [返回值]
   */
  onlyEnglishValid(value) {
    return /[a-zA-Z\s][a-zA-Z\s]/.test(value)
  },
  /**
   * @method onlyChinaValid 纯中文
   * @param  {String} value [输入参数]
   * @return {Boolean}     [返回值]
   */
  onlyChinaValid(value) {
    return /[\u4e00-\u9fa5]/.test(value)
  },
  /**
   * [isNumber description]  只能是数字
   * @param   value [输入参数]
   * @return {Boolean}       [返回值]
   */
  isNumber(value) {
    if (value) {
      value = value.replace(/\s+/g, "");
      return /^(\s*)\d*$/.test(value);
    }
    return false;
  },
  /**
   * @method isEmpty 非空判断
   * @param {*} value [输入参数]
   * @return {Boolean}     [返回值]
   */
  isEmpty(value) {
    let isTrue = false;
    if (value !== null && value !== undefined && value != "" && value.replace(/\s+/g, "").length > 0) {
      isTrue = true;
    }
    return isTrue;
  },
  /**
   * @method isEmptyObject 判断空json对象
   * @param {Object} value [输入参数]
   * @return {Boolean}     [返回值]
   */
  isEmptyObject(value) {
    let t;
    for (t in value)
      return !1;
    return !0
  },
  isCarNO(value) {
    let reg = /([京津沪渝冀豫云辽黑湘皖鲁新苏浙赣鄂桂甘晋蒙陕吉闽贵粤青藏川宁琼使领A-Z]{1}[A-Z]{1}(([0-9]{5}[DF])|([DF]([A-HJ-NP-Z0-9])[0-9]{4})))|([京津沪渝冀豫云辽黑湘皖鲁新苏浙赣鄂桂甘晋蒙陕吉闽贵粤青藏川宁琼使领A-Z]{1}[A-Z]{1}[A-HJ-NP-Z0-9]{4}[A-HJ-NP-Z0-9挂学警港澳]{1})/;
    return reg.test(value)
  },
  isEngNum(value) {
    let reg = /^[0-9A-Za-z]+$/;
    return reg.test(value);
  },
  isVinNum(value) {
    let reg = /^[A-Z_0-9-]{0,50}$/;
    return reg.test(value);
  },
  transformInsure(ins) {
    switch (ins) {
      case 'BjmSheBeiSunShi':
        return '不计免设备损失';
      // case 'BoLi':
      //   return '玻璃单独破碎险';
      // case 'BuJiMianCheSun':
      //   return '不计免车辆损失险';
      case 'BuJiMianChengKe':
        return '不计免乘客座位责任险';
      case 'BuJiMianDaoQiang':
        return '不计免全车盗抢险';
      case 'BuJiMianHuaHen':
        return '不计免划痕险';
      case 'BuJiMianJingShenSunSh':
        return '不计免精神损失';
      // case 'BuJiMianSanZhe':
      //   return '不计免第三者责任险';
      case 'BuJiMianSheShui':
        return '不计免涉水行驶损失险';
      case 'BuJiMianSiJi':
        return '不计免司机座位责任险';
      case 'BuJiMianZiRan':
        return '不计免自燃损失险';
      // case 'CheSun':
      //   return '车辆损失险';
      // case 'ChengKe':
      //   return '乘客座位责任险';
      case 'DaoQiang':
        return '全车盗抢险';
      case 'HcHuoWuZeRen':
        return '货车设备损失险';
      case 'HcJingShenSunShi':
        return '精神损失抚慰金责任险';
      case 'HcSanFangTeYue':
        return '机动车损失保险无法找到第三方特约险';
      case 'HcSheBeiSunshi':
        return '新增设备损失险';
      case 'HcXiuLiChang':
        return '指定修理厂险';
      case 'HuaHen':
        return '车身划痕损失险';
    }
  },
  transformSource(Source) {
    switch (Source) {
      case 1:
        return '太平洋';
      case 2:
        return '平安';
      case 4:
        return '人保';
      case 8:
        return '国寿财';
    }
  },
  mapQuoteToArr(SaveQuote, SaveQuoteMap) {
    let arr = [];
    if (!SaveQuote) {
      return arr
    }
    for (let i in SaveQuote) {
      //过滤不计免赔字段
      if (SaveQuoteMap[i] && SaveQuote[i]) {
        arr.push({
          type: SaveQuoteMap[i].desc,
          val: SaveQuote[i] > 1 ? (Number(SaveQuote[i]).toFixed(2)) + '元' : '投保',
          bjm: SaveQuote[SaveQuoteMap[i].bjm] ? '（不计免赔）' : '',
        })
      }
    }
    return arr
  },
  mapBizQuoteToArr(SaveQuote, SaveQuoteMap) {
    let arr = [];
    if (!SaveQuote) {
      return arr
    }
    SaveQuote.map(i => {
      //过滤不计免赔字段
      if (SaveQuoteMap[i.name] && i.name) {
        let quoteItem = ''
        quoteItem = {
          type: SaveQuoteMap[i.name].desc,
          baoFei: i.baoFei,
          bjm: SaveQuoteMap[i.name].bjm ? '不计免赔' : '',
          bjmBaoFei: '0',
        };
        //不计免赔金额
        SaveQuote.map(j => {
          if (SaveQuoteMap[i.name].bjm == j.name) {
            quoteItem.bjmBaoFei = j.baoFei;
          }
        });
        arr.push(quoteItem);
      }
    });
    return arr
  },
  transformOwnerDetail(OwnerDetail) {
    const {data} = OwnerDetail;
    let UserInfo = {};
    let SaveQuote = {};
    if (data.lastInsuranceJson) {
      SaveQuote = {
        Source: data.preInsurance,
        ...JSON.parse(data.lastInsuranceJson).SaveQuote
      };
    }
    UserInfo.LicenseNo = data.plateNum;
    UserInfo.ModleName = data.brandModel;
    UserInfo.ModleName = data.brandModel;
    UserInfo.CarVin = data.vinNo;
    UserInfo.EngineNo = data.engineNum;
    UserInfo.RegisterDate = data.initialDate;
    UserInfo.LicenseOwner = data.ownerName;
    UserInfo.ForceExpireDate = data.clivtaExpDate;
    UserInfo.BusinessExpireDate = data.expDate;
    UserInfo.customerName = OwnerDetail.customerName;
    UserInfo.contactWay = data.contactWay;
    UserInfo.remark = data.remark;
    UserInfo.docInfo = data.docInfo;
    return {
      data: {
        UserInfo,
        SaveQuote
      }
    }
  },
}
