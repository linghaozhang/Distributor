import QuotationResult from '@page/QuotationRecord/QuotationResult'
import QueryDetails from '@page/Quote/QueryDetails'
import AddUser from '@page/Quote/AddUser'
import QuoteFail from '@page/QuotationRecord/QuoteFail'
import QuoteSuccess from '@page/QuotationRecord/QuoteSuccess'
import QuoteSuccessDetail from '@page/QuotationRecord/QuoteSuccessDetail'
import ChooseInsurance from '@page/Quote/ChooseInsurance'
import CheckCar from '@page/Quote/CheckCar'
import Contacts from '@page/Quote/Contacts'
import QuoteComp from '@page/Quote/QuoteComp'
import TrackingRecord from '@page/OwnerList/TrackingRecord'
import AddRecord from '@page/OwnerList/AddRecord'
import ShareQuoteResult from '@page/QuotationRecord/ShareQuoteResult'

export const routes = [
  {
    path: '/',
    redirect: { name: 'queryDetails' }
  },
  //报价结果
  {
    path: '/QuotationRecord/QuotationResult',
    name:'quotationResult',
    component: QuotationResult,
  },
  //报价详情
  {
    path: '/Quote/QueryDetails',
    name:'queryDetails',
    component: QueryDetails,
  },
  //添加客户资料
  {
    path: '/Quote/AddUser',
    name:'addUser',
    component: AddUser,
  },
  //报价失败
  {
    path: '/QuotationRecord/QuoteFail',
    name:'quoteFail',
    component: QuoteFail,
  },
  //报价成功
  {
    path: '/QuotationRecord/QuoteSuccess',
    name:'quoteSuccess',
    component: QuoteSuccess,
  },
  //报价成功详情页
  {
    path: '/QuotationRecord/QuoteSuccessDetail',
    name:'quoteSuccessDetail',
    component: QuoteSuccessDetail,
  },
  //选择险种
  {
    path:'/Quote/ChooseInsurance',
    name:'chooseInsurance',
    component:ChooseInsurance,
  },
  // 车辆校验
  {
    path:'/Quote/CheckCar',
    name:'checkCar',
    component:CheckCar,
  },
  // 联系人
  {
    path:'/Quote/Contacts',
    name:'contacts',
    component:Contacts,
  },
  // 选择报价公司
  {
    path:'/Quote/QuoteComp',
    name:'quoteComp',
    component:QuoteComp,
  },
  // 跟踪记录
  {
    path:'/OwnerList/TrackingRecord',
    name:'trackingRecord',
    component:TrackingRecord,
  },
  // 添加跟踪记录
  {
    path:'/OwnerList/AddRecord',
    name:'addRecord',
    component:AddRecord,
  },
  // 分享报价结果
  {
    path:'/QuotationRecord/ShareQuoteResult',
    name:'shareQuoteResult',
    component:ShareQuoteResult,
  }
];
