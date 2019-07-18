import request from 'superagent'
import { PORT, HOST } from './constants'


// 解决兼容ssr请求时端，本地端口号和地址缺失的问题
export default request
  .agent()
  .use(request => {
    if (process.env.WEB_CONTAINER === 'ssr' && request.url[0] === '/') {
      const host = HOST === '0.0.0.0' ? '127.0.0.1' : HOST
      request.url = `${host}:${PORT}${request.url}`
    }

    return request;
  })
