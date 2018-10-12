const path = require('path')
const UglifyJsPlugin = require('uglifyjs-webpack-plugin')
const webpack = require('webpack')
const root = path.resolve(__dirname, './')

module.exports = {
  devtool: 'source-map',

  entry: [
    './src/index.js',
  ],
  output: {
    path: path.join(__dirname, '/dist/'),
    filename: 'convert-machine.js',
  },
  resolve: {
  },
  module: {
    loaders: [{
      test: /\.json$/,
      loader: 'json-loader',
    },
    {
      test: /\.js$/,
      loader: 'babel-loader',
      exclude: /node_modules/,
      include: root,
    },
    {
      test: /\.css$/,
      loader: 'style!css',
    }],
  },
  plugins: [
    new UglifyJsPlugin({
      sourceMap: true,
    }),
    new webpack.NoEmitOnErrorsPlugin()
  ],
}
