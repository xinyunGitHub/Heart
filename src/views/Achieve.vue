<template>
  <div class="achieve">
    <!--【顶部】-->
    <div class="achieve-trade">
      <h3>交易成功</h3>
      <img src="@/assets/image/achieve-trade.png" alt="">
    </div>
    <van-cell-group>
      <!--【发货状态】-->
      <van-cell
        title="发货中"
        label="2020-10-22 12:00:10"
        center
      >
        <template #icon>
          <img class="achieve-flow" src="@/assets/image/achieve-flow.png" alt="">
        </template>
      </van-cell>
      <!--【用户信息】-->
      <van-cell
        title="lxm 13173283"
        label="上海市长宁区上海市长宁区"
        center
      >
        <template #icon>
          <img class="achieve-local" src="@/assets/image/achieve-local.png" alt="">
        </template>
      </van-cell>
    </van-cell-group>
    <!--【商品信息】-->
    <van-card
      v-if="goodsInfo.title"
      :num="goodsInfo.count"
      :desc="'已选规格: ' + goodsInfo.gather"
      class="order-item"
      style="background-color: #ffffff;"
      :thumb="goodsInfo.picture"
    >
      <template #title>
        <h3 class="goods-card">{{ goodsInfo.title }}</h3>
      </template>
      <template #price>
        <div class="goods-price">
          <em>¥ </em>
          <strong>{{ goodsInfo.price }}</strong>
        </div>
      </template>
    </van-card>
  </div>
</template>

<script>
import Vue from 'vue';
import { Card, Cell, CellGroup } from 'vant';
Vue.use(Card);
Vue.use(Cell);
Vue.use(CellGroup);
import { waterOrder } from './../assets/api/order.js'
import { getItem } from './../assets/js/apputils.js'
export default {
  name: 'Achieve',
  data() {
    return {
      goodsInfo: this.$store.getters.getOrderList,
    }
  },
  created() {
    this.achieveData();
    console.log(this.goodsInfo, 'goodsInfo');
  },
  methods: {
    async achieveData() {
      let params = {
        water: this.$store.getters.getWaterCode,
        openid: getItem('userInfo').openid,
      };
      let result = await waterOrder(params);
      console.log(result)
    }
  }
}
</script>

<style lang="less" scoped>
.achieve {
  position: relative;
  width: 100%;
  min-height: 100vh;
  background-color: #f5f5f5;
  .achieve-trade {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    width: 100%;
    height: 108px;
    background-color: #ee0a3b;
    > h3 {
      margin: 0 0 0 28px;
      font-size: 15px;
      color: #ffffff;
      font-weight: 400;
    }
    > img {
      margin: 0 42px 0 0;
      width: 68px;
      height: 68px;
    }
  }
  .achieve-flow {
    margin: 0 8px 0 0;
    width: 24px;
    height: 24px;
    border-radius: 50px;
  }
  .achieve-local {
    margin: 0 8px 0 0;
    width: 24px;
    height: 24px;
    border-radius: 50px;
  }
  .order-item {
    border-radius: 8px;
    overflow: hidden;
  }
  .goods-card {
    font-size: 16px;
    color: #333333;
    font-weight: 400;
  }
  .goods-price {
    > em {
      font-size: 14px;
      color: #333333;
      font-weight: 400;
    }
    > strong {
      font-size: 16px;
      color: #333333;
      font-weight: 400;
    }
  }
}
</style>