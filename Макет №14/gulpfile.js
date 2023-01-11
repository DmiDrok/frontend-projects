const { series, parallel } = require('gulp');

const scssToCss     = require('./assets/functions/scss-to-css.js');
const minifyCss     = require('./assets/functions/minify-css.js');
const pugToHtml     = require('./assets/functions/pug-to-html.js');
const minifyHtml    = require('./assets/functions/minify-html.js');
const uniteJs       = require('./assets/functions/unite-js.js');
const uniteCss      = require('./assets/functions/unite-css.js');
const minifyJs      = require('./assets/functions/minify-js.js');
const minifyImages  = require('./assets/functions/minify-images.js');
const startBrowser  = require('./assets/functions/start-browser.js');
const startWatching = require('./assets/functions/start-watch.js');
const expandFonts   = require('./assets/functions/more-fonts.js');
const moveFonts     = require('./assets/functions/move-fonts.js');
const moveCss       = require('./assets/functions/move-css.js');
const generateWebp  = require('./assets/functions/generate-webp.js');


exports.scss = scssToCss;
exports.pug = pugToHtml;
exports.js = uniteJs;

// expanded options
exports.fonts = series(expandFonts.otfToTtf, expandFonts.woffToWoff2);
exports.webp = generateWebp;

// delicate options
exports.minifyCss = minifyCss;
exports.minifyHtml = minifyHtml;
exports.minifyJs = minifyJs;
exports.minifyImages = minifyImages;

// two ways
exports.dev = parallel(scssToCss, pugToHtml, uniteJs, startBrowser, startWatching);
exports.build = series(scssToCss, pugToHtml, uniteJs, minifyImages, moveCss, moveFonts, minifyHtml, minifyJs, minifyCss, uniteCss);
