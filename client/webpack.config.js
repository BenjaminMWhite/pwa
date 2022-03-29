const HtmlWebpackPlugin = require('html-webpack-plugin');
const WebpackPwaManifest = require('webpack-pwa-manifest');
const path = require('path');
const { InjectManifest } = require('workbox-webpack-plugin');
const { Template } = require('webpack');
const webpack = require('webpack')
// TODO: Add and configure workbox plugins for a service worker and manifest file.
// TODO: Add CSS loaders and babel to webpack.

module.exports = () => {
  return {
    mode: 'development',
    entry: {
      main: './src/js/index.js',
      install: './src/js/install.js'
    },
    output: {
      filename: '[name].bundle.js',
      path: path.resolve(__dirname, 'dist'),
    },
    plugins: [new HtmlWebpackPlugin({template:'./index.html'}),
    new InjectManifest({swSrc:'./src-sw.js',swDest:'src-sw.js'}),
    new WebpackPwaManifest({
      name: 'My Progressive Web App',
      short_name: 'MyPWA',
      description: 'My awesome Progressive Web App!',
      background_color: '#ffffff',
      publicPath: "/",
      start_url: "/",
      // crossorigin: 'null', //can be null, use-credentials or anonymous
      icons: [
        {
          src: path.resolve('./src/images/logo.png'),
          sizes: [96, 128, 192, 256, 384, 512], // multiple sizes
          destination:path.join("assets","icons")
        }
       
      ]
    }),
    new webpack.ProvidePlugin({
     process: "process/browser"
    })
  ]
  
      
  ,

    module: {
      rules: [{
        test: /\.m?js$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env'],
            plugins: ['@babel/plugin-proposal-object-rest-spread','@babel/plugin-transform-runtime']
          }
        }
      },
      {
        test: /\.css$/i,
        use: ["style-loader", "css-loader"],
      } 
      ],
    },
    resolve: {
      fallback: {
        path:false,
        fs:false,
        stream: false,
        querystring: false,
        http: false,
        crypto:false
     }
   }
  };
};
