'use strict';

var webpack = require('webpack');
var ExtractTextPlugin = require("extract-text-webpack-plugin");
var path = require('path');
var pngquant = require('imagemin-pngquant');

module.exports = {
  
  vendor: {
    filename: {
    	js: 'vendor.js',
    	css: 'vendor.css'
    },
    list: {
    	js: [
        'node_modules/jquery/dist/jquery.js',
        'node_modules/bootstrap/dist/js/bootstrap.js',
        'node_modules/bootstrap-switch/dist/js/bootstrap-switch.js',
        'node_modules/jquery.cookie/jquery.cookie.js',
        'node_modules/lodash/lodash.js',
        'node_modules/react/dist/react.js',
        'node_modules/react-dom/dist/react-dom.js',
        'node_modules/classnames/index.js',
        'node_modules/markdown-it/dist/markdown-it.js',
        'node_modules/crypto-js/index.js'
      ],
      css: [
        'node_modules/bootstrap/dist/css/bootstrap.css',
        'node_modules/bootstrap-switch/dist/css/bootstrap3/bootstrap-switch.css',
        'node_modules/font-awesome/css/font-awesome.css',
        'node_modules/animate.css/animate.css'
      ],
      fonts: [
        'node_modules/bootstrap/dist/fonts/*.+(eot|svg|ttf|woff|woff2)',
        'node_modules/font-awesome/fonts/*.+(eot|svg|ttf|woff|woff2|otf)'
      ],
      copys: [
        'node_modules/bootstrap/dist/css/bootstrap-theme.min.css',
        'node_modules/bootstrap/dist/css/bootstrap-theme.min.css.map',
      ]
    }
  },
  assets: {
    sass: {
      entry: ['./assets/sass/*.scss'],
      sprite: {
        'spriteSheet': './public/img/spritesheet.png',
        'pathToSpriteSheetFromCSS': '../img/spritesheet.png'
      },
    },
    image: {
      file: ['./assets/image/**/*.+(jpg|gif|png|svg)'],
      opts: {
        progressive: true,
        interlaced: true,
        svgoPlugins: [{removeViewBox: false}],
        optimizationLevel: 5,
        use: [pngquant()]
      },
      zoomSize: [
        {
          file: [
            './assets/image/logo.png',
            './assets/image/logo2.png'
          ],
          opts: {
            width: 200
          },
          rename: {
            suffix: '-200'
          }
        }
      ]
    }
  },
  webpack: {
    entry: {
      index: './assets/js/index.js',
      signin: './assets/js/signin.js'
    },
    resolve: {
      extensions: ['', '.js']
    },
    output: {
      path: path.join(process.cwd(), 'public', 'js'),
      filename: '[name].min.js'
    },
    externals: {
      'lodash': '_',
      'react': 'React',
      'react-dom': 'ReactDOM',
      'crypto-js': 'CryptoJS',
      'classnames': 'cNames'
    },
    module: {
      loaders: [
        {
          test: /\.(js)?$/,
          exclude: /node_modules/,
          loader: 'babel',
          query: {
            cacheDirectory: true,
            presets: ['es2015', 'stage-0']
          }
        }
      ]
    },
    plugins: [
      new webpack.optimize.UglifyJsPlugin()
    ],
    devtool: 'source-map'
  }
}