(function() {
  'use strict';

  angular
    .module('king.loaders.common')
    .controller('commonLoaderCtrl', commonLoaderCtrl);

  commonLoaderCtrl.$inject = ['$scope', '$window', '$rootScope', '$route', '$location', 'structureService', 'angularLoader', 'trafficGuardiaCivil'];

  function commonLoaderCtrl($scope, $window, $rootScope, $route, $location, structureService, angularLoader, trafficGuardiaCivil) {
    // console.log('[V] Pasa por el commonLoaderCtrl');

    var app = document.querySelector('#app');

    $rootScope.showTransition = true;
    $location.$$path = $location.$$path || '/';
    if (structureService.getIndex() !== '' && $location.$$path === '/') {
      $location.path(structureService.getIndex());
    } else {
      configModule();
    }

    $scope.trafficGuardiaCivil = trafficGuardiaCivil;

    // $location.$$path = $location.$$path || '/';

    var prev = 0;
    var redirected = false;
    var finished = false;

    $scope.$watch(
      function calculateModelValue() {
        return (trafficGuardiaCivil.pending.all);
      },

      function handleModelChange(count) {
        console.log('[V] Pending HTTP count:', count,
          '{',
          trafficGuardiaCivil.pending.get, 'GET ,',
          trafficGuardiaCivil.pending.post, 'POST',
          '}');

        if ($location.$$path !== '/') {
          var visitedLocations = structureService.getVisitedLocations();
          var cachedLocations = structureService.getCachedLocations();

          structureService.getCurrentModules($location, function loadmodules(modules) {
            if (cachedLocations[$location.$$path] && visitedLocations[cachedLocations[$location.$$path].identifier] && !finished) {
              loadCachedModule();
            } else if (count === 0 && prev > 0 && !finished) {
              loadFirstTimeModule(modules);
            }
            //Render external calls generating new elements
            if (count === 0 && prev > 0) {
              renderKoaApp();
            }

            prev = count;
          });
        }

        function loadFirstTimeModule(modules) {
          finished = true;
          console.log('[V] First time module load', $location.$$path);
          angular.forEach(modules, function(value) {
            visitedLocations[value.identifier] = true;
          });
          structureService.setVisitedLocations(visitedLocations);
        }

        function loadCachedModule() {
          finished = true;
          console.log('[V] Loading cached module', $location.$$path);

          renderKoaApp();
        }
      }
    );



    $scope.$watch('appData', function(newValue) {
      // console.log('[V] REceived AppData', newValue);
      if (structureService.get() !== newValue && newValue !== undefined && !redirected) {
        structureService.set(newValue);
        redirected = true;

        setTimeout(function() {
          // $scope.$apply(function() {
          setTheme(newValue.config);
          setIconset(newValue.config.iconset);
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
        structureService.setColors(newValue);
      }
    });

    $scope.$watch('appFonts', function(newValue, oldValue) {
      if (oldValue !== newValue) {
        loadFonts(newValue);
        structureService.setFonts(newValue);
      }
    });

    $scope.$watch('appIconset', function(newValue, oldValue) {
      if (oldValue !== newValue) {
        setIconset(newValue.config.iconset);
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
        console.log('[V] Theme', newValue);

        setTheme(newValue.config);

        setTimeout(function() {
          $scope.$apply(function() {
            $route.reload();
          });
        }, 200);
      }
    });

    $scope.$on('$routeChangeStart', function(event, next) {
      if (next) {
        $rootScope.showTransition = true;
      }
    });

    $scope.$on('koaAppRendered', function() {
      console.info('[V] koa-app rendered!');

      $rootScope.$apply(function() {
        $rootScope.showTransition = false;
      });
    });

    function configModule() {
      // TODO: INSPECT loadconfig
      // Load config
      structureService.loadconfig();

      // Register Route
      structureService.getModule($location.$$path).then(function(module) {
        $rootScope.toolbar = {
          title: module.name
        };

        if ($rootScope.missing) {
          $rootScope.showTransition = false;
        }



        $scope.module = module || $scope.module;

        if (!module.type) {
          // Display a 404 error
          if (structureService.getIndex() === '' && $location.$$path !== '/') {
            $location.path('/404');
          }
        } else if (isAngularModule(module.type) && $rootScope.previous !== $location.$$path) {
          $rootScope.current = module.identifier;
          $rootScope.previous = $location.$$path;
          angularLoader.module($scope);
        } else if (isJqueryModule(module.type)) {
          // TODO: Load jquery module from angular
        } else {
          // TODO: Display error and blame developer
        }
      }, function() {
        $location.path('/404');
      });
      $scope.data = JSON.stringify(structureService.get(), null, '    ');
    }

    function isAngularModule(type) {
      return type === 'A';
    }

    function isJqueryModule(type) {
      return type === '$';
    }

    function isFromGoogleFonts(url) {
      return url.search('https://fonts.googleapis.com') === 0;
    }

    function loadFonts(fonts) {
      var families = [];

      if (isFromGoogleFonts(fonts.primaryFontFamily.url)) {
        families.push(fonts.primaryFontFamily.name);
      }

      if (isFromGoogleFonts(fonts.titleFontFamily.url)) {
        families.push(fonts.titleFontFamily.name);
      }

      if (families.length !== 0) {
        WebFont.load({
          google: {
            families: families
          }
        });
      }
    }

    function setIconset(iconset) {
      app.setIconset(iconset);
    }

    function setTheme(config) {
      $rootScope.theme = config.theme;

      loadFonts(config.fonts);

      app.setTheme(config.theme, function() {
        structureService.setCssVariables(config);

        $rootScope.$broadcast('koaAppRendered');
      });
    }

    function renderElements() {
      app.renderThemeElements(function() {
        $rootScope.$broadcast('koaAppRendered');
      });
    }

    function renderKoaApp() {
      app.createTree(function() {
        if (app.theme) {
          renderElements()
        } else if ($rootScope.appData) {
          setTheme($rootScope.appData.config)
        } else {
          setTheme(structureService.getConfig());
        }
      });
    }
  }
}());
