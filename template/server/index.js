import fs from 'fs'
import { resolve, join } from 'path'
import chalk from 'chalk'
import staticServer from 'koa-static'
import { HOST, PORT } from 'framework/constants'

import server from './server'
import loadBuildConfig from '../build/load-build-config'
import ssr from './middleware/vue-server-render'


const { title, ssrFilename, manifestFilename } = loadBuildConfig()
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
