const path = require('path');
const webpack = require('webpack');
const merge = require("webpack-merge");

const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');

const APP_DIR = path.resolve(__dirname, '../src');

module.exports = env => {
  const { PLATFORM, VERSION } = env;
  return merge([
      {
        entry: ['@babel/polyfill', APP_DIR],
        module: {
          rules: [
            {
              test: /\.js$/,
              exclude: /node_modules/,
              use: {
                loader: 'babel-loader'
              }
            },
            {
              test: /\.scss$/,
              use: [
                PLATFORM === 'production' ? MiniCssExtractPlugin.loader : 'style-loader',
                'css-loader',
                'sass-loader'
              ]
            },
            {
              test: /\.(ttf|eot|svg|gif)(\?v=[0-9]\.[0-9]\.[0-9])?$/,
              use: [{
                  loader: 'file-loader'
              }]
          }
          ]
        },
        plugins: [
          new HtmlWebpackPlugin({
            title: 'example',
            template: './src/index.html',
            filename: './index.html',
            inject: true,
            minify: {
              collapseWhitespace: true,
              collapseInlineTagWhitespace: true,
              minifyCSS: true,
              minifyURLs: true,
              minifyJS: true,
              removeComments: true,
              removeRedundantAttributes: true
            }
          }),
          new webpack.DefinePlugin({ 
            'process.env.VERSION': JSON.stringify(env.VERSION),
            'process.env.PLATFORM': JSON.stringify(env.PLATFORM)
          }),
          new CopyWebpackPlugin([ { from: 'src/static' } ]),
        ],
        externals: {
          // global app config object
          config: JSON.stringify({
              apiUrl: 'http://localhost:4000'
          })
      }
    }
  ])
};