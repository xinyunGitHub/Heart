<template>
  <div class="order">
    <!--【底色】-->
    <div class="order-circle"></div>
    <!--【地址信息】-->
    <template v-if="addressInfo.address">
      <van-cell
        class="order-item"
        :title="addressInfo.address"
        size="large"
        :label="addressInfo.contact"
        center
        is-link
        to="/address"
      />
    </template>
    <template v-else>
      <van-cell
        class="order-item order-empty"
        title=""
        size="large"
        label="暂无收获地址，快去添加吧～"
        center
        is-link
        to="/address"
      />
    </template>
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
    <!--【用户留言】-->
    <van-field
      v-model="message"
      rows="2"
      autosize
      label="留言"
      type="textarea"
      maxlength="50"
      placeholder="请输入留言"
      show-word-limit
      class="order-quality order-item"
    />
    <!--【品质保障】-->
    <van-cell-group class="order-quality order-item">
      <van-cell title="正品保障" />
      <van-cell title="运费: 包邮" />
      <van-cell title="7天无理由退货" />
    </van-cell-group>
    <!--【提交订单】-->
    <van-submit-bar
      :price="amount"
      :decimal-length="0"
      button-text="提交订单"
      @submit="onPay"
    >
    <template #price>
      <span>sd</span>
    </template>
    </van-submit-bar>
  </div>
</template>

<script>
import Vue from 'vue';
import { Cell, CellGroup, Card, Field, SubmitBar, Toast } from 'vant';
Vue.use(Cell);
Vue.use(CellGroup);
Vue.use(Card);
Vue.use(Field);
Vue.use(SubmitBar);
import { addressOrder, inventoryOrder } from './../assets/api/order.js'
import { getItem } from './../assets/js/apputils.js'
export default {
  name: 'Order',
  data() {
    return {
      addressInfo: {
        address: '',
        contact: '.'
      },
      goodsInfo: this.$store.getters.getOrderList,
      message: '',
      amount: this.$store.getters.getOrderList.price * this.$store.getters.getOrderList.count * 100
    }
  },
  created() {
    this.userAddress();
  },
  methods: {
    async userAddress() {
      let params = {
        openid: getItem('userInfo').openid,
      };
      let result = await addressOrder(params);
      if (result.status) {
        this.addressInfo = result.data;
      } else {
        Toast.fail(result.message);
      }
    },
    onPay() {
      console.log('onPay', this.addressInfo, this.goodsInfo, this.amount);
      this.onInventory();
    },
    async onInventory() { // 生成订单
      let params = {
        openid: getItem('userInfo').openid,
        addressId: this.addressInfo.id,
        gather: this.goodsInfo.gather,
        count: this.goodsInfo.count,
        price: this.goodsInfo.price,
        goodsId: this.goodsInfo.id,
        unique: this.goodsInfo.unique,
        amount: parseInt(this.amount / 100)
      };
      let result = await inventoryOrder(params);
      if (result.status) {
        this.$store.commit('setWaterCode', result.data);
        this.$router.push({
          name: 'Achieve'
        });
      }
    }
  }
}
</script>

<style lang="less" scoped>
.order {
  position: relative;
  padding: 20px 10px;
  width: 100%;
  min-height: 100vh;
  background-color: #f5f5f5;
  .order-circle {
    position: absolute;
    top: 0%;
    left: 50%;
    width: 420px;
    height: 180px;
    background-color: #ee0a24;
    border-radius: 500px;
    transform: translate(-50%, -50%);
  }
  .order-quality {
    margin: 18px 0 0 0;
  }
  .order-item {
    border-radius: 8px;
    overflow: hidden;
  }
  .order-empty {
    padding: 24px 16px;
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