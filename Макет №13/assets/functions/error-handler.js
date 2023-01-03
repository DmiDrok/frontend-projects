const plugins = require('../plugins/plugins.js');

module.exports = function(error) {
  plugins.notify.onError({
    title: 'SCSS to CSS',
    message: 'Error <%= error.message %>'
  })(error);
  this.emit('end');
}