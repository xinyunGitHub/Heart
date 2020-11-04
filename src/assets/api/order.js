import { axiosFetch } from './../js/apputils.js'

/* 【新增地址】 */
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