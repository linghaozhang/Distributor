// export const API_PREFIX = 'http://221.239.111.146:50041';
export const API_PREFIX = 'http://ncc.ebizyun.com.cn:50021';

export default {
  // 车型校验
  GET_BH_VEHICLE_INFO:'/bihu/getNewVehicleInfo',
  //车辆报价信息
  GET_BH_QUOTE_RESULT_INFO:'/bihu/doPrecisePrice',
  //接口2
  GET_BH_POST_PRECISE:'/bihu/getPostPrecisePrice',
  //购买接口
  GET_BH_BUY:'/salesAmount/insertOrUpdate',
  //判断车是否在顾问下
  CHECK_COUNSELOR_QUERY:'/judge/counselor/query',
  //判断车是否在库
  CHECK_CAR_OWNER_EXIST:'/carOwner/checkExist',
  //车入库
  INSERT_CAR_OWNER:'/carOwner/insertCarOwner',
  // 提交报价单
  SUBMIT_QUOTE_ORDER_PRICE:'/renewal/manage/operation/price',
  // 战败接口
  RENEWAL_MANAGE_FAILED:'/renewal/manage/failed',
  //根据车主ID查询沟通记录
  RENEWAL_MANAGE_RECORD_QUERY:'/renewal/manage/recordQuery',
  //添加沟通记录
  RENEWAL_INSERT_RECORD:'/carOwner/insertRecord',
  // 更新沟通记录
  UPDATE_CAR_OWNER_INFO:'/carOwner/updateCarOwner',
  //通过报价单id获取报价单详情
  GET_PRICE_DETAIL_BY_ID:'/OwnerPriceTibController/query'
};
