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
  devServer: {
    port: 8080,
  },
};

module.exports = config;
