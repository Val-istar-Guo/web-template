import fs from 'fs'
import { resolve, join } from 'path'
import chalk from 'chalk'
import staticServer from 'koa-static'

import server from './server'
import loadBuildConfig from '../build/loadBuildConfig'
import ssr from './middleware/vue-server-render'


const { title, ssrFilename, manifestFilename } = loadBuildConfig()

const PORT = process.env.PORT || 8080
const HOST = process.env.HOST || '0.0.0.0'
const clientDir = resolve(__dirname, '../client')

server
  .use(staticServer(resolve(__dirname, '../client')))
  .use(ssr({
    title,
    template: fs.readFileSync(join(clientDir, 'template.html'), 'utf8'),
    bundle: join(clientDir, ssrFilename),
    manifest: JSON.parse(fs.readFileSync(join(clientDir, manifestFilename), 'utf8')),
  }))
  .listen(PORT, HOST)

console.log(chalk.green(`🌏  Server Start at ${HOST}:${PORT}`))
