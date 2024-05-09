const HtmlWebpackPlugin = require('html-webpack-plugin');
const WebpackPwaManifest = require('webpack-pwa-manifest');
const path = require('path');
const { InjectManifest } = require('workbox-webpack-plugin');

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
    plugins: [
      new HtmlWebpackPlugin({
        template: './client/index.html',
        inject: 'body',
        chunks: ['main'],
        filename: 'index.html'
      }),
      new HtmlWebpackPlugin({
        template: './client/index.html',
        inject: 'body',
        chunks: ['install'],
        filename: 'install.html'
      }),
      new WebpackPwaManifest({
        name: 'J.A.T.E',
        short_name: 'J.A.T.E',
        start_url: '/',
        background_color: '#272822',
        theme_color: '#31a9e1',
        icons: [{
          src: path.resolve('src/assets/icons/icon_96x96.png'),
          sizes: [96, 128, 192, 256, 384, 512],
          destination: path.join('assets', 'icons')
        }]
      }),
      new InjectManifest({
        swSrc: './src-sw.js',
        swDest: 'src-sw.js'
      })
    ],

    module: {
      rules: [
        // Add rules for CSS loaders and Babel here if necessary
      ],
    },
  };
};

