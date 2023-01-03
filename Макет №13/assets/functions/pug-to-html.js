const { src, dest } = require('gulp');
const plugins = require('../plugins/plugins.js');
const paths = require('../paths.js');
const errorHandler = require('./error-handler.js');

// pug -> html
function pugToHtml() {
  return src(paths.dev.pug)
    .pipe(plugins.plumber({ errorHandler }))
    .pipe(plugins.pug({ pretty: true }))
    .pipe(dest(paths.dev.root))
    .pipe(plugins.browserSync.stream());
}

module.exports = pugToHtml;