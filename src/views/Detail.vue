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
      <div class="detail-price">
        <b>售价: </b>
        <em>¥ </em>
        <strong>{{ informData.price }}</strong>
      </div>
      <van-cell :value="informData.title" :border="false" value-class="detail-title" />
    </van-cell-group>
    <van-cell-group class="detail-quality">
      <van-cell title="正品保障" />
      <van-cell title="运费: 包邮" />
      <van-cell title="7天无理由退货" />
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
      :initial-sku="initialSku"
      :goods="informData"
      :goods-id="informData.unique"
      :quota="0"
      :quota-used="0"
      :hide-stock="false"
      @stepper-change="skuCount"
      @sku-selected="skuSelect"
      @buy-clicked="goBuy">
      <template #sku-actions="props">
        <div class="van-sku-actions">
          <van-button
            square
            size="large"
            type="danger"
            @click="props.skuEventBus.$emit('sku:buy')"
          >
          立即购买
          </van-button>
        </div>
      </template>
    </van-sku>
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
import { Swipe, SwipeItem, Lazyload, Cell, CellGroup, Divider, GoodsAction, GoodsActionIcon, GoodsActionButton, Sku, Button } from 'vant';
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
Vue.use(Button);
import { goodsDetail, goodsSku } from './../assets/api/detail.js'
export default {
  name: 'Detail',
  data() {
    return {
      baseUrl: process.env.VUE_APP_SERVICE,
      unique: '', // 商品ID
      gather: '', // 已选规格
      count: 1, // 已选数量
      figureData: [],
      informData: {},
      thumbData: [],
      skuDialog: false,
      sku: {
        tree: [],
        list: [],
        price: '', // 默认价格（单位元）
        stock_num: 0, // 商品总库存
        none_sku: false, // 是否无规格商品
      },
      initialSku: {}
    }
  },
  created() {
    this.unique = this.$route.query.unique;
    this.detailData(this.unique);
    this.detailSku(this.unique);
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
        this.informData['picture'] = this.baseUrl + 'storage/' + this.figureData[0]['figure'];
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
        const group = this.skuList(result.data, 1);
        const catalog = this.skuList(result.data, 2);
        this.sku.list = this.skuGroup(group, catalog);
        this.sku.stock_num = this.totalCount(this.sku.list);
      }
    },
    skuList(tree, typ) {
      let group = [];
      tree.map(item => {
        let single = [];
        item.v.map(list => {
          if (typ == 1) {
            single.push(list.name);
          } else {
            single.push(list.id);
          }
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
        return item;
      })
    },
    skuGroup(g, c) {
      const total = [];
      c.filter((item, i) => {
        let li = {};
        if (item instanceof Array) {
          item.filter((list, l) => {
            let key = this.sku.tree[l].k_s;
            li[key] = list;
            li['id'] = key * list * (l + i);
            li['price'] = this.informData.price * 100;
            li['stock_num'] = list + i + l; // 随便写一个库存
            li['gather'] = g[i].join('、');
          })
        } else {
          let key = this.sku.tree[0].k_s;
          li[key] = item;
          li['id'] = key * item;
          li['price'] = this.informData.price * 100;
          li['stock_num'] = item + i; // 随便写一个库存
          li['gather'] = g[i];
        }
        total.push(li);
      })
      return total;
    },
    totalCount(t) {
      let r = 0;
      t.filter(i => {
        r += i['stock_num'];
      })
      return r;
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
    skuCount(val) {
      this.count = val;
    },
    skuSelect(val) {
      this.$nextTick(() => {
        let pricenum = document.getElementsByClassName("van-sku__price-num");
        pricenum[0].innerHTML = this.informData.price;
      })
      if (val.selectedSkuComb) {
        this.gather = val.selectedSkuComb.gather;
      } else {
        this.gather = '';
      }
    },
    goBuy() {
      console.log('gobuy', this.unique, this.gather, this.count, this.informData);
      let params = {
        unique: this.unique,
        gather: this.gather,
        count: this.count,
        title: this.informData.title,
        price: this.informData.price,
        picture: this.informData.picture,
      };
      this.$store.commit("setOrderList", params);
      this.$router.push({
        name: 'Order',
        query: {
          unique: this.unique,
          gather: this.gather,
          count: this.count
        }
      });
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
    padding: 0 16px;
    line-height: 24px;
    > b {
      font-size: 14px;
      color: #ee0a24;
      font-weight: 400;
    }
    > em {
      font-size: 16px;
      color: #ee0a24;
      font-weight: 400;
    }
    > strong {
      font-size: 22px;
      color: #ee0a24;
      font-weight: 500;
    }
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