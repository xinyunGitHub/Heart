<template>
  <div class="home">
    <van-swipe class="home-swipe" :autoplay="3000" indicator-color="white">
      <van-swipe-item v-for="(item, index) in swiperData" :key="index">
        <img v-lazy="item.image" />
      </van-swipe-item>
    </van-swipe>
    <van-tabs v-model="active" animated swipeable sticky>
      <van-tab title="标签 1">
        <van-list v-model="loading" :finished="finished" finished-text="没有更多啦" @load="tabsData">
          <van-grid :gutter="10" column-num="2" class="home-grid">
            <van-grid-item  v-for="(item, index) in chinaData" :key="index" class="home-item" @click="onDetail(item.unique)">
              <van-image :src="baseUrl + 'storage/' + item.thumb" />
              <div class="home-inform">
                <h3>
                  <em>{{ item.tally }}</em>
                  {{ item.title }}
                </h3>
                <span>¥{{ item.price }}</span>
              </div>
            </van-grid-item>
          </van-grid>
        </van-list>
      </van-tab>
      <van-tab title="标签 2">
        <van-list v-model="loading" :finished="finished" finished-text="没有更多啦" @load="tabsData">
          <van-grid :gutter="10" column-num="2" class="home-grid">
            <van-grid-item  v-for="(item, index) in yearData" :key="index" class="home-item" @click="onDetail(item.unique)">
              <van-image :src="baseUrl + 'storage/' + item.thumb" />
              <div class="home-inform">
                <h3>
                  <em>{{ item.tally }}</em>
                  {{ item.title }}
                </h3>
                <span>¥{{ item.price }}</span>
              </div>
            </van-grid-item>
          </van-grid>
        </van-list>
      </van-tab>
    </van-tabs>
  </div>
</template>

<script>
import Vue from 'vue';
import { Swipe, SwipeItem, Lazyload, Tab, Tabs, List, Grid, GridItem, Image as VanImage } from 'vant';
Vue.use(Swipe);
Vue.use(SwipeItem);
Vue.use(Lazyload);
Vue.use(Tab);
Vue.use(Tabs);
Vue.use(List);
Vue.use(Grid);
Vue.use(GridItem);
Vue.use(VanImage);
import './../assets/css/home.less'
import { homeTabs } from './../assets/api/home.js'
export default {
  name: 'Home',
  data() {
    return {
      baseUrl: process.env.VUE_APP_SERVICE,
      swiperData: [
        {id: 1, image: '', url: ''},
        {id: 1, image: '', url: ''},
      ],
      loadGoods: true,
      chinaData: [],
      yearData: [],
      loading: false,
      finished: false,
      active: 0,
    };
  },
  methods: {
    async tabsData() {
      if (this.loadGoods) {
        this.loadGoods = false;
        let result = await homeTabs();
        if (result.status) {
          this.chinaData = result.data.filter(item => item.type == 0);
          this.yearData = result.data.filter(item => item.type == 1);
          this.loading = true;
          this.finished = true;
        }
      }
    },
    onDetail(unique) {
      this.$router.push({
        name: 'Detail',
        query: {
          unique: unique
        }
      });
    }
  }
}
</script>

<style lang="less" scoped>
.home {
  position: relative;
  width: 100%;
  min-height: 100vh;
  background-color: #f5f5f5;
  .home-swipe {
    width: 100%;
    height: 2.5rem;
    background-color: #39a9ed;
    .van-swipe-item {
      width: 100%;
      height: 2.5rem;
      > img {
        width: 100%;
        height: 2.5rem;
      }
    }
  }
}
</style>

