(function() {
  'use strict';

  angular
    .module('king.loaders.common')
    .controller('commonLoaderCtrl', commonLoaderCtrl)
    .directive('polyScripts', function() {
      var updateScripts = function(element) {
        return function(scripts) {
          element.empty();
          angular.forEach(scripts, function(source, key) {
            var scriptTag = angular.element(document.createElement('script'));
            source = '//@ sourceURL=' + key + '\n' + source;
            scriptTag.text(source);
            element.append(scriptTag);
          });
        };
      };

      return {
        restrict: 'EA',
        scope: {
          scripts: '='
        },
        link: function(scope, element) {
          scope.$watch('scripts', updateScripts(element));
        }
      };
    });

  commonLoaderCtrl.$inject = ['$scope', '$rootScope', '$location', '$ocLazyLoad', 'structureService', 'angularLoader', 'trafficGuardiaCivil'];

  function commonLoaderCtrl($scope, $rootScope, $location, $ocLazyLoad, structureService, angularLoader, trafficGuardiaCivil) {
    console.log('pasa por el commonLoaderCtrl');
    $scope.trafficGuardiaCivil = trafficGuardiaCivil;

    var prev = 0;
    var state = false;
    var prevent = false;
    var redirected = false;
    $scope.$watch(
      function calculateModelValue() {
        return (trafficGuardiaCivil.pending.all);
      },

      function handleModelChange(count) {
        console.log(
          'Pending HTTP count:', count,
          '{',
          trafficGuardiaCivil.pending.get, 'GET ,',
          trafficGuardiaCivil.pending.post, 'POST',
          '}'
        );
        if($location.$$path != "/"){
          setTimeout(function() {
            if (count === 0 && !state) {
              launchKoa();
            }
          }, 100);
          if (count === 0 && prev > 0) {
            launchKoa();
          }
          if (count > 0) {
            state = true;
          }
          prev = count;
        }
      }
    );

    $location.$$path = $location.$$path || '/';

    $rootScope.$watch('appData', function(newValue, oldValue) {
      if (structureService.get() != newValue && newValue !== undefined && !redirected) {
        structureService.set(newValue);
        redirected=true;
        setTimeout(function() {
          $scope.$apply(function() {
            $location.path(newValue.config.index);
          });
        }, 100);
      }
    });
    $rootScope.$watch('appColor', function(newValue, oldValue) {
      // TODO: SE REPITE MIL VECES LOS LOGS
      if (oldValue != newValue) {
        prevent = true;
        setColor(newValue);
      }
    });
    $rootScope.$watch('appTheme', function(newValue, oldValue) {
      // TODO: SE REPITE MIL VECES LOS LOGS
      if (oldValue != newValue) {
        console.log("Theme",newValue);
        setTheme(newValue);
      }
    });
    //Load config
    structureService.loadconfig($rootScope);

    //Register Route
    structureService.getModule($location.$$path).then(function(module) {
      $scope.module = module || $scope.module;
      if (!module) {
        //TODO: Display a 404 error or similar
      } else if (isAngularModule(module.type)) {
        angularLoader.module($scope);
      } else if (isJqueryModule(module.type)) {
        //TODO: Load jquery module from angular
      } else {
        //TODO: Display error and blame developer
      }
    });

    $scope.data = JSON.stringify(structureService.get(), null, '    ');

    function isAngularModule(type) {
      return type === 'A';
    }

    function isJqueryModule(type) {
      return type === '$';
    }
    function setColor(color) {
      //Set colors
      var s = document.createElement('style', 'custom-style');
      s.textContent = ':root {\n';
      s.textContent += JSON.stringify(color).replace(/"|{|}/g, '').replace(/,/g, ';') + ";";
      s.textContent += '\n}';
      document.body.appendChild(s);
      Polymer.updateStyles();
      s.remove();
    }
    function setTheme(theme) {
      //Set Theme
      koaApp.theme = theme;
    }

    function launchKoa() {
      setTimeout(function() {
        console.log('Launch KOA');
        var koaApp = document.querySelector('#koaApp');
        koaApp.createTree();
        if (!koaApp.theme) {
          if($rootScope.appData){
            setTheme($rootScope.appData.config.theme);
          }else{
            setTheme('paper');
          }
        } else {
          koaApp.renderThemeElements();
        }
        if($rootScope.appData){
          setColor($rootScope.appData.config.colors);
        }

      }, 100);
    }
  }
}());
