var sh = require('shelljs');
var async = require('async');

var local = sh.pwd();
var glob = require("glob")

sh.mkdir('-p', 'www/bower_components');
glob("www/**/.bowerrc", function (er, files) {
  console.log("FILES", files);
  async.forEachSeries(files, downloadPlugin(), function() {
  });
})
function downloadPlugin() {
  return function(plugin, callback) {
      if (plugin.indexOf("bower_components") !== -1){
        console.log("Ignore");
        callback("");
      }else {
        plugin = plugin.replace('.bowerrc','');
        console.log('*** Installing dependencies from: ' + plugin);

        async.series([
          async.asyncify(async.apply(sh.cd, local)),
          async.apply(sh.exec, 'cd '+plugin+' && bower i')
        ], function(err, result) {
          err = hasNoBowerJson(err, result) ? null : err;
          callback(err, result);
        });
      }
  };
}

function hasNoBowerJson(err, result) {
  var array = [];

  result.forEach(function(data) {
    if (data && data.length) array = data;
  });

  return (err === 1 && array.length > 1 && array[1].indexOf('No bower.json present') > -1);
}
