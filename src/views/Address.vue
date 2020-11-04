<template>
  <div class="address">
    <van-address-list
      v-model="addressActive"
      :list="$store.getters.getAddressList"
      @select="onSelect"
      @add="onAdd"
      @edit="onEdit"
    />
    <template v-if="$store.getters.getAddressList.length == 0">
      <van-empty description="暂无收获地址～" />
    </template>
  </div>
</template>

<script>
import Vue from 'vue';
import { AddressList, Empty, Toast } from 'vant';
Vue.use(AddressList);
Vue.use(Empty);
import { listAddress, updateAddress } from './../assets/api/address.js'
import { getItem } from './../assets/js/apputils.js'
export default {
  name: 'Address',
  data() {
    return {
      addressActive: ''
    }
  },
  created() {
    this.listData();
  },
  methods: {
    async listData() {
      let params = {
        openid: getItem('userInfo').openid,
      };
      let result = await listAddress(params);
      if (result.status) {
        this.$store.commit("setAddressList", result.data);
        result.data.filter(item => {
          if (item.isDefault) {
            this.addressActive = item.id;
            this.$store.commit("setAddressActive", item.id);
          }
        })
      } else {
        Toast.fail(result.message);
      }
    },
    async onSelect(item) {
      if (item.id == this.$store.getters.getAddressActive) {
        this.$router.go(-1);
      } else {
        let params = {
          openid: getItem('userInfo').openid,
          id: item.id
        };
        let result = await updateAddress(params);
        if (result.status) {
          this.$store.commit("setAddressActive", item.id);
          Toast.success(result.message);
          setTimeout(() => {
            this.$router.go(-1);
          }, 600);
        } else {
          Toast.fail(result.message);
        }
      }
    },
    onAdd() {
      this.$router.push({
        name: 'Found'
      });
    },
    onEdit(item) {
      this.$router.push({
        name: 'Found',
        query: {
          id: item.id
        }
      });
    }
  }
}
</script>

<style lang="less" scoped>
.address {
  position: relative;
  width: 100%;
  min-height: 100vh;
  background-color: #f5f5f5;
}
</style>