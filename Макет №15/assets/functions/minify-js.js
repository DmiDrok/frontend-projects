const { src, dest } = require('gulp');
const paths = require('../paths.js');
const plugins = require('../plugins/plugins.js');
const errorHandler = require('./error-handler.js');


// concat main.min.js (dev) file and babelify.min.js (build)
function minifyJs() {
  return src([`${paths.dev.jsRoot}/${paths.dev.mainJs}`, `${paths.build.jsRoot}/${paths.build.babelJs}`])
    .pipe(plugins.plumber({ errorHandler }))
    .pipe(plugins.concat(paths.dev.mainJs))
    .pipe(dest(paths.build.jsRoot));
}

module.exports = minifyJs;
