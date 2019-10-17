<template>
  <div class="addUser">
    <div class="addUser-tit scrm-title-prefix">车主信息</div>
    <group>
      <x-input
        title="客户姓名"
        placeholder="请输入客户姓名"
        text-align="right"
        placeholder-align="right"
        v-model="LicenseOwner"
      ></x-input>
      <x-input
        title="联系电话"
        placeholder="请输入联系电话"
        text-align="right"
        placeholder-align="right"
        v-model="contactWay"
        :is-type="checkPhone"
      ></x-input>
      <popup-picker
        class="addUser-picker"
        title="证件类型"
        :data="IdCardOptions"
        placeholder="请选择证件类型"
        :columns="1"
        show-name
        v-model="OwnerIdCardType"
        @on-change="(v)=>cardOptionsChange(v,'docInfo')"
      ></popup-picker>
      <x-input
        title="证件号码"
        placeholder="请输入证件号码"
        text-align="right"
        placeholder-align="right"
        v-model="docInfo"
        :is-type="(v)=>checkCardNum(v,OwnerIdCardType)"
      ></x-input>
    </group>
    <div class="addUser-blank"></div>
    <group>
      <x-input
        title="车牌号"
        placeholder="请输入车牌号"
        text-align="right"
        placeholder-align="right"
        v-model="LicenseNo"
      ></x-input>
      <x-input
        title="车架号"
        placeholder="请输入车架号"
        text-align="right"
        placeholder-align="right"
        v-model="CarVin"
      ></x-input>
      <x-input
        title="发动机号"
        placeholder="请输入发动机号"
        text-align="right"
        placeholder-align="right"
        v-model="EngineNo"
      ></x-input>
      <x-input
        title="品牌型号"
        placeholder="请输入品牌型号"
        text-align="right"
        placeholder-align="right"
        v-model="ModleName"
      ></x-input>
      <datetime
        format="YYYY-MM-DD"
        v-model="RegisterDate"
        title="初登日期"
        placeholder="请选择初登日期"
      ></datetime>
    </group>
    <div class="addUser-blank"></div>
    <group>
      <datetime
        format="YYYY-MM-DD"
        v-model="ForceExpireDate"
        title="交强险到期日"
        placeholder="请选择交强险到期日"
      ></datetime>
      <datetime
        format="YYYY-MM-DD"
        v-model="BusinessExpireDate"
        title="商业险到期日"
        placeholder="请选择商业险到期日"
      ></datetime>
      <div class="addUser-textarea-tit vux-1px-t">备注</div>
      <textarea class="addUser-textarea"
                cols="30" rows="10"
                placeholder="请输入备注信息，限200字。"
                maxlength="200"
                v-model="remark"></textarea>
      <cell title="所属4s店"  :value="fourSName"></cell>
    </group>
    <x-button class="scrm-btn" @click.native="updateOwner">保存</x-button>
  </div>
</template>
<script>
  import {Cell, Datetime, Group, PopupPicker, XButton, XInput, XTextarea} from 'vux'
  import { IdCardOptions } from '@constants/config';
  import util, {JSBridge} from '@util';
  import network from '@services';
  import outpath from '@constants/outpath';
  import validate from '@util';
  export default {
    name: 'queryDetails',
    components: {
      Group,
      Cell,
      XButton,
      XInput,
      PopupPicker,
      Datetime,
      XTextarea
    },
    activated(){
      JSBridge({code: 'setTitle', title: '完善车主信息'});
    },
    data: function () {
      const {SaveQuote,UserInfo}=this.$route.params.data;
      return {
        LicenseOwner:UserInfo.LicenseOwner,
        contactWay:UserInfo.contactWay,
        OwnerIdCardType:['1'],
        docInfo: UserInfo.docInfo||'',
        LicenseNo:UserInfo.LicenseNo,
        CarVin:UserInfo.CarVin,
        EngineNo:UserInfo.EngineNo,
        ModleName:UserInfo.ModleName,
        RegisterDate:UserInfo.RegisterDate,
        ForceExpireDate:UserInfo.ForceExpireDate,
        BusinessExpireDate:UserInfo.BusinessExpireDate,
        remark:UserInfo.remark,
        fourSName:UserInfo.customerName,
        IdCardOptions:IdCardOptions
      }
    },
    methods:{
      updateOwner(){
        if(!this.docInfo){
          this.$vux.toast.show({
            text: '请输入车主证件号',
            type: 'text',
            width: '60%',
            time: 3000
          });
          return false
        }
        if(!this.checkCardNum(this.docInfo,this.OwnerIdCardType).valid){
          this.$vux.toast.show({
            text: '请填写正确的车主证件号',
            type: 'text',
            width: '60%',
            time: 3000
          });
          return false
        }
        if(!this.checkPhone(this.contactWay).valid){
          this.$vux.toast.show({
            text: '请填写正确的被保人手机号',
            type: 'text',
            width: '60%',
            time: 3000
          });
          return false
        }
        let params={
          id:JSBridge('getOwnerId'),
          plateNum:this.LicenseNo,
          vinNo:this.CarVin,
          brandModel:this.ModleName,
          engineNum:this.EngineNo,
          ownerName:this.LicenseOwner,
          contactWay:this.contactWay,
          initialDate:this.RegisterDate,
          clivtaExp:this.ForceExpireDate,
          viExp:this.BusinessExpireDate,
          remark:this.remark,
          docInfo:this.docInfo.trim(),
        };
        network.post(outpath.UPDATE_CAR_OWNER_INFO,params).then(res=>{
          if(res&&res.ok){
            this.$vux.toast.show({
              text: '保存成功',
              type: 'text',
              width: '60%',
              time: 2000
            });
            setTimeout(()=>{
              this.$router.push({
                name:'queryDetails',
                params:{
                  ownerInfo:{
                    data:{
                      UserInfo:{
                        ...this.$route.params.data.UserInfo,
                        LicenseNo:this.LicenseNo,
                        CarVin:this.CarVin,
                        ModleName:this.ModleName,
                        EngineNo:this.EngineNo,
                        LicenseOwner:this.LicenseOwner,
                        RegisterDate:this.RegisterDate,
                        ForceExpireDate:this.ForceExpireDate,
                        BusinessExpireDate:this.BusinessExpireDate,
                        remark:this.remark,
                        docInfo:this.docInfo
                      },
                      SaveQuote:{
                       ...this.$route.params.data.SaveQuote,
                      }
                    }
                  }
                }
              })
            },2000)
          }else{
            this.$vux.toast.show({
              text: res.message,
              type: 'text',
              width: '60%',
              time: 2000
            });
          }
        })
      },
      checkCardNum(value, type) {
        if (type[0] === '') {
          return {
            valid: false,
            msg: '请先选择证件类型'
          }
        }
        if(type[0] === '1'){
          return {
            valid: validate.cardIdValid(value.trim()),
            msg: '请输入正确的证件号'
          }
        }else{
          return {
            valid: true,
            msg: ''
          }
        }
      },
      cardOptionsChange(v,card){
        this[card]=' '+this[card];
      },
      checkPhone(value) {
        if(!value){
          return {
            valid: true,
            msg: ''
          }
        }
        return {
          valid: validate.phoneValid(value),
          msg: '请输入正确电话号'
        }
      },
    }
  }
</script>
<style lang="less">
  @import './AddUser';
</style>
