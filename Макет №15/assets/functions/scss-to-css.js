const { src, dest } = require('gulp');
const paths = require('../paths.js');
const plugins = require('../plugins/plugins.js');
const errorHandler = require('./error-handler.js');

// scss -> css
function scssToCss() {
  return src(paths.dev.scss)
    .pipe(plugins.plumber({ errorHandler }))
    .pipe(plugins.concat(paths.dev.mainCss))
    .pipe(plugins.scss({ outputStyle: 'expanded' }))
    .pipe(dest(paths.dev.cssRoot))
    .pipe(plugins.browserSync.stream());
}

module.exports = scssToCss;