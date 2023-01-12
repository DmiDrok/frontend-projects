const { src, dest } = require('gulp');
const paths = require('../paths.js');
const plugins = require('../plugins/plugins.js');
const errorHandler = require('./error-handler.js');


// move all html files to the dist folder
function moveHtml() {
  return src(paths.dev.html)
    .pipe(plugins.plumber({ errorHandler }))
    .pipe(dest(paths.build.root));
}

module.exports = moveHtml;