// Required for wordpress modules
(function() {
  angular
    .module('king.loaders.common')
    .filter('cleanHex', function() {
      return function(input) {
        if (input) {
          return input.replace(/&#(\d+);/g, function(match) {
            return hex2a(match);
          });
        }

        function hex2a(hexx) {
          var hex = hexx.toString(); //force conversion
          var str = '';
          for (var i = 0; i < hex.length; i += 2)
            str += String.fromCharCode(parseInt(hex.substr(i, 2), 16));
          return str;
        }
      }
    })
    .filter('loadUrl', function($location) {
      return function(url) {
        if ($location.$$host.indexOf('dev.visualizer.kingofapp.com') !== -1) {
          return 'http://dev.resources.kingofapp.com/' + url;
        } else if ($location.$$host.indexOf('visualizer.kingofapp.com') !== -1) {
          return 'http://resources.kingofapp.com/' + url;
        } else {
          return url;
        }
      }
    });
}());
