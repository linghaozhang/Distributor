<template>
  <div class="trackingTimeline">
    <div class="trackingTimeline-item">
      <div class="trackingTimeline-item-l">
        <div class="trackingTimeline-item-l-date">
          <div class="year">{{year}}</div>
          <div class="md">{{date}}</div>
        </div>
      </div>
      <div class="trackingTimeline-item-r">
        <div class="trackingTimeline-container vux-1px-l">
          <img src="./../../assets/tmi.png" class="tmi" alt="">
          <img src="./../../assets/tma.png" class="tma" alt="">
          <div class="trackingTimeline-content">
            <!--<div class="trackingTimeline-content-title">{{status}}</div>-->
            {{content}}
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>

  export default {
    name:'timeline-item',
    props:{
      year:String,
      date:String,
      // status:String,
      content:String
    }
  }
</script>
<style lang="less">
  @import './index.less';
</style>
