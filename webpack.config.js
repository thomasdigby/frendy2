var fs = require('fs')
var path = require('path')
var webpack = require('webpack')
// plugins
var extractText = require('extract-text-webpack-plugin')
var statsWriter = require('webpack-stats-plugin').StatsWriterPlugin
var stylelint = require('stylelint-webpack-plugin')
// postcss
var autoprefixer = require('autoprefixer')
var postcssExtend = require('postcss-extend')
var postcssHexRgba = require('postcss-hexrgba')
var postcssImport = require('postcss-import')
var postcssMedia = require('postcss-media-minmax')
var postcssMediaEm = require('postcss-em-media-query')
var postcssMixins = require('postcss-sassy-mixins')
var postcssNesting = require('postcss-nesting')
var postcssVariables = require('postcss-advanced-variables')

module.exports = {
  entry: {
    main: './js/main.js'
  },
  output: {
    path: './public/',
    filename: '[name].[hash].js'
  },
  module: {
    preLoaders: [
      { test: /\.js$/, loader: 'eslint' }
    ],
    loaders: [
      { test: /\.js$/, loader: 'babel' },
      { test: /\.css$/, loader: extractText.extract('css!postcss') }
    ]
  },
  resolve: {
    context: __dirname,
    extensions: ['', '.js', '.css'],
    modulesDirectories: ['css/global', 'js', 'node_modules']
  },
  plugins: [
    new stylelint({
      files: 'css/**/*.css',
      failOnError: true
    }),
    new extractText('main.[contenthash].css'),
    new webpack.optimize.DedupePlugin(),
    new webpack.optimize.OccurenceOrderPlugin(),
    new webpack.optimize.UglifyJsPlugin(),
    new statsWriter({
      filename: '../_data/stats.json',
      transform: function (data) {
        var files = data.assetsByChunkName
        return JSON.stringify({ js: { main: files.main[0], initial: files.initial }, css: { main: files.main[1] } })
      }
    })
  ],
  postcss: function () {
    return {
      plugins: [
        postcssImport({
          path: ['css/global'],
          addDependencyTo: webpack
        }),
        postcssMixins(),
        postcssVariables(),
        postcssNesting(),
        postcssExtend(),
        postcssMedia(),
        postcssMediaEm(),
        postcssHexRgba(),
        autoprefixer()
      ]
    }
  }
}
