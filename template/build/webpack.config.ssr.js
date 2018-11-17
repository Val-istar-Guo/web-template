import path from 'path'
import webpack from 'webpack'
import merge from 'webpack-merge'

import nodeExternals from 'webpack-node-externals'
import { VueSSRServerPlugin } from 'vue-ssr-webpack-plugin'

import common from './webpack.config.common'
import loadBuildConfig from './loadBuildConfig'


const config = loadBuildConfig()
function emptyPackage(list) {
  return Object.keys(list).reduce((emptyList, alias) => ({
    ...emptyList,
    [alias]: path.resolve(__dirname, 'empty'),
  }), {})
}

export default merge(common, {
  entry: ['@babel/polyfill', './client/entry-ssr'],
  target: 'node',
  externals: nodeExternals({ whitelist: [/\.css$/, /\?vue&type=style/] }),
  output: { libraryTarget: 'commonjs2' },

  resolve: {
    alias: { ...emptyPackage(config.ssrMockModules) },
  },

  plugins: [
    new webpack.DefinePlugin({
      'process.env.WEB_CONTAINER': JSON.stringify('ssr'),
    }),

    new VueSSRServerPlugin({
      filename: config.ssrFilename,
    }),
  ],
})
