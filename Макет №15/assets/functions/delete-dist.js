const paths = require('../paths.js');
const plugins = require('../plugins/plugins.js');


// delete dist folder
function deleteDist() {
  return plugins.del(paths.build.root);
}

module.exports = deleteDist;