(function() {
  'use strict';

  angular
    .module('king.loaders.common')
    .controller('commonLoaderCtrl', commonLoaderCtrl);

  commonLoaderCtrl.$inject = ['$scope', '$window', '$rootScope', '$route', '$location', 'structureService', 'angularLoader', 'trafficGuardiaCivil'];

  function commonLoaderCtrl($scope, $window, $rootScope, $route, $location, structureService, angularLoader, trafficGuardiaCivil) {
    console.log('Pasa por el commonLoaderCtrl');

    var koaApp = document.querySelector('#koaApp');

    $rootScope.showTransition = true;

    if (structureService.getIndex() !== '' && ($location.$$path === '/' || $location.$$path === '')) {
      $location.path(structureService.getIndex());
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
        console.log('Pending HTTP count:', count,
        '{',
          trafficGuardiaCivil.pending.get, 'GET ,',
          trafficGuardiaCivil.pending.post, 'POST',
        '}');

        if ($location.$$path !== '/') {
          setTimeout(function() {
            if (count === 0 && !state && !finished) {
              renderKoaApp();
              finished = true;
            }
          }, 400);

          // Launch if there were petitions
          if (count === 0 && prev > 0 && !finished) {
            renderKoaApp();
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
            var cssVariables = newValue.config.colors;

            setTheme(newValue.themes.android.name, cssVariables);

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

        setTheme(newValue.theme, newValue.cssVariables);

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

    $scope.$on('koaAppRendered', function(event, args) {
      console.info('koa-app rendered!');

      $rootScope.$apply(function() {
        $rootScope.showTransition = false;
      });
    });

    // TODO: INSPECT loadconfig
    // Load config
    structureService.loadconfig($rootScope);

    // Register Route
    structureService.getModule($location.$$path).then(function(module) {
      $rootScope.toolbar = {
        title: module.name
      };

      if ($rootScope.missing) {
        $rootScope.showTransition = false;
      }

      $rootScope.current = module.identifier;
      $scope.module = module || $scope.module;

      if (!module.type) {
        // Display a 404 error or similar structureService.getIndex() === '' &&
        if ($location.$$path !== '/') {
          $location.path('/404');
        }
      } else if (isAngularModule(module.type)) {
        angularLoader.module($scope);
      } else if (isJqueryModule(module.type)) {
        // TODO: Load jquery module from angular
      } else {
        // TODO: Display error and blame developer
      }
    });

    $scope.data = JSON.stringify(structureService.get(), null, '    ');

    function isAngularModule(type) {
      return type === 'A';
    }

    function isJqueryModule(type) {
      return type === '$';
    }

    function setTheme(theme, cssVariables) {
      koaApp.setTheme(theme, function() {
        structureService.setCssVariables(cssVariables);

        addDirectives();

        $rootScope.$broadcast('koaAppRendered');
      });

      // structureService.setColors(null);
    }

    function renderElements() {
      koaApp.renderThemeElements(function() {
        addDirectives();

        $rootScope.$broadcast('koaAppRendered');
      });
    }

    function addDirectives() {
      var scopeElement = document.querySelector('.' + $rootScope.current);
      var scope = angular.element(scopeElement).scope(); // Get current scope

      $('[ng-click]').click(ngClickWrapper); // Adding ng-click...
      $('[ng-model]').each(ngModelWrapper);  // Adding ng-model...

      function ngClickWrapper() {
        var functionName = $(this).attr('ng-click').replace(/(\(.*?\))/, '');
        scope[functionName]();
      }

      function ngModelWrapper() {
        var parent = $(this);

        $(this.inputElement).bind('input', function() {
          var model = parent.attr('ng-model').split('.');
          scope[model[0]][model[1]] = $(this).val();
        });
      }
    }

    function renderKoaApp() {
      setTimeout(function() {
        koaApp.createTree();

        (koaApp.theme)       ? renderElements() :
        ($rootScope.appData) ? setTheme($rootScope.appData.config.theme, $rootScope.appData.config.cssVariables)
                             : setTheme(structureService.getTheme(), structureService.getCssVariables());
      }, 100);
    }
  }
}());
