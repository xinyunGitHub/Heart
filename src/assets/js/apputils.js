/*
  常用逻辑方法集合
*/
import axios from "axios"
import qs from "qs"

/**
 * axios请求接口
 * @param {parm} Object 请求参数
 */
export function axiosFetch(parm) {
  parm.load ? loadedBox(true, parm.load) : null;
  return new Promise((ret, rej) => {
    const instance = axios.create({
      baseURL: process.env.NODE_ENV === "production" ? "https://mdqygl.cn" : "http://127.0.0.1:8000/",
      timeout: 0, // 0 表示无超时时间
      headers: {
        // "Access-Control-Allow-Origin": "*",
        // "Access-Control-Allow-Methods": "GET, POST",
        // "Access-Control-Allow-Headers": "Authorization, Content-Type, If-Match, If-Modified-Since, If-None-Match, If-Unmodified-Since, X-Requested-With"
      },
    });

    const config = {
      method: parm.method,
      url: parm.url,
      data: qs.stringify({
        ...parm.params
      })
    }

    instance.request(config)
    .then((res) => {
      if (res.status == "200") {
        ret(res.data);
      } else {
        rej(res);
      }
      parm.load ? loadedBox(false) : null;
    })
    .catch((err) => {
      rej(err);
      parm.load ? loadedBox(false) : null;
    })
  })
}

/**
 * 【共用方法】toast
 */
let toastStatus = true;
export function toastBox(text = "网络错误～") {
  if (toastStatus) {
    toastStatus = false;
    let toast = document.createElement("div");
    toast.id = "toast";
    toast.style.position = "fixed";
    toast.style.top = "50%";
    toast.style.left = "50%";
    toast.style.opacity = 0;
    toast.style.padding = "0.14rem 0.28rem";
    toast.style.borderRadius = "0.1rem";
    toast.style.transform = "translate(-50%, -50%)";
    toast.style.background = "rgba(0, 0, 0, 0.68)";
    toast.style.zIndex = "999";
    toast.innerHTML = `<span style="min-width: 1.4rem; max-width: 4.4rem; font-size: 0.28rem; color: #ffffff; white-space: nowrap;">${text}</span>`;
    document.body.appendChild(toast);
    let count = 0;
    let show = setInterval(() => {
      count += 10;
      toast.style.opacity = count / 100;
      if (count >= 100) {
        clearInterval(show);
        setTimeout(() => {
          let hide = setInterval(() => {
            count -= 10;
            toast.style.opacity = count / 100;
            if (count <= 0) {
              clearInterval(hide);
              document.getElementById("toast").remove();
              toastStatus = true;
            }
          }, 30);
        }, 2600);
      }
    }, 30);
  }
}
/**
 * 【共用方法】loading
 */
let loadStatus = true;
export function loadedBox(type, text = null, cover = false) {
  if (type && loadStatus) {
    loadStatus = false;
    let ground = cover ? 0.28 : 0;
    let loaded = document.createElement("div");
    loaded.id = "loaded";
    loaded.style.opacity = 0;
    loaded.style.position = "fixed";
    loaded.style.top = 0;
    loaded.style.left = 0;
    loaded.style.width = "100%";
    loaded.style.height = "100vh";
    loaded.style.background = "rgba(0, 0, 0, " + ground + ")";
    loaded.style.zIndex = "999";
    loaded.innerHTML = `<div style="position: absolute; top: 50%; left: 50%; width: 1.6rem; height: 1.6rem; background: rgba(0, 0, 0, 0.68); transform: translate(-50%, -50%); border-radius: 0.1rem;">
      <svg viewBox="-5 3 70 70" style="color: rgb(255, 255, 255)">
        <circle cx="30" cy="30" r="15" fill="none" style="animation: v-circular 1.5s ease-in-out infinite; stroke: currentColor; stroke-width: 3; stroke-linecap: round;"></circle>
      </svg>
      <span style="position: absolute; left: 50%; bottom: 0.1rem; overflow: hidden; white-space: nowrap; width: 1.4rem; transform: translate(-50%); font-size: 0.24rem; color: #ffffff; text-align: center;">${text}</span>
    </div>`;
    document.body.appendChild(loaded);
    let count = 0;
    let show = setInterval(() => {
      count += 10;
      loaded.style.opacity = count / 100;
      if (count >= 100) {
        clearInterval(show);
      }
    }, 30);
  } else if (!type && !loadStatus) { //销毁load
    loadStatus = true;
    let loaded = document.getElementById("loaded");
    let count = 100;
    let hide = setInterval(() => {
      count -= 10;
      loaded.style.opacity = count / 100;
      if (count <= 0) {
        clearInterval(hide);
        document.getElementById("loaded").remove();
        loadStatus = true;
      }
    }, 30);
  }
}

/**
 * 获取url的指定参数
 * @param {name} String 字段名
 */
export function urlParam(name) {
  var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");
  var r = window.location.search.substr(1).match(reg);
  if (r != null) return unescape(r[2]); return null;
}
/**
 * 【共用方法】localStorage
 */
export function setItem(key, val) {
  const value = encodeURIComponent(JSON.stringify(val));
  localStorage.setItem(key, value);
}

export function getItem(key) {
  let value = localStorage.getItem(key);
  if (value) {
    return JSON.parse(decodeURIComponent(value));
  }
}