var Writer = require('broccoli-writer');
var extend = require('extend');
var Promise = require('rsvp').Promise;

module.exports = RequireJS;
RequireJS.prototype = Object.create(Writer.prototype);
RequireJS.prototype.constructor = RequireJS;

function RequireJS (inputTree, options) {
  if (!(this instanceof RequireJS)) return new RequireJS(inputTree, options);
  this.inputTree = inputTree;
  this.options = options;
};

RequireJS.prototype.write = function (readTree, destDir) {
  return readTree(this.inputTree).then(function(path) {
    var options = extend({}, this.options, { appDir: path, dir: destDir });
    return new Promise(function(accept, reject) {
      require("requirejs").optimize(options, accept, reject);
    });
  }.bind(this));
};
