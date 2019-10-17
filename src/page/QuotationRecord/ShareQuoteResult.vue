<template>
  <div class="quoteSuccess">
    <div>
      <div class="title">
        <cell :title="(QquoteComp.filter(i=>i.id===String(quoteSource))[0]?
        QquoteComp.filter(i=>i.id===String(quoteSource))[0].name:'')"
              :value="'￥'+totalPrice"
              value-align="right"
              class="quoteResult-insurance-item">
          <img slot="icon"
               :src="(QquoteComp.filter(i=>i.id===String(quoteSource))[0].img)"
               width="16"
               style="margin:0.015rem 0.08rem 0 0;"
          />
        </cell>
      </div>

      <div  class="quoteSuccess-vehicleInfo-content">
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
        <cell title="商业险" :value="'￥'+Number(BizTotal).toFixed(2)"
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
    </div>
  </div>
</template>
<script>
  import { Divider, Card, Search, Group, Cell, XInput,CheckIcon, XButton , Flexbox, FlexboxItem,Confirm ,XDialog,PopupPicker,querystring } from 'vux'
  import {QquoteComp,SaveQuoteMap} from "@constants/config";
  import util,{JSBridge} from '@util';
  import outpath from '@constants/outpath';
  import network from '@services';
  export default {
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
        routeParams:this.$route.params,
        showDetail: false,
        isSelected: false,
        showPrice: false,
        showBuyDetail: false,
        showBuySuccess: false,
        showBuyFail: false,
        carType: '', //车型校验
        LicenseNo: '', //车牌号
        CarVin:  '', //车架号
        ModleName:  '', //品牌型号
        RegisterDate:  '', //注册日期
        QquoteComp: QquoteComp,
        quoteSource: this.$route.query.source, //保险公司枚举值
        totalPrice: '', //报价金额
        BizTotal: '', //商业险
        ForceTotal:'', //交强险
        TaxTotal: '', //车船险
        quoteArr: [],  //商业险子项
      }
    },
    activated(){
      let priceId=this.$route.query.priceId;
      let source=this.$route.query.source;
      let sid= this.$route.query.token;
      network.get(outpath.GET_PRICE_DETAIL_BY_ID,{priceId},true,sid).then(res=>{
        if(res&&res.ok){
          const lastInsuranceJson=JSON.parse(res.data.lastInsuranceJson);
          const priceJson=JSON.parse(res.data.priceJson);
          const item=priceJson.filter(i=>Number(i.Item.Source)===Number(source))[0].Item;
          const data = lastInsuranceJson.UserInfo;
          const bizQuoteArr=[];
          //商业险子项
          for (let i in item){
            if(typeof(item[i])=='object'&& item[i] != null && item[i]['baoFei'] !=0){
              let bizQuote={
                name: i,
                baoFei: item[i]['baoFei']
              }
              bizQuoteArr.push(bizQuote);
            }
          }
          this.totalPrice=(item.BizTotal+item.ForceTotal+item.TaxTotal).toFixed(2);
          this.BizTotal=item.BizTotal;
          this.ForceTotal=item.ForceTotal;
          this.TaxTotal=item.TaxTotal;
          this.quoteSource=source;
          this.LicenseNo=data.LicenseNo;
          this.CarVin=data.LicenseNo;
          this.ModleName=data.ModleName;
          this.RegisterDate=data.RegisterDate;
          this.carType = `${data.AutoMoldCode || ''}/${data.ModleName || ''}/${data.VehicleAlias || ''}/${data.ExhaustScale || ''}/${data.SeatCount || ''}/${data.PurchasePrice || ''}/${data.VehicleYear || ''}`;
          this.quoteArr = util.mapBizQuoteToArr(bizQuoteArr, SaveQuoteMap);
        }
      });
    },
    watch:{
      //监控去增值税税点
      isSelected(val){
        this.getCutPrice();
        this.finalPrice= (this.totalPrice - this.cutPrice).toFixed(2);
      }
    },
    methods: {
      //优惠费率计算
      counterBtnClick(){
        this.showPrice=true;
        this.cutPrice= (this.bizRate/100* this.BizTotal+this.forceRate/100 * this.ForceTotal).toFixed(2);
        //去增值税点计算
        this.getCutPrice();
        this.finalPrice= (this.totalPrice - this.cutPrice).toFixed(2);
      },
      submitBuy(){
        if(this.validateForm()){
          let params={
            commercialInsurance: this.bizPrice,
            compulsoryInsurance: this.forcePrice,
            insuranceCode: this.quoteSource,
            ownerId: this.routeParams.plateNumId,
            optId: this.routeParams.optId,
          };
          let detailParams={
            ...this.routeParams,
            ...this._data,
          };
          //调用购买接口
          network.post(outpath.GET_BH_BUY, params).then(res => {
            const data = res.data;
            if (res && res.respCode === '0' && res.ok) {
              this.showBuySuccess = true;
              //成功跳转购买成功页面
              setTimeout(()=>{
                this.$router.push({
                  name: 'quoteSuccessDetail',
                  params: detailParams
                });
              }, 1500);
            }else{
              //购买失败
              this.showBuyFail = true;
            }
          });
        }
      },
      afterThreeSeconds(){
        setTimeout(()=>{
          this.showBuySuccess= false;
          this.showBuyFail= false;
        }, 1500);
      },
      getCutPrice(){
        if (this.isSelected){
          this.cutPrice=(this.bizRate/100* this.BizTotal+this.forceRate/100 * this.ForceTotal+(this.BizTotal + this.ForceTotal) * 0.06).toFixed(2)
        }else{
          this.cutPrice= (this.bizRate/100* this.BizTotal+this.forceRate/100 * this.ForceTotal).toFixed(2);
        }
      },
      validateForm() {
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
        return true;
      },
      getReQuote(){
        this.$router.push({
          name: 'queryDetails',
        })
      }
    },

  }
</script>

<style lang="less">
  @import 'ShareQuoteResult.less';
</style>
