/**
 * Module dependencies
 */
var path = require('path');
var fs = require('fs');
var fbp = require('fbp');

/**
 * Expose plugin
 */
module.exports = function(options) {
  options = options || {};
  var property = options.property || "fbp";

  function build(builder) {
    builder.hook('before scripts', function(pkg){

      var files = pkg.config[property];
      if (!files) return;

      var fbpFiles = [];

      files.forEach(function(file){
        var ext = path.extname(file);
        if (ext != ".fbp") return;

        fbpFiles.push(file);

        var fbpData = fs.readFileSync(pkg.path(file), 'utf-8');
        var json = fbp.parse(fbpData);

        var js = "module.exports = JSON.parse('"+JSON.stringify(json).replace(/'/g, "\\'")+"');";

        pkg.addFile('scripts', file, js);
      });

      fbpFiles.forEach(function(file) {
        pkg.removeFile(property, file);
      });
    });
  }

  // If consumed directly though `component build --use component-fbp`
  return 'function' === typeof options.hook ? build(options) : build;
};
