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
    });
}());
