const path = require('path');

module.exports = {
  entry: './src/main.js',
  output: {
    path: path.resolve(__dirname, 'app'),
    filename: '[name].js'
  },
  devServer: {
    contentBase: path.join(__dirname, 'app'),
    compress: false,
    port: 1337
  }
};
