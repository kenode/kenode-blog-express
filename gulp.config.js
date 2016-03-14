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
        'bower_components/jquery/dist/jquery.js',
        'bower_components/bootstrap/dist/js/bootstrap.js',
        'bower_components/bootstrap-switch/dist/js/bootstrap-switch.js'
      ],
      css: [
        'bower_components/bootstrap/dist/css/bootstrap.css',
        'bower_components/bootstrap-switch/dist/css/bootstrap3/bootstrap-switch.css',
        'bower_components/font-awesome/css/font-awesome.css'
      ],
      fonts: [
        'bower_components/bootstrap/dist/fonts/*.+(eot|svg|ttf|woff|woff2)',
        'bower_components/font-awesome/fonts/*.+(eot|svg|ttf|woff|woff2|otf)'
      ],
      copys: [
        'bower_components/bootstrap/dist/css/bootstrap-theme.min.css',
        'bower_components/bootstrap/dist/css/bootstrap-theme.min.css.map',
        'bower_components/html5shiv/dist/html5shiv.min.js',
        'bower_components/respond/dest/respond.min.js'
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
      }
    }
  },
  webpack: {
    entry: {
      index: './assets/js/index.js'
    },
    resolve: {
      extensions: ['', '.js']
    },
    output: {
      path: path.join(process.cwd(), 'public', 'js'),
      filename: '[name].min.js'
    },
    externals: {

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