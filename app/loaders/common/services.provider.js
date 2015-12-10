(function(){
  'use strict';

  angular
  .module('king.loaders.common').provider('configService', function () {
    var options = {
        services: null,
    };
    this.config = function (opt) {
        angular.extend(options, opt);
    };
    this.$get = [function () {
        if (!options) {
            throw new Error('Config options must be configured');
        }
        return options;
    }];
  })

}());
