const { src, dest } = require('gulp');
const paths = require('../paths.js');
const plugins = require('../plugins/plugins.js');
const errorHandler = require('./error-handler.js');

// minify images
function minifyImages() {
  return src(paths.dev.images)
    .pipe(plugins.plumber({ errorHandler }))
    .pipe(plugins.imagemin([
      plugins.imagemin.gifsicle({interlaced: true}),
      plugins.imagemin.mozjpeg({quality: 75, progressive: true}),
      plugins.imagemin.optipng({optimizationLevel: 5}),
      plugins.imagemin.svgo({
          plugins: [
              {removeViewBox: true},
              {cleanupIDs: false}
          ]
      })
    ]))
    .pipe(dest(paths.build.imagesRoot));
}


module.exports = minifyImages;