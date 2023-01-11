const { src, dest } = require('gulp');
const paths = require('../paths.js');
const plugins = require('../plugins/plugins.js');
const errorHandler = require('./error-handler.js');


// minify main js file
function minifyJs() {
  return src([paths.dev.js, `!${paths.dev.jsRoot}/main.js`])
    .pipe(plugins.plumber({ errorHandler }))
    // .pipe(plugins.babel({ presets: ["@babel/preset-env"] }))
    .pipe(plugins.concat('main.min.js'))
    .pipe(plugins.uglifyjs())
    .pipe(dest(paths.build.jsRoot));
}

module.exports = minifyJs;