import { axiosFetch } from './../js/apputils.js'

/* 【查询默认地址】 */
export function addressOrder(params) {
  return axiosFetch({
    method: 'POST',
    url: 'api/order/address',
    params: params
  })
  .then((res) => {
    return res;
  })
}

/* 【订单信息】 */
export function inventoryOrder(params) {
  return axiosFetch({
    method: 'POST',
    url: 'api/order/inventory',
    params: params
  })
  .then((res) => {
    return res;
  })
}

/* 【支付流水】 */
export function waterOrder(params) {
  return axiosFetch({
    method: 'POST',
    url: 'api/order/water',
    params: params
  })
  .then((res) => {
    return res;
  })
}