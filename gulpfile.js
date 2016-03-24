'use strict';

var gulp = require('gulp');
var $ = require('gulp-load-plugins')();
var minifyCss = require('gulp-minify-css');
var sprite = require('gulp-css-spriter');
var imageSize = require('gulp-image-resize');
var del = require('del');
var runSequence = require('run-sequence').use(gulp);

var config = require('./gulp.config');

// clean
gulp.task('clean', function () {
  del.sync('./public', { dot: true });
});

// vendor-js
gulp.task('vendor-js', function () {
  return gulp.src(config.vendor.list.js)
    .pipe($.concat(config.vendor.filename.js))
    .pipe($.sourcemaps.init())
    .pipe($.rename({ suffix: '.min' }))
    .pipe($.uglify())
    .pipe($.sourcemaps.write('./'))
    .pipe(gulp.dest('./public/js'));
});

// vendor-css
gulp.task('vendor-css', function () {
  return gulp.src(config.vendor.list.css)
    .pipe($.concat(config.vendor.filename.css))
    .pipe($.sourcemaps.init())
    .pipe($.rename({ suffix: '.min' }))
    .pipe(minifyCss())
    .pipe($.sourcemaps.write('./'))
    .pipe(gulp.dest('./public/css'));
});

// vendor-fonts
gulp.task('vendor-fonts', function() {
  return gulp.src(config.vendor.list.fonts)
    .pipe(gulp.dest('./public/fonts'));
});

// vendor-copys
gulp.task('vendor-copys', function () {
  return gulp.src(config.vendor.list.copys, { dot: true})
    .pipe(gulp.dest(function (file) {
      var filePath = file.path.toLowerCase();
      if (/\.(js|js.map)$/.test(filePath)) {
        return './public/js';
      }
      if (/\.(css|css.map)$/.test(filePath)) {
        return './public/css';
      }
      return './public';
    }));
});

// vendor
gulp.task('vendor', function () {
  runSequence('clean', ['vendor-js', 'vendor-css', 'vendor-fonts', 'vendor-copys']);
});

// assets-sass
gulp.task('assets-sass', function () {
  return gulp.src(config.assets.sass.entry)
    .pipe($.sass().on('error', $.sass.logError))
    .pipe($.autoprefixer({
      browsers: ['last 2 versions'],
      cascade: false
    }))
    .pipe(sprite(config.assets.sass.sprite))
    .pipe($.sourcemaps.init())
    .pipe($.rename({ suffix: '.min' }))
    // .pipe(minifyCss())
    .pipe($.sourcemaps.write('./'))
    .pipe(gulp.dest('./public/css'));
});

// assets-imgsize
gulp.task('assets-imgsize', function () {
  config.assets.image.zoomSize.map( function (item) {
    gulp.src(item.file)
      .pipe(imageSize(item.opts))
      .pipe($.rename(item.rename))
      .pipe(gulp.dest('./public/img'));
  });
});

// assets-img
gulp.task('assets-img', function () {
  return gulp.src(config.assets.image.file)
    .pipe($.imagemin(config.assets.image.opts))
    .pipe(gulp.dest('./public/img'));
});

// assets-js
gulp.task('assets-js', function () {
  return gulp.src(config.webpack.entry.index)
    .pipe($.webpack(config.webpack))
    .pipe(gulp.dest('./public/js'));
});

// assets
gulp.task('assets', function () {
  runSequence(['assets-sass', 'assets-imgsize', 'assets-img'], 'assets-js');
});

// build
gulp.task('build', function () {
  runSequence('vendor', 'assets');
});

// watch
gulp.task('watch', function () {
  gulp.watch(['./assets/sass/**/*.scss', './assets/css-sprite/**/*.+(jpg|gif|png|svg)'], ['assets-sass']);
  gulp.watch('./assets/image/**/*.+(jpg|gif|png|svg)', ['assets-img']);
  gulp.watch('./assets/js/**/*.js', ['assets-js']);
});

