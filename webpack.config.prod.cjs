const path = require('path');

module.exports = {
  entry: {
    'mindar-image': './src/image-target/index.js',
    'mindar-image-aframe': './src/image-target/aframe.js',
    'mindar-image-three': './src/image-target/three.js',
    'mindar-face': './src/face-target/index.js',
    'mindar-face-aframe': './src/face-target/aframe.js',
    'mindar-face-three': './src/face-target/three.js'
  },
  mode: 'production',
  output: {
    filename: '[name].prod.js',
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
            name: '[name].prod.js'
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
