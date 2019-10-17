<template>
  <div id="app">
    <transition :name="viewTransition" :css="!!direction">
      <keep-alive>
        <router-view class="router-view"></router-view>
      </keep-alive>
    </transition>
  </div>
</template>

<script>
  import { mapState } from 'vuex'
  export default {
    name: 'app',
    data() {
      return {
        transitionName: ''
      }
    },
    computed:{
      ...mapState({
        direction: state => state.h5vue.direction
      }),
      viewTransition () {
        if (!this.direction) return '';
        return 'vux-pop-' + (this.direction === 'forward' ? 'in' : 'out')
      }
    },
  }
</script>

<style lang="less">
  @import "./App";
</style>
