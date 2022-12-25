const { src, dest, watch, series, parallel } = require('gulp');
const pug = require('gulp-pug');
const sass = require('gulp-sass')(require('sass'));
const concat = require('gulp-concat');
const del = require('del');
const autoprefixer = require('gulp-autoprefixer');
const imagemin = require('gulp-imagemin');
const uglify = require('gulp-uglify');
const browserSync = require('browser-sync').create();


// инициализация браузера
function browserInit() {
  browserSync.init({
    server: {
        baseDir: "./app"
      }
  });
}

// pug -> html
function toPug() {
  return src('./app/*.pug')
    .pipe(pug({
      pretty: true
    }))
    .pipe(dest('./app'))
    .pipe(browserSync.stream());
}

// sass -> css
function toCss() {
  return src('./app/scss/**/*.scss')
    .pipe(concat('style.min.css'))
    .pipe(sass({ outputStyle: 'compressed' }))
    .pipe(autoprefixer())
    .pipe(dest('./app/css'))
    .pipe(browserSync.stream());
}

// удалить dist
function delDist() {
  return del('./dist');
}

// слежение за файлами
function startWatch() {
  watch('./app/**/*.pug', toPug);
  watch('./app/scss/**/*.scss', toCss);
  watch('./app/js/**/*.js', browserSync.reload);
}

// css в dist
function buildCss() {
  return src([
    './app/css/**/*.css'
  ])
  // .pipe(concat('style.min.css'))
  .pipe(dest('./dist/css'))
}

// шрифты в dist
function buildFonts() {
  return src('./app/fonts/*')
    .pipe(dest('./dist/fonts'))
}

// картинки в dist
function buildImages() {
  return src('./app/images/**/*')
    .pipe(imagemin([
      imagemin.gifsicle({interlaced: true}),
      imagemin.mozjpeg({quality: 75, progressive: true}),
      imagemin.optipng({optimizationLevel: 5}),
      imagemin.svgo({
        plugins: [
          {removeViewBox: true},
          {cleanupIDs: false}
        ]
      })
    ]))
    .pipe(dest('./dist/images'))
}

// js в dist
function buildJs() {
  return src('./app/js/**/*.js')
    .pipe(dest('./dist/js'))
}

// webfonts в dist
function buildWebfonts() {
  return src('./app/webfonts/**/*')
    .pipe(dest('./dist/webfonts'))
}

// html в dist
function buildHtml() {
  return src('./app/*.html')
    .pipe(dest('./dist'))
}

exports.pug = toPug;
exports.css = toCss;
exports.del = delDist;

exports.watch = startWatch;

exports.default = parallel(toCss, toPug, startWatch, browserInit);
exports.build = series(buildCss, buildFonts, buildImages, buildJs, buildWebfonts, buildHtml);