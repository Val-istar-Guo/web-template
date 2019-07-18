import server from './build/webpack.config.server.js'
import client from './build/webpack.config.client.js'
import ssr from './build/webpack.config.ssr.js'


const isProd = process.env.NODE_ENV === 'production'
const configs = isProd ? [server, client, ssr] : [server, ssr]

export default configs
