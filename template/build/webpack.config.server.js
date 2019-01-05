import path from 'path'
import env from 'detect-env'
import nodeExternals from 'webpack-node-externals'

import loadBuildConfig from './load-build-config'

const config = loadBuildConfig()


export default {
  context: path.resolve(__dirname, '..'),

  entry: env.detect({
    prod: './server',
    default: './server/server',
  }),

  mode: env.is.prod ? 'production' : 'development',
  target: 'node',
  externals: nodeExternals(),

  node: {
    __filename: false,
    __dirname: false,
  },

  output: {
    path: path.resolve(__dirname, '../dist/server'),
    filename: env.is.prod ? 'bundle.js' : 'bundle.[chunkhash:8].js',
    chunkFilename: 'chunk.[chunkhash:8].js',
    libraryTarget: 'commonjs2',
  },

  module: {
    rules: [
      { test: /\.tsx?$/, loader: 'awesome-typescript-loader' },
      { test: /\.js$/, loader: 'source-map-loader' },
    ]
  },

  resolve: {
    alias: { ...config.alias },
    extensions: ['.js', '.ts'],
  },
}
