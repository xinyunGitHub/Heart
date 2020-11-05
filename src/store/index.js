import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    addressList: [], // 用户收获地址
    addressActive: '', // 用户默认收获地址id
    orderList: {}, // 订单清单
    waterCode: '', // 订单流水号
  },
  getters: {
    getAddressList(state) {
      return state.addressList;
    },
    getAddressActive(state) {
      return state.addressActive;
    },
    getOrderList(state) {
      return state.orderList;
    },
    getWaterCode(state) {
      return state.waterCode;
    },
  },
  mutations: {
    setAddressList(state, addressList) {
      state.addressList = addressList;
    },
    setAddressActive(state, addressActive) {
      state.addressActive = addressActive;
    },
    setOrderList(state, orderList) {
      state.orderList = orderList;
    },
    setWaterCode(state, waterCode) {
      state.waterCode = waterCode;
    },
  },
  actions: {
  },
  modules: {
  }
})
