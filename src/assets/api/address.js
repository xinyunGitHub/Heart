import { axiosFetch } from './../js/apputils.js'

/* 【地址列表】 */
export function listAddress(params) {
  return axiosFetch({
    method: 'POST',
    url: 'api/address/list',
    params: params
  })
  .then((res) => {
    return res;
  })
}
/* 【更新默认地址】 */
export function updateAddress(params) {
  return axiosFetch({
    method: 'POST',
    url: 'api/address/update',
    params: params
  })
  .then((res) => {
    return res;
  })
}