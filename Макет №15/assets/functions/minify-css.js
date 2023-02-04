const { src, dest } = require('gulp');
const paths = require('../paths.js');
const plugins = require('../plugins/plugins.js');
const errorHandler = require('./error-handler.js');


// minify css
function minifyCss() {
  return src(paths.dev.css)
    .pipe(plugins.plumber({ errorHandler }))
    .pipe(plugins.cssnano())
    .pipe(plugins.concat(paths.build.mainCss))
    .pipe(dest(paths.build.cssRoot));
}

module.exports = minifyCss;
