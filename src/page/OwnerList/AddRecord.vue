<template>
  <div class="addRecord">
    <textarea maxlength="200" cols="30" rows="10" placeholder="请输入跟进记录，限制200字。" v-model="recordContent"></textarea>
    <group>
      <datetime
        format="YYYY-MM-DD HH:mm"
        v-model="appointmentTime"
        title="下次回访时间"
        placeholder="请选择下次回访时间"
      ></datetime>
    </group>
    <x-button class="scrm-btn" @click.native="submit">保存</x-button>
  </div>
</template>
<script>
  import { Datetime, Group,  XButton} from 'vux'
  import {JSBridge} from '@util';
  import outpath from '@constants/outpath';
  import network from '@services';
  export default {
    components:{
      Datetime, Group,  XButton
    },
    activated(){
      JSBridge({code: 'setTitle', title: '添加记录'});
      this.appointmentTime='';
      this.recordContent='';
    },
    data(){
      return {
        appointmentTime:'',
        recordContent:'',
      }
    },
    methods:{
      submit(){
        if(!this.recordContent){
        return this.$vux.toast.show({
            text: '请输入回访内容',
            type: 'text',
            width: '60%',
            time: 3000
          })
        }
        if(!this.appointmentTime){
          return this.$vux.toast.show({
            text: '请选择下次回访时间',
            type: 'text',
            width: '60%',
            time: 3000
          })
        }
        network.post(outpath.RENEWAL_INSERT_RECORD,{
          ownerId:JSBridge('getOwnerId'),
          // ownerId:480,
          appointmentTime:this.appointmentTime+':00',
          recordContent:this.recordContent
        }).then(res=>{
          if(res&&res.ok){
            this.$vux.toast.show({
              text: '保存成功',
              type: 'text',
              width: '60%',
              time: 2000
            })
          }
          setTimeout(()=>{
            JSBridge({code:'setBackStatus',status:'5'})
          },2000)
        })
      }
    }
  }
</script>
<style lang="less">
  @import "AddRecord";
</style>
