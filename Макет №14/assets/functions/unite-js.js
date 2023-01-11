const { src, dest } = require('gulp');
const paths = require('../paths.js');
const plugins = require('../plugins/plugins.js');
const errorHandler = require('./error-handler.js');


// unite all js files to one main file
function uniteJs() {
  return src([paths.dev.js, `!${paths.dev.jsRoot}/${paths.dev.mainJs}`])
    .pipe(plugins.plumber({ errorHandler }))
    .pipe(plugins.concat(paths.dev.mainJs))
    .pipe(dest(paths.dev.jsRoot))
    .pipe(plugins.browserSync.stream());
}

module.exports = uniteJs;