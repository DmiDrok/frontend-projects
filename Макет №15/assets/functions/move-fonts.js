const { src, dest } = require('gulp');
const paths = require('../paths.js');
const plugins = require('../plugins/plugins.js');
const errorHandler = require('./error-handler.js');


// move fonts to dist
function moveFonts() {
  return src(paths.dev.fonts)
    .pipe(plugins.plumber({ errorHandler }))
    .pipe(dest(paths.build.fontsRoot));
}

module.exports = moveFonts;
