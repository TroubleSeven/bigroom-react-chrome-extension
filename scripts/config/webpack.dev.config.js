const path = require('path')
const webpack = require('webpack')
const webpackMerge = require('webpack-merge')
const WriteFilePlugin = require('write-file-webpack-plugin');

const { publicPath } = require('../config')
const baseWebpackConfig = require('./webpack.base.config')

module.exports = webpackMerge(baseWebpackConfig, {
  output: {
    filename: '[name].bundle.js',
    path: path.resolve(process.cwd(), 'dist'),
    publicPath: `/${publicPath}`
  },
  devServer: {
    contentBase: './dist/dev',
    outputPath: path.join(process.cwd(), './dist/dev'),
    compress: true,
    hot: true
  },
  mode: 'development',
  plugins: [
    new WriteFilePlugin({
      test: /(inject\.js|manifest\.json)$/,
    }),
    new webpack.optimize.OccurrenceOrderPlugin(),
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoEmitOnErrorsPlugin()
  ]
})
