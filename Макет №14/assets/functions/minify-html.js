const { src, dest } = require('gulp');
const plugins = require('../plugins/plugins.js');
const paths = require('../paths.js');
const errorHandler = require('./error-handler.js');

function minifyHtml() {
  return src(paths.build.html)
    .pipe(plugins.plumber({ errorHandler }))
    .pipe(plugins.htmlmin({ collapseWhitespace: true }))
    .pipe(dest(paths.build.root));
}

module.exports = minifyHtml;