const { src, dest } = require('gulp');
const paths = require('../paths.js');
const plugins = require('../plugins/plugins.js');
const errorHandler = require('./error-handler.js');

// move all css files to dist
function moveCss() {
  return src(paths.dev.css)
    .pipe(plugins.plumber({ errorHandler }))
    .pipe(dest(paths.build.cssRoot))
}

module.exports = moveCss;
