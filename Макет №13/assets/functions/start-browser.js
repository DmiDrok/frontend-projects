const paths = require('../paths.js');
const plugins = require('../plugins/plugins.js');


// start local server
function startBrowser() {
  plugins.browserSync.init({
    server: {
        baseDir: paths.dev.root
    }
  });
}

module.exports = startBrowser;