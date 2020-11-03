import { axiosFetch } from './../js/apputils.js'

/* 【商品详情】 */
export function goodsDetail(params) {
  return axiosFetch({
    method: 'POST',
    url: 'api/detail/inform',
    params: params
  })
  .then((res) => {
    return res;
  })
}

/* 【商品sku】 */
export function goodsSku(params) {
  return axiosFetch({
    method: 'POST',
    url: 'api/detail/sku',
    params: params
  })
  .then((res) => {
    return res;
  })
}