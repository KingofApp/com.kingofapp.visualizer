(function() {
  'user strict';

  angular
    .module('king.loaders.angular', ['ngRoute'])
    .factory('angularLoader', angularLoader);

  angularLoader.$inject = ['$q', '$location', '$ocLazyLoad', 'structureService'];

  function angularLoader($q, $location, $ocLazyLoad, structureService) {
    return {
      module: dynamicLoad
    };

    function dynamicLoad(scope) {

      structureService.getCurrentModules($location, function loadmodules(modules) {
        var dependencies = {
          files: new Array(0),
          libs: new Array(0),
          libsHtml: new Array(0)
        };

        angular.forEach(modules, function(value, key) {
          this.libs     = this.libs.concat(_.pluck(value.libs, 'src')).filter(function(n){ return n != undefined && n.indexOf(".html") == -1 });
          this.libsHtml = this.libsHtml.concat(_.pluck(value.libs, 'src')).filter(function(n){ return n != undefined && n.indexOf(".html") > -1 });
          this.files    = this.files.concat(value.files);
        }, dependencies);
        loadHtmlDeps()
        .then(loadAllDependecies)
        .catch(loadAllDependecies);
        function loadAllDependecies(){
          var defer = $q.defer();
          $q.all({
            'rootModule': structureService.getModule('/' + $location.$$path.split('/')[1]),
            'dependencies': $ocLazyLoad.load(dependencies.libs)
          }).then(function(data) {
            scope.lazyLoadParams = [dependencies.files];
            scope.template = structureService.validateScope(data.rootModule);
            defer.resolve();
          }).catch(defer.reject);
          return defer.promise;
        }
        function loadHtmlDeps() {
          var defer = $q.defer();
          var htmlImports = [];
          angular.forEach(dependencies.libsHtml, function(value, key) {
            this.push(importHref(value));
          }, htmlImports);

          $q.all(htmlImports)
          .then(defer.resolve)
          .catch(defer.reject);
          return defer.promise;
        }
        function importHref(file){
          var defer = $q.defer();
          polymerImportHref(file, defer.resolve, defer.reject);
          return defer.promise;
        }
        function polymerImportHref(href, onload, onerror) {
          var l = document.createElement('link');
          l.rel = 'import';
          l.href = href;
          var self = this;
          if (onload) {
              l.onload = function(e) {
                  return onload.call(self, e);
              };
          }
          if (onerror) {
              l.onerror = function(e) {
                  return onerror.call(self, e);
              };
          }
          document.head.appendChild(l);
            return l;
          }
        });
    }
  }

}());
