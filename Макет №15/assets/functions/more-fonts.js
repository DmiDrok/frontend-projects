const { src, dest } = require('gulp');
const paths = require('../paths.js');
const plugins = require('../plugins/plugins.js');
const errorHandler = require('./error-handler.js');


//otf to ttf
function otfToTtf() {
  return src(`${paths.dev.fontsRoot}/**/*.otf`)
    .pipe(plugins.plumber({ errorHandler }))
    .pipe(plugins.fonter({ formats: ['ttf', 'woff'] }))
    .pipe(dest(paths.dev.fontsRoot));
}

// ttf to woff2
function woffToWoff2() {
  return src(`${paths.dev.fontsRoot}/**/*.ttf`)
    .pipe(plugins.plumber({ errorHandler }))
    .pipe(plugins.ttf2woff2())
    .pipe(dest(paths.dev.fontsRoot));
}


module.exports = {
  otfToTtf,
  woffToWoff2,
}