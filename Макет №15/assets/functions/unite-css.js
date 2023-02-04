const { src, dest } = require('gulp');
const paths = require('../paths.js');
const plugins = require('../plugins/plugins.js');
const errorHandler = require('./error-handler.js');


// unite all css files to one main file
function uniteCss() {
  return src([paths.dev.css])
    .pipe(plugins.plumber({ errorHandler }))
    .pipe(plugins.concat(paths.dev.mainCss))
    .pipe(dest(paths.build.cssRoot))
}

module.exports = uniteCss;