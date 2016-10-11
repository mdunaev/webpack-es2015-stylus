const path = require('path');
const webpack = require('webpack');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const entry_app = ['./app/app.js'];

if (process.env.DEVELOPMENT) entry_app.unshift('webpack-dev-server/client?http://localhost:8080/');

module.exports = {
  entry: {
    app: entry_app,
  },
  module: {
    loaders: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: 'babel',
        query: {
          presets: ['babel-preset-es2015', 'babel-preset-stage-0'],
        },
      },
      {
        test: /\.styl$/,
        loader: ExtractTextPlugin.extract('style-loader', 'css-loader!stylus-loader'),
      },
    ],
  },
  devtool: 'source-map',
  output: {
    path: path.resolve(__dirname, 'bundle'),
    publicPath: 'bundle',
    filename: 'script.min.js',
  },
  plugins: [
    new webpack.optimize.UglifyJsPlugin({
      compress: {
        warnings: false,
      },
    }),
    new ExtractTextPlugin("style.css"),
  ],
};
