const path = require('path');
module.exports = {
  entry: './src/main.js',
  output: {
    filename: 'build.js',
    publicPath: '/dist/',
    path: path.resolve(__dirname, './dist')
  },
  module: {
    rules: [
      {
        test: /\.vue$/,
        use: ['vue-loader']
      }
    ]
  },
};
