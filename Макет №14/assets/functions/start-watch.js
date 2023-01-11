const { src, dest, watch, series } = require('gulp');
const paths = require('../paths.js');
const plugins = require('../plugins/plugins.js');
const errorHandler = require('./error-handler.js');

// functions
const pug = require('./pug-to-html.js');
const scss = require('./scss-to-css.js');
const js = require('./unite-js.js');


// start watch
function startWatching() {
  watch([paths.dev.pug, paths.dev.pugIncludes], pug);
  watch(paths.dev.scss, scss);
  watch([paths.dev.js, `!${paths.dev.jsRoot}/${paths.dev.mainJs}`], js);
}

module.exports = startWatching;