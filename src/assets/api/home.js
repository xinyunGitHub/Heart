import { axiosFetch } from './../js/apputils.js'

/* 【登录账户】 */
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