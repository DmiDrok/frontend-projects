const { src, dest } = require('gulp');
const paths = require('../paths.js');
const plugins = require('../plugins/plugins.js');
const errorHandler = require('./error-handler.js');


// minify main js file
function minifyJs() {
  return src(`${paths.dev.jsRoot}/${paths.dev.mainJs}`)
    .pipe(plugins.plumber({ errorHandler }))
    // .pipe(plugins.babel({ presets: ["@babel/preset-env"] }))
    .pipe(plugins.uglifyjs())
    .pipe(dest(paths.build.jsRoot));
}

module.exports = minifyJs;