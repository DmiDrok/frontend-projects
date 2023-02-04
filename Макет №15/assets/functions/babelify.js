const { src, dest } = require('gulp');
const paths = require('../paths.js');
const plugins = require('../plugins/plugins.js');
const errorHandler = require('./error-handler.js');


// push main.js to babel and get it to build named babelify.min.js
function babelifyJs() {
  return src(`${paths.dev.jsRoot}/main.js`)
  .pipe(plugins.plumber({ errorHandler }))
  .pipe(plugins.babel({ presets: ["@babel/preset-env"] }))
  .pipe(plugins.uglifyjs())
  .pipe(plugins.concat(paths.build.babelJs))
  .pipe(dest(paths.build.jsRoot))
}

module.exports = babelifyJs;