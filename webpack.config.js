const path = require('path');

module.exports = {
  entry: './src/index.js',
  mode: 'development',
  devtool: 'inline-source-map',
  output: {
    filename: 'mindar.js',
    path: path.resolve(__dirname, 'dist'),
    publicPath: '/~hiukim/projects/WebCards/mind-ar-js/dist/'
  },
  module: {
    rules: [
      {
        test: /\.worker\.js$/,
        use: {
          loader: 'worker-loader',
          options: { name: 'worker.js' },
        },
        //options: { name: 'WorkerName.[hash].js' },
      },
    ],
  }
};
