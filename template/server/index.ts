import { HOST, PORT } from '@framework/constants'
import createServer from './create-server'
import { logger } from '@server/utils'


async function start(): Promise<void> {
  logger.info('Create server')
  const server = await createServer()
  server.listen(PORT, HOST)
  logger.info(`Server start at ${HOST}:${PORT}`)
}

start()
