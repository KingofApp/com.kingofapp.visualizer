(function() {
  'use strict';

  angular
    .module('king.loaders.common')
    .controller('commonLoaderCtrl', commonLoaderCtrl);

  commonLoaderCtrl.$inject = ['$scope', '$window', '$rootScope', '$route', '$location', 'structureService', 'angularLoader', 'trafficGuardiaCivil'];

  function commonLoaderCtrl($scope, $window, $rootScope, $route, $location, structureService, angularLoader, trafficGuardiaCivil) {
    // console.info('[V] Pasa por el commonLoaderCtrl');

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
        console.info('[V] Pending HTTP count:', count,
          '{',
          trafficGuardiaCivil.pending.get, 'GET ,',
          trafficGuardiaCivil.pending.post, 'POST',
          '}');

        if ($location.$$path !== '/') {
          setTimeout(function() {
            if (count === 0 && !state && !finished) {
              console.log("[TEST] Paso por 1", $location.$$path);
              renderKoaApp();
              finished = true;
            }
          }, 600);

          // Launch if there were petitions
          if (count === 0 && prev > 0 && !finished) {
            console.log("[TEST] Paso por 2", $location.$$path);
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
      // console.info('[V] REceived AppData', newValue);
      if (structureService.get() !== newValue && newValue !== undefined && !redirected) {
        console.info('[V] Inside If to set:', newValue);
        structureService.set(newValue);
        redirected = true;

        setTimeout(function() {
          // $scope.$apply(function() {
          //Causing first load to not render KOA
          console.info('[V] New config set', newValue.config);
          setTheme(newValue.config);
          console.info('[V] Actual location', $location.path());
          console.info('[V] Actual index', newValue.config.index);
          if (newValue.config.index === $location.path()) {
            $route.reload();
          } else {
            $location.path(newValue.config.index);
          }
          // });
        }, 200);
      }
    });

    $scope.$watch('appColors', function(newValue, oldValue) {
      if (oldValue !== newValue) {
        prevent = true;
        structureService.setColors(newValue);
      }
    });

    $scope.$watch('appFonts', function(newValue, oldValue) {
      if (oldValue !== newValue) {
        prevent = true;
        loadFonts(newValue);
        structureService.setFonts(newValue);
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
        console.info('[V] Theme', newValue);

        setTheme(newValue.config);

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
      console.info('[V] koa-app rendered!');
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
        // Display a 404 error
        if (structureService.getIndex() === '' && $location.$$path !== '/') {
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

    function loadFonts(fonts) {
      WebFont.load({
        google: {
          families: [fonts.primaryFontFamily.name, fonts.titleFontFamily.name]
        }
      });
    }

    function setTheme(config) {
      loadFonts(config.fonts);

      koaApp.setTheme(config.theme, function() {
        structureService.setCssVariables(config);

        addDirectives();

        $rootScope.$broadcast('koaAppRendered');
      });
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
      $('[ng-model]').each(ngModelWrapper); // Adding ng-model...

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
        ($rootScope.appData) ? setTheme($rootScope.appData.config)
                             : setTheme(structureService.getConfig());
      }, 100);
    }
  }
}());
