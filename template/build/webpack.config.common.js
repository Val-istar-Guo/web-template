/**
 * NOTE webpack base config is the Duplicate code
 *      in webpack.config.ssr.js and webpack.config.client.js
 */
import path from 'path'
import env from 'detect-env'
import webpack from 'webpack'
import VueLoaderPlugin from 'vue-loader/lib/plugin'
import MiniCssExtractPlugin from 'mini-css-extract-plugin'
import loadBuildConfig from './load-build-config'


import cssLoader from './loaders/css'
import tsLoader from './loaders/ts'
import jsLoader from './loaders/js'
import fontLoader from './loaders/font'
import htmlLoader from './loaders/html'
import vueLoader from './loaders/vue'
import imageLoader from './loaders/image'
import pugLoader from './loaders/pug'


const config = loadBuildConfig()
// base client config
export default {
  context: path.resolve(__dirname, '..'),
  devtool: !env.is.prod && '#cheap-module-source-map',
  mode: env.is.prod ? 'production' : 'development',

  output: {
    path: path.resolve(__dirname, '../dist/client'),
    filename: '[name].js',
    chunkFilename: '[name].js',
    publicPath: '/',
  },

  module: {
    rules: [
      // BUG: expose-loader not work with config
      // {
      //   test: require.resolve('vuex'),
      //   use: [{
      //     loader: 'expose-loader',
      //     options: 'vuex'
      //   }]
      // },
      vueLoader,
      tsLoader,
      jsLoader,
      cssLoader,
      fontLoader,
      htmlLoader,
      pugLoader,
      imageLoader,
    ],
  },

  resolve: {
    alias: config.alias,
    extensions: ['.js', '.vue', '.ts'],
  },
  plugins: [
    new VueLoaderPlugin(),
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV),
    }),
    new MiniCssExtractPlugin({
      filename: env.is.prod ? '[name].[hash].css' : '[name].css',
      chunkFilename: env.is.prod ? '[id].[hash].css' : '[id].css',
    }),
  ],
}
