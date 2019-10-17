<template>
  <div class="quoteFailed">
    <div>
      <div class="title">
        <cell :title="(QquoteComp.filter(i=>i.id===String(quoteSource))[0]?QquoteComp.filter(i=>i.id===String(quoteSource))[0].name:'')" :value="totalPrice"
              value-align="right" class="quoteResult-insurance-item fail">
          <img slot="icon" :src="(QquoteComp.filter(i=>i.id===String(quoteSource))[0].img)" width="16"
               style="margin:0.015rem 0.08rem 0 0;"/>
        </cell>
      </div>

      <div class="quoteFail-vehicleInfo-content">
        <div class="quoteFail-title scrm-title-prefix">{{LicenseNo}}</div>
        <div class="quoteFail-vehicleInfo-item">
          <div class="quoteFail-vehicleInfo-item-label">
            车&nbsp;&nbsp;架&nbsp;&nbsp;号
          </div>
          <div class="quoteFail-vehicleInfo-item-desc">
            {{CarVin}}
          </div>
        </div>
        <div class="quoteFail-vehicleInfo-item">
          <div class="quoteFail-vehicleInfo-item-label">
            品牌型号
          </div>
          <div class="quoteFail-vehicleInfo-item-desc">
            {{ModleName}}
          </div>
        </div>
        <div class="quoteFail-vehicleInfo-item">
          <div class="quoteFail-vehicleInfo-item-label">
            注册日期
          </div>
          <div class="quoteFail-vehicleInfo-item-desc">
            {{RegisterDate}}
          </div>
        </div>
        <div class="quoteFail-vehicleInfo-item">
          <div class="quoteFail-vehicleInfo-item-label">
            车型校验
          </div>
          <div class="quoteFail-vehicleInfo-item-desc">
            {{carType}}
          </div>
        </div>
      </div>
      <div class="quoteFail-insurance">
        <cell title="交强险" value="----"></cell>
        <cell title="车船险" value="----"></cell>
        <cell title="商业险" value="----"></cell>
      </div>
      <group label-width="5em">
        <cell title="报价状态" value="报价失败"></cell>
        <cell title="失败原因" align-items="flex-start" class="failReason" :value="QuoteResult"></cell>
      </group>
      <div class="quoteFail-btn">
        <!--<x-button class="btn-reQuote" @click.native="getReQuote">重新报价</x-button>-->
        <!--<x-button class="btn-back" @click.native="backResult">返回</x-button>-->
      </div>
    </div>
  </div>
</template>

<script>
  import {Card, Cell, Divider, Group, Search, XButton} from 'vux'
  import {QquoteComp} from "@constants/config";
  import {JSBridge} from '@util';
  export default {
    name: "quoteFail",
    components: {
      Card,
      Divider,
      Search,
      Group,
      Cell,
      XButton
    },
    data() {
      const {item} = this.$route.params;
      return {
        routeParams:this.$route.params,
        carType: '', //车型校验
        LicenseNo: this.$route.params.LicenseNo, //车牌号
        CarVin: this.$route.params.CarVin, //车架号
        ModleName: this.$route.params.ModleName, //品牌型号
        RegisterDate: this.$route.params.RegisterDate, //注册日期
        QquoteComp: QquoteComp,
        quoteSource: this.$route.params.quoteSource, //保险公司枚举值
        totalPrice: this.$route.params.totalPrice, //报价金额
        QuoteResult: item.QuoteResult
      }
    },
    activated() {
      JSBridge({code:'setTitle',title:'报价失败'});
      if(!Object.keys(this.$route.params).length){
        return false
      }
      const data = this.$route.params;
      this.LicenseNo=data.LicenseNo;
      this.CarVin=data.CarVin;
      this.ModleName=data.ModleName;
      this.RegisterDate=data.RegisterDate;
      this.quoteSource=data.quoteSource;
      this.totalPrice=data.totalPrice;
      this.QuoteResult=data.item.QuoteResult;
      //车型校验拼装
      this.carType = `${data.AutoMoldCode || ''}/${data.ModleName || ''}/${data.VehicleAlias || ''}/${data.ExhaustScale || ''}/${data.SeatCount || ''}/${data.PurchasePrice || ''}/${data.VehicleYear || ''}`;
    },
  }
</script>

<style lang="less">
  @import 'QuoteFail.less';
</style>
