const ora = require('ora')
const spinner = ora('building for production...')
spinner.start()

require('shelljs/global')

const webpack = require('webpack')
const webpackConfig = require('./webpack.config.js')
webpack(webpackConfig, function (err, stats) {
  spinner.stop()
  if (err) throw err
  process.stdout.write(stats.toString({
    colors: true,
    modules: false,
    children: false,
    chunks: false,
    chunkModules: false
  }) + '\n')
})
