const path = require('path');

module.exports = function(env) {
  const  webpackConfigPath = path.resolve(__dirname, `${env}.config.js`);

  const webpackConfig = require(webpackConfigPath);

  return webpackConfig;
}
