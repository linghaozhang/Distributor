<template>
  <div class="queryDetails">
    <group class="queryDetails-add" v-if="ownerInfo">
      <cell title="完善车主信息" is-link @click.native="goOwnerAdd" class="scrm-cell">
        <img slot="icon" width="16" style="margin:0.015rem 0.08rem 0 0;" src="./../../assets/bj.png" alt="">
      </cell>
    </group>
    <div class="queryDetails-card" style="margin-top:0">
      <div class="queryDetails-card-title scrm-title-prefix">
        车辆信息
      </div>
      <div class="queryDetails-card-content">
        <div class="queryDetails-card-item vux-1px-b">
          <div class="queryDetails-card-item-label">车牌号</div>
          <div class="queryDetails-card-item-desc">{{carInfo.data.UserInfo.LicenseNo}}</div>
        </div>
        <div class="queryDetails-card-item vux-1px-b">
          <div class="queryDetails-card-item-label">品牌型号</div>
          <div class="queryDetails-card-item-desc">{{carInfo.data.UserInfo.ModleName}}</div>
        </div>
        <div class="queryDetails-card-item vux-1px-b">
          <div class="queryDetails-card-item-label">车架号</div>
          <div class="queryDetails-card-item-desc">{{carInfo.data.UserInfo.CarVin}}</div>
        </div>
        <div class="queryDetails-card-item vux-1px-b">
          <div class="queryDetails-card-item-label">发动机号</div>
          <div class="queryDetails-card-item-desc">{{carInfo.data.UserInfo.EngineNo}}</div>
        </div>
        <div class="queryDetails-card-item vux-1px-b" v-if="carInfo.data.UserInfo.RegisterDate">
          <div class="queryDetails-card-item-label">注册日期</div>
          <div class="queryDetails-card-item-desc">{{carInfo.data.UserInfo.RegisterDate}}</div>
        </div>
        <div class="queryDetails-card-item vux-1px-b" v-if="carInfo.data.UserInfo.LicenseOwner">
          <div class="queryDetails-card-item-label">车主姓名</div>
          <div class="queryDetails-card-item-desc">{{carInfo.data.UserInfo.LicenseOwner}}</div>
        </div>
      </div>
    </div>
    <div class="queryDetails-card" v-if="carInfo.data.UserInfo.IsNewCar!=='1'||ownerInfo">
      <div class="queryDetails-card-title scrm-title-prefix">
        去年投保信息
        <div :class="tipClass" v-if="!ownerInfo">{{tip}}</div>
      </div>
      <div class="queryDetails-card-content">
        <div class="queryDetails-card-item vux-1px-b">
          <div class="queryDetails-card-item-label">交强险到期时间</div>
          <div class="queryDetails-card-item-desc">{{carInfo.data.UserInfo.ForceExpireDate}}</div>
        </div>
        <div class="queryDetails-card-item vux-1px-b">
          <div class="queryDetails-card-item-label">商业险到期时间</div>
          <div class="queryDetails-card-item-desc">{{carInfo.data.UserInfo.BusinessExpireDate}}</div>
        </div>
        <div class="queryDetails-card-item vux-1px-b">
          <div class="queryDetails-card-item-label">上年投保公司</div>
          <div class="queryDetails-card-item-desc">
            {{QquoteComp.filter(i=>i.id===String(carInfo.data.SaveQuote.Source))[0]?QquoteComp.filter(i=>i.id===String(carInfo.data.SaveQuote.Source))[0].name:''}}
          </div>
        </div>
      </div>
    </div>
    <div class="queryDetails-card" v-if="carInfo.data.UserInfo.IsNewCar!=='1'" style="margin-bottom:0.51rem">
      <div class="queryDetails-card-title scrm-title-prefix">
        投保项目
      </div>
      <div class="queryDetails-card-content">
        <div class="queryDetails-card-item vux-1px-b" v-for="i in quoteArr">
          <div class="queryDetails-card-item-label">{{i.type}}</div>
          <div class="queryDetails-card-item-desc">{{i.val+i.bjm}}</div>
        </div>
        <div class="queryDetails-card-more" v-if="needMore" @click="findMore">
          {{text}} <img :src=moreIcon alt="">
        </div>
      </div>
    </div>
    <x-button v-if="!ownerInfo" class="scrm-btn" @click.native="goQuote">前往报价</x-button>
    <x-button v-if="ownerInfo" class="scrm-btn" @click.native="goQuoteResult">查看报价信息</x-button>
  </div>
</template>
<script>
  import {Cell, Group, XButton} from 'vux';
  import {cities, getCarInfo, getOwnerInfo, QquoteComp, SaveQuoteMap} from "@constants/config";
  import util, {JSBridge} from '@util';
  import shouhui from '@/assets/shouhui.png'
  import xiala from '@/assets/xiala.png'
  import outpath from '@constants/outpath';
  import network from '@services';
  const carInfo = JSBridge('getCarInformation') ? JSON.parse(JSBridge('getCarInformation')) : '';
  const ownerInfoJson = JSBridge('getOwnerDetails') ? JSBridge('getOwnerDetails'):'';
  const ownerInfoObj=ownerInfoJson? JSON.parse(ownerInfoJson):'';
  let ownerInfo = '';
  if (ownerInfoJson) {
    ownerInfo = util.transformOwnerDetail(JSON.parse(JSBridge('getOwnerDetails')));
  }
  let quoteArr = '';
  if (carInfo) {
    quoteArr = util.mapQuoteToArr(carInfo.data.SaveQuote, SaveQuoteMap);
  }
  if (ownerInfo && Object.keys(ownerInfo.data.SaveQuote).length > 0) {
    quoteArr = util.mapQuoteToArr(ownerInfo.data.SaveQuote, SaveQuoteMap);
  }
  export default {
    name: 'queryDetails',
    components: {
      Group,
      Cell,
      XButton
    },
    data() {
      return {
        QquoteComp,
        cities: cities,
        ownerInfo: ownerInfo,
        carInfo: carInfo ? carInfo : ownerInfo,
        quoteArr: [...quoteArr],
        needMore: quoteArr.length > 4,
        moreIcon: xiala,
        text: '查看更多',
        tip: '',
        tipClass: 'queryDetails-card-title-tip'
      }
    },
    mounted() {
      if (this.needMore) this.quoteArr = this.quoteArr.splice(0, 4);
      if (!this.ownerInfo) this.calTip();
    },
    activated() {
      JSBridge({code: 'setTitle', title: carInfo ? '查询详情' : '车主详情'});
      if (this.$route.params.ownerInfo) {
        this.carInfo = this.$route.params.ownerInfo;
      } else {
        this.carInfo = carInfo ? carInfo : ownerInfo;
      }
    },
    methods: {
      findMore() {
        if (this.quoteArr.length === quoteArr.length) {
          this.quoteArr = this.quoteArr.splice(0, 4);
          this.moreIcon = xiala;
          this.text = '查看更多'
        } else {
          this.quoteArr = [...quoteArr];
          this.moreIcon = shouhui;
          this.text = '收起更多'
        }
      },
      calTip() {
        if (!this.carInfo.data.UserInfo.BusinessExpireDate) {
          return false
        }
        let now = new Date().getTime();
        let businessTimeArr = this.carInfo.data.UserInfo.BusinessExpireDate.split(' ');
        let businessTime = '';
        if (businessTimeArr.length === 1) {
          businessTime = new Date(businessTimeArr[0]).getTime()
        } else {
          let hms = businessTimeArr[1].split(':');
          businessTime = new Date(businessTimeArr[0]).getTime() + hms[0] * 60 * 60 * 1000 + hms[1] * 60 * 1000 + hms[2] * 1000
        }
        if (now > businessTime) {
          this.tip = '脱保';
          this.tipClass = 'queryDetails-card-title-tip';
          return
        }
        let day = Math.floor((businessTime - now) / 1000 / 60 / 60 / 24);
        if (day > 60) {
          this.tip = '未到期';
          this.tipClass = 'queryDetails-card-title-tip-green'
        } else {
          this.tip = `倒计时${day}天`;
          this.tipClass = 'queryDetails-card-title-tip'
        }
      },
      goQuote() {
        const {LicenseNo} = this.carInfo.data.UserInfo;
        // 判断是否有报价权限
        network.get(outpath.CHECK_COUNSELOR_QUERY, {plateNum: LicenseNo}).then(res => {
          if (res && res.respCode === '0' && res.ok) {
            if (res.data === 0) {
              this.$vux.toast.show({
                text: `抱歉<br>车牌号（${LicenseNo}）暂不支持报价`,
                type: 'text',
                width: '60%',
                time: 3000
              })
            } else {
              this.$router.push({
                name: 'chooseInsurance',
                params: this.carInfo
              })
            }
          }
        });
      },
      goQuoteResult() {
        if ( !ownerInfoObj.data.lastInsuranceJson || !ownerInfoObj.data.priceJson){
          return this.$vux.toast.show({
            text: '暂无报价结果',
            type: 'text',
            width: '60%',
            time: 3000
          })
        }
        this.$router.push({
          name: 'quotationResult',
          params: {
            ownerInfo: ownerInfoJson
          }
        })

      },
      goOwnerAdd() {
        this.$router.push({
          name: 'addUser',
          params: this.ownerInfo,
        })
      }
    }
  }
</script>
<style lang="less">
  @import './QueryDetails';
</style>
