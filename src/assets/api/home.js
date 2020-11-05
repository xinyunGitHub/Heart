import { axiosFetch } from './../js/apputils.js'

/* 【广告栏目】 */
export function homeAdvert(params) {
  return axiosFetch({
    method: 'POST',
    url: 'api/home/advert',
    params: params
  })
  .then((res) => {
    return res;
  })
}

/* 【商品栏目】 */
export function homeTabs(params) {
  return axiosFetch({
    method: 'POST',
    url: 'api/home/tabs',
    params: params
  })
  .then((res) => {
    return res;
  })
}