<template>
  <div class="quoteComp">
    <group>
      <div style="position: relative; width: 100%; height: auto;">
        <img src="../../assets/tpyIcon.png" width="19"
             style="margin:0.015rem 0.08rem 0 0; position: absolute;top: 0.08rem;left: 0.16rem;z-index: 10;"/>
        <checklist class="quoteComp-checker"
                   label-position="left"
                   :options="[{key:'1',value:'太平洋车险'}]"
                   v-model="QuoteGroup"
        ></checklist>
      </div>
      <div style="position: relative; width: 100%; height: auto;">
        <img src="../../assets/rbIcon.png" width="19"
             style="margin:0.015rem 0.08rem 0 0; position: absolute;top: 0.08rem;left: 0.16rem;z-index: 10;"/>
        <checklist class="quoteComp-checker"
                   label-position="left"
                   :options="[{key:'4',value:'人保车险'}]"
                   v-model="QuoteGroup"
        ></checklist>
      </div>
      <div style="position: relative; width: 100%; height: auto;">
        <img src="../../assets/zgrsIcon.png" width="19"
             style="margin:0.015rem 0.08rem 0 0; position: absolute;top: 0.08rem;left: 0.16rem;z-index: 10;"/>
        <checklist class="quoteComp-checker"
                   label-position="left"
                   :options="[{key:'8',value:'中国人寿财险'}]"
                   v-model="QuoteGroup"
        ></checklist>
      </div>
      <div style="position: relative; width: 100%; height: auto;">
        <img src="../../assets/payhIcon.png" width="19"
             style="margin:0.015rem 0.08rem 0 0; position: absolute;top: 0.08rem;left: 0.16rem;z-index: 10;"/>
        <checklist class="quoteComp-checker"
                   label-position="left"
                   :options="[{key:'2',value:'平安车险'}]"
                   v-model="QuoteGroup"
        ></checklist>
      </div>
    </group>
    <x-button class="scrm-btn" @click.native="submit">提交报价</x-button>
  </div>
</template>
<script>
  import {Checklist, Group, XButton} from 'vux';
  import outpath from '@constants/outpath';
  import network from '@services';
  import {JSBridge} from "@util";
  export default {
    components: {
      Checklist,
      Group,
      XButton
    },
    data() {
      return {
        QuoteGroup: [],
        routeParams:this.$route.params,
      }
    },
    activated() {
      JSBridge({code:'setTitle',title:'选择保险公司'});
      if(!Object.keys(this.$route.params).length){
        return false
      }
      this.routeParams=this.$route.params
    },
    methods: {
      submit() {
        if (!this.QuoteGroup.length) {
          this.$vux.toast.show({
            text: '请选择需要报价的保险公司',
            type: 'text',
            width: '60%',
            time: 3000
          });
          return false
        }
        let params = {
          ...this.routeParams,
          QuoteGroup: this.QuoteGroup.reduce((t, i) => t + Number(i), 0),
        };
        network.get(outpath.GET_BH_POST_PRECISE, params).then(res => {
          if (res && res.respCode === '0' && res.ok) {
            this.$router.push({
              name: 'quotationResult',
              params: {
                ...params,
                QuoteGroups: this.QuoteGroup,
              }
            })
          }else{
            setTimeout(()=>{
              this.$router.push({
                name: 'queryDetails'
              })
            },3000)
          }
        });
      }
    }
  }
</script>
<style lang="less">
  @import "./QuoteComp";
</style>
