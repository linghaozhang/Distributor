<template>
  <div class="checkCar">
    <div class="checkCar-tit scrm-title-prefix">
      选择报价车型
    </div>
    <group>
      <checklist class="checkCar-checker"
                 label-position="left"
                 :options="checkList"
                 v-model="carType"
                 :max='1'
      ></checklist>
    </group>
    <x-button class="scrm-btn" @click.native="submitCarType">确认车型</x-button>
  </div>
</template>
<script>
  import {Checklist, Group, XButton} from 'vux';
  import {JSBridge} from "@util";

  export default {
    components: {
      Checklist,
      Group,
      XButton
    },
    data() {
      const {Items}=this.$route.params.checkList.data;
      JSBridge({code:'setTitle',title:'车型校验'});
      return {
        carType: [''],
        checkList:Items.map((i,n)=>({
            value:`${i.VehicleNo}/${i.VehicleName}/${i.VehicleAlias}/${i.VehicleExhaust}/${i.VehicleSeat}/${i.PurchasePrice}/${i.VehicleYear}`,
            key:''+n
          }
        )),
        routeParams:this.$route.params
      }
    },
    methods: {
      submitCarType(){
        const {Items}=this.routeParams.checkList.data;
        const { UserInfo }=this.routeParams.data;
        if(this.carType[0]){
          this.routeParams.data.UserInfo={
            ...UserInfo,
            // ModleName:Items[this.carType].VehicleName,
            SeatCount:Items[this.carType].VehicleSeat,
            ExhaustScale:Items[this.carType].VehicleExhaust,
            VehicleAlias:Items[this.carType].VehicleAlias,
            AutoMoldCode:Items[this.carType].VehicleNo,
            VehicleYear:Items[this.carType].VehicleYear,
            PurchasePrice:Items[this.carType].PurchasePrice,
          };
          this.$router.push({
            name:'chooseInsurance',
            params:{
              data:this.routeParams.data,
              carType:this.carType[0]
            }
          })
        }else{
          this.$vux.toast.show({
            text: '请选择车型',
            type: 'text',
            width: '60%',
            time: 3000
          })
        }
      }
    }
  }
</script>
<style lang="less">
  @import "./CheckCar";
</style>
