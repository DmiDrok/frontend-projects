const scss        = require('gulp-sass')(require('sass'));
const cssnano     = require('gulp-cssnano');
const concat      = require('gulp-concat');
const plumber     = require('gulp-plumber');
const notify      = require('gulp-notify');
const pug         = require('gulp-pug');
const htmlmin     = require('gulp-htmlmin');
const babel       = require('gulp-babel');
const uglifyjs    = require('gulp-uglify-es').default;
const imagemin    = require('gulp-imagemin');
const fonter      = require('gulp-fonter');
const ttf2woff2   = require('gulp-ttf2woff2');
const webp        = require('gulp-webp');
const del         = require('del');
const browserSync = require('browser-sync').create();


module.exports = {
  scss,
  cssnano,
  concat,
  plumber,
  notify,
  pug,
  htmlmin,
  babel,
  uglifyjs,
  imagemin,
  fonter,
  ttf2woff2,
  webp,
  del,
  browserSync,
}