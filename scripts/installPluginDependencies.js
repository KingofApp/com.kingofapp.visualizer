var sh = require('shelljs');
var async = require('async');

var local = sh.pwd();

async.forEachSeries(sh.ls('app/modules'), downloadPlugin('modules'), function() {
  sh.cd(local);
  async.forEachSeries(sh.ls('app/themes'), downloadPlugin('themes'));
});

function downloadPlugin(type) {
  return function(plugin, callback) {
    if (plugin) {
      console.log('*** Installing dependencies from: app/' + type + '/' + plugin);
      var path = 'app/'+type +'/'+plugin;
      async.series([
        async.asyncify(async.apply(sh.cd, local)),
        // async.asyncify(async.apply(sh.cd, 'app/' + type + '/' + plugin)),
        async.apply(sh.exec, 'cd '+path+' && bower i && cd ../../..')
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
