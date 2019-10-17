<template>
  <div class="quoteSuccessDetail">
    <div>
      <div class="title">
        <cell
          :title="(QquoteComp.filter(i=>i.id===String(quoteSource))[0]?QquoteComp.filter(i=>i.id===String(quoteSource))[0].name:'')"
          :value="'￥'+Number(totalPrice).toFixed(2)"
          value-align="right"
          class="quoteResult-insurance-item"
        >
          <img slot="icon"
               :src="(QquoteComp.filter(i=>i.id===String(quoteSource))[0].img)"
               width="16"
               style="margin:0.015rem 0.08rem 0 0;"
          />
        </cell>
      </div>
      <div class="quoteSuccess-vehicleInfo-content">
        <img src="./../../assets/fail.png" class="fail-icon" v-if="missionFail">
        <div class="quoteSuccess-title scrm-title-prefix">{{LicenseNo}}</div>
        <div class="quoteSuccess-vehicleInfo-item">
          <div class="quoteSuccess-vehicleInfo-item-label">
            车&nbsp;&nbsp;架&nbsp;&nbsp;号
          </div>
          <div class="quoteSuccess-vehicleInfo-item-desc">
            {{CarVin}}
          </div>
        </div>
        <div class="quoteSuccess-vehicleInfo-item">
          <div class="quoteSuccess-vehicleInfo-item-label">
            品牌型号
          </div>
          <div class="quoteSuccess-vehicleInfo-item-desc">
            {{ModleName}}
          </div>
        </div>
        <div class="quoteSuccess-vehicleInfo-item">
          <div class="quoteSuccess-vehicleInfo-item-label">
            注册日期
          </div>
          <div class="quoteSuccess-vehicleInfo-item-desc">
            {{RegisterDate}}
          </div>
        </div>
        <div class="quoteSuccess-vehicleInfo-item">
          <div class="quoteSuccess-vehicleInfo-item-label">
            车型校验
          </div>
          <div class="quoteSuccess-vehicleInfo-item-desc">
            {{carType}}
          </div>
        </div>
      </div>
      <div class="quoteSuccess-insurance">
        <cell title="交强险" :value="'￥'+Number(ForceTotal).toFixed(2)"></cell>
        <cell title="车船险" :value="'￥'+Number(TaxTotal).toFixed(2)"></cell>
        <cell title="商业险"
              :value="'￥'+Number(BizTotal).toFixed(2)"
              @click.native="showDetail=!showDetail"
              is-link
              :border-intent="false"
              style="padding-right: 0.14rem;"
              :arrow-direction="showDetail ? 'up' : 'down'"
        >
        </cell>
        <div v-show="showDetail" class="commerce-insurance-detail">
          <div class="commerce-insurance-detail-item item-line" v-for="i in quoteArr">
            <div>
              <span class="detail-title">{{i.type}}</span>
              <span class="detail-value">￥{{Number(i.baoFei).toFixed(2)}}</span>
            </div>
            <span class="detail-remark" v-show="i.bjm!=''">{{i.bjm}} | {{Number(i.bjmBaoFei).toFixed(2)}}元</span>
          </div>
        </div>
        <cell title="保费总额"
              :value="'￥'+Number(totalPrice).toFixed(2)"
              class="quoteSuccess-insurance-sum"
        ></cell>
      </div>
      <div class="quoteSuccess-userInfo">
        <cell title="关系人信息"
              @click.native="showUserInfo"
              is-link
              :border-intent="false">
        </cell>
      </div>
    </div>
    <div v-transfer-dom v-show="UserInfo">
      <x-dialog v-model="UserInfo"
                class="dialog-userInfo"
                hide-on-blur
      >
        <div class="dialog-title">关系人信息</div>
        <div class="dialog-content" style="height: 3.97rem;overflow:scroll;-webkit-overflow-scrolling:touch;">
          <div class="dialog-content-card">
            <div class="dialog-content-card-tit scrm-title-prefix">车主信息</div>
            <group>
              <cell
                title="车主姓名"
                :value="CarOwnersName"
                text-align="right"
                placeholder-align="right"
              ></cell>
              <cell
                title="证件类型"
                :value="(IdCardOptions.filter(i=>i.value===String(OwnerIdCardType))[0]?IdCardOptions.filter(i=>i.value===String(OwnerIdCardType))[0].name:'')"
                text-align="right"
                placeholder-align="right"
              ></cell>
              <cell
                title="证件号码"
                :value="IdCard"
                text-align="right"
                placeholder-align="right"
              ></cell>
            </group>
          </div>
          <div class="dialog-content-card">
            <div class="dialog-content-card-tit scrm-title-prefix">被保人同车主</div>
            <group>
              <cell
                title="被保人姓名"
                :value="InsuredName"
                text-align="right"
                placeholder-align="right"
              ></cell>
              <cell
                title="证件类型"
                :value="(IdCardOptions.filter(i=>i.value===String(InsuredIdType))[0]?IdCardOptions.filter(i=>i.value===String(InsuredIdType))[0].name:'')"
                text-align="right"
                placeholder-align="right"
              ></cell>
              <cell
                title="证件号码"
                :value="InsuredIdCard"
                text-align="right"
                placeholder-align="right"
              ></cell>
              <cell
                title="手机号"
                :value="InsuredMobile"
                text-align="right"
                placeholder-align="right"
              ></cell>
              <cell
                title="邮箱地址"
                :value="InsuredEmail"
                text-align="right"
                placeholder-align="right"
              ></cell>
            </group>
          </div>

          <div class="dialog-content-card">
            <div class="dialog-content-card-tit scrm-title-prefix">投保人同被保人</div>
            <group>
              <cell
                title="投保人姓名"
                :value="HolderName"
                text-align="right"
                placeholder-align="right"
              ></cell>
              <cell
                title="证件类型"
                :value="(IdCardOptions.filter(i=>i.value===String(HolderIdType))[0]?IdCardOptions.filter(i=>i.value===String(HolderIdType))[0].name:'')"
                text-align="right"
                placeholder-align="right"
              ></cell>
              <cell
                title="证件号码"
                :value="HolderIdCard"
                text-align="right"
                placeholder-align="right"
              ></cell>
              <cell
                title="手机号"
                :value="HolderMobile"
                text-align="right"
                placeholder-align="right"
              ></cell>
              <cell
                title="邮箱地址"
                :value="HolderEmail"
                text-align="right"
                placeholder-align="right"
              ></cell>
            </group>
          </div>
        </div>
      </x-dialog>
    </div>
    <x-button class="scrm-btn" @click.native="quoteRecord">查看报价记录</x-button>
  </div>
</template>
<script>
  import {
    Card,
    Cell,
    CheckIcon,
    Confirm,
    Divider,
    Flexbox,
    FlexboxItem,
    Group,
    Search,
    TransferDomDirective as TransferDom,
    XButton,
    XDialog,
    XInput
  } from 'vux'
  import {IdCardOptions, QquoteComp, SaveQuoteMap} from "@constants/config";
  import util,{JSBridge} from '@util';

  export default {
    name: "quoteFail",
    directives: {
      TransferDom
    },
    components: {
      Card,
      Divider,
      Search,
      Group,
      Cell,
      XInput,
      CheckIcon,
      XButton,
      Flexbox,
      FlexboxItem,
      Confirm,
      XDialog
    },
    data() {
      const {params} = this.$route;
      return {
        routeParams: this.$route.params,
        showDetail: false,
        UserInfo: false,
        //车辆信息
        carType: params.carType, //车型校验
        LicenseNo: params.LicenseNo, //车牌号
        CarVin: params.CarVin, //车架号
        ModleName: params.ModleName, //品牌型号
        RegisterDate: params.RegisterDate, //注册日期
        QquoteComp: QquoteComp,
        //保险信息
        quoteSource: params.quoteSource, //保险公司枚举值
        BizTotal: params.item.BizTotal, //商业险
        ForceTotal: params.item.ForceTotal, //交强险
        TaxTotal: params.item.TaxTotal, //车船险
        totalPrice: params.item.BizTotal + params.item.ForceTotal + params.item.TaxTotal, //报价金额
        quoteArr: [],  //商业险子项

        isSameHolder: '1',
        //车主
        IdCardOptions: IdCardOptions, //证件类型
        CarOwnersName: params.LicenseOwner,//车主姓名
        IdCard: params.CredentislasNum,//车主证件号
        OwnerIdCardType: [(params.IdType || '') + ''],//车主证件类型
        //被保人
        InsuredName: params.InsuredName,//被保人姓名
        InsuredMobile: params.InsuredMobile,//被保人手机
        InsuredEmail: params.InsuredEmail,//被保人邮箱
        InsuredIdCard: params.InsuredIdCard,//被保人证件号
        InsuredIdType: [(params.InsuredIdType || '') + ''],//被保人证件类型
        // 投保人
        HolderName: params.PostedName,//投保人姓名
        HolderIdType: [(params.HolderIdType || '') + ''],//投保人证件类型
        HolderIdCard: params.HolderIdCard,//投保人证件号
        HolderMobile: params.HolderMobile,//投保人手机号
        HolderEmail: params.HolderEmail,//投保人邮箱
        missionFail:params.missionFail||false
      }
    },
    activated() {
      JSBridge({code:'setTitle',title:'报价详情'});
      if (!Object.keys(this.$route.params).length) {
        return false
      }
      const {params} = this.$route;
      this.routeParams = this.$route.params;
      this.carType = params.carType;
      this.LicenseNo = params.LicenseNo;
      this.CarVin = params.CarVin;
      this.ModleName = params.ModleName;
      this.RegisterDate = params.RegisterDate;
      this.quoteSource = params.quoteSource;
      this.BizTotal = params.item.BizTotal;
      this.ForceTotal = params.item.ForceTotal;
      this.TaxTotal = params.item.TaxTotal;
      this.totalPrice = params.item.BizTotal + params.item.ForceTotal + params.item.TaxTotal;
      this.CarOwnersName = params.LicenseOwner;
      this.IdCard = params.CredentislasNum;
      this.InsuredName = params.InsuredName;
      this.InsuredMobile = params.InsuredMobile;
      this.InsuredEmail = params.InsuredEmail;
      this.InsuredIdCard = params.InsuredIdCard;
      this.HolderName = params.PostedName;
      this.HolderIdCard = params.HolderIdCard;
      this.HolderMobile = params.HolderMobile;
      this.HolderEmail = params.HolderEmail;
      this.OwnerIdCardType = [(params.IdType || '') + ''];
      this.InsuredIdType = [(params.InsuredIdType || '') + ''];
      this.HolderIdType = [(params.HolderIdType || '') + ''];
      //商业险子项
      this.createQuoteDetail(this.routeParams.item);
    },
    methods: {
      createQuoteDetail(item) {
        const bizQuoteArr = [];
        //商业险子项
        for (let i in item) {
          if (typeof(item[i]) == 'object' && item[i] != null && item[i]['baoFei'] != 0) {
            let bizQuote = {
              name: i,
              baoFei: item[i]['baoFei']
            }
            bizQuoteArr.push(bizQuote);
          }
        }
        this.quoteArr = util.mapBizQuoteToArr(bizQuoteArr, SaveQuoteMap);
      },
      click() {
        this.showDetail = !this.showDetail;
      },
      counterBtnClick() {
        this.showPrice = !this.showPrice;
      },
      submitBuy() {
        this.showBuySuccess = true;
      },
      showUserInfo() {
        this.UserInfo = true;
      },
      quoteRecord() {
        JSBridge({code:'setBackStatus',status:'3'})
      },
    }


  }
</script>

<style lang="less">
  @import 'QuoteSuccessDetail.less';
</style>
