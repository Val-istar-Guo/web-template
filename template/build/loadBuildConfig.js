import cosmiconfig from 'cosmiconfig'
import sa from 'sanitization'
import { resolve } from 'path'
import { name } from '../package.json'


const explore = cosmiconfig('build')

const sanitize = sa.keys({
  title: sa.string.defaulted(name),
  ssrFilename: sa.string.defaulted('vue-ssr-bundle.json'),
  manifestFilename: sa.string.defaulted('vue-ssr-manifest.json'),
  ssrMockModules: sa.object,
  alias: sa.object,
})

export default () => {
  const result = explore.searchSync()
  let config = {}
  if (result) config = result.config

  config = sanitize(config)

  const duplicateName = Object.entries(config.ssrMockModules)
    .some(([name, alias]) => name === alias)

  if (duplicateName) throw new Error('The name of mock module for ssr should not same the alias')

  config = {
    ...config,
    alias: Object.entries(config.alias)
      .map(([name, path]) => [name, resolve('../', __dirname, path)])
      .reduce((obj, [key, value]) => ({
        ...obj,
        [key]: value,
      }), {})
  }

  return config
}
