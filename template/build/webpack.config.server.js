import path from 'path'
import nodeExternals from 'webpack-node-externals'
import webpackShellPlugin from 'webpack-shell-plugin'


const isProd = process.env.NODE_ENV === 'production'

const plugins = []

if (!isProd) {
  const filepath = path.join(__dirname, '../dist/server/bundle.js')
  const nodemonShell = `nodemon --watch ${filepath} ${filepath}`
  plugins.push(new webpackShellPlugin({ onBuildEnd: [nodemonShell] }))
}

export default {
  context: path.resolve(__dirname, '..'),

  entry: './server',

  mode: isProd ? 'production' : 'development',
  target: 'node',
  externals: nodeExternals(),

  node: {
    __filename: false,
    __dirname: false,
  },

  output: {
    path: path.resolve(__dirname, '../dist/server'),
    filename: isProd ? 'bundle.[chunkhash:8].js' : 'bundle.js',
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
    alias: {
      '@framework': path.resolve(__dirname, '../framework/'),
      '@client': path.resolve(__dirname, '../client'),
      '@server': path.resolve(__dirname, '../server')
    },
    extensions: ['.js', '.ts'],
  },

  optimization:{
    /**
     * minimize may have an impact on the orm framework
     * e.g. typeorm
     */
    minimize: false,
  },

  plugins,
}
