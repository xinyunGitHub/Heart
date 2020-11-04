import { axiosFetch } from './../js/apputils.js'

/* 【新增地址】 */
export function addAddress(params) {
  return axiosFetch({
    method: 'POST',
    url: 'api/address/add',
    params: params
  })
  .then((res) => {
    return res;
  })
}
/* 【更新地址】 */
export function editAddress(params) {
  return axiosFetch({
    method: 'POST',
    url: 'api/address/edit',
    params: params
  })
  .then((res) => {
    return res;
  })
}
/* 【删除地址】 */
export function delAddress(params) {
  return axiosFetch({
    method: 'POST',
    url: 'api/address/del',
    params: params
  })
  .then((res) => {
    return res;
  })
}