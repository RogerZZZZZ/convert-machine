const path = require('path')
const webpack = require('webpack')

const root = path.resolve(__dirname, './')

module.exports = {
  devtool: 'source-map',

  entry: [
    'webpack-hot-middleware/client?quiet=true',
  ],
  output: {
    path: path.join(__dirname, '/'),
    filename: 'adapter.js',
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
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: '"production"',
      },
    }),
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoEmitOnErrorsPlugin(),
  ],

  devServer: {
    contentBase: './src/',
    port: 9999,
    historyApiFallback: true,
    inline: true,
  },
}
