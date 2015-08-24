(function(){
  'user strict';

  angular
    .module('king.loaders.angular', ['ngRoute'])
    .factory('angularLoader', angularLoader);

    angularLoader.$inject = ['$q', '$location', '$ocLazyLoad', 'structureService'];
    function angularLoader($q, $location, $ocLazyLoad, structureService){
      return {
        module: dynamicLoad
      }

      function dynamicLoad(scope){
        var defer = $q.defer();

        structureService.getCurrentModules($location, function loadmodules(modules) {
          var dependencies = {
            files: new Array(0),
            libs : new Array(0)
          };

          angular.forEach(modules, function(value, key) {
            this.libs  = this.libs.concat(_.pluck(value.libs, 'src'));
            this.files = this.files.concat(value.files);
          }, dependencies);

          $q.all({
            'rootModule'  : structureService.getModule( "/"+$location.$$path.split("/")[1]),
            'dependencies': $ocLazyLoad.load(dependencies.libs)
          }).then(function(data){
            scope.lazyLoadParams = [dependencies.files];
            scope.template = data.rootModule.view;
            defer.resolve();
          }).catch(defer.reject);

        });

        return defer.promise;
      }


    }
}() );
