const CleanWebpackPlugin = require('clean-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin');
const path = require('path');
const webpack = require('webpack');

const rootDir = path.resolve(__dirname, '..');

module.exports = {
  entry: {
    index: path.resolve(rootDir, 'src', 'index'),
  },
  output: {
    path: path.join(rootDir, 'build-prod'),
    publicPath: '/',
    filename: '[name].[chunkhash:8].js',
    chunkFilename: "[name].[chunkhash:8].bundle.js"
  },
  module: {
    rules: [
      { // eslint load ()
        test: /\.jsx?$/,
        loader: 'eslint-loader',
        exclude: /node_modules/,
        enforce: 'pre', // in order to check source files before modified by other loaders
        options: {
          emitWarning: false,
        },
      },
      { // babel-loader
        test: /\.jsx?$/,
        loader: 'babel-loader',
        exclude: /node_modules/,
      },
      {
        test: /\.css$/,
        include: /node_modules/,
        use: ExtractTextPlugin.extract({
          fallback: 'style-loader',
          use: 'css-loader',
        }),
      },
      {
        test: /\.css$/,
        exclude: /node_modules/,
        use: ExtractTextPlugin.extract({
          fallback: 'style-loader',
          use: [{
            loader: 'css-loader',
            options: {
              camelCase: true,
              importLoaders: 1,
              localIdentName: '[path][name]__[local]--[hash:base64:5]',
              modules: true,
            },
          },
          'postcss-loader'
          ],
        }),
      },
    ],
  },
  resolve: {
    extensions: ['.js', '.jsx'],
    modules: [path.resolve(rootDir, 'src/'), 'node_modules'],
  },
  plugins: [
    new webpack.NoEmitOnErrorsPlugin(),
    new ExtractTextPlugin({
      filename: '[name].[hash:8].css'
    }),
    new webpack.optimize.CommonsChunkPlugin({
      name: 'vendor',
      filename: 'vendor.[chunkhash:8].js',
      minChunks: function(module){
        return module.context && module.context.indexOf("node_modules") !== -1;
      },
    }),
    new HtmlWebpackPlugin({
      template: path.resolve(rootDir, 'public', 'index.html'),
      hash: true,
      chunks: ['index', 'vendor'],
      minify: {
        collapseWhitespace: true,
        collapseInlineTagWhitespace: true,
        keepClosingSlash: true,
        minifyCSS: true,
        minifyJS: true,
        removeAttributeQuotes: true,
        removeComments: true,
        removeEmptyAttributes: true,
        removeRedundantAttributes: true,
      },
    }),
    new CleanWebpackPlugin(['build-prod'], {
      root: path.resolve(rootDir),
      verbose: true
    }),
    new webpack.optimize.UglifyJsPlugin({
      mangle: true,
    }),
  ],
};
