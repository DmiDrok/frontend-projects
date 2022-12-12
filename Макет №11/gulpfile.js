const  { src, dest, series, parallel, watch } = require('gulp')
const browserSync  = require('browser-sync').create()
const scss         = require('gulp-sass')(require('sass'))
const concat       = require('gulp-concat')
const autoprefixer = require('gulp-autoprefixer')
const uglify       = require('gulp-uglify-es').default
const babel        = require('gulp-babel')
const imagemin     = require('gulp-imagemin')
const del          = require('del')
const fonter       = require('gulp-fonter-fix')
const ttf2woff2    = require('gulp-ttf2woff2')
const fileInclude  = require('gulp-file-include')


// используемые пути
const paths = {
  app: {
    root: './app',
    html: './app/html',
    css: './app/css',
    scss: './app/scss',
    js: './app/js',
    images: './app/images',
    fonts: './app/fonts',
    pages: './app/pages'
  },

  build: {
    root: './dist',
    css: './dist/css',
    js: './dist/js',
    images: './dist/images',
    fonts: './dist/fonts',
    pages: './app/pages'
  }
}

// порт локального сервера
const PORT = 5555

// настройка браузера
function browser() {
  browserSync.init({
    server: {
        baseDir: paths.app.root
    },
    port: PORT
  });
}

// очистка dist
function cleanDist() {
  return del(paths.build.root)
}

// сборка scss в css
function styles() {
  return src(`${paths.app.scss}/**/*.scss`)
    .pipe(concat('style.min.css'))
    .pipe(autoprefixer({ overrideBrowserslist: ["last 10 version"] }))
    .pipe(scss({ outputStyle: 'compressed', grid: true }))
    .pipe(dest(`${paths.app.css}`))
    .pipe(browserSync.stream())
}

// сборка html - файлов в один
function htmlInclude() {
  return src(`${paths.app.html}/*.html`)
    .pipe(fileInclude({ 
      prefix: '@@',
      basepath: '@file'
     }))
     .pipe(dest(`${paths.app.pages}`))
     .pipe(browserSync.stream())
}

// сборка js файлов
function scripts() {
  return src([
      `${paths.app.js}**/*.js`, 
      `!${paths.app.js}/main.min.js`,
      `!${paths.app.js}/jquery.min.js`
    ])
    .pipe(concat('main.min.js'))
    .pipe(babel({ presets: ['@babel/env'] }))
    .pipe(uglify())
    .pipe(dest(`${paths.app.js}`))
    .pipe(browserSync.stream())
}

// сжатие изображений
function images() {
  return src([`${paths.app.images}/**/*`])
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
    .pipe(dest(`${paths.build.images}`))
    .pipe(browserSync.stream())
}

// конвертация otf в ttf
function otfToTtf() {
  return src([`${paths.app.fonts}/*.otf`])
    .pipe(fonter({
      formats: ['ttf']
    }))
    .pipe(dest(`${paths.app.fonts}`))
}

// конвертация ttf в woff, woff2
function ttfToWoff() {
  return src([`${paths.app.fonts}/*.ttf`])
    .pipe(fonter({
      formats: ['woff']
    }))
    .pipe(dest(`${paths.app.fonts}`))
    .pipe(src([`${paths.app.fonts}/*.ttf`]))
    .pipe(ttf2woff2())
    .pipe(dest(`${paths.app.fonts}`))
}

// добавляем jquery сразу в прод
function addJquery() {
  return src(['./node_modules/jquery/dist/jquery.min.js'])
    .pipe(dest(`${paths.app.js}`))
    // .pipe(dest(`${paths.build.js}`))
}

// начать смотреть за файлами
function startWatch() {
  watch([`${paths.app.scss}/**/*.scss`], styles)
  watch([`${paths.app.js}/**/*.js`, `!${paths.app.js}/main.min.js`], scripts)
  watch([`${paths.app.html}/**/*.html`], htmlInclude)
}

// перенос на прод
function toProd() {
  return src([
    `${paths.app.pages}/**/*`,
    `${paths.app.css}/style.min.css`,
    `${paths.app.js}/main.min.js`,
    `${paths.app.js}/jquery.min.js`,
    `${paths.app.fonts}/**/*`,
  ], { base: 'app' })
    .pipe(dest(`${paths.build.root}`))
}

// компиляция html, css, js
exports.compile = series(htmlInclude, styles, scripts)

// отдельные таски
exports.styles = styles
exports.html = htmlInclude
exports.scripts = scripts
exports.images = images
exports.addJq = addJquery

// разные расширения шрифтов по команде
exports.fonts = series(otfToTtf, ttfToWoff)

// сборка в прод
exports.build = series(cleanDist, htmlInclude, styles, scripts, images, toProd)

// сборка и запуск live-сервера
exports.default = parallel(htmlInclude, styles, scripts, addJquery, startWatch, browser)