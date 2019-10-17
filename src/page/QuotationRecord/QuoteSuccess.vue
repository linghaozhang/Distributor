<template>
  <div class="quoteSuccess">
    <div>
      <div class="title">
        <cell
          :title="(QquoteComp.filter(i=>i.id===String(quoteSource))[0]?QquoteComp.filter(i=>i.id===String(quoteSource))[0].name:'')"
          :value="'￥'+totalPrice" value-align="right" class="quoteResult-insurance-item">
          <img slot="icon" :src="(QquoteComp.filter(i=>i.id===String(quoteSource))[0].img)" width="16"
               style="margin:0.015rem 0.08rem 0 0;"/>
        </cell>
      </div>

      <div class="quoteSuccess-vehicleInfo-content">
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
        <cell title="保费总额" :value="'￥'+Number(totalPrice).toFixed(2)" class="quoteSuccess-insurance-sum"></cell>
      </div>

      <div class="quoteSuccess-counter">
        <div class="quoteSuccess-counter-title quoteSuccess-title">客户车险计算器</div>
        <div class="quoteSuccess-counter-content">
          <div>
            <div class="quoteSuccess-counter-item"><span class="counter-item-left">商业险优惠费率</span><input type="text"
                                                                                                        value=""
                                                                                                        v-model="bizRate"/><span
              class="counter-item-right">% X {{BizTotal}}</span></div>
            <div class="quoteSuccess-counter-item"><span class="counter-item-left">交强险优惠费率</span><input type="text"
                                                                                                        v-model="forceRate"/><span
              class="counter-item-right">% X {{ForceTotal}}</span></div>
          </div>
          <div class="quoteSuccess-counter-check">
            <check-icon :value.sync="isSelected">去增值税税点</check-icon>
            <x-button mini plain type="primary" @click.native="counterBtnClick">计算</x-button>
          </div>
        </div>
        <div class="quoteSuccess-counter-price" v-show="showPrice">
          <cell title="优惠金额" :value="'￥'+cutPrice"></cell>
          <cell title="惠后价格" :value="'￥'+finalPrice" class="finalPrice"></cell>
        </div>
      </div>
    </div>
    <div class="quoteSuccess-footer">
      <cell title="合计" :value="'￥'+Number(totalPrice).toFixed(2)" class="quoteSuccess-footer-sum"></cell>
      <flexbox class="quoteSuccess-btn" v-if="!formOwnerInfo">
        <x-button type="primary" class="btn-buy" @click.native="showBuyDetail=true">申请购买</x-button>
        <div class="btn-item">
          <x-button type="warn" class="btn-reQuote" @click.native="getReQuote">重新报价</x-button>
        </div>
      </flexbox>
    </div>
    <!--购买弹框-->
    <div v-transfer-dom>
      <confirm v-model="showBuyDetail"
               title="购买详情"
               class="confirm-buy"
               @on-confirm="submitBuy">
        <div class="confirm-buy-item">
          <span class="confirm-buy-item-label">保险公司</span>
          <span class="confirm-buy-item-value-first">
              {{QquoteComp.filter(i=>i.id===String(quoteSource))[0]?
              QquoteComp.filter(i=>i.id===String(quoteSource))[0].name:''}}
            </span>
        </div>
        <div class="confirm-buy-item">
          <span class="confirm-buy-item-label">商&nbsp;&nbsp;业&nbsp;&nbsp;险</span>
          <span class="confirm-buy-item-value">￥<input type="text" placeholder="请输入金额" v-model="bizPrice"/></span>
        </div>
        <div class="confirm-buy-item">
          <span class="confirm-buy-item-label">交&nbsp;&nbsp;强&nbsp;&nbsp;险</span>
          <span class="confirm-buy-item-value">￥<input type="text" placeholder="请输入金额" v-model="forcePrice"/></span>
        </div>
      </confirm>
    </div>
    <!--购买成功弹框-->
    <div v-transfer-dom v-show="showBuySuccess">
      <x-dialog :show="showBuySuccess" class="dialog-buySuccess" style="width: 2.7rem; height: 1.68rem" hide-on-blur
                @on-show="afterThreeSeconds">
        <div class="img-box">
          <img src="../../assets/buySuccess.png" style="max-width:0.81rem">
        </div>
        <div>
          <p>购买成功！</p>
        </div>
      </x-dialog>
    </div>
    <!--购买失败弹框-->
    <div v-transfer-dom v-show="showBuyFail">
      <x-dialog :show.sync="showBuyFail" class="dialog-buySuccess" style="width: 2.7rem; height: 1.68rem"
                @on-show="afterThreeSeconds" hide-on-blur>
        <div class="img-box">
          <img src="../../assets/buyFail.png" style="max-width:0.81rem">
        </div>
        <div>
          <p>购买失败！</p>
        </div>
      </x-dialog>
    </div>
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
    PopupPicker,
    Search,
    TransferDomDirective as TransferDom,
    XButton,
    XDialog,
    XInput
  } from 'vux'
  import {QquoteComp, SaveQuoteMap} from "@constants/config";
  import util, {JSBridge} from '@util';
  import outpath from '@constants/outpath';
  import network from '@services';

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
      XDialog,
      PopupPicker
    },
    data() {
      return {
        routeParams: this.$route.params,
        showDetail: false,
        isSelected: false,
        showPrice: false,
        showBuyDetail: false,
        showBuySuccess: false,
        showBuyFail: false,
        forceRate: '', //交强险汇率
        bizRate: '', //商业险汇率
        cutPrice: '', //优惠金额
        finalPrice: '', //优惠后价格
        forcePrice: '',//输入交强险金额
        bizPrice: '', //输入商业险金额
        carType: '', //车型校验
        LicenseNo: this.$route.params.LicenseNo, //车牌号
        CarVin: this.$route.params.CarVin, //车架号
        ModleName: this.$route.params.ModleName, //品牌型号
        RegisterDate: this.$route.params.RegisterDate, //注册日期
        QquoteComp: QquoteComp,
        quoteSource: this.$route.params.quoteSource, //保险公司枚举值
        totalPrice: this.$route.params.totalPrice, //报价金额
        BizTotal: this.$route.params.item.BizTotal, //商业险
        ForceTotal: this.$route.params.item.ForceTotal, //交强险
        TaxTotal: this.$route.params.item.TaxTotal, //车船险
        quoteArr: [],  //商业险子项
        showMission: false,
        reason: '',
        formOwnerInfo: this.$route.params.formOwnerInfo || false
      }
    },
    activated() {
      JSBridge({code: 'setTitle', title: '报价成功'});
      if (!Object.keys(this.$route.params).length) {
        return false
      }
      const data = this.$route.params;
      this.routeParams = this.$route.params;
      this.LicenseNo = this.$route.params.LicenseNo; //车牌号
      this.CarVin = this.$route.params.CarVin; //车架号
      this.ModleName = this.$route.params.ModleName; //品牌型号
      this.RegisterDate = this.$route.params.RegisterDate; //注册日期
      this.quoteSource = this.$route.params.quoteSource; //注册日期
      this.totalPrice = this.$route.params.totalPrice; //保险公司枚举值
      this.BizTotal = this.$route.params.item.BizTotal; //商业险
      this.ForceTotal = this.$route.params.item.ForceTotal; //交强险
      this.TaxTotal = this.$route.params.item.TaxTotal; //车船险
      JSBridge({code: 'getPriceId', priceId: this.routeParams.optId, source: this.quoteSource});
      const item = data.item;
      const bizQuoteArr = [];
      //车型校验拼装
      this.carType = `${data.AutoMoldCode || ''}/${data.ModleName || ''}/${data.VehicleAlias || ''}/${data.ExhaustScale || ''}/${data.SeatCount || ''}/${data.PurchasePrice || ''}/${data.VehicleYear || ''}`;
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
    watch: {
      //监控去增值税税点
      isSelected(val) {
        this.getCutPrice();
        this.finalPrice = (this.totalPrice - this.cutPrice).toFixed(2);
      }
    },
    methods: {
      //优惠费率计算
      counterBtnClick() {
        let reg = /^[0-9]+(.{1}[0-9]+)?$/;
        if (!reg.test(this.bizRate) && this.bizRate) {
          return this.$vux.toast.show({
            text: '请输入正确的商业险费率',
            type: 'text',
            width: '60%',
            time: 3000
          })
        }
        if (!reg.test(this.forceRate) && this.forceRate) {
          return this.$vux.toast.show({
            text: '请输入正确的交强险费率',
            type: 'text',
            width: '60%',
            time: 3000
          })
        }
        this.showPrice = true;
        this.cutPrice = (this.bizRate / 100 * this.BizTotal + this.forceRate / 100 * this.ForceTotal).toFixed(2);
        //去增值税点计算
        this.getCutPrice();
        this.finalPrice = (this.totalPrice - this.cutPrice).toFixed(2);
      },
      submitBuy() {
        if (this.validateForm()) {
          let params = {
            commercialInsurance: this.bizPrice,
            compulsoryInsurance: this.forcePrice,
            insuranceCode: this.quoteSource,
            ownerId: this.routeParams.plateNumId,
            optId: this.routeParams.optId,
          };
          let detailParams = {
            ...this.routeParams,
            ...this._data,
          };
          //调用购买接口
          network.post(outpath.GET_BH_BUY, params).then(res => {
            const data = res.data;
            if (res && res.respCode === '0' && res.ok) {
              this.showBuySuccess = true;
              //成功跳转购买成功页面
              setTimeout(() => {
                this.$router.push({
                  name: 'quoteSuccessDetail',
                  params: detailParams
                });
              }, 1500);
            } else {
              //购买失败
              this.showBuyFail = true;
            }
          });
        }
      },
      afterThreeSeconds() {
        setTimeout(() => {
          this.showBuySuccess = false;
          this.showBuyFail = false;
        }, 1500);
      },
      getCutPrice() {
        if (this.isSelected) {
          this.cutPrice = (this.bizRate / 100 * this.BizTotal + this.forceRate / 100 * this.ForceTotal + (this.BizTotal + this.ForceTotal) * 0.06).toFixed(2)
        } else {
          this.cutPrice = (this.bizRate / 100 * this.BizTotal + this.forceRate / 100 * this.ForceTotal).toFixed(2);
        }
      },
      validateForm() {
        let reg = /^[0-9]+(.{1}[0-9]+)?$/;
        if (!this.bizPrice) {
          this.$vux.toast.show({
            text: '请输入商业险金额',
            type: 'text',
            width: '60%',
            time: 3000
          });
          return false
        }
        if (!this.forcePrice) {
          this.$vux.toast.show({
            text: '请输入交强险金额',
            type: 'text',
            width: '60%',
            time: 3000
          });
          return false
        }
        if (!reg.test(this.bizPrice)) {
          this.$vux.toast.show({
            text: '请输入正确的商业险金额',
            type: 'text',
            width: '60%',
            time: 3000
          });
          return false
        }
        if (!reg.test(this.forcePrice)) {
          this.$vux.toast.show({
            text: '请输入正确的交强险金额',
            type: 'text',
            width: '60%',
            time: 3000
          });
          return false
        }
        return true;
      },
      getReQuote() {
        if (JSBridge('getCarInformation')) {
          this.$router.push({
            name: 'queryDetails',
          })
        } else {
          JSBridge({code: 'setBackStatus', status: '4'})
        }
      }
    },

  }
</script>

<style lang="less">
  @import 'QuoteSuccess.less';
</style>
