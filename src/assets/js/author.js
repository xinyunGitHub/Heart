import { urlParam, axiosFetch, setItem, getItem } from './apputils.js'
export function userInfo() {
  return new Promise((ret, rej) => {
    if (getItem('userInfo')) {
      ret();
    } else {
      const code = urlParam('code');
      // const local = window.location.href;
      const local = 'https://mdqygl.cn/index/hello';
      if (code == null || code == '') {
        window.location.href = 'https://open.weixin.qq.com/connect/oauth2/authorize?appid=' + process.env.VUE_APP_APPID + '&redirect_uri=' + encodeURIComponent(local) + '&response_type=code&scope=snsapi_userinfo&state=1#wechat_redirect';
        rej();
      } else {
        axiosFetch({
          method: "POST",
          url: "api/token/inform",
          params: {
            code: code,
          }
        }).then((res) => {
          if (res.status) {
            setItem('userInfo', res.data);
            ret();
          } else {
            console.log('未知错误～');
          }
        }).catch((err) => {
          console.log(err);
        })
      }
    }
  })
}