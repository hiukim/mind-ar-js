const path = require('path');

module.exports = {
  entry: './src/index-min.js',
  mode: 'production',
  output: {
    filename: 'mindar.prod-min.js',
    path: path.resolve(__dirname, 'dist'),
    publicPath: ''
  },
  module: {
    rules: [
      {
        test: /\.worker\.js$/,
        use: {
          loader: 'worker-loader',
          options: {
            inline: true,
            name: '[name].prod-min.js'
          },
        },
      },
      {
	test: /\.s[ac]ss$/i,
        use: [
          'style-loader',
          'css-loader',
	  'sass-loader'
        ]
      },
      {
	test: /\.html$/,
        use: 'html-loader',
      }
    ],
  }
};

