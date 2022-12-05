const path =require('path');
const webpack = require('webpack');
module.exports=  {
  entry: {
    'mindar-image': './src/image-target/index.js',
    'mindar-image-aframe': './src/image-target/aframe.js',
    'mindar-image-three': './src/image-target/three.js',
    'mindar-face': './src/face-target/index.js',
    'mindar-face-aframe': './src/face-target/aframe.js',
    'mindar-face-three': './src/face-target/three.js'
  },
  mode: 'production',
  target:'web',
  experiments:{
    outputModule:true
  },
  output: {
    filename: '[name].prod.js',
    path: path.resolve(__dirname, 'dist'),
    publicPath: 'auto',
    chunkFormat:'module',
    chunkLoading:'import',
    module:true
  },
  externals: {three: 'module three'},
  module: {
    rules: [
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
  },
  resolve: {
    fallback: {
      fs: false,
      path: false,
      crypto: false
    }
  },
  plugins: [],
  optimization: {
     
     minimize: true,
    /*splitChunks: {
      chunks: 'all',
    }, */
  },
};
