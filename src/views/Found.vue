<template>
    <div class="found">
      <van-address-edit
        :area-list="areaList"
        :show-postal="false"
        :address-info="addressInfo"
        :show-delete="addressId != -1"
        :area-columns-placeholder="['请选择', '请选择', '请选择']"
        @save="onSave"
        @delete="onDelete"
      />
    </div>
</template>

<script>
import Vue from 'vue';
import { AddressEdit, Toast  } from 'vant';
Vue.use(AddressEdit);
Vue.use(Toast);
import areaList from './../assets/js/area.js';
import { addAddress, editAddress, delAddress } from './../assets/api/found.js'
import { getItem } from './../assets/js/apputils.js'
export default {
  name: 'Found',
  data() {
    return {
      addressId: -1,
      areaList: areaList,
      addressInfo: {}
    }
  },
  created() {
    this.addressId = this.$route.query.id || -1;
    if (this.addressId != -1) {
      // 初始化编辑数据
      let addressList = this.$store.getters.getAddressList;
      let addressData = addressList.filter(item => item.id == this.addressId);
      addressData[0].addressDetail = addressData[0].road;
      this.addressInfo = addressData[0];
    }
  },
  methods: {
    async onSave(val) {
      if (this.addressId != -1) { // 编辑
        let params = {
          openid: getItem('userInfo').openid,
          id: this.addressId,
          name: val.name,
          phone: val.tel,
          province: val.province,
          city: val.city,
          county: val.county,
          road: val.addressDetail
        };
        let result = await editAddress(params);
        if (result.status) {
          this.$router.go(-1);
          Toast.success(result.message);
        } else {
          Toast.fail(result.message);
        }
      } else { // 新增地址
        let params = {
          openid: getItem('userInfo').openid,
          name: val.name,
          phone: val.tel,
          province: val.province,
          city: val.city,
          county: val.county,
          road: val.addressDetail
        };
        let result = await addAddress(params);
        if (result.status) {
          this.$router.go(-1);
          Toast.success(result.message);
        } else {
          Toast.fail(result.message);
        }
      }
    },
    async onDelete() {
      if (this.addressId != -1) {
        let params = {
          openid: getItem('userInfo').openid,
          id: this.addressId,
        };
        let result = await delAddress(params);
        if (result.status) {
          this.$router.go(-1);
          Toast.success(result.message);
        } else {
          Toast.fail(result.message);
        }
      }
    },
  }
}
</script>

<style lang="less" scoped>
.found {
  position: relative;
  width: 100%;
  min-height: 100vh;
  background-color: #f5f5f5;
}
</style>