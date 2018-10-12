const webpack = require('webpack')
const webpackMerge = require('webpack-merge')
const path = require('path')
const UglifyJsPlugin = require('uglifyjs-webpack-plugin')

const root = path.resolve(__dirname, '../').replace(/\\/g, '/') + '/'
const assetsRoot = root + 'dist/'
const productionSourceMap = true

const devWebpackConfig = require('../webpack.config.js')

devWebpackConfig.plugins = []

const prodWebpackConfig = {
  devtool: productionSourceMap ? '#source-map' : false,
  entry: root + '/src/index.js',
  output: {
    path: assetsRoot,
    library: 'match',
    libraryTarget: 'umd',
    filename: 'convert-machine.js',
  },
  plugins: [
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: '"production"'
      }
    }),
    new UglifyJsPlugin({
      uglifyOptions: {
        compress: {
          warnings: false,
        },
      },
      sourceMap: true,
      parallel: true,
    }),
  ]
}

module.exports = webpackMerge(devWebpackConfig, prodWebpackConfig)
