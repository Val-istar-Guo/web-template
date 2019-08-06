import { mergeAll } from 'ramda'

export default function(...funs) {
  return () => {
    const plugins = funs.map(func => func())
    return mergeAll(plugins)
  }
}
