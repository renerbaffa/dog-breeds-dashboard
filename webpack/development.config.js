const HtmlWebpackPlugin = require('html-webpack-plugin');

const path = require('path');

const rootDir = path.resolve(__dirname, '..');

const config = {
  entry: {
    index: path.resolve(rootDir, 'src', 'index'),
  },
  output: {
    path: path.join(rootDir, 'build-dev'),
    publicPath: '/',
    filename: '[name].bundle.js',
    chunkFilename: "[name].bundle.js",
  },
  resolve: {
    extensions: ['.js', '.jsx'],
    modules: [path.resolve(rootDir, 'src/'), 'node_modules'],
  },
  module: {
    rules: [
      { // babel-loader
        test: /\.jsx?$/,
        loader: 'babel-loader',
        exclude: /node_modules/,
      },
    ],
  },
  devServer: {
    port: 3000,
  },
};

module.exports = config;
