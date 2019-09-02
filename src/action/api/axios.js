import axios from 'axios'
// import Qs from 'qs'

const baseurl = {
  dev: 'http://192.168.10.100:5000/api/v1',
  local: 'http://localhost:5000/api/v1'
}

const handleError = (status, other) => {
  // 状态码判断
  switch (status) {
    // 401: 未登录状态，跳转登录页
    case 401:
      // toLogin();
      break;
    // 403 token过期
    // 清除token并跳转登录页
    case 403:
      // tip('登录过期，请重新登录');
      // store.commit('loginSuccess', null);
      break;
    // 404请求不存在
    case 404:
      break;
    default:
      console.log(other);
  }
}

const Axios = axios.create({
  timeout: 1000 * 30,
  baseURL: baseurl.dev,
  responseType: 'json',
  withCredentials: true,
  headers: {
    "Content-Type": 'application/json;charset=UTF-8',
    "Cache-Control": "no-cache"
  }
})

Axios.interceptors.request.use(
  config => {
    const jwt = localStorage.getItem('jwt')
    if (jwt) {
      config.headers.Authorization = jwt
    }
    return config
  },
  error => Promise.error(error)
)

Axios.interceptors.response.use(
  res => {
    if (res.status >= 200 && res.status < 300) {
      const data = res.data
      if (data && data.jwt) {
        localStorage.setItem('jwt', data.jwt)
      }
      return Promise.resolve(data)
    }
    return Promise.reject(res)
  },
  error => {
    const { response } = error
    if (response) {
      handleError(response.status, response.data)
      return Promise.reject(response.data)
    }
  }
)

export default Axios
