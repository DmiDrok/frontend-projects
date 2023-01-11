const { src, dest } = require('gulp');
const paths = require('../paths.js');
const plugins = require('../plugins/plugins.js');
const errorHandler = require('./error-handler.js');


// generate webp from other formats
function generateWebp() {
  return src(paths.dev.images)
    .pipe(plugins.plumber({ errorHandler }))
    .pipe(plugins.webp())
    .pipe(dest(paths.dev.imagesRoot));
}

module.exports = generateWebp;