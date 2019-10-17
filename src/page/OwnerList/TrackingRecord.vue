<template>
  <div class="trackingRecord">
    <timeline-item
      v-for="i in timelineData"
      :year="i.year"
      :date="i.date"
      :content="i.recordContent"
      v-if="i.recordContent"
    ></timeline-item>
    <img v-if="!timelineData.length" src="./../../assets/bgnone.png" class="trackingRecord-none" alt="">
    <div v-if="!timelineData.length" class="trackingRecord-text">您访问的页面暂无数据！</div>
  </div>
</template>
<script>
  import TimelineItem from "@components/TimelineItem/index.vue";
  import {JSBridge} from '@util';
  import outpath from '@constants/outpath';
  import network from '@services';

  export default {
    components: {
      TimelineItem
    },
    activated(){
      JSBridge({code: 'setTitle', title: '跟踪记录'});
      this.getTimelineItem();
    },
    data(){
      return {
        timelineData:[]
      }
    },
    methods: {
      getTimelineItem() {
        let ownerId = JSON.parse(JSBridge('getOwnerId'));
        network.get(outpath.RENEWAL_MANAGE_RECORD_QUERY, {ownerId}).then(res => {
          if(res&&res.ok&&res.respCode==='0'){
            res.data.forEach(i=>{
              let yd=i.recordTime.split(' ')[0].split('-');
              i.year=yd[0];
              i.date=`${yd[1]}/${yd[2]}`;
            });
            this.timelineData=res.data;
          }
        })
      }
    }
  }
</script>
<style lang="less">
  @import './TrackingRecord.less';
</style>
