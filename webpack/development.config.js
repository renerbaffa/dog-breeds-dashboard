const HtmlWebpackPlugin = require('html-webpack-plugin');
const webpack = require('webpack');

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
      { // eslint load ()
        test: /\.jsx?$/,
        loader: 'eslint-loader',
        exclude: /node_modules/,
        enforce: 'pre', // in order to check source files before modified by other loaders
        options: {
          emitWarning: true, // force to show errors on console as warning
        },
      },
      {
        test: /\.css$/,
        include: /node_modules/,
        use: [
          'style-loader',
          'css-loader',
        ],
      },
    ],
  },
  plugins: [
    new webpack.optimize.CommonsChunkPlugin({
      name: 'vendor',
      filename: 'vendor.bundle.js',
      minChunks: function(module) {
        return module.context && module.context.indexOf("node_modules") !== -1;
      },
    }),
    new HtmlWebpackPlugin({
      template: path.resolve(rootDir, 'public', 'index.html'),
      chunks: ['vendor', 'index'],
    }),
    new webpack.optimize.UglifyJsPlugin({
      output: {
        comments: false
      },
      mangle: false,
      compress: false,
      beautify: true,
    }),
  ],
  devServer: {
    port: 3000,
  },
};

module.exports = config;
