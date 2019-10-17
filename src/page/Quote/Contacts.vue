<template>
  <div class="Contacts">
    <div class="Contacts-card">
      <div class="Contacts-card-tit scrm-title-prefix vux-1px-b">车主信息</div>
      <group>
        <x-input
          title="车主姓名"
          placeholder="请输入车主姓名"
          text-align="right"
          placeholder-align="right"
          v-model="CarOwnersName"
          :is-type="checkName"
        ></x-input>
        <popup-picker
          class="Contacts-picker"
          title="证件类型"
          :data="IdCardOptions"
          placeholder="请选择证件类型"
          :columns="1"
          show-name
          v-model="OwnerIdCardType"
          @on-change="(v)=>cardOptionsChange(v,'IdCard')"
        ></popup-picker>
        <x-input
          title="证件号码"
          placeholder="请输入证件号码"
          text-align="right"
          placeholder-align="right"
          v-model="IdCard"
          :is-type="(v)=>checkCardNum(v,OwnerIdCardType)"
        ></x-input>
      </group>
    </div>
    <div class="Contacts-card" style="margin-top:0.09rem">
      <div class="Contacts-card-tit scrm-title-prefix vux-1px-b">
        <span>被保人信息</span>
      </div>
      <group>
        <x-input
          title="被保人姓名"
          placeholder="请输入被保人姓名"
          text-align="right"
          placeholder-align="right"
          v-model="InsuredName"
          :is-type="checkName"
        ></x-input>
        <popup-picker
          class="Contacts-picker"
          title="证件类型"
          :data="IdCardOptions"
          placeholder="请选择类型"
          :columns="1"
          show-name
          v-model="InsuredIdType"
          @on-change="(v)=>cardOptionsChange(v,'InsuredIdCard')"
        ></popup-picker>
        <x-input
          title="证件号码"
          placeholder="请输入证件号码"
          text-align="right"
          placeholder-align="right"
          v-model="InsuredIdCard"
          :is-type="(v)=>checkCardNum(v,InsuredIdType)"
        ></x-input>
        <x-input
          title="手机号"
          placeholder="请输入手机号"
          text-align="right"
          placeholder-align="right"
          :is-type="checkPhone"
          v-model="InsuredMobile"
        ></x-input>
        <x-input
          title="邮箱地址"
          placeholder="请输入邮箱地址"
          text-align="right"
          placeholder-align="right"
          v-model="InsuredEmail"
          :is-type="checkEmail"
        ></x-input>
      </group>
    </div>
    <div class="Contacts-card" style="margin-top:0.09rem">
      <div class="Contacts-card-tit scrm-title-prefix hasSwitch vux-1px-b">
        <span>投保人同被保人</span>
        <inline-x-switch v-model="isSameHolder" :value-map="['0','1']"></inline-x-switch>
      </div>
      <group v-if="isSameHolder==='0'">
        <x-input
          title="投保人姓名"
          placeholder="请输入车牌号"
          text-align="right"
          placeholder-align="right"
          v-model="HolderName"
          :is-type="checkName"
        ></x-input>
        <popup-picker
          class="Contacts-picker"
          title="证件类型"
          :data="IdCardOptions"
          placeholder="请选择类型"
          :columns="1"
          show-name
          v-model="HolderIdType"

        ></popup-picker>
        <x-input
          title="证件号码"
          placeholder="请输入证件号码"
          text-align="right"
          placeholder-align="right"
          v-model="HolderIdCard"
        ></x-input>
        <x-input
          title="手机号"
          placeholder="请输入手机号"
          text-align="right"
          placeholder-align="right"
          v-model="HolderMobile"
          :is-type="checkPhone"
        ></x-input>
        <x-input
          title="邮箱地址"
          placeholder="请输入邮箱地址"
          text-align="right"
          placeholder-align="right"
          v-model="HolderEmail"
          :is-type="checkEmail"
        ></x-input>
      </group>
    </div>
    <x-button class="scrm-btn" @click.native="nextStep">下一步</x-button>
  </div>
</template>
<script>
  import {Group, InlineXSwitch, PopupPicker, XButton, XInput, XSwitch} from 'vux';
  import {IdCardOptions} from '@constants/config';
  import validate from '@util';
  import {JSBridge} from "@util";
  export default {
    components: {
      Group,
      InlineXSwitch,
      XInput,
      PopupPicker,
      XButton,
      XSwitch
    },
    data() {
      const {params} = this.$route;
      return {
        routeParams:params,
        isSameHolder: '1',
        IdCardOptions: IdCardOptions,//证件类型选项
        //车主
        CarOwnersName: params.LicenseOwner,//车主姓名
        IdCard: params.CredentislasNum,//车主证件号
        OwnerIdCardType: [(params.IdType || '1') + ''],//车主证件类型
        //被保人
        InsuredName: params.InsuredName,//被保人姓名
        InsuredMobile: params.InsuredMobile||'17612235899',//被保人手机
        InsuredEmail: '1124620308@qq.com',//被保人邮箱
        InsuredIdCard: params.InsuredIdCard,//被保人证件号
        InsuredIdType: [(params.InsuredIdType || '1') + ''],//被保人证件类型
        // 投保人
        HolderName: params.PostedName,//投保人姓名
        HolderIdType: [(params.HolderIdType || '1') + ''],//投保人证件类型
        HolderIdCard: params.HolderIdCard,//投保人证件号
        HolderMobile: params.HolderMobile,//投保人手机号
        HolderEmail: '',//投保人邮箱
      }
    },
    activated(){
      JSBridge({code:'setTitle',title:'关系人信息'});
      // keepAlive时重新赋值
      if(!Object.keys(this.$route.params).length){
        return false
      }
      const {params} = this.$route;
      this.routeParams=this.$route.params;
      //车主
      this.CarOwnersName=params.LicenseOwner;//车主姓名
      this.IdCard=params.CredentislasNum;//车主证件号
      this.OwnerIdCardType=[(params.IdType || '1') + ''];//车主证件类型
      // 被保人
      this.InsuredName=params.InsuredName;//被保人姓名
      this.InsuredMobile=params.InsuredMobile||'17612235899';//被保人手机
      this.InsuredIdCard=params.InsuredIdCard;//被保人证件号
      this.InsuredIdType=[(params.InsuredIdType || '1') + ''];//被保人证件类型
      // 投保人
      this.HolderName=params.PostedName;//投保人姓名
      this.HolderIdCard=params.HolderIdCard;//投保人证件号
      this.HolderMobile=params.HolderMobile;//投保人手机号
      this.HolderIdType=[(params.HolderIdType || '1') + ''];//投保人证件类型
    },
    methods: {
      nextStep() {
        if (this.isSameHolder === '1') {
          this.HolderName = this.InsuredName;
          this.HolderIdType = this.InsuredIdType;
          this.HolderIdCard = this.InsuredIdCard;
          this.HolderEmail = this.InsuredEmail;
          this.HolderMobile = this.InsuredMobile;
        }
        if(!this.validateForm()){
          return false
        }
        let params = {
          ...this.routeParams,
          CarOwnersName: this.CarOwnersName,
          IdCard: this.IdCard.trim(),
          OwnerIdCardType: this.OwnerIdCardType[0],
          InsuredName: this.InsuredName,
          InsuredMobile: this.InsuredMobile,
          InsuredEmail: this.InsuredEmail,
          InsuredIdCard: this.InsuredIdCard.trim(),
          InsuredIdType: this.InsuredIdType[0],
          HolderName: this.HolderName,
          HolderIdType: this.HolderIdType[0],
          HolderIdCard: this.HolderIdCard.trim(),
          HolderMobile: this.HolderMobile,
          HolderEmail: this.HolderEmail,
          interfaceData:{
            ...this.routeParams.interfaceData,
            UserInfo:{
              ...this.routeParams.interfaceData.UserInfo,
              CarOwnersName: this.CarOwnersName,
              IdCard: this.IdCard.trim(),
              OwnerIdCardType: this.OwnerIdCardType[0],
              InsuredName: this.InsuredName,
              InsuredMobile: this.InsuredMobile,
              InsuredEmail: this.InsuredEmail,
              InsuredIdCard: this.InsuredIdCard.trim(),
              InsuredIdType: this.InsuredIdType[0],
              HolderName: this.HolderName,
              HolderIdType: this.HolderIdType[0],
              HolderIdCard: this.HolderIdCard.trim(),
              HolderMobile: this.HolderMobile,
              HolderEmail: this.HolderEmail,
            }
          },
        };
        this.$router.push({
          name: 'quoteComp',
          params: params
        })
      },
      validateForm(){
        let arr=[
          this.CarOwnersName,
          ...this.OwnerIdCardType,
          this.IdCard.trim(),
          this.InsuredName,
          ...this.InsuredIdType,
          this.InsuredIdCard.trim(),
          this.InsuredMobile,
          this.InsuredEmail,
          this.HolderName,
          ...this.HolderIdType,
          this.HolderIdCard.trim(),
          this.HolderMobile,
          this.HolderEmail,
        ];
        let valArr=arr.filter(i=>!!i);
        if(valArr.length!==arr.length){
          this.$vux.toast.show({
            text: '请将信息填写完整',
            type: 'text',
            width: '60%',
            time: 3000
          });
          return false
        }
        if(!this.checkName(this.CarOwnersName).valid){
          this.$vux.toast.show({
            text: '请填写正确的车主姓名',
            type: 'text',
            width: '60%',
            time: 3000
          });
          return false
        }
        if(!this.checkCardNum(this.IdCard,this.OwnerIdCardType).valid){
          this.$vux.toast.show({
            text: '请填写正确的车主证件号',
            type: 'text',
            width: '60%',
            time: 3000
          })
          return false
        }
        if(!this.checkName(this.InsuredName).valid){
          this.$vux.toast.show({
            text: '请填写正确的被保人姓名',
            type: 'text',
            width: '60%',
            time: 3000
          });
          return false
        }
        if(!this.checkCardNum(this.InsuredIdCard,this.InsuredIdType).valid){
          this.$vux.toast.show({
            text: '请填写正确的被保人证件号',
            type: 'text',
            width: '60%',
            time: 3000
          })
          return false
        }
        if(!this.checkName(this.HolderName)){
          this.$vux.toast.show({
            text: '请填写正确的投保人姓名',
            type: 'text',
            width: '60%',
            time: 3000
          });
          return false
        }
        if(!this.checkCardNum(this.HolderIdCard,this.HolderIdType).valid){
          this.$vux.toast.show({
            text: '请填写正确的投保人证件号',
            type: 'text',
            width: '60%',
            time: 3000
          })
          return false
        }
        if(!this.checkPhone(this.InsuredMobile).valid){
          this.$vux.toast.show({
            text: '请填写正确的被保人手机号',
            type: 'text',
            width: '60%',
            time: 3000
          })
          return false
        }
        if(!this.checkPhone(this.HolderMobile).valid){
          this.$vux.toast.show({
            text: '请填写正确的投保人手机号',
            type: 'text',
            width: '60%',
            time: 3000
          })
          return false
        }
        if(!this.checkEmail(this.InsuredEmail).valid){
          this.$vux.toast.show({
            text: '请填写正确的被保人邮箱',
            type: 'text',
            width: '60%',
            time: 3000
          })
          return false
        }
        if(!this.checkEmail(this.HolderEmail).valid){
          this.$vux.toast.show({
            text: '请填写正确的投保人邮箱',
            type: 'text',
            width: '60%',
            time: 3000
          });
          return false
        }
        return true
      },
      checkPhone(value) {
        return {
          valid: validate.phoneValid(value),
          msg: '请输入正确电话号'
        }
      },
      cardOptionsChange(v,card){
        this[card]=' '+this[card];
      },
      checkEmail(value) {
        return {
          valid: validate.emailValid(value),
          msg: '请输入正确的邮箱'
        }
      },
      checkName(v){
        return {
          valid: validate.nameValid(v),
          msg: '请输入正确的姓名'
        }
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
      }
    }
  }
</script>
<style lang="less">
  @import 'Contacts';
</style>
