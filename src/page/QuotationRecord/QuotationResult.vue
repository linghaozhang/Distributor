<template>
  <div class="quotationResult">
    <div class="quotationResult-content">
      <card>
        <div slot="content" class="quotationResult-vehicleInfo-content">
          <div class="title scrm-title-prefix">{{LicenseNo}}</div>
          <div class="quotationResult-vehicleInfo-item">
            <div class="quotationResult-vehicleInfo-item-label">
              车&nbsp;&nbsp;架&nbsp;&nbsp;号
            </div>
            <div class="quotationResult-vehicleInfo-item-desc">
              {{CarVin}}
            </div>
          </div>
          <div class="quotationResult-vehicleInfo-item">
            <div class="quotationResult-vehicleInfo-item-label">
              品牌型号
            </div>
            <div class="quotationResult-vehicleInfo-item-desc">
              {{ModleName}}
            </div>
          </div>
          <div class="quotationResult-vehicleInfo-item">
            <div class="quotationResult-vehicleInfo-item-label">
              注册日期
            </div>
            <div class="quotationResult-vehicleInfo-item-desc">
              {{RegisterDate}}
            </div>
          </div>
          <div class="quotationResult-vehicleInfo-item">
            <div class="quotationResult-vehicleInfo-item-label">
              车型校验
            </div>
            <div class="quotationResult-vehicleInfo-item-desc">
              {{carType}}
            </div>
          </div>
        </div>
      </card>
      <div style="width:100%;height: 0.09rem;background:#f5f5f5"></div>
      <div class="quotationResult-quoteDate">
        <cell title="交强险起保时间" value-align="right" class="quoteResult-quoteDate-item" :value="ForceTimeStamp"></cell>
        <cell title="商业险起保时间" value-align="right" class="quoteResult-quoteDate-item" :value="BizTimeStamp"></cell>
      </div>
      <div style="width:100%;height: 0.09rem;background:#f5f5f5"></div>
      <div class="quoteResult-insurance">
        <div class="quoteResult-insurance-content">
          <cell :title="(QquoteComp.filter(i=>i.id===String(item.Source))[0].name)"
                is-link
                @click.native="doPrecisePrice(item)"
                :is-loading="!item.totalPrice"
                :value="item.totalPrice"
                value-align="right"
                class="quoteResult-insurance-item"
                :class="{quoteFail:item.isFail}"
                v-for="(item,index) in quoteResultList"
                :key="index"
                :inline-desc='item.buyStatus'
          >
            <img slot="icon" :src="(QquoteComp.filter(i=>i.id===String(item.Source))[0].img)" width="20"
                 style="margin:0.015rem 0.08rem 0 0;"/>
          </cell>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  const _getCarJSON = window.android  ? JSBridge('getCarJson') : "";
  console.log('报价记录入口进入渲染此数据',_getCarJSON);
  // const _getCarJSON = JSBridge('getCarJson');
  import {Card, Cell, Divider, Group, Search, XButton } from 'vux';
  import outpath from '@constants/outpath';
  import network from '@services';
  import {getCarJson, QquoteComp} from "@constants/config";
  import moment from 'moment';
  import {JSBridge} from "@util";
  export default {
    name: "quotationResult",
    components: {
      Card,
      Divider,
      Search,
      Group,
      Cell,
      XButton
    },
    data() {
      const {params}=this.$route;
      if (_getCarJSON) {
        //报价记录入口进入渲染此数据
        return {
          routeParams: params,
          ...this.renderNativeData(_getCarJSON)
        }
      }
      if(params.ownerInfo){
        //车主详情入口渲染此数据
        return {
          routeParams: JSON.parse(params.ownerInfo),
          ...this.renderNativeData(params.ownerInfo),
          formOwnerInfo:true
        }
      }
      // 普通报价流程进入渲染
      return {
        routeParams:params,
        carType: '', //车型校验
        LicenseNo: params.LicenseNo, //车牌号
        CarVin: params.CarVin, //车架号
        ModleName: params.ModleName, //品牌型号
        RegisterDate: params.RegisterDate, //注册日期
        QquoteComp: QquoteComp,
        QuoteGroups: params.QuoteGroups,
        QuoteStatus: '', //报价状态
        quoteResultList: [],
        isFinished: false,
        ForceTimeStamp: moment(params.ForceTimeStamp * 1000).format('YYYY-MM-DD'),//交强险起保时间
        BizTimeStamp: moment(params.BizTimeStamp * 1000).format('YYYY-MM-DD'),//商业险起保时间
        btnText: '重新报价'
      }
    },
    activated() {
      JSBridge({code:'setTitle',title:'报价结果'});
      const{params}=this.$route;
      const getCarJson = _getCarJSON ? JSON.parse(_getCarJSON) : '';
      if (getCarJson) {
        return this.nativeRecordMounted();
      }
      if(!Object.keys(this.$route.params).length){
        return false
      }
      if(params.ownerInfo){
        return false
      }
      this.routeParams=this.$route.params;
      this.LicenseNo=params.LicenseNo;
      this.CarVin=params.CarVin;
      this.ModleName=params.ModleName;
      this.RegisterDate=params.RegisterDate;
      this.QuoteGroups=params.QuoteGroups;
      this.ForceTimeStamp=moment(params.ForceTimeStamp * 1000).format('YYYY-MM-DD');//交强险起保时间
      this.BizTimeStamp=moment(params.BizTimeStamp * 1000).format('YYYY-MM-DD');//交强险起保时间
      this.commonQuoteMounted();
    },
    methods: {
      renderNativeData(json) {
        let getCarJSON = JSON.parse(json);
        const formWindowData = getCarJSON.data;
        const formWindowItem = JSON.parse(formWindowData.priceJson);
        const lastInsuranceJson = JSON.parse(getCarJSON.data.lastInsuranceJson);
        const userInfo = lastInsuranceJson.UserInfo;
        return {
          ...userInfo,
          quoteResultList: formWindowItem.map(i => {
            return {
              Source: i.Item.Source,
              totalPrice: i.Item.QuoteStatus > 0 ? (i.Item.BizTotal + i.Item.ForceTotal + i.Item.TaxTotal).toFixed(2) : '报价失败',
              item: {...i.Item},
              isFail: i.Item.QuoteStatus <= 0,
              QuoteStatus: i.Item.QuoteStatus,
              buyStatus: ''
            }
          }),
          priceContents: formWindowData.priceContents,//订单内容
          carType: `${userInfo.AutoMoldCode || ''}/${userInfo.ModleName || ''}/${userInfo.VehicleAlias || ''}/${userInfo.ExhaustScale || ''}/${userInfo.SeatCount || ''}/${userInfo.PurchasePrice || ''}/${userInfo.VehicleYear || ''}`, //车型校验
          LicenseNo: userInfo.LicenseNo, //车牌号
          CarVin: userInfo.CarVin, //车架号
          ModleName: userInfo.ModleName, //品牌型号
          RegisterDate: userInfo.RegisterDate ? moment(userInfo.RegisterDate).format('YYYY-MM-DD') : '', //注册日期
          QquoteComp: QquoteComp,
          // QuoteGroups: this.routeParams.QuoteGroups,
          QuoteStatus: '', //报价状态
          isFinished: true,
          plateNumId: formWindowData.ownerId,
          optId: formWindowData.id,
          ForceTimeStamp: userInfo.NextForceStartDate ? moment(userInfo.NextForceStartDate).format('YYYY-MM-DD') : '',//交强险起保时间
          BizTimeStamp: userInfo.NextBusinessStartDate ? moment(userInfo.NextBusinessStartDate).format('YYYY-MM-DD') : '',//商业险起保时间
        }
      },
      commonQuoteMounted() {
        const {plateNumId, sealManId, interfaceData} = this.routeParams;
        Promise.all(this.getItemData()).then(res => {
          if (res.filter(i => i).length !== res.length) {
            return this.$vux.alert.show({
              title: '抱歉',
              content: '服务器开小差了，请重新报价',
            })
          }
          network.post(outpath.SUBMIT_QUOTE_ORDER_PRICE, {
            flag: 1,
            ownerId: plateNumId,
            priceJson: JSON.stringify(res),
            sealManId: sealManId,
            lastInsuranceJson: JSON.stringify(interfaceData)
          }).then(res => {
            if (res && res.data) {
              this.isFinished = true;
              //报价单id
              this.routeParams.optId = res.data;

            } else {
              this.$vux.toast.show({
                text: res.message || '服务器开小差了，请稍后再试',
                type: 'text',
                width: '60%',
                time: 3000
              })
            }
          })
        });
      },
      nativeRecordMounted() {
        this.quoteResultList.forEach(i => {
          this.priceContents.forEach(j => {
            if (j.priceOrgCode === i.Source) {
              i.buyStatus = j.buyStatus
            }
          });
        });
      },
      doPrecisePrice(e) {
        if (!this.isFinished) {
          return false
        }
        let params = {
          ...this.routeParams,
          quoteSource: e.Source,
          totalPrice: e.totalPrice,
          item: e.item,
          isFail: e.isFail,
          ...this._data,
        };
        if (e.QuoteStatus > 0) {
          if (this.quoteResultList.filter(i => i.buyStatus).length === 1) {
            this.$router.push({
              name: 'quoteSuccessDetail',
              params: params
            });
            return
          }
          this.$router.push({
            name: 'quoteSuccess',
            params: params
          });
        } else {
          this.$router.push({
            name: 'quoteFail',
            params: params
          });
        }
      },
      getItemData() {
        const data = this.routeParams;
        //车型校验拼装
        this.carType = `${data.AutoMoldCode || ''}/${data.ModleName || ''}/${data.VehicleAlias || ''}/${data.ExhaustScale || ''}/${data.SeatCount || ''}/${data.PurchasePrice || ''}/${data.VehicleYear || ''}`;
        this.quoteResultList=[];
        return data.QuoteGroups.map(i => {
          //初始化报价保险公司
          this.quoteResultList.push({
            Source: i,
            totalPrice: '',
            BizTotal: '',
            ForceTotal: '',
            TaxTotal: '',
            QuoteResult: '',
            isFail: false
          });
          return network.get(outpath.GET_BH_QUOTE_RESULT_INFO, {
            LicenseNo: data.LicenseNo,
            QuoteGroup: i
          }, false).then(res => {
            if (res && res.respCode === '0' && res.ok) {
              const {data} = res;
              this.quoteResultList.forEach(i => {
                if (Number(i.Source) === Number(data.Item.Source)) {
                  i.QuoteStatus = data.Item.QuoteStatus;
                  i.item = data.Item;
                  i.BizTotal = data.Item.BizTotal;
                  i.ForceTotal = data.Item.ForceTotal;
                  i.TaxTotal = data.Item.TaxTotal;
                  i.QuoteResult = data.Item.QuoteStatus > 0 ? '报价成功' : '报价失败';
                  i.totalPrice = data.Item.QuoteStatus > 0 ? (data.Item.BizTotal + data.Item.ForceTotal + data.Item.TaxTotal).toFixed(2) : '报价失败';
                  i.isFail = data.Item.QuoteStatus <= 0;
                }
              });
              return data
            }
          });
        });
      }
    },

  }
</script>

<style lang="less">
  @import 'QuotationResult.less';
</style>
