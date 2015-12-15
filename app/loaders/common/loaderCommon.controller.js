(function() {
  'use strict';

  angular
    .module('king.loaders.common')
    .controller('commonLoaderCtrl', commonLoaderCtrl);

  commonLoaderCtrl.$inject = ['$scope', '$window', '$rootScope', '$route', '$location', 'structureService', 'angularLoader', 'trafficGuardiaCivil', 'redirectUrl'];

  function commonLoaderCtrl($scope, $window, $rootScope, $route, $location, structureService, angularLoader, trafficGuardiaCivil, redirectUrl) {
    console.log('Pasa por el commonLoaderCtrl');
    var koaApp = document.querySelector('#koaApp');
    $rootScope.showTransition = true;

    if (redirectUrl !== '' && ($location.$$path === '/' || $location.$$path === '')) {
      $location.path(redirectUrl);
    }

    $scope.trafficGuardiaCivil = trafficGuardiaCivil;

    var prev = 0;
    var state = false;
    var prevent = false;
    var redirected = false;
    var finished = false;

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

        if ($location.$$path !== '/') {
          setTimeout(function() {
            if (count === 0 && !state && !finished) {
              launchKoa();
              finished = true;
            }
          }, 400);

          //Launch if there were Petitions
          if (count === 0 && prev > 0 && !finished) {
            launchKoa();
            finished = true;
          }

          if (count > 0) {
            state = true;
          }

          prev = count;
        }
      }
    );

    $location.$$path = $location.$$path || '/';

    $scope.$watch('appData', function(newValue, oldValue) {
      if (structureService.get() !== newValue && newValue !== undefined && !redirected) {
        structureService.set(newValue);
        redirected = true;
        setTimeout(function() {
          $scope.$apply(function() {
            //Causing first load to not render KOA
            setTheme(newValue.themes.android.name);
            if (newValue.config.index === $location.path()) {
              $route.reload();
            } else {
              $location.path(newValue.config.index);
            }

          });
        }, 100);
      }
    });

    $scope.$watch('appColor', function(newValue, oldValue) {
      if (oldValue !== newValue) {
        prevent = true;
        structureService.setColors(newValue);
      }
    });

    $scope.$watch('appModules', function(newValue, oldValue) {
      if (oldValue !== newValue && newValue) {
        structureService.setModules(newValue.modules);
        if (newValue.index === $location.path()) {
          $route.reload();
        } else {
          $location.path(newValue.index);
        }
      }
    });

    $scope.$watch('appTheme', function(newValue, oldValue) {
      if (oldValue !== newValue) {
        console.log('Theme', newValue);
        setTheme(newValue);
        setTimeout(function() {
          $scope.$apply(function() {
            $route.reload();
          });
        }, 200);
      }
    });

    $scope.$on('$routeChangeStart', function(event, next, current) {
      if (next) {
        $rootScope.showTransition = true;
      }
    });

    $scope.$on('koaLaunched', function(event, args) {
      console.log('Koa Launched');
      $rootScope.$apply(function() {
        // TODO - Fixer to force android render
        document.body.scrollTop = 1;
        document.body.scrollTop = 0;
        $rootScope.showTransition = false;
      });
    });

    //Load config
    structureService.loadconfig($rootScope);

    //Register Route
    structureService.getModule($location.$$path).then(function(module) {
      $rootScope.toolbar = {
        title: module.name
      };
      if($rootScope.missing){
        $rootScope.showTransition = false;
      }
      $rootScope.current = module.identifier;
      $scope.module = module || $scope.module;

      if (!module.type) {
        //TODO: Display a 404 error or similar
        if (redirectUrl === '' && $location.$$path !== '/') {
          $location.path('/404');
        }
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

    function setTheme(theme, cb) {
      koaApp.setTheme(theme, cb);
    }

    function addEvents() {
      
      if ($rootScope.appData) {
        console.log('Set Color de ', $rootScope.appData.config.colors);
        structureService.setColors($rootScope.appData.config.colors);
      }

      $rootScope.$broadcast('koaLaunched');
    }

    function launchKoa() {
      setTimeout(function() {

        // console.info('Changing koa-elements to theme-elements...');

        koaApp.createTree();

        if (!koaApp.theme) {
          if ($rootScope.appData) {
            setTheme($rootScope.appData.config.theme, addEvents);
          } else {
            setTheme('paper', addEvents);
          }
        } else {
          koaApp.renderThemeElements(addEvents);
        }

      }, 100);
    }
  }
}());
