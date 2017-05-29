(function() {
  'user strict';

  angular
    .module('king.loaders.angular', ['ngRoute'])
    .factory('angularLoader', angularLoader);

  angularLoader.$inject = ['$q', '$rootScope', '$location', '$ocLazyLoad', 'structureService', '$polymer'];

  function angularLoader($q, $rootScope, $location, $ocLazyLoad, structureService, $polymer) {
    return {
      module: dynamicLoad
    };

    function dynamicLoad() {
      var mainDeferred = $q.defer();
      structureService.getCurrentModules($location, function loadmodules(modules) {
        var dependencies = {
          files: new Array(0),
          libs: new Array(0),
          htmlSources: new Array(0)
        };

        var cache = structureService.getCachedLibs();
        angular.forEach(modules, function(value) {
          var libs = value.libs;
          angular.forEach(libs, function(value, key) {
            if (value && value.bower) {
              if (cache[Object.keys(value.bower)[0]]) {
                libs[key].src = undefined;
              }
              cache[Object.keys(value.bower)[0]] = true;
            }
          }, libs);

          if (libs) {
            //Load libs
            var libSources = _.flattenDeep(_.map(libs, 'src'));
            this.files = this.files.concat(libSources).filter(filterNotHtmlOrUndefined);
            this.htmlSources = this.htmlSources.concat(libSources).filter(filterHtml);
          }

          this.files = processFilesTypeBased(this.files, value.type);
          this.files = this.files.concat(value.files);

          this.htmlSources = this.htmlSources.concat(value.files).filter(filterHtml);
        }, dependencies);

        structureService.setCachedLibs(cache);
        loadHtmlDeps()
          .then(loadLibsAndFiles)
          .then(mainDeferred.resolve)
          .catch(function(err) {
            console.info('[V] Loader Angular catch', err);
          });

        function loadHtmlDeps() {
          var defer = $q.defer();
          var htmlImports = [];
          angular.forEach(dependencies.htmlSources, function(value) {
            this.push(importHref(value));
          }, htmlImports);

          $q.all(htmlImports)
            .then(defer.resolve)
            .catch(defer.reject);
          return defer.promise;
        }

        function loadLibsAndFiles() {
          var defer = $q.defer();
          $q.all({
            'dependencies': $ocLazyLoad.load(dependencies.files, {serie: true}),
            'rootModule': structureService.getModule('/' + $location.$$path.split('/')[1])
          }).then(function(data) {
            defer.resolve(structureService.validateScope(data.rootModule));
          }).catch(defer.reject);
          return defer.promise;
        }

        function processFilesTypeBased(existingFiles, type) {
          var additionalFiles = {
            'R':['https://unpkg.com/react@15/dist/react.js","https://unpkg.com/react-dom@15/dist/react-dom.js']
          };
          if (additionalFiles[type]) {
            existingFiles = existingFiles.concat(additionalFiles[type]);
          }

          return existingFiles;
        }

        function importHref(file) {
          var defer = $q.defer();
          $polymer.importHref(file, defer.resolve, defer.reject);
          return defer.promise;
        }

        function filterHtml(n) {
          return n != undefined && n.indexOf('.html') > -1;
        }

        function filterNotHtmlOrUndefined(n) {
          return n != undefined && n.indexOf('.html') == -1;
        }
      });
      return mainDeferred.promise;
    }
  }
}());
