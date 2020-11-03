<template>
  <div class="detail">
    <!--【banner图】-->
    <van-swipe class="detail-swipe" :autoplay="3000" indicator-color="white">
      <van-swipe-item v-for="(item, index) in figureData" :key="index">
        <img v-lazy="baseUrl + 'storage/' + item.figure" />
      </van-swipe-item>
    </van-swipe>
    <!--【商品标题和价格】-->
    <van-cell-group>
      <van-cell :value="'零售价: ¥' + informData.price" :border="false" value-class="detail-price" />
      <van-cell :value="informData.title" :border="false" value-class="detail-title" />
    </van-cell-group>
    <van-cell-group class="detail-quality">
      <van-cell title="运费: 包邮" />
      <van-cell title="正品保障" />
    </van-cell-group>
    <!--【商品详情】-->
    <van-cell-group class="detail-message">
      <van-cell title="商品详情" :border="false" />
      <template v-for="(item, index) in thumbData">
        <img :key="index" v-lazy="baseUrl + 'storage/' + item.describe" />
      </template>
      <van-divider>没有更多啦</van-divider>
    </van-cell-group>
    <!--【Sku】-->
    <van-sku
      v-model="skuDialog"
      :sku="sku"
      :goods="informData"
      :goods-id="informData.unique"
      :quota="0"
      :quota-used="0"
      :hide-stock="false"
      @buy-clicked="goBuy"
    />
    <!--【底部固定栏】-->
    <van-goods-action>
      <van-goods-action-icon icon="chat-o" text="客服" @click="getCustom" />
      <van-goods-action-icon icon="shop-o" text="店铺" @click="routeHome" />
      <van-goods-action-button
        type="danger"
        text="立即购买"
        @click="prepareBuy"
      />
    </van-goods-action>
  </div>
</template>

<script>
import Vue from 'vue';
import { Swipe, SwipeItem, Lazyload, Cell, CellGroup, Divider, GoodsAction, GoodsActionIcon, GoodsActionButton, Sku } from 'vant';
Vue.use(Swipe);
Vue.use(SwipeItem);
Vue.use(Lazyload);
Vue.use(Cell);
Vue.use(CellGroup);
Vue.use(Divider);
Vue.use(Sku);
Vue.use(GoodsAction);
Vue.use(GoodsActionButton);
Vue.use(GoodsActionIcon);
import { goodsDetail, goodsSku } from './../assets/api/detail.js'
export default {
  name: 'Detail',
  data() {
    return {
      baseUrl: process.env.VUE_APP_SERVICE,
      figureData: [],
      informData: {},
      thumbData: [],
      skuDialog: false,
      sku: {
        tree: [],
        list: [
          {
            id: 2259, // skuId
            3: 3, // 规格类目 k_s 为 s1 的对应规格值 id
            4: 6, // 规格类目 k_s 为 s2 的对应规格值 id
            price: 100, // 价格（单位分）
            stock_num: 110 // 当前 sku 组合对应的库存
          }
        ],
        price: '1.00', // 默认价格（单位元）
        stock_num: 100, // 商品总库存
        collection_id: 2261, // 无规格商品 skuId 取 collection_id，否则取所选 sku 组合对应的 id
        none_sku: false, // 是否无规格商品
      }
    }
  },
  created() {
    const unique = this.$route.query.unique;
    this.detailData(unique);
    this.detailSku(unique);
  },
  methods: {
    async detailData(unique) {
      let params = {
        unique: unique
      };
      let result = await goodsDetail(params);
      if (result.status) {
        this.figureData = result.data.figure;
        this.informData = result.data.inform;
        this.thumbData = result.data.thumb;
        // 初始化sku数据
        this.sku.price = this.informData.price;
      }
    },
    async detailSku(unique) {
      let params = {
        unique: unique
      };
      let result = await goodsSku(params);
      if (result.status) {
        this.sku.tree = result.data;
        this.sku.list = this.skuList(result.data);
        console.log( this.sku.list, 'OOOO');
      }
    },
    skuList(tree) {
      let group = [];
      tree.map(item => {
        let single = [];
        item.v.map(list => {
          single.push(list.name);
        })
        group.push(single);
      })
      return this.Cartesian(group);
    },
    Cartesian(arr) { // 求笛卡尔值
      if (arr.length < 2) return arr[0] || [];
      return arr.reduce((total, value) => {
        let item = [];
        total.forEach(c => {
          value.forEach(v => {
            if (c instanceof Array) {
              item.push([...c, v]);
            } else {
              item.push([c, v]);
            }
          })
        })
        console.log('55')
        return item;
      })
    },
    getCustom() {
      console.log('咨询客服')
    },
    routeHome() {
      this.$router.push({
        name: 'Home'
      })
    },
    prepareBuy() {
      this.skuDialog = true;
    },
    goBuy() {
      console.log('gobuy')
    }
  }
}
</script>

<style lang="less" scoped>
.detail {
  position: relative;
  width: 100%;
  min-height: 100vh;
  background-color: #f5f5f5;
  .detail-swipe {
    width: 100%;
    height: 375px;
    .van-swipe-item {
      width: 100%;
      height: 375px;
      > img {
        width: 100%;
        height: 375px;
      }
    }
  }
  .detail-price {
    font-size: 18px;
    color: #ee0a24;
  }
  .detail-title {
    font-size: 16px;
    color: #333333;
  }
  .detail-quality {
    margin: 18px 0 0 0;
  }
  .detail-message {
    margin: 18px 0 0 0;
    padding: 0 0 50px 0;
    > img {
      width: 100%;
      height: auto;
    }
  }
}
</style>