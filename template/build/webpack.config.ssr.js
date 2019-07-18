import path from 'path'
import webpack from 'webpack'
import merge from 'webpack-merge'
import nodeExternals from 'webpack-node-externals'
import { VueSSRServerPlugin } from 'vue-ssr-webpack-plugin'
import common from './webpack.config.common'


export default merge(common, {
  entry: ['@babel/polyfill', './client/entry-ssr'],
  target: 'node',
  externals: nodeExternals({ whitelist: [/\.css$/, /\?vue&type=style/] }),
  output: { libraryTarget: 'commonjs2' },

  resolve: {},

  plugins: [
    new webpack.DefinePlugin({
      'process.env.WEB_CONTAINER': JSON.stringify('ssr'),
    }),

    new VueSSRServerPlugin({ filename: 'vue-ssr-bundle.json' }),
  ],
})
