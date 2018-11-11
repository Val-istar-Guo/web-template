// PM2 Config
const { join } = require('path')
const sa = require('sanitization')
const cosmiconfig = require('cosmiconfig')
const { name: APP_NAME, repository: REPO } = require('../package.json')


const result = cosmiconfig('pm2').searchSync()
if (!result) throw new Error('The .pm2rc could not be found')


const formatPropOfConfig = (prop, name, config) => ({
  [prop]: config[name] && config[name][prop] ? config[name][prop] : config[prop],
})
const formatEnvOfConfig = (name, config) => ({
  [name]: {
    ...formatPropOfConfig('user', name, config),
    ...formatPropOfConfig('host', name, config),
    ...formatPropOfConfig('port', name, config),
    ...formatPropOfConfig('path', name, config),
  },
})

const sanitize = sa.keys({
  prod: {
    user: sa.string.required,
    host: sa.string.required,
    port: sa.number,
    path: sa.string,
  },
  test: {
    user: sa.string.required,
    host: sa.string.required,
    port: sa.number,
    path: sa.string,
  },
})

let config = sanitize({
  ...formatEnvOfConfig('prod', result.config),
  ...formatEnvOfConfig('test', result.config),
})

if (config.prod.host === config.test.host) throw Error('The host cannot be the same')

module.exports = {
  apps: [
    {
      name: APP_NAME,
      script: './dist/server/bundle.js',

      env_prod: { PORT: config.prod.port },
      env_test: { PORT: config.prod.port }
    },
  ],

  deploy: {
    prod: {
      user: config.prod.user,
      host: config.prod.host,
      ref: 'origin/master',
      repo: REPO,
      path: config.prod.path,
      'post-deploy': `npm i; npm run build:prod; pm2 startOrRestart ecosystem.config.js --only ${APP_NAME} --env prod`,
    },
    test: {
      user: config.test.user,
      host: config.test.host,
      ref: 'origin/test',
      repo: REPO,
      path: config.test.path,
      'post-deploy': `npm i; npm run build:prod; pm2 startOrRestart ecosystem.config.js --only ${APP_NAME} --env dev`,
    },
  },
}
