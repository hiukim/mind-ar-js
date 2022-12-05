const path =require('path');


module.exports=  {
  entry: {
    'mindar-image': './src/image-target/index.js',
    'mindar-image-aframe': './src/image-target/aframe.js',
    'mindar-image-three': './src/image-target/three.js',
    'mindar-face': './src/face-target/index.js',
    'mindar-face-aframe': './src/face-target/aframe.js',
    'mindar-face-three': './src/face-target/three.js'
    
  },
  mode: 'development',
  devtool: 'inline-source-map',
  experiments:{
    outputModule:true
  },
  output: {
    filename: '[name].js',
    path: path.resolve(__dirname, 'dist-dev'),
    publicPath: 'auto',
    chunkFormat:'module',
    chunkLoading:'import',
    module:true
  },
  externals: {three: 'module three'},
  
  module: {
    rules: [
        /* {
          test: /\.worker\.mjs$/,
          use: {
            loader: 'worker-loader',
            options: {
              inline: true,
              name: '[name].mjs'
            },
          },
        }, */
      {
        test: /\.s[ac]ss$/i,
        use: [
          'style-loader',
          'css-loader',
          'sass-loader'
        ]
      },
      {
        test: /\.html$/i,
        use: 'html-loader',
      },
    ],
  },
  resolve: {
    fallback: {
      fs: false,
      path: false,
      crypto: false,
      zlib:false,
      http:false,
      https:false,
      stream:false,
      buffer:false,
      util:false,
      url:false,
    }
  }
};
